// requires: utils.js tone.js
var Buses = new Object({
    vibrato: new Tone.Vibrato('1m', 1)
        .receive('vibrato')
        .toMaster(),
    reverb: new Tone.JCReverb({ 'roomSize': 0.2, 'wet': 0.6 })//Random.generateRandomNumber(4, 8) / 10 })
        .receive('reverb')
        .toMaster(),
    crush: new Tone.BitCrusher({ 'bits': 4, 'wet': Random.generateRandomNumber(4, 8) / 100 })
        .receive('crush')
        .toMaster(),
    chorus: new Tone.Chorus({ 'depth': Random.generateRandomNumber(4, 9) / 10, 'wet': Random.generateRandomNumber(2, 10) / 10 })
        .receive('chorus')
        .toMaster()
});