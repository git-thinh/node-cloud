{
    mounted: function () {
        var self = this;

        setTimeout(function (sf) {
            if (sf.img_loading == null || sf.img_loading == -1) { } else {
                sf._classAdd(self.$el, '__img-gif');
            }

            if (sf.text && sf.text.length == 0) sf._classAdd(sf.$el, '--no-text');

            var m = document.getElementById(sf.kit_id + '--modal');
            if (m == null) {
                m = document.createElement('div');
                m.id = sf.kit_id + '--modal';
                m.setAttribute('class', 'vc-loading--modal');
                document.body.appendChild(m);
            }
            //m.style.display = sf.lock_screen ? 'block' : 'none';

            var r = sf.$el.getBoundingClientRect(),
                b = document.getElementById(sf.kit_id + '--indicator'),
                bar_width = 0;
            if (b) bar_width = b.getBoundingClientRect().width;
            //console.log(r.width, bar_width);
            sf.bar_width = bar_width;
            sf.width = Math.round(r.width);
            sf.height = Math.round(r.height);
            sf.max_left = Math.round(r.width - bar_width);

            if (self.timer_disable == false) {
                setInterval(function (sf_) {
                    if (sf_.visible) {
                        var v = sf_.left + sf_.value;
                        if (v == sf_.max_left) sf_.value = -1;
                        else if (v == 0) sf_.value = 1;
                        sf_.left = v;
                    }
                }, sf.speed, sf);
            }
        }, 150, self);
    },
    watch: {
        //lock_screen: function (val) {
        //    var m = document.getElementById(this.kit_id + '--modal');
        //    if (m) m.style.display = this.lock_screen ? 'block' : 'none';
        //}
    },
    methods: {
        _show: function (visible, lock_screen) {
            if (visible != false) visible = true;
            if (lock_screen != true) lock_screen = false;

            this.visible = visible;
            this.lock_screen = lock_screen;

            var m = document.getElementById(this.kit_id + '--modal');
            if (m) m.style.display = visible && lock_screen ? 'block' : 'none';

            this.$el.style.opacity = visible ? 1 : 0;
        },
        _lock_screen: function (visible) {
            this.lock_screen = visible;
        }
    }
}