
function __vc_data_init___vp(self, vc_name, data) {
    data = data || {};
    self = self || {};

    if (data.hasOwnProperty('active') && self.vpActive == true) data.active = true;
    else if (data.hasOwnProperty('active') && self.vpActive == false) data.active = false;

    if (data.hasOwnProperty('icon_name') && self.vpIcon != null && self.vpIcon.length > 0) data.icon_name = self.vpIcon;
    if (data.hasOwnProperty('icon_align') && self.vpIconalign == 'left' || self.vpIconalign == 'right'
        || self.vpIconalign == 'top' || self.vpIconalign == 'bottom')
        data.icon_align = self.vpIconalign;

    if (data.hasOwnProperty('value') && self.vpValue != null) data.value = self.vpValue;

    if (data.hasOwnProperty('text') && self.vpText != null && self.vpText.length > 0) data.text = self.vpText;
    if (data.hasOwnProperty('title') && self.vpTitle != null && self.vpTitle.length > 0) data.title = self.vpTitle;
    if (data.hasOwnProperty('error') && self.vpError != null && self.vpError.length > 0) data.error = self.vpError;


    if (data.hasOwnProperty('index') && self.vpIndex != null) data.index = self.vpIndex;
    if (data.hasOwnProperty('value') && self.vpValue != null) data.value = self.vpValue;
    if (data.hasOwnProperty('img_loading') && self.vpImgLoading != null) data.img_loading = self.vpImgLoading;


    if (data.hasOwnProperty('readonly') && self.vpReadonly != null)
        data.readonly = self.vpReadonly == 'true' || self.vpReadonly == true ? true : false;

    return data;
}

