var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');

var reload      = browserSync.reload;

var src = {
    scss:       'public/scss/*.scss',
    css:        'public/css',
    html:       'public/html/partials/*.html',
    htmlsrc:    'public/html/src/*.html',
    indexHTML:  'public/index.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass','fileinclude'], function() {

    browserSync({
        server: "./public"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html, ['fileinclude']);
    gulp.watch(src.htmlsrc, ['fileinclude']);
    gulp.watch(src.indexHTML).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('fileinclude', function() {
  gulp.src(src.htmlsrc)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['serve']);
