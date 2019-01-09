// requires: utils.js constants.js tone.js
var Instruments = new Object({
	portamento: Random.generateRandomNumber(1, 4) / 10,
	makeEnvelope: function () {
		return {
			attack: Random.generateRandomNumber(1000, 3000) / 1000,
			decay: Random.generateRandomNumber(10, 600) / 100,
			sustain: Random.generateRandomNumber(6, 9) / 10,
			release: Random.generateRandomNumber(10, 800) / 100
		};
	},
	makeRoot: function () {
		return new Tone.Synth({
			'oscillator': {
				"type": Constants.oscillatorTypesRoot[Random.generateRandomValue(Constants.oscillatorTypesRoot.length)] + Random.generateRandomNumber(2, 3)
			},
			'envelope': this.makeEnvelope(),
			'portamento': this.portamento
		});
	},
	makeNoise: function () {
		return new Tone.NoiseSynth({
			'noise': Constants.noiseTypes[Random.generateRandomValue(Constants.noiseTypes.length)],
			'envelope': this.makeEnvelope(),
			'volume': Random.generateRandomNumber(30, 35) * -1
		});
	},
	makeSynth: function () {
		return new Tone.Synth({
			'oscillator': {
				"type": Constants.oscillatorTypes[Random.generateRandomValue(Constants.oscillatorTypes.length)] + Random.generateRandomNumber(2, 4)
			},
			'envelope': this.makeEnvelope()
		});
	}
});