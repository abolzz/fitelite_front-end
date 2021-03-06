$(document).ready(function() {
  'use strict';

  $('.js-select').on('sumo:opened', () => {
      // Do stuff here
      $('body').addClass('sumo-opened');
      console.log("Drop down opened")
  });

  $('.js-select').on('sumo:closed', () => {
      // Do stuff here
      $('body').addClass('sumo-closed');
      console.log("Drop down closed")
  });

  let $window = $(window);
  let $document = $(document);
  let $body = $("body");

  /*
  * Set cookie
  *
  * @param string name
  * @param string value
  * @param int days
  * @param string path
  * @see http://www.quirksmode.org/js/cookies.html
  */
  function createCookie(name,value,days,path) {
     if (days) {
         var date = new Date();
         date.setTime(date.getTime()+(days*24*60*60*1000));
         var expires = "; expires="+date.toGMTString();
     }
     else var expires = "";
     document.cookie = name+"="+value+expires+"; path="+path;
  }

  /*
  * Read cookie
  * @param string name
  * @returns {*}
  * @see http://www.quirksmode.org/js/cookies.html
  */
  function readCookie(name) {
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') c = c.substring(1,c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
     }
     return null;
  }

  var cookieMessage = document.getElementById('cookies');
  if (cookieMessage == null) {
     return;
  }
  var cookie = readCookie('seen-cookie-message');
  if (cookie != null && cookie == 'yes') {
     cookieMessage.style.display = 'none';
  } else {
     cookieMessage.style.display = 'block';
  }

  // Set/update cookie
  var cookieExpiry = cookieMessage.getAttribute('data-cookie-expiry');
  if (cookieExpiry == null) {
     cookieExpiry = 30;
  }
  var cookiePath = cookieMessage.getAttribute('data-cookie-path');
  if (cookiePath == null) {
     cookiePath = "/";
  }

  // Close cookie
  $('.js-cookies-close').click(() => {
     $('#cookies').remove();
     createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath);
  });

  // Script for deprecated browser notification
  $('.close_announcement').click((e) => {
    e.preventDefault();
    $('.update_browser_fake_body').css('display', 'none');
    $('#browser-notification-style').remove();
  });

  // Replace all .svg to .png, in case the browser does not support the format
  if(!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', () => {
          return $(this).attr('src').replace('.svg', '.png');
      });
      $('*[style*="svg"]').attr('style', () => {
          return $(this).attr('style').replace('.svg', '.png');
      });
  }

  // Script for full-width row
  function row_full_w () {
    let $body_w = $body.width();
    let $row_full_w = $('.row-full-w');
    let $js_row_full_w = $('.js-row-full-w');

    $js_row_full_w.css({
      'width': $body_w,
      'margin-left': parseInt(-$body_w / 2)
    });
    
    if($row_full_w) {
      $js_row_full_w.addClass('row-full-w');
    }
  }
  row_full_w();
  $(window).resize(function() {
    row_full_w();
  });

  // Add CSS class to Site Header when scrollTop position of the document is not 0
  var $lastY = $window.scrollTop();
  function add_not_top() {
    $body.addClass("not--top");
  }
  function remove_not_top() {
    $body.removeClass("not--top");
  }
  function add_not_top_down() {
    $body.addClass("not--top-down");
  }
  function remove_not_top_down() {
    $body.removeClass("not--top-down");
  }
  var $timeout_add_not_top
  var $timeout_remove_not_top
  var $timeout_add_not_top_down
  var $timeout_remove_not_top_down


  if( $lastY > 50 ) {
    add_not_top();
  }

  $(window).scroll(function() {

    var $currentY = $window.scrollTop();
    if ( $currentY > $lastY ) {
      var y = 'down';
    } else if ( $currentY < $lastY ) {
      var y = 'up';
    }
    $lastY = $currentY;
    if ( $document.scrollTop() > 50 && y == 'down' ) {
      $timeout_add_not_top = setTimeout(add_not_top, 150);
    } else if ( $document.scrollTop() <= 80 && y == 'up' ) {
      $timeout_remove_not_top = setTimeout(remove_not_top, 150);
    }
    if ( $document.scrollTop() > 300 && y == 'down' ) {
      $timeout_add_not_top_down = setTimeout(add_not_top_down, 150);
      $(".header-menu").removeClass("flex-c-column-max-lg");
      $(".mobile-menu-icon").removeClass("open");
    } else if  ( y == 'up' ) {
      $timeout_add_not_top_down = setTimeout(remove_not_top_down, 150);
    }

  });

  // Select
  function selectPlugin() {
    if( $('.js-select').length > 0 ) {
      $('.js-select').each(function() {
        let $this = $(this);
        if( !$this.hasClass('js-initialized') ) {
          $this.SumoSelect({
            search: true,
            searchText: '',
            noMatch: '',
            forceCustomRendering: true,
          });
          $this.addClass('js-initialized');
        }
      });
    }
  }
  selectPlugin();

  // Animations
  AOS.init();


  // Mobile menu
  $('.mobile-menu-icon').unbind("click").click(function() {
    $(".mobile-menu-icon").toggleClass("open");
    $(".header-menu").toggleClass("flex-c-column-max-lg");
  });

  // Hide mobile menu when clicked outside of it
  $(document).mouseup(function (e) {
    if ( $(".mobile-menu-icon").hasClass('open') ) {
      var $container = $(".site-header");
      if (
          !$container.is(e.target) // if the target of the click isn't the container...
          && $container.has(e.target).length === 0 // ... nor a descendant of the container
        )
      {
        $(".mobile-menu-icon").removeClass("open");
        $(".header-menu").removeClass("flex-c-column-max-lg");
        return false;
      }
    }
  });

  // Header height
  if ($(window).width() < 1199) {
    $(".site-header").css({'height': "75px" + $('.header-menu').height()})
  }

  // Navigation
  $('.menu-item').click(function() {
    $('.menu-item').removeClass("active");
    $(this).addClass("active");
  });

  // Scroll the page according to clicked navigation item
  $(".site-header a").click(function() {
    var $href = $(this).attr('href');
      $("html, body").animate({
          scrollTop: $($href).offset().top
      }, 400);
    $(".mobile-menu-icon").removeClass("open");
    if ($(window).width() < 1199) {
        $(".header-menu").removeClass("flex-c-column-max-lg");
    }
  });

    // Image slider script
  function imageSlider() {
    if( $('.lightslider').length > 0 ) {
      let slider = 0;

      $(".lightslider").each(function() {
        slider += 1;
        let $this = $(this);
        let $this_slider = $('#lightslider-'+slider);

        if ( $this.hasClass("with-pager") ) {
          $this.lightSlider({
            item      : 1,
            auto      : true,
            loop      : true,
            pauseOnHover  : true,
            speed: 600,
            pause: 3000,
            onBeforeStart: function() {
              if ( $this_slider.find('li').length < 2 ) {
                $this_slider.addClass('one-item');
              }
            },
            onSliderLoad: function() {
              $this_slider.removeClass('cS-hidden').addClass('initialized');
            },
          });
        } else {
          $this.lightSlider({
            item  : 1,
            pager : true,
            auto      : true,
            loop      : true,
            slideMargin: 0,
            pauseOnHover  : true,
            speed: 600,
            pause: 3000,
            enableTouch : false,
            enableDrag : false,
            controls: true,
            onBeforeStart: function() {
              if ( $this_slider.find('li').length < 2 ) {
                $this_slider.addClass('one-item');
              }
            },
            onSliderLoad: function() {
              $this_slider.parent().find('.lSAction > a').prepend('<div class="slider-arrow-img"></div>');
              $this_slider.removeClass('cS-hidden').addClass('initialized');
            },
            onAfterSlide: function() {
              $this_slider.find('video').each(function() {
                $(this).get(0).pause();
              });
              $this_slider.find('.btn-play').removeClass('opacity-0');
            }
          });
        }

      });

    }
  }

  imageSlider();

  $(".arrow-down").click(function() {
      $("html, body").animate({
          scrollTop: $('.site-header').height() + $('.lightslider').height()
      }, 400);
  });

  // Leave the background color of table data transparent if it is empty
  let tableData = $('.tbody > .trow > .td > span');

  for (var i = 0; i < tableData.length; i++) {
    var thisTd = tableData[i];
     if( $(thisTd).is(':empty') ) {
      $(thisTd).parent().css({'background-color': 'transparent'});
     } 
  }

  // The content of empty data in the price table 
  let priceTableData = $('.price-table > .tbody > .trow > .td > span');

  for (var i = 0; i < priceTableData.length; i++) {
    var thisTd = priceTableData[i];
     if( $(thisTd).is(':empty') ) {
      $(thisTd).html("-");
     } 
  }

  // Updates the navigation depending on scroll position
    $('a[href*="#"]').bind('click', function(e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("href"); // Set the target as variable

        // perform animated scrolling by getting bottom-position of target-element and set it as scroll target
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 600, function() {
            location.hash = target; //attach the hash (#jumptarget) to the pageurl
        });

        return false;
    });

    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
      
        // Assign active class to nav links while scrolling
        $('.section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.header-menu li.active').removeClass('active');
                $('.header-menu a').parent().eq(i).addClass('active');
            }
        });
    }).scroll();

});