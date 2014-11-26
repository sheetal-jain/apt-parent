$(document).ready(function () {
    $('.custom-audio-button').addClass('fade');
    $('#slide2').addClass('fade');

    //$('.container').css('position', 'absolute');
    //$('.container').css('left', (($(window).width() / 2 - $('.container').width() / 2) - 15 + 'px'));
    //var containerTop = ($(window).height() / 2 - $('.container').height() / 2);
    //if (containerTop < 0) {
    //    $('.container').css('top', '0');
    //}
    //else {
    //    $('.container').css('top', containerTop);
    //}

});

function start() {
    var scrw = $(window).width();
    //alert(scrw);
    $('#audwelcom').attr('src', 'Audio/6n7vVfJToNo_22050_80.mp3').trigger('load');
    $('#audwelcom').trigger('play');
    if (scrw <= 600) {
        $('#audwelcom').css('width', '75%');
    }
    else if (scrw <= 768) {
        $('#audwelcom').css('width', '80%');
    }
    else {
        $('#audwelcom').css('width', '85%');
    }
    $('#audwelcom').css('margin-right', '15px');
    $('.custom-audio-button').removeClass('fade');
    $('.custom-audio-button').addClass('fade.in');
    $('#btnstart').addClass('collapse');
    $('#firstslideheader').addClass('collapse');
    $('#slide1').removeClass('image-shadow');
    $('#slide1').attr('src', 'Images/5jJRHWX2Aig_DX1890_DY1890_CX945_CY530.png');
    window.setTimeout(function () {
        //$('#slide1').addClass('blur');
        $('#slide1').fadeTo(400, 0, function () {
            $('#slide1').attr('src', 'Images/5eexq4u95MM_DX1890_DY1890_CX945_CY530.png');
        }).fadeTo(500, 1);
        $('#slide2').fadeTo(1000, 0, function () {
            $('#slide2').removeClass('fade');
            $('#slide2').addClass('fade.in');
            //$('#slide1').removeClass('blur');
        }).fadeTo(1000, 1);
    }, 500);

    var slide2imgW;
    var slide2imgH;
    var slide2imgL;
    var slide2imgT;

    window.setTimeout(function () {
        $('#slide2img').attr('src', 'Images/5s0ZVNSLQdM_DX872_DY872_CX396_CY436.jpg');
        slide2imgW = $('#slide2img').width();
        slide2imgH = $('#slide2img').height();
        $('#slide2-popup1').fadeTo("slow", 0, function () {
            $('#slide2-popup1').css('width', slide2imgW / 2);
            $('#slide2-popup1').css('height', slide2imgH / 2);
            $('#slide2-popup1').css('padding', (slide2imgW / 2) / 5);
            $('#slide2-popup1').removeClass('fade');
            $('#slide2-popup1').addClass('fade.in');
        }).fadeTo("slow", 1);
    }, 30000);

    window.setTimeout(function () {
        $('#slide2img').attr('src', 'Images/6K0H83j0f1I_DX872_DY872_CX396_CY436.jpg');
        slide2imgW = $('#slide2img').width();
        $('#slide2-popup2').fadeTo("slow", 0, function () {
            slide2imgL = (slide2imgW / 2) + 15;
            $('#slide2-popup2').css('width', slide2imgW / 2);
            $('#slide2-popup2').css('left', slide2imgL);
            $('#slide2-popup2').css('padding', (slide2imgW / 2) / 5);
            $('#slide2-popup2').removeClass('fade');
            $('#slide2-popup2').addClass('fade.in');
        }).fadeTo("slow", 1);
    }, 34000);

    window.setTimeout(function () {
        $('#slide2img').attr('src', 'Images/6EfEzBvAYYB_DX872_DY872_CX396_CY436.jpg');
        slide2imgW = $('#slide2img').width();
        slide2imgH = $('#slide2img').height();
        $('#slide2-popup3').fadeTo("slow", 0, function () {
            $('#slide2-popup3').css('width', slide2imgW / 2);
            $('#slide2-popup3').css('top', slide2imgH / 2);
            $('#slide2-popup3').css('padding', (slide2imgW / 2) / 5);
            $('#slide2-popup3').removeClass('fade');
            $('#slide2-popup3').addClass('fade.in');
        }).fadeTo("slow", 1);
    }, 38000);

    window.setTimeout(function () {
        $('#slide2img').attr('src', 'Images/6SsaP2G5oAw_DX872_DY872_CX396_CY436.jpg');
        slide2imgW = $('#slide2img').width();
        slide2imgH = $('#slide2img').height();
        $('#slide2-popup4').fadeTo("slow", 0, function () {
            slide2imgL = (slide2imgW / 2) + 15;
            $('#slide2-popup4').css('width', slide2imgW / 2);
            $('#slide2-popup4').css('top', slide2imgH / 2);
            $('#slide2-popup4').css('left', slide2imgL);
            $('#slide2-popup4').css('padding', (slide2imgW / 2) / 5);
            $('#slide2-popup4').removeClass('fade');
            $('#slide2-popup4').addClass('fade.in');
        }).fadeTo("slow", 1);
    }, 41000);
}

