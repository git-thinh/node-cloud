var self = this;

var text = createElement('span', {
    attrs: { id: this.kit_id + '--text' },
    class: '--text',
    directives: [{ name: 'show', value: self.text && self.text.length > 0 }]
}, [self.text]);

var bar = createElement('p', {
    attrs: { id: self.kit_id + '--bar' },
    style: { 'margin-left': self.left + 'px' },
    class: '--bar'
});

return createElement('div', {
    style: {
        opacity: self.visible ? 1 : 0
    }
}, [text, bar]);