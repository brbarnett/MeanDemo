var fs = require('fs');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var gp = require('gulp-plumber');
var plumber = function () {
    return gp({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    });
};
var path = require('path');
var rimraf = require('rimraf');

var paths = {
    dist: 'public',
    fontDependencies: [
      './node_modules/bootstrap/dist/fonts/**'
    ],
    index: 'src/index.html',
    libs: {
        css: 'public/libs/css',
        fonts: 'public/libs/fonts',
        js: 'public/libs/js'
    },
    scriptDependencies: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/underscore/underscore.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    scripts: 'src/**/*.js',
    styleDependencies: [
      './node_modules/bootstrap/dist/css/bootstrap.css'
    ],
    styles: 'src/**/*.less',
    templates: [
        'src/**/*.html',
        '!src/index.html'
    ]
};

gulp.task('clean', [], function(){
    console.log('removing dist directory....');
    if (fs.existsSync(paths.dist)) {
        rimraf.sync(paths.dist);
    }
    return fs.mkdirSync(paths.dist);
});

gulp.task('libs-js', [], function(){
   return gulp.src(paths.scriptDependencies)
    .pipe(plumber())
    .pipe(gulp.dest(paths.libs.js));
});

gulp.task('libs-css', [], function(){
    return gulp.src(paths.styleDependencies)
        .pipe(plumber())
        .pipe(gulp.dest(paths.libs.css));
});

gulp.task('libs-fonts', [], function(){
    return gulp.src(paths.fontDependencies)
        .pipe(plumber())
        .pipe(gulp.dest(paths.libs.fonts));
});

gulp.task('scripts', [], function () {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templates', [], function () {
    return gulp.src(paths.templates)
        .pipe(plumber())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', [], function () {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('index', [], function(){
   return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dependencies', ['libs-js', 'libs-css', 'libs-fonts']);

gulp.task('build', ['clean', 'dependencies', 'scripts', 'templates', 'styles', 'index']);