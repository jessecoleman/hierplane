#!/usr/bin/env node
'use strict';

const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const browserify = require('browserify');
const bundlecss = require('bundle-css');
const watchify = require('watchify');

// Whenever we incoke `cp.exec` or `cp.execSync` these args set the correct
// working directory and ensure that stdout / sterr are streamed to the
// current TTY
const execArgs = { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' };
const which = require('npm-which')(execArgs.cwd);

// Argument parsing
const args = new Set(process.argv.slice(2));
if (args.has('-h') || args.has('--help')) {
  console.log('Usage: ./build.js [OPTIONS]')
  console.log('Options: ')
  console.log('  --watch  -w          rebuild UI artifacts with every change to webui/webapp/app/**/*');
  console.log('  --server -s          run a local server for development purposes');
  console.log('  --skipInitial, -si   if specified with --watch, the first build is skipped');
  process.exit(0);
}
const isWatchTarget = args.has('--watch') || args.has('-w');
const shouldSkipFirstBuild = isWatchTarget && (args.has('--skipInitial') || args.has('-si'));

// Build n' bundle the JS and CSS
if (!shouldSkipFirstBuild) {
  compileJavascript();
  compileLess();
  bundleJavascript();
} else {
  console.log(chalk.yellow('skipping first build, as --skipInitial was passed'));
}

// Local developers run the watch target, which watches the files in src/ for changes and updates
// the build artifacts as they occur.
if (isWatchTarget) {
  const chokidar = require('chokidar');
  const debounce = require('debounce');

  // Watch the css files for changes and recompile whenever one occurs
  const lessWatchPath = path.resolve(__dirname, '..', 'src', '**', '*.less');
  console.log(chalk.yellow(`watching ${chalk.magenta(path.relative(execArgs.cwd, lessWatchPath))}`));
  chokidar.watch(lessWatchPath, { ignoreInitial: true }).on('all', (event, filePath) => {
    console.log(chalk.yellow(
      `${chalk.magenta(path.relative(execArgs.cwd, filePath))} changed`
    ))
    try {
      compileLess();
    } catch(err) {
      // Swallow excpetions so the process stays alive. The `lessc` executable reports the exception
      // to stderr for us, so we don't need to output anything.
    }
  });

  // Watch for Javascript changes.
  const jsWatchPath = path.resolve(__dirname, '..', 'src', '**', '*.js');
  console.log(chalk.yellow(`watching ${chalk.magenta(path.relative(execArgs.cwd, jsWatchPath))}`));
  chokidar.watch(jsWatchPath, { ignoreInitial: true }).on('all', (event, filePath) => {
    const relativeFilePath = path.relative(execArgs.cwd, filePath);
    console.log(chalk.yellow(
      `${chalk.magenta(relativeFilePath)} changed`
    ))
    try {
      compileJavascript(relativeFilePath);
    } catch (err) {
      // Swallow excpetions so the process stays alive. The `babel` executable reports the exception
      // to stderr for us, so we don't need to output anything.
    }
  });
}

if (args.has('--server') || args.has('-s')) {
  runLocalServer();
}

/**
 * Compiles Javascript, using Babel, to a consistent runtime that isn't dependent on a JSX parser
 * or future ECMA targets.
 *
 * @param  {String} [jsPath=src] Path to the file(s) to compile. If a directory is specified, all
 *                               *.js files in that directory are compiled.
 * @return {undefined}
 */
function compileJavascript(filePath) {
  const jsPath = filePath || 'src';
  const babelPath = which.sync('babel');
  const outFile =
    jsPath.endsWith('.js')
      ? `--out-file ${jsPath.replace('src/', 'dist/')}`
      : `-d dist`;
  console.log(chalk.cyan(`compling javascript ${chalk.magenta(jsPath)}`));
  cp.execSync(`${babelPath} ${jsPath} ${outFile} --ignore test.js`, execArgs);
  console.log(chalk.green('babel compilation complete'));
}

/**
 * Compiles less to css.
 *
 * @return {undefined}
 */
function compileLess() {
  console.log(chalk.cyan(`compiling ${chalk.magenta('src/less/hierplane.less')}`));
  cp.execSync(`${which.sync('lessc')} --clean-css --autoprefix="last 2 versions" src/less/hierplane.less dist/static/hierplane.min.css`);
  console.log(chalk.green(`wrote ${chalk.magenta('dist/static/hierplane.min.css')}`));
}

/**
 * Compresses the static javascript bundle into a single file with all required dependencies so
 * that people can use it in their browser.
 *
 * @return {undefined}
 */
function bundleJavascript() {
  const bundleEntryPath = path.resolve(__dirname, '..', 'dist', 'static', 'hierplane.js');
  const cssEntryPath = path.resolve(__dirname, '..', 'dist', 'static', 'hierplane.min.css');
  console.log(cssEntryPath);
  const bundlePath = path.resolve(__dirname, '..', 'dist', 'static', 'hierplane.bundle.js');

  // Put together our "bundler", which uses browserify
  const browserifyOpts = {
    entries: [ bundleEntryPath ], //, cssEntryPath ],
    standalone: 'hierplane'
  };

  // If we're watching or changes, enable watchify
  if (isWatchTarget) {
    // These are required for watchify
    browserifyOpts.packageCache = {};
    browserifyOpts.cache = {};

    // Enable the plugin
    browserifyOpts.plugin = [ watchify ]; //, bundlecss ];
  };

  // Construct the bundler
  const bundler = browserify(browserifyOpts);

  // Make an inline function which writes out the bundle, so that we can invoke it whenever
  // an update is detected if the watch target is being executed.
  const writeBundle = () => {
    console.log(chalk.cyan(`bundling ${chalk.magenta(path.relative(execArgs.cwd, bundleEntryPath))}`));
    bundler.bundle().pipe(fs.createWriteStream(bundlePath))
    console.log(chalk.green(`wrote ${chalk.magenta(path.relative(execArgs.cwd, bundlePath))}`));
  };

  // Write out the bundle once
  writeBundle();

  // If we're supposed to watch for changes, write out the bundle whenever they occur
  if (isWatchTarget) {
    bundler.on('update', writeBundle);
  }
}

function runLocalServer() {
  return cp.fork(path.resolve(__dirname, '..', 'dev', 'server.js'), execArgs);
}

