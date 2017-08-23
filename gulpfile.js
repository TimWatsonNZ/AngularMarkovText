var gulp = require('gulp'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer');

var webserver = require("gulp-webserver");

var BUILD_DIR = { 
    client: 'build/public/js',
    server: "build",
    html: "build/public"
};

function compile() {
    var bundler = browserify('./src/client/generator.js');

    return bundler
        .transform('babelify', { 
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest(BUILD_DIR.client));
}

gulp.task('build:client', () => {
    return compile();
});

gulp.task('build:html', () => {
    return gulp.src(['./src/**.html', '!node_modules/**/*'])
    .pipe(gulp.dest(BUILD_DIR.html));
})

gulp.task('build', ['build:client', 'build:html']);

gulp.task("build:server", () => {
    return gulp.src(["./src/server/**.js"])
               .pipe(gulp.dest(BUILD_DIR.server));
});

gulp.task("webserver", () => {
    gulp.src("build")
    .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true
      }));
});