// load dat from home.json

var app = new Vue({
    el: '#data_rtd',
    data: {
        title: "Real time display",
        ResultItems: {},
    },
    mounted: function () {
        var _self = this;
        var obj = fetch("rtd.json")
            .then(response => response.json())
            .then(jsonResponse => _self.ResultItems = jsonResponse);
        $('#example1').calendar({
            type: 'date',
            ampm: false,
            formatter: {
                date: function (date, settings) {
                    return _self.fn_date_format(date);
                }
            },
            text: {
                days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                monthsShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
                today: 'Today',
                now: 'Now',
                am: 'AM',
                pm: 'PM'
            }

        });

    },
    watch: {
        innerModel: function (value) {
        }
    },
    methods: {
        fn_rowItemClick: function (event, row, rindex) {
            var _self = this;
            console.log(row);
        }, fn_date_format: function (date) {
            if (!date) return '';
            var day = date.getDate() + '';
            if (day.length < 2) {
                day = '0' + day;
            }
            var month = (date.getMonth() + 1) + '';
            if (month.length < 2) {
                month = '0' + month;
            }
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        },

    }
});
