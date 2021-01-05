
___VC_DATA.icon = {
    updating: false,
    active: false,
    img_loading: -1,
    index: -1,
    value: null,
    icon_name: '',
    name_active: '',
    text: ''
};

if (self.vpActive == true) ___VC_DATA.icon.active = true;
else if (self.vpActive == false) ___VC_DATA.icon.active = false;

if (self.vpIcon && self.vpIcon.length > 0) ___VC_DATA.icon.name = self.vpIcon;
if (self.vpText && self.vpText.length > 0) ___VC_DATA.icon.text = self.vpText;
if (self.vpIndex != null) ___VC_DATA.icon.index = self.vpIndex;
if (self.vpValue != null) ___VC_DATA.icon.value = self.vpValue;
if (self.vpImgLoading != null) ___VC_DATA.icon.img_loading = self.vpImgLoading;
