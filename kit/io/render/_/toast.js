var self = this;

var root, data = self.$data;

var btn_close;
//////if (data.close_show)
//////    btn_close = createElement('ui-icon', {
//////        class: '__toa_close',
//////        props: {
//////            'vp-data': {
//////                paths: ['M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'],
//////                setting_: {
//////                    on: {
//////                        click: self._close
//////                    }
//////                }
//////            }
//////        },
//////        directives: [{ name: 'show', value: data.close_show }]
//////    });

var p = createElement('p', { class: '__toa_text' }, [data.text]);
root = createElement('div', {
    class: 'vc-com ' + self.kit_name + ' ' + (data.type.length == 0 ? '' : 'bg-' + data.type),
    directives: [{ name: 'show', value: data.visible }]
}, [p, btn_close]);
return root;