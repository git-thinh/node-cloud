{
    methods: {
        _checkAll_Click: function(event) {
            var val = event._vue.value;
            console.log('_checkAll_Click = ', val.kit_th.code);
        },
        _checkItem_Click: function(event) {
            console.log('_checkItem_Click = ', event._vue.value);
            setTimeout(function (v) {
                if (v) {
                    if (v.index % 2 == 0)
                        v.updating = false;
                    else
                        v._rollbackAction();
                }
            }, 2000, event._vue);
        },
        _checkItem_Mounted: function(vue_) {
        },
        _edit_Click: function(event) {
            console.log('_edit_Click =', event._vue.kit_id);
        },
        _edit_Mounted: function(vue_) {
            console.log('_edit_Mounted =', vue_.kit_id);
        },
        _remove_Click: function(event) {
            console.log('_remove_Click = ', event._vue.value);
            setTimeout(function (v) {
                if (v) {
                    v.updating = false;
                    //v._rollbackAction();
                }
            }, 2000, event._vue);
        },
    }
}