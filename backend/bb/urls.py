from django.conf.urls import url
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from bb.routers import LookupAtTheEndRouter

from bb.views import *
# from cv.views.user import UserViewSetAnom

srouter = routers.SimpleRouter()
# srouter.register(r'document', DocumentViewSet)
# srouter.register(r'file', FileViewSet)
# srouter.register(r'picture', PictureViewSet)
#
# crouter = LookupAtTheEndRouter()
# crouter.register(r'group', GroupViewSet)

urlpatterns = [
    # url(r'^author/(?P<pk>[0-9]+)/$', AuthorDetails.as_view()),
    # url(r'^author/$', AuthorList.as_view()),
    # url(r'^institution/(?P<pk>[0-9]+)/$', InstitutionDetails.as_view()),
    # url(r'^institution/$', InstitutionList.as_view()),
    # url(r'^folder/$', FolderList.as_view()),
    # url(r'^keyword/(?P<pk>[0-9]+)/$', KeywordDetails.as_view()),
    # url(r'^keyword/$', KeywordList.as_view()),
    # url(r'^shape_type/(?P<pk>[0-9]+)/$', ShapeTypeDetails.as_view()),
    # url(r'^shape_type/$', ShapeTypeList.as_view()),
    # url(r'^theme/(?P<pk>[0-9]+)/$', ThemeDetails.as_view()),
    # url(r'^theme/$', ThemeList.as_view()),
    # url(r'^shape/$', ShapeList.as_view()),
    # url(r'^shape/(?P<pk>[0-9]+)/$', ShapeDetails.as_view()),
    # url(r'^file/$', FileList.as_view()),
    # url(r'^group/report/$', GroupList.as_view()),
    # url(r'^file/(?P<pk>[0-9]+)/(?P<token>.+)/$', FileDetails.as_view()),
    # url(r'^folder_ftp/tree/$', FolderFTPTree.as_view()),
    # url(r'^folder_ftp/file/(?P<token>.+)/$', FolderFTPFile.as_view()),
    # url(r'^user/change_password/$', UserViewSet.as_view({'put': 'change_password'})),
    # url(r'^user/reset_password/$', UserViewSetAnom.as_view({'put': 'reset_password'})),
    # url(r'^user/get_permissions/$', UserViewSet.as_view({'get': 'get_project_permissions'})),
    # url(r'^user/(?P<pk>[0-9]+)/$', UserViewSet.as_view({'get': 'retrieve'})),
    # url(r'^document/position/$', DocumentViewSet.as_view({'get': 'position', 'post': 'point_position'})),
    # url(r'^document/points/$', DocumentViewSet.as_view({'get': 'point'}))
]

urlpatterns += srouter.urls
# urlpatterns += crouter.urls

urlpatterns = format_suffix_patterns(urlpatterns)
