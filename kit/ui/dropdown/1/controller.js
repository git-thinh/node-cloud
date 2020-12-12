{
    data: function() {
        return {
            active: false,
            class: '',
            class_popup: '',
            button: {
                attrs: {}
            },
            button_split: {
            },
            items: []
        }
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            _btn = _data.button,
            _btn_split_attrs = _data.button_split,
            _items = _data.items,
            _arrEls = [],
            btnContent = '',
            _ID = _self.kit_name + '___' + _self._uid,
            root, btn, btn_split, has_btn_split = Object.keys(_btn_split_attrs).length > 0;

        //console.log(_self);

        if (_btn.content) btnContent = _btn.content;

        if (has_btn_split) {
            _btn.attrs.type = 'button';
            var class_text = __V_DO_ACTION + ' ' + (_btn.attrs.class || '');

            _btn_split_attrs.id = _ID;
            _btn_split_attrs.type = 'button';
            var class_ = __V_DO_ACTION + ' ' + (_btn_split_attrs.class || '');
            if (_self.class && _self.class.indexOf('dropstart') != -1) {
                class_ += ' rounded-start';
                class_text += ' rounded-end';
            }

            btn = createElement('button', { attrs: _btn.attrs, class: class_text }, [btnContent]);

            btn_split = createElement('button', {
                on: { click: function () { _self._toggleDropdown(_ID); } },
                attrs: _btn_split_attrs,
                class: class_
            });
        } else {
            _btn.attrs.id = _ID;
            _btn.attrs.type = 'button';
            var class_ = __V_DO_ACTION + ' ' + (_btn.attrs.class || '');
            btn = createElement('button', {
                on: { click: function () { _self._toggleDropdown(_ID); } },
                attrs: _btn.attrs,
                class: class_
            }, [btnContent]);
        }

        for (var i = 0; i < _items.length; i++) {
            var it = _items[i], el;
            if (Object.keys(it).length == 0) {
                el = createElement('div', { attrs: { class: 'dropdown-divider' } });
            } else {
                el = createElement('button', {
                    attrs: {
                        type: 'button',
                        class: it.class
                    }
                }, [it.title]);
            }
            _arrEls.push(el);
        }

        var popup_class = (_data.class_popup || '') + ' v-ui-popup ' + _ID;
        if (_data.active) popup_class += ' show';
        var popup = createElement('div', { attrs: { class: popup_class } }, _arrEls);

        if (has_btn_split) {
            if (_self.class && _self.class.indexOf('dropstart') != -1)
                root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, [btn_split, btn, popup]);
            else
                root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, [btn, btn_split, popup]);
        } else
            root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, [btn, popup]);

        return root;
    },
    methods: {
        _dom_click: function(elemId, comId) {
            var _self = this,
                pop = this.$el.querySelector('.v-ui-popup.show');
            if (pop && comId != _self.kit_id) _self._classToggle(pop, 'show');
        },
        _toggleDropdown: function() {
            var _self = this,
                pop = this.$el.querySelector('.v-ui-popup');
            if (pop) _self._classToggle(pop, 'show');
        }
    }
}