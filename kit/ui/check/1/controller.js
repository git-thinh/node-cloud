{
    data: function() {
        return {
            id: '',
            class_box: '',
            class_check: '',
            class_title: '',
            title: '',
            indeterminate: false,
            value: 0
        }
    },
    render: function (createElement) {
        var _self = this, _data = _self.$data;

        _data.id = _self.kit_name + '___' + _self._uid;
        var id = _data.id;

        var attr = {
            class: _self.class_check,
            type: 'checkbox',
            value: _data.value,
            id: id
        };

        if (_data.disable == true) attr.disabled = 'disabled';
        if (_data.value == 1) attr.checked = 'checked';

        var input = createElement('input', { attrs: attr });
        var label = createElement('label', {
            attrs: {
                class: _self.class_title,
                for: id
            }
        }, [_data.title]);

        var root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _data.class_box } }, [input, label]);
        return root;
    },
    mounted: function() {
        var _self = this,
            el = _self.$el.querySelector('input[type="checkbox"]');
        if (el && _self.indeterminate) el.indeterminate = true;
    }
}