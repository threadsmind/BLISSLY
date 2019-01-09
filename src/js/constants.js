// requires: utils.js
var Constants = new Object({
    version: 'v2019.01.08',
    silenceTone: true,
    minimumSynths: 2,
    maximumSynths: 4,
    oscillatorTypesRoot: ['sawtooth'],
    oscillatorTypes: ['fatsawtooth', 'fatsquare', 'fatsine'],
    noiseTypes: ['white', 'brown', 'pink'],
    scales: [['C', 'E', 'G'], ['A', 'C#', 'E'], ['G', 'B', 'D'], ['B', 'D#', 'F#']],
    scale: ['C', 'E', 'G'],
    loopLength: 10,
    stopColor: '#bbeea1',
    playColor: '#eec0a1',
    init: function () {
        Util.log('Blissly - Generate Bliss\n' + this.version);
        this.scale = this.scales[Random.generateRandomValue(this.scales.length)];
        this.loopLength = Random.generateRandomNumber(8, 18);
    }
});
