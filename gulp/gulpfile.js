let {
  src,
  dest,
  series,
  watch
} = require('gulp')
let concat = require('gulp-concat')
let htmlMin = require('gulp-htmlmin')
let autoprefixes = require('gulp-autoprefixer')
let sass = require('gulp-sass')(require('sass'))
let cleanCSS = require('gulp-clean-css')
let webp = require('gulp-webp')
let svgSprite = require('gulp-svg-sprite')
let image = require('gulp-image')
let babel = require('gulp-babel')
let uglify = require('gulp-uglify-es').default
let notify = require('gulp-notify')
let sourcemaps = require('gulp-sourcemaps')
let del = require('del')
let browserSync = require('browser-sync').create()

let clean = () => {
  exports.clean = clean
  return del([
    'build',
    'dev'
  ])
}

let resources = () => {
  return src('src/libs/**')
    .pipe(dest('build/libs'))
    .pipe(dest('dev/libs'))
}

let fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('build/fonts'))
    .pipe(dest('dev/fonts'))
}

let scss = () => {
  return src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixes({
      cascade: false,
      grid: true,
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('src/css'))
}

let stylesDev = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/css'))
}

let styles = () => {
  return src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

let htmlMinifyDev = () => {
  return src('src/**/*.html')
    .pipe(dest('dev'))
}

let htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

let svgSprites = () => {
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

let scriptsDev = () => {
  return src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/js'))
}

let scripts = () => {
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

let watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}

let exportWebp = () => {
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

let images = () => {
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
exports.scss = scss
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, fonts, scss, htmlMinifyDev, htmlMinify, scriptsDev, scripts, stylesDev, styles, exportWebp, images, svgSprites, watchFiles)