function __vc_data_init(self, vc_name) {
    var data, temp, is_break = false;

    switch (vc_name) {
        case 'loading':
            is_break = true;
            data = {
                visible: false,
                img_loading: -1,
                timer_disable: false,
                lock_screen: false,
                text: '',
                speed: 1,
                left: 0,
                max_left: 0,
                bar_width: 0,
                value: 1,
                width: 0,
                height: 0
            };
            break;
        case 'toast':
            is_break = true;
            data = {
                visible: false,
                text: '',
                type: '',
                timer: null,
                always_show: false,
                close_show: false,
                timeout_close: 2000
            };
            break;
        case 'check':
        case 'radio':
        case 'icon':
            is_break = true;
            data = {
                updating: false,
                active: false,
                img_loading: -1,
                index: -1,
                value: null,
                icon_name: '',
                name_active: '',
                text: ''
            };
            break;
        case 'text':
            is_break = true;
            data = {
                updating: false,
                active: false,
                readonly: false,
                img_loading: -1,
                placeholder: '',
                icon_name: '',
                icon_align: 'left',
                error: '',
                title: '',
                value: ''
            };
            break;
    }

    if (is_break) {
        temp = __vc_data_init___vp(self, vc_name, data);
        ___VC_DATA[vc_name] = temp;
        //console.log(is_break, vc_name, temp);
        return;
    }

    //////data = {
    //////    active: false,
    //////    img_loading: -1,
    //////    max_size: 0,
    //////    index: -1,
    //////    select_ids: [],
    //////    value: { id: 2 },
    //////    icon_enable: false,
    //////    check_enable: false,
    //////    icon_render: null,
    //////    check_render: null,
    //////    header: {
    //////        visible: false,
    //////        search_show: true,
    //////        icon_close: 'close',
    //////        title: 'Choose items'
    //////    },
    //////    col: {
    //////        value: 'id',
    //////        text: 'name',
    //////        kit_left: null,
    //////        kit_body: {
    //////            'vp-click': self._checkItem_Click
    //////        },
    //////        kit_right: null
    //////    },
    //////    items: [
    //////        {
    //////            "id": "1",
    //////            "name": "Tiger Nixon",
    //////            "position": "System Architect",
    //////            "salary": "$320,800",
    //////            "start_date": "2011/04/25",
    //////            "office": "Edinburgh",
    //////            "extn": "5421"
    //////        },
    //////        {
    //////            "id": "2",
    //////            "name": "Garrett Winters",
    //////            "position": "Accountant",
    //////            "salary": "$170,750",
    //////            "start_date": "2011/07/25",
    //////            "office": "Tokyo",
    //////            "extn": "8422"
    //////        },
    //////        {
    //////            "id": "3",
    //////            "name": "Ashton Cox",
    //////            "position": "Junior Technical Author",
    //////            "salary": "$86,000",
    //////            "start_date": "2009/01/12",
    //////            "office": "San Francisco",
    //////            "extn": "1562"
    //////        },
    //////        {
    //////            "id": "4",
    //////            "name": "Cedric Kelly",
    //////            "position": "Senior Javascript Developer",
    //////            "salary": "$433,060",
    //////            "start_date": "2012/03/29",
    //////            "office": "Edinburgh",
    //////            "extn": "6224"
    //////        },
    //////        {
    //////            "id": "5",
    //////            "name": "Airi Satou",
    //////            "position": "Accountant",
    //////            "salary": "$162,700",
    //////            "start_date": "2008/11/28",
    //////            "office": "Tokyo",
    //////            "extn": "5407"
    //////        },
    //////        {
    //////            "id": "6",
    //////            "name": "Brielle Williamson",
    //////            "position": "Integration Specialist",
    //////            "salary": "$372,000",
    //////            "start_date": "2012/12/02",
    //////            "office": "New York",
    //////            "extn": "4804"
    //////        },
    //////        {
    //////            "id": "7",
    //////            "name": "Herrod Chandler",
    //////            "position": "Sales Assistant",
    //////            "salary": "$137,500",
    //////            "start_date": "2012/08/06",
    //////            "office": "San Francisco",
    //////            "extn": "9608"
    //////        },
    //////        {
    //////            "id": "8",
    //////            "name": "Rhona Davidson",
    //////            "position": "Integration Specialist",
    //////            "salary": "$327,900",
    //////            "start_date": "2010/10/14",
    //////            "office": "Tokyo",
    //////            "extn": "6200"
    //////        },
    //////        {
    //////            "id": "9",
    //////            "name": "Colleen Hurst",
    //////            "position": "Javascript Developer",
    //////            "salary": "$205,500",
    //////            "start_date": "2009/09/15",
    //////            "office": "San Francisco",
    //////            "extn": "2360"
    //////        },
    //////        {
    //////            "id": "10",
    //////            "name": "Sonya Frost",
    //////            "position": "Software Engineer",
    //////            "salary": "$103,600",
    //////            "start_date": "2008/12/13",
    //////            "office": "Edinburgh",
    //////            "extn": "1667"
    //////        },
    //////        {
    //////            "id": "11",
    //////            "name": "Jena Gaines",
    //////            "position": "Office Manager",
    //////            "salary": "$90,560",
    //////            "start_date": "2008/12/19",
    //////            "office": "London",
    //////            "extn": "3814"
    //////        },
    //////        {
    //////            "id": "12",
    //////            "name": "Quinn Flynn",
    //////            "position": "Support Lead",
    //////            "salary": "$342,000",
    //////            "start_date": "2013/03/03",
    //////            "office": "Edinburgh",
    //////            "extn": "9497"
    //////        },
    //////        {
    //////            "id": "13",
    //////            "name": "Charde Marshall",
    //////            "position": "Regional Director",
    //////            "salary": "$470,600",
    //////            "start_date": "2008/10/16",
    //////            "office": "San Francisco",
    //////            "extn": "6741"
    //////        },
    //////        {
    //////            "id": "14",
    //////            "name": "Haley Kennedy",
    //////            "position": "Senior Marketing Designer",
    //////            "salary": "$313,500",
    //////            "start_date": "2012/12/18",
    //////            "office": "London",
    //////            "extn": "3597"
    //////        },
    //////        {
    //////            "id": "15",
    //////            "name": "Tatyana Fitzpatrick",
    //////            "position": "Regional Director",
    //////            "salary": "$385,750",
    //////            "start_date": "2010/03/17",
    //////            "office": "London",
    //////            "extn": "1965"
    //////        },
    //////        {
    //////            "id": "16",
    //////            "name": "Michael Silva",
    //////            "position": "Marketing Designer",
    //////            "salary": "$198,500",
    //////            "start_date": "2012/11/27",
    //////            "office": "London",
    //////            "extn": "1581"
    //////        },
    //////        {
    //////            "id": "17",
    //////            "name": "Paul Byrd",
    //////            "position": "Chief Financial Officer (CFO)",
    //////            "salary": "$725,000",
    //////            "start_date": "2010/06/09",
    //////            "office": "New York",
    //////            "extn": "3059"
    //////        },
    //////        {
    //////            "id": "18",
    //////            "name": "Gloria Little",
    //////            "position": "Systems Administrator",
    //////            "salary": "$237,500",
    //////            "start_date": "2009/04/10",
    //////            "office": "New York",
    //////            "extn": "1721"
    //////        },
    //////        {
    //////            "id": "19",
    //////            "name": "Bradley Greer",
    //////            "position": "Software Engineer",
    //////            "salary": "$132,000",
    //////            "start_date": "2012/10/13",
    //////            "office": "London",
    //////            "extn": "2558"
    //////        },
    //////        {
    //////            "id": "20",
    //////            "name": "Dai Rios",
    //////            "position": "Personnel Lead",
    //////            "salary": "$217,500",
    //////            "start_date": "2012/09/26",
    //////            "office": "Edinburgh",
    //////            "extn": "2290"
    //////        },
    //////        {
    //////            "id": "21",
    //////            "name": "Jenette Caldwell",
    //////            "position": "Development Lead",
    //////            "salary": "$345,000",
    //////            "start_date": "2011/09/03",
    //////            "office": "New York",
    //////            "extn": "1937"
    //////        },
    //////        {
    //////            "id": "22",
    //////            "name": "Yuri Berry",
    //////            "position": "Chief Marketing Officer (CMO)",
    //////            "salary": "$675,000",
    //////            "start_date": "2009/06/25",
    //////            "office": "New York",
    //////            "extn": "6154"
    //////        },
    //////        {
    //////            "id": "23",
    //////            "name": "Caesar Vance",
    //////            "position": "Pre-Sales Support",
    //////            "salary": "$106,450",
    //////            "start_date": "2011/12/12",
    //////            "office": "New York",
    //////            "extn": "8330"
    //////        },
    //////        {
    //////            "id": "24",
    //////            "name": "Doris Wilder",
    //////            "position": "Sales Assistant",
    //////            "salary": "$85,600",
    //////            "start_date": "2010/09/20",
    //////            "office": "Sydney",
    //////            "extn": "3023"
    //////        },
    //////        {
    //////            "id": "25",
    //////            "name": "Angelica Ramos",
    //////            "position": "Chief Executive Officer (CEO)",
    //////            "salary": "$1,200,000",
    //////            "start_date": "2009/10/09",
    //////            "office": "London",
    //////            "extn": "5797"
    //////        },
    //////        {
    //////            "id": "26",
    //////            "name": "Gavin Joyce",
    //////            "position": "Developer",
    //////            "salary": "$92,575",
    //////            "start_date": "2010/12/22",
    //////            "office": "Edinburgh",
    //////            "extn": "8822"
    //////        },
    //////        {
    //////            "id": "27",
    //////            "name": "Jennifer Chang",
    //////            "position": "Regional Director",
    //////            "salary": "$357,650",
    //////            "start_date": "2010/11/14",
    //////            "office": "Singapore",
    //////            "extn": "9239"
    //////        },
    //////        {
    //////            "id": "28",
    //////            "name": "Brenden Wagner",
    //////            "position": "Software Engineer",
    //////            "salary": "$206,850",
    //////            "start_date": "2011/06/07",
    //////            "office": "San Francisco",
    //////            "extn": "1314"
    //////        },
    //////        {
    //////            "id": "29",
    //////            "name": "Fiona Green",
    //////            "position": "Chief Operating Officer (COO)",
    //////            "salary": "$850,000",
    //////            "start_date": "2010/03/11",
    //////            "office": "San Francisco",
    //////            "extn": "2947"
    //////        },
    //////        {
    //////            "id": "30",
    //////            "name": "Shou Itou",
    //////            "position": "Regional Marketing",
    //////            "salary": "$163,000",
    //////            "start_date": "2011/08/14",
    //////            "office": "Tokyo",
    //////            "extn": "8899"
    //////        },
    //////        {
    //////            "id": "31",
    //////            "name": "Michelle House",
    //////            "position": "Integration Specialist",
    //////            "salary": "$95,400",
    //////            "start_date": "2011/06/02",
    //////            "office": "Sydney",
    //////            "extn": "2769"
    //////        },
    //////        {
    //////            "id": "32",
    //////            "name": "Suki Burks",
    //////            "position": "Developer",
    //////            "salary": "$114,500",
    //////            "start_date": "2009/10/22",
    //////            "office": "London",
    //////            "extn": "6832"
    //////        },
    //////        {
    //////            "id": "33",
    //////            "name": "Prescott Bartlett",
    //////            "position": "Technical Author",
    //////            "salary": "$145,000",
    //////            "start_date": "2011/05/07",
    //////            "office": "London",
    //////            "extn": "3606"
    //////        },
    //////        {
    //////            "id": "34",
    //////            "name": "Gavin Cortez",
    //////            "position": "Team Leader",
    //////            "salary": "$235,500",
    //////            "start_date": "2008/10/26",
    //////            "office": "San Francisco",
    //////            "extn": "2860"
    //////        },
    //////        {
    //////            "id": "35",
    //////            "name": "Martena Mccray",
    //////            "position": "Post-Sales support",
    //////            "salary": "$324,050",
    //////            "start_date": "2011/03/09",
    //////            "office": "Edinburgh",
    //////            "extn": "8240"
    //////        },
    //////        {
    //////            "id": "36",
    //////            "name": "Unity Butler",
    //////            "position": "Marketing Designer",
    //////            "salary": "$85,675",
    //////            "start_date": "2009/12/09",
    //////            "office": "San Francisco",
    //////            "extn": "5384"
    //////        },
    //////        {
    //////            "id": "37",
    //////            "name": "Howard Hatfield",
    //////            "position": "Office Manager",
    //////            "salary": "$164,500",
    //////            "start_date": "2008/12/16",
    //////            "office": "San Francisco",
    //////            "extn": "7031"
    //////        },
    //////        {
    //////            "id": "38",
    //////            "name": "Hope Fuentes",
    //////            "position": "Secretary",
    //////            "salary": "$109,850",
    //////            "start_date": "2010/02/12",
    //////            "office": "San Francisco",
    //////            "extn": "6318"
    //////        },
    //////        {
    //////            "id": "39",
    //////            "name": "Vivian Harrell",
    //////            "position": "Financial Controller",
    //////            "salary": "$452,500",
    //////            "start_date": "2009/02/14",
    //////            "office": "San Francisco",
    //////            "extn": "9422"
    //////        },
    //////        {
    //////            "id": "40",
    //////            "name": "Timothy Mooney",
    //////            "position": "Office Manager",
    //////            "salary": "$136,200",
    //////            "start_date": "2008/12/11",
    //////            "office": "London",
    //////            "extn": "7580"
    //////        },
    //////        {
    //////            "id": "41",
    //////            "name": "Jackson Bradshaw",
    //////            "position": "Director",
    //////            "salary": "$645,750",
    //////            "start_date": "2008/09/26",
    //////            "office": "New York",
    //////            "extn": "1042"
    //////        },
    //////        {
    //////            "id": "42",
    //////            "name": "Olivia Liang",
    //////            "position": "Support Engineer",
    //////            "salary": "$234,500",
    //////            "start_date": "2011/02/03",
    //////            "office": "Singapore",
    //////            "extn": "2120"
    //////        },
    //////        {
    //////            "id": "43",
    //////            "name": "Bruno Nash",
    //////            "position": "Software Engineer",
    //////            "salary": "$163,500",
    //////            "start_date": "2011/05/03",
    //////            "office": "London",
    //////            "extn": "6222"
    //////        },
    //////        {
    //////            "id": "44",
    //////            "name": "Sakura Yamamoto",
    //////            "position": "Support Engineer",
    //////            "salary": "$139,575",
    //////            "start_date": "2009/08/19",
    //////            "office": "Tokyo",
    //////            "extn": "9383"
    //////        },
    //////        {
    //////            "id": "45",
    //////            "name": "Thor Walton",
    //////            "position": "Developer",
    //////            "salary": "$98,540",
    //////            "start_date": "2013/08/11",
    //////            "office": "New York",
    //////            "extn": "8327"
    //////        },
    //////        {
    //////            "id": "46",
    //////            "name": "Finn Camacho",
    //////            "position": "Support Engineer",
    //////            "salary": "$87,500",
    //////            "start_date": "2009/07/07",
    //////            "office": "San Francisco",
    //////            "extn": "2927"
    //////        },
    //////        {
    //////            "id": "47",
    //////            "name": "Serge Baldwin",
    //////            "position": "Data Coordinator",
    //////            "salary": "$138,575",
    //////            "start_date": "2012/04/09",
    //////            "office": "Singapore",
    //////            "extn": "8352"
    //////        },
    //////        {
    //////            "id": "48",
    //////            "name": "Zenaida Frank",
    //////            "position": "Software Engineer",
    //////            "salary": "$125,250",
    //////            "start_date": "2010/01/04",
    //////            "office": "New York",
    //////            "extn": "7439"
    //////        },
    //////        {
    //////            "id": "49",
    //////            "name": "Zorita Serrano",
    //////            "position": "Software Engineer",
    //////            "salary": "$115,000",
    //////            "start_date": "2012/06/01",
    //////            "office": "San Francisco",
    //////            "extn": "4389"
    //////        },
    //////        {
    //////            "id": "50",
    //////            "name": "Jennifer Acosta",
    //////            "position": "Junior Javascript Developer",
    //////            "salary": "$75,650",
    //////            "start_date": "2013/02/01",
    //////            "office": "Edinburgh",
    //////            "extn": "3431"
    //////        },
    //////        {
    //////            "id": "51",
    //////            "name": "Cara Stevens",
    //////            "position": "Sales Assistant",
    //////            "salary": "$145,600",
    //////            "start_date": "2011/12/06",
    //////            "office": "New York",
    //////            "extn": "3990"
    //////        },
    //////        {
    //////            "id": "52",
    //////            "name": "Hermione Butler",
    //////            "position": "Regional Director",
    //////            "salary": "$356,250",
    //////            "start_date": "2011/03/21",
    //////            "office": "London",
    //////            "extn": "1016"
    //////        },
    //////        {
    //////            "id": "53",
    //////            "name": "Lael Greer",
    //////            "position": "Systems Administrator",
    //////            "salary": "$103,500",
    //////            "start_date": "2009/02/27",
    //////            "office": "London",
    //////            "extn": "6733"
    //////        },
    //////        {
    //////            "id": "54",
    //////            "name": "Jonas Alexander",
    //////            "position": "Developer",
    //////            "salary": "$86,500",
    //////            "start_date": "2010/07/14",
    //////            "office": "San Francisco",
    //////            "extn": "8196"
    //////        },
    //////        {
    //////            "id": "55",
    //////            "name": "Shad Decker",
    //////            "position": "Regional Director",
    //////            "salary": "$183,000",
    //////            "start_date": "2008/11/13",
    //////            "office": "Edinburgh",
    //////            "extn": "6373"
    //////        },
    //////        {
    //////            "id": "56",
    //////            "name": "Michael Bruce",
    //////            "position": "Javascript Developer",
    //////            "salary": "$183,000",
    //////            "start_date": "2011/06/27",
    //////            "office": "Singapore",
    //////            "extn": "5384"
    //////        },
    //////        {
    //////            "id": "57",
    //////            "name": "Donna Snider",
    //////            "position": "Customer Support",
    //////            "salary": "$112,000",
    //////            "start_date": "2011/01/25",
    //////            "office": "New York",
    //////            "extn": "4226"
    //////        }
    //////    ]
    //////};

    //////data.icon_render = function (item) {
    //////    var id = Number(item.id);
    //////    switch (id) {
    //////        case 2: return 'add';
    //////        case 3: return 'edit';
    //////        case 4: return 'remove';
    //////    }
    //////    return '';
    //////};

    //////data.check_render = function (item) {
    //////    var id = Number(item.id);
    //////    switch (id) {
    //////        case 1:
    //////        case 3:
    //////        case 5:
    //////            return true;
    //////    }
    //////    return false;
    //////};

    //////if (self.vpIcon != null) data.icon_enable = self.vpIcon == 'true' || self.vpIcon == true ? true : false;
    //////if (self.vpCheck != null) data.check_enable = self.vpCheck == 'true' || self.vpCheck == true ? true : false;

    //////if (self.vpActive == true) data.active = true;
    //////else if (self.vpActive == false) data.active = false;

    //////if (self.vpText && self.vpText.length > 0) data.text = self.vpText;
    //////if (self.vpIndex != null) data.index = self.vpIndex;
    //////if (self.vpValue != null) data.value = self.vpValue;
    //////if (self.vpImgLoading != null) data.img_loading = self.vpImgLoading;

    //////if (self.vpItems != null) data.items = self.vpItems;
    //////if (self.vpMax) data.max_size = Number(self.vpMax);
    //////if (self.vpHeader != null) data.header.visible = self.vpHeader == 'true' || self.vpHeader == true ? true : false;

    //////___VC_DATA[vc_name] = data;
}


