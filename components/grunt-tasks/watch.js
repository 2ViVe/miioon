module.exports = (function() {
  // Watches files for changes and runs tasks based on the changed files
  return {
    js: {
      files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
      tasks: ['newer:jshint:all'],
      options: {
        livereload: '<%= 2ViVe.livereload %>'
      }
    },
    jsTest: {
      files: ['test/spec/{,*/}*.js'],
      tasks: ['newer:jshint:test', 'karma']
    },
    compass: {
      files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
      tasks: ['compass:server', 'autoprefixer']
    },
    gruntfile: {
      files: ['Gruntfile.js']
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        '<%= yeoman.app %>/{,*/}*.html',
        '.tmp/styles/{,*/}*.css',
        '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    }
  }
})();
