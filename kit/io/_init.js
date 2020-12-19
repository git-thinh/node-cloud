var __V_THEME = 'logo-service', __V_DO_ACTION = 'v-do-action',
    __VC_PROPS = ['vpRef', 'vpData', 'vpTheme', 'vpType', 'vpMaxSize', 'vpClass', 'vpActive'],
    __APP, __APP_ID, __APP_INLINE = [], __VC_MIXIN = {}, __VA_MIXIN = {}, ___VC_DATA = {}, ___VC_DATA_FN = {},
    __V_DEF_DATA = { setting_: { class: '', attrs: {}, style: {}, props: {}, on: {}, nativeOn: {}, directives: [] } };

if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
if (window.Node && !Node.prototype.getAttributeNames) {
    Node.prototype.getAttributeNames = function () {
        var el = this, a = [], attr = el.attributes;
        Object.keys(attr).forEach(function (key) { a.push(attr[key].name); });
        return a;
    };
}
