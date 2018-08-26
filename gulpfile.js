// see https://realpython.com/the-ultimate-flask-front-end/#react-round-one
/* global require */
"use strict";
const gulp = require("gulp");
const del = require("del");
const size = require("gulp-size");
const babel = require("gulp-babel");

gulp.task("del", function () {
  return del(["./static/js/**/*.js"]);
});

gulp.task("transform", function () {
  return gulp.src("./static/jsx/**/*.jsx")
    .pipe(size())
    .pipe(babel({ plugins: ["transform-react-jsx"] }))
    .pipe(gulp.dest("./static/js/"));
});

gulp.task(
  "default",
  ["del"],
  function () {
    gulp.start("transform");
    gulp.watch("./static/jsx/**/*.jsx", ["transform"]);
  }
);