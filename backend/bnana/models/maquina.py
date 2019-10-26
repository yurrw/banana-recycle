from django.db import models
from bnana.models import Estabelecimento


class MaquinaTipo(models.Model):
    nome = models.CharField(max_length=20)
    descricao = models.TextField(max_length=250)


class Maquina(models.Model):
    nome = models.CharField(max_length=100)
    habilitado = models.BooleanField(default=True)
    tipo = models.ForeignKey(MaquinaTipo, on_delete=models.PROTECT)
    examesrealizados = models.IntegerField(default=0)
    estabelecimento = models.ForeignKey(Estabelecimento, on_delete=models.CASCADE)



