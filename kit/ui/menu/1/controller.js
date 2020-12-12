{
    data: function() {
        return {
            class_root: '',
            class_box: '',
            logo: {},
            menu: {},
            right: {},
        }
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            _items = _self.items,
            _arrEls = [];

        //for (var i = 0; i < _items.length; i++) {
        //    var it = _items[i];
        //    var el = createElement('a', {
        //        attrs: {
        //            class: it.class_link
        //        }
        //    }, [it.title]);

        //    var li = createElement('li', {
        //        attrs: { class: it.class_tab }
        //    }, [el]);
        //    _arrEls.push(li);
        //}

        var left, center, right;
        if (Object.keys(_data.logo).length == 0)
            left = createElement('div', { attrs: { class: '' } }, []);
        else {
            var img = createElement('img', { attrs: { src: _data.logo.src } });
            var logo = createElement('a', { attrs: { class: '--logo' } }, [img]);

            var left_css = '--left';
            if (_data.logo.class_box && _data.logo.class_box.length > 0) left_css += ' ' + _data.logo.class_box;
            left = createElement('div', { attrs: { class: left_css } }, [logo]);
        }

        if (Object.keys(_data.menu).length == 0)
            center = createElement('div', { attrs: { class: '' } }, []);
        else {
            var menu = createElement('tab_1', {
                directives: [{ name: 'set-data', value: _data.menu }],
            });
            center = createElement('div', { attrs: { class: '--center ' + _data.menu.class_box } }, [menu]);
        }


        right = createElement('div', { attrs: { class: '' } }, []);

        var box = createElement('div', { attrs: { class: _self.class_box + ' --main' } }, [left, center, right]);
        var nav = createElement('nav', { attrs: { class: _self.kit_name + ' ' + _self.class_root } }, [box]);
        return nav;
    }
}