/**
 * User: VJ
 * Date: 12/19/14
 * Time: 11:03 AM
 * For IE 9 Only
 */
var audioControlElement = document.getElementById("APT_Audio_Controls");

$('#volumeChanger').attr({
    'type': 'text',
    'data-slider-value':1,
    'data-slider-min': 0,
    'data-slider-max': 1,
    'data-slider-step':0.01
});

$('#volumeChanger').slider({
    tooltip: 'hide'
});

$("#volumeChanger").on('slideStop',function(_event){
    audioControlElement.volume = _event.value.toFixed(1);
});