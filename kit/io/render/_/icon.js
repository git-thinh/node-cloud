var self = this;

var root,
    data = self.$data,
    setting = data.setting_ || {},
    arrPath = [];

switch (self.vpType) {
    case 'toggle':
        if (data.active == true || self.vpActive)
            arrPath = [
                createElement('path', { attrs: { d: 'M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z' } }),
                createElement('path', { attrs: { d: 'M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z' } })
            ];
        else
            arrPath = [
                createElement('path', { attrs: { d: 'M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z' } }),
                createElement('path', { 'fill-rule': 'evenodd', attrs: { d: 'M5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z' } })
            ];
        break;
    case 'close':
        arrPath = [createElement('path', {
            attrs: {
                'fill-rule': 'evenodd',
                d: 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
            }
        })];
        break;
    case 'add':
        arrPath = [createElement('path', {
            attrs: {
                'fill-rule': 'evenodd',
                d: 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'
            }
        })];
        break;
    case 'edit':
        arrPath = [createElement('path', {
            attrs: {
                'fill-rule': 'evenodd',
                d: 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'
            }
        })];
        break;
    case 'remove':
        arrPath = [
            createElement('path', { attrs: { d: 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' } }),
            createElement('path', { attrs: { 'fill-rule': 'evenodd', d: 'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z' } })
        ];
        break;
    default:
        if (data.paths && data.paths.length > 0) {
            for (var i = 0; i < data.paths.length; i++) {
                var p = createElement('path', {
                    attrs: {
                        'fill-rule': data.fill_rule,
                        d: data.paths[i]
                    }
                });
                arrPath.push(p);
            }
        }
        break;
}

setting.attrs.viewBox = '0 0 16 16';
setting.attrs.fill = 'currentColor';
setting.attrs.xmlns = 'http://www.w3.org/2000/svg';
if (data.active == true || self.vpActive) setting.class = '--active';
root = self._createElement(createElement, 'svg', setting, arrPath);
return root;