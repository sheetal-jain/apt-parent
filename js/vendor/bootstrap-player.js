(function($) {
	'use strict';
	$('audio[controls]').before(function(){
		var song = this;
			song.controls=false;
		var player_box = document.createElement('div');
			$(player_box).addClass('well playa');

		var player = document.createElement('section');
			$(player).addClass('btn-group row-fluid');

		var load_error = function(){
			console.log('error');
			$(player_box).find('.btn').addClass('disabled');
			$(player_box).find('input[type="range"]').hide();
			$(player_box).find('.icon-spin').text('Error');
			$(player_box).find('.icon-spin').parent().attr('title', 'There was an error loading the audio.');
			$(player_box).find('.icon-spin').parent().tooltip('fixTitle');
			$(player_box).find('.icon-spin').removeClass('icon-spinner icon-spin');
		};

		var addPlay = function() {
			var play = document.createElement('button');
				$(play).addClass('btn disabled span1');
            $(play).attr('id','btnPlay');
			play.setPlayState = function(toggle){
					$(play).removeClass('disabled');
				if (toggle === 'play') {
					$(play).html('<i class="fa fa-play"></i>');
					$(play).click(function () {
						song.play();
					});
				}
				if (toggle === 'pause') {
					$(play).html('<i class="fa fa-pause"></i>');
					$(play).click(function () {
						song.pause();
					});
				}
			};
			$(song).on('play', function(){play.setPlayState('pause');});
			$(song).on('pause', function(){play.setPlayState('play');});
			var timeout = 0;
			var loadCheck = setInterval(function() {
				if(isNaN(song.duration) === false){
					play.setPlayState('play');
					clearInterval(loadCheck);
					return true;
				}
				if(song.networkState === 3 || timeout === 75){
					load_error();
					clearInterval(loadCheck);
					return false;
				}
				timeout++;
			}, 50);
			
			$(player).append(play);
		};
		var addSeek = function() {
			var seek = document.createElement('input');
            $(seek).attr({
                'type': 'text',
                'id':'audio_sliderID',
                'data-slider-id': 'audio_sliderID_data',
                'data-slider-value':0,
                'data-slider-min': 0
            });
			seek.reset = function () {
				$(seek).val(0);
				song.currentTime = $(seek).val();
				if(!song.loop){song.pause();}
				else {song.play();}
			};
			var seek_wrapper = document.createElement('div');
			$(seek_wrapper).addClass('btn  span4');
			$(seek_wrapper).append(seek);
			$(song).on('ended', seek.reset);
			$(player).append(seek_wrapper);
		};
		var addTime = function() {
			var time = document.createElement('a');
				$(time).addClass('btn span3');
				$(time).tooltip({'container': 'body', 'placement': 'right', 'html': true});
			time.twodigit = function (myNum) {
				return ("0" + myNum).slice(-2);
			};
			time.timesplit = function (a) {
				if (isNaN(a)){return '<i class="fa fa-spinner fa-spin"></i>';}
				var hours = Math.floor(a / 3600);
				var minutes = Math.floor(a / 60) - (hours * 60);
				var seconds = Math.floor(a) - (hours * 3600) - (minutes * 60);
				var timeStr = time.twodigit(minutes) + ':' + time.twodigit(seconds);
				if (hours > 0) {
					timeStr = hours + ':' + timeStr;
				}
				return timeStr;
			};
			time.showtime = function () {
				$(time).html(time.timesplit(song.duration));
				//$(time).attr({'title': 'Click to Reset<hr style="padding:0; margin:0;" />Position: ' + (time.timesplit(song.currentTime))});
				if (!song.paused){
					$(time).html(time.timesplit(song.currentTime));
					//$(time).attr({'title': 'Click to Reset<hr style="padding:0; margin:0;" />Length: ' + (time.timesplit(song.duration))});
				}
				$(time).tooltip('fixTitle');
			};
			$(time).click(function () {
				song.pause();
				song.currentTime = 0;
				time.showtime();
				$(time).tooltip('fixTitle');
				$(time).tooltip('show');
			});
			$(time).tooltip('show');
			$(song).on('loadedmetadata', time.showtime);
			$(song).on('loadeddata', time.showtime);
			$(song).on('progress', time.showtime);
			$(song).on('canplay', time.showtime);
			$(song).on('canplaythrough', time.showtime);
			$(song).on('timeupdate', time.showtime);
			if(song.readyState > 0){
				time.showtime();
			}
			else {
				$(time).html('<i class="fa fa-spinner fa-spin"></i>');
			}
			$(player).append(time);
		};
		var addMute = function() {
			var mute = document.createElement('button');
				$(mute).addClass('btn span1');
                $(mute).attr("id","muteBtn")
			mute.checkVolume = function () {
				if (song.volume > 0.5 && !song.muted) {
					$(mute).html('<i class="fa fa-volume-up"></i>');
				} else if (song.volume < 0.5 && song.volume > 0 && !song.muted) {
					$(mute).html('<i class="fa fa-volume-down"></i>');
				} else {
					$(mute).html('<i class="fa fa-volume-off"></i>');
				}
			};
			$(mute).click(function () {
				if (song.muted) {
					song.muted = false;
					song.volume = song.oldvolume;
				} else {
					song.muted = true;
					song.oldvolume = song.volume;
					song.volume = 0;
				}
				mute.checkVolume();
			});
			mute.checkVolume();
			$(song).on('volumechange', mute.checkVolume);
			$(player).append(mute);
		};
		var addVolume = function() {
			var volume = document.createElement('input');
				$(volume).attr({
					'type': 'range',
					'min': 0,
					'max': 1,
					'step': 1 / 100,
					'value': 1
				});
			volume.slide = function () {
				song.muted = false;
				song.volume = $(volume).val();
			};
			volume.set = function () {
				$(volume).val(song.volume);
			};
			var vol_wrapper = document.createElement('div');
			$(vol_wrapper).addClass('btn span3');
            $(vol_wrapper).attr("id","vol_wrapper")
			$(vol_wrapper).append(volume);
			$(volume).on("change", volume.slide);
			$(song).on('volumechange', volume.set);
			$(player).append(vol_wrapper);
		};
		var addPlayer = function() {
			if ($(song).data('play') !== 'off'){ addPlay();}
			if ($(song).data('seek') !== 'off'){ addSeek();}
			if ($(song).data('time') !== 'off'){ addTime();}
			if ($(song).data('mute') !== 'off'){ addMute();}
			if ($(song).data('volume') !== 'off'){ addVolume();}
			$(player_box).append(player);
		};
		var fillPlayerBox = function() {
			addPlayer();
		};
		fillPlayerBox();
		$(song).on('error', function(){
			load_error();
		});
		return player_box;
	});
})(jQuery)