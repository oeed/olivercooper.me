(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

function parallax() {
	var layers = $('.parallax > div:not(.front)').get();
	var len = 4;
	for (var i = 1; i < len /*layers.length*/ ; i++) {
		layers[i].rate = layers[i].getAttribute('data-rate');
	}

	function update() {
		var top = -window.pageYOffset / 100;
		var layer, speed, yPos;
		for (var i = 1; i < len /*layers.length*/ ; i++) {
			layer = layers[i];
			var yPos = top * layer.rate;
			layer.setAttribute('style', 'transform: translate3d(0px, ' + Math.round(yPos) + 'px, 0px)');
		}
	}

	var parallaxElem = $(".parallax").get()[0];

	var isHidden = false;
	window.addEventListener("scroll", function(event) {
		if (window.pageYOffset < window.innerHeight + 200) {
			if (isHidden) {
				isHidden = false;
				parallaxElem.setAttribute("style", "");
			}
			requestAnimationFrame(update)
		}
		else if (!isHidden) {
			isHidden = true;
			parallaxElem.setAttribute("style", "display:none;");
		}
	});
}

function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		}
		else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

$(document).ready(function() {
	parallax();
});