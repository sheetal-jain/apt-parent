
var objAPT_JSON = ''
var getSingleObjOfJSON = [];
var getScreenName,max;
var curIdx = 0;
var isAudioFlag = false;
var isImgFlag = false;
var isSlideFlag = false;
var isSliderDraggable = false;
var curValue = 0;
var sliderMouse = {mouseDown:0};
var getAudioCurrentTime,duration,getAudioCurrentTimeInSec;

// For convenience
var imgSrcBase = 'Images/';
var audioSrcBase_mp3 = 'Audio/FR/mp3/';
var audioSrcBase_ogg = 'ogg/';
var audio = document.getElementById("APT_Audio_Controls");

/*function hideLoader(){
    $("#preloader").hide();
}*/
$(window).load(function(){
    $('#overlay').fadeOut();
});
$(document).ready(function(){

    /*$(window).resize(function(){
        $('.capsule-model').css('width',  $(window).height());
        $('.capsule-model').css('height', $(window).width());
//        fnSetModelScreen();
    });*/

    //get Content from json
    objAPT_JSON = JSON.parse(fnGetDataFromServer('JSON/APT_Contents_JSON.json').responseText);
    max =objAPT_JSON.length;
    /* RJ------------------ if cookie not exist, create one with the first slide ----------------------*/
    var current_page_cookie = $.cookie('current_page');
    if(current_page_cookie != undefined){
        jQuery.each(objAPT_JSON,function(i,obj){
            if(obj.name == current_page_cookie){
                if(current_page_cookie == 'introduction'){
                    $('#slide-dyn').addClass('content-collapse');
                    $('#slide1').attr('src',imgSrcBase+obj.imgName);
                    showLoader('#slide1');
                    $('#firstslideheader').removeClass('content-collapse');
                    $('#btnStart').removeClass('content-collapse');
                    $('.custom-audio-button').removeClass('fade.in');
//                    $('#slide2').css('display','none');
                    $('.custom-audio-button').addClass('fade');
                    $('#slide2').addClass('fade');
                    $(".playa").removeAttr("style");
                    curIdx = i;
                }
                else if(current_page_cookie == 'intro_welcome'){
                    isImgFlag = false;
                    isAudioFlag = false;
                    $('#slide-dyn').addClass('content-collapse');
                    $('#slide2').css('display','none');
                    $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
                    $('#slide1').css('display','inline');
                    showLoader('#slide1');
                    setCollapseClassToScreen(obj.name);
                    getTopicWiseData(i);
                    curIdx = i;
                    startAPT();
                }
                else{
                    isImgFlag = false;
                    isAudioFlag = false;
                    $('.custom-audio-button').removeClass('fade');
                    $('.custom-audio-button').addClass('fade.in');
                    $('#slide1').addClass('content-collapse');
                    $('.playa').css("width",'87%');
                    $('#btnStart').addClass('content-collapse');
                    $('#firstslideheader').addClass('content-collapse');
                    $('a.custom-audio-button').addClass('fade.in');
                    $("#slide-dyn").attr('src','Images/'+obj.imgName);
                    $('#slide-dyn').removeClass('content-collapse');
                    showLoader('#slide-dyn');
                    $($("div.screen[name="+current_page_cookie+"]")).removeClass('content-collapse');
                    $($("div.screen:not(.screen[name="+current_page_cookie+"])")).addClass('content-collapse');
                    $("#tips-images").find("div").css('opacity','0');
                    $("#tips-images").find("div").css('display','none');
                    if(obj.popupImg.length > 0){
                        refreshPopupImageContent(obj.popupImg);
                    }
                    setTimeout(function(){
                        fnSetModelScreen();
                    },1000)
                    $("#slide-capsule1").removeClass('collapse');
                    fnSlideWiseContentManage(current_page_cookie);
                    setupAudioControls(audioSrcBase_mp3+obj.audioName[0]);
                    getTopicWiseData(i);
                    curIdx = i;
                }
            }
            if(objAPT_JSON[i+1] != undefined){
                preloadImages(objAPT_JSON[i+1]);
            }
            if(objAPT_JSON[i-1] != undefined){
                preloadImages(objAPT_JSON[i-1]);
            }
        });
    }else{
        $.cookie('current_page',objAPT_JSON[0].name, { expires: 7 });
        $('.custom-audio-button').addClass('fade');
        $('#slide2').addClass('fade');
        showLoader('#slide1')
        if(objAPT_JSON[1] != undefined){
            preloadImages(objAPT_JSON[1]);
        }
    }

    preloadImages(objAPT_JSON[1]);
    var slider = new Slider("#audio_sliderID", {
        range: false,
        tooltip: 'hide',
        precision: 0,
        formatter: function(value) {
            return Math.round(value);
        }
    });
    audio.load();

    //start APT Parent Section
    $('#startAPT').click( function() {
        startAPT();
        curIdx=+1;
        getTopicWiseData(curIdx);
        if(objAPT_JSON[curIdx].popupImg.length > 0){
            refreshPopupImageContent(objAPT_JSON[curIdx].popupImg);
        }

        /* RJ----------------------- Set cookie for intro page ------------------*/
        changeCookieValue(objAPT_JSON[curIdx].name);
    });

    // Increment Index
    /*while (curIdx < max) {
     curIdx++;
     }*/

    /*---- --------------------- Dropdown menu header click ----------*/
    $(".toggle-header").click(function(){
        var slide = $(this).attr("name");
        fnSetupPageFromMenu(slide);
    });

    $(".dropdown-menu").find("li").find("ul").find("li").click(function(event){
        var slide = $(this).attr("name");
        fnSetupPageFromMenu(slide);
    });

    // Next image and audio on button (and image) click
    $('#next').click( function() {
        curIdx = (curIdx+1) % max;
        $('#firstslideheader').addClass('content-collapse');
        $('#slide1').css('display','none');
        $('#slide1').addClass('content-collapse');

        console.log(objAPT_JSON[curIdx].name);
        setCollapseClassToScreen(objAPT_JSON[curIdx].name);
        getScreenName = $($("div.screen")[curIdx]).attr("name");
        if(getScreenName == objAPT_JSON[curIdx].name)
        {
            if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                refreshPopupContent(objAPT_JSON[curIdx].popupContent);
            }
            if(objAPT_JSON[curIdx].popupImg != undefined || objAPT_JSON[curIdx].popupImg.length > 0){
                refreshPopupImages(objAPT_JSON[curIdx].popupImg);
                refreshPopupImageContent(objAPT_JSON[curIdx].popupImg);
            }
            setCollapseClassToScreen(objAPT_JSON[curIdx].name);
            fnAddOrRemoveElementClass();
        }
        else{
            fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
        }
        fnSlideWiseContentManage(getScreenName);
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        $('#slide-dyn').removeClass('content-collapse');
        showLoader('#slide-dyn');
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
//        if(objAPT_JSON[curIdx+1]){
//            loadNextPageImages(objAPT_JSON[curIdx+1]);
//        }
        changeCookieValue(objAPT_JSON[curIdx].name);
        if(objAPT_JSON[curIdx+1] != undefined){
            preloadImages(objAPT_JSON[curIdx+1]);
        }
        if(objAPT_JSON[curIdx+2] != undefined){
            preloadImages(objAPT_JSON[curIdx+2]);
        }
        getTopicWiseData(curIdx);
    });

    // Prev image and audio on button click
    $('#prev').click( function() {
        curIdx = (curIdx+max-1) % max;
        refreshPopupImageContent(objAPT_JSON[curIdx].popupImg)
        if(curIdx == 0)//The condition for 1st slide when prev
        {
            $('#slide-dyn').addClass('content-collapse');
            $('#slide1').attr('src',imgSrcBase+objAPT_JSON[curIdx].imgName);
            $('#firstslideheader').removeClass('content-collapse');
            $('#btnStart').removeClass('content-collapse');

            $('.custom-audio-button').removeClass('fade.in');
            $('#slide2').css('display','none');
            $('.custom-audio-button').addClass('fade');

            $(".playa").removeAttr("style");
            fnAddOrRemoveElementClass();
        }
        else if(curIdx == 1)//The condition for 2nd slide when prev
        {
            $('#slide-dyn').addClass('content-collapse');
            $('#slide2').css('display','none');
            $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
            $('#slide1').css('display','inline');
            fnAddOrRemoveElementClass();
            setCollapseClassToScreen(objAPT_JSON[curIdx].name);
            startAPT();
        }else {
            getScreenName = $($("div.screen")[curIdx]).attr("name");
            if (getScreenName == objAPT_JSON[curIdx].name) {
                if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                    refreshPopupContent(objAPT_JSON[curIdx].popupContent);
                }
                setCollapseClassToScreen(objAPT_JSON[curIdx].name);
                $('#slide-capsule1').addClass('collapse');
                $('#slide-menu').removeClass('collapse');
            }else{
                fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
            }
            fnAddOrRemoveElementClass();
            fnSlideWiseContentManage(getScreenName);
        }

        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        changeCookieValue(objAPT_JSON[curIdx].name);
        getTopicWiseData(curIdx);
    });

    /*----------------------Model call on capsule click----------------------------------------*/
    $("#capsule1").click(function(){

        curIdx = (curIdx+1) % max;
//        console.log(objAPT_JSON[curIdx].name);

        fnSetModelScreen();
        getFirstSlideofCapsule(objAPT_JSON,"capsule1_slide1");
        /*fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
        changeCookieValue(objAPT_JSON[curIdx].name)
        getTopicWiseData(curIdx);*/

    });

    $("#capsule2").click(function(){
        fnSetModelScreen();
        getFirstSlideofCapsule(objAPT_JSON,"capsule2_slide1");
    });

    $("#capsule3").click(function(){
        fnSetModelScreen();
        getFirstSlideofCapsule(objAPT_JSON,"capsule3_slide1");
    });

    $("#capsule4").click(function(){
        fnSetModelScreen();
        getFirstSlideofCapsule(objAPT_JSON,'capsule4_slide1');
    });

    function getFirstSlideofCapsule(objAPT_JSON,screenName){
        for(var intIndex = 0;intIndex<objAPT_JSON.length;intIndex++)
        {
            if(objAPT_JSON[intIndex].name == screenName)
            {
                curIdx = intIndex;
                fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
                break;
            }
        }
        changeCookieValue(screenName)
        getTopicWiseData(curIdx);
    }

    function getTopicWiseData(curIdx)
    {
        getSingleObjOfJSON = objAPT_JSON[curIdx];
    }

    function refreshPopupImageContent(data){
        isAudioFlag = false;
        jQuery.each(data,function(i,obj){
            $("#slide2img").attr('src','Images/6gt3Ugtneuy_DX872_DY872_CX396_CY436.jpg');
            $($('#'+obj.imgContentId)).css('opacity','0');
        });
    }

    audio.onloadedmetadata = function (_event) {
        duration = audio.duration;
        slider.setAttribute("max", Math.floor(duration));
    };

    var nextStartTime = "0";
    var nextImgStartTime = "0";
    audio.addEventListener('timeupdate',function(event){
        getAudioCurrentTime = this.currentTime;
        getAudioCurrentTimeInSec = Math.floor(this.currentTime);
        slider.setValue(Math.round(this.currentTime));
        $("#audio_sliderID").attr('data-slider-value',getAudioCurrentTimeInSec);
        if(getSingleObjOfJSON.popupContent != undefined && getSingleObjOfJSON.popupContent.length > 0)
        {
            if(getSingleObjOfJSON.name == "intro_welcome"){
                nextStartTime = getSingleObjOfJSON.popupContent[0].startingTime;
            }
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupContent.length;intIndex++)
            {
                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupContent[intIndex].startingTime && !isAudioFlag)
                {
                    if(getSingleObjOfJSON.name == "intro_bergeron"){
                    fnOverlayContentOnBergeronSlide(getSingleObjOfJSON.popupContent[intIndex]);
                    if(getSingleObjOfJSON.popupContent[intIndex+1] != undefined){
                            nextStartTime = getSingleObjOfJSON.popupContent[intIndex+1].startingTime;
                            isAudioFlag = true;
                        }
                    }
                    isAudioFlag = true;
                }
                if(getAudioCurrentTimeInSec == (nextStartTime-1))
                {
                    isAudioFlag = false;
                }
            }

        }
        if(getSingleObjOfJSON.popupImg != undefined && getSingleObjOfJSON.popupImg.length > 0)
        {
            if(getSingleObjOfJSON.name == "intro_welcome"){
                nextImgStartTime = getSingleObjOfJSON.popupImg[0].startingTime;
            }
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupImg.length;intIndex++)
            {
                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].startingTime && !isImgFlag)
                {
                    if(getSingleObjOfJSON.name == "intro_welcome") {
                        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    else if(getSingleObjOfJSON.name == "intro_resource"){
                        fnOverlayImageContentOnGatherResourcesSlide(getSingleObjOfJSON.popupImg[intIndex]);
                    }else{

                        if(getSingleObjOfJSON.popupImg[intIndex+1] != undefined){
                            nextImgStartTime = getSingleObjOfJSON.popupImg[intIndex+1].startingTime;
                        }
                        fnOverlayImageContentGeneral(imgSrcBase,getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    isImgFlag = true;
                }
                if(getAudioCurrentTimeInSec == (nextImgStartTime-1) || getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].endingTime)
                {
                    isImgFlag = false;
                }
            }
        }
        fnSlideWiseEffectManage(getAudioCurrentTimeInSec,getSingleObjOfJSON);

        fnSlideWiseConversationManage(getAudioCurrentTimeInSec,getSingleObjOfJSON);

        /*Show Next Indicator*/
        if(getAudioCurrentTimeInSec == (Math.floor(duration) - 2))
        {
            var mp3source=$("#mp3source").attr("src").split("/").pop();
            if((getSingleObjOfJSON.name == "capsule1_slide4" ||
                getSingleObjOfJSON.name == "capsule1_slide11" ||
                getSingleObjOfJSON.name == "capsule1_slide13" ||
                getSingleObjOfJSON.name == "capsule2_slide4" ||
                getSingleObjOfJSON.name == "capsule2_slide6" ||
                getSingleObjOfJSON.name == "capsule2_slide10" ||
                getSingleObjOfJSON.name == "capsule3_slide3" ||
                getSingleObjOfJSON.name == "capsule3_slide5" ||
                getSingleObjOfJSON.name == "capsule3_slide10" ||
                getSingleObjOfJSON.name == "capsule4_slide4" ||
                getSingleObjOfJSON.name == "capsule4_slide6" ||
                getSingleObjOfJSON.name == "capsule4_slide8"
                ) &&  mp3source== "6l4Qheq8nL6_22050_80_sec5.mp3"){
                $("#footer-next-indicator").addClass("content-collapse");
            }
            else{
                $("#footer-next-indicator").removeClass("content-collapse");
            }
        }else if(getAudioCurrentTimeInSec == 0)
        {
            $("#footer-next-indicator").addClass("content-collapse");
        }

    },false);
    /*---------------Reset slide Content on Audio Start------------------*/
    $("#btnPlay").click(function(){
        if(Math.floor(audio.currentTime) == Math.floor(audio.duration))
        {
            $(".popup-conversation").html("");
            isAudioFlag = false
            isImgFlag = false;
            fnResetContentOnSlide(0);
            if(getSingleObjOfJSON.name == "intro_bergeron"){
                refreshPopupContent(objAPT_JSON[curIdx].popupContent);
            }else if(getSingleObjOfJSON.name == "intro_Tips4online"){
                refreshPopupContent(objAPT_JSON[curIdx].popupContent);
            }
//            refreshContentOnReload();
        }
    });
    /*-------------- Reset Slide content on Audio Reload ----------------*/
    $("#replayBtn").click(function(){
        $(".popup-conversation").html("");
        isAudioFlag = false
        isImgFlag = false;
        fnResetContentOnSlide(0);
        if(getSingleObjOfJSON.name == "intro_bergeron"){
            refreshPopupContent(objAPT_JSON[curIdx].popupContent);
        }else if(getSingleObjOfJSON.name == "intro_Tips4online"){
            refreshPopupContent(objAPT_JSON[curIdx].popupContent);
        }
    });

    //when sliding or replay the content and effect mange
    function fnResetContentOnSlide(value){
        //audio.pause();
        audio.currentTime = value;
        if(!audio.pause){audio.play();}

        getAudioCurrentTime = audio.currentTime;
        getAudioCurrentTimeInSec = value;

        if(getSingleObjOfJSON.popupImg != undefined){
            var imgArr = getSingleObjOfJSON.popupImg.sort(function(a,b){
                return a.startingTime - b.startingTime;
            });
            if(getSingleObjOfJSON.name == "intro_welcome") {
                var imgArr = getSingleObjOfJSON.popupImg;
                fnSetupContentByTimeOnWelcomeSlide(getAudioCurrentTime,imgArr);
                isAudioFlag = false;
            }else if(getSingleObjOfJSON.name == "intro_Tips4online") {
                var imgArr = getSingleObjOfJSON.popupImg;
                fnOverlayImageContentByTimeGeneral(getAudioCurrentTime,imgArr);
                isImgFlag = false;
            }
        }
        fnSlideWiseEffectRemoveOnEvent(getAudioCurrentTimeInSec,getSingleObjOfJSON);
        if(getSingleObjOfJSON.popupContent != undefined){
            if(getSingleObjOfJSON.name == "intro_bergeron"){
                var contArr = getSingleObjOfJSON.popupContent;
                fnSetupContentByTimeOnBergeronSlide(getAudioCurrentTime,contArr);
                isAudioFlag = false;
            }else{
                for(var intIndex = 0; intIndex<getSingleObjOfJSON.popupContent.length;intIndex++)
                {
                    if(getSingleObjOfJSON.popupContent[intIndex].startingTime != value){
                        fnConversationRemoveOnEvent(getAudioCurrentTimeInSec,getSingleObjOfJSON);
                    }
                }
            }
        }
        /*Next Indicator hide*/
        if(audio.currentTime < (duration-2)){
            $("#footer-next-indicator").addClass("content-collapse");
        }
        else
        {
            var mp3source=$("#mp3source").attr("src").split("/").pop();
            if((getSingleObjOfJSON.name == "capsule1_slide4" ||
                getSingleObjOfJSON.name == "capsule1_slide11" ||
                getSingleObjOfJSON.name == "capsule1_slide13" ||
                getSingleObjOfJSON.name == "capsule2_slide4" ||
                getSingleObjOfJSON.name == "capsule2_slide6" ||
                getSingleObjOfJSON.name == "capsule2_slide10" ||
                getSingleObjOfJSON.name == "capsule3_slide3" ||
                getSingleObjOfJSON.name == "capsule3_slide5" ||
                getSingleObjOfJSON.name == "capsule3_slide10" ||
                getSingleObjOfJSON.name == "capsule4_slide4" ||
                getSingleObjOfJSON.name == "capsule4_slide6" ||
                getSingleObjOfJSON.name == "capsule4_slide8"
                ) &&  mp3source== "6l4Qheq8nL6_22050_80_sec5.mp3"){
                $("#footer-next-indicator").addClass("content-collapse");
            }
            else{
                $("#footer-next-indicator").removeClass("content-collapse");
            }
        }
    }

    $("#audio_sliderID").on('slideStart',function(_event){
        sliderMouse.mouseDown = _event.value;
        fnResetContentOnSlide(sliderMouse.mouseDown);
    });

    $("#audio_sliderID").on('slideStop',function(_event){
        sliderMouse.mouseDown = _event.value;
        fnResetContentOnSlide(sliderMouse.mouseDown);
    });

    $("#audio_sliderID").on('slide',function(_event){
        if(!isSlideFlag) {
            fnResetContentOnSlide(_event.value);
            isSlideFlag = true;
            curValue = _event.value;
        }
        else if(curValue != $("#audio_sliderID").val())
        {
            isSlideFlag = false;
        }
    });

    function fnSetupPageFromMenu(slide){
        jQuery.each(objAPT_JSON,function(i,obj){
            if(obj.name == slide){
                if(slide == 'introduction'){

                    $('#slide1').attr('src',imgSrcBase+obj.imgName);
                    fnSlideWiseContentManage(slide);
                    $(".popup-conversation").css("display","none");
                    $(".popup-conversation").html("");
                    showLoader('#slide1');
                    $(".playa").removeAttr("style");
                    setupAudioControls(audioSrcBase_mp3+obj.audioName[0]);
                    changeCookieValue(slide);
                    curIdx = i;
                }
                else if(slide == 'intro_welcome'){
//                    $('#slide-dyn').addClass('content-collapse');
//                    $('#slide2').css('display','none');
                    $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
                    $('#slide1').css('display','inline');
                    fnSlideWiseContentManage(slide);
                    $(".popup-conversation").css("display","none");
                    $(".popup-conversation").html("");
                    showLoader('#slide1');
                    setCollapseClassToScreen(obj.name);

                    changeCookieValue(slide);
                    curIdx = i;
                    startAPT();
                }
                else{
                    isAudioFlag = false;
                    isImgFlag = false;
                    nextStartTime = "0";
                    $('.custom-audio-button').removeClass('fade');
                    $('.custom-audio-button').addClass('fade.in');
                    $('#slide1').addClass('content-collapse');
                    $('#slide1').css('display','none');
                    $('.playa').css("width",'87%');
                    $('#btnStart').addClass('content-collapse');
                    $('#firstslideheader').addClass('content-collapse');
                    $('a.custom-audio-button').addClass('fade.in');
                    $("#slide-dyn").attr('src','Images/'+obj.imgName);
                    $('#slide-dyn').removeClass('content-collapse');
                    showLoader('#slide-dyn');
                    setCollapseClassToScreen(slide);

                    changeCookieValue(slide);

                    if(obj.popupImg.length > 0){
                        refreshPopupImageContent(obj.popupImg);
                    }
                    fnSlideWiseContentManage(slide);
                    setTimeout(function(){
                        fnSetModelScreen();
                    },1000)
                    $("#slide-capsule1").removeClass('collapse');

                    setupAudioControls(audioSrcBase_mp3+obj.audioName[0]);
                    getTopicWiseData(i);
                    curIdx = i;
                }
            }
        });
    }


    answer_JSON = JSON.parse(fnGetDataFromServer('JSON/answer.json').responseText);
    var selectedOption;
    var rightImgUrl = "Images/6ZhqSSk0Exm_DX72_DY72_CX36_CY36.png";
    $('input[type=radio]').click(function(){
        selectedOption = $(this).val();
    });
    $('#validate-answer').click(function(){
        console.log(selectedOption);
        if(selectedOption != undefined){
            for(var i = 0; i < answer_JSON.length; i++)
            {
                if(getSingleObjOfJSON.name == answer_JSON[i].slideName){
                    if( answer_JSON[i].rightOption == selectedOption){
                        $("#l-c-footer-text").show();
                        $('#lc-ans-img').attr('src', 'Images/5tcf1kUdQOl_DX66_DY66_CX33_CY33.png');
                        $('#lc-ans-header').html("Tout à fait!");
                        $('#lc-ans-content').html(answer_JSON[i].positiveFeedback.text);
                        $('#option'+answer_JSON[i].rightOption).css('background-image', 'url('+ rightImgUrl +')');
                        $('#right'+answer_JSON[i].rightOption).show();
                        $('#lc-footer-img').hide();
                        setupAudioControls(audioSrcBase_mp3+answer_JSON[i].positiveFeedback.audio[0]);
                        $("#next").css("pointer-events",'auto');
                    }
                    else{
                        $("#l-c-footer-text").show();
                        $('#lc-ans-img').attr('src', 'Images/6NStwRl6lCH_DX66_DY66_CX33_CY33.png');
                        $('#lc-ans-header').html("Ce n’est pas le meilleur choix.");
                        $('#lc-ans-content').html(answer_JSON[i].negativeFeedback.text);
                        $('#lc-footer-img').hide();
                        $('#right'+answer_JSON[i].rightOption).show();
                        setupAudioControls(audioSrcBase_mp3+answer_JSON[i].negativeFeedback.audio[0]);
                        $("#next").css("pointer-events",'auto');
                    }

                }
            }
        }
    })
});








