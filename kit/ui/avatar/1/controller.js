{
    data: function() {
        return {
            src: '',
            size: ''
        }
    },
    render: function (createElement) {
        var _self = this, el,
            src = _self.src,
            clas = _self._getClass();

        //console.log('COM.render = ', _self.kit_name);

        if (src.length == 0) {
            var el_path = createElement('path', {
                attrs: {
                    'fill-rule': 'evenodd',
                    'd': 'M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
                }
            });
            el = createElement('svg', {
                attrs: {
                    class: 'none ' + clas,
                    viewBox: '0 0 16 16',
                    fill: 'currentColor',
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            }, [el_path]);
        } else {
            el = createElement('img', {
                attrs: {
                    class: clas,
                    src: src
                }
            });
        }
        return el;
    },
    mounted: function() {
        var _self = this;
        //setTimeout(function () {
        //    _self.src = 'images/avatar2.png';
        //}, 5000);
    },
    methods: {
        _bindItem: function(item) {
            console.log('AVATAR_1 = ', item);
        },
        _getClass: function() {
            var _self = this;
            var s = _self.kit_name + ' avatar';
            switch (this.size) {
                case 'sm':
                    s += ' avatar-sm';
                    break;
                case 'lg':
                    s += ' avatar-lg';
                    break;
            }
            return s;
        }
    }
}