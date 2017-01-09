/*global log, byId, select, selectAll*/
var user = (function user() {
    "use strict";

    var init,
        User;

    User = function User() {
        this.life = 0;
    };

    return {
        init: init,
        User: User
    };
}());