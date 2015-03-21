module.exports = function (grunt) {

  var logLevel =
    grunt.option('log-level') ||
    (grunt.option('debug') ? 'trace' : 'info');

  var sdkVersion = grunt.option('sdk-version');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      "app": [ 'test/fake-titanium-app/build' ],
      "modules": [ 'test/fake-titanium-app/modules' ],
      "spec": [ 'test/fake-titanium-app/Resources/spec' ]
    },

    titanium: {
      options: {
        command: 'build',
        logLevel: logLevel,
        projectDir: './test/fake-titanium-app',
        failure: /TESTS WITH FAILURES/i,
        success: /TESTS ALL OK/i
      },
      "ios": { options: { platform: 'ios' } },
      "droid": { options: { platform: 'android' } }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('tiapp', 'Set up tiapp.xml info', function () {
    var appDir = 'test/fake-titanium-app';
    var source = appDir + '/tiapp.source.xml';
    var target = appDir + '/tiapp.xml';

    grunt.file.copy(source, target);

    var tiapp = require('tiapp.xml').load(target);

    if (sdkVersion) {
      grunt.log.writeln("Set sdk-version to " + sdkVersion);
      tiapp.sdkVersion = sdkVersion;
      tiapp.write();
    }

    grunt.log.ok("Wrote tiapp.xml");
  });

  grunt.registerTask('test:ios', [ 'tiapp', 'titanium:ios' ]);
  grunt.registerTask('test:droid', [ 'tiapp', 'titanium:droid' ]);

  grunt.registerTask('ios', [ 'clean', 'test:ios' ]);
  grunt.registerTask('droid', [ 'clean', 'test:droid' ]);

  grunt.registerTask('default', [ ]);

};
