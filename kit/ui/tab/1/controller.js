{
    data: function() {
        return {
            class: '',
            items: []
        }
    },
    render: function (createElement) {
        var _self = this;

        var kit_name = _self._setKitName();
        //console.log(kit_name);

        var _class = _self.class,
            _items = _self.items,
            _arrEls = [];

        for (var i = 0; i < _items.length; i++) {
            var it = _items[i];
            var el = createElement('a', {
                attrs: {
                    class: it.class_link
                }
            }, [it.title]);

            var li = createElement('li', {
                attrs: { class: it.class_tab }
            }, [el]);
            _arrEls.push(li);
        }

        var root = createElement('ul', {
            attrs: { class: _self.kit_name + ' ' + _class }
        }, _arrEls);
        return root;
    }
}