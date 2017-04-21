'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;
const nodemon = require('gulp-nodemon');

const nodemonOptions = {
  ext: 'js html yaml py',
  env: {
    'NODE_ENV': 'development'
  },
  ignore: 'test/*'
};

function runCommand(command, alwaysWatch) {
  if (process.env.WATCH === 'true' || alwaysWatch) {
    nodemonOptions.exec = command;
    nodemon(nodemonOptions);
  } else {
    exec(command, function (err, stdout, stderr) {
      if(err) {
        process.exit(err.code);
      }
      console.log(stdout);
      console.error(stderr);
    });
  }
}

gulp.task('debug', function() {
  runCommand('node --inspect=7080 app.js', true);
});

gulp.task('dev', function() {
  runCommand('node --preserve-symlinks app.js', true);
});

gulp.task('unit-test', function() {
  runCommand(
    "mocha --recursive --globals setImmediate,clearImmediate --ui tdd --check-leaks --colors -t 30000 --reporter spec 'test/unit/'"
  );
});
