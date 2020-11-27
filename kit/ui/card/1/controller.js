{
    methods: {
        getItem: function() {
            var url = this._localPathDir + 'demo.json';
            var arr = this._getJsonUrl(url);
            return arr[0].items;
        }
    }
}