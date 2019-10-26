# from rest_framework.routers import Route, SimpleRouter, DynamicDetailRoute, DynamicListRoute
from rest_framework.routers import Route,  SimpleRouter, DynamicRoute


class LookupAtTheEndRouter(SimpleRouter):

    routes = [
        Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={'get': 'list'},
            name='{basename}-list',
            initkwargs={'suffix': 'List'},
            detail=False
        ),
        Route(
            url=r'^{prefix}/{lookup}{trailing_slash}$',
            mapping={'get': 'retrieve'},
            name='{basename}-detail',
            initkwargs={'suffix': 'Detail'},
            detail=True
        ),
        # IN CASE OF FIRE, THIS CALLED DETAIL BEFORE
        DynamicRoute(
            url=r'^{prefix}/{methodname}/{lookup}{trailing_slash}$',
            name='{basename}-{methodnamehyphen}',
            initkwargs={},
            detail=True
        )
    ]
