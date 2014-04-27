module.exports = (function() {
  // The actual grunt server settings
  return {
    options: {
      port: '<%= 2ViVe.port %>' || 9000,
      // Change this to '0.0.0.0' to access the server from outside.
      hostname: '<%= 2ViVe.hostname %>' || 'localhost',
      livereload: '<%= 2ViVe.livereload %>' || 35729,
      protocol: '<%= 2ViVe.protocol %>' || 'http'
    },
    livereload: {
      options: {
        open: true,
        base: [
          '.tmp',
          '<%= yeoman.app %>'
        ],
        middleware: function(connect, options) {
          var middlewares = [];
          var directory = options.directory || options.base[options.base.length - 1];
          if (!Array.isArray(options.base)) {
            options.base = [options.base];
          }
          options.base.forEach(function(base) {
            // Serve static files.
            middlewares.push(connect.static(base));
          });

          // Setup the proxy
          middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

          // Make directory browse-able.
          middlewares.push(connect.directory(directory));

          return middlewares;
        }
      }
    },
    test: {
      options: {
        port: 9001,
        base: [
          '.tmp',
          'test',
          '<%= yeoman.app %>'
        ]
      }
    },
    dist: {
      options: {
        base: '<%= yeoman.dist %>'
      }
    },
    APIServer: {
      proxies: [
        {
          context: '/api',
          host: '<%= 2ViVe.APIServerIP %>',
          port: '<%= 2ViVe.APIServerPort %>',
          changeOrigin: true,
          xforward: true,
          rewrite: {
            '^/api': ''
          }
        }
      ]
    },
    local: {
      proxies: [
        {
          context: '/api',
          host: 'localhost',
          port: '8080'
        }
      ]
    }
  }
})();
