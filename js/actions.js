$(document).ready(function(){
	$('.sliderSlick').slick({
		  infinite: true,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  nextArrow: $('.nextArrow'),
		  prevArrow: $('.previousArrow'),
		  autoplay: true,
		  autoplaySpeed: 4000,
		  responsive: [
			
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					  }
					},
					{
					  breakpoint: 600,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
					// You can unslick at a given breakpoint now by adding:
					// settings: "unslick"
					// instead of a settings object
				  ]
	});
	
	$('.headerSlideHolder').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 4000,
		  dots: true,
		  arrows: false,
	});
	
	$('.testimonialsSlider').randomize().slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay: false,
		  dots: false,
		  nextArrow: $('.nextArrowTestim'),
		  prevArrow: $('.previousArrowTestim'),
	});
	
	$('.menuButton').click(function(){
		$('nav > .menuFloat').slideToggle();
	});

	$('.language .menuFloat').hide();
	$('.language .menuText').click(function(){
		$('.language .menuFloat').slideToggle();
	});

    showElems();

	//add icon if resource img is missing
    $('.resources a:not(:has(".resourcePics"))').append('<i class="resourceIcon fa fa-file-text-o"></i>');
	if ($(window).width() > 765) {
		$('.resourceIcon').css('line-height',$('.resources .resourcePics').height() + 'px');
	}else{
		$('.resourceIcon').css('line-height', 70 +  'px');
	}
	
	//Icons hover
	$('.aboutUsIconHolder img').bind('mouseenter mouseleave', function() {
	    $(this).attr({
	        src: $(this).attr('data-hover') 
	        , 'data-hover': $(this).attr('src') 
	    })
	});
	
	//

	
	$('#videoModal').on('shown.bs.modal', function() { 
	    $(this).find('video')[0].play();
	});
	
	$( '.pulseIcon' ).hover(
		function() {
			$( this ).addClass( "animated pulse" );
		}, function() {
			$( this ).removeClass( "animated pulse" );
		}
	);
});

$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function (childA, childB) {
            // * Prevent last slide from being reordered
            if($(childB).index() !== $(this).children(selector).length - 1) {
                return Math.round(Math.random()) - 0.5;
            }
        }.bind(this)).detach().appendTo(this);
    });

    return this;
};

function showElems(){
	if ($('.animatedContainer').visible(true,true)){
		 var time = 0;
	 	 $('.animatedContainer').each(function() {                 
	 	     var $this  = $(this);
	 	     var animation= $(this).attr('data-animation');
	 	     function delayed() {
	 	    	 $this.addClass('animated ' + animation);
	 	     }
	 	     setTimeout( delayed , time );
	 	     time += 100;
	 	 });
 	 }
}

function setSearchPosition() {
	var menuHeight = $('nav').innerHeight();
	$('.search').css('top', (menuHeight/2));
	console.log(menuHeight);
}

$( window ).resize(function() {
	if ($(window).width() < 901) {
		$('.menuButton').show();
	}
	else {
	   $('.menuButton').hide();
	   $('.menuFloat').show();
	}	
	
	if ($(window).width() > 765) {
		$('.resourceIcon').css('line-height',$('.resources .resourcePics').height() + 'px');
	}else{
		$('.resourceIcon').css('line-height', 70 + 'px');
	}
	$('.language .menuFloat').hide();

	//setSearchPosition();
});

$(window).scroll(function() {
  if($(window).scrollTop() >= $('#headerWrap').offset().top + $('#headerWrap').outerHeight() - window.innerHeight) {
	  $('.menuIndex').addClass('sticky');
	//  setSearchPosition();
  }
  if($(window).scrollTop() == 0){
	  $('.menuIndex').removeClass('sticky');
	 // setSearchPosition();
  }
  showElems();

});