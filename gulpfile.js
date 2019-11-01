/* global require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const svgstore = require('gulp-svgstore');
const include = require('gulp-include');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const del = require('del');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
// const ghPages = require('gulp-gh-pages');
const ghpages = require('gh-pages');
const webpackConfig = require('./webpack.config');

// в консоли `NODE_ENV=production gulp styles`
// eslint-disable-next-line no-undef
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
gulp.task('styles', () => {
  return gulp
    .src('app/scss/style.scss')
    // .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(debug({ title: 'src' }))
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    // .pipe(gulpIf(!isDevelopment, cssnano()))
    .pipe(debug({ title: 'sass' }))
    // .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('copy:html', () => {
  return gulp
    .src('app/*.html')
    .pipe(debug({ title: 'copy_images' }))
    .pipe(include())
    .pipe(gulp.dest('build/'));
});

gulp.task('copy:images', () => {
  return gulp
    .src('app/images/**/*.*', { since: gulp.lastRun('copy:images') })
    .pipe(debug({ title: 'copy_images' }))
    .pipe(gulp.dest('build/images'));
});

gulp.task('copy:fonts', () => {
  return gulp
    .src('app/fonts/**/*.{woff,woff2}', { since: gulp.lastRun('copy:fonts') })
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('make-symbols', () => {
  return gulp
    .src('app/images/svg-symbols/*.svg')
    .pipe(svgstore())
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/images'));
});

gulp.task('copy:script', () => {
  return gulp
    .src('app/js/script.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(
      webpackStream(webpackConfig, webpack)
    )
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('copy:html', 'copy:images', 'copy:fonts', 'copy:script'),
    gulp.parallel('styles', 'make-symbols')
  )
);

gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.*', gulp.series('styles'));
  gulp.watch(['app/*.html', 'app/blocks/*.*'], gulp.series('copy:html'));
  gulp.watch('app/images/**/*.*', gulp.series('copy:images'));
  gulp.watch('app/images/svg-symbols/*.svg', gulp.series('make-symbols'));
  gulp.watch('app/js/**/*', gulp.series('copy:script'));
});

gulp.task('serve', cb => {
  browserSync.init({
    server: 'build'
  });

  browserSync
    .watch(['app/*.html', 'app/blocks/*.*'])
    .on('change', browserSync.reload);

  cb();
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('deploy', cb => {
  ghpages.publish('dist', function() {});

  cb();
});
