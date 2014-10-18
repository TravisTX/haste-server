'use strict';

pasteApp.constant('routes', {
    routes: [
        {
            name: 'base',
            url: '/',
            controller: 'BaseController',
            templateUrl: '/app/base/base.html'
        },
        {
            name: 'paste',
            parent: 'base',
            url: 'paste/{pasteKey}/{format}',
            controller: 'PasteController',
            templateUrl: '/app/paste/paste.html'
        },
        {
            name: 'paste_new',
            parent: 'base',
            url: 'paste',
            controller: 'PasteController',
            templateUrl: '/app/paste/paste.html'
        },
        {
            name: 'raw',
            parent: 'base',
            url: 'raw/{pastetId}',
            templateUrl: '/app/raw/raw.html'
        }
    ],

    redirects: {
        //'base': 'view/new'
    }
});