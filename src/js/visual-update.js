// requires: constants.js
var Visual = new Object({
    display: function (button) {
        document.getElementById('loading').style.display = 'none';
        button.style.display = 'block';
    },
    play: function (button) {
        button.style.backgroundColor = Constants.playColor;
    },
    stop: function (button) {
        button.style.backgroundColor = Constants.stopColor;
    }
});
