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
        ],
        SAMPLES = [
            ['Drum heavy kick', 'drum_heavy_kick'],
            ['Drum tom mid soft', 'drum_tom_mid_soft'],
            ['Drum tom mid hard', 'drum_tom_mid_hard'],
            ['Drum tom lo soft', 'drum_tom_lo_soft'],
            ['Drum tom lo hard', 'drum_tom_lo_hard'],
            ['Drum tom hi soft', 'drum_tom_hi_soft'],
            ['Drum tom hi hard', 'drum_tom_hi_hard'],
            ['Drum splash soft', 'drum_splash_soft'],
            ['Drum splash hard', 'drum_splash_hard'],
            ['Drum snare soft', 'drum_snare_soft'],
            ['Drum snare hard', 'drum_snare_hard'],
            ['Drum cymbal soft', 'drum_cymbal_soft'],
            ['Drum cymbal hard', 'drum_cymbal_hard'],
            ['Drum cymbal open', 'drum_cymbal_open'],
            ['Drum cymbal closed', 'drum_cymbal_closed'],
            ['Drum cymbal pedal', 'drum_cymbal_pedal'],
            ['Drum bass soft', 'drum_bass_soft'],
            ['Drum bass hard', 'drum_bass_hard'],
            ['Drum cowbell', 'drum_cowbell'],
            ['Drum roll', 'drum_roll'],
            ['Snare Drum dub', 'sn_dub'],
            ['Snare Drum dolf', 'sn_dolf'],
            ['Snare Drum zome', 'sn_zome'],
            ['Bass Drum ada', 'bd_ada'],
            ['Bass Drum pure', 'bd_pure'],
            ['Bass Drum 808', 'bd_808'],
            ['Bass Drum zum', 'bd_zum'],
            ['Bass Drum gas', 'bd_gas'],
            ['Bass Drum sone', 'bd_sone'],
            ['Bass Drum haus', 'bd_haus'],
            ['Bass Drum zome', 'bd_zome'],
            ['Bass Drum boom', 'bd_boom'],
            ['Bass Drum klub', 'bd_klub'],
            ['Bass Drum fat', 'bd_fat'],
            ['Bass Drum tek', 'bd_tek'],
            ['Electric triangle', 'elec_triangle'],
            ['Electric snare', 'elec_snare'],
            ['Electric lo snare', 'elec_lo_snare'],
            ['Electric hi snare', 'elec_hi_snare'],
            ['Electric mid snare', 'elec_mid_snare'],
            ['Electric cymbal', 'elec_cymbal'],
            ['Electric soft kick', 'elec_soft_kick'],
            ['Electric filt snare', 'elec_filt_snare'],
            ['Electric fuzz tom', 'elec_fuzz_tom'],
            ['Electric chime', 'elec_chime'],
            ['Electric bong', 'elec_bong'],
            ['Electric twang', 'elec_twang'],
            ['Electric wood', 'elec_wood'],
            ['Electric pop', 'elec_pop'],
            ['Electric beep', 'elec_beep'],
            ['Electric blip', 'elec_blip'],
            ['Electric blip2', 'elec_blip2'],
            ['Electric ping', 'elec_ping'],
            ['Electric bell', 'elec_bell'],
            ['Electric flip', 'elec_flip'],
            ['Electric tick', 'elec_tick'],
            ['Electric hollow kick', 'elec_hollow_kick'],
            ['Electric twip', 'elec_twip'],
            ['Electric plip', 'elec_plip'],
            ['Electric blup', 'elec_blup'],
            ['Guitar harmonics', 'guit_harmonics'],
            ['Guitar e fifths', 'guit_e_fifths'],
            ['Guitar e slide', 'guit_e_slide'],
            ['Guitar em9', 'guit_em9'],
            ['Misc burp', 'misc_burp'],
            ['Misc crow', 'misc_crow'],
            ['Misc cineboom', 'misc_cineboom'],
            ['Percussive bell', 'perc_bell'],
            ['Percussive snap', 'perc_snap'],
            ['Percussive snap2', 'perc_snap2'],
            ['Percussive swash', 'perc_swash'],
            ['Percussive till', 'perc_till'],
            ['Ambient soft buzz', 'ambi_soft_buzz'],
            ['Ambient swoosh', 'ambi_swoosh'],
            ['Ambient drone', 'ambi_drone'],
            ['Ambient glass hum', 'ambi_glass_hum'],
            ['Ambient glass rub', 'ambi_glass_rub'],
            ['Ambient haunted hum', 'ambi_haunted_hum'],
            ['Ambient piano', 'ambi_piano'],
            ['Ambient lunar land', 'ambi_lunar_land'],
            ['Ambient dark woosh', 'ambi_dark_woosh'],
            ['Ambient choir', 'ambi_choir'],
            ['Bass hit c', 'bass_hit_c'],
            ['Bass hard c', 'bass_hard_c'],
            ['Bass thick c', 'bass_thick_c'],
            ['Bass drop c', 'bass_drop_c'],
            ['Bass woodsy c', 'bass_woodsy_c'],
            ['Bass voxy c', 'bass_voxy_c'],
            ['Bass voxy hit c', 'bass_voxy_hit_c'],
            ['Bass dnb f', 'bass_dnb_f'],
            ['Loop industrial', 'loop_industrial'],
            ['Loop compus', 'loop_compus'],
            ['Loop amen', 'loop_amen'],
            ['Loop amen full', 'loop_amen_full'],
            ['Loop garzul', 'loop_garzul'],
            ['Loop mika', 'loop_mika'],
            ['Loop breakbeat', 'loop_breakbeat'],
            ['Loop safari', 'loop_safari'],
            ['Loop tabla', 'loop_tabla'],
            ['Tabla tas1', 'tabla_tas1'],
            ['Tabla tas2', 'tabla_tas2'],
            ['Tabla tas3', 'tabla_tas3'],
            ['Tabla ke1', 'tabla_ke1'],
            ['Tabla ke2', 'tabla_ke2'],
            ['Tabla ke3', 'tabla_ke3'],
            ['Tabla na', 'tabla_na'],
            ['Tabla na o', 'tabla_na_o'],
            ['Tabla tun1', 'tabla_tun1'],
            ['Tabla tun2', 'tabla_tun2'],
            ['Tabla tun3', 'tabla_tun3'],
            ['Tabla te1', 'tabla_te1'],
            ['Tabla te2', 'tabla_te2'],
            ['Tabla te ne', 'tabla_te_ne'],
            ['Tabla te m', 'tabla_te_m'],
            ['Tabla ghe1', 'tabla_ghe1'],
            ['Tabla ghe2', 'tabla_ghe2'],
            ['Tabla ghe3', 'tabla_ghe3'],
            ['Tabla ghe4', 'tabla_ghe4'],
            ['Tabla ghe5', 'tabla_ghe5'],
            ['Tabla ghe6', 'tabla_ghe6'],
            ['Tabla ghe7', 'tabla_ghe7'],
            ['Tabla ghe8', 'tabla_ghe8'],
            ['Tabla dhec', 'tabla_dhec'],
            ['Tabla na s', 'tabla_na_s'],
            ['Tabla re', 'tabla_re'],
            ['Vinyl backspin', 'vinyl_backspin'],
            ['Vinyl rewind', 'vinyl_rewind'],
            ['Vinyl scratch', 'vinyl_scratch'],
            ['Vinyl hiss', 'vinyl_hiss']
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
            .appendField(new Blockly.FieldDropdown(SAMPLES), "SAMPLE");
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

    Bs.SPI_Choose = {
      init: function() {
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField("choose");
        this.setOutput(true, null);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Code.SPI_Choose  = function(block) {
      var list = Code.valueToCode(block, 'LIST', Code.ORDER_ATOMIC);
      var code = 'choose(' + list + ')';
      return [code, Code.ORDER_FUNCTION_CALL];
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

    // override JS variable declaration part
    Code.init = function(workspace) {
      // Create a dictionary of definitions to be printed before the code.
      Code.definitions_ = Object.create(null);
      // Create a dictionary mapping desired function names in definitions_
      // to actual function names (to avoid collisions with user functions).
      Code.functionNames_ = Object.create(null);

      if (!Code.variableDB_) {
        Code.variableDB_ = new Blockly.Names(Code.RESERVED_WORDS_);
      } else {
        Code.variableDB_.reset();
      }
    };

    // override JS variable set to remove semicolon
    Code.variables_set = function(block) {
      var argument0 = Code.valueToCode(block, 'VALUE', Code.ORDER_ASSIGNMENT) || '0';
      var varName = Code.variableDB_.getName(
          block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
      return varName + ' = ' + argument0 + '\n';
    };
}());
