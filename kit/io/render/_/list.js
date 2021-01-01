var self = this,
    col = self.col,
    max_size = self.max_size,
    select_ids = self.select_ids,
    value = self.value,
    col_id = col.value,
    col_text = col.text,
    header = self.header || {},
    items = self.items || [],
    setting = self.setting_ || {};
var root, ul, li_arr = [];

//console.log('icon ',self.vpIcon, self.icon_enable);
//console.log('check ',self.vpCheck, self.check_enable);

var select_id;

if (items.length > 0) {
    var limit = items.length;
    if (max_size > 0 && max_size < items.length) limit = max_size;

    if (value != null && value[col_id] != null) select_id = value[col_id];

    for (var i = 0; i < limit; i++) {
        var li, it = items[i], text = it[col_text],
            span = createElement('span', { class: '__li-text __no-select', }, [text]),
            //is_active = it[col_id] == select_id,
            is_active = self._item_checkStateActived(it),
            li_id = 'li-' + self.kit_id + '-' + i,
            a = [], icon_name = '';

        var ico = createElement('i', { class: '__li-icon' });
        if (self.icon_enable) {
            icon_name = self.icon_render(it);
            if (icon_name.length > 0)
                ico = createElement('ui-icon', { class: '__li-icon', props: { 'vp-icon': icon_name } });
        }

        var chk = createElement('i', { class: '__li-check' });
        if (self.check_enable)
            chk = createElement('ui-icon', {
                class: '__li-check', props: {
                    'vp-ref': li_id + '--chk-' + i,
                    'vp-icon': 'check',
                    'vp-active': is_active
                }
            });

        a = [ico, span, chk];

        var li_class = '';
        if (is_active) li_class = '__li-active';

        li = createElement('li', {
            class: li_class,
            attrs: {
                for: self.check_enable,
                tabindex: i,
                id: li_id
            },
            on: {
                click: function (evli_) {
                    //console.log(evli_);

                    var elli = evli_.target;
                    if (elli.nodeName != 'LI') elli = elli.parentElement;
                    if (elli.nodeName != 'LI') elli = elli.parentElement;
                    if (elli && elli.nodeName == 'LI') {
                        var tab_index = elli.getAttribute('tabindex'),
                            check_enable = elli.getAttribute('for'),
                            ref_chk = elli.id + '--chk-' + tab_index;
                        var chk_ = __VC_REF[ref_chk];
                        //console.log(check_enable, chk_ != null);
                        if (chk_ && check_enable == 'true') {
                            if (chk_.$root) {
                                chk_._toggleActiveClick(null);
                                //console.log(chk_.active);
                                if (chk_.active) self._classAdd(elli, '__li-active');
                                else self._classRemove(elli, '__li-active');
                                self._item_changeStateActived(tab_index);
                            }
                        }
                    }
                    else {
                        console.log(evli_);
                    }
                }
            }
        }, a);
        li_arr.push(li);
    }
}

var el_header = createElement('div', { class: '__ls_header' });
if (header.visible) {
    var hs = [];
    var h_title = createElement('span', { class: '__ls_header_title __noselect' }, [header.title]);
    hs.push(h_title);

    if (header.icon_close && header.icon_close.length > 0) {
        var h_close = createElement('ui-icon', { class: '__ls_header_close', props: { 'vp-icon': header.icon_close } });
        hs.push(h_close);
    }

    el_header = createElement('div', { class: '__ls_header' }, hs);
}

ul = createElement('ul', {}, li_arr);
root = self._createElement(createElement, 'div', setting, [el_header, ul]);
return root;
