
var objAPT_JSON = ''
var getSingleObjOfJSON = [];
var getScreenName,max;
var curIdx = 0;
var isAudioFlag = false;
var isImgFlag = false;
var isSlideFlag = false;
var curValue = 0;
var sliderMouse = {mouseDown:0};
var getAudioCurrentTime,duration,getAudioCurrentTimeInSec;

// For convenience
var imgSrcBase = 'Images/';
var audioSrcBase_mp3 = 'Audio/FR/mp3/';
var audioSrcBase_ogg = 'ogg/';
var audio = document.getElementById("APT_Audio_Controls");

$(document).ready(function(){

    //get Content from json
    objAPT_JSON = JSON.parse(fnGetDataFromServer('JSON/APT_Contents_JSON.json').responseText);
    max =objAPT_JSON.length;
    console.log("MAX === ",max);
    /* RJ------------------ if cookie not exist, create one with the first slide ----------------------*/
    var current_page_cookie = $.cookie('current_page');
    console.log(current_page_cookie);
    if(current_page_cookie != undefined){
        jQuery.each(objAPT_JSON,function(i,obj){
            if(obj.name == current_page_cookie){
                if(current_page_cookie == 'introduction'){
                    $('#slide-dyn').addClass('content-collapse');
                    $('#slide1').attr('src',imgSrcBase+obj.imgName);
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

                    $('#slide-dyn').addClass('content-collapse');
                    $('#slide2').css('display','none');
                    $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
                    $('#slide1').css('display','inline');

                    setCollapseClassToScreen(obj.name);
                    curIdx = i;
                    console.log(curIdx);
                    startAPT();

                }
                else{
                    $('.custom-audio-button').removeClass('fade');
                    $('.custom-audio-button').addClass('fade.in');
                    $('#slide1').addClass('content-collapse');
                    $('.playa').css("width",'85%');
                    $('#btnStart').addClass('content-collapse');
                    $('#firstslideheader').addClass('content-collapse');
                    $('a.custom-audio-button').addClass('fade.in');
                    $("#slide-dyn").attr('src','Images/'+obj.imgName);
                    $('#slide-dyn').removeClass('content-collapse');
                    $($("div.screen[name="+current_page_cookie+"]")).removeClass('content-collapse');
                    $($("div.screen:not(.screen[name="+current_page_cookie+"])")).addClass('content-collapse');
                    $("#tips-images").find("div").css('opacity','0');
                    $("#tips-images").find("div").css('display','none');
                    if(obj.popupImg.length > 0){
                        refreshPopupImageContent(obj.popupImg);
                    }
                    setupAudioControls(audioSrcBase_mp3+obj.audioName[0]);
                    getTopicWiseData(i);
                    curIdx = i;
                }
            }
        });

        console.log(current_page_cookie);
    }else{
        console.log("No cookie Exist");
        $.cookie('current_page',objAPT_JSON[0].name, { expires: 7 });
        $('.custom-audio-button').addClass('fade');
        $('#slide2').addClass('fade');

    }

    preloadImages(objAPT_JSON[1]);
    var slider = new Slider("#audio_sliderID", {
        range: false,
        tooltip: 'always',
        precision: 0,
        formatter: function(value) {
            return Math.round(value);
        }
    });
    audio.load();
//    $('.custom-audio-button').addClass('fade');
//    $('#slide2').addClass('fade');

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

    // Next image and audio on button (and image) click
    $('#next').click( function() {
        curIdx = (curIdx+1) % max;
        $('#firstslideheader').addClass('content-collapse');
        $('#slide1').css('display','none');
        $('#slide1').addClass('content-collapse');
        $('#welcome').addClass('content-collapse');
        refreshPopupImageContent(objAPT_JSON[curIdx].popupImg);
        getScreenName = $($("div.screen")[curIdx]).attr("name");
        if(getScreenName == objAPT_JSON[curIdx].name)
        {
            if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                refreshPopupContent(objAPT_JSON[curIdx].popupContent);
            }
            if(objAPT_JSON[curIdx].popupImg != undefined || objAPT_JSON[curIdx].popupImg.length > 0){
                refreshPopupImages(objAPT_JSON[curIdx].popupImg);
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
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);

//        if(objAPT_JSON[curIdx+1]){
//            loadNextPageImages(objAPT_JSON[curIdx+1]);
//        }

        changeCookieValue(objAPT_JSON[curIdx].name);

        if(objAPT_JSON[curIdx+1] != undefined){
            preloadImages(objAPT_JSON[curIdx+1]);
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
        }
        else if(curIdx == 1)//The condition for 2nd slide when prev
        {
            $('#slide-dyn').addClass('content-collapse');
            $('#slide2').css('display','none');
            $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
            $('#slide1').css('display','inline');

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
            fnSlideWiseContentManage(getScreenName);
        }
        fnAddOrRemoveElementClass();
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        changeCookieValue(objAPT_JSON[curIdx].name);
        getTopicWiseData(curIdx);
    });

    /*----------------------Model call on capsule click----------------------------------------*/
    $("#capsule1").click(function(){
        curIdx = (curIdx+1) % max;
        fnSetModelScreen();
        fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
    });

    $("#capsule2").click(function(){
        fnSetModelScreen();
        for(var intIndex = 0;intIndex<objAPT_JSON.length;intIndex++)
        {
            if(objAPT_JSON[intIndex].name == "capsule2_slide1")
            {
               curIdx = intIndex;
                fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
            }
        }
    });

    $("#capsule3").click(function(){
        fnSetModelScreen();
        for(var intIndex = 0;intIndex<objAPT_JSON.length;intIndex++)
        {
            if(objAPT_JSON[intIndex].name == "capsule3_slide1")
            {
                curIdx = intIndex;
                fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
            }
        }
    });

    $("#capsule4").click(function(){
        fnSetModelScreen();
        for(var intIndex = 0;intIndex<objAPT_JSON.length;intIndex++)
        {
            if(objAPT_JSON[intIndex].name == "capsule4_slide1")
            {
                curIdx = intIndex;
                fnSlideWiseContentManage(objAPT_JSON[curIdx].name);
            }
        }
    });

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

//    //table of content wise display image and load audio.
//    $('.dropdown-menu li a').click( function() {
//        for(var i=0; i< objAPT_JSON.length;i++){
//            if($(this).attr("name") == objAPT_JSON[i].name){
//                $(".thumbnail").attr('src', imgSrcBase+objAPT_JSON[i].imgName);
//                $(".mp3").attr('src', audioSrcBase_mp3+objAPT_JSON[i].audioName[0]);
//                $(".ogg").attr('src', audioSrcBase_ogg+objAPT_JSON[i].audioName[1]);
//                getScreenName = $($("div.screen")[i]).attr("name");
//                if(getScreenName == objAPT_JSON[i].name)
//                {
//                    $($("div.screen")[i-1]).css("display","none");
//                    $($("div.screen")[i+1]).css("display","none");
//                    $($("div.screen")[i]).css("display","block");
//                }
//                getTopicWiseData(i);
//                audio.load();
//                audio.play();
//            }
//        }
//    });

    audio.onloadedmetadata = function (_event) {
        duration = audio.duration;
        slider.setAttribute("max", duration);
    };

    var nextStartTime = "0";
    var nextImgStartTime = "0";
    audio.addEventListener('timeupdate',function(event){
        getAudioCurrentTime = this.currentTime;
        getAudioCurrentTimeInSec = Math.floor(this.currentTime);
        slider.setValue(Math.round(this.currentTime));
        $("#audio_sliderID").attr('data-slider-value',getAudioCurrentTimeInSec);
        if(getSingleObjOfJSON.popupContent.length > 0)
        {
//            nextStartTime = getSingleObjOfJSON.popupContent[0].startingTime;
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupContent.length;intIndex++)
            {

                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupContent[intIndex].startingTime && !isAudioFlag)
                {
//                    if(getSingleObjOfJSON.name == "intro_bergeron" ){
                        console.log(getAudioCurrentTimeInSec);
                        fnOverlayContentOnBergeronSlide(getSingleObjOfJSON.popupContent[intIndex]);
                        if(getSingleObjOfJSON.popupContent[intIndex+1] != undefined){
                            nextStartTime = getSingleObjOfJSON.popupContent[intIndex+1].startingTime;
                        }
//                    }

                    isAudioFlag = true;
                }
                if( getAudioCurrentTimeInSec == (nextStartTime-1)  )
                {
                    isAudioFlag = false;
                }
            }

        }

        if(getSingleObjOfJSON.popupImg.length > 0)
        {
//            nextImgStartTime = getSingleObjOfJSON.popupImg[0].startingTime;
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupImg.length;intIndex++)
            {
                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].startingTime && !isImgFlag)
                {
                    console.log(getSingleObjOfJSON.popupImg[intIndex].startingTime +" == "+isAudioFlag+" =="+ nextImgStartTime);
                    if(getSingleObjOfJSON.name == "intro_welcome") {
                        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    else if(getSingleObjOfJSON.name == "intro_resource"){
                        fnOverlayImageContentOnGatherResourcesSlide(getSingleObjOfJSON.popupImg[intIndex]);
                    }else{
                        if(getSingleObjOfJSON.popupImg[intIndex+1] != undefined){
                            nextImgStartTime = getSingleObjOfJSON.popupImg[intIndex+1].startingTime;
                        }
                        fnOverlayImageContentGeneral(imgSrcBase,getSingleObjOfJSON.popupImg[intIndex])
                    }
                    isImgFlag = true;
                }
                if(getAudioCurrentTimeInSec == (nextImgStartTime-1) || getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].endingTime)
                {
                    isImgFlag = false;
                }
            }
        }

        /*Show Next Indicator*/
        if(getAudioCurrentTimeInSec == (Math.floor(duration) - 2))
        {
            $("#footer-next-indicator").removeClass("content-collapse");
        }else if(getAudioCurrentTimeInSec == 0)
        {
            $("#footer-next-indicator").addClass("content-collapse");
        }

    },false);

    /*-------------- Reset Slide content on Audio Reload ----------------*/
    $("#replayBtn").click(function(){
        fnResetContentOnSlide(0);
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
            }
            else{
                fnSetupContentByTimeGeneral(getAudioCurrentTime,imgArr);
            }
        }

        /*Next Indicator hide*/
        if(audio.currentTime < (duration-2)){
            $("#footer-next-indicator").addClass("content-collapse");
        }
        else
        {
            $("#footer-next-indicator").removeClass("content-collapse");
        }
    }

    $("#audio_sliderID").on('slideStart',function(_event){
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
});






