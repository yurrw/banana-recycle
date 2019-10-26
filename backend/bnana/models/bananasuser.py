from django.contrib.auth.models import AbstractUser
from django.db import models


class BananasUser(AbstractUser):
    pass
    bio = models.TextField(max_length=500, blank=False)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
