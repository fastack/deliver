var FastackDelivery = require('../index.js');

describe("Test configuration middleware", function() {
	var req = {};
	var res = {};
	var next = function() {};
	req.FASTACK = {};

	it("always configures (sets req.FASTACK.config) in production", function() {
		FastackDelivery.configure('production')(req, res, next);
		expect(req.FASTACK.config).toBeDefined();
		expect(req.FASTACK.config).toEqual(jasmine.any(Object));
	});

	it("always configures (sets req.FASTACK.config) in development", function() {
		FastackDelivery.configure('development')(req, res, next);
		expect(req.FASTACK.config).toBeDefined();
		expect(req.FASTACK.config).toEqual(jasmine.any(Object));
	});

});

describe("Test routing", function() {
	var req = {
		headers: {}
	};
	var res = {};
	var next = function() {};
	req.FASTACK = {};
	var customRoutes = {

	}
});