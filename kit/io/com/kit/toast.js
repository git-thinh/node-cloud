{
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
            this.text = '';
        }
    },
    watch: {
        text: function (s) {
            var self = this;
            self.visible = s != null && s.length > 0;
            if (self.always_show == false) {
                if (self.timer != null) {
                    clearTimeout(self.timer);
                    self.timer = null;
                }
                self.timer = setTimeout(function (sf) { sf._close(); }, self.timeout_close, self);
            }
        }
    }
}