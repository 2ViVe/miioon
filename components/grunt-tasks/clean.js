module.exports = (function() {
  // Empties folders to start fresh
  return {
    dist: {
      files: [
        {
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }
      ]
    },
    server: '.tmp'
  };
})();