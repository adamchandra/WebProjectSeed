module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      working: {
        src: ['./dist/', './dist_test/', './.temp/']
      }
    },
    jade: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './src/',
            src: '**/*.jade',
            ext: '.html',
            dest: './.temp/'
          }
        ],
        options: {
          pretty: true,
          compileDebug: true,
          data: {
            config: {
              environment: 'dev'
            }
          }
        }
      },
      prod: {
        files: '<%= jade.dev.files %>',
        options: {
          pretty: false,
          compileDebug: false,
          data: {
            config: {
              environment: 'prod'
            }
          }
        }
      }
    },
    coffee: {
      scripts: {
        files: [
          {
            cwd: './src/',
            src: 'scripts/**/*.coffee',
            dest: './.temp/',
            expand: true,
            ext: '.js'
          }, {
            cwd: './test/',
            src: 'scripts/**/*.coffee',
            dest: './dist_test/',
            expand: true,
            ext: '.js'
          }
        ],
        options: {
          bare: true
        }
      },
      jslove: {
        files: [
          {
            cwd: './',
            src: ['**/*.coffee', '!**/node_modules/**'],
            dest: './',
            expand: true,
            ext: '.js'
          }
        ],
        options: '<%= coffee.scripts.options %>'
      }
    },
    connect: {
      livereload: {
        options: {
          base: './dist/',
          middleware: require('./middleware'),
          port: 0
        }
      }
    },
    copy: {
      dev: {
        files: [
          {
            cwd: './.temp/',
            src: '**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      img: {
        files: [
          {
            cwd: './src/',
            src: 'img/**/*.png',
            dest: './.temp/',
            expand: true
          }
        ]
      },
      "public": {
        files: [
          {
            cwd: './src/',
            src: 'public/**',
            dest: './.temp/',
            expand: true
          }
        ]
      },
      js: {
        files: [
          {
            cwd: './src/',
            src: 'scripts/**/*.js',
            dest: './.temp/',
            expand: true
          }, {
            cwd: './src/',
            src: 'scripts/**/*.js',
            dest: './dist_test/',
            expand: true
          }
        ]
      },
      prod: {
        files: [
          {
            cwd: './.temp/',
            src: ['img/**/*.png', 'scripts/libs/html5shiv-printshiv.js', 'scripts/libs/json2.js', 'scripts/scripts.min.js', 'scripts/scripts.min.js.map', 'scripts/scripts.min.js.src', 'styles/styles.min.css'],
            dest: './dist/',
            expand: true
          }, {
            './dist/index.html': './.temp/index.min.html'
          }
        ]
      },
      scripts: {
        files: [
          {
            cwd: './.temp/',
            src: 'scripts/**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      styles: {
        files: [
          {
            cwd: './.temp/',
            src: 'styles/**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      views: {
        files: [
          {
            cwd: './.temp/',
            src: '**/*.html',
            dest: './dist/',
            expand: true
          }
        ]
      }
    },
    imagemin: {
      img: {
        files: [
          {
            cwd: './src/',
            src: 'img/**/*.png',
            dest: './.temp/',
            expand: true
          }
        ],
        options: {
          optimizationLevel: 7
        }
      }
    },
    karma: {
      unit: {
        options: {
          autoWatch: true,
          browsers: ['Chrome'],
          colors: true,
          configFile: './karma.conf.js',
          keepalive: true,
          port: 8081,
          reporters: ['progress'],
          runnerPort: 9100,
          singleRun: true
        }
      }
    },
    less: {
      styles: {
        files: {
          './.temp/styles/styles.css': './src/styles/styles.less'
        }
      }
    },
    minifyHtml: {
      prod: {
        files: {
          './.temp/index.min.html': './.temp/index.html'
        }
      }
    },
    ngTemplateCache: {
      views: {
        files: {
          './.temp/scripts/views.js': './.temp/views/**/*.html'
        },
        options: {
          trim: './.temp'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: './src/scripts/**',
        tasks: ['coffee:scripts', 'copy:js', 'copy:scripts']
      },
      "public": {
        files: './src/public/**',
        tasks: ['copy:public']
      },
      styles: {
        files: './src/styles/**/*.less',
        tasks: ['less', 'copy:styles']
      },
      jade: {
        files: './src/**/*.jade',
        tasks: ['jade:dev', 'copy:views']
      },
      routes: {
        files: 'routes.coffee'
      }
    },
    requirejs: {
      scripts: {
        options: {
          baseUrl: './.temp/scripts/',
          findNestedDependencies: true,
          logLevel: 0,
          mainConfigFile: './.temp/scripts/main.js',
          name: 'main',
          onBuildWrite: function(moduleName, path, contents) {
            var modulesToExclude, shouldExcludeModule;
            modulesToExclude = ['main'];
            shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;
            if (shouldExcludeModule) {
              return '';
            }
            return contents;
          },
          optimize: 'uglify2',
          out: './.temp/scripts/scripts.min.js',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          skipModuleInsertion: true,
          uglify: {
            no_mangle: false
          }
        }
      },
      styles: {
        options: {
          baseUrl: './.temp/styles/',
          cssIn: './.temp/styles/styles.css',
          logLevel: 0,
          optimizeCss: 'standard',
          out: './.temp/styles/styles.min.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hustler');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');
  grunt.registerTask('test', ['default', 'karma']);
  grunt.registerTask('server', ['connect', 'open', 'watch']);
  grunt.registerTask('jslove', ['coffee:jslove', 'clean:jslove']);
  grunt.registerTask('default', ['clean:working', 'coffee:scripts', 'less', 'jade:dev', 'copy:img', 'copy:js', 'copy:public', 'copy:dev']);
  grunt.registerTask('dev', ['default', 'watch']);
  return grunt.registerTask('prod', ['clean:working', 'coffee:scripts', 'copy:js', 'copy:public', 'less', 'imagemin', 'ngTemplateCache', 'requirejs', 'jade:prod', 'minifyHtml', 'copy:prod']);
};