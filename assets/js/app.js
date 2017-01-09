/*global log, byId, select, selectAll, pendu, user*/
var app = (function app() {
    "use strict";

    var test,
        client,
        refreshLifeZone,
        lifeZone;

    window.onload = function start() {
        pendu.init();
        client = new user.User();
        lifeZone = select('aside span');
        lifeZone.innerText = client.life;
    };

    refreshLifeZone = function refreshLifeZone() {
        lifeZone.innerText = client.life;
    };

    return {
        client: client,
        refreshLifeZone: refreshLifeZone
    };
}());