var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/paper-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('open', function() {
  gulp.src('examples/dashboard.html')
    .pipe(open());
});

gulp.task('open-app', ['open', 'watch']);


gulp.task('watch', ['browserSync', 'compile-scss'], function (){
  gulp.watch(Paths.SCSS, ['compile-scss']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./app/**/*.html', browserSync.reload); 
  gulp.watch('./assets/js/**/*.js', browserSync.reload); 
});