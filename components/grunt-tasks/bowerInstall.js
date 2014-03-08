module.exports = (function() {
  // Automatically inject Bower components into the app
  return {
    app: {
      cwd: '<%= yeoman.app %>',
      src: '<%= yeoman.app %>/index.html',
      ignorePath: '<%= yeoman.app %>/',
      exclude: ['bower_components/foundation/css/foundation.css']
    }
  };
})();