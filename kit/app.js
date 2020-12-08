var _DATA_DEMO = {};

window.addEventListener('DOMContentLoaded', _init);

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
var GROUP_BASE = ['check', 'radio', 'range', 'search', 'hide', 'text', 'color', 'avatar', 'progress', 'dropdown', 'tab'];
function _init() {
    fetch('/ui-kit.json').then(r => r.json()).then(function (r) {
        //console.log(r);
        if (r.ok && r.data) {
            var kit = '';
            var arrAll = _.filter(r.data, function (x) {
                return GROUP_BASE.findIndex(function (x1) { return x1 == x.group; }) != -1;
            });
            var arr2 = _.filter(r.data, function (x) {
                return GROUP_BASE.findIndex(function (x1) { return x1 == x.group; }) == -1;
            });
            //console.log(arrAll);
            //console.log(arr2);
            arr2.forEach(function (x) { arrAll.push(x); });
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
                var app = new Vue({
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
        $(_self.$el).addClass(_self.kit_name);

        if (location.hostname == 'kit.lo' || location.hostname == 'kit.iot.vn') {
            $(_self.$el).addClass('ui-mode-kit');
        }
    },
    methods: {
        _setKitName: function () {
            var _self = this;
            var kit_name = _self.$vnode.tag;
            if (kit_name && kit_name.length > 14) {
                kit_name = kit_name.substr(14);
                var pos = kit_name.split('-')[0].length + 1;
                kit_name = kit_name.substr(pos);
            } else kit_name = '';

            _self.kit_name = kit_name;

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
        }
    }
};