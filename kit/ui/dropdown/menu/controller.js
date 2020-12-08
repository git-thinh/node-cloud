{
    data: function() {
        return {
            class: '',
            items: []
        }
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            _arrEls = [];

        for (var i = 0; i < _data.items.length; i++) {
            var it = _data.items[i], el, li;
            el = createElement('a', {
                attrs: {
                    class: it.class
                }
            }, [it.title]);
            li = createElement('li', {
                attrs: { class: '' }
            }, [el]);
            _arrEls.push(li);
        }

        return createElement('ul', { attrs: { class: _self.kit_name + ' ' + _data.class + ' ' + _data.ref_id } }, _arrEls);
    }
}