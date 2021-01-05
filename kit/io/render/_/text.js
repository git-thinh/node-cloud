var self = this;

var root, input,
    data = self.$data,
    value = data.value || '',
    error = data.error || '',
    title = data.title || '',
    icon_align = data.icon_align,
    icon_name = data.icon_name || '',
    readonly = data.readonly || false,
    placeholder = data.placeholder || '',
    setting = data.setting_ || {};

if (readonly) input = createElement('span', { class: '__in-label __no-select' }, [value]);
else input = createElement('input', {
    class: '__in-input',
    attrs: {
        id: self.kit_id + '-input',
        placeholder: placeholder,
        value: value
    },
    //directives: [{ name: 'v-model', value: self.value }]
});

var ico;
if (icon_name.length > 0) {
    var p_ico = { 'vp-icon': icon_name };
    if (readonly) p_ico['vp-disable'] = true;
    ico = createElement('ui-icon', { class: '__in-icon', props: p_ico });
}

var caption;
if (title.length > 0) caption = createElement('p', { class: '__in-title' }, [title]);

var el_error;
if (error.length > 0) el_error = createElement('p', { class: '__in-error' }, [error]);

var el_input;
if (icon_align == 'right') el_input = createElement('div', { class: '__in-field' }, [input, ico]);
else el_input = createElement('div', { class: '__in-field' }, [ico, input]);

root = self._createElement(createElement, 'div', setting, [caption, el_input, el_error]);
return root;

