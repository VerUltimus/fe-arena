from django.conf.urls import patterns, include, url
from rest_framework import routers
from characters.models import Character
from characters.views import CharacterViewSet

from django.contrib import admin
admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'characters', CharacterViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'fe_arena.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    # REST Framework browsable API
    url(r'^$', 'home.views.index', name='home'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
