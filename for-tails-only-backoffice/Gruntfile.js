// Generated on 2014-03-03 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    '2ViVe': grunt.file.readJSON('grunt.json'),

    watch: require('2ViVe/grunt-tasks/watch'),
    connect: require('2ViVe/grunt-tasks/connect'),
    jshint: require('2ViVe/grunt-tasks/jshint'),
    clean: require('2ViVe/grunt-tasks/clean'),
    autoprefixer: require('2ViVe/grunt-tasks/autoprefixer'),
    bowerInstall: require('2ViVe/grunt-tasks/bowerInstall'),
    compass: require('2ViVe/grunt-tasks/compass'),
    rev: require('2ViVe/grunt-tasks/rev'),
    useminPrepare: require('2ViVe/grunt-tasks/useminPrepare'),
    usemin: require('2ViVe/grunt-tasks/usemin'),
    imagemin: require('2ViVe/grunt-tasks/imagemin'),
    svgmin: require('2ViVe/grunt-tasks/svgmin'),
    htmlmin: require('2ViVe/grunt-tasks/htmlmin'),
    ngmin: require('2ViVe/grunt-tasks/ngmin'),
    cdnify: require('2ViVe/grunt-tasks/cdnify'),
    copy: require('2ViVe/grunt-tasks/copy'),
    concurrent: require('2ViVe/grunt-tasks/concurrent'),

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    karma: require('2ViVe/grunt-tasks/karma')
  });

  grunt.registerTask('proxy', function(target) {
    grunt.task.run('configureProxies:APIServer');

    if (target === 'dist') {
      return grunt.task.run([
        'build'
//        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'configureProxies:local',
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