function __vue_toast(text, option) { if (__VC_REF.__KIT_TOAST) __VC_REF.__KIT_TOAST._show(text, option); }
function __vue_loading(visible, lock_screen) { if (__VC_REF.__KIT_LOADING) __VC_REF.__KIT_LOADING._show(visible, lock_screen); }

function __vue_appInit(callback) {
    var el = document.getElementById(__APP_ID);
    if (el) {
        el.innerHTML = '<ui-toast vp-ref="__KIT_TOAST" vp-theme="' + __V_THEME + '"></ui-toast>' +
            '<ui-loading vp-ref="__KIT_LOADING" vp-theme="' + __V_THEME + '"></ui-loading>';

        __APP = new Vue({
            mixins: [__VA_MIXIN],
            el: '#' + __APP_ID,
            data: function () {
                return {
                };
            },
            mounted: function () {
                Vue.nextTick(function () {
                    if (callback) callback();
                });
            },
            methods: {
            }
        });
    }
}

function __vue_appInit_inline(index, el, callback) {
    if (el == null) return;
    var ps = '', scom = '',
        kit_name = el.getAttribute('kit-name');
    el.getAttributeNames().forEach(function (key) {
        var val = el.getAttribute(key);
        if (val == 'true' || val == 'false') { } else val = '\'' + val + '\'';
        if (key.indexOf('vp-') == 0) ps += ':' + key + '="' + val + '" ';
    });
    scom = '<ui-' + kit_name + ' :vp-theme="\'' + __V_THEME + '\'" ' + ps + '></ui-' + kit_name + '>';
    //console.log(ps);
    //console.log(scom);

    el.innerHTML = scom;
    var app = new Vue({
        mixins: [__VA_MIXIN],
        el: '#' + el.id,
        data: function () {
            return {
                index: index,
                kit_name: kit_name,
                data: {
                    setting_: {
                        style: {
                            opacity: 0
                        }
                    }
                }
            };
        },
        mounted: function () {
            var _self = this;

            Vue.nextTick(function () {
                if (callback) callback();
            });
        }
    });
}

