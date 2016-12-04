var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    moment = require('moment'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var stylus = require('stylus'),
    nib = require('nib'),
    fs = require('fs'),
    uglify = require("uglify-js");

var routes = require('./routes/index'),
    users = require('./routes/users');

var app = express(),
    db  = require('./config/db');

// Nastavení šablonovacího systému na Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ## Nastavení Stylusu
// Funkce, která zajistí kompilaci Stylus souborů, jejich kompresi a
// použití knihovny nib, která doplní vendor prefixy a obsahuje 
// různé užitečné prefixy.
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
}

// Nastavení middleware pro Stylus, který zavolá funkci na kompilaci.
app.use(stylus.middleware({
    src: path.join(__dirname, '/public'),
    dest: path.join(__dirname, '/public'),
    compile: compile,
    debug: true
}));

// ## Nastavení minifikace JavaScriptu
// Nejprve se spojí všechny používané JavaScriptové knihovny do jednoho
// souboru, který se následně minifikuje s nastavenými parametry.
// - `sequences` - spojení po sobě jdoucích jednoduchých výrazů čárkou.
// - `dead_code` - odstranění nedosažitelného kódu.
// - `conditionals` - optimalizace `if` podmínek.
// - `booleans` - optimalizace boolean výrazů jako je `!!a ? b : c` na `a ? b : c`.
// - `unused` - odstranění nepoužívaných funkcí a proměnných.
// - `if_return` - optimalizace `if/return` a `if/continue` podmínek.
// - `join_vars` - spojení po sobě jdoucích `var` definic.
// - `drop_console` - odstranění výpisů do konzole.
var uglifyFiles = [
    path.join(__dirname, 'bower_components/jquery/dist/jquery.js'),
    path.join(__dirname, 'bower_components/velocity/velocity.js'),
    path.join(__dirname, 'bower_components/console-polyfill/index.js'),
    path.join(__dirname, 'bower_components/es5-shim/es5-shim.js'),
    path.join(__dirname, 'bower_components/fastclick/lib/fastclick.js')
];
if(app.get('env') !== 'development') {
    uglifyFiles.push(path.join(__dirname, 'public/js/global.js'));
}

var uglified = uglify.minify(uglifyFiles, {
    mangle: true,
    compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
    }
});

// Uložení minifikovaného souboru do `public/js/app.min.js`.
fs.writeFile(path.join(__dirname, 'public/js/app.min.js'), uglified.code, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Script generated and saved.");
    }
});

// ## Nastavení logování
// Registrace vlastního formátu data pro logování.
logger.token('customDate', function(req, res) {
    return '[' + moment().format('gggg-MM-DD HH:mm:ss.SSS') + ']';
});
// Nastavení formátu logování.
app.use(logger(':customDate - :method :url :status :response-time ms - :res[content-length]'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Zde ošetřit vstup na přehled výsledků
app.get('/results*', function(req, res, next) {
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
