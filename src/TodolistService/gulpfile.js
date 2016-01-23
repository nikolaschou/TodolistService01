/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    jsmin = require("gulp-jsmin"),
    uglify = require("gulp-uglify"),
    mainBowerFiles = require('gulp-main-bower-files'),
    flatten = require('gulp-flatten'),
    debug = require("gulp-debug");

var paths = {
    webroot: "./wwwroot/"
};

paths.distFolder = paths.webroot + "dist/";
paths.jsApp = [paths.webroot + "**/*.js",  "!" + paths.webroot + "lib/**/*.js", "!**/*-bak.js", "!" + paths.distFolder + "**/*.js", "!**/_*.js"];
paths.jsVendor = [paths.webroot + "lib/**/*.js", , "!*-bak.js"];
paths.jsVendorBower =  "./bower.json";

paths.distJsApp = paths.distFolder + "app.js";
paths.distJsVendor = paths.distFolder + "vendor.js";

paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf("{"+paths.webroot + "lib-main"+","+paths.distFolder+"}",cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);



gulp.task("min:js-app", function () {
    return gulp.src(paths.jsApp, { base: "." })
        .pipe(debug())
        .pipe(concat(paths.distJsApp))
        .pipe(jsmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:js-vendor", function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(debug())
        .pipe(flatten())
        .pipe(gulp.dest(paths.webroot+"lib-main"))
        .pipe(concat(paths.distJsVendor))
        .pipe(jsmin())
        .pipe(gulp.dest("."))
});
 


gulp.task("min:js", ["min:js-app", "min:js-vendor"]);

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
