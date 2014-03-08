module.exports = (function() {
  // Replace Google CDN references
  return {
    dist: {
      html: ['<%= yeoman.dist %>/*.html']
    }
  };
})();