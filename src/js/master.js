// requires: constants.js tone.js
var Master = new Object({
    hpFilter: new Tone.Filter(50, 'highpass'),
    lpFilter: new Tone.Filter(19000, 'lowpass'),
    compressor: new Tone.Compressor({
        ratio: 6,
        threshold: -18,
        release: 0.20,
        attack: 0.003,
        knee: 20
    }),
    eq: new Tone.EQ3({
        low: -1,
        mid: -3,
        high: 1,
        lowFrequency: 350,
        highFrequency: 10500
    }),
    midHighCut: new Tone.EQ3({
        low: 0,
        mid: -8,
        high: 0,
        lowFrequency: 2750,
        highFrequency: 5250,
        Q: 24
    }),
    limiter: new Tone.Limiter(-6)
});