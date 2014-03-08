module.exports = (function() {
  // Add vendor prefixed styles
  return {
    options: {
      browsers: ['last 1 version']
    },
    dist: {
      files: [
        {
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }
      ]
    }
  }
})();