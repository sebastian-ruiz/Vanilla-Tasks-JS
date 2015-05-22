var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var watch = require('gulp-watch');


gulp.task('default', function(){
	gulp.start('watch');
});

// Compiles LESS > CSS 
gulp.task('less-compile', function(){
    return gulp.src('static/less/_style.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('static/css'))
        .pipe(notify({ message: 'recompiled less.' }))
        .pipe(livereload());
});

gulp.task('watch', function() {
	gulp.src('static/less/*.less')
		.pipe(watch(function(files) {
			gulp.start('less-compile');
		})
	);
	gulp.src('./*.html')
		.pipe(watch(function(files) {
			gulp.src('./*.html')
			.pipe(notify({ message: 'reload html.' }))
			.pipe(livereload());
		})
	);
});