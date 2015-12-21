var webpack = require("webpack");

module.exports = function(grunt) {
	"use strict";

	grunt.config.set("webpack", {
		options: require("../webpack.config.js"),
		dist: {
			output: {
				filename: "d3.chart.sankey.js"
			}
		},
		"dist-min": {
			output: {
				filename: "d3.chart.sankey.min.js",
				sourceMapFilename: "d3.chart.sankey.min.map",
			},
			devtool: "source-map",
			plugins: [
				new webpack.optimize.UglifyJsPlugin()
			]
		}
	});

	grunt.loadNpmTasks("grunt-webpack");
};
