$(document).ready(function() {
    var scrollIsAnimated = false;
    const userHttp = new UserHttp();
    userHttp.setAuth();
    gallery = new Gallery();
    $(document).click(function(e) { $('body').removeClass('isSidedMenu');
        $('.accountPopupContainer').removeClass('accountPopupContainerIsVisible'); })
    $('.checkAgreeContainer input').change(function() { $(this).closest('.checkAgreeContainer').removeClass('invalidInput') })
    $('input').attr('data-lpignore', 'true');

    function sideMenuScrollRefresh() { $('.sideMenuContainer').css({ padding: '1px' });
        $('.sideMenuContainer').css({ padding: '0' }); }
    sideMenuScrollRefresh();
    positionBlur();

    function positionBlur() {
        if ($(document).scrollTop() > 20) { $('body').addClass('header_scrolled'); } else { $('body').removeClass('header_scrolled'); };
    }
    let activeScrollData = 'aboutProjectBlock';

    function scrollLinkCheck() {
        if ($(document).scrollTop() < ($('#welcomeBlock').height())) { $('.sideNavCircle').removeClass('sideNavCircle-active');
            $('.sideNavCircle').eq(0).addClass('sideNavCircle-active');
            activeScrollData = 'welcomeBlock'; } else if ($(document).scrollTop() > ($('#welcomeBlock').height()) && ($(document).height() - $(window).height()) != Math.ceil($(document).scrollTop())) {
            $('.header-links .scrollLink').each(function(index) {
                if ($(document).scrollTop() > $('#' + $(this).attr('data-scrollto')).offset().top && $(document).scrollTop() < ($('#' + $(this).attr('data-scrollto')).offset().top + $('#' + $(this).attr('data-scrollto')).height())) {
                    if ($(this).attr('data-scrollto') != '' && activeScrollData != $(this).attr('data-scrollto')) {
                        activeScrollData = $(this).attr('data-scrollto');
                        $('.headerNavigator').animate({ width: $(this).find('span').width(), left: $(this).find('span').offset().left }, 200)
                        $('.sideNavCircle').removeClass('sideNavCircle-active');
                        $('.sideNavCircle').eq($('.header-links .scrollLink').index(this) + 1).addClass('sideNavCircle-active');
                        $('.sideMenu-nav li').removeClass('sideMenu-nav_active');
                        $('.sideMenu-nav li').eq(index).addClass('sideMenu-nav_active');
                    }
                }
            });
        } else if (($(document).height() - $(window).height()) == Math.ceil($(document).scrollTop())) {
            activeScrollData = 'contactsBlock';
            $('.headerNavigator').animate({ width: $('.header-links .scrollLink').eq(4).find('span').width(), left: $('.header-links .scrollLink').eq(4).find('span').offset().left }, 200)
            $('.sideNavCircle').removeClass('sideNavCircle-active');
            $('.sideNavCircle:last-child').addClass('sideNavCircle-active');
            $('.sideMenu-nav li').removeClass('sideMenu-nav_active');
            $('.sideMenu-nav li:last-child').addClass('sideMenu-nav_active');
        }
    }

    function scrollEvent() { positionBlur(); if (!scrollIsAnimated) scrollLinkCheck(); }
    $(document).on('scroll', scrollEvent);
    $(document).on('resize', scrollEvent);
    if ($('.welcome').height() != window.innerHeight) $('.welcome').height($('.welcome').height());
    $('.headerNavigator').css({ 'display': 'block', 'left': $('.header-links .scrollLink').eq(0).offset().left, 'width': $('.header-links .scrollLink').eq(0).width() })
    const scrollTo = (id) => {
        $('body').removeClass('isSidedMenu');
        let positionScroll = $('#' + id).offset().top;
        let headerHeight = $('.header').outerHeight();
        let scrollTopSize = positionScroll - headerHeight;
        if (id == 'galleryBlock') { scrollTopSize = positionScroll - headerHeight + parseInt($('#galleryBlock').css("border-top-width")); }
        if (id == 'communityBlock') { scrollTopSize = positionScroll - headerHeight - 10; }
        if (id == 'aboutUsBlock') { scrollTopSize = positionScroll - headerHeight - (($(window).height() - $('#aboutUsBlock').height()) / 4); }
        $("html, body").animate({ scrollTop: scrollTopSize }, { duration: 200, start: function() { scrollIsAnimated = true; }, complete: function() { setTimeout(function() { scrollIsAnimated = false; }, 300) } });
        $('.headerNavigator').css({ 'left': id == 'welcomeBlock' ? $(".header-links .scrollLink").eq(0).offset().left : $(".header-links .scrollLink[data-scrollto='" + id + "']").offset().left, 'width': id == 'welcomeBlock' ? $(".header-links .scrollLink").eq(0).width() : $(".header-links .scrollLink[data-scrollto='" + id + "']").width() })
        $('.sideMenu-nav li').removeClass('sideMenu-nav_active');
        if (id == 'welcomeBlock') $('.sideMenu-nav li').eq(0).addClass('sideMenu-nav_active')
        else $('.sideMenu-nav li[data-scrollto="' + id + '"]').addClass('sideMenu-nav_active');
    }
    $('.sideMenu').click(function() { event.stopPropagation(); });
    $(".sideMenu-nav li").click(function(event) { event.stopPropagation();
        scrollTo(this.getAttribute('data-scrollto')); });
    $(".header-links .scrollLink").click(function(event) { event.preventDefault();
        event.stopPropagation();
        scrollTo(this.getAttribute('data-scrollto'));
        $('.sideNavCircle').removeClass('sideNavCircle-active');
        $('.sideNavCircle').eq($('.header-links .scrollLink').index(this) + 1).addClass('sideNavCircle-active'); });
    $(".sideNavCircle").click(function(event) { event.preventDefault();
        event.stopPropagation();
        scrollTo(this.getAttribute('data-scrollto'));
        $('.sideNavCircle').removeClass('sideNavCircle-active');
        $(this).addClass('sideNavCircle-active'); });
    $('.logo').click(function() { scrollTo(this.getAttribute('data-scrollto'));
        $('.sideNavCircle').removeClass('sideNavCircle-active');
        $('.sideNavCircle').eq(0).addClass('sideNavCircle-active'); });
    if (window.location.hash && window.location.hash.replace('#', '') != 'modalImage') {
        const modalName = window.location.hash.replace('#', '')
        $('body').addClass('isModaled');
        $('.modalWrap').each(function(index) { $(this).removeClass('visibleModal'); });
        $('.' + modalName).addClass('visibleModal');
    }
    const urlParams = new URLSearchParams(window.location.search);
    const recoveryCode = urlParams.get('recoveryCode');
    if (recoveryCode) { $('body').addClass('isModaled');
        $('.modalWrap').each(function(index) { $(this).removeClass('visibleModal'); });
        $('.modalRestorePasswordNew').addClass('visibleModal'); }
    $('#videoTrailer').click(function(e) { e.stopPropagation(); })
    let prevModal = '';
    let currGallery = ''
    let currGalleryImageCount = 0;
    let activeFilterInGallery = '';
    $(".modalOpens").click(function(event) {
        var clickedTag = this;
        event.preventDefault();
        if ($(clickedTag).attr('data-modal_name') == 'modalImage') {
            if ($(clickedTag).hasClass('squareImage')) $('.modalImage_imageContainer').addClass('squareImage')
            else $('.modalImage_imageContainer').removeClass('squareImage')
            if ($(clickedTag).attr('data-is_video') == '1') { $('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $(clickedTag).attr('data-video_src') + '?loop=0"></iframe>') }
            currGallery = $(clickedTag).parent().attr('data-images_container');
            $('.modalImage_imageContainer').css('background-image', $(clickedTag).css('background-image').replace('/small-images', ''));
            if (currGallery == 'gallery') {
                if (gallery.galleryFilter == '') { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').index(clickedTag); } else { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').index(clickedTag); }
            } else if (currGallery != '' && currGallery != 'gallery') { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').index(clickedTag); }
        }
        $('body').addClass('isModaled');
        $('.modalWrap').each(function(index) { $(this).removeClass('visibleModal'); });
        $('.' + $(clickedTag).data('modal_name')).addClass('visibleModal');
        prevModal = $(clickedTag).attr('data-prev_modal') || '';
        window.location.hash = $(clickedTag).data('modal_name');
        $('body').removeClass('isSidedMenu');
        if ($('video').length > 0 && $(clickedTag).attr('data-modal_name') == 'modalVideoTrailer') { $('#videoTrailer').get(0).play(); }
    });
    $(".crossIcon").click(function(e) { e.preventDefault();
        e.stopPropagation();
        closeModal(); });
    $(".modalImageContainer").click(function(e) { e.preventDefault();
        e.stopPropagation();
        closeModal(); });

    function closeModal() {
        $('.modalWrap').each(function(index) { $(this).removeClass('visibleModal'); });
        if (prevModal == '') { $('body').removeClass('isModaled');
            history.pushState("", document.title, window.location.href.substr(0, window.location.href.indexOf('#'))); } else { $('.' + prevModal).addClass('visibleModal');
            window.location.hash = prevModal; }
        $('.modalImage_imageContainer').empty();
        prevModal = '';
        if ($('video').length > 0) { $('#videoTrailer').get(0).pause();
            $('#videoTrailer').get(0).currentTime = 0; }
    }
    $('.modalImage_imageContainer').click(function(e) { e.stopPropagation(); })
    $('.modalImageLeft').click((e) => {
        e.stopPropagation();
        currGalleryImageCount--;
        $('.modalImage_imageContainer').empty();
        if (currGalleryImageCount < 0) {
            if (currGallery == 'gallery') {
                if (gallery.galleryFilter == '') { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').length - 1; } else { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').length - 1; }
            } else if (currGallery != '' && currGallery != 'gallery') { currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').length - 1; }
        }
        if (currGallery == 'gallery') {
            if (gallery.galleryFilter == '') { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); if ($('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-is_video') == '1') { $('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>') } } else { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); if ($('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).attr('data-is_video') == '1') { $('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>') } }
        } else if (currGallery != '' && currGallery != 'gallery') { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); }
    })
    $('.modalImageRight').click((e) => {
        e.stopPropagation();
        currGalleryImageCount++;
        $('.modalImage_imageContainer').empty();
        if (currGallery == 'gallery') {
            if (gallery.galleryFilter == '') { if (currGalleryImageCount == $('div[data-images_container="' + currGallery + '"] div').length) currGalleryImageCount = 0; } else { if (currGalleryImageCount == $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').length) currGalleryImageCount = 0; }
        } else if (currGallery != '' && currGallery != 'gallery') { if (currGalleryImageCount > $('div[data-images_container="' + currGallery + '"] div').length - 1) { currGalleryImageCount = 0; } }
        if (currGallery == 'gallery') {
            if (gallery.galleryFilter == '') { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); if ($('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-is_video') == '1') { $('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>') } } else { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); if ($('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).attr('data-is_video') == '1') { $('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + gallery.galleryFilter + '"]').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>') } }
        } else if (currGallery != '' && currGallery != 'gallery') { $('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image').replace('/small-images', '')); }
    })
    $('.avatarContainer, .accountPopupContainer').click(function(e) { e.stopPropagation();
        $('.accountPopupContainer').addClass('accountPopupContainerIsVisible'); })
    let modalInstructionsStep = 0;
    let isDisabledMovingInstructions = false;

    function moveModalInstructions(newStep) {
        if (newStep >= 0 && newStep < 5 && !isDisabledMovingInstructions) {
            modalInstructionsStep = newStep;
            isDisabledMovingInstructions = true;
            $('.modalInstructions-circlesNavigation').removeClass('modalInstructions-circlesNavigation_active');
            $('.modalInstructions-circlesNavigation').eq(newStep).addClass('modalInstructions-circlesNavigation_active');
            $('.modalHeader-title span').text("Шаг " + (newStep + 1));
            $('.modalInstructions-arrowLeft').removeClass('modalInstructions-arrowDisabled');
            if (newStep == 0) $('.modalInstructions-arrowLeft').addClass('modalInstructions-arrowDisabled');
            if (newStep >= 4) { $('.modalFooter .modalInstructions-arrowRight span').text('ЗАВЕРШИТЬ');
                $('.modalFooter .modalInstructions-arrowRight img').css({ display: 'none' }); if ($(window).width() <= 1280) { $('.modalFooter .modalInstructions-arrowRight span').css({ display: 'block' });
                    $('.modalInstructions-circlesNavigations').css({ display: 'none' }); } } else { $('.modalFooter .modalInstructions-arrowRight span').text('СЛЕДУЮЩИЙ ШАГ');
                $('.modalFooter .modalInstructions-arrowRight img').css({ display: 'inline-block' }); if ($(window).width() <= 1280) { $('.modalFooter .modalInstructions-arrowRight span').css({ display: 'none' });
                    $('.modalInstructions-circlesNavigations').css({ display: 'flex' }); } }
            $('.modalInstructionsInner-gallery').animate({ left: (-100 * newStep) + '%' }, { duration: 200, easing: 'linear', complete: function() { isDisabledMovingInstructions = false; } });
        }
    }
    $('.modalInstructions-circlesNavigation').click(function() { moveModalInstructions(parseInt($(this).text()) - 1); })
    $('.modalInstructions-arrowLeft').click(function() { moveModalInstructions(modalInstructionsStep - 1); })
    $('.modalInstructions-arrowRight').click(function() {
        if (modalInstructionsStep > 3) { closeModal(); } else { moveModalInstructions(modalInstructionsStep + 1); }
    })
    $('.modalPaymentInfoActivator').click(function() { if (!$('.modalPayment').hasClass('paymentIsDesced') && !$('body').hasClass('isUnregUser')) $('.modalPayment').addClass('paymentIsDesced'); })
    $('.paymentDescBlock-return').click(function() { if ($('.modalPayment').hasClass('paymentIsDesced') && !$('body').hasClass('isUnregUser')) $('.modalPayment').removeClass('paymentIsDesced'); })
    $('.mobileActivator').click(function(e) { e.stopPropagation();
        $('body').addClass('isSidedMenu'); })
    $('.mobileDisactivator').click(function(e) { e.stopPropagation();
        $('body').removeClass('isSidedMenu'); })

    function shake(thing) {
        const interval = 5;
        const distance = 2;
        const times = 3;
        for (var i = 0; i < (times + 1); i++) { $(thing).animate({ left: (i % 2 == 0 ? distance : distance * -1) }, interval); }
        $(thing).animate({ left: 0, top: 0 }, interval);
    }
    $('.inputFieldWrapper input, .inputFieldWrapper textarea').focusin(function() { const that = this; if (!$(that).val()) { $(that).parent().addClass('inputFieldWrapper_active') } });
    $('.inputFieldWrapper input, .inputFieldWrapper textarea').focusout(function() { const that = this; if (!$(that).val()) { $(that).parent().removeClass('inputFieldWrapper_active') } });
    let imagesArr = [];

    function readURL(input) {
        fdSupport = new FormData();
        var files = $('.uploaderImages')[0].files;
        fdSupport.append('file', files);
        if (input.files && input.files[0]) {
            let imagesArr = [];
            let imagesTags = '';
            for (let i = 0; i < input.files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => { imagesTags += '<div class="uploadImageContainer" style="background-image: url(' + e.target.result + ')" data-base_img="' + e.target.result + '"></div>'; if (i == input.files.length - 1) { $('.uploadImages').append(imagesTags);
                        $('.uploadImageContainer').click(function() { $(this).remove(); }) } }
                reader.readAsDataURL(input.files[i]);
            }
        }
    }
    $(".uploaderImages").change(function() { readURL(this); });
    $('.btnStartGame').click(function() { trackDownload(); })

    function getServers() {
        $.get("загрузка.json", (data) => {
            let serversData = '';
            let serverOnlineFull = 0;
            for (let i = 0; i < data.data.length; i++) { serversData += '<div class="serverContainer server-' + data.data[i].id + '"><div class="serverContainer-logo"><img src="./assets/images/server-' + data.data[i].id + '.png" /></div><div class="serverContainer-info"><div><div class="serverInfo-name">' + data.data[i].name + '</div><div class="serverInfo-online"><span class="serverInfo-onlineText">Онлайн: </span><span class="serverInfo-onlineCurrent">' + data.data[i].online + ' </span><span class="serverInfo-onlineFull"> / ' + data.data[i].maxOnline + '</span></div></div></div></div>';
                serverOnlineFull += data.data[i].online; }
            $('.serversList').empty();
            $('.serversList').append(serversData);
            $('.serversFullOnline-num').text(serverOnlineFull);
        });
    }
    getServers();
    setInterval(() => { getServers(); }, 30000);
    $('.footerContacts-emailAddress').click(function() { if (navigator.clipboard) { const that = $(this); const email = $(this).children('span').text();
            navigator.clipboard.writeText(email).then(() => { that.append('<div class="bufferTooltip">Скопировано в буфер обмена</div>');
                that.children('.bufferTooltip').fadeOut(2000, function() { $(this).remove(); }) }).catch(err => {}); } })
});