/**
 * Created by VJ on 25/11/14.
 */
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



/* RJ ------------------ Change cookie pagewise -----------------------*/
function changeCookieValue(newValue) {
    $.removeCookie('current_page');
    $.cookie('current_page', newValue, { expires: 7 });
}

function preloadImages(JSONObj){
    var imagesArr = [];
    imagesArr.push(JSONObj.imgName);
    jQuery.each(JSONObj.popupImg,function(i,obj){
        imagesArr.push(obj.imgName)
    });
    $.preload(imagesArr);
}
var imgSrc = ""
function showLoader(imgId){
    if(imgSrc != $(imgId).attr('src')){
        imgSrc = $(imgId).attr('src');
        $("#img-loader").show();
        $(imgId).load(function(){
            $("#img-loader").hide();
            fnSetModelScreen();
        })
    }else{
        $("#img-loader").css("display","none");
    }
}

function startAPT() {
    var scrw = $(window).width();
    $('#mp3source').attr('src', 'Audio/FR/mp3/6n7vVfJToNo_22050_80.mp3');
    $('#APT_Audio_Controls').trigger('load');
    $('#APT_Audio_Controls').trigger('play');

    if (scrw <= 600) {
        $('.well').css('width', '75%');
    }
    else if (scrw <= 768) {
        $('.well').css('width', '80%');
    }
    else {
        $('.well').css('width', '85%');
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

    $('.'+data.contentClass).fadeTo(1000, 0, function () {
        $('.'+data.contentClass).removeClass('content-collapse');
    }).fadeTo(500, 1);
};

function fnOverlayImageContentOnGatherResourcesSlide(data){
    $('#slide-dyn').attr('src', 'Images/67mHodTVPPD_DX1890_DY1890_CX945_CY530.png').fadeTo(2000);
    $('#nested-slide4-1').fadeTo(1000, 0, function () {
        $('#nested-slide4-1').attr('src',"Images/6qB0JuNQzGI_DX1088_DY1088_CX544_CY303.jpg");
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
    else if(curTime > imgArr[0].startingTime && curTime < imgArr[0].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);

        fnFadeEffectRemove(imgArr[1].imgContentId);
        fnFadeEffectRemove(imgArr[2].imgContentId);
        fnFadeEffectRemove(imgArr[3].imgContentId);
    }
    else if(curTime > imgArr[1].startingTime && curTime < imgArr[1].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);

        fnFadeEffectRemove(imgArr[2].imgContentId);
        fnFadeEffectRemove(imgArr[3].imgContentId);

    }
    else if(curTime > imgArr[2].startingTime && curTime < imgArr[2].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[2]);

        fnFadeEffectRemove(imgArr[3].imgContentId);
    }
    else if(curTime > imgArr[3].startingTime && curTime < imgArr[3].endingTime)
    {
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[0]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[1]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[2]);
        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, imgArr[3]);
    }
}

function fnFadeEffectRemove(_id){
//    $("#"+_id).fadeOut(1000, function() {
//        $(this).remove();
//        $(this).removeAttr('style');
//        $(this).removeClass('fade.in');
//        $(this).addClass('fade');
//    });
    $("#"+_id).html("");
};


function setCollapseClassToScreen(screenName){
    $($("div.screen[name="+screenName+"]")).removeClass('content-collapse');
    $($("div.screen:not(.screen[name="+screenName+"])")).addClass('content-collapse');
}

function refreshPopupContent(popupContentArr){
    jQuery.each(popupContentArr,function(i,obj){
        $($("."+obj.contentClass)).css("display",'none');
//        $($("."+obj.contentClass)).addClass("content-collapse");
    });
}


function setupAudioControls(audioName){
    $("#mp3source").attr('src', audioName);
    $('#APT_Audio_Controls').trigger('load');
    $('#APT_Audio_Controls').trigger('play');
}

function refreshPopupImages(popupImageArr){
    jQuery.each(popupImageArr,function(i,obj){
        console.log(obj.contentClass)
        $($("#"+obj.imgId)).css('opacity','0');
        $($("#"+obj.imgId)).addClass("content-collapse");
    });
}

