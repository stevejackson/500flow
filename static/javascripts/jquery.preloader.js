// JavaScript Document
$.fn.preloader = function(options){

    var defaults = {
                     delay:75,
                     check_timer:300,
                     ondone:function(){ },
                     oneachload:function(image){  },
                     fadein: 500,
                     spinner: '/images/ajax-loader.gif',
                     preloader_class: 'preloader'
                    };

    // variables declaration and precaching images and parent container
     var options = $.extend(defaults, options);
     var root = $(this);
     var images = root.find("img").css({"visibility":"hidden",opacity:0});
     var timer,  counter = 0, i = 0, checkFlag = [], delaySum = options.delay;

     init = function(){

       timer = setInterval(function(){

          if(counter >= checkFlag.length)
          {
            clearInterval(timer);
            options.ondone();
            return;
          }

          for(i = 0;i < images.length; i++)
          {
            if(images[i].complete == true)
            {
              if(checkFlag[i] == false)
              {
                checkFlag[i] = true;
                options.oneachload(images[i]);
                counter++;

                delaySum = delaySum + options.delay;

                $(images[i]).css("visibility","visible").delay(delaySum).animate({opacity:1},options.fadein,
                  function(){ $(this).parent().removeClass(options.preloader_class);   });
              }
            }
          }

        }, options.check_timer)
    };

    images.each(function(){
        $(this).parent().addClass(options.preloader_class);
        checkFlag[i++] = false;
    });

    images = $.makeArray(images);

    var icon = $("<img />", {
        id: 'loadingicon',
        src: options.spinner
    }).hide().appendTo('body');

    // Once the ajax-loader loads, start preloading
    timer = setInterval(function(){
            if(icon[0].complete == true) {
              clearInterval(timer);
              init();
              return;
            }
        }, 100);

    }
