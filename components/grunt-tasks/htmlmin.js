module.exports = (function() {
  return {
    dist: {
      options: {
        collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
      },
      files: [
        {
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html', 'template/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }
      ]
    }
  };
})();