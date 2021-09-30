var {
  src,
  dest,
  series,
  watch
} = require('gulp')
var concat = require('gulp-concat')
var htmlMin = require('gulp-htmlmin')
var autoprefixes = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')
var svgSprite = require('gulp-svg-sprite')
var image = require('gulp-image')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify-es').default
var notify = require('gulp-notify')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var browserSync = require('browser-sync').create()

var cleanDev = () => {
  return del(['dev'])
}

var clean = () => {
  return del(['build'])
}

var resources = () => {
  return src('src/resources/**')
    .pipe(dest('build'))
    .pipe(dest('dev'))
}

var stylesDev = () => {
  return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
}

var styles = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build'))
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
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/images'))
    .pipe(dest('dev/images'))
}

var scriptsDev = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
}

var scripts = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

var watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}

var images = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.png',
      'src/images/*.svg',
      'src/images/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('build/images'))
    .pipe(dest('dev/images'))
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.html', htmlMinifyDev)
watch('src/styles/**/*.css', styles)
watch('src/styles/**/*.css', stylesDev)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/js/**/*.js', scriptsDev)
watch('src/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(cleanDev, clean, resources, htmlMinifyDev, htmlMinify, scriptsDev, scripts, stylesDev, styles, images, svgSprites, watchFiles)
