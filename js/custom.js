(function($){
	$(document).ready( function(){

		// $('a[data-event-label]').on('click', function() {

		// 	var eventCategory = $(this).attr("data-event-category");

		// 	if(!eventCategory){
		// 		eventCategory = 'Uncategorized';
		// 	}

		//   ga('send', 'event', eventCategory, 'click', $(this).attr('data-event-label'),1);
		// });

		$('a[data-event-label]').mousedown(function() {

			var eventCategory = $(this).attr("data-event-category");

			if(!eventCategory){
				eventCategory = 'Uncategorized';
			}

		  ga('send', 'event', eventCategory, 'click', $(this).attr('data-event-label'),1);
		});



		$('a').each(function() {
		   var a = new RegExp('/' + window.location.host + '/');
		   if(!a.test(this.href)) {
		       $(this).click(function(event) {
		           event.preventDefault();
		           event.stopPropagation();
		           window.open(this.href, '_blank');
		       });
		   }
		});

		var $et_top_menu   = $( 'ul.nav' ),
			$comment_form  = $( '#commentform' );

		$et_top_menu.superfish({
			delay		: 500, 										// one second delay on mouseout
			animation	: { opacity : 'show', height : 'show' },	// fade-in and slide-down animation
			speed		: 'fast', 									// faster animation speed
			autoArrows	: true, 									// disable generation of arrow mark-up
			dropShadows	: false										// disable drop shadows
		});

		if ( $('ul.et_disable_top_tier').length ) $("ul.et_disable_top_tier > li > ul").prev('a').attr('href','#');

		// Fixes Firefox issue with css animations, affecting iframe videos
		$( '.et-video-box iframe' ).each( function() {
			var $this     = $(this),
				src       = $this.attr( 'src' ),
				separator = -1 !== src.indexOf( '?' ) ? '&' : '?';

			$this.attr( 'src', src + separator + 'wmode=transparent' );
		} );

		$( '.video-image .video-play' ).click( function() {
			var $this        = $(this),
				$video_image = $this.closest( '.video-image' );

			$video_image.fadeTo( 500, 0, function() {
				var $image = $(this);

				$image
					.css( 'display', 'none' )
					.siblings( '.et-video-box' ).css( { 'opacity' : 0, 'display' : 'block' } ).fadeTo( 500, 1 );
			} );

			return false;
		} );

		if ( $.fn.waypoint ) {
			$( '.entry, .comment' ).waypoint( {
				offset: '67%',
				handler: function() {
					$(this).addClass( 'et-animated' );
				}
			} );

			$( '.et-main-gallery' ).each( function() {
				var $this = $(this),
					delay = 0;

				// Animates gallery images one at a time
				$this.find('li').each( function() {
					$(this).css( {
						'-webkit-transition-delay' : delay + 's',
						'-moz-transition-delay'    : delay + 's',
						'-ms-transition-delay'     : delay + 's',
						'-o-transition-delay'      : delay + 's',
						'transition-delay'         : delay + 's'
					} );

					delay += 0.4;
				} );
			} );
		}

		et_duplicate_menu( $('ul.nav'), $('#main-header .container .mobile_nav'), 'mobile_menu', 'et_mobile_menu' );

		function et_duplicate_menu( menu, append_to, menu_id, menu_class ){
			var $cloned_nav;

			menu.clone().attr('id',menu_id).removeClass().attr('class',menu_class).appendTo( append_to );
			$cloned_nav = append_to.find('> ul');
			$cloned_nav.find('.menu_slide').remove();
			$cloned_nav.find('li:first').addClass('et_first_mobile_item');

			append_to.click( function(){
				if ( $(this).hasClass('closed') ){
					$(this).removeClass( 'closed' ).addClass( 'opened' );
					$cloned_nav.slideDown( 500 );
				} else {
					$(this).removeClass( 'opened' ).addClass( 'closed' );
					$cloned_nav.slideUp( 500 );
				}
				return false;
			} );

			append_to.find('a').click( function(event){
				event.stopPropagation();
			} );
		}

		(function et_search_bar(){
			var $searchinput = $("#et-search-form #search_input"),
				searchvalue = $searchinput.val();

			$searchinput.focus(function(){
				if (jQuery(this).val() === searchvalue) jQuery(this).val("");
			}).blur(function(){
				if (jQuery(this).val() === "") jQuery(this).val(searchvalue);
			});
		})();

		$comment_form.find('input:text, textarea').each(function(index,domEle){
			var $et_current_input = jQuery(domEle),
				$et_comment_label = $et_current_input.siblings('label'),
				et_comment_label_value = $et_current_input.siblings('label').text();
			if ( $et_comment_label.length ) {
				$et_comment_label.hide();
				if ( $et_current_input.siblings('span.required') ) {
					et_comment_label_value += $et_current_input.siblings('span.required').text();
					$et_current_input.siblings('span.required').hide();
				}
				$et_current_input.val(et_comment_label_value);
			}
		}).bind('focus',function(){
			var et_label_text = jQuery(this).siblings('label').text();
			if ( jQuery(this).siblings('span.required').length ) et_label_text += jQuery(this).siblings('span.required').text();
			if (jQuery(this).val() === et_label_text) jQuery(this).val("");
		}).bind('blur',function(){
			var et_label_text = jQuery(this).siblings('label').text();
			if ( jQuery(this).siblings('span.required').length ) et_label_text += jQuery(this).siblings('span.required').text();
			if (jQuery(this).val() === "") jQuery(this).val( et_label_text );
		});

		// remove placeholder text before form submission
		$comment_form.submit(function(){
			$comment_form.find('input:text, textarea').each(function(index,domEle){
				var $et_current_input = jQuery(domEle),
					$et_comment_label = $et_current_input.siblings('label'),
					et_comment_label_value = $et_current_input.siblings('label').text();

				if ( $et_comment_label.length && $et_comment_label.is(':hidden') ) {
					if ( $et_comment_label.text() == $et_current_input.val() )
						$et_current_input.val( '' );
				}
			});
		});
	});
})(jQuery)
