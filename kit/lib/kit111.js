var __APP = {}, __V_MIXIN = {}, __V_DO_ACTION = 'v-do-action';
window.addEventListener('click', function (event) {
    var el = event.target, id = el.id, vid = '', class_ = el.getAttribute('class');
    if (class_ && class_.indexOf(__V_DO_ACTION) != -1) {
        var v = el.closest('.v-com');
        if (v) vid = v.id;
        else return;
    }
    var ls = this.document.querySelectorAll('.v-com');
    ls.forEach(function (x) {
        if (x.__vue__ && x.__vue__._dom_click)
            setTimeout(function () { x.__vue__._dom_click(id, vid); }, 0);
    });
});
__APP._script_insertHeader = function (url, callback) {
    if (url && url.length > 0) {
        var script = document.createElement('script');
        script.onload = function () {
            if (callback) callback();
        };
        script.setAttribute('src', url);
        document.head.appendChild(script);
    }
};
__APP._link_cssInsertHeader = function (url) {
    var link = document.createElement('link');
    link.setAttribute('href', url);
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);
};
__APP._url_getSync = function (url) {
    var s = '';
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) s = request.responseText;
    return s;
};
__APP._dome_loaded = function () {

};
if (window.hasOwnProperty('Vue')) {
    Vue.directive('set-data', {
        bind: function (el, binding, vnode) {
            var vueParent = vnode.context,
                vueSelf = el.__vue__,
                data = binding.value;
            if (typeof binding.value == 'function') data = binding.value();
            //console.log(data);
            if (vueSelf) {
                if (binding.arg) {
                    //console.log(binding.arg, data);
                    vueSelf.$data[binding.arg] = data;
                } else {
                    var keys = Object.keys(data);
                    //console.log(vueSelf.kit_name, keys);
                    keys.forEach(function (ky) {
                        vueSelf.$data[ky] = data[ky];
                    });
                }
            }
        }
    });
}
__V_MIXIN = {
    computed: {
        _localPathDir: function () {
            var _self = this, name = _self.kit_name;
            return '/ui/' + name.split('_').join('/') + '/';
        }
    },
    created: function () {
        var _self = this;
        _self._setKitName();
        //console.log('MIXIN.created = ', this.kit_name);
    },
    mounted: function () {
        var _self = this;
        Vue.nextTick(function () {
            _self._classAdd(_self.$el, _self.kit_name);
            _self._classAdd(_self.$el, 'v-com');

            if (location.hostname == 'kit.lo' || location.hostname == 'kit.iot.vn')
                _self._classToggle(_self.$el, 'ui-mode-kit');
        });
    },
    methods: {
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
            if ('classList' in document.documentElement)
                elem.classList.add(c);
            else if (!_self._classHas(elem, c))
                elem.className = elem.className + ' ' + c;
        },
        _classRemove: function (elem, c) {
            var _self = this;
            if ('classList' in document.documentElement)
                elem.classList.remove(c);
            else
                elem.className = elem.className.replace(_self._classReg(c), ' ');
        },
        _setKitName: function () {
            var _self = this;
            var kit_name = _self.$vnode.tag;
            if (kit_name && kit_name.length > 14) {
                kit_name = kit_name.substr(14);
                var pos = kit_name.split('-')[0].length + 1;
                kit_name = kit_name.substr(pos);
            } else kit_name = '';
            _self.kit_name = kit_name;

            var kit_id = kit_name + '--' + _self._uid;
            _self.kit_id = kit_id;
            Vue.nextTick(function () {
                _self.$el.id = kit_id;
            })

            return kit_name;
        },
        _getJsonUrl: function (url) {
            var s = null;
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send(null);
            if (request.status === 200) s = JSON.parse(request.responseText);
            return s;
        },
        _setData: function (data) {
            var _self = this;
            var keys = Object.keys(data);
            keys.forEach(function (ky) {
                _self.$data[ky] = data[ky];
            });
        },
        _createElementSvg: function (createElement, config, arrPath) {
            var paths = [];
            arrPath.forEach(function (path_) {
                var el = createElement('path', { attrs: { 'fill-rule': 'evenodd', 'd': path_ } });
                paths.push(el);
            });

            config = config || {};
            if (config.attrs == null) config.attrs = {};
            config.attrs.viewBox = '0 0 16 16';
            config.attrs.fill = 'currentColor';
            config.attrs.xmlns = 'http://www.w3.org/2000/svg';

            var root = createElement('svg', config, paths);
            return root;
        }
    }
};
window.addEventListener('DOMContentLoaded', __APP._dome_loaded);