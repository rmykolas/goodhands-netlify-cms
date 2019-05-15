jQuery(document).ready(function($) {

	$(function() {
        $('.lazy').Lazy();
    });

	$('body').addClass('loaded');
	AOS.init({
      once: true,
      duration: 500,
      easing: 'ease-in-sine'
    });

    $('.video-trigger').modaal({
		type: 'video'
	});

	$('.header__menu-trigger').on('click', function(){
		$('.header__menu-trigger, .header__cta, .header__home-link, .menu').toggleClass('active');
		$('.header__home-link, .site-content, .footer').toggleClass('blur');
		if( $('.menu').hasClass('active') ){
			$.scrollLock( true );
		} else {
			$.scrollLock( false );
		}
	});

	$('.site-content, .footer').on('click', function(){
		$('.menu, .header__menu-trigger').removeClass('active');
		$('.header__home-link, .site-content, .footer').removeClass('blur');
		$('.header__cta').addClass('active');
		if( $('.menu').hasClass('active') || $('.modal-form').hasClass('active') ){
			$.scrollLock( true );
		} else {
			$.scrollLock( false );
		}
	});

	$('.form__close').on('click', function(){
		$('.modal-form').removeClass('active');
		$('.header, .site-content, .footer, .menu').removeClass('blur-form');
		if( $('.menu').hasClass('active') || $('.modal-form').hasClass('active') ){
			$.scrollLock( true );
		} else {
			$.scrollLock( false );
		}
	});

	$('a[data-form]').on('click', function(){
		$('.header, .site-content, .footer, .menu').toggleClass('blur-form');
		var form = $(this).data('form');
		$('.modal-form[data-form="'+ form +'"]').toggleClass('active');

		if( $('.modal-form').hasClass('active') ){
			$.scrollLock( true );
		} else {
			$.scrollLock( false );
		}
	});

	$(document).click(function(event) {
	  //if you click on anything except the modal itself or the "open modal" link, close the modal
	  if (!$(event.target).closest('.modal-form .row, a[data-form]').length) {
	    $('body').find('.modal-form').removeClass('active');
	    $('.header, .site-content, .footer, .menu').removeClass('blur-form');
	  }
	});

	$('.fullscreen-choice-trigger').on('click', function(){
		$(this).next('.fullscreen-choice').toggleClass('active');
	});

	$('.fullscreen-choice__trigger').on('click', function(){
		$(this).parents('.fullscreen-choice').removeClass('active');
	});

	$('.fullscreen-choice__trigger--radio').on('click', function(){
		event.preventDefault();
	    var radio = $(".fullscreen-choice__budget input:radio:checked").data("name");
	    $('input[name="budget"]').val(radio);
	});

	$('.fullscreen-choice__trigger--checkbox').on('click', function(){
		event.preventDefault();
	    var checkboxes = $(".fullscreen-choice__interests input:checkbox:checked").map(function(){
	      return $(this).attr("name");
	    }).get();

	    if (checkboxes.length > 2) {
	    	$('input[name="interests"]').val(checkboxes.slice(0,2).join(', ') + '...');
	    } else {
	    	$('input[name="interests"]').val(checkboxes.join(', '));
	    }
	});

	$('.form-submit').on('click', function(){
		$('#'+$(this).attr('form')).addClass('validate');
	});

	// When any radio button on the page is selected,
    // then deselect all other radio buttons.
 	$('input[type=radio]').change(function() {
    	$('input[type=radio]:checked').not(this).prop('checked', false);
    });

 	if( $('.footer').length ) {
		var inview = new Waypoint.Inview({
		  element: $('.footer')[0],
		  enter: function(direction) {
		    $('.fixed').fadeOut();
		  },
		  exited: function(direction) {
		    $('.fixed').fadeIn();
		  }
		});
	}

	var $light = $('.bg--light');
	var $dark = $('.bg--dark');
	var $section = $('section');

	$light.waypoint(function(direction) {
	  if (direction === 'down') {
	    $('.header').removeClass('dark');
	  }
	}, {
	  offset: '0'
	});

	$light.waypoint(function(direction) {
	  if (direction === 'up') {
	    $('.header').removeClass('dark');
	  }
	}, {
	  offset: function() {
	    return -this.element.clientHeight
	  }
	});

	$dark.waypoint(function(direction) {
	  if (direction === 'down') {
	    $('.header').addClass('dark');
	  }
	}, {
	  offset: '0'
	});

	$dark.waypoint(function(direction) {
	  if (direction === 'up') {
	    $('.header').addClass('dark');
	  }
	}, {
	  offset: function() {
	    return -this.element.clientHeight
	  }
	});

	var next = null;

	$section.waypoint(function(direction) {
	  if (direction === 'down') {
	    if($(this.element).next('section').length) {
	    	next = $(this.element).next('section');
	    }
	  }
	}, {
	  offset: '10%'
	});

	$section.waypoint(function(direction) {
	  if (direction === 'up') {
	    if($(this.element).next('section').length) {
	    	next = $(this.element).next('section');
	    }
	  }
	}, {
	  offset: function() {
	    return -this.element.clientHeight
	  }
	});

	$('.fixed__arrow').on('click', function(){
		$('html, body').animate({scrollTop: $(next).offset().top}, 500, 'linear');
	});

	$( ".text--cta" ).prepend( '<object id="circle-cta" type="image/svg+xml" data="/assets/img/circle-cta.svg"></object>' );

	$( ".text--cta-responsive" ).prepend( '<object id="circle-cta-responsive" type="image/svg+xml" data="/assets/img/circle-cta.svg"></object>' );


	if( $('#circle-cta').length ) {
		new Vivus('circle-cta', {duration: 150});
	}

	if( $('#circle-cta-responsive').length ) {
		new Vivus('circle-cta-responsive', {duration: 150});
	}

	if( $('#circle').length ) {
		new Vivus('circle', {duration: 100});
	}
	if( $('#arrow').length ) {
		new Vivus('arrow', {duration: 50, type: 'oneByOne'});
	}
	if( $('#chat').length ) {
		new Vivus('chat', {duration: 50});
	}

	$( ".draggable" ).draggable();


	var $anyButtons = $('.work-filters--expanded').find('button[data-filter=""]');
	var $buttons = $('.work-filters--expanded button');

	var availableFilters = $('button[data-filter]').map(function () {
		return $(this).attr('data-filter');
	});

	// init Isotope
	var $grid = $('.work-grid').isotope({
	  itemSelector: '.col'
	});

	// store filter for each group
	var rawHash = getHashFilter().replace('#', '.').split('-').join(',.');
	var fixedHash = rawHash.split(',');

	if(window.location.hash) {
	  filters = fixedHash;
	} else {
	  filters = [];
	}

	// change is-checked class on buttons
	$('.work-filters--expanded').on( 'click', 'button', function( event ) {
	  var $target = $( event.currentTarget );
	  $target.toggleClass('is-checked');
	  var isChecked = $target.hasClass('is-checked');
	  var filter = $target.attr('data-filter');

	  if ( isChecked ) {
	    addFilter( filter );
	  } else {
	    removeFilter( filter );
	  }

	  categoryCount( filters );
	  
	  var filterValue = filters.join('-');
	  location.hash =  encodeURIComponent( filterValue.split('.').join('') );
	  // filter isotope
	  // group filters together, inclusive
	  $grid.isotope({ filter: filters.join(',') });
	});

	//isotope filter on each change of hash in the url
	function onHashchange() {
		var hashFilter = getHashFilter().replace('#', '.');
		// filter isotope
		var fixed = hashFilter.split('-').join(',.');
			$grid.isotope({
			filter: fixed,
		});

		filters = fixed.split(',');

		var common = $.grep(availableFilters, function(element) {
			return $.inArray(element, filters ) !== -1;
		});

		categoryCount( common );


		$('.button').removeClass('is-checked');
		hashButtonStyle();
	}

	//update the checked button styles, based on the hash
	function hashButtonStyle() {
		var hashFilter = getHashFilter().replace('#', '');
		if ( hashFilter ) {
		  var hashFilters = hashFilter.split('-');
		  var count = 0;
		  hashFilters.forEach( function( filter ) {
		    var $button = $buttons.filter('[data-filter=".' + filter + '"]');
		    $('.button--reset').removeClass('is-checked');
		    $button.addClass( 'is-checked' );
		  });
		}
	}

	//count the categories selected
	function categoryCount( filter ) {
		if (filter.length == 1) {
	  	$('.showing-what').html(filter.length + ' category');
	  	$('.button--reset').removeClass('is-checked');
	  	$('.showing').html('Showing:');
	  } else if(filter.length > 1) {
	  	$('.showing-what').html(filter.length + ' categories');
	  	$('.button--reset').removeClass('is-checked');
	  	$('.showing').html('Showing:');
	  } else {
	  	$('.showing-what').html('Everything');
	  	$('.button--reset').addClass('is-checked');
	  	$('.showing').html('Show me:');
	  	history.pushState("", document.title, window.location.pathname);
	  }
	}

	//get the hash from the url
	function getHashFilter() {
	  var hash = location.hash;
	  var matches = location.hash.match( /([^&]+)/i );
	  if ( !matches ) {
	    return '';
	  }
	  return decodeURIComponent( matches[1] );
	}

	function addFilter( filter ) {
	  if ( filters.indexOf( filter ) == -1 ) {
	    filters.push( filter );
	  }
	}

	function removeFilter( filter ) {
	  var index = filters.indexOf( filter);
	  if ( index != -1 ) {
	    filters.splice( index, 1 );
	  }
	}

	//run everything on hash change
	$(window).on( 'hashchange', onHashchange );

	//if the url has a hash, run the filtering functions
	if(window.location.hash) {
		onHashchange();
		hashButtonStyle();
    }

	$('.button--reset').on( 'click', function() {
		$(this).addClass('is-checked');
		// reset filters
		filters = [];
		$grid.isotope({ filter: '*' });
		// reset buttons
		$buttons.removeClass('is-checked');
		$anyButtons.addClass('is-checked');
		$('.showing').html('Show me:');
		$('.showing-what').html('Everything');
		history.pushState("", document.title, window.location.pathname);
	});

	$('.work-filter-toggle').on( 'click', function() {
		$('.work-filters').toggleClass('hidden');
		$('.work-filters--expanded').toggleClass('active');		
	});

	/*
	 * Replace all SVG images with inline SVG
	 */
	jQuery('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};


	// Fire.
	window.onload = function() {
	  //workFilterFn();
	};

	// And recheck when window gets resized.
	//window.addEventListener('resize', workFilterFn);
	//window.addEventListener('resize', waypointDirectionFn);

});
