/**
 * Created by VJ on 25/11/14.
 */
var stTime = "";
var maxWidth = $(window).width();

function fnGetDataFromServer(url)
{
    return $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        async:false
    });
};

/* ------------------ Change cookie pagewise -----------------------*/
function changeCookieValue(newValue) {
    $.removeCookie('current_page');
    $.cookie('current_page', newValue, { expires: 7 });
}

function preloadImages(JSONObj){

    var imagesArr = [];
    var audiosArr = [];

    imagesArr.push(JSONObj.imgName);
    jQuery.each(JSONObj.popupImg,function(i,obj){
        imagesArr.push(obj.imgName)
    });

    jQuery.each(JSONObj.audioName,function(i,obj){
        if(obj != "" && obj.length > 0){
            audiosArr.push(obj);
        }
    });
    $.preload(imagesArr);
    $.preloadAudio(audiosArr);
}

var imgSrc = ""
function showLoader(imgId){

    var myImg = new Image();
    myImg.src = $(imgId).attr('src');
    $("#loadingSpinnerSlide").css("left", ($(".image-shadow").width()/2) - 50);
    $("#loadingSpinnerSlide").css("top", ($(".image-shadow").height()/2) - 50);
    $("#loadingSpinnerSlide").show();
    $("#APT_Audio_Controls").trigger("pause");
    myImg.onload = function(){
        fnSetModelScreen();
        $("#loadingSpinnerSlide").hide();
        $("#APT_Audio_Controls").trigger("play");
    }
}

function startAPT() {
    var scrw = $(window).width();
    $('#mp3source').attr('src', 'Audio/FR/mp3/5o9WZxZaHdo_22050_80.mp3');
    $('#APT_Audio_Controls').trigger('load');
    $('#APT_Audio_Controls').trigger('play');

    if (scrw <= 600) {
        $('.well').css('width', '77%');
    }
    else if (scrw <= 768) {
        $('.well').css('width', '82.5%');
    }
	else if (scrw <= 980) {
        $('.well').css('width', '86%');
    }
	else if (scrw <= 1366) {
	    $('.well').css('width', '87%');
	}
    else if (scrw >= 1920) {
        $('.well').css('width', '91%');
        $(".aud-control").css("width","9.4%");
    }
    else {
        $('.well').css('width', '87%');
    }
    $('#APT_Audio_Controls').css('margin-right', '15px');
    $('.custom-audio-button').removeClass('fade');
    $('.custom-audio-button').addClass('fade.in');
    $('#btnStart').addClass('content-collapse');
    $('#firstslideheader').addClass('content-collapse');
    $('#welcome').removeClass('content-collapse');
    $('#slide1').removeClass('image-shadow');
    window.setTimeout(function () {

        $('#slide1').fadeTo(400, 0, function () {
            $('#slide1').attr('src', 'Images/5eexq4u95MM_DX1890_DY1890_CX945_CY530.png');
        }).fadeTo(500, 1);
        $('#slide2').fadeTo(1000, 0, function () {
            $('#slide2').removeClass('fade');
            $('#slide2').addClass('fade.in');
        }).fadeTo(1000, 1);
    }, 500);
};

function fnOverlayImageContentOnWelcomeSlide(imgSrc,data){
    var slide2imgW;
    var slide2imgH;
    var slide2imgL;
    $('#slide2img').attr('src', imgSrc+data.imgName);
    slide2imgW = $('#slide2img').width();
    slide2imgH = $('#slide2img').height();

    $('#'+data.imgContentId).fadeTo("slow", 0, function () {
        $('#'+data.imgContentId).css('width', slide2imgW / 2);
        $('#'+data.imgContentId).css('padding', (slide2imgW / 2) / 5);
        $($('#'+data.imgContentId)).removeClass('fade');
        $($('#'+data.imgContentId)).addClass('fade.in');
        $($('#'+data.imgContentId)).html(data.imgContent);
        if(data.imgContentId == "slide2-popup1"){

            $($('#'+data.imgContentId)).css('height', slide2imgH / 2);
        }
        else if(data.imgContentId == "slide2-popup2"){
            slide2imgL = (slide2imgW / 2) + 15;
            $('#'+data.imgContentId).css('left', slide2imgL);
        }
        else if(data.imgContentId == "slide2-popup3"){
            $('#'+data.imgContentId).css('top', slide2imgH / 2);
        }
        else if(data.imgContentId == "slide2-popup4"){
            slide2imgL = (slide2imgW / 2) + 15;
            $('#'+data.imgContentId).css('top', slide2imgH / 2);
            $('#'+data.imgContentId).css('left', slide2imgL);
        }
    }).fadeTo("slow", 1);
};

function fnOverlayContentOnBergeronSlide(data){
    $('.'+data.contentClass).css('opacity',"1");
    $('.'+data.contentClass).fadeIn('1500',function(){
        $('.'+data.contentClass).css('opacity',"1");
        $('.'+data.contentClass).removeClass('content-collapse');
    });
};

function fnOverlayImageContentOnGatherResourcesSlide(data){
    $('#slide-dyn').attr('src', 'Images/68mHodTVPPD_DX1890_DY1890_CX945_CY530.png').fadeTo(2000);
    $('#nested-slide4-1').fadeTo(1000, 0, function () {
        $('#nested-slide4-1').attr('src',"Images/5VEQskudflI_80_DX1088_DY1088_CX544_CY304.png");
        $('#nested-slide4-1').removeClass('content-collapse');
    }).fadeTo(500, 1);
};

function fnSetupContentByTimeOnWelcomeSlide(curTime,imgArr)
{
    if(curTime < imgArr[0].startingTime)
    {
        $('#slide2img').attr('src','Images/6gt3Ugtneuy_DX872_DY872_CX396_CY436.jpg');

        fnFadeEffectRemove(imgArr[0].imgContentId);
        fnFadeEffectRemove(imgArr[1].imgContentId);
        fnFadeEffectRemove(imgArr[2].imgContentId);
        fnFadeEffectRemove(imgArr[3].imgContentId);

    }
    else if(curTime >= imgArr[0].startingTime && curTime <= imgArr[0].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);

        fnFadeEffectRemove(imgArr[1].imgContentId);
        fnFadeEffectRemove(imgArr[2].imgContentId);
        fnFadeEffectRemove(imgArr[3].imgContentId);
    }
    else if(curTime >= imgArr[1].startingTime && curTime <= imgArr[1].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);

        fnFadeEffectRemove(imgArr[2].imgContentId);
        fnFadeEffectRemove(imgArr[3].imgContentId);

    }
    else if(curTime >= imgArr[2].startingTime && curTime <= imgArr[2].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[2]);

        fnFadeEffectRemove(imgArr[3].imgContentId);
    }
    else if(curTime >= imgArr[3].startingTime && curTime <= imgArr[3].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[2]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[3]);
    }
}
function fnSetupContentByTimeOnBergeronSlide(curTime,contArr)
{
    for(var intIndex = 0;intIndex<contArr.length;intIndex++)
    {
        var contClass = '.'+contArr[intIndex].contentClass;
        if(contArr[intIndex].startingTime <= curTime  && curTime <= contArr[intIndex].endingTime){
            $(contClass).fadeIn('1500',function(){
                $(contClass).css('opacity',"1");
                $(contClass).removeClass('content-collapse');
            });
        }
        else{
            $(contClass).hide();
        }
    }
};

function fnFadeEffectRemove(_id){
//    $("#"+_id).fadeOut(1000, function() {
//        $(this).remove();
//        $(this).removeAttr('style');
//        $(this).removeClass('fade.in');
//        $(this).addClass('fade');
//    });
    $("#"+_id).hide();
};


function setCollapseClassToScreen(screenName){
    $($("div.screen[name="+screenName+"]")).removeClass('content-collapse');
    $($("div.screen:not(.screen[name="+screenName+"])")).addClass('content-collapse');
}

function refreshPopupContent(popupContentArr){
    jQuery.each(popupContentArr,function(i,obj){
        $($("."+obj.contentClass)).css("display",'none');
    });
}


function setupAudioControls(audioName){
    $("#mp3source").attr('src', audioName);
    $('#APT_Audio_Controls').trigger('load');
    $('#APT_Audio_Controls').trigger('play');
}

function refreshPopupImages(popupImageArr){
    jQuery.each(popupImageArr,function(i,obj){
        $($("#"+obj.imgId)).css('opacity','0');
        $($("#"+obj.imgId)).addClass("content-collapse");
    });
}

function loadNextPageImages(nextObj){
    var slideImg = new Image();
    slideImg.src = nextObj.imgName;
}

function fnOverlayImageContentGeneral(imgSrc,popupImageObj){
    var imgId = '#'+popupImageObj.imgId;
    $(imgId).removeAttr('style');
    $(imgId).find('img').attr('src',imgSrc+popupImageObj.imgName);
    $(imgId).find('span').text(popupImageObj.imgContent);
    $(imgId).removeClass('content-collapse');

    /*$(imgId).fadeTo(1000,0,function(){
        $(imgId).find('img').attr('src',imgSrc+popupImageObj.imgName);
        $(imgId).find('span').text(popupImageObj.imgContent);
        $(imgId).removeClass('content-collapse');
    }).fadeTo(500, 1);*/
}

