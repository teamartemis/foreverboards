var gulp = require('gulp');
var domSrc = require('gulp-dom-src');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var cheerio = require('gulp-cheerio');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var pjson = require('./package.json');

gulp.task('build:css', function() {
  return domSrc({file:'client/index.html', selector:'link', attribute:'href'})
    .pipe(concat('app.full.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:js', function() {
  return domSrc({file:'client/index.html', selector:'script', attribute:'src'})
    .pipe(concat('app.full.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:indexHtml', function() {
  return gulp.src('client/index.html')
    .pipe(cheerio(function($) {
      $('script').remove();
      $('link').remove();
      $('body').append('<script src="app.full.min.js"></script>');
      $('head').append('<link rel="stylesheet" href="app.full.min.css">');
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['build:css', 'build:js', 'build:indexHtml']);

gulp.task('lint', function() {
  return gulp.src(['*.js', 'client/**/*.js', '!client/bower_components/**/*.js', 'server/**/*.js'])
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);

gulp.task('watch', function() {
  nodemon({
    script: pjson.main,
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['watch']);
