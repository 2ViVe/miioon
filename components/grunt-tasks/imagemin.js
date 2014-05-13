module.exports = (function() {
  // The following *-min tasks produce minified files in the dist folder
  return {
    dist: {
      options: {
        optimizationLevel: '<%= 2ViVe.optimizationLevel %>'
      },
      files: [
        {
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }
      ]
    }
  };
})();