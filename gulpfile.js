var gulp = require('gulp'),
runSequence = require('run-sequence'),
browserSync = require('browser-sync').create(),
del = require("del"),
compass = require('gulp-compass'),
open = require('open'),
plumber = require("gulp-plumber"),
cssmin = require("gulp-cssmin"),
concat = require("gulp-concat"),
uglify = require("gulp-uglify"),
imagemin = require("gulp-imagemin")
;

var app = {
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/'
};

gulp.task('default',function(){
  return runSequence(['clean'],['build'],['serve','watch']);
})


gulp.task('lib',function(){
	gulp.src('libs/**/*.*')
	.pipe(gulp.dest(app.devPath + "vendor"))
	.pipe(gulp.dest(app.prdPath + "vendor"))
});



gulp.task('html',function(){
	gulp.src(app.srcPath + "**/*.html")
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
});

gulp.task('json',function(){
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
});

gulp.task('compass', function() {
  gulp.src(app.srcPath + '**/*.scss')
  .pipe(compass({
  	config_file:'./config.rb',
  	css:app.srcPath + "stylesheets",
  	sass:app.srcPath + "sass"
  }))
  .on('error',function(err){
  	console.log(err);
  	this.emit('end');
  })
  .pipe(plumber())
  .pipe(gulp.dest(app.devPath + 'css'))
  .pipe(cssmin())
  .pipe(gulp.dest(app.prdPath + 'css'))
});

gulp.task('js', function() {
  gulp.src(app.srcPath + 'scripts/**/*.js')
  .pipe(plumber())
  .pipe(concat('index.js'))
  .pipe(gulp.dest(app.devPath + 'js'))
  //.pipe(uglify())
  .pipe(gulp.dest(app.prdPath + 'js'))
});

gulp.task('image', function() {
  gulp.src(app.srcPath + 'images/**/*')
  .pipe(plumber())
  .pipe(gulp.dest(app.devPath + 'images'))
  .pipe(imagemin())
  .pipe(gulp.dest(app.prdPath + 'images'))
});

gulp.task('build',function(callback){
	return runSequence(['compass','image','js','lib','html','json'],callback);
});

gulp.task('clean', function(callback) {
  return del([app.devPath, app.prdPath],callback);
});

gulp.task('serve', function() {
 	browserSync.init({
 		server:'./dist',
 		port:3000
 	});
});

gulp.task('watch',function(){
	return gulp.watch([
			'libs/**/*',
			app.srcPath + '**/*.html',
			app.srcPath + 'data/**/*.json',
			app.srcPath + 'sass/**/*.scss',
			app.srcPath + 'scripts/**/*.js',
			app.srcPath + 'images/**/*'
		],function(){
			return runSequence(['build'],['reload']);
		});
});

gulp.task('reload',function(){
	return browserSync.reload();
});

