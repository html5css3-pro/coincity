require('./bootstrap');

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

require('jquery.scrollbar');

$('.scrollbar').scrollbar({
	"scrollx": $('.scrollbar_x'),
    onScroll: function() {
        parallaxBackground();
        showHideScrollButtons();
    }
});

window.odometerOptions = {
    format: ' ddd'
};

$(document).ready(function() {
    parallaxBackground();

    // settings menu
    $('.js-settings').click(function(e) {
        e.preventDefault();

        $('.app').toggleClass('active-settings');
        $(this).toggleClass('active');
    });

    // close popup
    $('.js-closePopup').click(function(e) {
        e.preventDefault();

        $(this).parent().removeClass('active');
        $('.popup').removeClass('active');
    });

    // login popup
    $('.log-reg .login').click(function(e) {
        e.preventDefault();

        $('.js-log, .popup').addClass('active');
    });

    // register popup
    $('.log-reg .register').click(function(e) {
        e.preventDefault();

        $('.js-reg, .popup').addClass('active');
    });

    // advertising
    $('.js-advertising').click(function(e) {
        e.preventDefault();

        $('.app').removeClass('active-settings');
        $('.js-settings').removeClass('active');

        $('.popup-page-content.advertising, .popup').addClass('active');
    });

    $('.js-copy').click(function(e) {
        e.preventDefault();

        let advEl = $('#adv-email');
        advEl.select();
        document.execCommand("copy");

        alert(advEl.val() + ' copied to clipboard');
    });

    // feedback
    $('.js-feedback').click(function(e) {
        e.preventDefault();

        $('.app').removeClass('active-settings');
        $('.js-settings').removeClass('active');

        $('.popup-page-content.feedback .answer').empty().hide();
        $('.popup-page-content.feedback .page-content').show();
        $('.popup-page-content.feedback, .popup').addClass('active');
    });

    // footer list sorting
    footerListSort();

    // footer buttons actions (info popup and featured)
    footerButtonsActions();
    scrollToBuilt();
    scrollToFeatured();

    // scroll right/left buttons in houses section
    showHideScrollButtons();
    scrollHouses();

    newsResize();

    $('.js-closeTutorial').click(function(e){
        e.preventDefault();

        $('.app').removeClass('tutorial');
    });
});

$(window).resize(function() {
    newsResize();
});

$(document).mouseup(function (e) {
	// close popup on click free space
	var popup = $('.popup > div');
	if(popup.has(e.target).length === 0 && !popup.is(e.target)) {
		popup.removeClass('active').parent().removeClass('active');
	}

	// close settings/news popup
	var settNewsPopup = $('.settings > div, .news > div'),
		settNewsButtons = $('.js-settings, .js-news');
	if(settNewsPopup.has(e.target).length === 0 && !settNewsPopup.is(e.target) && settNewsButtons.has(e.target).length === 0 && !settNewsButtons.is(e.target)) {
		$('.app').removeClass('active-news active-settings');
		settNewsButtons.removeClass('active');
	}
});

function footerListSort() {
    $("body").on("click", ".js-listSort a", function(e) {
        e.preventDefault();
        $('.js-listSort a').removeClass("active");
        $(this).addClass('active');

        if ($(this).hasClass('new')) {
            $(".footer section").removeClass("show");
            $(".footer .new-active").addClass("show");
        }

        if ($(this).hasClass('built')) {
            $(".footer section").removeClass("show");
            $(".footer .buld-active-block").addClass("show");

            $(".buld-active-block .house-item").remove();
            $(".houses.drop .house-item").clone().appendTo(".buld-active-block.show");

            scrollToBuilt();
        }

        if ($(this).hasClass('featured')) {
            $(".footer section").removeClass("show");
            $(".footer .featured-active-block").addClass("show");

            $(".featured-active-block").find(".house-item").remove();
            $(".houses.drop").find(".house-item.house-featured").clone().appendTo(".featured-active-block");
            $(".new-active").find(".house-item.house-featured").clone().appendTo(".featured-active-block");

            scrollToFeatured();
        }
    })
}

function footerButtonsActions() {
    $("body").on("click", ".js-footerButtons .featured", function(e) {
        e.preventDefault();

        var houseID = $(this).parent(".footer-buttons").parent("header").parent(".house-item").attr('data-house-id');
        $('*[data-house-id="' + houseID + '"]').toggleClass('house-featured');
        $('*[data-house-id="' + houseID + '"]').find('.js-footerButtons').find('.featured').toggleClass('active');
    });

    $('.js-footerButtons .info').click(function(e) {
        e.preventDefault();
    });

    $('.js-footerShowHide').click(function(e) {
        e.preventDefault();

        $('.wr-houses').toggleClass('margin');
        $('.wr-footer').toggleClass('active');
    });
}

