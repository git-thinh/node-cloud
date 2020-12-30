{
    mounted: function() {
        var self = this;
        Vue.nextTick(function () {
            console.log(self.icon_enable);
            if (self.icon_enable) self._classAdd(self.$el, '__li_icon');
            if (self.check_enable) self._classAdd(self.$el, '__li_check');
        });
    }
}