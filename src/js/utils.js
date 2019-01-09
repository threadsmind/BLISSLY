var Random = new Object({
    generateRandomNumber: function (l, h) {
        return Math.floor(Math.random() * (h - l + 1)) + l;
    },
    generateRandomValue: function (l) {
        return Math.floor(Math.random() * l);
    }
});

var Util = new Object ({
    log: function (log) {
        if (Blissly.doLogging) {
            console.log(log);
        }
    }
});
