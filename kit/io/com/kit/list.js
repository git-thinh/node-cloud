{
    mounted: function() {
        var self = this;
        Vue.nextTick(function () {
            //console.log(self.icon_enable);
            if (self.icon_enable) self._classAdd(self.$el, '__li_icon');
            if (self.check_enable) self._classAdd(self.$el, '__li_check');
            if (self.header != null && self.header.visible) self._classAdd(self.$el, '__vc_header');
            if (self.header != null && self.header.search_show) self._classAdd(self.$el, '__vc_search');
        });
    },
    methods: {
        _item_changeStateActived: function(index) {
            var self = this, id_index = -1,
                col = self.col,
                col_id = col.value,
                items = self.items || [],
                select_ids = self.select_ids || [];
            if (self.select_ids == null) self.select_ids = [];

            if (index < items.length) {
                var it = items[index];
                if (it && it[col_id]) {
                    var id = it[col_id];
                    if (select_ids.length == 0) self.select_ids.push(id);
                    else {
                        id_index = _.findIndex(select_ids, function (o) { return o == id; });
                        if (id_index == -1) self.select_ids.push(id);
                        else {
                            select_ids.splice(id_index, 1);
                            self.select_ids = select_ids; 
                        }
                    }
                    //console.log(id_index, id, self.select_ids);
                }
            }
        },
        _item_checkStateActived: function(it) {
            var self = this,
                col = self.col,
                col_id = col.value,
                value = self.value,
                select_ids = self.select_ids || [];

            if (it && it[col_id]) {
                var id = it[col_id];
                if (value && value[col_id] == id) {
                    var exist = _.findIndex(select_ids, function (o) { return o == id; }) != -1;
                    if (!exist) self.select_ids.push(id);
                    //console.log('_item_checkStateActived = ', self.select_ids);
                    return true;
                }
            }

            return false;
        }
    }
}