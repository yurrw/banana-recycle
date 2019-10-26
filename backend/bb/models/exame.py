from django.db import models
from bb.models.estabelecimento import Estabelecimento
from bb.models.orientador import Orientador
from bb.models.maquina import Maquina
from bb.models.pessoa import Pessoa


class Exame(models.Model):
    estabelecimento = models.ForeignKey(Estabelecimento, null=True, on_delete=models.SET_NULL)
    orientador = models.ForeignKey(Orientador, null=True, on_delete=models.SET_NULL)
    maquina = models.ForeignKey(Maquina, null=True, on_delete=models.SET_NULL)
    pessoa = models.ForeignKey(Pessoa, null=False, on_delete=models.PROTECT)
    exame = models.TextField(null=False)
    data = models.DateTimeField(null=False)

