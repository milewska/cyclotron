var offset=10,gyro=false;
cyclotron = function (options) {
	var touch=false;

	var settings = $.extend({
		dampingFactor: 1,
		historySize: 5
	}, options);
	var container, sx, dx = 10, armed, tick, prev, h = [];
	container = $('.cycle');

	container.bind('mousedown touchstart', function (e) {
		touch=true;
		sx = e.pageX>0?e.pageX:e.originalEvent.touches[0].pageX - offset;
		armed = true;
		e.preventDefault();
		// alert(e.originalEvent.touches[0].pageX);
	});
	container.bind('mousemove touchmove', function (e) {
		var px;
		if (armed) {
			px = e.pageX>0?e.pageX:e.originalEvent.touches[0].pageX;
			if (prev === undefined) {
				prev = px;
			}
			offset = px - sx;
			if (h.length > settings.historySize) {
				h.shift();
			}
			h.push(prev - px);

			container.css('background-position', offset);

			prev = px;
		}
	});
	container.bind('mouseleave mouseup touchend', function () {
		touch=false;
		if (armed) {
			var i, len = h.length, v = h[len - 1];
			for (i = 0; i < len; i++) {
				v = (v * len + (h[i])) / (len + 1);
			}
			dx = v;
		}
		armed = false;
	});



	var alpha,beta,gamma;
						
	window.ondeviceorientation = function(event) {
		$('#consol').html(touch.toString());
		if(!touch){
			alpha = Math.round(event.alpha);
			beta = Math.round(event.beta);
			gamma = Math.round(event.gamma);
			offset = event.gamma*30;
			$('.cycle').css('background-position', offset);
			gyro=true;
		}
	}				


}
function tick() {
	if(gyro)
		return;
		offset+=1;
			$('.cycle').css('background-position', offset);
	};
$(document).ready(function() {
    cyclotron();
	setInterval(tick, 24);

});