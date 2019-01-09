// requires: constants.js
var Visual = new Object({
    button: document.getElementById('blissly-toggle'),
    init: function (app) {
        var blisslyControl = '';
        if (new RegExp('iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini', 'i').test(navigator.userAgent)) {
            blisslyControl = 'touchstart';
        } else {
            blisslyControl = 'click';
        }
        this.button.addEventListener(blisslyControl, app.togglePlay.bind(app));
    },
    display: function () {
        this.button.style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    },
    play: function () {
        this.button.style.backgroundColor = Constants.playColor;
    },
    stop: function () {
        this.button.style.backgroundColor = Constants.stopColor;
    }
});
