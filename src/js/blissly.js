// requires: utils.js constants.js buses.js master.js visual-update.js instruments.js
var Blissly = new Object({
	isPlaying: false,
	doLogging: false,
	isInit: false,
	instruments: {
		root: null,
		noise: null,
		synths: []
	},
	sends: {
		root: {},
		noise: null,
		synths: []
	},
	volume: 0,
	panel: null,
	button: null,
	slider: null,
	doVisuals: true,
	init: function (visuals, logs) {
		if (visuals == undefined) { visuals = true; }
		this.doVisuals = visuals;
		if (logs == undefined) { logs = false; }
		this.doLogging = logs;

		Constants.init();
		Buses.init();

		//create root synth
		this.instruments.root = Instruments.makeRoot();
		this.instruments.root.chain(Tone.Master);
		this.sends.root = {
			'crush': this.instruments.root.send('crush', -12),
			'reverb': this.instruments.root.send('reverb', 0),
			'vibrato': this.instruments.root.send('vibrato', -6)
		};

		//create noise synths
		this.instruments.noise = Instruments.makeNoise();
		this.instruments.noise.chain(Tone.Master);

		//create harmony synths
		var synthCount = Random.generateRandomNumber(Constants.minimumSynths, Constants.maximumSynths);
		var i = 0; while (i < synthCount) {
			this.instruments.synths.push(Instruments.makeSynth());
			this.instruments.synths[i].chain(Tone.Master);
			this.sends.synths[i] = {
				'reverb': this.instruments.synths[i].send('reverb', -12),
				'chorus': this.instruments.synths[i].send('chorus', -6)
			};
			i++;
		}

		//create master effects chain
		Tone.Master.chain(Master.eq, Master.midHighCut, Master.hpFilter, Master.lpFilter, Master.compressor, Master.limiter);

		//figure out controls
		var blisslyControl = '';
		if (new RegExp('iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini', 'i').test(navigator.userAgent)) {
			blisslyControl = 'touchstart';
		} else {
			blisslyControl = 'click';
		}
		if (this.doVisuals) {
			this.panel = document.getElementById('blissly-panel');
			this.button = document.getElementById('blissly-button');
			this.slider = document.getElementById('blissly-volume');
			Visual.display(this.panel);
			this.slider.addEventListener('change', this.changeVolume.bind(null, this, undefined));
		} else {
			this.button = document;
			this.slider.value = this.volume;
		}
		this.button.addEventListener(blisslyControl, this.togglePlay.bind(this));

		this.changeVolume(this, this.slider.value);

		this.isInit = true;
	},
	togglePlay: function () {
		if (this.isInit) {
			if (this.isPlaying) {
				if (this.doVisuals) {
					this.stop(this);
				}
			} else {
				this.play(this);
			}
		}
	},
	play: function (app) {
		if (this.doVisuals) {
			Visual.play(this.button);
		}
		//main song loop
		var mainLoop = new Tone.Loop(function (time) {
			app.instruments.noise.triggerAttackRelease(Constants.loopLength, time, Random.generateRandomNumber(2, 3) / 10);
			app.instruments.root.triggerAttackRelease(Constants.scale[0] + '1', (Constants.loopLength - 1) + 'm', time + 1, Random.generateRandomNumber(2, 3) / 10);
			for (var i in app.instruments.synths) {
				var note = parseInt(i) + 2;
				app.instruments.synths[i].triggerAttackRelease(Constants.scale[Random.generateRandomValue(Constants.scale.length)] + note, (Constants.loopLength - 2) + 'm', time + 1.5, Random.generateRandomNumber(5, (13 - (parseInt(i) * 2))) / 100);
			}
		}, Constants.loopLength).start(0);
		Tone.Transport.start('+0.2');

		app.isPlaying = true;
		Util.log('PLAYING');
	},
	stop: function (app) {
		if (this.doVisuals) {
			Visual.stop(this.button);
		}
		Tone.Transport.stop();
		//TODO there may be a way to sync these releases to the transport or something to cut down on .triggerRelease calls here?
		app.instruments.root.triggerRelease();
		app.instruments.noise.triggerRelease();
		for (var i in app.instruments.synths) {
			app.instruments.synths[i].triggerRelease();
		}

		app.isPlaying = false;
		Util.log('STOPPING');
	},
	changeVolume: function (app, volume) {
		if (volume == undefined) {
			if (app.doVisuals) {
				volume = app.slider.value;
			} else {
				volume = 0;
			}
		} else {
			if (volume > 0) {
				volume = 0;
			}
		}
		app.volume = volume;
		Tone.Master.volume.value = volume;
	}
});
