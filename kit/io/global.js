
function __vue_toast(text, option) { if (__VC_REF.__KIT_TOAST) __VC_REF.__KIT_TOAST._show(text, option); }
function __vue_loading(visible, lock_screen) { if (__VC_REF.__KIT_LOADING) __VC_REF.__KIT_LOADING._show(visible, lock_screen); }

function __vue_appInit(callback) {
    var el = document.getElementById(__APP_ID);
    if (el) {
        el.innerHTML = '<ui-toast vp-ref="__KIT_TOAST" vp-theme="' + __V_THEME + '"></ui-toast>' +
            '<ui-loading vp-ref="__KIT_LOADING" vp-theme="' + __V_THEME + '"></ui-loading>';

        __APP = new Vue({
            mixins: [__VA_MIXIN],
            el: '#' + __APP_ID,
            data: function () {
                return {
                };
            },
            mounted: function () {
                Vue.nextTick(function () {
                    if (callback) callback();
                });
            },
            methods: {
            }
        });
    }
}

function __vue_appInit_inline(index, el, callback) {
    if (el == null) return;
    var ps = '', scom = '',
        kit_name = el.getAttribute('kit-name');
    el.getAttributeNames().forEach(function (key) {
        var val = el.getAttribute(key);
        if (val == 'true' || val == 'false') { } else val = '\'' + val + '\'';
        if (key.indexOf('vp-') == 0) ps += ':' + key + '="' + val + '" ';
    });
    scom = '<ui-' + kit_name + ' :vp-theme="\'' + __V_THEME + '\'" ' + ps + '></ui-' + kit_name + '>';
    //console.log(ps);
    //console.log(scom);

    el.innerHTML = scom;
    var app = new Vue({
        mixins: [__VA_MIXIN],
        el: '#' + el.id,
        data: function () {
            return {
                index: index,
                kit_name: kit_name,
                data: {
                    setting_: {
                        style: {
                            opacity: 0
                        }
                    }
                }
            };
        },
        mounted: function () {
            var _self = this;

            Vue.nextTick(function () {
                if (callback) callback();
            });
        }
    });
}

function __vue_init_inline(callback) {
    window.addEventListener('DOMContentLoaded', function () {
        __APP_ID = 'vue_' + (new Date()).getTime();
        var div = document.createElement('div');
        div.id = __APP_ID;
        div.setAttribute('class', 'va-base ' + __V_THEME);
        document.body.appendChild(div);
        __vue_appInit(function () {
            var ls = document.querySelectorAll('*[kit-name]'),
                size = ls.length;
            if (size == 0) __vue_ready(callback);
            else {
                ls.forEach(function (el, index) {
                    el.id = __APP_ID + '--' + index;
                    __vue_appInit_inline(index, el, function () {
                        size--;
                        if (size == 0) __vue_ready(callback);
                    });
                });
            }
        });
    });
}

function __vue_ready(callback) {
    __APP._vc_inline_ready();
    __vue_vc_config();
    if (callback) callback();
}

function __vue_call(ref_name, fn_name, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    var rs = [];
    document.querySelectorAll('.vc-com.' + ref_name).forEach(function (el) {
        var vu = el.__vue__;
        if (vu && typeof vu[fn_name] == 'function') {
            var val = vu[fn_name](p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
            rs.push(val);
        }
    });
    if (rs.length == 0) return null;
    else if (rs.length == 1) return rs[0];
    else return rs;
}

function __vue_set_data(vue_name, data) {
    if (data == null || Object.keys(data).length == 0) return;
    var keys = Object.keys(data);    
    document.querySelectorAll('.vc-com.vc-' + vue_name).forEach(function (el) {
        var vu = el.__vue__;
        //console.log(vu.kit_name, keys, vu);
        if (vu) keys.forEach(function (key) { vu.$data[key] = data[key]; });
    });
}