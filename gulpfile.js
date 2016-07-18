var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var src = {
    scss: 'public/scss/*.scss',
    css:  'public/css',
    html: 'public/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./public"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
