# adapt-textAudio

**TextAudio** is a *presentation component* 

## Prerequisites

* Required [adapt-audio](https://github.com/cgkineo/adapt-audio)
    
    To add audio completed trigger:
 1. Modify adapt-audio.js
```
onAudioEnded: function() {
    if (this.$active) {
       this.$active.addClass('play').removeClass('pause');
    }
    this.stop();
    Adapt.trigger('audio:complete'+this.$active.data('id'));
}
```
2. Add data-id in audio-controls.hbs 
```
{{#if _audio}}
<div class="audio-controls" role="button" aria-label="{{_audio.buttonAria}}">
	<a class="icon play" href="#" data-id="{{_id}}" data-autoplay="{{_audio.autoplay}}" data-mp3="{{_audio.mp3}}" data-ogg="{{_audio.ogg}}"></a>
</div>
{{/if}}
```

----------------------------

