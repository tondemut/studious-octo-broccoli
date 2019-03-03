/*
  Author: Lumberjacks
  Template: Crooked (Landing Page)
  Version: 1.0
  URL: http://themeforest.net/user/Lumberjacks/
*/

"use strict";

  $(document).ready(function (){

    // setting default easing
    jQuery.easing.def = "easeInOutQuart";

    // E-mail validation via regular expression
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };

    // Ajax mailchimp
    // Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    /*
    $('#subscribe').ajaxChimp({
      language: 'lj',
      url: 'put_your_mailchimp_url_here'
    });

    // Mailchimp translation
    //
    // Defaults:
    //'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.lj = {
      'submit': 'Submitting...',
      0: '<i class="fa fa-check"></i> We will be in touch soon!',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    }
    */

    // Subscription form notifications and AJAX function
    $(function () {
      $("#subscribe").on('submit', function (event) {
        var input = $('.lj-subscribe-message');
          if(!input.is(':empty')) {
            $('.lj-subscribe-message').stop(true);
          }
          event.preventDefault();
          event.stopImmediatePropagation();

          var email = $("input#subscribe-email").val();

          if (email == "") {

            $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> You must enter a valid e-mail address.');
            $("input#subscribe-email").focus();
          } 
          else if (!isValidEmailAddress( email )) {
            $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
            $("input#subscribe-email").focus();            
          }
          else {
            $.ajax({
              type: "POST",
              url: "./php/send-subscription.php",
              data: {subscription:email},
              success: function () {
                $(".lj-subscribe-message").html('<i class="fa fa-check"></i> We will be in touch soon!');
                $('input#subscribe-email').val('');
              }
            });
          }
       });
    });
    
    // Owl Carousel
    $('.images-carousel').owlCarousel({
      margin: 5,
      dots: false,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      autoplaySpeed: 1000,
      responsiveClass:true,
      responsive:{
        0:{
            items:2
        },
        768:{
            items:3
        },
        1200:{
            items:4
        }
      }
    });

    // backstretch
    $("header").backstretch("img/bg.jpg");
    $("#team").backstretch("img/team-bg.jpg");

     // Scroll to module after menu click 
    $("a.slide").on('click', function(e) {
      e.preventDefault();
      if($('.lj-menu').is(":visible")) var offset = 69;
      else var offset = -1;
      var $this = $(this).attr('href');
      $('html,body').animate({
        scrollTop: $("header").nextAll($this).offset().top-offset},
        1250);
    });

    // Scroll to top 
    $("a.slide-top").on('click', function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0},
        1250);
    });

    // Center logo banner
    var logo_width = $(".lj-logo").width();
    var logo_offset = -(logo_width/2);
    $(".lj-logo").css({"marginLeft": logo_offset});

    // Waypoints
    $('.lj-about-1-list li').css('opacity', '0').waypoint(function(){
      $(this.element).addClass('animated fadeInLeft');
    }, {offset: '80%'});

    $('.lj-about-2-list li').css('opacity', '0').waypoint(function(){
      $(this.element).addClass('animated fadeInRight');
    }, {offset: '80%'});

    $('.lj-about-3-image').css('opacity', '0').waypoint(function(){
      $(this.element).addClass('animated fadeInUp');
    }, {offset: '70%'});

    

});

  // Hide on scroll 
  function hideOnScroll(elements, distance, offset) {
    var toHide = $(elements);
    $(window).on('scroll', function() {
      var height = $(this).scrollTop();
      toHide.css({ 
        'opacity' : (1 - (height - offset)/distance),
       });
    });
  }

  hideOnScroll('.lj-insignia', 250, 0);


  // Show on scroll
  function showOnScroll(elements, distance, offset) {
    var toHide = $(elements);
    $(window).on('scroll', function() {
      var height = $(this).scrollTop();
      toHide.css({ 
        'opacity' : (0 + (height - offset)/distance),
       });
    });
  }

  showOnScroll('.lj-overlay', 450, 200);

  // show scroll top arrow
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 500) {
        $(".lj-logo i").addClass("active");
    } else {
        $(".lj-logo i.active").removeClass("active");
    }
  });

  // Preloader
  // Change delay and fadeOut speed (in miliseconds)
  $(window).load(function() {
    $('.lj-preloader').delay(100).fadeOut(200);
    $('.lj-insignia, .lj-countdown').delay(500).animate({
      opacity: '1'
    }, 1000);

  });
