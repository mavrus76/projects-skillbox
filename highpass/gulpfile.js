var {
  src,
  dest,
  series,
  watch
} = require('gulp')
var concat = require('gulp-concat')
var htmlMin = require('gulp-htmlmin')
var autoprefixes = require('gulp-autoprefixer')
var sass = require('gulp-sass')(require('sass'))
// var autoprefixer = require('autoprefixer')
// var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css')
var webp = require('gulp-webp')
var svgSprite = require('gulp-svg-sprite')
var image = require('gulp-image')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify-es').default
var notify = require('gulp-notify')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var browserSync = require('browser-sync').create()

var clean = () => {
  exports.clean = clean
  return del([
    'build',
    'dev'
  ])
}

var resources = () => {
  return src('src/libs/**')
    .pipe(dest('build/libs'))
    .pipe(dest('dev/libs'))
}

var fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('build/fonts'))
    .pipe(dest('dev/fonts'))
}

var scss = () => {
  return src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('src/css'))
}

var stylesDev = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    // .pipe(postcss([autoprefixer({
    //   cascade: false
    // })]))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/css'))
}

var styles = () => {
  return src('src/css/**/*.css')
    .pipe(concat('style.css'))
    // .pipe(postcss([autoprefixer({
    //   cascade: false
    // })]))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

var htmlMinifyDev = () => {
  return src('src/**/*.html')
    .pipe(dest('dev'))
}

var htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

var svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/img'))
    .pipe(dest('dev/img'))
}

var scriptsDev = () => {
  return src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/js'))
}

var scripts = () => {
  return src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream())
}

var watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}

var exportWebp = () => {
  return src('src/img/**/*.{jpg,jpeg,png}')
    .pipe(webp({
      lossless: true
    }))
  //   .pipe(webp({
  //     quality: 80,
  //     preset: 'photo',
  //     method: 6
  // }))
    .pipe(dest('build/img'))
    .pipe(dest('dev/img'))
}

var images = () => {
  return src([
      'src/img/**/*.{jpg,jpeg,png}',
      'src/img/*.svg',
      'src/img/*.ico'
    ])
    .pipe(image())
    .pipe(dest('build/img'))
    .pipe(dest('dev/img'))
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.html', htmlMinifyDev)
watch('src/css/**/*.scss', scss)
watch('src/css/**/*.css', styles)
watch('src/css/**/*.css', stylesDev)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/js/**/*.js', scriptsDev)
watch('src/resources/**', resources)
watch('src/img/**/*.{jpg,jpeg,png}', exportWebp)
watch([
  'src/img/**/*.{jpg,jpeg,png}',
  'src/img/*.svg',
  'src/img/*.ico'
], images)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, fonts, scss, htmlMinifyDev, htmlMinify, scriptsDev, scripts, stylesDev, styles, exportWebp, images, svgSprites, watchFiles)
