var Stream = require('stream')
var PassThrough = Stream.PassThrough
var fs = require('fs');
var gulp = require('gulp');
//var wiredep = require('wiredep');
var sourcemaps = require('gulp-sourcemaps');
//var ts = require('gulp-typescript');
//var runSequence = require('run-sequence');
//var changed = require('gulp-changed');
var less = require('gulp-less');
//var connect = require('gulp-connect');
//var open = require('open');
//var serveStatic = require('serve-static');
//var inject = require('gulp-inject');
var gp = require('gulp-plumber');
var plumber = function () {
    return gp({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    })
};
var path = require('path');
//var debug = require('gulp-debug');
//var proxy = require('proxy-middleware');
//var url = require('url');
//var es = require('event-stream');
//var ngTemplates = require('gulp-angular-templatecache');
//var rev = require("gulp-rev");
var rimraf = require('rimraf');
//var concat = require('gulp-concat');
//var ngAnnotate = require('gulp-ng-annotate');
//var uglify = require('gulp-uglify');
//var minifyCss = require('gulp-minify-css');

//var RESOURCE_SOURCE = 'src/resources/**';
//var JS_SCRIPT_SOURCE = 'src/**/*.js';
//var TS_SCRIPT_SOURCE = 'src/**/*.ts';
//var STYLE_SOURCE = 'src/**/*.less';
//var TEMPLATES_SOURCE = ['src/**/*.html', '!src/index.html'];
//var INDEX_SOURCE = 'src/index.html';
//var PORT = 1337;

/*var tsProject = ts.createProject({
    declartionFiles: true,
    noExternalResolve: true,
    sortProject: true
});*/

var paths = {
    dist: 'public',
    scripts: 'src/**/*.js',
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

gulp.task('scripts', [], function () {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templates', [], function () {
    return gulp.src(paths.templates)
        .pipe(plumber())
        //.pipe(changed('dist'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', [], function () {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist));
});