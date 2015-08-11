var gulp = require('gulp');
var bower = require('gulp-bower');
var domSrc = require('gulp-dom-src');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var cheerio = require('gulp-cheerio');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var angularTemplates = require('gulp-angular-templates');
var browserSync = require('browser-sync');
var pjson = require('./package.json');
var reload = browserSync.reload;

gulp.task('bower', function() {
  return bower({ cmd: 'update'});
});

gulp.task('build:templates', function() {
  return gulp.src('client/app/**/*.html')
    .pipe(angularTemplates({module: 'artemis', basePath: 'app/'}))
    .pipe(concat('app.templates.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:css', function() {
  return domSrc({file:'client/index.html', selector:'link', attribute:'href'})
    .pipe(concat('app.full.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:js', function() {
  return domSrc({file:'client/index.html', selector:'script', attribute:'src'})
    .pipe(concat('app.full.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:indexHtml', function() {
  return gulp.src('client/index.html')
    .pipe(cheerio(function($) {
      $('script').remove();
      $('link').remove();
      $('body').append('<script src="app.full.min.js"></script>');
      $('body').append('<script src="app.templates.min.js"></script>');
      $('head').append('<link rel="stylesheet" href="app.full.min.css">');
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:all', ['build:css', 'build:js', 'build:templates', 'build:indexHtml']);

gulp.task('build', ['bower'], function() {
  return gulp.start('build:all');
});

gulp.task('lint', function() {
  return gulp.src(['*.js', 'client/**/*.js', '!client/bower_components/**/*.js', 'server/**/*.js'])
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);

gulp.task('watch:server', function() {
  nodemon({
    script: pjson.main,
    watch: 'server/**/*.js'
  }).on('restart', function() {
    setTimeout(reload, 500);
  });
});

gulp.task('watch:client', function() {
  browserSync({
    proxy: {
      target: 'localhost:4568'
    }
  });

  gulp.watch(['client/**/*.html', 'client/**/*.css', 'client/**/*.js'], reload);
});

gulp.task('watch', ['watch:client', 'watch:server']);

gulp.task('default', ['watch']);
