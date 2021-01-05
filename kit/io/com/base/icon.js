{
    mounted: function() {
        var self = this;
        Vue.nextTick(function () {
            if (self.active) self._classAdd(self.$el, '__active');
            else self._classRemove(self.$el, '__active');
            self._classAdd(self.$el, 'ui-icon-' + self.icon_name);
        });
    },
    methods: {
        _rollbackAction: function() {
            var self = this;
            if (self.img_loading > 0) {
                self.updating = false;
                if (self.active) self.active = false;
                else self.active = true;
            }
        },
        _toggleActiveClick: function(ev) {
            var self = this;
            //console.log('_toggleActiveClick = ', self.name, self.active);
            if (self.active) self.active = false;
            else self.active = true;
            if (self.vpClick) self.vpClick(ev);
        }
    },
    watch: {
        active: function (val) {
            var self = this;
            //console.log('watch.active = ', val);
            if (val) {
                self._classAdd(self.$el, '__active');
            } else {
                self._classRemove(self.$el, '__active');
            }
        },
        updating: function (val) {
            var self = this;
            //console.log('watch.updating = ', val);
            if (val) {
                self._classAdd(self.$el, '__updating');
            } else {
                self._classRemove(self.$el, '__updating');
            }
        }
    }
}