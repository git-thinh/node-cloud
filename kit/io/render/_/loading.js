var self = this;
var text, indicator;

text = createElement('span', {
    attrs: { id: this.kit_id + '--text' },
    class: '__loa_text',
    directives: [{ name: 'show', value: self.text && self.text.length > 0 }]
}, [self.text]);

if (self.img_loading == null || self.img_loading == -1) {
    indicator = createElement('p', {
        attrs: { id: self.kit_id + '--indicator' },
        style: { 'margin-left': self.left + 'px' },
        class: '__loa_indicator'
    });
    return createElement('div', { style: { opacity: self.visible ? 1 : 0 } }, [text, indicator]);
} else {
    indicator = createElement('p', {
        attrs: { id: self.kit_id + '--indicator' },
        class: '__loa_indicator'
    }, [createElement('img', { attrs: { src: '/_static/img-loading/' + self.img_loading + '.gif' } })]);
    return createElement('div', { style: { opacity: self.visible ? 1 : 0 } }, [text, indicator]);
}
