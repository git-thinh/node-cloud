{
    data: function() {
        return {
            items: []
        };
    },
    render: function (createElement) {
        var _self = this, arrEl = [];

        this.items.forEach(function (it) {
            var vc = createElement('avatar_1', {
                attrs: {
                },
                directives: [
                    {
                        name: 'set-data',
                        value: it
                    }
                ]
            });
            var li = createElement('li', {
                attrs: {
                }
            }, [vc]);
            arrEl.push(li);
        });

        var el = createElement('ul', {
            attrs: {
                class: 'none '
            }
        }, [arrEl]);

        return el;
    },
    methods: {
    }
}