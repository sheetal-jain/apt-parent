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
        console.log(obj.contentClass)
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
//        console.log(obj.contentClass)
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
    $('#'+popupImageObj.imgId).css('opacity',"1");
    console.log(popupImageObj.imgId);
    $('#'+popupImageObj.imgId).fadeTo(1000, 0, function () {
        $('#'+popupImageObj.imgId).attr('src',imgSrc+popupImageObj.imgName);
        $('#'+popupImageObj.imgId).removeClass('content-collapse');
    }).fadeTo(500, 1);
}

function fnSetupContentByTimeGeneral(popupContentArr){

}