function newsResize() {
    var windowWidth = $(window).width();

    if(windowWidth < 768) {
        $('.js-news').next().css('width', (windowWidth - 30));
    } else {
        $('.js-news').next().attr('style', '');
    }
}

function isEmpty( el ){
  return !$.trim(el.html())
}

function scrollToFeatured() {
    if(isEmpty($('.featured-active-block.show'))) {
        return false;
    } else {
        $('.featured-active-block.show .house-item .footer-image').click(function(e) {
            e.preventDefault();

            var houseID = $(this).parent("section").parent(".house-item").attr('data-house-id'),
                houseScrollLeft = $('.wr-houses .houses *[data-house-id="' + houseID + '"]').position().left,
                houseWidth = $('.wr-houses .houses *[data-house-id="' + houseID + '"]').width(),
                housePaddingLeft = parseInt($('.wr-houses .houses *[data-house-id="' + houseID + '"]').css('padding-left')),
                windowWidth = $(window).width();

            $('.scrollbar.scroll-content').animate({scrollLeft: houseScrollLeft+housePaddingLeft+houseWidth/2-windowWidth/2}, 800);
        });
    }
}
function scrollToBuilt() {
    if(isEmpty($('.buld-active-block.show'))) {
        return false;
    } else {
        $('.buld-active-block.show .house-item .footer-image').click(function(e) {
            e.preventDefault();

            var houseID = $(this).parent("section").parent(".house-item").attr('data-house-id'),
                houseScrollLeft = $('.wr-houses .houses *[data-house-id="' + houseID + '"]').position().left,
                houseWidth = $('.wr-houses .houses *[data-house-id="' + houseID + '"]').width(),
                housePaddingLeft = parseInt($('.wr-houses .houses *[data-house-id="' + houseID + '"]').css('padding-left')),
                windowWidth = $(window).width();

            $('.scrollbar.scroll-content').animate({scrollLeft: houseScrollLeft+housePaddingLeft+houseWidth/2-windowWidth/2}, 800);
        });
    }
}

function showHideScrollButtons() {
    var windowWidth = $(window).width(),
        housesContainerWidth = $('.houses.drop').width(),
        currentScrollPosition = $('.scrollbar.scroll-content').scrollLeft();

    if(currentScrollPosition>0) {
        $('.js-scrollHouses.left').removeClass('disabled');
    } else {
        $('.js-scrollHouses.left').addClass('disabled');
    }
    if((currentScrollPosition + windowWidth) <= (Math.floor(housesContainerWidth) - 1)) {
        $('.js-scrollHouses.right').removeClass('disabled');
    } else {
        $('.js-scrollHouses.right').addClass('disabled');
    }
}
function scrollHouses() {

    $('.js-scrollHouses').click(function(e) {
        e.preventDefault();

        var this_ = $(this),
            housesContainerWidth = $('.houses.drop').width(),
            windowWidth = $(window).width(),
            currentScrollPosition = $('.scrollbar.scroll-content').scrollLeft(),
            widthToEnd = housesContainerWidth-currentScrollPosition-windowWidth,
            scrollAnimationTime = 800;

        if(this_.hasClass('right')) {
            if(widthToEnd<windowWidth) {
                $('.scrollbar.scroll-content').animate({scrollLeft: currentScrollPosition+widthToEnd}, scrollAnimationTime);
            } else {
                $('.scrollbar.scroll-content').animate({scrollLeft: currentScrollPosition+windowWidth}, scrollAnimationTime);
            }
        }

        if(this_.hasClass('left')) {
            if(currentScrollPosition<windowWidth) {
                $('.scrollbar.scroll-content').animate({scrollLeft: 0}, scrollAnimationTime);
            } else {
                $('.scrollbar.scroll-content').animate({scrollLeft: currentScrollPosition-windowWidth}, scrollAnimationTime);
            }
        }

        $(this_).addClass('inactive');

        setTimeout(function(){
            $(this_).removeClass('inactive');
        },scrollAnimationTime);
    });

}

// parallax mountain and lake
function parallaxBackground() {
    var windowWidth = $(window).width(),
        housesContainerWidth = $('.houses.drop').width(),
        parallaxLength = housesContainerWidth - windowWidth,
        currentScrollPosition = $('.scrollbar.scroll-content').scrollLeft();

    if (parallaxLength > 100) {
        $('.parallax-mountain').css('transform', 'translate3d(' + -(50 * currentScrollPosition / parallaxLength) + 'px, 0, 0)');
        $('.parallax-lake').css('transform', 'translate3d(' + -(100 * currentScrollPosition / parallaxLength) + 'px, 82.63158%, 0)');
    } else {
        $('.parallax-mountain').css('transform','translate3d(-26px, 0, 0)');
        $('.parallax-lake').css('transform','translate3d(-51px, 82.63158%, 0)');
    }
}

// horizontal mousewheel
require('jquery-mousewheel');
$('.scrollbar').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 30);
    e.preventDefault();
});