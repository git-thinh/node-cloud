// load dat from home.json

var app = new Vue({
    el: '#data_rtq',
    data: {
        title: "RTQ",
        min_val: 20,
        between_val: "21-39",
        max_val: 40,
        ResultItems: {},
    },
    mounted: function () {
        var _self = this;
        _self.open_json_file();
    
        // var obj = fetch("rtq.json")
        //     .then(response => response.json())
        //     .then(jsonResponse => _self.ResultItems = jsonResponse);
        // console.log(obj);    
        // for (index = 0; index < _self.ResultItems.length; ++index) {
        //     console.log(index);
        //     _self.fn_change_item(_self.ResultItems[index], _self.min_val, _self.max_val)
        // }
    },
    watch: {
        innerModel: function (value) {
        }
    },
    methods: {
        fn_rowItemClick: function (event, row, rindex) {
            var _self = this;
        },
        fn_change_color_show: function () {

            var _self = this;
            var items = _self.ResultItems;
            var _min = parseInt(_self.min_val) + 1;
            var _max = parseInt(_self.max_val) - 1;
            _self.between_val = _min + "-" + _max;
            items.forEach(element => {
                _self.fn_change_item(element, _min, _max)
            });

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
        },
        fn_change_item: function (item, _min, _max) {
            console.log(item);
            console.log(_min);
            if (item.percent <= _min) {
                item.color = "green";
            } else if (item.percent >= _max) {
                item.color = "red";
            } else {
                item.color = "#fbbd08";
            }
            console.log(item);

        },
        open_json_file:function () {
           var _self = this;
            var xmlhttp = new XMLHttpRequest();
            var url = "rtq.json";
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myArr = JSON.parse(this.responseText);
                    _self.myFunction(myArr);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        myFunction :function (arr) {
            var _self = this;
            
            var out = "";
            var i;
            for(i = 0; i < arr.length; i++) {
               console.log(arr[i]);
               _self.fn_change_item(arr[i],_self.min_val,_self.max_val);
            }
            _self.ResultItems = arr;
          
        }
       
    }
});


// function open_json_file () {
           
   

//     var xmlhttp = new XMLHttpRequest();
//     var url = "rtq.json";
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var myArr = JSON.parse(this.responseText);
//             myFunction(myArr);
//         }
//     };


   
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();

  
    
   
// }
// function myFunction(arr) {
//     var out = "";
//     var i;
//     for(i = 0; i < arr.length; i++) {
//        console.log(arr[i])
//     }
  
// }
