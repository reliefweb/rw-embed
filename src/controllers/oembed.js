'use strict';

var Joi = require('joi'),
    W = require('../util/common');

module.exports = {
    list: {
        description: 'List all available oembed widgets',
        handler: function(request, reply) {
            var json = W.listWidgets(request.server.info.uri, request.url.href);
            reply(json).type('application/hal+json');
        },
        app: {
            name: 'list'
        }
    },
    widget: {
        description: 'Generate the oembed response for the requested widget type.',
        handler: function(request, reply) {
            var hypermedia = require('../util/hypermedia')(request.server.info.uri);
            var height = request.query.maxheight;
            var width = request.query.maxwidth;

            var html = '<iframe src="' + hypermedia.uri('/v0/widgets')
                + '/' + request.params.type + '" width="' + height
                + '" height="' + width + '"></iframe>';

            var json = {
                type: 'rich',
                version: '1.0',
                title: W.title(request.params.type),
                author_name: 'ReliefWeb',
                author_url: 'http://reliefweb.int',
                html: html,
                height: height,
                width: width
            };
            reply(json);
        },
        validate: {
            query: {
                url: Joi.required(),
                maxwidth: Joi.number().integer().min(1).default(600),
                maxheight: Joi.number().integer().min(1).default(600),
                // Apparently no way to blanket allow parameters.
                limit: Joi.optional(),
                offset: Joi.optional(),
                preset: Joi.optional(),
                profile: Joi.optional(),
                filters: Joi.optional(),
                facets: Joi.optional(),
                query: Joi.optional(),
                sort: Joi.optional(),
                fields: Joi.optional()
            },
            params: {
                type: Joi.valid(W.registry)
            }
        },
        app: {
            name: 'widget'
        }
    }
};
