'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

var browserFunction =  function() {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 4000,
    open: false
  });
}
var sassFunction = function () {
  return gulp.src('scss/*.scss')
              .pipe(sass())
              .pipe(gulp.dest('css'))
              .pipe(browserSync.reload({stream: true}));
}


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    watch: ['app.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserFunction();
});

gulp.task('js',  function () {
  return gulp.src('*.js')
});

gulp.task('css', function () {
  return gulp.src('*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('js/*.js',   ['js', browserSync.reload]);
  gulp.watch("scss/*.scss", sassFunction);
  gulp.watch('*.html', ['bs-reload']);
});
