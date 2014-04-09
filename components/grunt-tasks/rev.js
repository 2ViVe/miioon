module.exports = (function() {
  // Renames files for browser caching purposes
  return {
    dist: {
      files: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    }
  };
})();