(function ($) {
	$.fn.signature = function(options) {
		if (typeof options == 'string') {
			switch(options) {
				case 'clear':
					var canvas = $(this).find('canvas'),
						options = canvas.data('options');
					if (canvas && canvas[0] && options) {
						var context = canvas[0].getContext('2d');
						context.fillStyle = options.backgroundColor;
						context.fillRect(0 , 0 , options.width , options.height); // init bg
					}
					return this;
				break;

				case 'jpg':
					options = 'jpeg';
				case 'png':
				case 'jpeg':
				default:
					var sig;
					this.each(function() {
						sig = $(this).find('canvas')[0].toDataURL('image/' + options);
					});
					return sig;
				break;

			}
		} else {
			
			options = $.extend({
				strokeColor: '#000000',
				strokeWidth: 2,
				backgroundColor: '#FFF',
				width: 500,
				height: 250,
				mouseOutTimeout: 1000
			}, options || {});

			this.each(function() {
				var $this = $(this);
				$this.html('<canvas></canvas>');
				var canvas = $this.find('canvas'),
					context = canvas[0].getContext('2d'),
					canDraw = false,
					cancelDraw = function() { canDraw = false; },
					startDraw = function(evt) { evt.preventDefault(); canDraw = true; previous = {}; },
					endDraw = function() { canDraw = false; },
					moveDraw = function (evt) {
						if (!canDraw) return;
						if (cancelTimeout) {
							window.clearTimeout(cancelTimeout);
						}
						evt.preventDefault();
						var x = Math.floor(evt.offsetX),
							y = Math.floor(evt.offsetY);
						if (evt.originalEvent && evt.originalEvent.targetTouches) {
							var touch = evt.originalEvent.targetTouches.item(0),
								offset = canvas.offset();
							x = touch.pageX - offset.left;
							y = touch.pageY - offset.top;
						}
						context.strokeStyle = options.strokeColor;
						context.lineWidth = options.strokeWidth;
						context.beginPath();
						context.moveTo(previous.x || x , previous.y || y);
						context.lineTo(x , y);
						context.stroke();
						context.closePath();
						previous = {x:x , y:y};
					},
					previous,
					cancelTimeout;
				canvas.data('options' , options);
				canvas.attr({
					width: options.width,
					height: options.height
				});
				context.fillStyle = options.backgroundColor;
				context.fillRect(0 , 0 , options.width , options.height); // init bg
				if (Modernizr.touch) {
					canvas.on('touchstart' , startDraw)
						.on('touchend' , endDraw)
						.on('touchcancel' , endDraw)
						.on('touchmove' , moveDraw);

				} else {
					canvas.mouseout(function() { cancelTimeout = window.setTimeout(function() { canDraw = false; } , options.mouseOutTimeout); })
						.mousedown(startDraw)
						.mouseup(endDraw)
						.mousemove(moveDraw);
				}
			});
			return this;
		}
	};
})( jQuery );
