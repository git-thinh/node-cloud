{
    data: function() {
        return {
            icon_id: '',
            popup_id: '',
            input_id: '',
            class: '',
            class_popup: '',
            style_icon: {},
            input_config: {
                style: {},
                attrs: {},
            },
            active: false
        };
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            style_icon = _data.style_icon || {},
            input_config = _data.input_config || {},
            icon, root, popup, input,
            arrPath = [];

        var popup_id = _self.kit_name + '___popup_' + _self._uid;
        var input_id = _self.kit_name + '___input_' + _self._uid;
        var icon_id = _self.kit_name + '___icon_' + _self._uid;
        _self.$data.popup_id = popup_id;
        _self.$data.input_id = input_id;
        _self.$data.icon_id = icon_id;

        arrPath = [
            'M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z',
            'M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
        ];

        icon = _self._createElementSvg(createElement, {
            attrs: { id: icon_id, class: __V_DO_ACTION },
            on: {
                click: _self._iconClick,
                mouseover: _self._iconMouseOver,
                mouseout: _self._iconMouseOut
            },
            style: style_icon
        }, arrPath);

        var cf_input = { attrs: { class: '' } };
        Object.keys(input_config).forEach(function (key) { cf_input[key] = input_config[key]; });
        cf_input.attrs.id = input_id;
        cf_input.attrs.class = __V_DO_ACTION + ' ' + (cf_input.attrs.class || '')
        input = createElement('input', cf_input);

        popup = createElement('div', {
            attrs: {
                id: popup_id,
                class: _self.class_popup + (_self.active ? ' show' : '')
            }
        }, [input]);

        root = createElement('div', {
            attrs: {
                class: _self.class
            }
        }, [icon, popup]);

        return root;
    },
    mounted: function() {
        var _self = this;
        //Vue.nextTick(function () {
        if (_self.active) {
            _self.style_icon.opacity = 1;
            _self.style_icon.color = 'orangered';
            var el = document.getElementById(_self.input_id);
            if (el) el.focus();
        } else _self.style_icon.opacity = '0.2';
        //});
    },
    methods: {
        _dom_click: function(elemId, comId) {
            if (comId != this.kit_id)
                this._hidePopup();
        },
        _hidePopup: function() {
            var _self = this;
            var pop = document.getElementById(_self.popup_id);
            if (pop) _self._classRemove(pop, 'show');
            _self.active = false;
            _self.style_icon.opacity = '0.2';
            _self.style_icon.color = '#000';
        },
        _iconClick: function() {
            var _self = this;
            //console.log('SEARCH_ICON_CLICK: ...', _self.popup_id);
            var pop = document.getElementById(_self.popup_id);
            var el = document.getElementById(_self.input_id);
            if (pop && el) {
                if (_self.active) _self._hidePopup();
                else {
                    _self._classAdd(pop, 'show');
                    _self.active = true;
                    _self.style_icon.color = 'orangered';
                    el.focus();
                }
            }
        },
        _iconMouseOver: function() {
            //console.log('SEARCH_ICON_OVER: ...', this.popup_id)
            this.style_icon.opacity = 1;
            this.style_icon.color = 'orangered';
        },
        _iconMouseOut: function() {
            //console.log('SEARCH_ICON_OUT: ...', this.popup_id)
            if (this.active == false) {
                this.style_icon.opacity = '0.2';
                this.style_icon.color = '#000';
            }
        }
    }
}