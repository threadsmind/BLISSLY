// requires: constants.js
var Visual = new Object({
    display: function (panel) {
        document.getElementById('blissly-loading').style.display = 'none';
        panel.style.display = 'block';
    },
    play: function (button) {
        button.style.backgroundColor = Constants.playColor;
    },
    stop: function (button) {
        button.style.backgroundColor = Constants.stopColor;
    }
});
