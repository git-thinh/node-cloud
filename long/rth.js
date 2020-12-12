// load dat from home.json

var app = new Vue({
    el: '#data_rtd',
    data: {
        min_val:20,
        between_val:"21-39",
        max_val:40,
        title: "Real time display",
        temp_table: "",
        ResultItems: {},
    },
    mounted: function () {
        var _self = this;
         _self.open_json_file();
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
    methods: {
        fn_rowItemClick: function (event, row, rindex) {
            var _self = this;
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
        fn_create_table: function () {
            var html = "";
            html = "<table id='basic' border='1'>"
                + "  <tr data-node-id='1'>"
                + "     <td><a href='#'>1</a></td>"
                + "     <td>text of 1</td>"
                + "  </tr>"
                + "  <tr data-node-id='1.1' data-node-pid='1'>"
                + "     <td><a href='#'>1.1</a></td>"
                + "     <td>text of 1.1</td>"
                + "  </tr>"
                + "  <tr data-node-id='1.1.1' data-node-pid='1.1'>"
                + "     <td><a href='#'>1.1.1</a></td>"
                + "     <td>text of 1.1.1</td>"
                + "  </tr>"
                + "<tr data-node-id='1.1.2' data-node-pid='1.1'>"
                + "<td><a href='#'>1.1.2</a></td>"
                + "<td>text of 1.1.2</td>"
                + "</tr>"
                + "<tr data-node-id='1.2' data-node-pid='1'>"
                + "<td><a href='#'>1.2</a></td>"
                + "<td>text of 1.2</td>"
                + "</tr>"
                + "<tr data-node-id='1.2.1' data-node-pid='1.2'>"
                + "<td><a href='#'>1.2.1</a></td>"
                + "<td>text of 1.2.1</td>"
                + "</tr>"
                + "<tr data-node-id='1.2.2' data-node-pid='1.2'>"
                + "<td><a href='#'>1.2.2</a></td>"
                + "<td>text of 1.2.2</td>"
                + "</tr>"
                + "<tr data-node-id='2'>"
                + "<td><a href='#'>2</a></td>"
                + "<td>text of 2</td>"
                + "</tr>"
                + "<tr data-node-id='2.1' data-node-pid='2'>"
                + "<td><a href='#'>2.1</a></td>"
                + "<td>text of 2.1</td>"
                + "</tr>"
                + "<tr data-node-id='2.2' data-node-pid='2'>"
                + "<td><a href='#'>2.2</a></td>"
                + "<td>text of 2.2</td>"
                + "</tr>"
                + "</table>";
            return html;

        },
        open_json_file: function () {
            var _self = this;
            var xmlhttp = new XMLHttpRequest();
            var url = "rth.json";
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var myArr = JSON.parse(this.responseText);
                    _self.fn_create_table(myArr);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        fn_create_table: function (arr) {
            var _self = this;

            var html = "<table class='ui celled striped table selectable simple-tree-table' id='basic'>"
                + "<thead>"
                + "<tr><th colspan='26'>REAL TIME HOURLY</th></tr>"
                + "<tr><th style='width: 120px;' >Employee</th><th>VỊ TRÍ</th><th>1 AM</th><th>2 AM</th><th>3 AM</th><th>4 AM</th><th>5 AM</th><th>6 AM</th><th>7 AM</th><th>8 AM</th><th>9 AM</th><th>10 AM</th><th>11 AM</th><th>12 AM</th><th>1 PM</th><th>2 PM</th><th>3 PM</th><th>4 PM</th><th>5 PM</th><th>6 PM</th><th>7 PM</th><th>8 PM</th><th>9 PM</th><th>10 PM</th><th>11 PM</th><th>Total</th></tr>"
                + "</thead><tbody>";
            var i;
            for (i = 0; i < arr.length; i++) {
                html += "  <tr data-node-id='" + arr[i].operation_id + "'>"
                    + "     <td colspan='26'><a href='#'>" + arr[i].operation_name + " </a></td>"
                    + "  </tr>";
                var j;
                for (j = 0; j < arr[i].employees.length; j++) {
                    var item = arr[i].employees[j];
                    var _total = parseInt(item.AM_01) +parseInt(item.AM_02) +parseInt(item.AM_03) +parseInt(item.AM_04)
                                +parseInt(item.AM_05) +parseInt(item.AM_06)+ parseInt(item.AM_07) +parseInt(item.AM_08)
                                +parseInt(item.AM_09) +parseInt(item.AM_10)+ parseInt(item.AM_11) +parseInt(item.AM_12)
                                +parseInt(item.PM_01) +parseInt(item.PM_02) +parseInt(item.PM_03) +parseInt(item.PM_04)
                                +parseInt(item.PM_05) +parseInt(item.PM_06)+ parseInt(item.PM_07) +parseInt(item.PM_08)
                                +parseInt(item.PM_09) +parseInt(item.PM_10)+ parseInt(item.PM_11);
                    html += "  <tr data-node-id='" + item.operator_code + "'  data-node-pid='" + arr[i].operation_id + "'  >"
                        + "     <td><a href='#'>" + item.operator_name + " </a></td>"
                        + "     <td  >" + item.site_number + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_01) +"'>" + item.AM_01 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_02) +"'>" + item.AM_02 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_03) +"'>" + item.AM_03 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_04) +"'>" + item.AM_04 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_05) +"'>" + item.AM_05 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_06) +"'>" + item.AM_06 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_07) +"'>" + item.AM_07 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_08) +"'>" + item.AM_08 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_09) +"'>" + item.AM_09 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_10) +"'>" + item.AM_10 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_11) +"'>" + item.AM_11 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.AM_12) +"'>" + item.AM_12 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_01) +"'>" + item.PM_01 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_02) +"'>" + item.PM_02 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_03) +"'>" + item.PM_03 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_04) +"'>" + item.PM_04 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_05) +"'>" + item.PM_05 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_06) +"'>" + item.PM_06 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_07) +"'>" + item.PM_07 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_08) +"'>" + item.PM_08 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_09) +"'>" + item.PM_09 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_10) +"'>" + item.PM_10 + "</td>"
                        + "     <td style ='" + _self.fn_resturn_class_name(item.PM_11) +"'>" + item.PM_11 + "</td>"
                        + "     <td>" + _total + "</td>"
                        + "  </tr>"
                }


            }

            html += "</tbody></table>"
            document.getElementById("template-html").innerHTML = html;
            _self.temp_table = html;
            _self.ResultItems = arr;
            _self.fn_excute_table();
            
        },
        fn_create_tree_table() {
            var _self = this;
            var items = _self.ResultItems;
            console.log(_self.ResultItems);
            for (index = 0; index < _self.ResultItems.length; ++index) {
                console.log(_self.ResultItems[index]);
            }

            var html = "<table class='ui celled striped table selectable simple-tree-table' id='basic'>"
                + "<thead>"
                + "<tr><th colspan='26'>REAL TIME HOURLY</th></tr>"
                + "<tr><th>Employee</th><th>VỊ TRÍ</th><th>1 AM</th><th>2 AM</th><th>3 AM</th><th>4 AM</th><th>5 AM</th><th>6 AM</th><th>7 AM</th><th>8 AM</th><th>9 AM</th><th>10 AM</th><th>11 AM</th><th>12 AM</th><th>1 PM</th><th>2 PM</th><th>3 PM</th><th>4 PM</th><th>5 PM</th><th>6 PM</th><th>7 PM</th><th>8 PM</th><th>9 PM</th><th>10 PM</th><th>11 PM</th><th>Total</th></tr>"
                + "</thead><tbody>";

            // items.forEach(element => {
            //     html +="  <tr data-node-id='"+ element.operation_id+ "'>"
            //          + "     <td colspan='24'><a href='#'>"+ element.operation_name+ " </a></td>"
            //          + "  </tr>"
            //          element.employees.forEach (item=>{
            //             html +="  <tr data-node-id='"+ item.operator_code +"'  data-node-pid='"+ element.operation_id+ "'  >"
            //             + "     <td colspan='24'><a href='#'>"+ item.operation_name+ " </a></td>"
            //             + "  </tr>"
            //          }); 
            // });

            html += "</tbody></table>"
            return html;
        },
        fn_excute_table: function () {
            $('#basic').simpleTreeTable({
                expander: $('#expander'),
                collapser: $('#collapser'),
                store: 'session',
                storeKey: 'simple-tree-table-basic'
            });
        },
        fn_resturn_class_name: function( _val){
            var _class ="";
            var _self = this;
            var i_val =parseInt(_val);
            if(i_val ==0){
                return "";
            }else if ( i_val >0 && i_val <= _self.min_val) {
                _class= "background-color: red;";
            } else if (i_val >= _self.max_val) {
                _class= "background-color: green;";
            } else {
                _class= "background-color: #fbbd08;";
            }  
            return _class;
        },
        fn_change_color_show: function () {

            var _self = this;
            var items = _self.ResultItems;
            var _min = parseInt(_self.min_val) + 1;
            var _max = parseInt(_self.max_val) - 1;
            _self.between_val = _min + "-" + _max;
            _self.fn_create_table(items);

           

        },
        isNumber: function (evt) {
            var _self = this;
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }


    },
    watch: {
        // call again the method if the route changes
        //'$route': 'open_json_file'
    }

});
