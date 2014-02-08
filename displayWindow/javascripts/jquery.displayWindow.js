$.fn.displayWindow = function(options) {
    // 'var' as private variable
    var _counter = 0;
    var _totalElement = this.find('li').size();
    var _elementOuterWidth = 0;
    
    var self = this;
    // 'this' as public method.. wishfully
    this.resetButton = function(){
        console.log('_counter is ' + _counter);
        self.find('.lun-zhuan-button-right').attr('disabled', false);
        self.find('.lun-zhuan-button-left').prop('disabled', false);
        

        if ( _counter == (_totalElement - 4) ){
            self.find('.lun-zhuan-button-left').prop('disabled', true);
        }
        
        if ( _counter == 0 ){
            self.find('.lun-zhuan-button-right').attr('disabled', 'disabled');
        }
    }
    
    // This is the easiest way to have default options.
    var settings = $.extend({
        // These are the defaults.
        itemClass: '',
        buttonClass: ''
    }, options );
    
  
    this.find('li').wrapAll( "<div class='lun-zhuan-border'></div>");
    
    this.find('li').parent().css({
        // border: '1px solid pink',
        width: 250 * _totalElement + 'px',
    });            
  
    this.find('li').css({ 
        width: '200px',
        position: 'relative',
        float: 'left'
    });
    
    this.find('li').addClass('lun-zhuan-item');
    this.find('li').addClass(settings.itemClass);

    _elementOuterWidth = this.find('li').first().outerWidth(true);
    console.log(_elementOuterWidth);
    this.addClass('lun-zhuan-container');
    this.css({
        'list-style': 'none',
        // border: '1px solid orange',
        // width: '970px',
        width: 4 * _elementOuterWidth + 'px',
        padding: '0',
        overflow: 'hidden',
        float: 'left'        
    });

    
    this.find('div').append('<div style="clear: both;"></div>');
    
    this.before("<div><button class='lun-zhuan-button-left'><<</button></div>");
    this.after("<div><button class='lun-zhuan-button-right'>>></button></div>");
    
    $('.lun-zhuan-button-right').parent().after("<div style='clear: both;'></div>");
    
    $('.lun-zhuan-button-left').parent().addClass(settings.buttonClass);
    $('.lun-zhuan-button-right').parent().addClass(settings.buttonClass);

    $('.lun-zhuan-button-left').parent().css({
        float: 'left'
    });
    $('.lun-zhuan-button-right').parent().css({
        float: 'left'
    });

    var self = this;

    // initialize the buttons
    self.resetButton();

    // register the click event for both buttons
    $('.lun-zhuan-button-left').click(function(){              
        _counter ++;              
        self.find('.lun-zhuan-item').animate({ left: "-=" + _elementOuterWidth + "px" });
        self.resetButton();
    });
    
    $('.lun-zhuan-button-right').click(function(){
        _counter --;                              
        self.find('.lun-zhuan-item').animate({ left: "+=" + _elementOuterWidth + "px" })
        self.resetButton();
        
    });
    
      _elementOuterWidth = this.find('li').first().outerWidth(true);
      console.log(_elementOuterWidth + 'aya');
    
};      
