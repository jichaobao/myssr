const gulp = require('gulp');
var ts = require('gulp-typescript');

let build = null;
var tsProject = ts.createProject('tsconfig.json');
const entry = './src/server/**/*.ts';
function buildDev() {
        var tsResult = gulp.src(entry)
                .pipe(tsProject());

        return tsResult.js.pipe(gulp.dest("dist"));
}

if (process.env.NODE_ENV === "development") {
        build = gulp.series(buildDev);
}

if (process.env.NODE_ENV === "production") {

}

gulp.task("default", build);

gulp.watch(entry, build);