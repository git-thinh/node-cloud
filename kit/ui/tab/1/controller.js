{
    data: function() {
        return {
            menu: {
                timer: null,
                visable: false
            },
            class: '',
            items: []
        }
    },
    render: function (createElement) {
        var _self = this;
        var _items = _self.items, _arrEls = [], tagName = 'ul';

        for (var i = 0; i < _items.length; i++) {
            var it = _items[i], el, li;
            if (it.hasOwnProperty('class_tab')) {
                if (it.hasOwnProperty('menu_sub')) {
                    var idsub = _self.kit_name + '___' + _self._uid + '_' + i;

                    el = createElement('button', {
                        attrs: {
                            class: it.class_link,
                            id: idsub
                        },
                        on: {
                            click: function () {
                                _self.menusub_toggleShow(idsub);
                            }
                        },
                    }, [it.title]);

                    it.menu_sub.ref_id = idsub;
                    var sub = createElement('dropdown_menu', {
                        directives: [{ name: 'set-data', value: it.menu_sub }],
                    });

                    li = createElement('li', {
                        attrs: { class: it.class_tab }
                    }, [el, sub]);

                } else {
                    el = createElement('a', {
                        attrs: {
                            class: it.class_link
                        }
                    }, [it.title]);

                    li = createElement('li', {
                        attrs: { class: it.class_tab }
                    }, [el]);
                }
                _arrEls.push(li);
            } else {
                tagName = 'nav';
                el = createElement('a', {
                    attrs: {
                        class: it.class_link
                    }
                }, [it.title]);
                _arrEls.push(el);
            }
        }

        return createElement(tagName, {
            attrs: { class: _self.kit_name + ' ' + _self.class }
        }, _arrEls);
    },
    methods: {
        menusub_toggleShow: function(id) {
            var _self = this;

            if (_self.menu.timer != null) {
                clearTimeout(_self.menu.timer);
                _self.menu.timer = null;
            }

            if (_self.menu.visable)
                _self.menu.visable = false;
            else {
                _self.menu.visable = true;
                _self.menu.timer = setTimeout(function () {
                    $('.' + id).removeClass('show');
                    _self.menu.visable = false;
                }, 2000);
            }
            $('.' + id).toggleClass('show');
        }
    }
}