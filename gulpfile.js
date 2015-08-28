var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack');//,
    //ftp = require('vinyl-ftp'),
    //usemin = require('gulp-usemin'),
    //uglify = require('gulp-uglify'),
    //minifyCss = require('gulp-minify-css');

gulp.task('dependencies-js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(webpack())
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('dependencies-css', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/font-awesome/css/font-awesome.css'
    ]).pipe(gulp.dest('./public/assets/css'));
});

gulp.task('dependencies-fonts', function () {
    return gulp.src([
        './node_modules/bootstrap/fonts/*',
        './node_modules/font-awesome/fonts/*'
    ]).pipe(gulp.dest('./public/assets/fonts'));
});

gulp.task('build-js', function () {
    return gulp.src('./src/assets/js/*.js')
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('build-css', function () {
    return gulp.src('./src/assets/less/[^_]*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/assets/css'));
});
gulp.task('build-css-gently', function () {
    return gulp.src('./src/assets/less/[^_]*.less')
        .pipe(less())
        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('build-images', function () {
    return gulp.src('./src/assets/images/*')
        .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('build-fonts', function () {
    return gulp.src([
        './src/assets/fonts/*',
        './src/assets/webfonts/*'])
        .pipe(gulp.dest('./public/assets/fonts'));
});

gulp.task('build-html', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('build', [
    'dependencies-js',
    'dependencies-css',
    'dependencies-fonts',
    'build-js',
    'build-css',
    'build-images',
    'build-fonts',
    'build-html']);

gulp.task('build-html-prod', ['build'], function () {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            jsDependencies: [uglify()],
            js: [uglify()],
            cssDependencies: [minifyCss()],
            css: []
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('build-prod', ['build-html-prod']);

gulp.task('watch', function () {
    gulp.watch('./src/assets/js/*.js', ['build-js']);
    gulp.watch('./src/assets/less/*.less', ['build-css-gently']);
    gulp.watch('./src/index.html', ['build-html']);
});

gulp.task('deploy', ['build-prod'], function () {
    var conn = ftp.create({
        host: 'esgweb01.cloudapp.net',
        user: 'EsgWebAdmin',
        pass: 'EchoFtp123!'
    });

    return gulp.src([
        './public/**',
        './*.js',
        './package.json',
        './web.config'
    ], {base: '.', buffer: false})
        .pipe(conn.dest('/midstatescapital.com'));
});