function loadNextPageImages(nextObj){
    var slideImg = new Image();
    slideImg.src = nextObj.imgName;
    console.log(slideImg.src);
}

function fnOverlayImageContentGeneral(imgSrc,popupImageObj){
//    $('#'+popupImageObj.imgId).css('display','block');
    //$('#'+popupImageObj.imgId).css('opacity','1');
    $('#'+popupImageObj.imgId).removeAttr('style');
    $('#'+popupImageObj.imgId).fadeTo(1000, 0, function () {
        $('#'+popupImageObj.imgId).attr('src',imgSrc+popupImageObj.imgName);
        $('#'+popupImageObj.imgId).removeClass('content-collapse');
    }).fadeTo(500, 1);
}

function fnSetupContentByTimeGeneral(currTime,popupContentArr){
    for(var intIndex= 0; intIndex<popupContentArr.length;intIndex++){

        if(currTime < popupContentArr[intIndex].startingTime){
         for(var i=0; i < intIndex; i++ ){
         $("#"+popupContentArr[i].imgId).attr("src",'Images/'+popupContentArr[i].imgName);
         $("#"+popupContentArr[i].imgId).css("opacity","1");
         $("#"+popupContentArr[i].imgId).css("display","inline");
         //                break;
         }
         }else{
         for(var j= intIndex; j< popupContentArr.length; j++){
         $("#"+popupContentArr[j].imgId).removeAttr("src");
         $("#"+popupContentArr[j].imgId).css("opacity","0");
         $("#"+popupContentArr[j].imgId).css("display","none");

         }
         }
        if(currTime < popupContentArr[intIndex].startingTime)
        {
            $("#"+popupContentArr[intIndex].imgId).attr("src",'Images/'+popupContentArr[i].imgName);
            $("#"+popupContentArr[intIndex].imgId).fadeOut(1000,function(){$(this).removeAttr('style');});
            $("#"+popupContentArr[intIndex].imgId)
        }
    }
}
function fnSetModelScreen(){
    var capw = $('.image-shadow').width();
    var caph = $('.image-shadow').height();

    $('.capsule-model').css('width', capw);
    $('.capsule-model').css('height', caph);

}
function fnAddOrRemoveElementClass(){
    $("#bergeron-footer").addClass('content-collapse');
    $(".navigation-help").addClass('content-collapse');
    $(".tips-header").removeClass('content-collapse');
    $("#tips-images").removeClass('content-collapse');
}


function fnAddCollapseClass(){
    $(".popup-conversation").html("");
    $(".popup-conversation").removeAttr("style");
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
    $("#tips-images").find("div").css('opacity','0');
    $("#tips-images").find("div").css('display','none');

    $(".navigation-help").addClass("content-collapse");

    $("#infrom-navi").addClass("content-collapse");

    $("#transition").addClass("content-collapse");

}

