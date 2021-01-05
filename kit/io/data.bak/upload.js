
var maxSize = 10 * 1024 * 1024, maxSizeMB = '10M';

if (self.vpMaxSize && self.vpMaxSize.length > 0) {
    var ms = self.vpMaxSize.substr(0, self.vpMaxSize.length - 1);
    ms = Number(ms);
    if (!isNaN(ms)) {
        maxSize = ms * 1024 * 1024;
        maxSizeMB = self.vpMaxSize;
    }
}

___VC_DATA.upload = {
    placeholder: 'Select a file to upload',
    multiple: true,
    vc_size: {
        width: 0,
        height: 0
    },
    progress: {
        visible: false,
        color: 'orangered',
        speed: 5,
        width: 36,
        height: 3,
        max_left: 0,
        left: 0
    },
    file_data: null,
    file: {
        max_size_mb: maxSizeMB,
        max_size: maxSize,
        title_left: '33%',
        title_opacity: 0,
        visible: false,
        is_image: false,
        height: '9',
        name: '',
        type: '',
        url: ''
    }
};