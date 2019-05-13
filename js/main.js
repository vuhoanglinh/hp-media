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
	var hpmedia = {
		init: function() {
			$('[data-scroll]').on('click', this.scrollToSection);
			this.fullPage();
			this.lang(lang || 'en');
			this.locationHash();
			this.enableTooltip();
			window.onhashchange = this.locationHash;
		},
		scrollToSection: function(event) {
			event.preventDefault();
		    var section = $(this).attr('href').replace('#', ''); 
		    // $('html, body').animate({
		    //   scrollTop: $section.offset().top - 200
		    // }, 500);
		    if (section) {
		    	hpFullpage.moveTo(section);
		    }
		},
		fullPage: function() {
			try {
				hpFullpage = new fullpage('#fullpage', {
			        anchors: ['home', 'service', 'partner', 'library', 'mission', 'contact'],
			        // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C', '#C63D0F', '#1BBC9B', '#7E8F7C'],
			        navigation: true,
			        navigationPosition: 'right',
			        navigationTooltips: ['Home', 'Service', 'Partner', 'Library', 'Mission', 'Contact'],
			        slidesNavigation: true,
			    });
			} catch(ex) {}
		},
		lang: function(value) {
			$('.lang .text').text(value);
		},
		enableTooltip: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		locationHash: function() {
			console.log( location.hash );
		    var hash = $(location).attr('hash').split('/')[0].replace('#', '').toLowerCase();
		    $('#activeSection').text(translate(hash));
		}
	}

	hpmedia.init();
}(jQuery));	