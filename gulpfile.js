const gulp = require('gulp');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const img64 = require('gulp-img64');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const prefixer = require('autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
const browserSync = require('browser-sync');
const gulpConfig = require('./config.gulp');
const gutil = require('gulp-util');
const reload = browserSync.reload;
const source = require('vinyl-source-stream');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// run server
gulp.task('webserver', function () {
    browserSync( gulpConfig.browserSyncConfig );
});

gulp.task('copyFonts', function (done) {
    gulp.src(gulpConfig.src.fonts)
        .pipe(gulp.dest(gulpConfig.build.fonts));
    done();
});

gulp.task('js:build', function (done) {
    browserify({entries: gulpConfig.src.js, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error',gutil.log)
        .pipe(plumber())
        .pipe( source('bundle.js') )
        .pipe(plumber.stop())
        .pipe( gulp.dest(gulpConfig.build.js) )
        .pipe( reload({stream: true}) );
    done()
});

gulp.task('style:build', function (done) {
    gulp.src(gulpConfig.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            prefixer({
                browsers: ['last 2 versions']
            })
        ]))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(gulpConfig.build.css))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('html:build', function(done) {
    var YOUR_LOCALS = {};

    gulp.src( gulpConfig.src.html )
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .on('error',gutil.log)
        .pipe(img64())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe( gulp.dest(gulpConfig.build.html) )
        .pipe( reload({stream: true}) );
    done();
});

gulp.task('build', [
    'copyFonts',
    'js:build',
    'style:build',
    'html:build'
]);

gulp.task('watch', function(done){
    gulp.watch([gulpConfig.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([gulpConfig.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([gulpConfig.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    done();
});

gulp.task('default', ['build', 'webserver', 'watch']);