{
    data: function() {
        return {
            ui_icon: {
                style: {},
                attrs: {},
                class: ''
            },
            ui_input: {
                style: {},
                attrs: {},
                class: ''
            }
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
    },
    methods: {
    }
}