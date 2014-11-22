﻿//myapp.js - self-executing anonymous function for global object app

(function (app) {
    app.isDebug = true;

    app.log(msg) = function () {
        //only log to console if running as debug
        if (app.isDebug) {
            console.log(msg);
        }
    };
})(window.app = window.app | {});