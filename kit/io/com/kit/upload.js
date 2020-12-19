{
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
}
