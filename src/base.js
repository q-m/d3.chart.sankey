"use strict";
/*jshint node: true */

var d3 = require("d3");
var Chart = require("d3.chart");

/*jshint newcap: false */
module.exports = Chart("Sankey.Base", {

	initialize: function() {
		var chart = this;

		// Inspired by d3.chart.layout.hierarchy's hierarchy.js, though also different
		chart.features	= {};
		chart.d3				= {};
		chart.layers		= {};

		// when using faux-dom, be sure to set the width and height attributes
		if (!chart.base.attr("width"))	{ chart.base.attr("width",	chart.base.node().parentNode.clientWidth);	}
		if (!chart.base.attr("height")) { chart.base.attr("height", chart.base.node().parentNode.clientHeight); }
		chart.base.attr("role", "graphics-document document");

		// dimensions, with space for node stroke and labels (smallest at bottom)
		chart.features.margins  = {top: 1, right: 1, bottom: 6, left: 1};
		chart.features.width    = chart.base.attr("width") - chart.features.margins.left - chart.features.margins.right;
		chart.features.height   = chart.base.attr("height") - chart.features.margins.top - chart.features.margins.bottom;

		chart.features.name     = function(d) { return d.name; };
		// there is no value property, because we also need to set it on parents
		chart.features.colorNodes = d3.scale.category20c();
		chart.features.colorLinks = null; // css styles by default

		chart.layers.base = chart.base.append("g")
			.attr("transform", "translate(" + chart.features.margins.left + "," + chart.features.margins.top + ")");
	},


	name: function(_) {
		if (!arguments.length) { return this.features.name; }
		this.features.name = _;

		this.trigger("change:name");
		if (this.root) { this.draw(this.root); }

		return this;
	},


	colorNodes: function(_) {
		if (!arguments.length) { return this.features.colorNodes; }
		this.features.colorNodes = _;

		this.trigger("change:color");
		if (this.root) { this.draw(this.root); }

		return this;
	},


	colorLinks: function(_) {
		if (!arguments.length) { return this.features.colorLinks; }
		this.features.colorLinks = _;

		this.trigger("change:color");
		if (this.data) { this.draw(this.data); }

		return this;
	}

});
