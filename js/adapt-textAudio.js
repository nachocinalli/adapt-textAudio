define(function (require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var TextAudio = ComponentView.extend({
        events: {
            'click .audio-controls .icon': 'onAudioCtrlsClick'
        },

        preRender: function () {
            this.checkIfResetOnRevisit();
           
        },

        postRender: function () {
            this.setReadyStatus();

            this.setupInview();
        },

        setupInview: function () {
           var selector = this.getInviewElementSelector();

            /* if (!selector) {
                this.setCompletionStatus();
            } else {
                this.model.set('inviewElementSelector', selector);
                this.$(selector).on('inview', _.bind(this.inview, this));
            }*/
             this.completionEvent = this.model.get('_setCompletionOn');

            if (this.completionEvent === 'inview') {
                this.$(selector).on('inview', _.bind(this.inview, this));
            }
            else
            {
                var eventCompleted = 'audio:complete'+this.model.get('_id');
                this.listenTo(Adapt, eventCompleted, this.onAudioComplete);
            }
        },
        onAudioComplete: function () {
            console.log("onAudioComplete", 'audio:complete' + this.model.get('_id'))
            this.setCompletionStatus();
        },
        onAudioCtrlsClick: function (event) {
            if (event) event.preventDefault();
            Adapt.trigger('audio', event.currentTarget);
        },
        getInviewElementSelector: function () {
            if (this.model.get('body')) return '.component-body';

            if (this.model.get('instruction')) return '.component-instruction';

            if (this.model.get('displayTitle')) return '.component-title';

            return null;
        },

        checkIfResetOnRevisit: function () {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function (event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$(this.model.get('inviewElementSelector')).off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        remove: function () {
            if (this.model.has('inviewElementSelector')) {
                this.$(this.model.get('inviewElementSelector')).off('inview');
            }

            ComponentView.prototype.remove.call(this);
        }
    },
        {
            template: 'textAudio'
        });



    Adapt.register('textAudio', TextAudio);

    return TextAudio;

});
