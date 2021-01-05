var self = this;

var root,
    data = self.$data,
    name = data.icon_name,
    name_active = name + '-active',
    text = data.text || '',
    active = data.active,
    setting = data.setting_ || {},
    arrPath = [], keys = [];
self.name_active = name;


var ok = false;
if (__SVG.hasOwnProperty(name)
    && __SVG[name].length > 0
    && !name.endsWith('-active')
    && active == false) {
    ok = true;
    //console.log('icon.1 = ', name);
}

if (!ok
    && __SVG.hasOwnProperty(name)
    && __SVG[name].length > 0
    && !name.endsWith('-active')
    && active) {
    if (__SVG.hasOwnProperty(name_active) && __SVG[name_active].length > 0) {
        //console.log('icon.2 = ', name + ' -> ' + name_active);
        name = name_active;
        self.name_active = name_active;
        ok = true;
    }
}

if (!ok
    && __SVG.hasOwnProperty(name)
    && __SVG[name].length > 0) {
    //console.log('icon.3 = ', name + ' -> ' + name_active);
    ok = true;
}

if (ok) {
    __SVG[name].forEach(function (it) {
        keys = Object.keys(it);
        if (keys.length > 0) {
            //console.log(keys[0], it[keys[0]]);
            var p = createElement(keys[0], { attrs: it[keys[0]] });
            arrPath.push(p);
        }
    });
}

//console.clear();
//console.log(name, active, self.img_loading, ok);

if (ok) {
    var label;
    if (text.length > 0)
        label = createElement('label', { class: '__ic_text __no-select' }, [text]);

    var svg = createElement('svg', {
        class: '__ic_icon',
        attrs: {
            viewBox: '0 0 16 16',
            fill: 'currentColor',
            xmlns: 'http://www.w3.org/2000/svg'
        },
        //on: {
        //    click: function (ev_) {
        //        ev_.target = self.$el;
        //        if (self._toggleActiveClick)
        //            self._toggleActiveClick(ev_);
        //        ev_.stopPropagation();
        //        ev_.preventDefault();
        //    }
        //}
    }, [arrPath]);

    var indicator;
    if (self.img_loading > 0)
        indicator = createElement('img', { class: '__ic_loading', attrs: { src: '/_static/img-loading/' + self.img_loading + '.gif' } });

    //if (self._toggleActiveClick) setting.on.click = self._toggleActiveClick;
    //delete setting.on.click;
    setting.on.click = function (ev_) {
        if (self.img_loading > 0 && self.updating == true) {
            ev_.stopPropagation();
            ev_.preventDefault();
            return;
        }

        if (self.img_loading > 0) self.updating = true;
        ev_._vue = self;
        if (self._toggleActiveClick)
            self._toggleActiveClick(ev_);
        ev_.stopPropagation();
        ev_.preventDefault();
    };
    root = self._createElement(createElement, 'div', setting, [indicator, svg, label]);
    return root;
} else {
    var s = 'Cannot find a setting for icon [' + name + ']';
    console.log('ERROR: ', s, self.$data);
    return createElement('div', { class: 'vc-icon vc-error', attrs: { title: s } }, ['[?]']);
}