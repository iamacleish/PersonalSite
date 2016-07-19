var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');

var reload      = browserSync.reload;

var src = {
    //Scss and css.
    scss:           'private/scss/*.scss',
    css:            'public/css',

    HTMLpartial:    'private/partials/*.html',

    //The main index. Target of serve.
    indexHTMLsrc:   'private/index.html',
    indexHTMLdest:  './public',

    //this is the html template and destination.
    HTMLsrc:        'private/html/**/*.html',
    HTMLdest :      './public/html',

    indexHTML:      'public/index.html' //actual target of gulp
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass','fileinclude'], function() {

    browserSync({
        server: "./public"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.HTMLpartial, ['fileinclude']);
    gulp.watch(src.indexHTMLsrc, ['fileinclude']);
    gulp.watch(src.HTMLsrc, ['fileinclude']);
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
  //build index
  gulp.src(src.indexHTMLsrc)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(src.indexHTMLdest));


  //build other files.
  gulp.src(src.HTMLsrc)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(src.HTMLdest));

});

gulp.task('default', ['serve']);