var nextcounter = 0;
function firstnext() {
    nextcounter = nextcounter += 1
    //alert(nextcounter);
    if (nextcounter == 1) {
        //alert('hi');
        $('#welcome').addClass('collapse');
        $('#slide1').addClass('collapse');
        $('#slide2').addClass('collapse');
        $('#bergeron').removeClass('collapse');
        $('#bergeron').addClass('collapse.in');
        $('#audwelcom').attr('src', 'Audio/6l4Qheq8nL6_22050_80.mp3').trigger('load');
        $('#audwelcom').trigger('play');
        $('.bergeron-header').fadeTo(1000, 0, function () {
            $('.bergeron-header').removeClass('collapse');
        }).fadeTo(500, 1);
    }
    else if (nextcounter == 2) {
        //alert('hi');
        $('#slide1').addClass('collapse');
        $('#slide2').addClass('collapse');
        $('#bergeron').addClass('collapse');
        $('#resources').removeClass('collapse');
        $('#resources').addClass('collapse.in');
        $('#audwelcom').attr('src', 'Audio/6pl1lX8BFwh_22050_80.mp3').trigger('load');
        $('#audwelcom').trigger('play');
        window.setTimeout(function () {
            //$('#slide4').fadeTo(0, 0, function () {
                $('#slide4').attr('src', 'Images/67mHodTVPPD_DX1890_DY1890_CX945_CY530.png').fadeTo(1000);
            //}).fadeTo(500, 1);
        }, 1000);
        window.setTimeout(function () {
            $('#nested-slide4-1').removeClass('collapse');
            $('#nested-slide4-1').addClass('collapse.in');
        }, 3000);
    }
}

function previous() {
    nextcounter = nextcounter -= 1
    alert(nextcounter);
    if (nextcounter == 2) {
        $('#slide1').addClass('collapse');
        $('#slide2').addClass('collapse');
        $('#bergeron').addClass('collapse');
        $('#resources').removeClass('collapse');
        $('#resources').addClass('collapse.in');
        $('#audwelcom').attr('src', 'Audio/6pl1lX8BFwh_22050_80.mp3').trigger('load');
        $('#audwelcom').trigger('play');
        window.setTimeout(function () {
            //$('#slide4').fadeTo(500, 0.5, function () {
            //    $('#slide4').attr('src', 'Images/67mHodTVPPD_DX1890_DY1890_CX945_CY530.png');
            //}).fadeTo(500, 1);
            $('#slide4').fadeIn("slow", function () {
                $('#slide4').attr('src', 'Images/67mHodTVPPD_DX1890_DY1890_CX945_CY530.png');
            });
        }, 500);

        //$('#nested-slide4-1').fadeTo(slow, 0, function () {
        //    $('#nested-slide4-1').removeClass('collapse');
        //    $('#nested-slide4-1').addClass('collapse.in');
        //}).fadeTo(slow, 1);

    }
    else if (nextcounter == 1) {
        $('#resources').addClass('collapse');
        $('#slide1').addClass('collapse');
        $('#slide2').addClass('collapse');
        $('#bergeron').removeClass('collapse');
        $('#bergeron').addClass('collapse.in');
        $('#audwelcom').attr('src', 'Audio/6l4Qheq8nL6_22050_80.mp3').trigger('load');
        $('#audwelcom').trigger('play');
        $('.bergeron-header').fadeTo(0, 0, function () {
            $('.bergeron-header').removeClass('collapse');
        }).fadeTo(1000, 1);
    }
    else if (nextcounter == 0) {
        $('#welcome').removeClass('collapse');
        $('#bergeron').addClass('collapse');
        start();
    }

}