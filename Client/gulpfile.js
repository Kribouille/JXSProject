const gulp = require('gulp');
const ts = require("gulp-typescript");
const server = require('gulp-server-livereload');

var tsProject = ts.createProject('tsconfig.json');

const paths = {
    app : "app/",
    srcFiles : ["app/**/*.ts"]
};

gulp.task('build', function() {
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(paths.app));
});

gulp.task("watch", function() {
    gulp.watch(paths.srcFiles, ['build']);
});

gulp.task('webserver', ['build', 'watch'], () =>
    gulp.src(".")
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb(!/(\.idea)|(node_modules)|(\.js)|(\.git)/.test(filePath))
                }
            },
            directoryListing: false,
            open: true,
            port: 9000
        }))
);

gulp.task("default", ["build", "webserver"]);