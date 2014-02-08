function AjaxWithHashTool(){
  
    var _params = {};
    
    this.set = function(key, value){
        _params[key] = value;
    }
    this.get = function(key){
        if (!( key in _params)){
            // this is too strict for just manipulating elements
            // throw new Error('undefined key: ' + key + '. set the key before getting value from it.');
            return '';
        }
        return _params[key];
    }
    var _beforeCallback = function(){}
    var _successCallback = function(){}
    var _url = '';

    this.setBeforeCallback = function(callback){
        _beforeCallback = callback;
    }
    this.setSuccessCallback = function(callback){
        _successCallback = callback;
    }
    this.setUrl = function(url){
        _url = url;
    }

    var _hash = '';

    var self = this;
    
    var refresh_hash = function(){
        var hash = '';
        var noValueInHash = true;
        for ( key in _params){
            if (_params[key].length !== 0){
                if (noValueInHash){
                    hash = hash + key + '-' + _params[key];
                    noValueInHash = false;
                }
                else{
                    hash = hash + '&' + key + '-' + _params[key];
                }
            }
        }
        _hash = hash;
        window.location.hash = hash;
    }
    
    this.send = function(){
        $.ajax({
            url: _url,
            data: _params,
            method: 'post',
            dataType: 'json',
            beforeSend: function(jqXHR, settings) {
                _beforeCallback();
            },
            complete: function(res){
                _successCallback(res);
                refresh_hash();                    
            }
        });
    }
    this.setParamsFromUrl = function(){
        var hash = window.location.hash.substr(1);
        if (hash.length!==0){
            var parts = hash.split('&');
            $.each(parts, function(index, part){
                var key = part.split('-')[0];
                var value = part.split('-')[1];
                self.set(key, value);                
            });
        }
    }        
}
