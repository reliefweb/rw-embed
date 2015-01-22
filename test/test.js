var Code = require('code')
 , Lab = require('lab')
 , Server = require('../server');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('HTTP Endpoints', function () {
    it('available for "/"', function(done) {
        var options = {
            method: "GET",
            url: "/"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('available for "/v0"', function(done) {
        var options = {
            method: "GET",
            url: "/v0"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('available for "/v0/oembed"', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('not available for "/nowhere"', function(done) {
        var options = {
            method: "GET",
            url: "/nowhere"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});

describe('oEmbed implementation', function () {
    it('requires a url parameter', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed/image"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
    it('sets a default maxheight and maxwidth', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed/image?url=placeholder"
        };
        Server.inject(options, function(response) {
            expect(response.result.height).to.equal(600);
            expect(response.result.width).to.equal(600);
            done();
        });
    });
    it('limits height to maxheight', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed/image?url=placeholder&maxheight=10"
        };
        Server.inject(options, function(response) {
            expect(response.result.height).to.equal(10);
            done();
        });
    });
    it('limits width to maxwidth', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed/image?url=placeholder&maxwidth=10"
        };
        Server.inject(options, function(response) {
            expect(response.result.width).to.equal(10);
            done();
        });
    });
    it('must be of a valid type', function(done) {
        var options = {
            method: "GET",
            url: "/v0/oembed/nat?url=placeholder&maxheight=10&maxwidth=20"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
});

describe('iFrame resources', function() {
    it('must be of a valid type', function(done) {
        var options = {
            method: "GET",
            url: "/v0/iframe/nat?url=placeholder&maxheight=10&maxwidth=20"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
});

describe('Widget resources', function() {
    it('must be of a valid type', function(done) {
        var options = {
            method: "GET",
            url: "/v0/widgets/nat?url=placeholder&maxheight=10&maxwidth=20"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
    it('has working paths to bower_components', function(done) {
        var options = {
            method: "GET",
            url: "/bower_components/handlebars/handlebars.js"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('can load the reliefweb-widgets.js library', function(done) {
        var options = {
            method: "GET",
            url: "/dist/reliefweb-widgets.js"
        };
        Server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

