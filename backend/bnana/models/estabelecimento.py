from django.db import models
from django.core.validators import RegexValidator


class Estabelecimento(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'."
                                         " Up to 15 digits allowed.")

    nome = models.CharField(max_length=100)
    rua = models.CharField(max_length=250)
    numero = models.CharField(max_length=20)
    complemento = models.CharField(max_length=100)
    bairro = models.CharField(max_length=100)
    cep = models.CharField(max_length=8)
    cidade = models.CharField(max_length=100)
    uf = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)
    telefone = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    locacao = models.BooleanField(default=False)
    percentual = models.BooleanField(default=False)
    compraevenda = models.BooleanField(default=False)
    habilitado = models.BooleanField(default=False)
    logotipo_base64 = models.TextField()
    logotipo_img = models.ImageField()

    # title = models.CharField(max_length=250)
    # institutions = models.ManyToManyField('cv.Institution')
    # authors = models.ManyToManyField('cv.Author')
    # keywords = models.ManyToManyField('cv.Keyword')
    # themes = models.ManyToManyField('cv.Theme')
    # shapes = models.ManyToManyField('cv.Shape')
    # folder = models.ForeignKey('cv.Folder', null=True)
    # favorites = models.ManyToManyField(Group)
    # public = models.BooleanField(default=False)
    # has_owner = models.BooleanField(default=True)
    # pub_date = models.DateField(null=True)
    # start_coverage_date = models.DateField(null=True)
    # end_coverage_date = models.DateField(null=True)
    # description = models.TextField(null=True)
    # files = models.ManyToManyField('cv.File', through='DocumentFile')
    # creator = models.ForeignKey(User, related_name='document_creator')
    # last_editor = models.ForeignKey(User, related_name='document_lastEditor')
    # url = models.CharField(max_length=250, null=True)
    # group = models.ManyToManyField(Group, related_name='document_group')
    # projeto = models.ManyToManyField(Projeto, related_name='document_projeto'))

    def __str__(self):
        return self.name