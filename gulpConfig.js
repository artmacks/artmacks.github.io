/**
 * Gulp config
 * describes module settings
 *
 *
 */

'use strict';

module.exports = function(){
  return {
    //env: 'production',
    env: 'development',

    // style plugins
    styles: {
      src: ['scss/**/*.scss'],
      dest: 'css',
      watch: 'scss/**/*.scss',
      sass: {
        outputStyle: 'compressed',
        imagePath: '../images',
        precision: 3,
        errLogToConsole: true,
        includePaths: ['./node_modules']
      },
      sourcemaps: {
        path: './',
        configs: {
          includeContent: false,
          sourceRoot: '../../source/scss/'
        }
      },
      autoprefixer: {
        cascade: true
      },
      cssnano: {},
      sortMedia: {}
    },

    //server plugin
    browsersync: {
      server: {
        baseDir: './'
      },
    }
  }
};
