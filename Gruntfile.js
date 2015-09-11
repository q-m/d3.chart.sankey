module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    meta: {
      pkg: grunt.file.readJSON("package.json"),

      source: ["src/**/*.js", '!src/wrapper/*'],

      banner: "/*!\n" +
              " * <%= meta.pkg.name %> - v<%= meta.pkg.version %>\n" +
              " * <%= meta.pkg.homepage %>\n" +
              " * \n" +
              " * Copyright (c) 2015 <%= meta.pkg.author %>\n" +
              " * Library released under <%= meta.pkg.license %> license.\n" +
              " */\n"
    },

    watch: {
      scripts: {
        files: "<%= meta.source %>",
        tasks: ["concat"]
      }
    },

    jshint: {
      options: {
        curly: true,
        undef: true
      },
      chart: {
        options: {
          browser: true,
          globals: {
            d3: true
          }
        },
        files: {
          src: "<%= meta.source %>"
        }
      },
      grunt: {
        options: {
          node: true
        },
        files: {
          src: ["Gruntfile.js"]
        }
      }
    },

    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      build: {
        files: {
          "d3.chart.sankey.js":
          [
            "src/wrapper/start.frag",
            "src/base.js",
            "src/sankey.js",
            "src/selection.js",
            "src/path.js",
            "src/wrapper/end.frag"
          ]
        }
      }
    },

    uglify: {
      options: {
        preserveComments: "false"
      },
      release: {
        files: {
          "d3.chart.sankey.min.js": "d3.chart.sankey.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["concat"]);
  grunt.registerTask("release", ["jshint", "concat", "uglify"]);
};