function fnOverlayImageContentByTimeGeneral(curTime,imgArr){
    for(var intIndex = 0;intIndex<imgArr.length;intIndex++)
    {
        if(imgArr[intIndex].startingTime <= curTime  && curTime <= imgArr[intIndex].endingTime){
            var imgId = '#'+imgArr[intIndex].imgId;
            var imgPath = "Images/"+imgArr[intIndex].imgName;
            var imgContent = imgArr[intIndex].imgContent;
            $(imgId).css('opacity','1');
            $(imgId).find('img').attr('src',imgPath);
            $(imgId).find('span').text(imgContent);
            $(imgId).removeClass('content-collapse');
            /*$('#'+imgArr[intIndex].imgId).fadeTo(100,0,function(){
                $(this).find('img').attr('src',imgPath);
                $(this).find('span').text(imgContent);
                $(this).removeClass('content-collapse');
            }).fadeTo(500, 1);*/
        }
        else{
            $('#'+imgArr[intIndex].imgId).css('opacity','0');
            $('#'+imgArr[intIndex].imgId).addClass('content-collapse');
//            $('#'+imgArr[intIndex].imgId).find('img').removeAttr('src');
            $('#'+imgArr[intIndex].imgId).find('span').text("");
        }
    }
};

function fnSetModelScreen(){
    var capw = $('.image-shadow').width();
    var caph = $('.image-shadow').height();

    $('.capsule-model').css('width', capw);
    $('.capsule-model').css('height', caph);
    $('.img-loader').css('top',capw/2);
    $('.img-loader').css('top',caph/2);

};

function fnAddOrRemoveElementClass(){
    $("#bergeron-footer").addClass('content-collapse');
    $(".navigation-help").addClass('content-collapse');
    $(".tips-header").removeClass('content-collapse');
    $("#tips-images").removeClass('content-collapse');
}


function fnAddCollapseClass(){
    stTime = "";
    $(".popup-conversation").removeAttr("style");
    $(".popup-conversation").html("");

    $('#slide-menu').addClass('collapse');
    $('#rc-content-text').addClass('collapse');
    $('.content-view-1').addClass('collapse');
    $('#rc-footer-text').addClass('collapse');
    $('#fw-footer-img').addClass('collapse');

    $('.convertion').addClass('collapse');
    $('#conv1-slide3').addClass('collapse');
    $('.full-width-content').addClass('collapse');

    $('#rc-footer-confirm').addClass('collapse');
    $('#l-c-footer-text').addClass('collapse');
    $("#l-c-footer-text").hide();
    $('#l-c-footer-img').addClass('collapse');
    $('.fw-header').addClass('collapse');
    $('.fw-content').addClass('collapse');
    $('.fw-header').hide();
    $('.fw-content').hide();
    $('#fw-footer-lr').addClass('collapse');

    $('.l-c-header').addClass('collapse');

    $('#conv1-slide5').addClass('collapse');
    $('#conv1-slide6').addClass('collapse');
    $('#conv1-slide8').addClass('collapse');
    $('#conv1-slide10').addClass('collapse');
    $('#conv1-slide12').addClass('collapse');
    $('#conv1-slide14').addClass('collapse');

    $('.r-c-header').addClass('collapse');
    $('#rc-content-select').addClass('collapse');

    $('.fw-footer').addClass('collapse');

    /*---- ---------- Capsule-2 -------------*/
    $('#lc-content').addClass('collapse');
    $('#conv2-slide3').addClass('collapse');
    $('#conv2-slide5').addClass('collapse');
    $('#conv2-slide7').addClass('collapse');
    $('#conv2-slide8').addClass('collapse');
    $('#conv2-slide9').addClass('collapse');
    $('#conv2-slide11').addClass('collapse');


    /*---- ---------- Capsule-3 -------------*/
    $('#conv3-slide4').addClass('collapse');
    $('#conv3-slide6').addClass('collapse');
    $('#conv3-slide7').addClass('collapse');
    $('#conv3-slide9').addClass('collapse');

    /*---- ---------- Capsule-4 -------------*/
    $('#conv4-slide3').addClass('collapse');
    $('#conv4-slide5').addClass('collapse');
    $('#conv4-slide7').addClass('collapse');
    $('#conv4-slide9').addClass('collapse');

    /*-------------- conversation popup hide-----------*/

     fnAddCollapseClassIntroCapsule();
    $('#slide-dyn').removeClass('content-collapse');

    $('#help-header').hide();
    $("#next").css("pointer-events",'auto');
    fnShowNextButton();
}

function fnAddCollapseClassIntroCapsule(){
    $('.custom-audio-button').removeClass('fade.in');
    $('.custom-audio-button').addClass('fade')
    $("#prev").removeClass('fade');
    $("#next").removeClass('fade')
    $("#prev").addClass('fade.in');
    $("#next").addClass('fade.in')
    /*---- ---------- Introduction ---------------*/
    $('#slide-dyn').addClass('content-collapse');

    /*------- Intro Welcome -----------*/
    $("#slide2").addClass("fade");
    $("#slide2").removeAttr("style");

    /*---- ---------- Intro Bergeron ------------*/
    $(".bergeron-header").css("display","none");
    $("#aside-bergeron").addClass("content-collapse");
    /*$("#bergeron-footer").addClass('content-collapse');*/
    $("#dyn-footer").find("span").addClass("content-collapse");
    $("#dyn-footer").find("span").removeAttr('style');
    $("#resources-head").addClass("content-collapse");

    $("#psychoactive-head").addClass("content-collapse");
    $(".tips-header").addClass('content-collapse');
    $("#Tips4online").addClass('content-collapse');
    $("#tips-images").find("div").removeAttr("style");
    $("#tips-images").find("div").css('opacity','0');
//    $("#tips-images").find("div").css('display','none');

    $(".navigation-help").addClass("content-collapse");

    $("#infrom-navi").addClass("content-collapse");

    $("#transition").addClass("content-collapse");
    fnShowNextButton();

}
function fnHideNextButton(){
    $("#next").addClass('content-collapse');
    $("#prev").removeClass("content-collapse");
    if(maxWidth > 1900)
    {
        $(".playa").css('width','95%');
        $("#prev").css('margin-left','120px');
        $(".aud-control").css("width","13.4%");
    }else
    {
        $(".playa").css('width','93%');
        $("#prev").css('margin-left','60px');
    }

};

function fnShowNextButton(){
    $("#next").removeClass('content-collapse');
    if(maxWidth > 1900)
    {
        $(".playa").css('width','91%');
        $("#prev").removeAttr("style");
        $(".aud-control").css("width","9.4%");
    }else{
        $(".playa").css('width','87%');
        $("#prev").removeAttr("style");
    }
};

