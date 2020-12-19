var __V_THEME = 'logo-service', __V_DO_ACTION = 'v-do-action';
if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
if (window.Node && !Node.prototype.getAttributeNames) {
    Node.prototype.getAttributeNames = function () {
        var el = this, a = [], attr = el.attributes;
        Object.keys(attr).forEach(function (key) { a.push(attr[key].name); });
        return a;
    };
}
var __APP, __APP_ID, __APP_INLINE = [], __VC_MIXIN = {}, __VA_MIXIN = {},
    __V_DEF_DATA = { setting_: { class: '', attrs: {}, style: {}, props: {}, on: {}, nativeOn: {}, directives: [] } };

function __vue_toast(text, option) { if (__KIT_TOAST) __KIT_TOAST._show(text, option); }
function __vue_loading(visible, lock_screen) { if (__KIT_LOADING) __KIT_LOADING._show(visible, lock_screen); }

__VC_MIXIN = {
    props: ['vpRef', 'vpData', 'vpTheme', 'vpType', 'vpMaxSize'],
    created: function () { this._init(); },
    methods: {
        _init: function () {
            var _self = this;

            var kit_name = _self.$vnode.tag;
            if (kit_name && kit_name.length > 14) {
                kit_name = kit_name.substr(14);
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

Vue.component('loading', {
    mixins: [__VC_MIXIN],
    data: function () {
        return this._initData({
            visible: false,
            lock_screen: false,
            speed: 1,
            left: 0,
            max_left: 0,
            bar_width: 0,
            value: 1,
            width: 0,
            height: 0
        });
    },
    render: function (createElement) {
        var bar = createElement('p', {
            attrs: { id: this.kit_id + '--bar' },
            style: { 'margin-left': this.left + 'px' },
            class: '--bar'
        });
        return createElement('div', {
            style: {
                opacity: this.visible ? 1 : 0
            }
        }, [bar]);
    },
    mounted: function () {
        var self = this;
        setTimeout(function (sf) {
            var m = document.getElementById(sf.kit_id + '--modal');
            if (m == null) {
                m = document.createElement('div');
                m.id = sf.kit_id + '--modal';
                m.setAttribute('class', 'vc-loading--modal');
                document.body.appendChild(m);
            }
            m.style.display = sf.lock_screen ? 'block' : 'none';

            var r = sf.$el.getBoundingClientRect(),
                b = document.getElementById(sf.kit_id + '--bar'),
                bar_width = 0;
            if (b) bar_width = b.getBoundingClientRect().width;
            console.log(r.width, bar_width);
            sf.bar_width = bar_width;
            sf.width = Math.round(r.width);
            sf.height = Math.round(r.height);
            sf.max_left = Math.round(r.width - bar_width);

            setInterval(function (sf_) {
                if (sf_.visible) {
                    var v = sf_.left + sf_.value;
                    if (v == sf_.max_left) sf_.value = -1;
                    else if (v == 0) sf_.value = 1;
                    sf_.left = v;
                }
            }, sf.speed, sf);
        }, 150, self);
    },
    watch: {
        lock_screen: function (val) {
            var m = document.getElementById(this.kit_id + '--modal');
            if (m) m.style.display = this.lock_screen ? 'block' : 'none';
        }
    },
    methods: {
        _show: function (visible, lock_screen) {
            this.visible = visible == false ? false : true;
            this.lock_screen = lock_screen == true ? true : false;
        },
        _lock_screen: function (visible) {
            this.lock_screen = visible;
        }
    }
});

Vue.component('icon', {
    mixins: [__VC_MIXIN],
    data: function () {
        return this._initData({
            fill_rule: 'evenodd',
            paths: []
        });
    },
    render: function (createElement) {
        var self = this, root,
            data = self.$data,
            setting = data.setting_ || {},
            arrPath = [];

        if (data.paths && data.paths.length > 0) {
            for (var i = 0; i < data.paths.length; i++) {
                var p = createElement('path', {
                    attrs: {
                        'fill-rule': data.fill_rule,
                        d: data.paths[i]
                    }
                });
                arrPath.push(p);
            }
        }

        setting.attrs.viewBox = '0 0 16 16';
        setting.attrs.fill = 'currentColor';
        setting.attrs.xmlns = 'http://www.w3.org/2000/svg';

        root = self._createElement(createElement, 'svg', setting, arrPath);
        return root;
    }
});

Vue.component('toast', {
    mixins: [__VC_MIXIN],
    data: function () {
        return this._initData({
            visible: false,
            text: '',
            type: '',
            timer: null,
            always_show: false,
            close_show: false,
            timeout_close: 2000
        });
    },
    render: function (createElement) {
        var self = this, root,
            data = self.$data;
        var btn_close = createElement('icon', {
            class: '--close',
            props: {
                'vp-data': {
                    paths: ['M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'],
                    setting_: {
                        on: {
                            click: self._close
                        }
                    }
                }
            },
            directives: [{ name: 'show', value: data.close_show }]
        });
        var p = createElement('p', { class: '--text' }, [data.text]);
        root = createElement('div', {
            class: 'vc-com ' + self.kit_name + ' ' + (data.type.length == 0 ? '' : 'bg-' + data.type),
            directives: [{ name: 'show', value: data.visible }]
        }, [p, btn_close]);
        return root;
    },
    methods: {
        _show: function (text, option) {
            var self = this;
            if (option == 'success'
                || option == 'info'
                || option == 'warning'
                || option == 'danger')
                self.type = option;
            else self.type = '';
            self.text = text;
        },
        _close: function () {
            console.log('toast._close ...');
            this.visible = false;
        }
    },
    watch: {
        text: function (s) {
            var self = this;
            self.visible = s && s.length > 0;

            if (self.always_show == false) {
                if (self.timer != null) {
                    clearTimeout(self.timer);
                    self.timer = null;
                }

                self.timer = setTimeout(function () {
                    self.visible = false;
                }, self.timeout_close);
            }
        }
    }
});

Vue.component('upload', {
    mixins: [__VC_MIXIN],
    data: function () {
        var self = this, maxSize = 10 * 1024 * 1024, maxSizeMB = '10M';

        if (self.vpMaxSize && self.vpMaxSize.length > 0) {
            var ms = self.vpMaxSize.substr(0, self.vpMaxSize.length - 1);
            ms = Number(ms);
            if (!isNaN(ms)) {
                maxSize = ms * 1024 * 1024;
                maxSizeMB = self.vpMaxSize;
            }
        }

        var data = this._initData({
            placeholder: 'Select a file to upload',
            multiple: true,
            vc_size: {
                width: 0,
                height: 0
            },
            progress: {
                visible: false,
                color: 'orangered',
                speed: 5,
                width: 36,
                height: 3,
                max_left: 0,
                left: 0
            },
            file_data: null,
            file: {
                max_size_mb: maxSizeMB,
                max_size: maxSize,
                title_left: '33%',
                title_opacity: 0,
                visible: false,
                is_image: false,
                height: '9',
                name: '',
                type: '',
                url: ''
            }
        });
        //console.log('kit-upload.data() =', data);
        return data;
    },
    render: function (createElement) {
        var self = this, root,
            file = self.$data.file,
            progress = self.$data.progress,
            setting = self.$data.setting_;

        var placeholder = createElement('label', {
            attrs: {
                id: self.kit_id + '--placeholder'
            },
            style: {
                'display': 'block',
                'color': '#9e9e9e',
                'width': '100%',
                'font-size': '1rem',
                'font-family': 'Arial',
                'text-align': 'center',
                'margin-top': '36px'
            },
            class: '--placeholder',
            directives: [{ name: 'show', value: !file.visible }]
        }, [self.placeholder]);
        var progress = createElement('div', {
            style: {
                'background-color': progress.color,
                'margin-left': progress.left + 'px',
                width: progress.width + 'px',
                height: progress.height + 'px'
            },
            class: '--progress-bar',
            directives: [{ name: 'show', value: progress.visible }]
        });
        var top = createElement('div', {
            style: {
                width: '100%',
                height: '7px'
            },
            class: '--progress'
        }, [progress]);

        var title = createElement('label', {
            attrs: {
                id: self.kit_id + '--title'
            },
            style: {
                'border': '1px solid #ccc',
                'max-width': '30%',
                'background-color': '#f4f4f4',
                'border-radius': '5px',
                'white-space': 'nowrap',
                'position': 'absolute',
                'left': file.title_left,
                'top': '40%',
                'font-size': '0.9rem',
                'font-family': 'Arial',
                'padding': '0 7px',
                'overflow': 'hidden',
                'display': 'block',
                'opacity': file.title_opacity
            },
            class: '--title'
        }, [file.name]);

        var img = createElement('img', {
            attrs: {
                src: file.url
            },
            style: {
                'padding': '3px',
                'min-width': '40%',
                'max-width': '60%',
                'background-color': 'black',
                'border-radius': '9px',
                'min-height': file.height + 'px',
                height: file.height + 'px'
            },
            class: '--image',
            directives: [{ name: 'show', value: file.visible }]
        });

        if (setting.style.position == null) setting.style.position = 'relative';
        if (setting.style.cursor == null) setting.style.cursor = 'pointer';
        if (setting.style.border == null) setting.style.border = '2px dashed #eee';
        if (setting.style['text-align'] == null) setting.style['text-align'] = 'center';

        setting.on = {
            dragover: self._kit_dragover,
            drop: self._kit_drop,
            click: self._kit_click,
            mouseover: self._kit_mouseOver,
            mouseout: self._kit_mouseOut
        };
        root = self._createElement(createElement, 'div', setting, [placeholder, top, title, img]);

        return root;
    },
    mounted: function () {
        var self = this;

        setTimeout(function (sf) {
            var rec = sf.$el.getBoundingClientRect();
            sf.vc_size = rec;
            sf.progress.max_left = Math.round(rec.width - sf.progress.width);
            //console.log(rec);
        }, 300, self);

        Vue.nextTick(function () {
            setInterval(function (sf) {
                if (sf.progress.visible) {
                    var v = sf.progress.left + 1;
                    if (v == sf.progress.max_left) v = 0;
                    //console.log(v, sf.progress.max_left);
                    sf.progress.left = v;
                }
            }, self.progress.speed, self);
        });
    },
    methods: {
        _clear: function () {
            var self = this;
            self.progress.visible = false;
            self.file.url = '';
            self.file.visible = false;
            self.file.is_image = false;
            self.file.title_opacity = 0;
        },
        _setResultCallback: function (ok) {
            if (ok == false)
                this._toast('The uploading file ' + this.file.name + ' is fail');
            else
                this._toast('The uploading file ' + this.file.name + ' is successfully');
            this._clear();
        },
        _progress: function (visible) {
            this.progress.visible = visible == true ? true : false;
        },
        _vc_inline_ready: function () {
            this.$el.style.opacity = 1;
        },
        _kit_fileReadyUpload: function () {
            var self = this;
            Vue.nextTick(function () {
                var tit = document.getElementById(self.kit_id + '--title');
                if (tit) {
                    var rec = tit.getBoundingClientRect(),
                        title_left = ((self.vc_size.width - rec.width) / 2).toString().split('.')[0] + 'px';
                    self.file.title_left = title_left;
                    console.log(title_left);
                }
                self.file.visible = true;
                self.progress.visible = true;
            });
            self._submitCall();
        },
        _kit_choseFiles: function (files) {
            var self = this;
            if (files && files.length > 0) {
                var file = files[0],
                    rec = self.$el.getBoundingClientRect(),
                    height = rec.height - 18;
                self.file.visible = false;

                //console.log('_kit_uploadFiles: file = ', file);
                if (file.size > self.file.max_size) {
                    __vue_toast('The size uploading file must be < ' + self.file.max_size_mb);
                    return;
                }

                self.file_data = file;

                self.file.base64 = '';
                self.file.name = file.name;
                self.file.type = file.type;
                self.file.height = height;

                var is_image = file.type.match(/image.*/);
                self.file.is_image = is_image;
                self.file.title_opacity = is_image ? 0 : 1;

                if (is_image) {
                    var reader = new FileReader();
                    reader.onload = function (e2) {
                        var src = e2.target.result;
                        //console.log('_kit_uploadFiles = ', src);
                        self.file.url = src;
                        self._kit_fileReadyUpload();
                    };
                    reader.readAsDataURL(file);
                } else {
                    self._kit_fileReadyUpload();
                }
            }
        },
        _kit_fileOnChange: function (e) {
            var self = this, files = e.target.files;
            self._clear();
            self._toast(false);
            if (files && files.length > 0)
                self._kit_choseFiles(files);
        },
        _kit_click: function (e) {
            var self = this, fi,
                input_id = self.kit_id + '--input-file';
            self.input_id = input_id;
            self._toast(false);
            fi = document.getElementById(input_id);
            if (fi == null) {
                fi = document.createElement("input");
                fi.setAttribute('id', input_id);
                if (self.multiple) fi.setAttribute('multiple', '');
                fi.type = 'file';
                fi.style.display = 'none';
                fi.onchange = function (ev) { self._kit_fileOnChange(ev); };
                if (typeof accept != "undefined") {
                    fi.setAttribute('accept', accept);
                }
                document.body.appendChild(fi);
            }

            var eventMouse = document.createEvent("MouseEvents")
            eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            fi.dispatchEvent(eventMouse);
        },
        _kit_mouseOver: function () {
            var self = this;
            if (self.file.is_image) self.file.title_opacity = 1;
        },
        _kit_mouseOut: function () {
            var self = this;
            if (self.file.is_image) self.file.title_opacity = 0;
        },
        _kit_dragover: function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        },
        _kit_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();

            var files = e.dataTransfer.files;
            self._kit_choseFiles(files);
        },
        _setThumbnail: function (link) {
            var self = this;
            self.file.url = link;
            self.file.visible = true;
            self.file.is_image = false;
            self.file.height = Math.round(self.vc_size.height - 20);
            console.log(link);
        },
    }
});

//window.addEventListener('DOMContentLoaded', test);
function __vue_appInit(callback) {
    var el = document.getElementById(__APP_ID);
    if (el) {
        el.innerHTML = '<toast vp-ref="__KIT_TOAST" vp-theme="' + __V_THEME + '"></toast>' +
            '<loading vp-ref="__KIT_LOADING" vp-theme="' + __V_THEME + '"></loading>';

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
        if (key.indexOf('vp-') == 0) ps += ':' + key + '="\'' + el.getAttribute(key) + '\'" ';
    });
    scom = '<' + kit_name + ' :vp-data="data" :vp-type="\'vc-inline\'" :vp-theme="\'' + __V_THEME + '\'" ' + ps + '></' + kit_name + '>';
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
