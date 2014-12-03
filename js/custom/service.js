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

function showLoader(imgId){
    $("#img-loader").show();
    $(imgId).load(function(){
        $("#img-loader").hide();
        console.log("Image Loaded === ",imgId);
    })/*.error(function(){
        $("#img-loader").hide();
        alert("error loading image");
    })*/
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

        /*if(currTime < popupContentArr[intIndex].startingTime){
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
         }*/
        if(currTime < popupContentArr[intIndex].startingTime)
        {
//            $("#"+popupContentArr[intIndex].imgId).attr("src",'Images/'+popupContentArr[i].imgName);
//            $("#"+popupContentArr[intIndex].imgId).fadeOut(1000,function(){$(this).removeAttr('style');});
//            $("#"+popupContentArr[intIndex].imgId)
        }
    }
}
function fnSetModelScreen(){
    console.log($('.image-shadow'));
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
}

function fnSlideWiseContentManage(slide){
    switch (slide) {
        case "intro_bergeron":
            $("#bergeron-footer").removeClass('content-collapse');
            break;

        case "intro_navigation_help":
            $("#Tips4online").removeClass('content-collapse');
            $(".tips-header").addClass('content-collapse');
            $(".navigation-help").removeClass('content-collapse');
            $("#tips-images").addClass('content-collapse');
            break;

        case "intro_transition":
            //show next button
            $("#next").removeClass('content-collapse');
            $(".playa").css('width','85%');
            break;

        case "intro_menu":
            //hide next button
            $("#next").addClass('content-collapse');
            $(".playa").css('width','93%');
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
            $('#fw-header-1').text('Establish meaningful relationships between');
            $('#fw-header-2').text('parents and adolescents');
            $('#fw-footer-lr').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');
            $('#fw-day').text('Saturday night');
            $('#fw-time').text('7:30');
            $('#fw-text').text("Jennifer is driving Michael to a party at his friend Julie's. Normally, Michael is a real chatterbox, but tonight, he seems nervous");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;

        case "capsule1_slide2":
            console.log("IN Switch Case");
            fnAddCollapseClass();


            $('.content-view-1').removeClass('collapse');
            $('.fw-header').removeClass('collapse');
            $('.fw-content').removeClass('collapse');
            $('.l-c-header').removeClass('collapse');
            $('#lc-content').removeClass('collapse');
            $('#lc-content').html("");
            $('#lc-content').append("<span class='font-xx-lg'>01</span>");

            $('#lc-header-1').css('display','inline');
            $('#lc-header-1').text('Establish meaningful relationships between');
            $('#lc-header-2').text('parents and adolescents');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Jennifer would like to find out what's bothering Michael. In this situation, the quality of their relationship is crucial to how to the conversation will play out.<br/><br/>A meaningful relationship means love and <span class='orange'>emotional closeness.</span> By showing Michael support and affection, Jennifer will ensure this closeness.<br /><br />Your goal is to help <span class='orange'>Jennifer show Michael support and affection</span>, since he seems distraught.<br /><br />Throughout the discussion, you will also help her <span class='orange'>demystify Michael's beliefs about alchohol consumption</span></span>");
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
            $('#rc-header-1').text('Dilema: ');
            var head = "I didn't think there would be alcohol at this party...But I want to be there for Michael.";
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + head + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-content-select').removeClass('collapse');
            $('#rc-opt-1').html('"' + "I'm sure they won't bug you that much. Either way,you can just say no. And don't forgot to get your book back from Julie." + '"');
            $('#rc-opt-2').html('"' + "Julie doesm't mind having alchohol aria-atomic her parties? You're much too young! You shouldn't hang out with them if they bug you to drink." + '"');
            $('#rc-opt-3').html('"' + "You're worried about what your friends will say if they see you not drinking. Do you want to talk about it?" + '"');
            /* --- Wrong Answer --- */
            $('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's not the best option.");
            $('#lc-ans-content').html("To be supportive, Jennifer should remain friendly and ask Michael if he wants to talk about it. Michael should feel that his mother is all ears and understands why he is worried.");
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
            $('#fw-day').text('Saturday Night');
            $('#fw-time').text('11:00');
            $('#fw-text').text("Phone conversation between Michael and his mother.");
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
            $('#fw-day').text('Saturday Night');
            $('#fw-time').text('11:30');
            $('#fw-text').text("On the way back home, Michael is intoxicated");
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
            $('#rc-header-2').html("<dfn>" + '"' + "Of course I'm angery! I don't understand why he acted that way..." + '"' + "</dfn>");
            $('#rc-opt-1').html('"' + "I am upset, I thought you had understood. Now I can't trust you anymore." + '"');
            $('#rc-opt-2').html('"' + "I am disappointed in your behaviour. We'll talk tommorrow at breakfast, when you've sobered up." + '"');
            $('#rc-opt-3').html('"' + "I knew it was a bad idea to let you go to a party where there would be alcohol. Why did you drink? Your friends really are bad influence on you!" + '"');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("Michael needs to feel that he can count on his mother, even if she is angry. She can express her concerns without judging him or criticizing him. In addition, it is not a good idea to talk while Michael is drunk. It is better to wail until he is sober.");
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
            $('#fw-header-1').text('the next');
            $('#fw-header-1').css('margin-left', '-9px');
            $('#fw-header-2').text('Morning...');
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
            $('#rc-header-2').html("<dfn>" + '"' + "I want him to know I am againstdrinking alcohol at this age, but also, but also want him to feel he can count on me when something is wrong." + '"' + "</dfn>");
            $('#rc-opt-1').html('"' + "Talk to me. I'd like to understand what happend." + '"');
            $('#rc-opt-2').html('"' + "There's no point in apologizing, I won't here any of it. I don't want you drinking alcohol anymore, that's it." + '"');
            $('#rc-opt-3').html('"' + "OK,it's your business. Do you want some orange juice" + '"');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("By calmly asking for explanations from her son, Jennifer will show that she is trying to understand his frustrations and is trying to help. Ignoring the situation or refusing to listen to Michael is not being supportive or affectionate, which compromises their meaningful relationship.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule1_slide14":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('.fw-footer').removeClass('collapse');

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
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>By showing Michael <span class='orange'>support</span> and <span class='orange'>affection</span>, even during difficult times, Jennifer is able to develop and maintain a meaningful relationship with him. Teenagers who feel understood, loved and supported by their parents are more open to discussing their problems with them.<br /><br />By speaking to Michael, Jennifer was able to find out what he thought he knew about drinking alcohol and provided some arguments against it. She also forbids Michael from drinking alcohol with his friends at his age. She has good reason for doing this: the younger a person first starts drinking, the more likely that person is to develop signs of dependancy and alcohol abuse. What about you?</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>What do you think?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>What are your own rules and attitudes about alcohol consumption?</span></li><li><span>How would you show your teenager affection and support?</span></li></ul>");
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
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>congratulations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>to conclude this training capsule, you have received a new information sheet!<br /><br />In order to complete your training, consult the information sheet as well as the common beliefs and misconceptions document:</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Emotional closeness</span></div></td><td><span>Take note of the numbers of the common beliefs and misconceptions to condult;<br />2-6-7-8-10-12-13-14-15</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Go to the next screen to return to the main menu.</span>");
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
            $('#fw-header-1').html('COMMUNICATE EFECTIVELY with');
//            $('#fw-header-1').css('margin-left', '-35px');
            $('#fw-header-2').html('YOUR ADOLESCENTS');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-footer-img').addClass('collapse');
            $('#fw-day').html('Thrusday Night');
            $('#fw-time').html('6:15');
            $('#fw-text').html("Michael started the tenth grade a few days ago. John and jennifer want to know how things are going...");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;

        case "capsule2_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#fw-header-1').html('COMMUNICATE EFECTIVELY');
            $('#fw-header-2').html('YOUR ADOLESCENTS');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>As an addolescent, Michael communicates less with his perents then when he was a child. John and jennifer must therfore ask him about school and his friends, and about any situation that cloud lead him to take alcohol or drugs <br /><br />Your goal is to <span class='orange'>help john and jennifer communicate effectively with michael.</span> Throughtout  the conservation, you will also help them <span class='orange'>counter Michael's beliefs about drug consumption argue their point of view.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>To begin, go tho the next screen.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#lc-header-1').html('COMMUNICATE EFECTIVELY with');
            $('#lc-header-1').css('margin-left', '-35px');
            $('#lc-header-2').html('YOUR ADOLESCENTS');
            $('#lc-content').html("<span class='font-xx-lg'>02</span>");
            break;

        case "capsule2_slide3":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "A wired guy?" + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "Just ignor him.So, Do you like your teachers ?" + '"');
            $('#rc-opt-2').html('"' + "Who is this guy? Why do you find him wired?" + '"');
            $('#rc-opt-3').html('"' + "Come on, we don't talk like that about other people! He must not be any different from the others in your class." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').text("that's right.");
            $('#lc-ans-content').text("Openness and information sharing are the keys to effective communication between parents and adolescents. By trying to get more details about this " + '"' + "wired guys" + '"' + " without judging michael ,john and jennifer will show that they are intrested in what their son thinks and says. In addition they'll find out more about the people he hangs out with at school.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');

            break;
        case "capsule2_slide5":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').html();
            $('#rc-header-2').html("<dfn>" + '"' + "Speed….Should I talk to him about it ? I don't want to fuel his curiosity!" + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "It is very dangerous drug. I forbid you from talking it and I don't want to hear you talking about these things at home ." + '"');
            $('#rc-opt-2').html('"' + "I'm not sure I should tell you about it. I'm sure they'll explain it to you at school." + '"');
            $('#rc-opt-3').html('"' + "It's a drug. If you want, we can talk about it..." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("Being open means answering honestly when an adolescent asks questions. Moreover, It has been proven that when parents talk to their children about drugs, they are less likely to use them. Jennifer and john should therefore pursue the discussion.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule2_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6OQ0upvvXUf_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide7').removeClass('collapse');
            break;

        case "capsule2_slide8":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/6Lvh3hwHKG3_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv2-slide8').removeClass('collapse');
            break;

        case "capsule2_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').empty();
            $('#rc-header-2').append("<dfn>" + '"' + "Very good. It's better this way: Michael Shouldn't allow himself to be influsced by this guy." + '"' + "</dfn>");
            $('#rc-header-que').text("What is the best way to respond?");
            $('#rc-opt-1').text('"' + "We're intrested in getting to know the people you hang out with and what you do together. If the opportunity presents it self, what would you do?" + '"');
            $('#rc-opt-2').text('"' + "Very good.we know you have good judgement and would never take drugs, So don't pay attentaion him." + '"');
            $('#rc-opt-3').text('"' + "You're better off. We don't want you hanging out with this guy nor do we want hear about him anymore." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').text("that's right.");
            $('#lc-ans-content').text("It is true that an adolescent whose group friends use alcohol, marijuna and other drugs is very likely to do the same. However, knowing more about Michael's friends and what they do will help jennifer and john recognize high-risk situations and deal with them in the best way possible.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule2_slide11":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5W7AHu8TBJX_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-content-text').html("<span class='font-med f-w-med block'>To communicate effectively with Michael, John and Jennifer must <span class='orange'>be open</span>. By doing so and asking questions about his circle of friends and what they do, they will be <span class='orange'>well informed</span>. They could also convey <span class='orange'>precautionary messages</span> about the use of psychoactive substances.</span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>How about you?</span>");
            $('#rc-footer-text').append("<ul class='f-w-med'><li><span>Are you open?</span></li><li><span>Are you well informed?</span></li><li><span>What messages do you convey about alcohol, marijuana and other drugs?</span></li></ul>");
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
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>congratulations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>to conclude this training capsule, you have received a new information sheet!<br /><br />In order to complete your training, consult the information sheet as well as the common beliefs and misconceptions document:</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Openness to cpmmunication</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>parental information</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>precautionary messages</span></div></td><td class='v-align-t'><span>Take note of the numbers of the common beliefs and misconceptions;<br />1-20-22-23</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Go to the next screen to return to the main menu.</span>");
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
            $('#fw-header-1').html('Applying good');
            $('#fw-header-1').css('margin-left', '-16px');
            $('#fw-header-2').html('parenting practices');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-day').html('friday');
            $('#fw-time').html('6:00');
            $('#fw-text').html("At dinner,Jennifer and John annouance that they are going to spend the evening with friends. They will be living Michael and Emma home alone as of 7:30. Michael and Emma ask if they can have friends over.");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;

        case "capsule3_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>To sucessfully handle the situation, Jennifer and John need to apply good parenting practices. These included that parental control, tolerance and disciplinary style.<br /><br />Your goal is to <span class='orange'>help Jennifer and John apply these parenting practices.</span> Throghout the discussion, You should also help them <span class='orange'>demystify any belief and misconceptions their adolescents may have about alcohol consumption.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>To begin, go tho the next screen.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#rc-content-select').addClass('collapse');
            $('#lc-header-1').html('Applying good');
            $('#lc-header-1').css('margin-left', '-16px');
            $('#lc-header-2').html('parenting practices');
            $('#lc-content').append("<span class='font-xx-lg'>03</span>");
            break;

        case "capsule3_slide3":
            fnAddCollapseClass();
            $('#rc-content-text').html("");
            $('#l-c-footer-img').removeClass('collapse');
            $('#lc-footer-img').attr('src', 'Images/5b30tlntG0Z_DX1110_DY1110_CX555_CY92.png');
            $('.r-c-header').removeClass('collapse');
            $('#l-c-footer-text').removeClass('collapse');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#rc-header-1').html('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "It would make them happy to have their friends over, but of course we don't want things to get out of hand …" + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-content-select').removeClass('collapse');
            $('#rc-opt-1').html('"' + "Ok, you can invite Matthew ans Sarah." + '"');
            $('#rc-opt-2').html('"' + "No problem,you can do whatever you like so long as everybody's gone when we get back!" + '"');
            $('#rc-opt-3').html('"' + "Absolutely not. There's no way we're going to allow a party to happen while we're not here." + '"');
            /* --- Right Answer --- */
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("By allowing their teenagers to have friends over while they're out, Jennifer and John are demonstarting a heathy tolerance.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            /* --- Content --- */
            break;

        case "capsule3_slide4":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6hmpZppJlxm_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-header-1').html('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "We want them to live their lives, but we need to establish some ground rules first." + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "Go ahead,You're going to do what you want anyways." + '"');
            $('#rc-opt-2').html('"' + "No, you cannot have any alcohol.But it's true that we've never actually speoken about this. As we do for everything else, we're going to take the time to discuss this and establish some ground rules." + '"');
            $('#rc-opt-3').html('"' + "Out of the question.If you have any beer, you'll never be allowed to have any friends over again.Got it?" + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("Decipline is a part of parental control.Jennifer and John need to establish rules and insist they be followed.However, the threat of excessive punishment won't to much good.Futhermore, rules and clear expectation concerning alcohol, marijuana and other drugs protect adolescents from developing  consumption problems.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule3_slide6":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6VSk8oIeeXM_DX1890_DY1890_CX945_CY530.png');
            $('#fw-footer-img').removeClass('collapse');
            $('#fw-footer-img-src').attr('src', 'Images/5faPwXeepBG_DX1110_DY1110_CX555_CY92.png');
            $('.convertion').removeClass('collapse');
            $('#conv3-slide6').removeClass('collapse');
            break;

        case "capsule3_slide7":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6b04fMETRyT_DX1890_DY1890_CX945_CY530.png');
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
            $('#fw-day').html('Friday');
            $('#fw-time').html('10:45');
            $('#fw-text').html("Jennifer has a slight migraine and decides to come home early.John will take a taxi later on.All she wants to do is go to bed,but she notices empty bottles on the living room coffee table.");
            $('.fw-footer').hide();
            break;
        case "capsule3_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/6favrCCzyZW_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-header-1').html('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "I am angry but I have to stay clam so that I don't say anything I will regreat." + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "You understand that there will be consequences.No friends over for the next month." + '"');
            $('#rc-opt-2').html('"' + "You always do what you want! We'll never get anywere with you! Wait untill your father gets home…" + '"');
            $('#rc-opt-3').html('"' + "Ok,I am in no state to agure,so let's drop it.Don't tell your father and we'll forget it even happened." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("When possible,Isabelle should excrise her perental authority through negotiations with her teens (inductive disciplinary style). Punishment (punitive style) is therefore execptable.While isabelle must avoid being aggressive or making threats (corecive style ),she must not avoid disciplne altogether (permissive style).");
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
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>Good parenting practices refer to <span class='orange'>parental control</span> (descipline and authority), <span class='orange'>toleance</span> and an <span class='orange'>inductive disciplinary style</span> (based on negotation).<br /><br />Emma and Michael knew that they needed permission to have friends over when their parents aren't home.By saying yes and their setting precise rules, John and Jennifer showed tolerance and good discipline. They also acted to protect their children from the risks of underage drinking. When the rules were broken, Jennifer had every right to punish her adolescents, without being aggressive.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>HOW ABOUT YOU?</span>");
            $('#rc-footer-text').html("<ul class='f-w-med'><li><span>How do you exercise parental control?</span></li><li><span>What is your level of tolearence?</span></li><li><span>What is your level of discipliary style?</span></li></ul>");
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
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>congratulations!</span></div>");
            $('.fw-content').append("<div><span class='text-uppercase font-med'>to conclude this training capsule, you have received a new information sheet!<br /><br />In order to complete your training, consult the information sheet as well as the common beliefs and misconceptions document:</span></div>");
            $('.fw-content').append("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel wth-o-padd'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>Parental control</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>DISCIPLINARY STYLE</span></div><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>TOLERANCE</span></div></td><td class='v-align-t'><span>Take note of the numbers of the common beliefs and misconceptions to consult;<br />1-2-3</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').append("<span class='font-med nxt-page-msg'>Go to the next screen to return to the main menu.</span>");
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
            $('#fw-header-1').html('RESOLVING CONFLICTS BETWEEN');
            $('#fw-header-1').css('margin-left', '-35px');
            $('#fw-header-2').html('PARENTS AND ADOLESCENTS');
            $('#fw-footer-lr').removeClass('collapse');
            $('#fw-day').text('THUESDAY');
            $('#fw-time').text('4:00');
            $('.fw-footer-content-grp').css('margin-bottom', '2.2%')
            $('.fw-footer-r-content').html("<span class='font-med f-w-med'>John has come home early today. He wants to speek to Emma when she gets home from school. John and Jennifer recived a message from a teacher: for a severel weeks, Emma has been falling asleep in class, And even skipping some.<br />This the second time the school has contected them. Earlier this year, Other teachers reported a significant drop in Emma's grades, Which haven't any improved since.</span>");
            $('.fw-header').hide();
            $('.fw-content').hide();
            $('.fw-footer').hide();
            break;
        case "capsule4_slide2":
            fnAddCollapseClass();
            $('.content-view-1').removeClass('collapse');
            $('#rc-content-text').removeClass('collapse');
            $('#rc-content-text').html("");
            $('#rc-content-text').html("<span class='font-med f-w-med block'>Jennifer and John would like to understand what's going on and see Emma get back on track at school. John is wondering how to handle the situation with Emma: a potential conflict could easily escalate.<br /><br />Your objective is <span class='orange'>to help John resolve a conflict with Emma,</span> Who is having trobule at school. Throughtout the discussion, You also need to <span class='orange'>produce arguments against Emma's misconseptions about smoking marijuana.</span></span>");
            $('#rc-footer-text').removeClass('collapse');
            $('#rc-footer-text').html("");
            $('#rc-footer-text').html("<span id='rc-footer-span' class='font-med'>To begin, go tho the next screen.</span>");
            $('.l-c-header').removeClass('collapse');
            $('#lc-header-1').text('RESOLVING CONFLICTS BETWEEN');
            $('#lc-header-1').css('margin-left', '-35px');
            $('#lc-header-2').text('PARENTS AND ADOLESCENTS');
            $('#lc-content').append("<span class='font-xx-lg'>04</span>");
            break;

        case "capsule4_slide3":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5kP9TIE0HvI_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "I can't believe it. I'm furious but I wan't to know more show that we can work on finding a soluation together." + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "That's enough! You have to stop it right way. You cannot flunk the school year because of this." + '"');
            $('#rc-opt-2').html('"' + "Don't tell me you've become a pothead like your cousion? Honestly, I throught you were smarter than that." + '"');
            $('#rc-opt-3').html('"' + "I would really like us to talk about it.How often do you smoke?" + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("While conflicts are inevitable in a family, You must prevent them from escalating to the point where the adolescent is very hurt, humiliated or upset. Eric should try to get more information without criticizing Alexandra or making hurtful comments. He should not let his anger get the better of him by resortng to insults, hurtful words or threats.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;
        case "capsule4_slide5":
            fnAddCollapseClass();

            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5ZPM7UaofLE_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "How to remain clam and explain the effects of smoking marijuana." + '"' + "</dfn>");
            $('#rc-header-que').html("What is the best way to respond?");
            $('#rc-opt-1').html('"' + "Ok,it's your business,but if you deal with stress by smoking pot, you won't get very far in life." + '"');
            $('#rc-opt-2').html('"' + "Just pot? And after that, just cocaine and then you're just a drug addict! It's just your life after all." + '"');
            $('#rc-opt-3').html('"' + "Hold on, pot is drug like any other and it's bad for you! If you use it regularly, it'll have the, it will have the exact opposite effects from what you described." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').html("that's right.");
            $('#lc-ans-content').html("Eric should continue the conversation and give his daughter information without getting angry. Marijuana is a drug and it's consumption should be taken seriously. It's effects, partycularly on memory, concentraction and motivation, can lead to significant problems at school. Relationship with friends and family could also be affected.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule4_slide7":
            fnAddCollapseClass();

            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5dbjW9897cg_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-header-1').text('Dilema: ');
            $('#rc-header-2').html("");
            $('#rc-header-2').html("<dfn>" + '"' + "How can we get her to stop smoking and get back on track at school?" + '"' + "</dfn>");
            $('#rc-header-que').text("What is the best way to respond?");
            $('#rc-opt-1').text('"' + "Your mother and I are against you smoking pot. I'd like for us to look into other ways to mange your stress." + '"');
            $('#rc-opt-2').text('"' + "Clearly, You're not mature enough to find a soluation. For now, you'll come straight home after school to do your homework." + '"');
            $('#rc-opt-3').text('"' + "It's simple-you are going to improve your grades and your mother and I never want to hear about drugs again." + '"');
            $('#rc-footer-confirm').removeClass('collapse');
            $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
            $('#lc-ans-header').text("that's right.");
            $('#lc-ans-content').text("It is best of use a collaborative strategy in which everybody wins. If the situation is urgent, Eric can impose conditions (competative strategy);Alexandra would therfore corporate (acomodation strategy) but would end upfrustrated and thus not gain anything. Finally refusing to talk about the conflict (avoidance stategy) would cause the worst possible outcome.");
            /* --- Wrong Answer --- */
            //$('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
            //$('#lc-ans-header').text("that's not the best option.");
            $('#l-c-footer-text').removeClass('collapse');
            break;

        case "capsule4_slide9":
            fnAddCollapseClass();
            $('.full-width-content').removeClass('collapse');
            $('#slide-dyn').attr('src', 'Images/5wrz9olrxwX_DX1890_DY1890_CX945_CY530.png');
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
            $('#rc-content-text').html("<span class='font-med f-w-med line-h-125 in-block'>Family conflicts are invitable. How often they occur isn't the problem, but rather the amount of frustraction and feelings of anger or injustince they create within the adolescent.<br /><br />Emma needed to understand that smoking pot was not a soluation to her academic problems. By favouring a collaburative strategy and avoiding hunting his daughter's feelings in the conflict, John showed her that she could count on her family help her resolve her problems.</span>");
            $('#rc-footer-span').html("");
            $('#rc-footer-text').html("<span class='text-uppercase f-w-med'>HOW ABOUT YOU?</span>");
            $('#rc-footer-text').html("<ul class='f-w-med'><li><span>What is your conflict resolution strategy?</span></li></ul>");
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
            $('.fw-content').html("<div><span class='orange text-uppercase font-x-lg'>congratulations!</span></div>");
            $('.fw-content').html("<div><span class='text-uppercase font-med'>to conclude this training capsule, you have received a new information sheet!<br /><br />In order to complete your training, consult the information sheet as well as the common beliefs and misconceptions document:</span></div>");
            $('.fw-content').html("<table class='font-med'><thead><tr><th><span class='text-uppercase orange'>information sheet</span></th><th><span class='text-uppercase orange'>common beliefs and misconceptions covered in the capsule</span></th></tr></thead><tbody><tr><td class='carousel'><div class='custom-img'><img class='img-responsive' src='Images/5nOPbb9fbwT_DX398_DY398_CX199_CY61.png' alt='' /><span>(click to consult)</span><span class='text-upper cust-span-em'><span class='fa fa-angle-double-right'></span>CONFLICT RESOLUTION STRATEGIS</span></div></td><td><span>Go to the next screen to return to the main menu.<br />4-5-9-11-16-17-18-19-21</span></td></tr><tr><td><span>The information sheet is now in the Resources tab.</span></td><td><span>Consult the chart in the Resources tab in order to see the arguments used against these misconceptions.</span></td></tr></tbody></table>");
            $('.fw-content').html("<span class='font-med nxt-page-msg'>Go to the next screen to return to the main menu.</span>");
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
                    $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeIn(2000);
                }
                if(curTime == getSlideWiseData.popupContent[intIndex].endingTime && getSlideWiseData.name=="capsule1_slide12"){
                 $('.'+getSlideWiseData.popupContent[intIndex].contentClass).fadeOut(2000);
                 }
            }
            for(var intIndex=0;intIndex<getSlideWiseData.popupImg.length;intIndex++)
            {
                if(curTime == getSlideWiseData.popupImg[intIndex].startingTime){
                    $('.'+getSlideWiseData.popupImg[intIndex].imgClass).fadeIn(2000);
                }
            }
            break;
    }
};




