/*globals Blockly*/
(function () {
    'use strict';
    var Bs = Blockly.Blocks,
        Code = Blockly.JavaScript,
        SYNTHS = [
            ["Blade Runner style strings", "synth_violin"],
            ["Brown Noise", "bnoise"],
            ["Chip Bass", "chipbass"],
            ["Chip Lead", "chiplead"],
            ["Chip Noise", "chipnoise"],
            ["Clip Noise", "cnoise"],
            ["Dark Ambience", "dark_ambience"],
            ["Dark Sea Horn", "dark_sea_horn"],
            ["Detuned Pulse Wave", "dpulse"],
            ["Detuned Saw Wave", "dsaw"],
            ["Detuned Triangle Wave", "dtri"],
            ["Dull Bell", "dull_bell"],
            ["Grey Noise", "gnoise"],
            ["Growl", "growl"],
            ["Hollow", "hollow"],
            ["Hoover", "hoover"],
            ["Modulated Detuned Saw Waves", "mod_dsaw"],
            ["Modulated Pulse", "mod_pulse"],
            ["Modulated Saw Wave", "mod_saw"],
            ["Modulated Sine Wave", "mod_sine"],
            ["Modulated Triangle Wave", "mod_tri"],
            ["Noise", "noise"],
            ["Piano", "piano"],
            ["Pink Noise", "pnoise"],
            ["Pluck", "pluck"],
            ["Pretty Bell", "pretty_bell"],
            ["Pulse Wave", "pulse"],
            ["Pulse Wave with sub", "subpulse"],
            ["Sine Wave", "beep"],
            ["Singer", "singer"],
            ["Square Wave", "square"],
            ["Supersaw", "supersaw"],
            ["The Prophet", "prophet"],
            ["Triangle Wave", "tri"],
            ["Zawa", "zawa"]
        ],
        FXS = [
            ["Band EQ Filter", "band_eq"],
            ["Band Pass Filter", "bpf"],
            ["Bitcrusher", "bitcrusher"],
            ["Chorus", "chorus"],
            ["Compressor", "compressor"],
            ["Distortion", "distortion"],
            ["Echo", "echo"],
            ["Flanger", "flanger"],
            ["GVerb", "gverb"],
            ["High Pass Filter", "hpf"],
            ["Hyperbolic Tangent", "tanh"],
            ["Krush", "krush"],
            ["Level Amplifier", "level"],
            ["Low Pass Filter", "lpf"],
            ["Mono", "mono"],
            ["Normaliser", "normaliser"],
            ["Octaver", "octaver"],
            ["Pan", "pan"],
            ["Pitch shift", "pitch_shift"],
            ["Resonant High Pass Filter", "rhpf"],
            ["Resonant Low Pass Filter", "rlpf"],
            ["Reverb", "reverb"],
            ["Ring Modulator", "ring_mod"],
            ["Slicer", "slicer"],
            ["Techno from IXI Lang", "ixi_techno"],
            ["Vowel", "vowel"],
            ["Whammy", "whammy"],
            ["Wobble", "wobble"]
        ];

    Bs.SPI_Loop = {
        init: function() {
            this.appendDummyInput()
            .appendField("Loop");
            this.appendStatementInput("BODY")
            .setCheck(null);
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
            this.setTooltip('Repeat it\'s content forever');
            this.setHelpUrl('http://marianoguerra.github.io/sonic-blocs/help/loop.html');
        }
    };

    Code.SPI_Loop = function(block) {
        var body = Code.statementToCode(block, 'BODY');
        var code = 'loop do\n' + body + 'end\n\n';
        return code;
    };

    Bs.SPI_Sleep = {
        init: function() {
            this.appendDummyInput()
            .appendField("Sleep");
            this.appendValueInput("TIME")
            .setCheck("Number");
            this.appendDummyInput()
            .appendField("Seconds");
            this.setInputsInline(true);
            this.setColour(290);
            this.setTooltip('Sleep for the given amount of seconds');
            this.setHelpUrl('http://marianoguerra.github.io/sonic-blocs/help/sleep.html');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
        }
    };

    Code.SPI_Sleep = function(block) {
        var valueTime = Code.valueToCode(block, 'TIME', Code.ORDER_ATOMIC);
        var code = 'sleep(' + valueTime + ')\n';
        return code;
    };

    Bs.SPI_Rrand = {
        init: function() {
            this.appendDummyInput()
            .appendField("Random value between");
            this.appendValueInput("FROM")
            .setCheck("Number");
            this.appendDummyInput()
            .appendField("and");
            this.appendValueInput("TO")
            .setCheck("Number");
            this.setInputsInline(true);
            this.setColour(290);
            this.setTooltip('Return a random number between "from" and "to"');
            this.setOutput(true, "Number");
            this.setHelpUrl('http://marianoguerra.github.io/sonic-blocs/help/rrand.html');
        }
    };

    Code.SPI_Rrand = function(block) {
        var valueFrom = Code.valueToCode(block, 'FROM', Code.ORDER_ATOMIC);
        var valueTo = Code.valueToCode(block, 'TO', Code.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = 'rrand(' + valueFrom + ', ' + valueTo + ')';
        return [code, Code.ORDER_ATOMIC];
    };

    Bs.SPI_Sample = {
        init: function() {
            this.appendDummyInput()
            .appendField("Sample")
            .appendField(new Blockly.FieldDropdown([["Perc Bell", "perc_bell"]]), "SAMPLE");
            this.appendDummyInput()
            .appendField("at rate");
            this.appendValueInput("RATE")
            .setCheck("Number");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
            this.setTooltip('');
            this.setHelpUrl('http://marianoguerra.github.io/sonic-blocs/help/sample.html');
        }
    };

    Code.SPI_Sample = function(block) {
        var sample = block.getFieldValue('SAMPLE');
        var rate = Code.valueToCode(block, 'RATE', Code.ORDER_ATOMIC);
        var code = 'sample :' + sample + ', rate: (' + rate + ')\n';
        return code;
    };

	Bs.SPI_With_FX = {
		init: function() {
			this.appendDummyInput()
			.appendField("With FX")
			.appendField(new Blockly.FieldDropdown(FXS), "FX");
			this.appendValueInput("MIX")
			.setCheck("Number")
			.appendField("mix");
			this.appendStatementInput("BODY")
			.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(290);
			this.setTooltip('');
			this.setHelpUrl('http://www.example.com/');
		}
	};

    Code.SPI_With_FX = function(block) {
      var fx = block.getFieldValue('FX');
      var mix = Code.valueToCode(block, 'MIX', Code.ORDER_ATOMIC);
      var body = Code.statementToCode(block, 'BODY');
      var code = 'with_fx :' + fx + ', mix: (' + mix + ') do\n' + body + '\nend\n\n';
      return code;
    };

    Bs.SPI_With_Synth = {
      init: function() {
        this.appendDummyInput()
            .appendField("With Synth")
            .appendField(new Blockly.FieldDropdown(SYNTHS), "SYNTH");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Code.SPI_With_Synth = function(block) {
      var synth = block.getFieldValue('SYNTH');
      var body = Code.statementToCode(block, 'BODY');
      var code = 'with_synth :' + synth + ' do\n' + body + '\nend\n\n';
      return code;
    };

	Bs.SPI_Do_Times = {
	  init: function() {
		this.appendValueInput("TIMES")
			.setCheck("Number")
			.appendField("Do");
		this.appendDummyInput()
			.appendField("Times");
		this.appendStatementInput("BODY")
			.setCheck(null);
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(290);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	  }
	};

	Code.SPI_Do_Times = function(block) {
	  var times = Code.valueToCode(block, 'TIMES', Code.ORDER_ATOMIC);
	  var body = Code.statementToCode(block, 'BODY');
	  var code = times + '.times do\n' + body + '\nend;\n\n';
	  return code;
	};

    Bs.SPI_In_Thread = {
        init: function() {
            this.appendDummyInput()
            .appendField("Do in Parallel");
            this.appendStatementInput("BODY")
            .setCheck(null);
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
            this.setTooltip('Run blocks in parallel');
            this.setHelpUrl('http://marianoguerra.github.io/sonic-blocs/help/do-in-parallel.html');
        }
    };

    Code.SPI_In_Thread = function(block) {
        var body = Code.statementToCode(block, 'BODY');
        var code = 'in_thread do\n' + body + 'end\n\n';
        return code;
    };

	Bs.SPI_Play = {
	  init: function() {
		this.appendValueInput("PLAY")
			.setCheck("kw")
			.appendField("Play");
		this.appendValueInput("ATTACK")
			.setCheck("Number")
			.appendField("attack");
		this.appendValueInput("DECAY")
			.setCheck("Number")
			.appendField("Decay");
		this.appendValueInput("SUSTAIN")
			.setCheck("Number")
			.appendField("Sustain");
		this.appendValueInput("RELEASE")
			.setCheck("Number")
			.appendField("Release");
		this.appendValueInput("AMP")
			.setCheck("Number")
			.appendField("Amp");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(290);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	  }
	};

	Code.SPI_Play = function(block) {
	  var play = Code.valueToCode(block, 'PLAY', Code.ORDER_ATOMIC),
          attack = Code.valueToCode(block, 'ATTACK', Code.ORDER_ATOMIC),
          decay = Code.valueToCode(block, 'DECAY', Code.ORDER_ATOMIC),
          sustain = Code.valueToCode(block, 'SUSTAIN', Code.ORDER_ATOMIC),
          release = Code.valueToCode(block, 'RELEASE', Code.ORDER_ATOMIC),
          amp = Code.valueToCode(block, 'AMP', Code.ORDER_ATOMIC),
          code = 'play ' + play + ', attack: ' + attack + ', decay: ' + decay + ', sustain: ' + sustain + ', release: ' + release + ', amp: ' + amp + '\n';

	  return code;
	};

    function kw_validator(text) {
        var i, len, c, cl, accum = '', isLetter, isNumber;

        for (i = 0, len = text.length; i < len; i += 1) {
            c = text[i];
            cl = c.toLowerCase();
            isLetter = c >= 'a' && c <= 'z';
            if (accum.length === 0) {
                if (isLetter){
                    accum += c;
                }
            } else {
                isNumber = c >= '0' && c <= '9';
                if (isLetter || isNumber || c === '_') {
                    accum += c;
                }
            }
        }

        return accum;
    }

	Bs.SPI_Kw = {
		init: function() {
			this.appendDummyInput()
			.appendField(":")
			.appendField(new Blockly.FieldTextInput("e3", kw_validator), "KW");
			this.setInputsInline(true);
			this.setOutput(true, "kw");
			this.setColour(290);
			this.setTooltip('');
			this.setHelpUrl('http://www.example.com/');
		}
	};

    Code.SPI_Kw = function(block) {
        var kw = block.getFieldValue('KW');
        var code = ':' + kw;
        return [code, Code.ORDER_ATOMIC];
    };
}());
