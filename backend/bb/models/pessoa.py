from django.db import models
from django.core.validators import RegexValidator, validate_email
from bb.utils.validators import validate_cpf

class Pessoa(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'."
                                         " Up to 15 digits allowed.")

    nome = models.CharField(max_length=100)
    data_nasc = models.DateField()
    email = models.CharField(max_length=100, validators=[validate_email])
    genero_choices = [
        ('M', 'Masculino'),
        ('F', 'Feminino')
    ]
    genero = models.CharField(max_length=20, choices=genero_choices, default='M')
    cpf = models.CharField(validators=[validate_cpf],  max_length=11, null=False, unique=True)
    whatsapp = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    raca_choices = [
        ('B', 'Branca'),
        ('N', 'Negra'),
        ('P', 'Parda'),
        ('I', 'Indigena'),
        ('A', 'Amarela')
    ]
    raca = models.CharField(max_length=20, choices=raca_choices, default='B')
    anamnese_json = models.TextField(blank=True)
    foto_base64 = models.TextField(blank=True)
    foto_img = models.ImageField(blank=True)
    altura = models.DecimalField(max_digits=3, decimal_places=2, blank=False, default=0.00)
