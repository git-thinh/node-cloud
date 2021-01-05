
___VC_DATA.text = {
    updating: false,
    active: false,
    readonly: false,
    img_loading: -1,
    placeholder: '',
    icon_name: '',
    icon_align: 'left',
    error: '',
    title:'',
    text: ''
};

if (self.vpReadonly != null) ___VC_DATA.text.readonly = self.vpReadonly == 'true' || self.vpReadonly == true ? true : false;

if (self.vpIconalign == 'left' || self.vpIconalign == 'right'
    || self.vpIconalign == 'top' || self.vpIconalign == 'bottom')
    ___VC_DATA.text.icon_align = self.vpIconalign;

if (self.vpValue != null) ___VC_DATA.text.text = self.vpValue;
if (self.vpIcon != null && self.vpIcon.length > 0) ___VC_DATA.text.icon_name = self.vpIcon;
if (self.vpTitle != null && self.vpTitle.length > 0) ___VC_DATA.text.title = self.vpTitle;
if (self.vpError != null && self.vpError.length > 0) ___VC_DATA.text.error = self.vpError;