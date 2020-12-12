// load dat from home.json
var vm = new Vue({
    el: '#databinding',
    data: {
        line_name: "05"
        , current_date: "15-07-2020"
        , current_time: "15:50"
        , operators: "54"
        , item_price: "12,500"
        , customer_name: "TIT CHFIX"
        , style_code: "SC190 195-196"
        , pass_rate: "86.6"
        , qty_person_day: "16.9"
        , salary_person_day: "207,618"
        , order_total_qty: "1376"
        , order_day_qty: "1030"
        , actual_total_qty: "1200"
        , actual_day_qty: "1000"
        , pass_output: "1000"
        , takt_time: 30
        , taget_qty_time1: 256
        , taget_qty_time2: 256
        , taget_qty_time3: 254
        , taget_qty_time4: 240
        , actual_qty_time1: 246
        , actual_qty_time2: 246
        , actual_qty_time3: 246
        , actual_qty_time4: 246
        
    },
    computed: {
        balance_total: function () {
            var _self = this;
            var final = _self.order_total_qty - _self.actual_total_qty;
            return final;
        },
         balance_day: function () {
             var _self = this;
             var final = _self.order_day_qty - _self.actual_day_qty;
             return final;;
        }
    }
    
});

var week = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    var cd = new Date();
    vm.current_time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    vm.current_date = zeroPadding(cd.getDate(), 2) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getFullYear(), 4) 
};

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}