
Vue.directive('set-data', {
    bind: function (el, binding, vnode) {
        var parent = vnode.context,
            self = el.__vue__,
            data = binding.value;
        if (typeof binding.value == 'function') data = binding.value();
        //console.log(data);
        if (self) {
            if (binding.arg) {
                //console.log(binding.arg, data);
                self.$data[binding.arg] = data;
            } else {
                var keys = Object.keys(data);
                //console.log(self.kit_name, keys);
                keys.forEach(function (ky) {
                    self.$data[ky] = data[ky];
                });
            }
        }
    }
});

__VC_MIXIN = {
    props: __VC_PROPS,
    created: function () { this._init(); },
    mounted: function () {
        var self = this;
        if (self.vpMounted) self.vpMounted(self);
    },
    methods: {
        _init: function () {
            var self = this;

            var kit_name = self.$vnode.tag;
            if (kit_name && kit_name.length > 17) {
                kit_name = kit_name.substr(17);
                var pos = kit_name.split('-')[0].length + 1;
                kit_name = 'vc-' + kit_name.substr(pos);
            } else kit_name = '';
            self.kit_name = kit_name;

            var kit_id = kit_name + '--' + self._uid;
            self.kit_id = kit_id;

            Vue.nextTick(function () {
                var is11 = !!window.MSInputMethodContext && !!document.documentMode;
                if (is11) self._classAdd(document.body, '__ie11');

                var self_el = self.$el;

                var vp_ref = self.vpRef;
                if (vp_ref && vp_ref.length > 0) {
                    //console.log(vp_ref);
                    __APP_INLINE.push(vp_ref);
                    self._classAdd(self_el, vp_ref);
                    __VC_REF[vp_ref] = self;
                }

                self_el.id = kit_id;
                self._classAdd(self_el, self.kit_name);
                self._classAdd(self_el, 'vc-com');
                if (self.vpTheme) self._classAdd(self_el, self.vpTheme);
                if (self.vpType) self._classAdd(self_el, self.vpType);

                if (self.img_loading != null && self.img_loading > 0) self._classAdd(self_el, '__img_loading');
                if (self.updating) self._classAdd(self_el, '__updating');
                if (self.text != null && self.text.length > 0) self._classAdd(self_el, '__text');
                if (self.vpClass != null && self.vpClass.length > 0) self._classAdd(self_el, self.vpClass);
                if (self.readonly) self._classAdd(self_el, '__readonly');
                if (self.vpDisable) self._classAdd(self_el, '__disable');

                var icon_align = self.vpIconalign;
                if (icon_align == 'left' || icon_align == 'right' || icon_align == 'top' || icon_align == 'bottom')
                    self._classAdd(self_el, '__icon_align_' + self.vpIconalign);
            });
        },
        _classToggle: function (elem, c) {
            var _self = this;
            var fn = _self._classHas(elem, c) ? _self._classRemove : _self._classAdd;
            fn(elem, c);
        },
        _classReg: function (className) {
            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        },
        _classHas: function (elem, c) {
            var _self = this;
            if ('classList' in document.documentElement)
                return elem.classList.contains(c);
            else
                return _self._classReg(c).test(elem.className);
        },
        _classAdd: function (elem, c) {
            if (elem
                && typeof elem.hasAttribute == 'function') {
                //console.log('_classAdd: ', c, elem);
                if (elem.hasAttribute('class')) {
                    var v = elem.getAttribute('class');
                    if (v == null) v = '';
                    v = v.trim();
                    if (v.length == 0) elem.setAttribute('class', c);
                    else {
                        v = v.split(c).join(' ').trim() + ' ' + c;
                        elem.setAttribute('class', v);
                    }
                } else elem.setAttribute('class', c);
            }
        },
        _classRemove: function (elem, c) {
            c = c || '';
            c = c.trim();
            //console.log('_classRemove: ', c, elem);
            if (c.length > 0
                && elem && typeof elem.hasAttribute == 'function') {
                if (elem.hasAttribute('class')) {
                    var v = elem.getAttribute('class'), s = '';
                    v = v.trim();
                    if (c == v) elem.setAttribute('class', '');
                    else if (v.length > 0) {
                        if (v.startsWith(c + ' ')) {
                            s = v.substr(c.length).trim();
                            //console.log('_classRemove: 1 = ', c, v, s);
                            elem.setAttribute('class', s);
                        } else if (v.endsWith(' ' + c)) {
                            s = v.substr(0, v.length - c.length).trim();
                            //console.log('_classRemove: 2 = ', c, v, s);
                            elem.setAttribute('class', s);
                        } else {
                            s = v.split(' ' + c + ' ').join(' ').trim();
                            //console.log('_classRemove: 3 = ', c, v, s);
                            elem.setAttribute('class', s);
                        }
                    }
                }
            }
        },
        _toast: __vue_toast,
        _initData: function (df) {
            var data = this.vpData || {},
                v = df || {};
            if (data.hasOwnProperty('setting_') == false)
                data.setting_ = JSON.parse(JSON.stringify(__V_DEF_DATA.setting_));
            Object.keys(data).forEach(function (key) { v[key] = data[key]; });
            Object.keys(__V_DEF_DATA.setting_).forEach(function (key) {
                if (v.setting_.hasOwnProperty(key) == false)
                    v.setting_[key] = __V_DEF_DATA.setting_[key];
            });
            return v;
        },
        _createElement: function (createElement, tag_name, setting, arr_elems, para) {
            var self = this;
            self.para_ = para;
            //console.log(self.kit_id, para);
            tag_name = tag_name || 'div';
            setting = setting || {};
            arr_elems = arr_elems || [];
            var cf = {};
            Object.keys(setting).forEach(function (key) {
                if (key == 'on') {
                    //console.log(key, para);
                    var _on = setting[key];
                    if (_on != null) {
                        cf[key] = {};
                        Object.keys(_on).forEach(function (event_name) {
                            if (typeof _on[event_name] == 'function') {
                                //console.log(self.para_);
                                cf[key][event_name] = function (ev_) {
                                    ev_._vue = self;
                                    _on[event_name](ev_);
                                };
                            }
                        });
                    }
                } else cf[key] = setting[key];
            });
            //console.log(cf);
            var el = createElement(tag_name, cf, arr_elems);
            return el;
        },
        _submitRegisterEvent: function (fn) {
            if (typeof fn == 'function')
                window[this.kit_id + '--submit'] = fn;
        },
        _submitCall: function () {
            var self = this;
            var fn = window[self.kit_id + '--submit'];
            if (typeof fn == 'function') fn(self);
        },
        _rollbackAction: function () { },
        _toggleActiveClick: function () { }
    }
};

__VA_MIXIN = {
    methods: {
        _toast: __vue_toast,
        _vc_inline_ready: function () {
            document.querySelectorAll('.vc-com.vc-inline').forEach(function (el) {
                if (el.__vue__ && el.__vue__._vc_inline_ready) el.__vue__._vc_inline_ready();
            });
        },
    }
};

