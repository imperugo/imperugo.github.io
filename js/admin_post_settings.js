(function($){
	$(document).ready(function() {
		var $format_quote    = $('#post-format-quote'),
			$format_video    = $('#post-format-video'),
			$video_settings  = $('.et_fable_video_settings'),
			$quote_settings  = $('.et_fable_quote_settings'),
			$format_settings = $('.et_fable_format_setting');

		$('.color-picker-hex').wpColorPicker();

		if ( $format_quote.is(':checked') )
			$quote_settings.show();

		if ( $format_video.is(':checked') )
			$video_settings.show();

		$('.post-format').change( function() {
			var $this = $(this);

			$format_settings.hide();

			if ( $this.is( '#post-format-quote' ) )
				$quote_settings.show();

			if ( $this.is( '#post-format-video' ) )
				$video_settings.show();
		} );
	});
})(jQuery)