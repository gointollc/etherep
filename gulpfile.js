var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-css');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('css', function() {
  return gulp.src('etherep/src/scss/etherep.scss')
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('etherep/dist/css'))
});

gulp.task('deps', () => {
  return gulp.src([
    'node_modules/web3/dist/web3.min.js',
    'node_modules/mustache/mustache.js',
    ])
    .pipe(gulp.dest('etherep/dist/js'));
});

gulp.task('js', () => {
  return gulp.src([
    'node_modules/page/page.js',
    'etherep/src/js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('etherep.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('etherep/dist/js'));
});

gulp.task('html', () => {
    gulp.src([
        'etherep/src/templates/index.html'
    ])
    .pipe(gulp.dest('etherep/dist/html/'))
});

gulp.task('default', [ 'css', 'deps', 'js', 'html' ]);