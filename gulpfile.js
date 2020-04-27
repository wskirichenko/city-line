
const concat      = require('gulp-concat');
const concatCss   = require('gulp-concat-css');
const minify      = require('gulp-minify');
const cssmin      = require('gulp-cssmin');

const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");


const scssFiles = [
	// 'node_modules/@material/textfield/mdc-text-field.scss',
  'src/scss/**/*.scss',
	'node_modules/jquery-toast-plugin/dist/jquery.toast.min.css'

];
const htmlFiles = [
	'./index.html',
	'./src/pages/*.html'
];

const jsFiles = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/jquery-validation/dist/jquery.validate.min.js',
	'node_modules/jq-router/dist/jq-router.min.js',
	'node_modules/jquery-toast-plugin/dist/jquery.toast.min.js',
	'node_modules/approvejs/dist/approve.min.js',
	'node_modules/gsap/src/minified/TweenMax.min.js',
	'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
	'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
	'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
	// 'src/js/chart/easypiechart.js',
	// 'src/js/chart/jquery.easypiechart.min.js',
  'node_modules/particles.js/particles.js',
	'src/js/**/*.js'
];

/*const libsCssFiles = [
	'node_modules/jquery-toast-plugin/dist/jquery.toast.min.css'
];*/

// -----------------------------------------------
// BrowserSync
let browserSync = (done) => {
  browsersync.init({
    server: {
      baseDir: ['./', './src', './pages']
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
let browserSyncReload = (done) => {
  browsersync.reload();
  done();
}

// Clean assets
let clean = () => {
  return del(['dist/**/*', '!dist/images', '!dist/images/**/*']);
}

// Lint scripts
let scriptsLint = () => {
  return gulp
    .src(jsFiles)
    .pipe(concat('bundle.js'))
		.pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browsersync.stream())
}

// CSS task
let css = () => {
  return gulp
    .src(scssFiles)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("dist/css"))
    .pipe(browsersync.stream());
}


// Copy HTML files in /dist folder
let html = () => {
  return gulp
    .src(htmlFiles)
    .pipe(gulp.dest("dist/pages"));
}

// Optimize Images
let images = () => {
  return gulp
    .src("src/img/**/*.+(png|jpg|gif|svg)")
  /*  .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )*/
    .pipe(gulp.dest("dist/img"));
}

// Watch files
let watchFiles = () => {
  gulp.watch(scssFiles, css);
  gulp.watch(jsFiles, gulp.series(scriptsLint));
  gulp.watch(
    [
      "./src/img/**/*",
      "./src/js/**/*",
      "./src/pages/**/*",
      "./src/scss/**/*"
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch("./src/img/**/*", images);
}

// define complex tasks
const js = gulp.series(scriptsLint);
const build = gulp.series(clean, gulp.parallel(css, images, js, html));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;

