module.exports = (function() {
  // Run some tasks in parallel to speed up the build process
  return {
    server: [
      'compass:server'
    ],
    test: [
      'compass'
    ],
    dist: [
      'compass:dist',
      'imagemin',
      'svgmin'
    ]
  };
})();