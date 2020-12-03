{
    data: function() {
        return {
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
            btn = createElement('button', { attrs: _btn.attrs }, [btnContent]);

            _btn_split_attrs.id = _ID;
            _btn_split_attrs.type = 'button';
            btn_split = createElement('button', { attrs: _btn_split_attrs });
        } else {
            _btn.attrs.id = _ID;
            _btn.attrs.type = 'button';
            btn = createElement('button', { attrs: _btn.attrs }, [btnContent]);
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

        var popup = createElement('div', {
            attrs: {
                class: 'dropdown-menu',
                'aria-labelledby': _ID,
            }
        }, _arrEls);

        if (has_btn_split)
            root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, [btn, btn_split, popup]);
        else
            root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, [btn, popup]);

        return root;
    }
}