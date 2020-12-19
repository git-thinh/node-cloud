var __APP, _DATA_DEMO = {}, __V_DO_ACTION = 'v-do-action';
Object.prototype._clone = function () { var v = {}, o = this; Object.keys(o).forEach(function (key) { v[key] = o[key]; }); return v; };

window.addEventListener('DOMContentLoaded', _init);
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

function _scriptInsertHeader(url, callback) {
    if (url && url.length > 0) {
        var script = document.createElement('script');
        script.onload = function () {
            if (callback) callback();
        };
        script.setAttribute('src', url);
        document.head.appendChild(script);
    }
}

function _linkCssInsertHeader(url) {
    var link = document.createElement('link');
    link.setAttribute('href', url);
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);
}

function _getUrl(url) {
    var s = '';
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) s = request.responseText;
    return s;
}

var _HTML = {};
var GROUP_BASE = ['icon'];
//var GROUP_BASE = ['search', 'check', 'radio', 'range', 'progress', 'dropdown'];
//var GROUP_BASE = ['input', 'hide', 'color', 'text', 'tab'];//, 'avatar'
//var GROUP_BASE = ['dropdown', 'input', 'check', 'radio', 'range', 'hide', 'color', 'progress', 'text', 'tab', 'search'];//, 'avatar'
function _init() {
    fetch('/ui-kit.json').then(r => r.json()).then(function (r) {
        //console.log(r);
        if (r.ok && r.data) {
            var kit = '', arrAll = [];
            GROUP_BASE.forEach(function (x) {
                var it = _.find(r.data, function (o) { return o.group == x; });
                if (it) arrAll.push(it);
                else console.log('ERROR_NOT_FIND_KIT_BASE: ', x);
            });

            var arr2 = _.filter(r.data, function (x) {
                return GROUP_BASE.findIndex(function (x1) { return x1 == x.group; }) == -1;
            });
            //console.log(arrAll);
            //console.log(arr2);
            //arr2.forEach(function (x) { arrAll.push(x); });
            //console.log(arrAll);

            var s = '', arrDemo = [];
            arrAll.forEach(function (c) {
                arrDemo = [];
                kit = c.group + '_' + c.name;
                if (_.findIndex(c.files, function (x) { return x == 'demo.json'; }) != -1) {
                    var json = _getUrl('/ui/' + c.group + '/' + c.name + '/demo.json');
                    if (json.length > 0) arrDemo = JSON.parse(json);
                }
                if (arrDemo.length == 0)
                    s += '<main class="ui-sandbox-kit ' + kit + '"><h3>' + kit + '</h3><' + kit + '></' + kit + '></main>';
                else {
                    arrDemo.forEach(function (it, i_) {
                        var vpr = kit + '.' + i_;
                        _DATA_DEMO[vpr] = it;
                        s += '<main class="ui-sandbox-kit ' + kit + '"><h3>' + kit + '[' + i_ + ']</h3><' + kit + ' v-set-data="_DATA_DEMO[\'' + vpr + '\']"></' + kit + '></main>';
                    });
                    s += '<div class=clearfix></div>';
                }
            });
            document.getElementById('app').innerHTML = s;

            var js = '', v = '', css = '';
            arrAll.forEach(function (c) {
                v = '';
                kit = c.group + '_' + c.name;
                if (c.files && c.files.length > 0) {
                    var htm = '';
                    if (_.findIndex(c.files, function (x) { return x == 'temp.html'; }) != -1) {
                        _HTML[kit] = _getUrl('/ui/' + c.group + '/' + c.name + '/temp.html');
                        htm = ' template: _HTML["' + kit + '"], ';
                    }

                    if (_.findIndex(c.files, function (x) { return x == 'controller.js'; }) != -1) {
                        v = _getUrl('/ui/' + c.group + '/' + c.name + '/controller.js').trim();
                        if (v.length > 0 && v[0] == '{') {
                            v = v.substr(1);
                            js += ';var ' + kit + ' = Vue.component("' + kit + '", { mixins: [V_MIXIN], ' + htm + v + ' )';
                        }
                    }

                    if (_.findIndex(c.files, function (x) { return x == 'style.css'; }) != -1)
                        css += _getUrl('/ui/' + c.group + '/' + c.name + '/style.css');
                }

                if (v.length == 0) js += ';var ' + kit + ' = Vue.component("' + kit + '", { mixins: [V_MIXIN], template: _HTML["' + kit + '"] })';
            });

            const blobJs = new Blob([js], { type: 'text/javascript' });
            const urlJs = URL.createObjectURL(blobJs)

            const blobCss = new Blob([css], { type: 'text/css' });
            const urlCss = URL.createObjectURL(blobCss)

            //console.log(_HTML);
            //console.log(urlJS);

            _linkCssInsertHeader(urlCss);
            _scriptInsertHeader(urlJs, function () {
                __APP = new Vue({
                    el: '#app',
                    data: {
                        message: 'Hello Vue.js!'
                    },
                    methods: {
                        reverseMessage: function () {
                            this.message = this.message.split('').reverse().join('')
                        }
                    }
                });
            });
        }
    });
}

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

var V_MIXIN = {
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

