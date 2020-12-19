var self = this,
    cols = self.column || {},
    rows = self.rows || [];

var root, table, head, body,
    trs = [], ths = [],
    cols_visible = [];

Object.keys(cols).forEach(function (col_id) {
    var c = cols[col_id];
    if (c.visible) {
        cols_visible.push(col_id);
        var th = createElement('th', { class: '--h ' + col_id }, [c.title]);
        ths.push(th);
    }
});

var max = Math.min(5, rows.length);
for (var i = 0; i < max; i++) {
    var tds = [], r = rows[i];
    cols_visible.forEach(function (col_id) {
        var td = createElement('td', { class: '--c ' + col_id }, [r[col_id]]);
        tds.push(td);
    });
    trs.push(createElement('tr', { class: '--r ' }, tds));
}

head = createElement('thead', {}, [createElement('tr', {}, ths)]);
body = createElement('tbody', {}, trs);
table = createElement('table', {}, [head, body]);
root = createElement('div', {}, [table]);
return root;