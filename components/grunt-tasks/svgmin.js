module.exports = (function() {
  return {
    dist: {
      files: [
        {
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }
      ]
    }
  };
})();