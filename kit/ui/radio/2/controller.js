{
    data: function() {
        return {
            class: '',
            items: []
        }
    },
    render: function (createElement) {
        var _self = this, arrItems = [];

        if (_self.items && Array.isArray(_self.items) && _self.items.length > 0) {
            _self.items.forEach(function (o, index) {
                var it = createElement('radio_1', {
                    attrs: {},
                    directives: [{
                        name: 'set-data',
                        value: o
                    }]
                });
                arrItems.push(it);
            })
        }

        var root = createElement('div', { attrs: { class: _self.kit_name + ' ' + _self.class } }, arrItems);
        return root;
    }
}