function __vue_init_inline(callback) {
    window.addEventListener('DOMContentLoaded', function () {
        __APP_ID = 'vue_' + (new Date()).getTime();
        var div = document.createElement('div');
        div.id = __APP_ID;
        div.setAttribute('class', 'va-base ' + __V_THEME);
        document.body.appendChild(div);
        __vue_appInit(function () {
            var ls = document.querySelectorAll('*[kit-name]'),
                size = ls.length;
            if (size == 0) __vue_ready(callback);
            else {
                ls.forEach(function (el, index) {
                    el.id = __APP_ID + '--' + index;
                    __vue_appInit_inline(index, el, function () {
                        size--;
                        if (size == 0) __vue_ready(callback);
                    });
                });
            }
        });
    });
}

function __vue_ready(callback) {
    __APP._vc_inline_ready();
    __vue_vc_config();
    if (callback) callback();
}

function __vue_call(ref_name, fn_name, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    var rs = [];
    document.querySelectorAll('.vc-com.' + ref_name).forEach(function (el) {
        var vu = el.__vue__;
        if (vu && typeof vu[fn_name] == 'function') {
            var val = vu[fn_name](p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
            rs.push(val);
        }
    });
    if (rs.length == 0) return null;
    else if (rs.length == 1) return rs[0];
    else return rs;
}

function __vue_set_data(vue_name, data) {
    if (data == null || Object.keys(data).length == 0) return;
    var keys = Object.keys(data);
    document.querySelectorAll('.vc-com.vc-' + vue_name).forEach(function (el) {
        var vu = el.__vue__;
        //console.log(vu.kit_name, keys, vu);
        if (vu) keys.forEach(function (key) { vu.$data[key] = data[key]; });
    });
}