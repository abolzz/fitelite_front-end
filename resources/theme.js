// Vendor resources (normalize.css, jquery and plugins by your choice)
require("./vendor/normalize.min.css");
window.$ = window.jQuery = require("./vendor/jquery-3.3.1.min");

// Your own CSS files
require("./vendor/lightslider.min.css");
require("./vendor/sumoselect.min.css");
require("./vendor/aos.css");
require("./scss/style.scss");

// Your own javascript files
require("./js/app.js");
require("./vendor/lightslider.min.js");
window.AOS = require("./vendor/aos.js");
require("./vendor/jquery.sumoselect.min.js");