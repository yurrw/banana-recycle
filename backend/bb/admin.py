from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from bb.models.biobodyuser import BiobodyUser

from bb.models import Estabelecimento, Exame, Maquina, Orientador, Pessoa

# Register your models here.
admin.site.register(Estabelecimento)
admin.site.register(Exame)
admin.site.register(Maquina)
admin.site.register(Orientador)
admin.site.register(Pessoa)


class BiobodyUserAdmin(UserAdmin):
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ('role',),
        }),
    )


admin.site.register(BiobodyUser, BiobodyUserAdmin)
