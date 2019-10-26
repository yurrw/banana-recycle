from knox.auth import TokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from rest_framework.exceptions import ValidationError

from rest_framework.decorators import authentication_classes, permission_classes

from django.contrib.auth.models import Permission
from bnana.models import BananasUser

from django.core.mail import send_mail
import string
import random

from json import JSONEncoder


class BananaUserViewSet(ViewSet):

    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    queryset = BananasUser.objects.all()

    def retrieve(self, request, pk, format=None):

        user = BananasUser.objects.get(pk=pk)

        respg = []
        for g in user.groups.all():
            group = {
                'id': g.pk,
                'name': g.name
            }
            respg.append(group)

        resp = {
            'id': user.pk,
            'username': user.username,
            'groups': respg
        }

        return Response(resp)

    # @list_route(methods=['put'], permission_classes=[IsAuthenticated])
    def change_password(self, request, format=None):

        if request.user.check_password(request.data['old_password']):
            request.user.set_password(request.data['new_password'])
            request.user.save()
            return Response('[]')

        raise ValidationError('Senha atual digitada incorretamente.')

    # @list_route(methods=['get'], permission_classes=[IsAuthenticated])
    def get_group_permissions(self, request):

        allowed_groups = request.user.groups.all()

        groups = []

        for g in allowed_groups:
            group = {
                'id': g.pk,
                'name': g.name
            }
            groups.append(group)

        return Response(groups)

   


class BananaUserViewSetAnom(ViewSet):

    def create_user(self, request):
        userName = request.data['user']
        userPass = request.data['password']
        userMail = request.data['email']
        user = BananasUser.objects.create_user(
            username=userName,
            email=userMail,
            password=userPass)
        return Response(str(user))


    # @list_route(methods=['put'])
    def reset_password(self, request):

        try:
            user = BananasUser.objects.get(email=request.data['email'])
            tmp_pass = self.password_generator()

            user.set_password(tmp_pass)
            user.save()

            message = '<html>' \
                      '<head></head>' \
                      '<body>' \
                      '<p>OlÃ¡,</p>' \
                      '<p>Essas sÃ£o as suas novas credenciais para acessar o geodocs.com.br:</p>' \
                      '<p>UsuÃ¡rio: ' + user.username + '</p>' \
                      '<p>Senha: ' + tmp_pass + '</p>' \
                      '<p></p>' \
                      '<p>Por gentileza, altere a senha no seu prÃ³ximo login.</p>' \
                      '</body>' \
                      '</html>'

            messages_sent = send_mail(
                subject='Geodocs - RecuperaÃ§Ã£o de acesso',
                message=message,
                from_email='geodocs@cos.ufrj.br',
                recipient_list=[user.email],
                fail_silently=False,
                html_message=message
            )

            if messages_sent > 0:
                return Response('Email enviado com sucesso.')
            else:
                return Response('Envio de e-mail falhou.')

        except BananasUser.DoesNotExist:
            return Response('User not found.')
        except BananasUser.MultipleObjectsReturned:
            return Response('Multiple users found')
        except Exception as e:
            return Response('Erro ao recuperar usuÃ¡rio ou enviar e-mail. Details:' + str(e))

    def password_generator(self, size=8, chars=string.ascii_letters + string.digits):
        """
        Returns a string of random characters, useful in generating temporary
        passwords for automated password resets.

        size: default=8; override to provide smaller/larger passwords
        chars: default=A-Za-z0-9; override to provide more/less diversity

        Credit: Ignacio Vasquez-Abrams
        Source: http://stackoverflow.com/a/2257449
        """
        return ''.join(random.choice(chars) for i in range(size))