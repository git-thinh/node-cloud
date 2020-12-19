
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
    methods: {
        _init: function () {
            var _self = this;

            var kit_name = _self.$vnode.tag;
            if (kit_name && kit_name.length > 17) {
                kit_name = kit_name.substr(17);
                var pos = kit_name.split('-')[0].length + 1;
                kit_name = 'vc-' + kit_name.substr(pos);
            } else kit_name = '';
            _self.kit_name = kit_name;

            var kit_id = kit_name + '--' + _self._uid;
            _self.kit_id = kit_id;

            Vue.nextTick(function () {
                var vp_ref = _self.vpRef;
                if (vp_ref && vp_ref.length > 0) {
                    //console.log(_self.kit_id, _self.vpRef);
                    window[vp_ref] = _self;
                    __APP_INLINE.push(vp_ref);
                    _self._classAdd(_self.$el, vp_ref);
                }

                _self.$el.id = kit_id;
                _self._classAdd(_self.$el, _self.kit_name);
                _self._classAdd(_self.$el, 'vc-com');
                if (_self.vpTheme) _self._classAdd(_self.$el, _self.vpTheme);
                if (_self.vpType) _self._classAdd(_self.$el, _self.vpType);
                if (_self.vpClass) _self._classAdd(_self.$el, _self.vpClass);
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
            var _self = this;
            if ('classList' in document.documentElement) {
                if (elem.classList && elem.classList.add) elem.classList.add(c);
                else elem.className += ' ' + c;
            } else if (!_self._classHas(elem, c))
                elem.className = elem.className + ' ' + c;
        },
        _classRemove: function (elem, c) {
            var _self = this;
            if ('classList' in document.documentElement)
                elem.classList.remove(c);
            else
                elem.className = elem.className.replace(_self._classReg(c), ' ');
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
        _createElement: function (createElement, tag_name, setting, arr_elems) {
            tag_name = tag_name || 'div';
            setting = setting || {};
            arr_elems = arr_elems || [];
            var cf = {};
            Object.keys(setting).forEach(function (key) { cf[key] = setting[key]; });
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
