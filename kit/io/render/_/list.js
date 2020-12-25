var self = this,
    col = self.col,
    max_size = self.max_size,
    value = self.value,
    col_id = col.value,
    col_text = col.text,
    items = self.items || [],
    setting = self.setting_ || {};
var root, ul, li_arr = [];

//console.log(self.vpMax, max_size);

if (items.length > 0) {
    var limit = items.length;
    if (max_size > 0 && max_size < items.length) limit = max_size;
    for (var i = 0; i < limit; i++) {
        var li, it = items[i];
        if (col_active && it && it[col_active] == true)
            li = createElement('li', { class: '--active' }, [it[col_text]]);
        else
            li = createElement('li', {}, [it[col_text]]);

        li_arr.push(li);
    }
}

ul = createElement('ul', {}, li_arr);
root = self._createElement(createElement, 'div', setting, [ul]);
return root;
