{
    data: function() {
        return {
            dropdown: {}
        }
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            root;

        console.log(_data.dropdown);

        var dd = createElement('dropdown_1', {
            attrs: {},
            directives: [{
                name: 'set-data',
                value: _data.dropdown
            }]
        });
        var input = createElement('input', {
            attrs: {
            }
        });
        root = createElement('div', {
            attrs: { }
        }, [input, dd]);

        //root = createElement('div', { attrs: {} });
        return root;
    },
    methods: {
    }
}