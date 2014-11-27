
var objAPT_JSON = ''
var getSingleObjOfJSON = [];
var getScreenName,max;
var curIdx = 0;
var isAudioFlag = false;
var isSlideFlag = false;
var curValue = 0;
var getAudioCurrentTime,duration,getAudioCurrentTimeInSec;

// For convenience
var imgSrcBase = 'Images/';
var audioSrcBase_mp3 = 'Audio/mp3/';
var audioSrcBase_ogg = 'ogg/';
var audio = document.getElementById("APT_Audio_Controls");

$(document).ready(function(){

    //get Content from json
    objAPT_JSON = JSON.parse(fnGetDataFromServer('JSON/APT_Contents_JSON.json').responseText);
    max =objAPT_JSON.length;

    var slider = new Slider("#audio_sliderID", {
        range: false,
        tooltip: 'always',
        precision: 0
    });
    audio.load();
    $('.custom-audio-button').addClass('fade');
    $('#slide2').addClass('fade');

    //start APT Parent Section
    $('#startAPT').click( function() {
        startAPT();
        curIdx=+1;
        getTopicWiseData(curIdx);
        if(objAPT_JSON[curIdx].popupImg.length > 0){
            refreshPopupImageContent(objAPT_JSON[curIdx].popupImg);
        }

    });

    // Increment Index
    while (curIdx < max) {
        curIdx++;
    }

    // Next image and audio on button (and image) click
    $('#next').click( function() {
        curIdx = (curIdx+1) % max;
        $('#firstslideheader').addClass('content-collapse');
        $('#slide1').css('display','none');
        $('#slide1').addClass('content-collapse');
        $('#welcome').addClass('content-collapse');
        getScreenName = $($("div.screen")[curIdx]).attr("name");
        if(getScreenName == objAPT_JSON[curIdx].name)
        {
            if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                refreshPopupContent(objAPT_JSON[curIdx].popupContent);
            }
            /*$($("div.screen[name="+objAPT_JSON[curIdx-1].name+"]")).addClass('content-collapse');
            $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).removeClass('content-collapse');*/
            setCollapseClassToScreen(objAPT_JSON[curIdx].name);
            $("#bergeron-footer").addClass('content-collapse');
        }
        if(getScreenName == "intro_bergeron"){
            $("#bergeron-footer").removeClass('content-collapse');
        }
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        $('#slide-dyn').removeClass('content-collapse');
        /*$("#mp3source").attr('src', audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        $('#APT_Audio_Controls').trigger('load');
        $('#APT_Audio_Controls').trigger('play');*/
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
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
            $("#bergeron-footer").addClass('content-collapse');
        }
        else if(curIdx == 1)//The condition for 2nd slide when prev
        {
            $('#slide-dyn').addClass('content-collapse');
            $('#slide2').css('display','none');
            $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
            $('#slide1').css('display','inline');

            setCollapseClassToScreen(objAPT_JSON[curIdx].name);

            startAPT();
            $("#bergeron-footer").addClass('content-collapse');
        }else {
            getScreenName = $($("div.screen")[curIdx]).attr("name");
            if (getScreenName == objAPT_JSON[curIdx].name) {
                if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                    refreshPopupContent(objAPT_JSON[curIdx].popupContent);
                }
                setCollapseClassToScreen(objAPT_JSON[curIdx].name);
                $("#bergeron-footer").addClass('content-collapse');
            }
            if(getScreenName == "intro_bergeron"){
                $("#bergeron-footer").removeClass('content-collapse');
            }
        }
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        /*$("#mp3source").attr('src', audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        $('#APT_Audio_Controls').trigger('load');
        $('#APT_Audio_Controls').trigger('play');*/
        setupAudioControls(audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        getTopicWiseData(curIdx);
    });

    function getTopicWiseData(curIdx)
    {
        getSingleObjOfJSON = objAPT_JSON[curIdx];
    }

    function refreshPopupImageContent(data){
        console.log("FROM CALLBACK ===== ",data);
        isAudioFlag = false;
        jQuery.each(data,function(i,obj){
//            $('#'+obj.imgContentId).removeClass('fade.in');
//            $($('#'+obj.imgContentId)).css("display",'none');
            $("#slide2img").attr('src','Images/6gt3Ugtneuy_DX872_DY872_CX396_CY436.jpg');
            $($('#'+obj.imgContentId)).css('opacity','0');

        })
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
    if(audio.pause)
    {
        console.log(slider.getValue());
    }

    audio.addEventListener('timeupdate',function(event){
        getAudioCurrentTime = this.currentTime;
        getAudioCurrentTimeInSec = Math.floor(this.currentTime);
        slider.setValue(getAudioCurrentTime);
        $("#audio_sliderID").attr('data-slider-value',getAudioCurrentTimeInSec);
        if(getSingleObjOfJSON.popupContent != undefined)
        {
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupContent.length;intIndex++)
            {
                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupContent[intIndex].startingTime && !isAudioFlag)
                {
                    if(getSingleObjOfJSON.name == "intro_bergeron" ) {
                        fnOverlayContentOnBergeronSlide(getSingleObjOfJSON.popupContent[intIndex]);
                    }
                    isAudioFlag = true;
                }
            }
        }

        if(getSingleObjOfJSON.popupImg != undefined)
        {
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupImg.length;intIndex++)
            {
//                console.log(getSingleObjOfJSON.popupImg[intIndex].imgContentId);

                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].startingTime && !isAudioFlag)
                {
                    console.log("Inside if ===");
                    if(getSingleObjOfJSON.name == "intro_welcome") {

                        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    else if(getSingleObjOfJSON.name == "intro_resource"){
                        fnOverlayImageContentOnGatherResourcesSlide(getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    isAudioFlag = true;
                }
                if(getAudioCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].endingTime)
                {
                    isAudioFlag = false;
                }
            }
        }

    },false);

    /*audio.onseeking = function(){
        audio.currentTime = $("#audio_sliderID").val();
        getAudioCurrentTimeInSec = $("#audio_sliderID").val();
        console.log("SEEKING ==== ",audio.currentTime);
    }*/
    $('#audio_sliderID_data').on('click', function(_event){
        console.log($("#audio_sliderID").val());
        audio.currentTime = $("#audio_sliderID").val();
    });
    $("#audio_sliderID").on('slide',function(_event){
        if(!isSlideFlag)
        {
            console.log($("#audio_sliderID").val()+" -- "+_event.value);
            audio.currentTime = $("#audio_sliderID").val();
            getAudioCurrentTimeInSec = $("#audio_sliderID").val();
            isSlideFlag = true;
            curValue = $("#audio_sliderID").val();
        }
        else if(curValue != $("#audio_sliderID").val())
        {
            isSlideFlag = false;
        }
//        if(getSingleObjOfJSON.popupImg != undefined)
//        {
//
//            var imageArr = getSingleObjOfJSON.popupImg;
//             imageArr.sort(function(a,b){
//                return a.startingTime - b.startingTime;
//            });
//            var minStartTime =imageArr[0].startingTime;
//
////            console.log("Min Time ========== ",minStartTime);
//            for(var intIndex = 0;intIndex<imageArr.length;intIndex++)
//            {
////                if(getAudioCurrentTimeInSec < "31")
//                if(getAudioCurrentTimeInSec < minStartTime)
//                {
//                    if(getSingleObjOfJSON.name == "intro_welcome") {
//                        isAudioFlag = false;
//
//
//                        /*$('#'+imageArr[intIndex].imgContentId).removeAttr('style');
//                        $('#'+imageArr[intIndex].imgContentId).removeClass('fade.in');
//                        $('#'+imageArr[intIndex].imgContentId).addClass('fade');*/
////                        console.log("hello",getSingleObjOfJSON.popupImg);
//                        jQuery.each(imageArr,function(i,obj){
//                            $('#'+obj.imgContentId).css('opacity','0');
//                            $('#slide2img').attr('src','Images/6gt3Ugtneuy_DX872_DY872_CX396_CY436.jpg');
////                            $('#'+obj.imgContentId).removeClass('fade.in');
////                            $('#'+obj.imgContentId).addClass('fade');
//                        });
//                    }
//                }else if(imageArr[intIndex].startingTime < getAudioCurrentTimeInSec && imageArr[intIndex].endingTime > getAudioCurrentTimeInSec)
//                {
//                    console.log(intIndex," ========== ", imageArr[intIndex].startingTime);
//
//                    if(imageArr[intIndex].startingTime <= 31 && imageArr[intIndex].endingTime >= 34){
//
//                        $('#'+imageArr[0].imgContentId).css('opacity','1')
//                        $('#slide2img').attr('src',imgSrcBase+imageArr[0].imgName);
//
//                        $('#'+imageArr[1].imgContentId).css('opacity','0');
//                        $('#'+imageArr[2].imgContentId).css('opacity','0');
//                        $('#'+imageArr[3].imgContentId).css('opacity','0');
//                    }else if(imageArr[intIndex].startingTime <= 35 && imageArr[intIndex].endingTime >= 38){
//                        $('#'+imageArr[1].imgContentId).css('opacity','1')
//                        $('#slide2img').attr('src',imgSrcBase+imageArr[1].imgName);
//
//                        $('#'+imageArr[2].imgContentId).css('opacity','0')
//                        $('#'+imageArr[3].imgContentId).css('opacity','0')
//
//                    }else if(imageArr[intIndex].startingTime <= 39 && imageArr[intIndex].endingTime >= 41){
//                        $('#'+imageArr[2].imgContentId).css('opacity','1')
//                        $('#slide2img').attr('src',imgSrcBase+imageArr[2].imgName);
//
//                        $('#'+imageArr[3].imgContentId).css('opacity','0')
//
//                    }else if(imageArr[intIndex].startingTime <= 42 && imageArr[intIndex].endingTime >= 45){
//                        $('#'+imageArr[3].imgContentId).css('opacity','1')
//                        $('#slide2img').attr('src',imgSrcBase+imageArr[3].imgName);
//                    }
//                    /*$('#'+imageArr[intIndex].imgContentId).css('opacity','1');
//                    $('#'+imageArr[intIndex].imgContentId).removeClass('fade');
//                    $('#'+imageArr[intIndex].imgContentId).addClass('fade.in');
//*/
////                    $('#slide2img').attr('src',imgSrcBase+imageArr[intIndex].imgName);
//                    /*if(intIndex > 0){
//                        for(var i=0; i<intIndex-1;i++){
//                            $('#'+imageArr[i].imgContentId).css('opacity','1');
//                            $('#slide2img').attr('src',imgSrcBase+imageArr[i].imgName);
////                            $('#slide2img').attr('src',imgSrcBase+imageArr[i].imgName);
////                            $('#'+imageArr[i].imgContentId).removeClass('fade');
////                            $('#'+imageArr[i].imgContentId).addClass('fade.in');
//                        }
//
//                        for(var j=intIndex; j<imageArr.length;j++){
////                            $('#'+imageArr[j].imgContentId).removeAttr('style');
//                            $('#'+imageArr[j].imgContentId).css('opacity','0');
//                            $('#slide2img').attr('src',imgSrcBase+imageArr[i].imgName);
////                            $('#slide2img').attr('src',imgSrcBase+imageArr[j].imgName);
////                            $('#'+imageArr[j].imgContentId).removeClass('fade.in');
////                            $('#'+imageArr[j].imgContentId).addClass('fade');
//                        }
//                    }*/
//
//
//                }
//
//            }
//        }
    });
});






