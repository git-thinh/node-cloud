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

        var attr = {
            class: _data.class_range,
            type: 'range',
            value: _data.value,
            min: _data.min,
            max: _data.max
        };

        if (_data.disable == true) attr.disabled = 'disabled';

        var input, label, root;
        input = createElement('input', { attrs: attr });

        if (_data.title && _data.title.length > 0) {
            label = createElement('label', { attrs: { class: _data.class_title } }, [_data.title]);
            root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _data.class_box } }, [label, input]);
        } else {
            root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _data.class_box } }, [input]);
        }

        return root;
    }
}