function fnSlideWiseContentManage(slide){
    switch (slide) {
        case "introduction":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            $("#slide-dyn").addClass("content-collapse");
            $('#slide1').removeClass('content-collapse')
            $('#slide1').css('display','block')
            $('#firstslideheader').removeClass('content-collapse');
            $("#next").removeClass("fade.in");
            $("#prev").removeClass("fade.in");
            $("#next").addClass("fade");
            $("#prev").addClass("fade");
            $('#btnStart').removeClass('content-collapse');
            break;

        case "intro_welcome":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();

            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $("#welcome").removeClass("content-collapse");
            $("#slide2").removeClass("fade");
            break;

        case "intro_bergeron":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $('#slide-dyn').removeClass('content-collapse');
            $(".bergeron-header").removeAttr("style");
            $(".bergeron-header").css("opacity","0");
            $("#aside-bergeron").removeClass("content-collapse");
            $("#bergeron-footer").removeClass('content-collapse');
            break;

        case "intro_Tips4online":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();

            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $('#slide-dyn').removeClass('content-collapse');
            $("#Tips4online").removeClass('content-collapse');
            $('.tips-header').removeClass("content-collapse");
            break;

        case "intro_navigation_help":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $("#infrom-navi").removeClass("content-collapse");
            $('#slide-dyn').removeClass('content-collapse');
            $("#Tips4online").removeClass('content-collapse');

            $(".navigation-help").removeClass('content-collapse');
//            $("#tips-images").addClass('content-collapse');
            $('#tips-images').find("div").css('opacity','0');
            break;
        case "intro_psychoactive_head":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $('#slide-dyn').removeClass('content-collapse');
            $("#psychoactive-head").removeClass("content-collapse");
            break;
        case "intro_transition":
            //show next button
            fnShowNextButton();
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();

            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $("#transition").removeClass("content-collapse");
            $('#slide-dyn').removeClass('content-collapse');

            break;

        case "intro_menu":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            //hide next button
            fnHideNextButton();
            $('#slide-dyn').removeClass('content-collapse');
            $("#slide-capsule1").addClass("collapse");
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-menu').removeClass('collapse');
            break;

        case "capsule1_slide1":
            setupAudioControls('Audio/FR/mp3/6CYh8nauv4Z_22050_80.mp3');
            //show next button
            fnShowNextButton();
            // --- Add Collapse --- //
            fnAddCollapseClass();
            // --- Show --- //
            $('#slide-dyn').attr('src', 'Images/5WimNqiORUO_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            // --- Show --- //
            // --- Content - Show --- //
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').append("<span class='font-xx-lg'>01</span>");
//            $('#fw-header-1').css('display','inline');
            $('#fw-header-1').css('margin-left', '-47px');
            $('#fw-header-1').text('');
            $('#fw-header-1').text('Établir des relations de qualité entre');
            $('#fw-header-2').text('parents et adolescents');
            $('#fw-footer-lr').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-day').text('Samedi soir');
            $('#fw-time').text('19 h 30');
            $('#fw-text').text("Isabelle conduit Vincent à une fête chez son amie Julie. Normalement, Vincent est un vrai moulin à paroles, mais ce soir, il a l’air anxieux…");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();

            break;

        case "capsule1_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.l-c-header').removeClass('collapse');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");
            $('#lc-content').append("<span class='font-xx-lg'>01</span>");

//            $('#lc-header-1').css('display','inline');
            $('#lc-header-1').css('margin-left', '-47px');
            $('#lc-header-1').text('Établir des relations de qualité entre');
            $('#lc-header-2').text('parents et adolescents');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Isabelle aimerait en savoir plus sur ce qui tracasse Vincent. Dans cette situation, la qualité de leur relation sera déterminante pour la suite de la discussion.<br/><br/>Une relation de qualité implique de l’amour, c’est-à-dire une <span class='orange'>proximité émotionnelle.</span> C’est en montrant du soutien et de l’affection à Vincent qu’Isabelle assurera cette proximité.<br /><br />Votre objectif est d’aider <span class='orange'>Isabelle à faire preuve de soutien et d’affection vis-à-vis de Vincent</span> qui semble vivre une situation difficile.<br /><br />Au cours de la discussion, vous devrez également l’aider à <span class='orange'>argumenter face aux croyances de Vincent concernant la consommation d’alcool.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            break;
        case "capsule1_slide3":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5heZxU5t7t7_DX1110_DY1110_CX555_CY80.png');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide3').removeClass('collapse');
            break;

        case "capsule1_slide4":
            fnAddCollapseClass();
            $('.r-c-header').removeClass('collapse');
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#l-c-footer-text').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5heZxU5t7t7_DX1110_DY1110_CX555_CY80.png');
            $('#rc-header-1').text('Dilemme: ');
            var head = "Je ne pensais pas qu’il y aurait de l’alcool dans ce party-là… Mais je veux rassurer Vincent.";
            $('#rc-header-2').html("");
            $('#rc-header-2').html("«" + '"' + head + '"' + "»");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-content-select').removeClass('collapse');
            $('#rc-opt-1').html( "« T’exagère, je suis sûre qu’ils ne t’achaleront pas tant que ça. Et puis t’as juste à dire non.  Ah, et n’oublie pas de reprendre ton livre chez Julie.»");
            $('#rc-opt-2').html( "« Julie accepte qu’il y ait de l’alcool dans ses partys ? Vous êtes bien trop jeunes ! Et puis tu ne devrais pas rester avec eux, s’ils t’achalent pour consommer. »");
            $('#rc-opt-3').html( "« Tu es préoccupé par la réaction de tes amis s’ils voient que tu ne bois pas.  Tu veux qu’on en parle ? »");

            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            break;
        case "capsule1_slide5":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5wQcyLfzE5d_DX1110_DY1110_CX555_CY80.png');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide5').removeClass('collapse');
            break;

        case "capsule1_slide6":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6N5jhO1cXng_DX1110_DY1110_CX555_CY80.png');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide6').removeClass('collapse');
            break;

        case "capsule1_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#fw-footer-lr').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-day').text('Samedi soir');
            $('#fw-time').text('23 h 00');
            $('#fw-text').text("Appel téléphonique de Vincent à sa mère");
            $('.fw-footer').hide();
            break;

        case "capsule1_slide8":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide8').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5urXqs4mqm0_DX1110_DY1110_CX555_CY80.png');
            break;

        case "capsule1_slide9":
            fnAddCollapseClass();
            $('#fw-footer-lr').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-day').text('Samedi soir');
            $('#fw-time').text('23 h 30');
            $('#fw-text').text("Retour à la maison, Vincent est intoxiqué");
            $('.fw-footer').hide();
            break;

        case "capsule1_slide10":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6j2V7CHeU3S_DX1110_DY1110_CX555_CY80.png');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide10').removeClass('collapse');
            break;

        case "capsule1_slide11":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/6j2V7CHeU3S_DX1110_DY1110_CX555_CY80.png');
            $('#rc-footer-confirm').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "C’est sûr que je suis fâchée! Je ne comprends pas pourquoi il a agi comme ça… " + '»' + "</dfn>");
            $('#rc-opt-1').html("« Je suis fâchée, je pensais que tu avais compris.  Je ne peux plus te faire confiance maintenant. »");
            $('#rc-opt-2').html("« Je suis déçue de ton comportement.  On en reparlera demain au déjeuner, quand tu auras dessoûlé. »");
            $('#rc-opt-3').html("« Je savais que c’était une mauvaise idée de te laisser aller à un party où il y a de l’alcool.  Pourquoi t’as fait ça ? Tes amis ont vraiment une mauvaise influence sur toi! »");
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule1_slide12":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse')
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5itRdnRNYV6_DX1110_DY1110_CX555_CY80.png');
            $('.fw-header').removeClass('collapse');
            $('#fw-header-1').text('Le lendemain');
            $('#fw-header-1').css('margin-left', '-14px');
            $('#fw-header-2').text('matin …');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide12').removeClass('collapse');
            break;

        case "capsule1_slide13":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5itRdnRNYV6_DX1110_DY1110_CX555_CY80.png');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Je veux qu’il sache que je suis contre la consommation d’alcool à son âge mais je veux aussi qu’il puisse compter sur moi quand il a des problèmes." + '»' + "</dfn>");
            $('#rc-opt-1').html("« Explique-moi.  J’aimerais comprendre ce qui s’est passé. »");
            $('#rc-opt-2').html("« Ce n’est pas la peine de t’excuser, je ne veux rien savoir.  Je ne veux plus que tu prennes de l’alcool, c’est tout. »");
            $('#rc-opt-3').html("« Ok, c’est tes affaires.  Bon, veux-tu un jus d’orange ? »");
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule1_slide14":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6L9kKi7B4bf_DX1110_DY1110_CX555_CY80.png');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide14').removeClass('collapse');
            break;

        case "capsule1_slide15":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/6L9kKi7B4bf_DX1110_DY1110_CX555_CY80.png');
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block' style='font-size: 100%'>En démontrant du <span class='orange'>soutien</span> et de <span class='orange'>l’affection</span> à Vincent, même dans les moments difficiles, Isabelle s’assure de développer et de maintenir une relation de qualité avec lui. S’il se sent compris, aimé et soutenu par ses parents, l’adolescent sera plus ouvert à discuter de ses problèmes avec eux.<br /><br />Isabelle a su discuter avec Vincent de ses croyances concernant l’alcool et avancer des arguments en la matière. Elle refuse également que Vincent consomme de l’alcool avec ses amis à son âge. Avec raison : plus un jeune commence à boire tôt, plus il risque de développer des comportements d’abus et de dépendance.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Comment démontrez-vous votre soutien et votre affection à votre adolescent?</span></li><li><span>Quelles sont vos règles et vos croyances en matière de consommation d’alcool?</span></li></ul>");
            break;

        case "capsule1_slide16":
            fnAddCollapseClass();
            $('.fw-content').show();
            fnShowNextButton();
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap1-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu une nouvelle fiche d’information!<br /><br />Consultez-la, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>FICHES D'INFORMATIONS OBTENUES</span></th><th><span class='text-uppercase orange'>CROYANCES DISCUTÉES DANS LES CAPSULES</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='download_resource img-responsive' name='proximite_emotionnelle' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='proximite_emotionnelle'><span class='fa fa-angle-double-right'></span>proximité émotionnelle</span></div></td><td><span>Prenez en note les numèros de croyances à consulter ;<br />2-6-7-8-10-12-13-14-15</span></td></tr><tr><td><span>La fiche est maintenant disponible dans l'onglet Ressources.</span></td><td><span>Consultez le tableau dans l'onglet Ressources pour voir les arguments utilisés pour y faire face.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            fnResourceDownloadClickEvent();

            break;

        case "intro_menuAfterCap1":
            //hide next button
            fnHideNextButton();

            // --- Add Collapse --- //
            $('#slide-menu').removeClass('collapse');
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-capsule1').addClass('collapse');
            // --- Collapse --- //
            $('#transition').addClass('collapse');
            // --- Show --- //
            $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-menu').removeClass('collapse');
            $('#cap-img-1').attr('src', 'Images/62nL0mUWegS_DX630_DY630_CX211_CY315.png');
            $('#capsule1').removeClass('active');
            $('#capsule1').css('opacity', '1');
            $('#capsule1').addClass('active');
            break;

        case "capsule2_slide1":
            setupAudioControls('Audio/FR/mp3/6KADunyRYy4_22050_80.mp3');
            //show next button
            fnShowNextButton();
            fnAddCollapseClass();
            $('.fw-content').html("");
            $('.fw-content').removeClass('collapse');
            $('.fw-content').removeClass('cap1-last-slide');
            $('.fw-content').html("<span class='font-xx-lg'>02</span>");
            $('#slide-dyn').attr('src', 'Images/5oa9lL9NqsU_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
//            $('#fw-header-1').css('display','inline');
            $('#fw-header-1').html('Communiquer efficacement avec');
            $('#fw-header-1').css('margin-left', '-40px');
            $('#fw-header-2').html('vos adolescents');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-footer-img').addClass('collapse');
            $('#fw-day').html('Jeudi soir');
            $('#fw-time').html('18 h 15');
            $('#fw-text').html("Vincent a commencé la 4e secondaire il y a quelques jours. Éric et Isabelle aimeraient savoir comment les choses se passent…");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;

        case "capsule2_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#fw-header-1').html('COMMUNICATE EFECTIVELY');
            $('#fw-header-2').html('YOUR ADOLESCENTS');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");

            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>À l’adolescence, Vincent communique moins avec ses parents que lorsqu’il était enfant. Éric et Isabelle doivent donc le solliciter afin d’obtenir de l’information sur sa vie scolaire, ainsi que sur ses amis et les situations qui peuvent l’inciter à consommer de l’alcool ou des drogues. <br /><br />Votre objectif est <span class='orange'>d’aider Éric et Isabelle à communiquer efficacement avec Vincent. </span> Au cours de la discussion, vous devrez également les aider <span class='orange'>à faire face aux croyances de Vincent concernant la consommation de drogues et à argumenter leurs points de vue.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>Pour commencer, passez à l’écran suivant.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#lc-header-1').html('Communiquer efficacement avec');
            $('#lc-header-1').css('margin-left', '-40px');
            $('#lc-header-2').html('vos adolescents');
            $('#lc-content').html("<span class='font-xx-lg'>02</span>");
            break;

        case "capsule2_slide3":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5x6jNaSP9Di_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide3').removeClass('collapse');
            break;

        case "capsule2_slide4":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5x6jNaSP9Di_DX1110_DY1110_CX555_CY92.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').text('Dilemme: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Un gars “bizarre”?" + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("«  Tu n’as qu’à ne pas t’occuper de lui.  Et puis, aimes-tu tes profs ? »");
            $('#rc-opt-2').html("« C’est qui se gars là ?  Pourquoi tu le trouves bizarre ? »");
            $('#rc-opt-3').html("« Franchement, on ne parle pas des gens comme ça !  Il n’est sans doute pas si différent des autres de ta classe. »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');

            break;
        case "capsule2_slide5":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5jtfXPcnPam_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide5').removeClass('collapse');
            break;

        case "capsule2_slide6":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5jtfXPcnPam_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-1').text('Dilemme: ');
            $('#rc-header-2').html();
            $('#rc-header-2').html("<dfn>" + '«' + "Du speed… Est-ce que je devrais lui en parler? Je ne veux pas attiser sa curiosité!" + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("«  C’est une drogue très dangereuse.  Je t’interdis de toucher à ça et je ne veux pas entendre parler de ces affaires-là à la maison. »");
            $('#rc-opt-2').html("« Je ne sais pas si je devrais t’en parler.  Ils vont sûrement vous expliquer ça à l’école ? »");
            $('#rc-opt-3').html("«  C’est une drogue.  Si tu veux, on peut en parler… »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule2_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6OQ0upvvXUf_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide7').removeClass('collapse');
            break;

        case "capsule2_slide8":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6Lvh3hwHKG3_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide8').removeClass('collapse');
            break;

        case "capsule2_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5jbpvP1X5sc_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide9').removeClass('collapse');
            break;

        case "capsule2_slide10":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5jbpvP1X5sc_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-1').text('Dilemme : ');
            $('#rc-header-2').empty();
            $('#rc-header-2').append("<dfn>" + '«' + "Tant mieux. Il faudrait que ça reste comme ça : il ne faut pas que Vincent soit influencé par ce jeune-là." + '»' + "</dfn>");
            $('#rc-header-que').text("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').text("«  On est intéressés à connaître les gens que tu fréquentes et à savoir ce que vous faites ensemble.  Si la situation se représente, qu’est-ce que tu comptes faire ? »");
            $('#rc-opt-2').text("« Très bien.  On sait que toi tu as du jugement et que tu ne prendras jamais de drogue, alors ne fais pas attention à lui. »");
            $('#rc-opt-3').text("« Tant mieux.  On t’interdit de te tenir avec ce gars-là et on ne veut plus en entendre parler. »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule2_slide11":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5W7AHu8TBJX_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/69FApGo5S5l_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide11').removeClass('collapse');
            break;

        case "capsule2_slide12":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/69FApGo5S5l_DX1110_DY1110_CX555_CY92.png');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Afin de communiquer efficacement avec Vincent, il est souhaitable qu’Isabelle et Éric montrent de <span class='orange'>l’ouverture</span>. En étant ouverts et en posant des questions sur les activités et les fréquentations de Vincent, ils seront <span class='orange'>bien informés</span>. Ils pourront également lui communiquer des <span class='orange'>messages préventifs</span> en ce qui a trait à la consommation de psychotropes.</span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Faites-vous preuve d’ouverture?</span></li><li><span>Êtes-vous bien informé?</span></li><li><span>Quels messages transmettez-vous au sujet de l’alcool, du cannabis et des autres drogues?</span></li></ul>");
            break;

        case "capsule2_slide13":
            fnAddCollapseClass();
            $('#slide-capsule1').removeClass('collapse');
            $('.fw-content').show();
            fnShowNextButton();
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap2-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations! </span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu de nouvelles fiches d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>FICHES D'INFORMATIONS OBTENUES</span></th><th><span class='text-uppercase orange'>CROYANCES DISCUTÉES DANS LES CAPSULES</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='download_resource img-responsive' name='ouverture_communication' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /></a><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='ouverture_communication'><span class='fa fa-angle-double-right'></span>OUVERTURE À LA COMMUNICATION</span></div><div class='custom-img'><img class='download_resource img-responsive' name='information_parentale' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='information_parentale'><span class='fa fa-angle-double-right'></span>informations parentale</span></div><div class='custom-img'><img class='download_resource img-responsive' name='messages_preventifs' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='messages_preventifs'><span class='fa fa-angle-double-right'></span>messages préventifs</span></div></td><td class='v-align-t'><span>Prenez en note les numèros de croyances à consulter ;<br />1-20-22-23</span></td></tr><tr><td><span>La fiche est maintenant disponible dans l'onglet Ressources.</span></td><td><span>Consultez le tableau dans l'onglet Ressources pour voir les arguments utilisés pour y faire face.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            $('.cust-span-em').css('width', '175px');
            fnResourceDownloadClickEvent();
            break;

        case "intro_menuAfterCap2":
            //hide next button
            fnHideNextButton();

            $('#slide-capsule1').addClass('collapse');
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-menu').removeClass('collapse');
            // --- Collapse --- //
            $('#transition').addClass('collapse');
            // --- Show --- //
            $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-menu').removeClass('collapse');
            $('#cap-img-1').attr('src', 'Images/62nL0mUWegS_DX630_DY630_CX211_CY315.png');
            $('#cap-img-2').attr('src', 'Images/5fOa3eko1NA_DX630_DY630_CX211_CY315.png');
            $('#capsule2').removeClass('active');
            $('#capsule2').css('opacity', '1');
            $('#capsule3').addClass('active');
            // --- Show --- //
            break;

        case "capsule3_slide1":
            setupAudioControls('Audio/FR/mp3/6Oyf4dGZ7ed_22050_80.mp3');
            //show next button
            fnShowNextButton();
            fnAddCollapseClass();
            $('.fw-content').html("");
            $('.fw-content').removeClass('collapse');
            $('.fw-content').removeClass('cap1-last-slide');
            $('.fw-content').html("<span class='font-xx-lg'>03</span>");
            $('#slide-dyn').attr('src', 'Images/5u2NuFOhgFT_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#audwelcom').attr('src', '').trigger('load');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-header-1').html('Exercer de bonnes ');
            $('#fw-header-1').css('margin-left', '-22px');
            $('#fw-header-2').html('pratiques parentales');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-day').html('Vendredi');
            $('#fw-time').html('18 h 00');
            $('#fw-text').html("Au souper, Isabelle et Éric annoncent à leurs enfants qu’ils vont passer la soirée chez des amis. Ils laisseront Vincent et Alexandra seuls à la maison à partir de 19h30. Ceux-ci demandent s’ils peuvent inviter des amis…");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;

        case "capsule3_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Pour bien gérer cette situation, Isabelle et Éric devront appliquer de bonnes pratiques parentales. Celles-ci incluent le contrôle parental qu’ils exercent, leur tolérance et leur style disciplinaire.<br /><br />Votre objectif est <span class='orange'>d’aider Isabelle et « Éric à mettre en » application ces bonnes pratiques parentales.</span> Au cours de la discussion, vous devrez également les aider à <span class='orange'>argumenter face à certaines croyances sur la consommation d’alcool.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>Pour commencer, passez à l’écran suivant.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#rc-content-select').addClass('collapse');
            $('#lc-header-1').html('Exercer de bonnes ');
            $('#lc-header-1').css('margin-left', '-22px');
            $('#lc-header-2').html('parenting practices');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");
            $('#lc-content').html("<span class='font-xx-lg'>03</span>");
            break;

        case "capsule3_slide3":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('#rc-content-text').html("");
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5b30tlntG0Z_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#l-c-footer-text').removeClass('collapse');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#rc-header-1').html('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Ça leur ferait plaisir d’inviter leurs amis, mais bon, il ne faudrait pas que ça dégénère…" + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-content-select').removeClass('collapse');
            $('#rc-opt-1').html("« Ok, vous pouvez inviter Mathieu et Delphine. »");
            $('#rc-opt-2').html("« Pas de problème, faites ce que vous voulez tant que les gens sont partis quand on arrive ! »");
            $('#rc-opt-3').html("« Non, pas question que ça finisse en party pendant qu’on n’est pas là. »");

            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            break;

        case "capsule3_slide4":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6hmpZppJlxm_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').show();
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/63WoTp24Wi4_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide4').removeClass('collapse');
            break;

        case "capsule3_slide5":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5oPmf5gNdcB_DX1890_DY1890_CX945_CY530.png');
            $('#lc-footer-img').attr('src', 'Images/63WoTp24Wi4_DX1110_DY1110_CX555_CY92.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').html('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "On veut leur permettre de vivre des expériences mais on doit établir des règles claires qu’ils doivent respecter. " + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("« Faites comme vous voulez, de toute façon vous faites toujours à votre tête. »");
            $('#rc-opt-2').html("« Non, vous ne pouvez pas prendre d’alcool.  Mais c’est vrai qu’on n’en n’a jamais parlé clairement ensemble.  Comme pour tout le reste, on va prendre le temps d’en discuter et de s’entendre sur les règles. »");
            $('#rc-opt-3').html("« Pas question.  Si jamais vous prenez une bière, vous ne pourrez plus jamais inviter d’amis à la maison.  Compris ? »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule3_slide6":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6VSk8oIeeXM_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').show();
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5faPwXeepBG_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide6').removeClass('collapse');
            break;

        case "capsule3_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6b04fMETRyT_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').show();
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5vUIj0S5LRU_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide7').removeClass('collapse');
            break;

        case "capsule3_slide8":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6favrCCzyZW_DX1890_DY1890_CX945_CY530.png');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-day').html('Vendredi');
            $('#fw-time').html('10 h 45');
            $('#fw-text').html("Isabelle, qui souffre d’une légère migraine, a décidé de rentrer plus tôt. Éric reviendra plus tard en taxi.  Alors qu’elle ne pense qu’à aller dormir, elle voit les bouteilles vides sur la table du salon…");
            $('.fw-footer').hide();
            break;
        case "capsule3_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6favrCCzyZW_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').show();
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6r404kBUKne_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide9').removeClass('collapse');
            break;

        case "capsule3_slide10":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5bE88RUwxo8_DX1890_DY1890_CX945_CY530.png');
            $('#lc-footer-img').attr('src', 'Images/6r404kBUKne_DX1110_DY1110_CX555_CY92.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').html('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Je suis en colère mais je dois me contrôler pour ne pas dire des choses que je vais regretter." + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("« Là, vous comprenez qu’il y aura des conséquences : pas d’amis à la maison pendant le prochain mois. »");
            $('#rc-opt-2').html("« Vous faites toujours à votre tête !  On n’arrivera jamais à rien avec vous autres !  Attendez que votre père arrive… »");
            $('#rc-opt-3').html("« Bon, OK.  Je ne suis pas en état de me chicaner, alors on n’en parle plus.  Ne le dites pas à votre père, on efface tout. »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');

            break;
        case "capsule3_slide11":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6leqSerEMzN_DX1890_DY1890_CX945_CY530.png');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6mrCcUKMe7X_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide11').removeClass('collapse');
            break;

        case "capsule3_slide12":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6LfsxxorS1V_DX1890_DY1890_CX945_CY530.png');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/6mrCcUKMe7X_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').addClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-footer-text').removeClass("collapse");
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block' style='font-size: 100%'>Les bonnes pratiques parentales font référence au <span class='orange'>contrôle parental</span> (composé d’encadrement et d’autorisation), à la <span class='orange'>tolérance</span> et au <span class='orange'>style disciplinaire inductif</span> (fondé sur la négociation).<br /><br />Alexandra et Vincent savaient qu’ils devaient demander l’autorisation de recevoir des amis à la maison en l’absence de leurs parents. En acceptant tout en fixant des règles claires, Éric et Isabelle ont fait preuve une tolérance et un bon encadrement. Ils ont également agi pour protéger leurs enfants des risques d’une consommation d’alcool prématurée. Lorsque les règles ont été brisées, il était acceptable qu’Isabelle exerce un style disciplinaire punitif, sans agressivité.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Comment exercez-vous votre contrôle parental?</span></li><li><span>Quel est votre seuil de tolérance?</span></li><li><span>Quel est votre style disciplinaire?</span></li></ul>");
            break;

        case "capsule3_slide13":
            fnAddCollapseClass();
            $('#slide-capsule1').removeClass('collapse');
            $('.fw-content').show();
            fnShowNextButton();
            $('#slide-dyn').attr('src', 'Images/6kSF2jw7moU_DX1890_DY1890_CX945_CY530.png');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap2-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu de nouvelles fiches d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>FICHES D'INFORMATIONS OBTENUES</span></th><th><span class='text-uppercase orange'>CROYANCES DISCUTÉES DANS LES CAPSULES</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='download_resource img-responsive' name='controle_parental' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='controle_parental'><span class='fa fa-angle-double-right'></span>LE CONTRÔLE PARENTAL</span></div><div class='custom-img'><img class='download_resource img-responsive' name='styles_disciplinaires' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='styles_disciplinaires'><span class='fa fa-angle-double-right'></span>LES STYLES DISCIPLINAIRES</span></div><div class='custom-img'><img class='download_resource img-responsive' name='tolerance' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='tolerance'><span class='fa fa-angle-double-right'></span>LA TOLÉRANCE</span></div></td><td class='v-align-t'><span>Prenez en note les numèros de croyances à consulter ;<br />1-2-3</span></td></tr><tr><td><span>La fiche est maintenant disponible dans l'onglet Ressources.</span></td><td><span>Consultez le tableau dans l'onglet Ressources pour voir les arguments utilisés pour y faire face.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            fnResourceDownloadClickEvent();
            break;
        case "intro_menuAfterCap3":
            //hide next button
            fnHideNextButton();

            $('#slide-capsule1').addClass('collapse');
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-menu').removeClass('collapse');

            // --- Collapse --- //
            $('#transition').addClass('collapse');
            // --- Show --- //
            $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-menu').removeClass('collapse');
            $('#cap-img-1').attr('src', 'Images/62nL0mUWegS_DX630_DY630_CX211_CY315.png');
            $('#cap-img-2').attr('src', 'Images/5fOa3eko1NA_DX630_DY630_CX211_CY315.png');
            $('#cap-img-3').attr('src', 'Images/6gMh41j4l4l_DX630_DY630_CX211_CY315.png');
            $('#capsule3').removeClass('active');
            $('#capsule2').css('opacity', '1');
            $('#capsule3').css('opacity', '1');
            $('#capsule4').addClass('active');
            // --- Show --- //
            break;
        case "capsule4_slide1":
            setupAudioControls('Audio/FR/mp3/650d4QwzNBA_22050_80.mp3')
            //show next button
            fnShowNextButton();
            fnAddCollapseClass();
            $('.fw-content').html();
            $('.fw-content').removeClass('collapse');
            $('.fw-content').removeClass('cap1-last-slide');
            $('.fw-content').html("<span class='font-xx-lg'>04</span>");
            $('#slide-dyn').attr('src', 'Images/5ukYkRgWwoe_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#audwelcom').attr('src', '').trigger('load');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-header-1').html('Résoudre les conflits entre');
            $('#fw-header-1').css('margin-left', '-35px');
            $('#fw-header-2').html('parents et adolescents');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-day').text('Mardi');
            $('#fw-time').text('16 h');
            $('.fw-footer-content-grp').css('margin-bottom', '2.2%')
            $('.fw-footer-r-content').html("<span class='f-w-med' style='position: relative;top: 7px;'>Éric est rentré plus tôt à la maison aujourd’hui. Il veut discuter avec Alexandra à son retour de l’école. En effet, Éric et Isabelle ont reçu un message d’une enseignante : depuis quelques semaines, Alexandra dort souvent en classe et manque des cours.<br />C’est la deuxième fois que l’école communique avec eux. Plus tôt cette année, d’autres enseignants avaient signalé une baisse importante des résultats scolaires d’Alexandra, qui ne se sont pas améliorés depuis…</span>");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;
        case "capsule4_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Isabelle et Éric aimeraient comprendre ce qui se passe et souhaitent qu’Alexandra se reprenne en main à l’école. Éric se demande comment il abordera la situation avec Alexandra : un conflit potentiel pourrait facilement dégénérer.<br /><br />Votre objectif est <span class='orange'>d’aider Éric à résoudre un conflit avec Alexandra,</span> alors que celle-ci a des difficultés scolaires. Au cours de la discussion, vous devrez également l’aider à <span class='orange'>argumenter face aux croyances d’Alexandra en ce qui concerne la consommation de cannabis.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>Pour commencer, passez à l’écran suivant.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#lc-header-1').text('Résoudre les conflits entre');
            $('#lc-header-1').css('margin-left', '-35px');
            $('#lc-header-2').text('parents et adolescents');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");
            $('#lc-content').html("<span class='font-xx-lg'>04</span>");
            break;

        case "capsule4_slide3":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5kP9TIE0HvI_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5j6PBcOmITF_DX1110_DY1110_CX555_CY160.png');
            $('.convertion').removeClass('collapse');
            $('#conv4-slide3').removeClass('collapse');
            break;

        case "capsule4_slide4":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/60XdPzwDQGP_DX1890_DY1890_CX945_CY530.png');
            $('#lc-footer-img').attr('src', 'Images/5j6PBcOmITF_DX1110_DY1110_CX555_CY160.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').text('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Je n’en reviens pas. Je suis furieux, mais je veux en savoir plus pour qu’on trouve une solution ensemble." + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("« Ça ne se peut pas !  Tu vas arrêter ça tout de suite.  Tu ne peux pas couler ton année scolaire à cause de ça. »");
            $('#rc-opt-2').html("« Ne me dis pas que tu es rendue une « poteuse » comme ton cousin ?  Franchement, je te pensais plus intelligente que ça. »");
            $('#rc-opt-3').html("« J’aimerais qu’on en parle.  Est-ce que tu fumes souvent ? »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;
        case "capsule4_slide5":
            fnAddCollapseClass();

            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5ZPM7UaofLE_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5wkt9k2zg90_DX1110_DY1110_CX555_CY160.png');
            $('.convertion').removeClass('collapse');
            $('#conv4-slide5').removeClass('collapse');
            break;

        case "capsule4_slide6":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5ZPM7UaofLE_DX1890_DY1890_CX945_CY530.png');
            $('#lc-footer-img').attr('src', 'Images/5wkt9k2zg90_DX1110_DY1110_CX555_CY160.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').text('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Comment garder son calme et expliquer l’impact de la consommation de cannabis." + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html("« Bon, c’est ton affaire, mais si tu gères toujours ton stress en fumant du pot, tu n’iras pas bien loin dans la vie. »");
            $('#rc-opt-2').html("« Juste du pot ! Et après ça sera juste de la cocaïne et tu seras juste  une droguée ! Après tout, c’est juste ta vie. »");
            $('#rc-opt-3').html("« Un instant, le pot, c’est une drogue et toutes les drogues ont des impacts !  En consommer régulièrement, ça donne exactement le contraire de ce que tu as dit. »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule4_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5dbjW9897cg_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6LaGG0B3GPA_DX1110_DY1110_CX555_CY160.png');
            $('.convertion').removeClass('collapse');
            $('#conv4-slide7').removeClass('collapse');
            break;

        case "capsule4_slide8":
            fnAddCollapseClass();
            $("#next").css("pointer-events",'none');
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5dbjW9897cg_DX1890_DY1890_CX945_CY530.png');
            $('#lc-footer-img').attr('src', 'Images/6LaGG0B3GPA_DX1110_DY1110_CX555_CY160.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').text('Dilemme : ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Comment l’amener à arrêter de fumer et à se reprendre en main à l’école?" + '»' + "</dfn>");
            $('#rc-header-que').text("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').text("« Ta mère et moi, on est contre le fait que tu fumes du pot.  Mais j’aimerais qu’on regarde comment on peut t’aider à gérer ton stress autrement. »");
            $('#rc-opt-2').text("« Visiblement, tu n’es pas assez mature pour trouver une solution.  À partir de maintenant, tu rentres tout de suite après l’école pour faire tes devoirs. »");
            $('#rc-opt-3').text("« C’est simple : tu améliores tes notes et ta mère et moi, on ne veut plus entendre parler de drogue. »");
            $('#rc-footer-confirm').removeClass('collapse');
//
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();

            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule4_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5wrz9olrxwX_DX1890_DY1890_CX945_CY530.png');
            $('.fw-footer').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5zOVHYoqrBl_DX1110_DY1110_CX555_CY160.png');
            $('.convertion').removeClass('collapse');
            $('#conv4-slide9').removeClass('collapse');
            break;

        case "capsule4_slide10":
            fnAddCollapseClass();
            $('.full-width-content').addClass('collapse');
            $('.content-view-1').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5vAre4J4XO2_DX1890_DY1890_CX945_CY530.png');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5zOVHYoqrBl_DX1110_DY1110_CX555_CY160.png');
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>Les conflits sont inévitables dans une famille. Ce n’est pas leur fréquence qui est problématique, mais plutôt le degré de frustration et les sentiments de colère ou d’injustice qu’ils créent chez l’adolescent.<br /><br />Alexandra devait comprendre que la consommation de cannabis n’était pas une solution à ses problèmes scolaires. En privilégiant une stratégie de collaboration et en évitant de blesser sa fille dans le conflit, Éric lui a montré qu’elle pouvait compter sur sa famille pour régler ses difficultés.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Quelle est votre stratégie de résolution de conflits?</span></li></ul>");
            break;

        case "capsule4_slide11":
            fnAddCollapseClass();
            $('#slide-capsule1').removeClass('collapse');
            $('.fw-content').show();
            fnShowNextButton();
            $('#slide-dyn').attr('src', 'Images/5fIEnF5ZlqL_DX1890_DY1890_CX945_CY530.png');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap1-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu une nouvelle fiche d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>FICHES d'Informations obtenues</span></th><th><span class='text-uppercase orange'>CROYANCES DISCUTÉES DANS LES CAPSULES</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='download_resource img-responsive' name='resolution_conflit' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span class='default_cursor'>(cliquez pour consulter)</span><span class='download_resource text-upper cust-span-em' name='resolution_conflit'><span class='fa fa-angle-double-right'></span>LES STRATÉGIES DE RÉSOLUTION DE CONFLITS</span></div></td><td><span>Prenez en note les numèros de croyances à consulter<br />4-5-9-11-16-17-18-19-21</span></td></tr><tr><td><span>La fiche est maintenant disponible dans l'onglet Ressources.</span></td><td><span>Consultez le tableau dans l'onglet Ressources pour voir les arguments utilisés pour y faire face.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            $('.cust-span-em').css('font-size', '60%');
            $('.cust-span-em').css('width', '175px');
            fnResourceDownloadClickEvent();
            break;

        case "intro_menuAfterCap4":
            //hide next button
//            $("#next").addClass('content-collapse');
            fnShowNextButton();

            $('#slide-capsule1').addClass('collapse');
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-menu').removeClass('collapse');
            // --- Collapse --- //
            $('#transition').addClass('collapse');
            // --- Show --- //
            $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
            $('#slide-dyn').removeClass('collapse');
            $('#slide-menu').removeClass('collapse');
            $('#cap-img-1').attr('src', 'Images/62nL0mUWegS_DX630_DY630_CX211_CY315.png');
            $('#cap-img-2').attr('src', 'Images/5fOa3eko1NA_DX630_DY630_CX211_CY315.png');
            $('#cap-img-3').attr('src', 'Images/6gMh41j4l4l_DX630_DY630_CX211_CY315.png');
            $('#cap-img-4').attr('src', 'Images/6cybjdXpjo5_DX630_DY630_CX211_CY315.png');
            $('#capsule4').removeClass('active');
            $('#capsule2').css('opacity', '1');
            $('#capsule3').css('opacity', '1');
            $('#capsule4').css('opacity', '1');
            // --- Show --- //
            break;
        case "resource":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            fnShowNextButton();
            fnSetModelScreen();

            $('.fw-content').removeAttr("style");
            $('#slide1').addClass("content-collapse");
            $('#slide1').removeAttr('style');
            $('#slide1').css("dispaly","none");



            $('#btnStart').addClass('content-collapse');
            $('#firstslideheader').addClass('content-collapse');

            $('#slide-dyn').removeClass('content-collapse');
            $('#slide-dyn').attr('src', 'Images/5eexq4u95MM_DX1890_DY1890_CX945_CY530.png');

            //$('#bergeron-footer').removeClass('collapse');
            $('#footer-next-indicator').removeClass('collapse');

            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');

            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').append("<div id='resource-menu'><div class='resourse-header'><span class='orange text-upper in-block font-m-lg'>ressources</span><span class='in-block font-lg'>Cliquez sur les fiches d'informations obtenues et les croyances pour les consulter.</span></div><div class='content-top'><ul class='font-med'><li><span class='text-upper'>CROYANCES discutées dans les capsules:</span></li></ul><div id='content-top-images' class='in-block'><div class='res-img-dtl' style='cursor: pointer'><img class='download_resource' name='croyances' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><div><p class='fa fa-angle-double-right font-sm'></p><span class='download_resource text-upper font-sm' name='croyances'>Tableaux des croyances</span></div></div><div class='res-img-dtl' style='cursor: pointer'><img class='download_resource' name='psychotropes' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><div><p class='fa fa-angle-double-right font-sm'></p><span class='download_resource text-upper font-sm' name='psychotropes'>Les psychotropes</span></a></div></div></div></div><hr /><div class='res-content'><ul class='font-med'><li><span class='text-upper'>FICHES d'Informations obtenues:</span></li></ul><div><div class='res-box'><span class='font-sm'>Relation de qualité</span><span class='font-x-lg'>01</span></div><div class='res-box'><span class='font-sm'>Communiquer efficacement</span><span class='font-x-lg'>02</span></div><div class='res-box'><span class='font-sm'>Pratiques parentales</span><span class='font-x-lg'>03</span></div><div class='res-box'><span class='font-sm'>Résoudre les conflits</span><span class='font-x-lg'>04</span></div></div></div><div class='res-footer'><span>Cliquez sur Suivant pour continuer.</span></div></div>");
//            console.log($("#slide-dyn").height()," === ",$("#slide-dyn").width());
            $(".fw-content").removeClass("cap1-last-slide");
            setTimeout(function(){
                $("#slide-capsule1").css("height",$("#slide-dyn").height());
                $("#slide-capsule1").css("width",$("#slide-dyn").width());
            },100);
            fnResourceDownloadClickEvent();
            break;

        case "help":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            fnShowNextButton();
            $('#welcome').addClass('content-collapse');
            $('#slide1').addClass('content-collapse');
            $('#slide1').css('display','none')
            $("#firstslideheader").addClass('content-collapse');
            $('#btnStart').addClass('content-collapse');
            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $("#next").addClass("fade.in");
            $("#prev").addClass("fade.in");
            $('#slide-dyn').removeClass('content-collapse');
            $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
            $('#footer-next-indicator').removeClass('collapse');

            var scrw = $(window).width();
            // --- Show --- //
            if (scrw <= 600) {
                $('.well').css('width', '77%');
            }
            else if (scrw <= 768) {
                $('.well').css('width', '82.5%');
            }
            else if (scrw <= 980) {
                $('.well').css('width', '86%');
            }
            else if (scrw <= 1366) {
                $('.well').css('width', '87%');
            }
            else if (scrw >= 1920) {
                $('.well').css('width', '91%');
                $(".aud-control").css("width","9.4%");
            }
            else {
                $('.well').css('width', '87%');
            }
            $('#help-header').show();
            $('#audwelcom').css('margin-right', '15px');
            $('.custom-audio-button').removeClass('content-collapse');
            $('.navigation-help').removeClass('content-collapse');
            $('#infrom-navi').removeClass('content-collapse');
            $('#help-header').html("<span class='text-upper'>voici les principaux éléments de votre environnement interactif.</span>");
            break;

        case "thankYou":
            fnAddCollapseClass();
            fnHideNextButton();
            fnSetModelScreen();
//            fnAddCollapseClassIntroCapsule();
            $('#slide-dyn').attr('src', 'Images/5eexq4u95MM_DX1890_DY1890_CX945_CY530.png');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.content-view-1').addClass('collapse');
            $('#slide-menu').addClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').removeAttr('style');
            $('.fw-content').removeClass('cap1-last-slide');
            $('.fw-content').html("");
            $('.fw-content').append("<div id='slide-thanks'><div class='in-block v-align-m'><img src='Images/image003.jpg' alt='' /></div><div class='in-block v-align-m custom-margin-left'><span class='font-xx-lg'>APTE Parents</span></div></div>");
            $('.fw-content').append("<div class='text-center custom-margin-top'><span class='orange f-w-med font-x-lg'>Remerciements et crédits</span></div>");
            $('.fw-content').append("<div class='text-center'><span class='orange f-w-med font-m-lg'>Centre québécois de lutte aux dépendances (CQLD)</span></div>");
            $('.fw-content').append("<div class='custom-margin-top text-center'><div class='in-block v-align-m col-mid-width-6 font-med'><span>Pierre Vaugeois<br />Geneviève Lefebvre</span></div><div class='in-block v-align-m col-mid-width-6'><span>Directeur scientifique<br />Directrice générale </span></div></div>");
            $('.fw-content').append("<div class='custom-margin-top text-center'><div class='in-block v-align-m col-mid-width-6 font-med'><span class='orange block'>Production</span><span>Ellicom inc.</span></div><div class='in-block v-align-m col-mid-width-6'><span class='orange block'>Soutien financier</span><span>Santé Canada</span></div></div>");
            $('.fw-content').append("<div class='custom-margin-top text-center font-med'><div class='col-mid-width-6 in-block'><span class='orange block'>Réalisation</span><span>Centre québécois de lutte aux dépendances (CQLD) Dépôt légal, Bibliothèque et Archives nationales du Canada 2014.</span><span class='orange text-upper f-w-med block'>isbn</span><span>978-0-9881422-3-7</span></div></div>");

            break;

        default:
//            console.log("Default Call In fnSlideWiseAddOrRemoveElementClass function");
    }

    $('.convertion').addClass('collapse');


};

function fnResourceDownloadClickEvent(){
    $(".download_resource").click(function(){
        var resourcePath = 'external_files/'+$(this).attr('name')+'.pdf';
        download_resource(resourcePath);

    });
}
function download_resource(path){
    window.open(path,'_blank');
//    window.location = path;
};

function fnDisableNextPrev(){
    $("#next").css("pointer-events","none");
    $("#next").css("cursor","default");
    $("#prev").css("pointer-events","none");
    $("#prev").css("cursor","default");
};

function fnEnableNextPrev(){
    $("#next").removeAttr("style");
    $("#prev").removeAttr("style");
};

function fnSlideWiseEffectManage(curTime,singleObj){
    var getSlideWiseData = singleObj;
    switch (getSlideWiseData.name) {
        case "capsule1_slide1":
        case "capsule1_slide7":
        case "capsule1_slide9":
        case "capsule1_slide12":
        case "capsule2_slide1":
        case "capsule3_slide1":
        case "capsule4_slide1":
        case "capsule3_slide8":
            for(var intIndex=0;intIndex<getSlideWiseData.popupContent.length;intIndex++)
            {
                if(curTime == getSlideWiseData.popupContent[intIndex].startingTime){
                    fnDisableNextPrev();
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeIn(1000,function(){
                        fnEnableNextPrev();
                    });
                    if(getSlideWiseData.popupContent[intIndex].contentClass == "fw-header"){
                        $('.'+getSlideWiseData.popupContent[intIndex].contentClass).css('display','inline-block');
                    }
                }
            }
            for(var intIndex=0;intIndex<getSlideWiseData.popupImg.length;intIndex++)
            {
                if(curTime == getSlideWiseData.popupImg[intIndex].startingTime){
                    fnDisableNextPrev();
                    $('.'+getSlideWiseData.popupImg[intIndex].imgClass).fadeIn(1000,function(){
                        fnEnableNextPrev();
                    });
                }
                if(curTime == getSlideWiseData.popupImg[intIndex].endingTime && getSlideWiseData.name=="capsule1_slide12"){
                    $('.'+getSlideWiseData.popupImg[intIndex].imgClass).fadeOut(1000);
                    /*$('#fw-header-1').html('');
                     $('#fw-header-2').html('');
                     $('.fw-header').css("display","none");*/
                }
            }
            break;

        default:
            break;
    }
};

function fnSlideWiseEffectRemoveOnEvent(curTime,singleObj){
    var getSlideWiseData = singleObj;
    switch (getSlideWiseData.name) {
        case "capsule1_slide1":
        case "capsule1_slide7":
        case "capsule1_slide9":
        case "capsule1_slide12":
        case "capsule2_slide1":
        case "capsule3_slide1":
        case "capsule4_slide1":
        case "capsule3_slide8":
            for(var intIndex=0;intIndex<getSlideWiseData.popupContent.length;intIndex++)
            {
                if(getSlideWiseData.popupContent[intIndex].startingTime < curTime  && curTime <= getSlideWiseData.popupContent[intIndex].endingTime){
                    fnDisableNextPrev();
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeIn(1000,function(){
                        fnEnableNextPrev();
                    });
                    if(getSlideWiseData.popupContent[intIndex].contentClass == "fw-header"){
                        $('.'+getSlideWiseData.popupContent[intIndex].contentClass).css('display','inline-block');
                    }
                }
                else{
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).hide();
                }
            }
            for(var intIndex=0;intIndex<getSlideWiseData.popupImg.length;intIndex++)
            {
                if(getSlideWiseData.popupImg[intIndex].startingTime <= curTime  && curTime <= getSlideWiseData.popupImg[intIndex].endingTime){
                    fnDisableNextPrev();
                    $('.'+getSlideWiseData.popupImg[intIndex].imgClass).fadeIn(1000,function(){
                        fnEnableNextPrev();
                    });
                }
                else{
                    $('.'+getSlideWiseData.popupImg[intIndex].imgClass).fadeOut(1000);
                }
            }
            break;

        default:
            break;
    }
};

/*--------------Slide wise Conversation manage---------*/
function fnSlideWiseConversationManage(curTime,singleObj){
    var getSlideWiseData = singleObj;
    switch (getSlideWiseData.name) {
        case "capsule1_slide3":
        case "capsule1_slide5":
        case "capsule1_slide6":
        case "capsule1_slide8":
        case "capsule1_slide10":
        case "capsule1_slide12":
        case "capsule1_slide14":
        case "capsule2_slide3":
        case "capsule2_slide5":
        case "capsule2_slide7":
        case "capsule2_slide8":
        case "capsule2_slide9":
        case "capsule2_slide11":
        case "capsule3_slide4":
        case "capsule3_slide6":
        case "capsule3_slide7":
        case "capsule3_slide9":
        case "capsule3_slide11":
        case "capsule4_slide3":
        case "capsule4_slide5":
        case "capsule4_slide7":
        case "capsule4_slide9":
            for(var intIndex=0;intIndex<getSlideWiseData.popupContent.length;intIndex++)
            {
                if(curTime == getSlideWiseData.popupContent[intIndex].startingTime){
                    var popupPosition = getSlideWiseData.popupContent[intIndex].position;
                    var contentText = getSlideWiseData.popupContent[intIndex].contentText;
                    var contentClass = getSlideWiseData.popupContent[intIndex].contentClass;
                    fnDisableNextPrev();
                    fnCreatePopup(contentClass,contentText,popupPosition,getSlideWiseData.popupContent[intIndex].startingTime);
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeIn(1000,function() {
                        fnEnableNextPrev();
                    })
                }
                if(curTime == getSlideWiseData.popupContent[intIndex].endingTime){
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeOut(1000,function(){
                        $(this).remove();
                    });
                }
            }
            break;

        default:
            $(".popup-conversation").html("");
            break;
    }
};

function fnConversationRemoveOnEvent(curTime,singleObj){
    var getSlideWiseData = singleObj;
    switch (getSlideWiseData.name) {
        case "capsule1_slide3":
        case "capsule1_slide5":
        case "capsule1_slide6":
        case "capsule1_slide8":
        case "capsule1_slide10":
        case "capsule1_slide12":
        case "capsule1_slide14":
        case "capsule2_slide3":
        case "capsule2_slide5":
        case "capsule2_slide7":
        case "capsule2_slide8":
        case "capsule2_slide9":
        case "capsule2_slide11":
        case "capsule3_slide4":
        case "capsule3_slide6":
        case "capsule3_slide7":
        case "capsule3_slide9":
        case "capsule3_slide11":
        case "capsule4_slide3":
        case "capsule4_slide5":
        case "capsule4_slide7":
        case "capsule4_slide9":
            for(var intIndex=0;intIndex<getSlideWiseData.popupContent.length;intIndex++)
            {
                var popupPosition = getSlideWiseData.popupContent[intIndex].position;
                var contentText = getSlideWiseData.popupContent[intIndex].contentText;
                var contentClass =getSlideWiseData.popupContent[intIndex].contentClass;
                if(getSlideWiseData.popupContent[intIndex].startingTime <= curTime  && curTime <= getSlideWiseData.popupContent[intIndex].endingTime){
                    fnCreatePopupOnEvent(contentClass,contentText,popupPosition,getSlideWiseData.popupContent[intIndex].startingTime);
                }
            }
            break;
        default:
            break;
    }
};

function fnCreatePopup(popupClass,content,position,startTime){
    if(stTime != startTime){
        stTime = startTime;
        var popupPos = "talkbubble-"+popupClass.split("-")[1];
        var html = '';
        html += '<div class="convertion '+popupClass+'">';
        html += '    <div>';
        html += '       <div id='+popupPos+'>';
        html += '           <span></span>';
        html += '        </div>';
        html += '   </div>';
        html += '</div>';

        $(html).appendTo('.popup-conversation');
        $('#'+popupPos).parent().parent().css('display','none');
        $('#'+popupPos).parent().parent().css('top',position.top+'px');
        $('#'+popupPos).parent().parent().css('left',position.left+'px');
        $('#'+popupPos).find('span').text(content);
    }
};

function fnCreatePopupOnEvent(popupClass,content,position,startTime){
    var popupPos = "talkbubble-" + popupClass.split("-")[1];
    var html = '';
    html += '<div class="convertion ' + popupClass + '">';
    html += '    <div>';
    html += '       <div id=' + popupPos + '>';
    html += '           <span></span>';
    html += '        </div>';
    html += '   </div>';
    html += '</div>';

    $('.popup-conversation').html(html);
    $('#' + popupPos).parent().parent().css('top', position.top + 'px');
    $('#' + popupPos).parent().parent().css('left', position.left + 'px');
    $('#' + popupPos).find('span').text(content);
};

function opendd() {
    if ($('.dropdown-menu').css('display') === 'none') {
        $('.dropdown-menu').css('display','block');
    }
    else {
        $('.dropdown-menu').css('display', 'none');
    }
}
function tglclass() {
    //alert("toggle-introduction")
    $("#tgldtl").toggle(function () {
        $('.dropdown-menu').css('display', 'block');
        if ($(this).css('display') === 'none') {
            $("#toggle-header").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
            $("#tgl-intro-icon").removeClass("fa-caret-down");
            $("#tgl-intro-icon").addClass("fa-caret-right")
        }
        else {
//            $('.dropdown-menu').css('display', 'none');
            $("#toggle-header").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            $("#tgl-intro-icon").removeClass("fa-caret-right");
            $("#tgl-intro-icon").addClass("fa-caret-down")
            //$(this).fadeIn();

        }
    })
}



function tglclass1() {
    //alert("toggle1-capsule1");
    $("#tgldtl1").toggle(function () {
        $('.dropdown-menu').css('display', 'block');
        if ($(this).css('display') === 'none') {
            $("#toggle-header1").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
            $("#tgl-cap1-icon").removeClass("fa-caret-down");
            $("#tgl-cap1-icon").addClass("fa-caret-right");
        }
        else {
//            $('.dropdown-menu').css('display', 'none');
            $("#toggle-header1").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            $("#tgl-cap1-icon").removeClass("fa-caret-right");
            $("#tgl-cap1-icon").addClass("fa-caret-down");
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass2() {
    //alert("toggle1-capsule2");
    $("#tgldtl2").toggle(function () {
        $('.dropdown-menu').css('display', 'block');
        if ($(this).css('display') === 'none') {
            $("#toggle-header2").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
            $("#tgl-cap2-icon").removeClass("fa-caret-down");
            $("#tgl-cap2-icon").addClass("fa-caret-right");
        }
        else {
//            $('.dropdown-menu').css('display', 'none');
            $("#toggle-header2").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            $("#tgl-cap2-icon").removeClass("fa-caret-right");
            $("#tgl-cap2-icon").addClass("fa-caret-down");
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass3() {
    //alert("toggle1-capsule3");
    $("#tgldtl3").toggle(function () {
        $('.dropdown-menu').css('display', 'block');
        if ($(this).css('display') === 'none') {
            $("#toggle-header3").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
            $("#tgl-cap3-icon").removeClass("fa-caret-down");
            $("#tgl-cap3-icon").addClass("fa-caret-right");
        }
        else {
//            $('.dropdown-menu').css('display', 'none');
            $("#toggle-header3").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            $("#tgl-cap3-icon").removeClass("fa-caret-right");
            $("#tgl-cap3-icon").addClass("fa-caret-down");
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass4() {
    //alert("toggle1-capsule4");
    $("#tgldtl4").toggle(function () {
        $('.dropdown-menu').css('display', 'block');
        if ($(this).css('display') === 'none') {
            $("#toggle-header4").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
            $("#tgl-cap4-icon").removeClass("fa-caret-down");
            $("#tgl-cap4-icon").addClass("fa-caret-right");
        }
        else {
//            $('.dropdown-menu').css('display', 'none');
            $("#toggle-header4").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            $("#tgl-cap4-icon").removeClass("fa-caret-right");
            $("#tgl-cap4-icon").addClass("fa-caret-down");
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
};

function fnShowSelectedAnsData(){
    $.each(viewedSlides, function(index, value) {
        if(getSingleObjOfJSON.name == viewedSlides[index].viewedSlideName){
            if(viewedSlides[index].userSelectedAns != undefined)
            {
                for(var i = 0; i < answer_JSON.length; i++)
                {
                    if(getSingleObjOfJSON.name == answer_JSON[i].slideName){
                        if( answer_JSON[i].rightOption == viewedSlides[index].userSelectedAns){
                            $("#l-c-footer-text").show();
                            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
                            $('#lc-ans-header').html("Tout à fait!");
                            $('#lc-ans-content').html(answer_JSON[i].positiveFeedback.text);
                            $('#option'+answer_JSON[i].rightOption).css('background-image', 'url(Images/6ZhqSSk0Exm_DX72_DY72_CX36_CY36.png)');
                            $('#right'+answer_JSON[i].rightOption).show();
                            $('#lc-footer-img').hide();
                            setupAudioControls(audioSrcBase_mp3+answer_JSON[i].positiveFeedback.audio[0]);
                            $("#val"+viewedSlides[index].userSelectedAns).prop("checked", true);
                        }
                        else{
                            $("#val"+viewedSlides[index].userSelectedAns).prop("checked", true);
                            $("#l-c-footer-text").show();
                            $('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
                            $('#lc-ans-header').html("Ce n’est pas le meilleur choix.");
                            $('#lc-ans-content').html(answer_JSON[i].negativeFeedback.text);
                            $('#lc-footer-img').hide();
                            $('#right'+answer_JSON[i].rightOption).show();
                            setupAudioControls(audioSrcBase_mp3+answer_JSON[i].negativeFeedback.audio[0]);
                        }
                        $("#option1").css("pointer-events",'none');
                        $("#option2").css("pointer-events",'none');
                        $("#option3").css("pointer-events",'none');
                        $("#validate-answer").css("pointer-events",'none');
                        $("#next").css("pointer-events",'auto');
                    }
                }
            }
        }
    });
}

$('#rc-opt-2').html('"' + " Je suis déçue de ton comportement.  On en reparlera demain au déjeuner, quand tu auras dessoûlé." + '"');
