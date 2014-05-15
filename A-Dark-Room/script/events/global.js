/**
 * Events that can occur when any module is active (Except World. It's special.)
 **/
Events.Global = [
	{ /* The Thief */
		title: '小偷',
		isAvailable: function() {
			return (Engine.activeModule == Room || Engine.activeModule == Outside) && $SM.get('game["小偷"]') == 1;
		},
		scenes: {
			'start': {
				text: [
					'村名们从储藏室拖出了一个肮脏的家伙.',
					"他的家人偷走了一些物资.",
					'他应该被绞死以示惩罚.'
				],
				notification: '一个小偷被抓住了',
				buttons: {
					'kill': {
						text: '吊死他',
						nextScene: {1: 'hang'}
					},
					'spare': {
						text: '释放他',
						nextScene: {1: 'spare'}
					}
				}
			},
			'hang': {
				text: [
			       '村名们把小偷吊死在了储藏室前面.',
			       '在强大的压力下, 丢失的物资很快就被退回来了.'
		        ],
		        onLoad: function() {
		        	$SM.set('game["小偷"]', 2);
		        	$SM.remove('income["小偷"]');
		        	$SM.addM('stores', $SM.get('game.stolen'));
		        },
		        buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'spare': {
				text: [
			       "小偷感谢不杀之恩, 他说再也不偷了.",
			       "他在离开之前把他的那些偷偷摸摸的技巧分享给了大家."
		        ],
		        onLoad: function() {
		        	$SM.set('game["小偷"]', 2);
		        	$SM.remove('income["小偷"]');
		        	$SM.addPerk('潜行术');
		        },
		        buttons: {
		        	'leave': {
		        		text: '离开',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	}
];