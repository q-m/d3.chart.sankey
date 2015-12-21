module.exports = function(grunt) {
	"use strict";

	grunt.config.set("jscs", {
		src: {
			options: {
				config: ".jscsrc"
			},
			src: [
				"<%= jshint.src.src %>",
				"<%= jshint.build.src %>"
			]
		}
	});

	grunt.loadNpmTasks("grunt-jscs");
};
