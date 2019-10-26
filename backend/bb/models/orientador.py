from django.db import models
from django.core.validators import RegexValidator, validate_email
from bb.utils.validators import validate_cpf, validate_cnpj

class Orientador(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'."
                                         " Up to 15 digits allowed.")

    nome = models.CharField(max_length=100)
    whatsapp = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    telefone = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    cargo = models.CharField(max_length=100)
    email1 = models.CharField(max_length=100, validators=[validate_email])
    email2 = models.CharField(max_length=100)
    rg = models.CharField(max_length=20)
    rg_uf = models.CharField(max_length=2)
    rg_emissor = models.CharField(max_length=20)
    cpf = models.CharField(validators=[validate_cpf], max_length=11, null=False, unique=True)
    banco = models.CharField(max_length=100)
    agencia = models.CharField(max_length=20)
    conta = models.CharField(max_length=20)
    conta_titular = models.CharField(max_length=100)
    cnpj = models.CharField(validators=[validate_cnpj], max_length=14)
