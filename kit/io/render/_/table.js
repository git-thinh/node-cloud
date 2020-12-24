var self = this,
    cols = self.cols || {},
    rows = self.items || [];
cols = _.orderBy(cols, ['order'], ['asc']);

var root, table, head, body,
    trs = [], ths = [];

cols.forEach(function (c, index) {
    if (c && c.visible) {
        var el, th, th_arr = [], th_css = '';
        if (c.hasOwnProperty('kit_th') && c.kit_th != null) {
            //console.log(index, c);
            if (!c.kit_th.hasOwnProperty('props')) c.kit_th.props = {};
            c.kit_td.props['vp-index'] = index;
            c.kit_th.props['vp-value'] = c;

            el = self._createElement(createElement, c.kit_th.name, c.kit_th, []);
            th_css = '--c ' + c.name + ' ' + c.kit_th.name;
            th_arr = [el];
        } else {
            th_css = '--c ' + c.name;
            th_arr = [c.title];
        }
        th = createElement('th', { class: th_css }, th_arr);
        ths.push(th);
    }
});

var max = Math.min(5, rows.length), cols_len = cols.length;
for (var i = 0; i < max; i++) {
    var tds = [], r = rows[i], index = i;
    for (var j = 0; j < cols_len; j++) {
        var c = cols[j];
        if (c && c.visible) {
            var el, td, td_arr = [], td_css = '';
            if (c.hasOwnProperty('kit_td') && c.kit_td != null) {
                //console.log('table = ', index);
                if (!c.kit_td.hasOwnProperty('props')) c.kit_td.props = {};
                c.kit_td.props['vp-index'] = index;
                c.kit_td.props['vp-value'] = r;

                if (!c.kit_td.props.hasOwnProperty('vp-mounted'))
                    c.kit_td.props['vp-mounted'] = function (vue_) { vue_.para_ = r; };

                el = self._createElement(createElement, c.kit_td.name, c.kit_td, [], index);
                td_css = '--c ' + c.name + ' ' + c.kit_td.name;
                td_arr = [el];
            } else {
                td_css = '--c ' + c.name;
                td_arr = [r[c.name]];
            }
            td = createElement('td', { class: td_css }, td_arr);
            tds.push(td);
        }
    }
    trs.push(createElement('tr', { class: '--r ' }, tds));
}

head = createElement('thead', {}, [createElement('tr', {}, ths)]);
body = createElement('tbody', {}, trs);
table = createElement('table', {}, [head, body]);
root = createElement('div', {}, [table]);
return root;