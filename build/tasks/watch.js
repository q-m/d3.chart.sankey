module.exports = function(grunt) {
	"use strict";

	grunt.config.set("watch", {
		scripts: {
			files: ["src/**/*.js"],
			tasks: ["jshint", "build"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
};
