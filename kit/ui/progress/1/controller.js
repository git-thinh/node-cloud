{
    data: function() {
        return {
            bg_class: 'bg-primary',
            value_min: 0,
            value_max: 100,
            value_now: 0
        }
    },
    render: function (createElement) {
        var _self = this, el;
        //style="width: 5%" ="5" ="0" ="100"

        var el_path = createElement('div', {
            style: {
                width: _self.value_now + '%'
            },
            attrs: {
                class: 'progress-bar ' + _self.bg_class,
                role: 'progressbar',
                'aria-valuenow': _self.value_now,
                'aria-valuemin': _self.value_min,
                'aria-valuemax': _self.value_max
            }
        });
        el = createElement('div', {
            attrs: {
                class: 'progress'
            }
        }, [el_path]);

        return el;
    },
    mounted: function() {
        var _self = this;
    },
    methods: {
    }
}