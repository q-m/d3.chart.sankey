module.exports = function(grunt) {
	"use strict";

	grunt.config.set("jshint", {
		src: {
			options: {
				jshintrc: "src/.jshintrc"
			},
			src: ["src/*.js"]
		},
		build: {
			options: {
				jshintrc: "build/.jshintrc"
			},
			src: ["Gruntfile.js", "build/**/*.js"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
};
