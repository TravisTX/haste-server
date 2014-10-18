'use strict';

pasteApp.constant('routes', {
    routes: [
        {
            name: 'paste',
            url: '/{pasteKey}/{format}',
            controller: 'PasteController',
            templateUrl: '/app/paste/paste.html'
        },
        {
            name: 'paste_new',
            url: '/',
            controller: 'PasteController',
            templateUrl: '/app/paste/paste.html'
        }
    ],

    redirects: {
    }
});