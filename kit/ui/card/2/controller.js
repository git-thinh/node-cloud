{
    data: function() {
        return {
            progress: {},
            users: []
        };
    },
    mounted: function() {
        var _self = this;
        setTimeout(function () {
            _self.users.push({
                "src": "demo/avatar/3.jpg",
                "size": ""
            });
        }, 3000);
    },
    watch: {
        progress: function() {
            var _self = this, v = _self.$refs.vc_progress;
            if (v) {
                v._setData(_self.progress);
            }
        },
        users: function() {
            var _self = this, v = _self.$refs.vc_avatars;
            if (v) {
                v._setData({ items: _self.users });
            }
        }
    },
    methods: {
        getItem: function() {
            var url = this._localPathDir + 'demo.json';
            var arr = this._getJsonUrl(url);
            return arr[0].items;
        }
    }
}