module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      target: ['server/**/*.js', 'client/**/*.js', '!client/bower_components/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('default', ['eslint']);
};
