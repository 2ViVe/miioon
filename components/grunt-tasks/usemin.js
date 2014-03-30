module.exports = (function() {
  // Performs rewrites based on rev and the useminPrepare configuration
  return {
    html: ['<%= yeoman.dist %>/{,**/}*.html'],
    css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
    options: {
      assetsDirs: ['<%= yeoman.dist %>']
    }
  };
})();