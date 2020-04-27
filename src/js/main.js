(() => {
  $(document).ready(function () {
    controlContent = new ScrollMagic.Controller();
    controlCharts = new ScrollMagic.Controller();

    /* ---- For auto change Date ---- */
    var date = new Date;
  $("#data_year").text(date.getFullYear());

  // ---------------------------------------------------------------
  //					Processing and submitting the Contact form
  // ---------------------------------------------------------------
  function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

  $('body').on("click", "#submit_lead", function (ev) {
    var form     = $('#contact_form');
    var formData = getFormData(form);

    console.log("formData", formData)

    ev.preventDefault();

    if (form.valid()) {
      $.ajax({
        url         : "/addlead",
        type        : 'POST',
        data        : JSON.stringify( formData ),
        contentType : "application/json; charset=utf-8",
        dataType    : "json",
        success : function(data){
          console.log(data);
          $.toast({
            heading            : 'Thank you!',
            text               : 'Your request is on the way. Our specialists will contact you during the 2 business days.',
            showHideTransition : 'slide',
            icon               : 'success',
            afterHidden        : function () {
              $.router.go('home');
            }
          })
        }
      });
    }
  });

    // ---------------------------------------------------------------
    //					Chenge menu color on hover
    // ---------------------------------------------------------------
    let temp_val = null;
    $('.navigation__items__a ').hover(
      e => {
        $('.hover-color').removeClass('hover-color');
        $(`.color-${e.currentTarget.getAttribute('value')}`).addClass('hover-color');
        temp_val = e.currentTarget.getAttribute('value');
      },
      ee => {
        $('.hover-color').removeClass('hover-color');
      }
    );

    $('.hamb-menu .nav-item').click(function (ev) {
      $('.hamb-menu input#toggle').trigger('click');;
    })
    $('.hamb-menu input#toggle').bind('change', function (ev) {
      $('body').toggleClass('overflow-hidden');
    });

    // $(".color-3").on("click", "a", function (event) {
    // 	event.preventDefault();
    // 	controlContent.destroy();
    // 	console.log('destroy');
    // });

    $(".color-3").click(function () {
      controlContent.destroy();
      console.log('destroy');
    });

  });

  // ---------------------------------------------------------------
  //					Appearance of the menu when scrolling
  // ---------------------------------------------------------------
  var TM = $('#nav-scroll'),
    TMheight = TM.height(),
    TMinitialOffset = TMheight * -1,
    TMtop = TMinitialOffset;

  var step = 3.5,
    stepStart = 50,
    stepStop = stepStart + TMheight * step;


  $(window).on('scroll', function () {
    animateTopMenu();
  });

  var animateTopMenu = function () {


    if ((window.location.hash === "#/about_dathena")) {
      TMtop = 0
    } else {
      var currentOffsetPos = $(this).scrollTop();

      if (currentOffsetPos < stepStart) {
        TMinitialOffset = TMheight * -1;
        TMtop = TMinitialOffset;

      } else if ((currentOffsetPos >= stepStart) &&
        (currentOffsetPos < stepStop)) {
        var offset = (currentOffsetPos - stepStart) / step;

        TMtop = TMinitialOffset + offset;

      } else {
        TMinitialOffset = TMheight * -1;
        TMtop = 0;

      };
    }

    TM.css({ top: TMtop });
  }

  animateTopMenu();

  // ---------------------------------------------------------------
  //					Button to Top move
  // ---------------------------------------------------------------
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $(document).on('click', '#toTop', function () {
    $('body, html').animate({ scrollTop: 0 }, 800);
  });

  $(document).on('click', '.navigation__items', function () {
    $('body, html').animate({ scrollTop: 0 }, 0);
  });

  // ---- Button to Top move for page Team --------
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $('#toTop2').fadeIn();
    } else {
      $('#toTop2').fadeOut();
    }
  });
  $(document).on('click', '#toTop2', function () {
    $('body, html').animate({ scrollTop: 0 }, 800);
  });

})();