from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth import get_user_model
# User = get_user_model()


class BananasUser(AbstractUser):
    pass
    bio = models.TextField(max_length=500, blank=False)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
