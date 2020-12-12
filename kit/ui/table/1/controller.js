{
    data: function() {
        return {
            class: '',
            pager: {},
            header: {},
            items: [],
            rows: []
        };
    },
    render: function (createElement) {
        var _self = this,
            _data = _self.$data,
            len = _data.items.length || 0,
            page_size = _data.pager.page_size || 10,
            page_number = _data.pager.page_current || 1,
            min = 0, max = 0,
            arrTr = [], cols = [], arrTd = [],
            total = 0, it, table, thead, tbody, root, pager;

        total = Number((len / page_size).toString().split('.')[0]);
        if (len % page_size != 0) total = total + 1;        
        min = (page_number - 1) * page_size;
        max = page_number * page_size;
        if (max >= _data.items.length) max = _data.items.length;

        if (page_number == total) _data.pager.next_disable = true;
        else _data.pager.next_disable = false;

        if (page_number == 1) _data.pager.prev_disable = true;
        else _data.pager.prev_disable = false;

        _data.pager.total = total;
        if (_data.header) cols = Object.keys(_data.header);
        for (var i = min; i < max; i++) {
            arrTd = [];
            it = _data.items[i];
            if (cols.length == 0) cols = Object.keys(it);

            cols.forEach(function (col, index) {
                var td = createElement('td', { attrs: { class: 'td_' + col } }, [it[col]]);
                arrTd.push(td);
            });
            var tr = createElement('tr', { attrs: {} }, arrTd);
            arrTr.push(tr);
        }
        tbody = createElement('tbody', {}, [arrTr]);

        if (_data.header && cols.length > 0) {
            var arrTh = [];
            cols.forEach(function (col) {
                var th = createElement('th', { attrs: { class: 'th_' + col } }, [_data.header[col]]);
                arrTh.push(th);
            });
            var thead_tr = createElement('tr', {}, [arrTh]);
            thead = createElement('thead', {}, [thead_tr]);
            table = createElement('table', { attrs: { class: _data.class } }, [thead, tbody]);
        } else {
            table = createElement('table', { attrs: { class: _data.class } }, [tbody]);
        }

        if (_data.pager && _data.pager.visible) {

            var first_style = _data.pager.style_button || {};
            first_style = JSON.parse(JSON.stringify(first_style));
            if (_data.pager.prev_disable) first_style['opacity'] = '0.2';
            else first_style['opacity'] = 1;
            var b_first = _self._createElementSvg(createElement, { on: { click: _self._pagerFirstClick }, style: first_style }, ['M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z']);

            var prev_style = _data.pager.style_button || {};
            prev_style = JSON.parse(JSON.stringify(prev_style));
            if (_data.pager.prev_disable) prev_style['opacity'] = '0.2';
            else prev_style['opacity'] = 1;
            var b_prev = _self._createElementSvg(createElement, { on: { click: _self._pagerPrevClick }, style: prev_style }, ['M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z']);

            var next_style = _data.pager.style_button || {};
            next_style = JSON.parse(JSON.stringify(next_style));
            if (_data.pager.next_disable) next_style['opacity'] = '0.2';
            else next_style['opacity'] = 1;
            var b_next = _self._createElementSvg(createElement, { on: { click: _self._pagerNextClick }, style: next_style }, ['M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z']);

            var last_style = _data.pager.style_button || {};
            last_style = JSON.parse(JSON.stringify(last_style));
            if (_data.pager.next_disable) last_style['opacity'] = '0.2';
            else last_style['opacity'] = 1;
            var b_last = _self._createElementSvg(createElement, { on: { click: _self._pagerLastClick }, style: last_style }, ['M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z']);

            var lblPageNumber = createElement('lable', { style: { 'margin-left': '5px', color: '#333' } }, [_data.pager.page_current]);
            var lblSP = createElement('lable', { style: { 'margin-left': '5px', color: '#ccc', 'font-size': '9px', 'margin-top': '5px' } }, ['|']);
            var lblTotal = createElement('lable', { style: { 'margin-left': '5px', color: '#333' } }, [_data.pager.total]);

            var lblInfo = createElement('lable', { style: _data.pager.style_info }, [_data.items.length + ' items']);

            pager = createElement('div', { attrs: { class: _data.pager.class } }, [lblInfo, b_first, b_prev, lblPageNumber, lblSP, lblTotal, b_next, b_last]);
            root = createElement('div', { attrs: { class: '' } }, [table, pager]);
        } else root = createElement('div', { attrs: { class: '' } }, [table]);
        return root;
    },
    methods: {
        _pagerFirstClick: function() {
            var _self = this;
            //console.log('FIRST: ', 1);
            if (_self.pager.page_current <= 1) return;
            _self.pager.page_current = 1;
        },
        _pagerPrevClick: function() {
            var _self = this,
                total = _self.pager.total || 1,
                page_number = _self.pager.page_current || 1;
            page_number--;
            //console.log('PREV: ', page_number);
            if (page_number == 0 || page_number > total) return;
            _self.pager.page_current = page_number;
        },
        _pagerNextClick: function() {
            var _self = this,
                total = _self.pager.total || 1,
                page_number = _self.pager.page_current || 1;
            page_number++;
            //console.log('NEXT: ', page_number);
            if (page_number == 0 || page_number > total) return;
            _self.pager.page_current = page_number;
        },
        _pagerLastClick: function() {
            var _self = this, total = _self.pager.total || 1;
            //console.log('LAST: ', total);
            if (total == 0) return;
            _self.pager.page_current = total;
        }
    }
}