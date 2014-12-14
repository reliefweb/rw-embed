'use strict';

// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply){
            var json = {
                _links: {
                    self: { href: request.server.info.uri }
                },
                data: {
                    oembed: {
                        title: 'oEmbed Services',
                        href: request.server.info.uri + '/v0/oembed'
                    }
                }
            };
            reply(json).type('application/hal+json');
        },
        app: {
            name: 'index'
        }
    },
    v0: {
        handler: function(request, reply){
            var json = {
                _links: {
                    self: { href: request.server.info.uri }
                },
                data: {
                    oembed: {
                        title: 'oEmbed Services',
                        href: request.server.info.uri + '/v0/oembed'
                    }
                }
            };
            reply(json).type('application/hal+json');
        },
        app: {
            name: 'v0'
        }
    },
    missing: {
        handler: function(request, reply){
            reply('404').code(404);
        },
        app: {
            name: '404'
        }
    }
};
