/* =====================================================================
   speech.js — ES5 ONLY
   SPEECH: TTS (voice pick, rate, slow) + SpeechRecognition wrapper
   + error taxonomy + graceful degradation (text fallback when canListen()=false)
   ===================================================================== */

var SPEECH = (function () {
  'use strict';

  /* ── internal state ── */
  var _voices = [];
  var _prefVoice = null;
  var _rate = 1.0;
  var _recogniser = null;
  var _listening = false;

  /* ── TTS helpers ── */
  function _loadVoices() {
    if (typeof speechSynthesis === 'undefined') { return; }
    _voices = speechSynthesis.getVoices() || [];
    if (_voices.length === 0 && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = function () {
        _voices = speechSynthesis.getVoices() || [];
        _pickBestVoice();
      };
    } else {
      _pickBestVoice();
    }
  }

  function _pickBestVoice() {
    // Prefer en-GB, then en-US, then any English
    var priorities = ['en-GB', 'en-US', 'en-AU', 'en-IN'];
    for (var p = 0; p < priorities.length; p++) {
      for (var i = 0; i < _voices.length; i++) {
        if (_voices[i].lang === priorities[p]) {
          _prefVoice = _voices[i];
          return;
        }
      }
    }
    // fallback: any English
    for (var j = 0; j < _voices.length; j++) {
      if (_voices[j].lang.indexOf('en') === 0) {
        _prefVoice = _voices[j];
        return;
      }
    }
    _prefVoice = _voices[0] || null;
  }

  /* ── Public TTS API ── */
  function canSpeak() {
    return typeof speechSynthesis !== 'undefined';
  }

  function speak(text, opts) {
    if (!canSpeak() || !text) { return; }
    opts = opts || {};
    speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(text);
    utt.rate = opts.slow ? 0.65 : (opts.rate || _rate);
    utt.pitch = 1.0;
    utt.volume = 1.0;
    if (opts.voice) {
      utt.voice = opts.voice;
    } else if (_prefVoice) {
      utt.voice = _prefVoice;
    }
    utt.lang = 'en-GB';
    if (typeof opts.onend === 'function') { utt.onend = opts.onend; }
    if (typeof opts.onerror === 'function') { utt.onerror = opts.onerror; }
    speechSynthesis.speak(utt);
  }

  function speakSlow(text, opts) {
    opts = opts || {};
    opts.slow = true;
    speak(text, opts);
  }

  function stop() {
    if (canSpeak()) { speechSynthesis.cancel(); }
  }

  function setRate(r) {
    _rate = Math.max(0.5, Math.min(2.0, r));
  }

  function getVoices() { return _voices; }

  function setVoiceByName(name) {
    for (var i = 0; i < _voices.length; i++) {
      if (_voices[i].name === name) { _prefVoice = _voices[i]; return; }
    }
  }

  /* ── STT helpers ── */
  var STT_CTOR = (typeof SpeechRecognition !== 'undefined') ? SpeechRecognition :
    (typeof webkitSpeechRecognition !== 'undefined') ? webkitSpeechRecognition : null;

  function canListen() {
    return STT_CTOR !== null;
  }

  /* Error taxonomy — maps DOMException names to human messages */
  var STT_ERRORS = {
    'not-allowed': 'Microphone permission was denied. Please allow mic access and try again.',
    'no-speech':   'No speech detected. Please speak clearly and try again.',
    'audio-capture': 'No microphone found. Please connect a microphone.',
    'network':     'Network error. Voice recognition needs internet in some browsers.',
    'aborted':     'Listening was stopped.',
    'service-not-allowed': 'Speech service not available on this page.',
    'bad-grammar': 'Could not recognise speech. Please try again.',
    'language-not-supported': 'Language not supported by your browser\'s speech engine.'
  };

  function _errMsg(code) {
    return STT_ERRORS[code] || ('Speech error: ' + code);
  }

  /**
   * listen(opts)
   * opts.onresult(transcript, isFinal, alternatives)
   * opts.onend()
   * opts.onerror(humanMessage, code)
   * opts.interim  — if true, fire onresult with interim results too
   * opts.lang     — BCP-47 language tag, default 'en-GB'
   * opts.maxAlts  — number of alternative transcripts (1–5)
   */
  function listen(opts) {
    if (!canListen()) {
      if (typeof opts.onerror === 'function') {
        opts.onerror('Speech recognition is not supported by your browser. Please type your answer instead.', 'not-supported');
      }
      return null;
    }
    if (_listening) { stopListening(); }

    opts = opts || {};
    _recogniser = new STT_CTOR();
    _recogniser.continuous = false;
    _recogniser.interimResults = !!opts.interim;
    _recogniser.lang = opts.lang || 'en-GB';
    _recogniser.maxAlternatives = opts.maxAlts || 3;

    _recogniser.onresult = function (ev) {
      var result = ev.results[ev.results.length - 1];
      var transcript = result[0].transcript.trim();
      var isFinal = result.isFinal;
      var alts = [];
      for (var i = 0; i < result.length; i++) {
        alts.push(result[i].transcript.trim());
      }
      if (typeof opts.onresult === 'function') {
        opts.onresult(transcript, isFinal, alts);
      }
    };

    _recogniser.onend = function () {
      _listening = false;
      if (typeof opts.onend === 'function') { opts.onend(); }
    };

    _recogniser.onerror = function (ev) {
      _listening = false;
      var code = ev.error || 'unknown';
      var msg = _errMsg(code);
      if (typeof opts.onerror === 'function') { opts.onerror(msg, code); }
    };

    try {
      _recogniser.start();
      _listening = true;
    } catch (e) {
      _listening = false;
      if (typeof opts.onerror === 'function') {
        opts.onerror('Could not start listening: ' + e.message, 'start-failed');
      }
    }

    return _recogniser;
  }

  function stopListening() {
    _listening = false;
    if (_recogniser) {
      try { _recogniser.stop(); } catch (e) { /* ignore */ }
      _recogniser = null;
    }
  }

  function isListening() { return _listening; }

  /* ── init ── */
  _loadVoices();

  return {
    canSpeak: canSpeak,
    speak: speak,
    speakSlow: speakSlow,
    stop: stop,
    setRate: setRate,
    getVoices: getVoices,
    setVoiceByName: setVoiceByName,
    canListen: canListen,
    listen: listen,
    stopListening: stopListening,
    isListening: isListening
  };
}());
