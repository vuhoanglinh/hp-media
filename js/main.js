var hpFullpage = null;
var vi = {
	home: 'Trang chủ',
	service: 'Dịch vụ',
	partner: 'Đối tác',
	library: 'Thư viện',
	mission: 'Sứ mệnh',
	contact: 'Liên hệ'
};
function translate(text) {
	if (!lang) return text;

	if (lang == 'vi') {
		return vi[text] || text;
	}

	return text;
}


jQuery(document).ready(function($) {
	function scrollToSection(event) {
	    event.preventDefault();
	    var section = $(this).attr('href').replace('#', ''); 
	    // $('html, body').animate({
	    //   scrollTop: $section.offset().top - 200
	    // }, 500);
	    if (section) {
	    	hpFullpage.moveTo(section);
	    }
	}
  	$('[data-scroll]').on('click', scrollToSection);

	/**
	* Smooth Scrolling
	*/
	function fullPage() {
		hpFullpage = new fullpage('#fullpage', {
	        anchors: ['home', 'service', 'partner', 'library', 'mission', 'contact'],
	        // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C', '#C63D0F', '#1BBC9B', '#7E8F7C'],
	        navigation: true,
	        navigationPosition: 'right',
	        navigationTooltips: ['Home', 'Service', 'Partner', 'Library', 'Mission', 'Contact'],
	        slidesNavigation: true,
	    });
	}

	fullPage();

	function locationHashChanged( e ) {
	    console.log( location.hash );
	    var hash = $(location).attr('hash').split('/')[0].replace('#', '').toLowerCase();
	    $('#activeSection').text(translate(hash));
	}

	window.onhashchange = locationHashChanged;
	locationHashChanged();
}(jQuery));	