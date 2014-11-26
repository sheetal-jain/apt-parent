
var objAPT_JSON = ''
var getSingleObjOfJSON = [];
var getScreenName,max;
var curIdx = 0;
var isAudioFlag = false;

// For convenience
var imgSrcBase = 'Images/';
var audioSrcBase_mp3 = 'Audio/mp3/';
var audioSrcBase_ogg = 'ogg/';
var audio = document.getElementById("APT_Audio_Controls");

$(document).ready(function(){

    //get Content from json
    objAPT_JSON = JSON.parse(fnGetDataFromServer('JSON/APT_Contents_JSON.json').responseText);
    max =objAPT_JSON.length;

    $('.custom-audio-button').addClass('fade');
    $('#slide2').addClass('fade');

    //start APT Parent Section
    $('#startAPT').click( function() {
        startAPT();
        curIdx=+1;
        getTopicWiseData(curIdx);
    });

    // Increment Index
    while (curIdx < max) {
        curIdx++;
    }

    // Next image and audio on button (and image) click
    $('#next').click( function() {
        curIdx = (curIdx+1) % max;
        if(objAPT_JSON[curIdx].popupImg != undefined && objAPT_JSON[curIdx].popupImg.length > 0){
            refreshPopupImageContent(objAPT_JSON[curIdx].popupImg);
        }

        $('#firstslideheader').addClass('collapse');
        $('#slide1').css('display','none');
        $('#slide1').addClass('img-collapse');
        $('#welcome').addClass('collapse');
        getScreenName = $($("div.screen")[curIdx]).attr("name");
        if(getScreenName == objAPT_JSON[curIdx].name)
        {
            $($("div.screen[name="+objAPT_JSON[curIdx-1].name+"]")).addClass('collapse');
            $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).removeClass('collapse');
            $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).addClass('collapse.in');
        }
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
        $('#slide-dyn').removeClass('img-collapse');
        $("#mp3source").attr('src', audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        $('#APT_Audio_Controls').trigger('load');
        $('#APT_Audio_Controls').trigger('play');
        getTopicWiseData(curIdx);
    });

    // Prev image and audio on button click
    $('#prev').click( function() {
        curIdx = (curIdx+max-1) % max;

        refreshPopupImageContent(objAPT_JSON[curIdx].popupImg)
        if(curIdx == 0)//The condition for 1st slide when prev
        {
            $('#slide-dyn').addClass('img-collapse');
            $('#slide1').attr('src',imgSrcBase+objAPT_JSON[curIdx].imgName);
            $('#firstslideheader').removeClass('collapse');
            $('#firstslideheader').addClass('collapse.in');
            $('#btnStart').removeClass('collapse');
            $('#btnStart').addClass('collapse.in');

            $('.custom-audio-button').removeClass('fade.in');
            $('#slide2').css('display','none');
            $('.custom-audio-button').addClass('fade');
        }
        else if(curIdx == 1)//The condition for 2nd slide when prev
        {
            $('#slide-dyn').addClass('img-collapse');
            $('#slide2').css('display','none');
            $('#slide1').attr('src', 'Images/655JPh2a9IB_DX1890_DY1890_CX945_CY530.png');
            $('#slide1').css('display','inline');
//            $('#slide1').addClass('img-collapse');
            $($("div.screen[name="+objAPT_JSON[curIdx + 1].name+"]")).addClass('collapse');
            $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).removeClass('collapse');
//            $($("div.screen")[curIdx]).addClass('collapse.in');
            startAPT();

        }else {
            getScreenName = $($("div.screen")[curIdx]).attr("name");
            if (getScreenName == objAPT_JSON[curIdx].name) {
                if(objAPT_JSON[curIdx].popupContent != undefined || objAPT_JSON[curIdx].popupContent.length > 0){
                    jQuery.each(objAPT_JSON[curIdx].popupContent,function(i,obj){
                        console.log(obj.contentClass)
                        $($("."+obj.contentClass)).css("display",'none');
                    });

                }

                $($("div.screen[name="+objAPT_JSON[curIdx +1].name+"]")).addClass('collapse');
                $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).removeClass('collapse');
                $($("div.screen[name="+objAPT_JSON[curIdx].name+"]")).addClass('collapse.in');
            }
        }
        $('#slide-dyn').attr('src', imgSrcBase+objAPT_JSON[curIdx].imgName);
//        $('#slide-dyn').removeClass('img-collapse');
        $("#mp3source").attr('src', audioSrcBase_mp3+objAPT_JSON[curIdx].audioName[0]);
        $('#APT_Audio_Controls').trigger('load');
        $('#APT_Audio_Controls').trigger('play');
        getTopicWiseData(curIdx);
    });

    function getTopicWiseData(curIdx)
    {
        getSingleObjOfJSON = objAPT_JSON[curIdx];
    }

    function refreshPopupImageContent(data){
        console.log("FROM CALLBACK ===== ",data);
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
//

    audio.addEventListener('timeupdate',function(event){
        var getCurrentTimeInSec = Math.floor(this.currentTime);
        if(getSingleObjOfJSON.popupContent != undefined)
        {
            for(var intIndex = 0;intIndex<getSingleObjOfJSON.popupContent.length;intIndex++)
            {
                if(getCurrentTimeInSec == getSingleObjOfJSON.popupContent[intIndex].startingTime && !isAudioFlag)
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
                if(getCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].startingTime && !isAudioFlag)
                {
                    if(getSingleObjOfJSON.name == "intro_welcome") {
                        fnOverlayImageContentOnWelcomeSlide(imgSrcBase, getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    else if(getSingleObjOfJSON.name == "intro_resource"){
                        fnOverlayImageContentOnGatherResourcesSlide(getSingleObjOfJSON.popupImg[intIndex]);
                    }
                    isAudioFlag = true;
                }
                if(getCurrentTimeInSec == getSingleObjOfJSON.popupImg[intIndex].endingTime)
                {
                    isAudioFlag = false;
                }
            }
        }

    },false);
});









