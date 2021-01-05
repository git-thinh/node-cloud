{
    mounted: function() {
        var self = this;
        Vue.nextTick(function () {
            var self_el = self.$el,
                has_error = self.error != null && self.error.length > 0,
                has_title = self.title != null && self.title.length > 0,
                has_icon = self.icon_name != null && self.icon_name.length > 0;

            if (has_icon) self._classAdd(self_el, '__txt_icon');
            if (has_error) self._classAdd(self_el, '__error');
            if (has_title) self._classAdd(self_el, '__txt_title');
            if (self.readonly != true) {
                self._classAdd(self_el, '__txt_input');
                if (has_icon) {
                    var input = document.getElementById(self.kit_id + '-input');
                    if (input) {
                        var wi = self.$el.getBoundingClientRect().width - 35;
                        input.style.width = wi + 'px';
                    }
                }
            }
        });
    }
}