function fnSlideWiseContentManage(slide){
    switch (slide) {
        case "introduction":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();

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
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();

            $("#next").removeClass("fade");
            $("#prev").removeClass("fade");
            $("#transition").removeClass("content-collapse");
            $('#slide-dyn').removeClass('content-collapse');
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            break;

        case "intro_menu":
            fnAddCollapseClass();
            fnAddCollapseClassIntroCapsule();
            //hide next button
            $("#next").addClass('fade');
            $("#prev").removeClass("content-collapse");
            $(".playa").css('width','93%');
            $('#slide-dyn').removeClass('content-collapse');
            $("#slide-capsule1").addClass("collapse");
            $('#slide-menu').removeClass('content-collapse');
            $('#slide-menu').removeClass('collapse');
            break;

        case "capsule1_slide1":
            setupAudioControls('Audio/FR/mp3/6CYh8nauv4Z_22050_80.mp3')
            //show next button
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
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
            $('#fw-header-1').css('display','inline');
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

            $('#lc-header-1').css('display','inline');
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
            $('#rc-opt-1').html('"' + "I'm sure they won't bug you that much. Either way,you can just say no. And don't forgot to get your book back from Julie." + '"');
            $('#rc-opt-2').html('"' + "Julie doesm't mind having alchohol aria-atomic her parties? You're much too young! You shouldn't hang out with them if they bug you to drink." + '"');
            $('#rc-opt-3').html('"' + "You're worried about what your friends will say if they see you not drinking. Do you want to talk about it?" + '"');
            /* --- Wrong Answer --- */
//            $('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Ce n’est pas le meilleur choix.");
//            $('#lc-ans-content').html("Pour démontrer son soutien dans cette situation, Isabelle devrait rester amicale et demander à Vincent s’il souhaite en discuter. Vincent doit sentir que sa mère est à l’écoute et qu’elle comprend ses inquiétudes.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Right Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's right.");
            /* --- Content --- */
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
            $('#fw-text').text("Retour à la maison, Vincent est intoxiquè");
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
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/6j2V7CHeU3S_DX1110_DY1110_CX555_CY80.png');
            $('#rc-footer-confirm').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "C’est sûr que je suis fâchée! Je ne comprends pas pourquoi il a agi comme ça… " + '»' + "</dfn>");
            $('#rc-opt-1').html('"' + "I am upset, I thought you had understood. Now I can't trust you anymore." + '"');
            $('#rc-opt-2').html('"' + "I am disappointed in your behaviour. We'll talk tommorrow at breakfast, when you've sobered up." + '"');
            $('#rc-opt-3').html('"' + "I knew it was a bad idea to let you go to a party where there would be alcohol. Why did you drink? Your friends really are bad influence on you!" + '"');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("Vincent doit sentir qu’il peut compter sur sa mère, même si elle est en colère. Elle peut expliquer sa frustration sans le juger ou lui faire des reproches. De plus, discuter de la situation pendant que Vincent est en état d’ébriété est déconseillé. Il faut en parler, mais lorsqu’il sera sobre.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#fw-header-1').css('margin-left', '-9px');
            $('#fw-header-2').text('matin …');
            $('.convertion').removeClass('collapse');
            $('#conv1-slide12').removeClass('collapse');
            break;

        case "capsule1_slide13":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5itRdnRNYV6_DX1110_DY1110_CX555_CY80.png');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Je veux qu’il sache que je suis contre la consommation d’alcool à son âge mais je veux aussi qu’il puisse compter sur moi quand il a des problèmes." + '»' + "</dfn>");
            $('#rc-opt-1').html('"' + "Talk to me. I'd like to understand what happend." + '"');
            $('#rc-opt-2').html('"' + "There's no point in apologizing, I won't here any of it. I don't want you drinking alcohol anymore, that's it." + '"');
            $('#rc-opt-3').html('"' + "OK,it's your business. Do you want some orange juice" + '"');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("En demandant calmement des explications à son fils, Isabelle montrera qu’elle essaie de comprendre ses difficultés et qu’elle souhaite l’aider. Ignorer la situation ou refuser d’écouter Vincent ne sont pas des marques de soutien ou d’affection qui permettent d’établir une relation de qualité.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>En démontrant du <span class='orange'>soutien</span> et de <span class='orange'>l’affection</span> à Vincent, même dans les moments difficiles, Isabelle s’assure de développer et de maintenir une relation de qualité avec lui. S’il se sent compris, aimé et soutenu par ses parents, l’adolescent sera plus ouvert à discuter de ses problèmes avec eux.<br /><br />Isabelle a su discuter avec Vincent de ses croyances concernant l’alcool et avancer des arguments en la matière. Elle refuse également que Vincent consomme de l’alcool avec ses amis à son âge. Avec raison : plus un jeune commence à boire tôt, plus il risque de développer des comportements d’abus et de dépendance.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Comment démontrez-vous votre soutien et votre affection à votre adolescent?</span></li><li><span>Quelles sont vos règles et vos croyances en matière de consommation d’alcool?</span></li></ul>");
            break;

        case "capsule1_slide16":
            fnAddCollapseClass();
            $('.fw-content').show();
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            $('#slide-capsule1').removeClass('collapse');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap1-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu une nouvelle fiche d’information!<br /><br />Consultez-la, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Emotional closeness</span></div></td><td><span>Take note of the numbers of the common beliefs and misconceptions to condult;<br />2-6-7-8-10-12-13-14-15</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            break;

        case "intro_menuAfterCap1":
            //hide next button
            $("#next").addClass('content-collapse');
            $(".playa").css('width','93%');

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
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
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
            $('#fw-header-1').css('display','inline');
            $('#fw-header-1').html('Communiquer efficacement avec');
//            $('#fw-header-1').css('margin-left', '-35px');
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
            $('#lc-header-1').css('margin-left', '-35px');
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
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5x6jNaSP9Di_DX1110_DY1110_CX555_CY92.png');
            $('#rc-content-select').removeClass('collapse');
            $('.r-c-header').removeClass('collapse');
            $('#rc-header-1').text('Dilemme: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '«' + "Un gars “bizarre”?" + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html('"' + "Just ignor him.So, Do you like your teachers ?" + '"');
            $('#rc-opt-2').html('"' + "Who is this guy? Why do you find him wired?" + '"');
            $('#rc-opt-3').html('"' + "Come on, we don't talk like that about other people! He must not be any different from the others in your class." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').text("Tout à fait!");
//            $('#lc-ans-content').text("L’ouverture et l’information sont la clé d’une communication efficace entre parents et adolescents. En essayant d’en savoir plus sur « le gars bizarre » sans juger Vincent, Éric et Isabelle montreront qu’ils écoutent et qu’ils s’intéressent à ce que leur fils dit et pense. De plus, ils seront informés sur les personnes qui l’entourent à l’école.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5jtfXPcnPam_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-1').text('Dilemme: ');
            $('#rc-header-2').html();
            $('#rc-header-2').html("<dfn>" + '«' + "Du speed… Est-ce que je devrais lui en parler? Je ne veux pas attiser sa curiosité!" + '»' + "</dfn>");
            $('#rc-header-que').html("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').html('"' + "It is very dangerous drug. I forbid you from talking it and I don't want to hear you talking about these things at home ." + '"');
            $('#rc-opt-2').html('"' + "I'm not sure I should tell you about it. I'm sure they'll explain it to you at school." + '"');
            $('#rc-opt-3').html('"' + "It's a drug. If you want, we can talk about it..." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Ce n’est pas le meilleur choix.");
//            $('#lc-ans-content').html("Faire preuve d’ouverture implique de répondre franchement quand un adolescent pose des questions. De plus, il a été démontré que lorsque les parents parlent de drogue avec leurs enfants, ces derniers risquent moins d’en consommer. Isabelle et Éric devraient donc continuer la discussion.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('.content-view-1').removeClass('collapse');
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5jbpvP1X5sc_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#rc-content-select').removeClass('collapse');
            $('#rc-header-1').text('Dilemme : ');
            $('#rc-header-2').empty();
            $('#rc-header-2').append("<dfn>" + '«' + "Tant mieux. Il faudrait que ça reste comme ça : il ne faut pas que Vincent soit influencé par ce jeune-là." + '»' + "</dfn>");
            $('#rc-header-que').text("Quelle est la meilleure intervention à ce moment?");
            $('#rc-opt-1').text('"' + "We're intrested in getting to know the people you hang out with and what you do together. If the opportunity presents it self, what would you do?" + '"');
            $('#rc-opt-2').text('"' + "Very good.we know you have good judgement and would never take drugs, So don't pay attentaion him." + '"');
            $('#rc-opt-3').text('"' + "You're better off. We don't want you hanging out with this guy nor do we want hear about him anymore." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').text("Tout à fait!");
//            $('#lc-ans-content').text("En étant bien informés sur les amis et les activités de Vincent, Isabelle et Éric pourront aider leur fils à reconnaître les situations à risque afin d’y faire face de la meilleure façon possible.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap2-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations! </span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu de nouvelles fiches d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Openness to cpmmunication</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>parental information</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>precautionary messages</span></div></td><td class='v-align-t'><span>Take note of the numbers of the common beliefs and misconceptions;<br />1-20-22-23</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            break;

        case "intro_menuAfterCap2":
            //hide next button
            $("#next").addClass('content-collapse');
            $(".playa").css('width','93%');

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
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
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
            $('#fw-header-1').css('margin-left', '-16px');
            $('#fw-header-2').html('parenting practices');
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
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Pour bien gérer cette situation, Isabelle et Éric devront appliquer de bonnes pratiques parentales. Celles-ci incluent le contrôle parental qu’ils exercent, leur tolérance et leur style disciplinaire.<br /><br />Votre objectif est <span class='orange'>d’aider Isabelle et Éric àmettre en application ces bonnes pratiques parentales.</span> Au cours de la discussion, vous devrez également les aider à <span class='orange'>argumenter face à certaines croyances sur la consommation d’alcool.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>Pour commencer, passez à l’écran suivant.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#rc-content-select').addClass('collapse');
            $('#lc-header-1').html('Exercer de bonnes ');
            $('#lc-header-1').css('margin-left', '-16px');
            $('#lc-header-2').html('parenting practices');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");
            $('#lc-content').html("<span class='font-xx-lg'>03</span>");
            break;

        case "capsule3_slide3":
            fnAddCollapseClass();
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
            $('#rc-opt-1').html('"' + "Ok, you can invite Matthew ans Sarah." + '"');
            $('#rc-opt-2').html('"' + "No problem,you can do whatever you like so long as everybody's gone when we get back!" + '"');
            $('#rc-opt-3').html('"' + "Absolutely not. There's no way we're going to allow a party to happen while we're not here." + '"');
            /* --- Right Answer --- */
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("En acceptant que leurs ados reçoivent des ami(e)s en leur absence, Isabelle et Éric feront preuve d’une saine tolérance. ");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            /* --- Content --- */
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
            $('#rc-opt-1').html('"' + "Go ahead,You're going to do what you want anyways." + '"');
            $('#rc-opt-2').html('"' + "No, you cannot have any alcohol.But it's true that we've never actually speoken about this. As we do for everything else, we're going to take the time to discuss this and establish some ground rules." + '"');
            $('#rc-opt-3').html('"' + "Out of the question.If you have any beer, you'll never be allowed to have any friends over again.Got it?" + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("L’encadrement fait partie du contrôle parental. Isabelle et Éric doivent fixer des règles et exiger qu’elles soient respectées. Toutefois, la menace d’une punition excessive est inutile. De plus, des règles et attentes claires en ce qui a trait à l’alcool, au cannabis ou aux autres drogues protègent les jeunes des problèmes de consommation.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-opt-1').html('"' + "You understand that there will be consequences.No friends over for the next month." + '"');
            $('#rc-opt-2').html('"' + "You always do what you want! We'll never get anywere with you! Wait untill your father gets homeâ€¦" + '"');
            $('#rc-opt-3').html('"' + "Ok,I am in no state to agure,so let's drop it.Don't tell your father and we'll forget it even happened." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("Lorsque c’est possible, Isabelle devrait exercer son autorité parentale par des négociations avec ses ados (style disciplinaire inductif). Mais dans ce cas-ci, une règle a été brisée en toute conscience. La punition (style punitif) est donc acceptable. Isabelle doit cependant éviter l’agressivité ou les menaces (style coercitif), autant que l’absence de discipline (style permissif).");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>Les bonnes pratiques parentales font référence au <span class='orange'>contrôle parental</span> (composé d’encadrement et d’autorisation), à la <span class='orange'>tolérance</span> et au <span class='orange'>style disciplinaire inductif</span> (fondé sur la négociation).<br /><br />Alexandra et Vincent savaient qu’ils devaient demander l’autorisation de recevoir des amis à la maison en l’absence de leurs parents. En acceptant tout en fixant des règles claires, Éric et Isabelle ont fait preuve une tolérance et un bon encadrement. Ils ont également agi pour protéger leurs enfants des risques d’une consommation d’alcool prématurée. Lorsque les règles ont été brisées, il était acceptable qu’Isabelle exerce un style disciplinaire punitif, sans agressivité.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>Et vous?</span>");
            $('#rc-footer-text').html("<ul class='f-w-med'><li><span>Comment exercez-vous votre contrôle parental?</span></li><li><span>Quel est votre seuil de tolérance?</span></li><li><span>Quel est votre style disciplinaire?</span></li></ul>");
            break;

        case "capsule3_slide13":
            fnAddCollapseClass();
            $('#slide-capsule1').removeClass('collapse');
            $('.fw-content').show();
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            $('#slide-dyn').attr('src', 'Images/6kSF2jw7moU_DX1890_DY1890_CX945_CY530.png');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap2-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu de nouvelles fiches d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Parental control</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>DISCIPLINARY STYLE</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>TOLERANCE</span></div></td><td class='v-align-t'><span>Take note of the numbers of the common beliefs and misconceptions to consult;<br />1-2-3</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            break;
        case "intro_menuAfterCap3":
            //hide next button
            $("#next").addClass('content-collapse');
            $(".playa").css('width','93%');

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
            //show next button
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
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
            $('.fw-footer-r-content').html("<span class='font-med f-w-med'>Éric est rentré plus tôt à la maison aujourd’hui. Il veut discuter avec Alexandra à son retour de l’école. En effet, Éric et Isabelle ont reçu un message d’une enseignante : depuis quelques semaines, Alexandra dort souvent en classe et manque des cours.<br />C’est la deuxième fois que l’école communique avec eux. Plus tôt cette année, d’autres enseignants avaient signalé une baisse importante des résultats scolaires d’Alexandra, qui ne se sont pas améliorés depuis…</span>");
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
            $('#rc-opt-1').html('"' + "That's enough! You have to stop it right way. You cannot flunk the school year because of this." + '"');
            $('#rc-opt-2').html('"' + "Don't tell me you've become a pothead like your cousion? Honestly, I throught you were smarter than that." + '"');
            $('#rc-opt-3').html('"' + "I would really like us to talk about it.How often do you smoke?" + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("Bien que les conflits soient inévitables dans une famille, il faut éviter que ceux-ci dégénèrent au point de blesser, humilier ou faire beaucoup de peine à l’adolescent. Éric devrait tenter d’en savoir plus en évitant de critiquer Alexandra et de lui faire des remarques désagréables. Il ne doit pas laisser aller sa colère au point de dire des insultes, des mots blessants ou des menaces.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-opt-1').html('"' + "Ok,it's your business,but if you deal with stress by smoking pot, you won't get very far in life." + '"');
            $('#rc-opt-2').html('"' + "Just pot? And after that, just cocaine and then you're just a drug addict! It's just your life after all." + '"');
            $('#rc-opt-3').html('"' + "Hold on, pot is drug like any other and it's bad for you! If you use it regularly, it'll have the, it will have the exact opposite effects from what you described." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').html("Tout à fait!");
//            $('#lc-ans-content').html("Éric devrait poursuivre la discussion et informer sa fille, sans se mettre en colère. Le cannabis est une drogue et sa consommation doit être prise au sérieux. Ses impacts, notamment sur la mémoire, sur la concentration et sur la motivation entraînent des troubles scolaires importants. Les relations avec les amis et la famille peuvent également être affectées.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-opt-1').text('"' + "Your mother and I are against you smoking pot. I'd like for us to look into other ways to mange your stress." + '"');
            $('#rc-opt-2').text('"' + "Clearly, You're not mature enough to find a soluation. For now, you'll come straight home after school to do your homework." + '"');
            $('#rc-opt-3').text('"' + "It's simple-you are going to improve your grades and your mother and I never want to hear about drugs again." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
//            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
//            $('#lc-ans-header').text("Tout à fait!");
//            $('#lc-ans-content').text("Quand les intérêts de tout le monde sont compatibles, il vaut mieux utiliser une stratégie de collaboration où tout le monde y gagne. En cas d’urgence, Éric pourrait imposer ses conditions (stratégie de compétition); Alexandra serait alors conciliante (stratégie d’accommodation), mais en sortirait frustrée et donc perdante. Enfin, refuser de discuter du conflit (stratégie d’évitement) amènerait le pire résultat possible.");
            $(".ans-right").find("img").hide();
            $("#l-c-footer-text").hide();
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
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
            $('#rc-footer-text').html("<ul class='f-w-med'><li><span>Quelle est votre stratégie de résolution de conflits?</span></li></ul>");
            break;

        case "capsule4_slide11":
            fnAddCollapseClass();
            $('#slide-capsule1').removeClass('collapse');
            $('.fw-content').show();
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            $('#slide-dyn').attr('src', 'Images/5fIEnF5ZlqL_DX1890_DY1890_CX945_CY530.png');
            $('.full-width-content').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.fw-content').html("");
            $('.fw-content').addClass('cap1-last-slide');
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>Félicitations!</span></div>");
            $('.fw-content').html("<div><span class='text-uppercase font-med'>En terminant cette capsule, vous avez obtenu une nouvelle fiche d’information!<br /><br />Consultez-les, ainsi que le tableau des croyances en matière de psychotropes, pour compléter votre formation :</span></div>");
            $('.fw-content').html("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>CONFLICT RESOLUTION STRATEGIS</span></div></td><td><span>Go to the next screen to return to the main menu.<br />4-5-9-11-16-17-18-19-21</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').html("<span class='font-med nxt-page-msg'>Passez à l’écran suivant pour retourner au menu principal.</span>");
            $('.cust-span-em').css('font-size', '60%');
            break;

        case "intro_menuAfterCap4":
            //hide next button
            $("#next").addClass('content-collapse');
            $(".playa").css('width','93%');

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
        default:
//            console.log("Default Call In fnSlideWiseAddOrRemoveElementClass function");
    }

    $('.convertion').addClass('collapse');
}
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
                    $('.fw-header').css('display','inline-block');
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
            console.log("default section");
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

var stTime = "";
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

function resource() {
    $('#welcome').addClass('collapse');
    $('#slide1').addClass('collapse');
    $('#slide2').addClass('collapse');
    $('#slide-dyn').removeClass('collapse');
    $('#slide-dyn').attr('src', 'Images/5etP8zlvdOA_DX1890_DY1890_CX945_CY530.png');
    //$('#bergeron-footer').removeClass('collapse');
    $('#footer-next-indicator').removeClass('collapse');
    // --- Collapse --- //
    $('.tips-header').addClass('collapse');
    $('#tips-images').addClass('collapse');
    // --- Show --- //
    $('.navigation-help').addClass('collapse');
    $('#infrom-navi').addClass('collapse');
    $('#btnstart').addClass('collapse');
    $('#slide-capsule1').removeClass('collapse');
    $('.full-width-content').removeClass('collapse');
    $('.fw-content').removeClass('collapse');
    $('.fw-header').addClass('collapse');
    $('.fw-content').append("<span class='orange text-upper'>resources</span>");
}




function tglclass() {
    //alert("toggle-introduction")
    $("#tgldtl").toggle(function () {
        if ($(this).css('display') === 'none') {
            $("#toggle-header").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
        }
        else {
            $("#toggle-header").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            //$(this).fadeIn();
        }
    })
}

function tglclass1() {
    //alert("toggle1-capsule1");
    $("#tgldtl1").toggle(function () {
        if ($(this).css('display') === 'none') {
            $("#toggle-header1").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
        }
        else {
            $("#toggle-header1").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass2() {
    //alert("toggle1-capsule2");
    $("#tgldtl2").toggle(function () {
        if ($(this).css('display') === 'none') {
            $("#toggle-header2").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
        }
        else {
            $("#toggle-header2").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass3() {
    //alert("toggle1-capsule3");
    $("#tgldtl3").toggle(function () {
        if ($(this).css('display') === 'none') {
            $("#toggle-header3").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
        }
        else {
            $("#toggle-header3").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
}

function tglclass4() {
    //alert("toggle1-capsule4");
    $("#tgldtl4").toggle(function () {
        if ($(this).css('display') === 'none') {
            $("#toggle-header4").css('background-position', '5px 7px');
            $(this).prop('hidden', 'hidden');
        }
        else {
            $("#toggle-header4").css('background-position', '5px -78px');
            $(this).removeProp('hidden');
            //$(this).fadeIn();
        }
        fnSlideWiseContentManage($(this).attr("name"));
    })
};

