var lang = 'en';
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
			$('[data-expand]').on('click', this.expand);
			this.lang();
			this.locationHash();
			this.enableTooltip();
			this.fullPage();
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
		lang: function() {
			lang = this.getUrlParameter('lang', 'en');
			$('.lang .text').text(lang);
		},
		enableTooltip: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		locationHash: function() {
			console.log( location.hash );
		    var hash = $(location).attr('hash').split('/')[0].replace('#', '').toLowerCase();
		    $('#activeSection').text(translate(hash));
		},
		getUrlParameter: function(name, defaultValue = '') {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? defaultValue : decodeURIComponent(results[1].replace(/\+/g, ' '));
        },
        expand: function() {
        	var element = $(this).attr('data-target');
        	$(element).parent().toggleClass('processed');
        	$(element).toggleClass('expanded');
        }
	}

	hpmedia.init();
}(jQuery));	