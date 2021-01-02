var __V_THEME = 'logo-service', __V_DO_ACTION = 'v-do-action', __SVG = {},
    __VC_PROPS = ['vpRef', 'vpData', 'vpTheme', 'vpHeader', 'vpFooter', 'vpType',
        'vpClass', 'vpMax', 'vpReadonly', 'vpDisable', 'vpIconalign',
        'vpMaxSize', 'vpActive', 'vpIcon', 'vpTitle', 'vpValid', 'vpText', 'vpError',
        'vpCheck', 'vpIndex', 'vpItems', 'vpValue', 'vpImgLoading',
        'vpClick', 'vpMounted'],
    __APP, __APP_ID, __APP_INLINE = [], __VC_MIXIN = {}, __VA_MIXIN = {}, __VC_REF = {},
    ___VC_DATA = {}, ___VC_DATA_FN = {},
    __V_DEF_DATA = {
        para_: null, setting_: { class: '', attrs: {}, style: {}, props: {}, on: {}, nativeOn: {}, directives: [] }
    };

if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
if (window.Node && !Node.prototype.getAttributeNames) {
    Node.prototype.getAttributeNames = function () {
        var el = this, a = [], attr = el.attributes;
        Object.keys(attr).forEach(function (key) { a.push(attr[key].name); });
        return a;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchValue, lengthToSearch) {
        if (lengthToSearch === undefined || lengthToSearch > this.length) {
            lengthToSearch = this.length;
        }
        return this.substring(lengthToSearch - searchValue.length, lengthToSearch) === searchValue;
    };
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
