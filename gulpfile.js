const del           = require('del');
const gulp          = require('gulp');
const browsersync   = require('browser-sync').create();
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');
const gulpIf        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps');
const sass          = require('gulp-sass')(require('sass'));
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const sortMedia     = require('postcss-sort-media-queries');

const config = require('./gulpConfig.js')();
const isDevelopment = !config.env || config.env === 'development';
const isProduction = !isDevelopment;

gulp.task('styles:clean', function () {
  return del(config.styles.dest)
});

gulp.task('styles:make', function(cb) {
  return gulp.src(config.styles.src)
    .pipe(plumber())
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass(config.styles.sass).on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    }))
    .pipe(postcss([
      sortMedia(config.styles.sortMedia),
      autoprefixer(config.styles.autoprefixer),
      cssnano(config.styles.cssnano),
    ]))
    .pipe(gulpIf(isDevelopment, sourcemaps.write(config.styles.sourcemaps.path, config.styles.sourcemaps.configs)))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browsersync.stream())
    .on('error', notify.onError())
});
// BrowserSync
gulp.task('browserSync', function(done) {
  browsersync.init(config.browsersync);
  done();
});

// BrowserSync Reload
gulp.task('reload', function(done) {
  browsersync.reload();
  done();
});

gulp.task('watch', function(){
  gulp.watch(config.styles.watch, gulp.series('styles:make'));
});

// register task
gulp.task('default', gulp.parallel(gulp.series('styles:clean', 'styles:make'), 'watch', 'browserSync'));

