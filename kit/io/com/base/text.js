{
    mounted: function() {
        var self = this;
        Vue.nextTick(function () {
            if (self.readonly != true) self._classAdd(self.$el, '__txt_input');
            if (self.icon_name != true && self.icon_name.length > 0) self._classAdd(self.$el, '__txt_icon');
        });
    }
}