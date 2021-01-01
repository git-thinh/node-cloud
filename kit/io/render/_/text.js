var self = this;

var root,
    data = self.$data,
    text = data.text,
    value = data.value,
    icon_align = data.icon_align,
    icon_name = data.icon_name || '',
    readonly = data.readonly,
    placeholder = data.placeholder || '',
    setting = data.setting_ || {},
    input, els = [];

input = createElement('input', {
    class: '__in-input',
    attrs: {
        placeholder: placeholder,
        value: text
    },
    //directives: [{ name: 'v-model', value: self.text }]
});
if (readonly) input = createElement('span', { class: '__in-label __no-select' }, [text]);

var ico = createElement('i', { class: '__hide' });
if (icon_name.length > 0) {
    var p_ico = { 'vp-icon': icon_name };
    if (readonly) p_ico['vp-disable'] = true;
    ico = createElement('ui-icon', { class: '__in-icon', props: p_ico });
}

if (icon_align == 'right') els = [input, ico];
else els = [ico, input];

root = self._createElement(createElement, 'div', setting, els);
return root;