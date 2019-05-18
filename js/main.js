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
		return vi[text] || vi.home;
	}

	return text;
}

jQuery(document).ready(function($) {
	$.fn.textcounter = function() {
	    try {
	    	const element = $(this);
        	const limit = parseInt(element.attr('data-text-limit') || 1000);
    		element.append(`<span class="counter">0/${limit}</span>`);
			const target = element.attr('data-target');
			$(target).attr('maxlength', limit);
			$(target).keyup(function() {
			 	let length = limit - parseInt($(this).val().length);
			  	element.find('.counter').text(`${length}/${limit}`);
			});
    	} catch(ex) {
    		console.log('error:', ex);
    	}
	};

	var hpmedia = {
		init: function() {
			this.enableStuffs();
			this.lang();
			this.locationHash();
			this.fullPage();
			this.scrollTop();
			window.onhashchange = this.locationHash;
		},
		scrollToSection: function(event) {
			try {
				var section = $(this).attr('href').split('#'); 
			    section = section[section.length - 1];
			    
			    if (section && hpFullpage) {
					event.preventDefault();
			    	hpFullpage.moveTo(section);
			    }
			} catch(ex) {
				console.error(ex);
			}
		},
		scrollTop: function() {
			$('[data-scoll-top]').on('click', function() {
				$('html, body').animate({
			      scrollTop: 0
			    }, 500);
			});
		},
		fullPage: function() {
			try {
				if ($('#fullpage')) {
					hpFullpage = new fullpage('#fullpage', {
				        anchors: ['home', 'service', 'partner', 'library', 'mission', 'contact'],
				        // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C', '#C63D0F', '#1BBC9B', '#7E8F7C'],
				        navigation: true,
				        navigationPosition: 'right',
				        navigationTooltips: ['Home', 'Service', 'Partner', 'Library', 'Mission', 'Contact'],
				        slidesNavigation: true,
				    });
				}
			} catch(ex) {
				console.error(ex);
			}
		},
		lang: function() {
			lang = this.getUrlParameter('lang', 'en');
			$('.lang .text').text(lang);
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
        },
        enableStuffs: function() {
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-scroll]').on('click', this.scrollToSection);
			$('[data-expand]').on('click', this.expand);
			$('[data-text-count]').textcounter();

			$('.overlay').toggleClass('open');
			setTimeout(function() {
				$('.overlay').toggleClass('open');
			}, 1000);
			this.applySlick();
        },
        applySlick: function() {
        	// Apply carousel for one item per page
        	$('[data-slick-one]').slick({
			  	slidesToShow: 1,
			  	slidesToScroll: 1,
  				infinite: true,
  				autoplay: true,
  				autoplaySpeed: 10000,
  				arrows: false,
  				dots: false
  			});

        	// Apply carousel for library media
        	$('[data-slick]').slick({
			  	slidesToShow: 4,
			  	slidesToScroll: 4,
  				arrows: true,
  				infinite: false,
  				responsive: [
  					{
				      	breakpoint: 1200,
				      	settings: {
					        slidesToShow: 3,
					        slidesToScroll: 3,
					        arrows: true,
  							infinite: false,
					    }
				    },
				    {
				      	breakpoint: 1024,
				      	settings: {
					        slidesToShow: 3,
					        slidesToScroll: 3,
					        arrows: true,
  							infinite: false,
					    }
				    },
				    {
				      	breakpoint: 992,
				      	settings: {
					        slidesToShow: 2,
					        slidesToScroll: 2,
					        arrows: true,
  							infinite: false,
					    }
				    },
				    {
				      	breakpoint: 667,
				      	settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1,
					        arrows: true,
  							infinite: false,
					    }
				    }
				    // You can unslick at a given breakpoint now by adding:
				    // settings: "unslick"
				    // instead of a settings object
				  ]
			});

        	// Apply filter for library media
			$('[data-slick-filter]').on('click', function(event) {
				event.preventDefault();
				const target = $(this).attr('data-target');
				const type = $(this).attr('data-filter-type');

				if ($(target).hasClass('filtered')) {
                    $(target).slick('slickUnfilter');
                    $(target).slick('slickGoTo', 0);
                } else {
                    $(target).addClass('filtered');
                }

				$('[data-slick-filter]').removeClass('active');
				$(this).addClass('active');

				if ( type == '.all' || type == 'all') {
					$('.slider').removeClass('filtered');
					$(target).slick('slickUnfilter');
				} else {
					$(target).slick('slickFilter', type);
				}
				$(target).slick('slickGoTo',0);
			});

			// Apply next/prev for library media
			$('[data-slick-action]').on('click', function(event) {
				event.preventDefault();
				const target = $(this).attr('data-target');
				const type = $(this).attr('data-action-type');

				switch(type) {
					case 'prev': 
						$(target).slick('slickPrev');
						break;
					case 'next':
						$(target).slick('slickNext');	
						break;
				}
			});
        }
	}

	hpmedia.init();
}(jQuery));	