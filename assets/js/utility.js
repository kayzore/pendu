function log(d) {
    "use strict";
    window.console.log(d);
}

function byId(id) {
    "use strict";
    return document.getElementById(id);
}

function select(sCSS) {
    "use strict";
    return document.querySelector(sCSS);
}

function selectAll(sCSS) {
    "use strict";
    return document.querySelectorAll(sCSS);
}
