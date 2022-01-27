var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");

/******************************************/
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");
/******************************************/

var { engine } = require("express-handlebars");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var authenticationRouter = require("./routes/authentication");
var linksRouter = require("./routes/links");

var app = express();

require("./lib/passport");

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layautsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);

app.set("view engine", ".hbs");

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/********************************* */
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
/********************************* */

// VARIABLES GLOBALES (PODEMOS ACCEDER DESDE CUALQUIER SITIO)
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.errorlog = req.flash("errorlog")
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/authentication", authenticationRouter);
app.use("/links", linksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
