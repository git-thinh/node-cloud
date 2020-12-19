var self = this;

var root,
    file = self.$data.file,
    progress = self.$data.progress,
    setting = self.$data.setting_;

var placeholder = createElement('label', {
    attrs: {
        id: self.kit_id + '--placeholder'
    },
    style: {
        'display': 'block',
        'color': '#9e9e9e',
        'width': '100%',
        'font-size': '1rem',
        'font-family': 'Arial',
        'text-align': 'center',
        'margin-top': '36px'
    },
    class: '--placeholder',
    directives: [{ name: 'show', value: !file.visible }]
}, [self.placeholder]);
var progress = createElement('div', {
    style: {
        'background-color': progress.color,
        'margin-left': progress.left + 'px',
        width: progress.width + 'px',
        height: progress.height + 'px'
    },
    class: '--progress-bar',
    directives: [{ name: 'show', value: progress.visible }]
});
var top = createElement('div', {
    style: {
        width: '100%',
        height: '7px'
    },
    class: '--progress'
}, [progress]);

var title = createElement('label', {
    attrs: {
        id: self.kit_id + '--title'
    },
    style: {
        'border': '1px solid #ccc',
        'max-width': '30%',
        'background-color': '#f4f4f4',
        'border-radius': '5px',
        'white-space': 'nowrap',
        'position': 'absolute',
        'left': file.title_left,
        'top': '40%',
        'font-size': '0.9rem',
        'font-family': 'Arial',
        'padding': '0 7px',
        'overflow': 'hidden',
        'display': 'block',
        'opacity': file.title_opacity
    },
    class: '--title'
}, [file.name]);

var img = createElement('img', {
    attrs: {
        src: file.url
    },
    style: {
        'padding': '3px',
        'min-width': '40%',
        'max-width': '60%',
        'background-color': 'black',
        'border-radius': '9px',
        'min-height': file.height + 'px',
        height: file.height + 'px'
    },
    class: '--image',
    directives: [{ name: 'show', value: file.visible }]
});

if (setting.style.position == null) setting.style.position = 'relative';
if (setting.style.cursor == null) setting.style.cursor = 'pointer';
if (setting.style.border == null) setting.style.border = '2px dashed #eee';
if (setting.style['text-align'] == null) setting.style['text-align'] = 'center';

setting.on = {
    dragover: self._kit_dragover,
    drop: self._kit_drop,
    click: self._kit_click,
    mouseover: self._kit_mouseOver,
    mouseout: self._kit_mouseOut
};
root = self._createElement(createElement, 'div', setting, [placeholder, top, title, img]);

return root;