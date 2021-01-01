var self = this;

var root,
    data = self.$data,
    text = data.text,
    placeholder = data.placeholder,
    setting = data.setting_ || {},
    input, els = [];

input = createElement('input', {});

els.push(input);

root = self._createElement(createElement, 'div', setting, els);
return root;