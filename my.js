(function(jQuery) {
	$.fn.Waterfall = function(setting) {
		return this.each(function() {
			var defaults = {
				width: 580,
				marginT: 5,
				marginL: 5,
				speed: 700,
				cn: 'div',
				delTime: 3000
			};
			var dataArr = [],
				boxArr = [],
				BoxLengthArr = [],
				ResaultArr = [];
			$self = $(this);
			$selfL = $self.offset().left;
			$selfT = $self.offset().top;
			var rowold, max = 0;
			var set = $.extend(defaults, setting);
			var checkMinI = function(arr) {
					var MinNum = arr[0];
					for (var i = 1, len = arr.length; i < len; i++) {
						MinNum = Math.min(MinNum, arr[i])
					};
					for (var i in arr) {
						if (arr[i] == MinNum) {
							return i
						}
					}
				};
			var checkMax = function(arr) {
					var maxNum = arr[0];
					for (var i = 1, len = arr.length; i < len; i++) {
						maxNum = Math.max(maxNum, arr[i])
					};
					for (var i in arr) {
						if (arr[i] == maxNum) {
							s = i;
							break
						}
					};
					this.i = s;
					this.max = maxNum;
					return this
				};
			var Sub = function(arr) {
					var sub = 0;
					for (var i in arr) {
						sub += arr[i]
					};
					return sub
				};
			var init = function() {
					var boxWidth = $self.width();
					if (boxWidth < set.width) return;
					var largeI;
					var row = Math.floor((boxWidth + set.marginL) / (set.width + set.marginL));
					rowold = row;
					dataArr = [];
					boxArr = [];
					BoxLengthArr = [];
					$self.find("." + set.cn).each(function(i) {
						dataArr[i] = $(this).height()
					});
					for (var i = 0; i < row; i++) {
						boxArr[i] = null;
						boxArr[i] = {};
						boxArr[i]['arr'] = [];
						boxArr[i]['key'] = []
					};
					for (var i = 0, len = dataArr.length; i < len; i++) {
						for (var j = 0; j < row; j++) {
							BoxLengthArr[j] = Sub(boxArr[j]['arr'])
						}
						num = checkMinI(BoxLengthArr);
						boxArr[num]['key'][boxArr[num]['key'].length] = i;
						boxArr[num]['arr'][boxArr[num]['arr'].length] = dataArr[i]
					};
					for (var i = 0, len = len; i < len; i++) {
						for (var j = 0; j < row; j++) {
							BoxLengthArr[j] = Sub(boxArr[j]['arr'])
						}
						max = checkMax(BoxLengthArr).max;
						largeI = checkMax(BoxLengthArr).i
					};
					var maxMarginT = boxArr[largeI]['key'].length * set.marginT;
					$self.height(max + maxMarginT);
					return boxArr
				};
			var setPosition = function(ARR) {
					for (var i in ARR) {
						for (var j in ARR[i].key) {
							var rowN = ARR[i].key[j];
							var topN = 0;
							for (var k = 0; k < j; k++) {
								topN = topN + ARR[i].arr[k]
							}
							$self.find("." + set.cn).eq(rowN).css({
								'left': i * (set.width + set.marginL),
								'top': topN + (j * set.marginT) + set.marginT
							}).fadeIn(set.speed)
						}
					}
				};
			var AnimateFn = function(ARR) {
					for (var i in ARR) {
						for (var j in ARR[i].key) {
							var rowN = ARR[i].key[j];
							var topN = 0;
							for (var k = 0; k < j; k++) {
								topN = topN + ARR[i].arr[k]
							}
							$self.find("." + set.cn).eq(rowN).stop().animate({
								'left': i * (set.width + set.marginL),
								'top': topN + (j * set.marginT) + set.marginT
							})
						}
					}
				};
			$self.find("." + set.cn).each(function(i) {
				var $div = $(this);
				$div.css('position', 'absolute')
			});
			setPosition(init());
			$(window).resize(function() {
				var boxWidth = $self.width();
				var row = Math.floor((boxWidth + set.marginL) / (set.width + set.marginL));
				if (rowold != row) {
					rowold = row;
					AnimateFn(init())
				}
			})
		})
	}
})(jQuery);
window.onload = function() {
	$('.water_box').Waterfall({
		cn: 's',
		width: 580,
		speed: 0,
		marginT: 16,
		marginL: 16,
		delTime: 0
	});
	$('#s11').click(function() {
		$('.water_box2 div').clone().appendTo($('.water_box')).fadeIn(1000);
		$('.water_box').Waterfall({
			cn: 's',
			width: 580,
			speed: 0,
			marginT: 16,
			marginL: 16,
			delTime: 0
		})
	})
}