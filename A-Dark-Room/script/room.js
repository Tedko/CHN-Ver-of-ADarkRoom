/**
 * Module that registers the simple room functionality
 */
var Room = {
	// times in (minutes * seconds * milliseconds)
	_FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
	_ROOM_WARM_DELAY: 30 * 1000, // time between room temperature updates
	_BUILDER_STATE_DELAY: 0.5 * 60 * 1000, // time between builder state updates
	_STOKE_COOLDOWN: 10, // cooldown to stoke the fire
	_NEED_WOOD_DELAY: 15 * 1000, // from when the stranger shows up, to when you need wood
	
	fire:null,
	temperature:null,
	buttons:{},
	
	Craftables: {
		'陷阱': {
			button: null,
			maximum: 10,
			availableMsg: '工人说她能制作可以捕获活的猎物的陷阱',
			buildMsg: '更多的陷阱能捕获更多的猎物',
			maxMsg: "更多数量的陷阱已经不能带来益处",
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["陷阱"]', true);
				return {
					'木头': 10 + (n*10) 
				};
			}
		},
		'筐子': {
			button: null,
			maximum: 1,
			availableMsg: '工人说她能制作收集木头的筐子',
			buildMsg: '软筐能容纳更多的木头',
			type: 'building',
			cost: function() {
				return {
					'木头': 30 
				};
			}
		},
		'木屋': {
			button: null,
			maximum: 20,
			availableMsg: "工人说会有更多的迷路者来到这里, 他们也会加入我们.",
			buildMsg: '工人在森林里搭起一座木屋.',
			maxMsg: '没有空间建造木屋了.',
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["木屋"]', true);
				return {
					'木头': 100 + (n*50)
				};
			}
		},
		'猎人小屋': {
			button: null,
			maximum: 1,
			availableMsg: '我们的村民只要有了工具, 他们就能去打猎',
			buildMsg: '猎人小屋就坐落在村子口',
			type: 'building',
			cost: function() {
				return {
					'木头': 200, 
					'毛皮': 10,
					'肉': 5
				};
			}
		},
		'贸易栈': {
			button: null,
			maximum: 1,
			availableMsg: "有了贸易栈你就能很灵活的调度物资",
			buildMsg: "游牧民族们可以有地方落脚了",
			type: 'building',
			cost: function() {
				return {
					'木头': 400,
					'毛皮': 100
				};
			}
		},
		'制革坊': {
			button: null,
			maximum: 1,
			availableMsg: "工人说皮革很有用, 我们的村民能搞定.",
			buildMsg: '游牧民族们可以有地方落脚了',
			type: 'building',
			cost: function() {
				return {
					'木头': 500, 
					'毛皮': 50
				};
			}
		},
		'腌肉坊': {
			button: null,
			maximum: 1,
			availableMsg: "工人说如果不腌制, 鲜肉很快就会腐烂, 她有办法.",
			buildMsg: '工人很快建成了腌制房, 她很想吃腊肉, 川味的.',
			type: 'building',
			cost: function() {
				return {
						'木头': 600,
					'肉': 50  
				};
			}
		},
		'工具房': {
			button: null,
			maximum: 1,
			availableMsg: "工人说如果有合适的工具, 她能做的更好",
			buildMsg: "工具间总算完工了, 工人兴奋极了",
			type: 'building',
			cost: function() {
				return {
					'木头': 800,
					'皮革': 100,
					'鳞片': 10
				};
			}
		},
		'炼钢炉': {
			button: null,
			maximum: 1,
			availableMsg: "工人说只要有合适的工具, 村名可以炼钢",
			buildMsg: "炼钢炉起, 雾霾就来了",
			type: 'building',
			cost: function() {
				return {
					'木头': 1500,
					'铁': 100,
					'煤': 100
				};
			}
		},
		'军械库': {
			button: null,
			maximum: 1,
			availableMsg: "工人说稳定的武器和弹药供应是必要的",
			buildMsg: "军械库完成! 武器入库.",
			type: 'building',
			cost: function() {
				return {
					'木头': 3000,
					'钢': 100,
					'硫磺': 50
				};
			}
		},
		'火炬': {
			button: null,
			type: 'tool',
			buildMsg: '用以驱散黑暗的火炬',
			cost: function() {
				return {
				
					'木头': 1,
					'布匹': 1
				};
			}
		},
		'水袋': {
		//'水袋': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '水袋..就是用来放水的, 可惜容量小了点',
			cost: function() {
				return {
					'皮革': 50
				};
			}
		},
		'水桶': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '木桶可以存放不少的水, 探险能持续更久',
			cost: function() {
				return {

					'皮革': 100,
					'铁': 20
				};
			}
		},
		'水箱': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '你再也不会缺水了.',
			cost: function() {
				return {

					'铁': 100,
					'钢': 50
				};
			}
		},
		

		'骨枪': {
		//'bone spear': {
			button: null,
			type: 'weapon',
			buildMsg: "这枪有点糙, 但是用来突刺已经足够了",
			cost: function() {
				return {
					'木头': 100,
					'牙齿': 5
				};
			}
		},
		'旅行包': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '载得更多意味着更长更远的野外探险',
			cost: function() {
				return {
					'皮革': 200
				};
			}
		},
		'货车': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '货车可以载很多的物资供给',
			cost: function() {
				return {
					'木头': 500,
					'铁': 100
				};
			}
		},
		'大货车': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '超级大货车可以装载一切',
			cost: function() {
				return {
					'木头': 1000,
					'铁': 200,
					'钢': 100
				};
			}
		},
		'皮甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "皮革的确不是太牢固, 但总好过布料.",
			cost: function() {
				return {
					'皮革': 200,
					'鳞片': 20
				};
			}
		},
		'铁甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "铁比皮结实",
			cost: function() {
				return {
					'皮革': 200,
					'铁': 100
				};
			}
		},
		'钢甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "钢又比铁更牢固",
			cost: function() {
				return {
					'皮革': 200,
					'钢': 100
				};
			}
		},
		'铁剑': {
			button: null,
			type: 'weapon',
			buildMsg: "铁剑很尖锐, 在野外提供给我们足够的保护.",
			cost: function() {
				return {
					'木头': 200,
					'皮革': 50,
					'铁': 20
				};
			}
		},
		'钢剑': {
			button: null,
			type: 'weapon',
			buildMsg: "钢剑很锋利, 很可怕.",
			cost: function() {
				return {
					'木头': 500,
					'皮革': 100,
					'钢': 20
				};
			}
		},
		'步枪': {
			type: 'weapon',
			buildMsg: "黑火药和子弹, 好复古的感觉.",
			cost: function() {
				return {
					'木头': 200,
					'钢': 50,
					'硫磺': 50
				};
			}
		}
	},
	
	TradeGoods: {
		'鳞片': {
			type: 'good',
			cost: function() {
				return { 
					'毛皮': 150 
				};
			}
		},
		'牙齿': {
			type: 'good',
			cost: function() {
				return { 
					'毛皮': 300 
				};
			}
		},
		'铁': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 150,
					'鳞片': 50
				};
			}
		},
		'煤': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 200,
					'牙齿': 50
				};
			}
		},
		'钢': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 300,
					'鳞片': 50,
					'牙齿': 50
				};
			}
		},
		'医疗药剂': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 50, '牙齿': 30
				};
			}
		},
		'子弹': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 10
				};
			}
		},
		'燃料电池': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 10,
					'牙齿': 10
				};
			}
		},
		'链球': {
			type: 'weapon',
			cost: function() {
				return {
					'牙齿': 10
				};
			}
		},
		'手雷': {
			type: 'weapon',
			cost: function() {
				return {
					'鳞片': 100,
					'牙齿': 50
				};
			}
		},
		'刺刀': {
			type: 'weapon',
			cost: function() {
				return {
					'鳞片': 500,
					'牙齿': 250
				};
			}
		},
		'外星合金': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 1500,
					'鳞片': 750,
					'牙齿': 300
				};
			}
		},
		'罗盘': {
			type: 'upgrade',
			maximum: 1,
			cost: function() {
				return { 
					'毛皮': 400, 
					'鳞片': 20, 
					'牙齿': 10 
				};
			}
		}
	},
	
	MiscItems: {
	  '镭射枪': {
	    type: 'weapon'
	  }
	},
	
	name: "Room",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(Engine._debug) {
			this._ROOM_WARM_DELAY = 5000;
			this._BUILDER_STATE_DELAY = 5000;
			this._STOKE_COOLDOWN = 0;
			this._NEED_WOOD_DELAY = 5000;
		}
		
		if(typeof $SM.get('features.location.room') == 'undefined') {
			$SM.set('features.location.room', true);
			$SM.set('game.builder.level', -1);
		}
		
		Room.temperature = this.TempEnum.Cold;
		Room.fire = this.FireEnum.Dead;
		
		
		// Create the room tab
		this.tab = Header.addLocation("冰冷漆黑的木屋", "room", Room);
		
		// Create the Room panel
		this.panel = $('<div>')
			.attr('id', "roomPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		Engine.updateSlider();
		
		// Create the light button
		new Button.Button({
			id: 'lightButton',
			text: '点火',
			click: Room.lightFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			//cost: {'木头': 1}
			 cost: {'木头': 5} 
		}).appendTo('div#roomPanel');
		
		// Create the stoke button
		new Button.Button({
			id: 'stokeButton',
			text: "添加木头",
			click: Room.stokeFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: {'木头': 1}
		}).appendTo('div#roomPanel');
		
		// Create the stores container
		$('<div>').attr('id', 'storesContainer').appendTo('div#roomPanel');
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Room.handleStateUpdates);
		
		Room.updateButton();
		Room.updateStoresView();
		Room.updateIncomeView();
		Room.updateBuildButtons();
		
		Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
		
		/*
		 * Builder states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if($SM.get('game.builder.level') >= 0 && $SM.get('game.builder.level') < 3) {
			Room._builderTimer = setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		if($SM.get('game.builder.level') == 1 && $SM.get('stores["木头"]', true) < 0) {
			setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		setTimeout($SM.collectIncome, 1000);
		
		Notifications.notify(Room, "木屋 " + Room.temperature.text);
		Notifications.notify(Room, "火堆 " + Room.fire.text);
	},
	
	options: {}, // Nothing for now
	
	onArrival: function(transition_diff) {
		Room.setTitle();
		if(Room.changed) {
			Notifications.notify(Room, "火堆 " + Room.fire.text);
			Notifications.notify(Room, "木屋 " + Room.temperature.text);
			Room.changed = false;
		}
		if($SM.get('game.builder.level') == 3) {
			$SM.add('game.builder.level', 1);
			$SM.setIncome('工人', {
				delay: 10,
				stores: {'木头' : 2 }
			});
			Room.updateIncomeView();
			Notifications.notify(Room, "陌生人围坐在火堆旁, 她说她会帮忙建造建筑或者制造物件工具.");
		}

		Engine.moveStoresView(null, transition_diff);
	},
	
	TempEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Freezing: { value: 0, text: '极度深寒' },
		Cold: { value: 1, text: '很冷' },
		Mild: { value: 2, text: '不冷不热' },
		Warm: { value: 3, text: '温暖' },
		Hot: { value: 4, text: '很热' }
	},
	
	FireEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Dead: { value: 0, text: '熄灭了' },
		Smoldering: { value: 1, text: '冒烟了' },
		Flickering: { value: 2, text: '有火苗了' },
		Burning: { value: 3, text: '燃烧中' },
		Roaring: { value: 4, text: '熊熊燃烧中' }
	},
	
	setTitle: function() {
		var title = Room.fire.value < 2 ? "小黑屋" : "温暖的木屋";
		if(Engine.activeModule == this) {
			document.title = title;
		}
		$('div#location_room').text(title);
	},
	
	updateButton: function() {
		var light = $('#lightButton.button');
		var stoke = $('#stokeButton.button');
		if(Room.fire.value == Room.FireEnum.Dead.value && stoke.css('display') != 'none') {
			stoke.hide();
			light.show();
			if(stoke.hasClass('disabled')) {
				Button.cooldown(light);
			}
		} else if(light.css('display') != 'none') {
			stoke.show();
			light.hide();
			if(light.hasClass('disabled')) {
				Button.cooldown(stoke);
			}
		}
		
		if(!$SM.get('stores["木头"]')) {
			light.addClass('free');
			stoke.addClass('free');
		} else {
			light.removeClass('free');
			stoke.removeClass('free');
		}
	},
	
	_fireTimer: null,
	_tempTimer: null,
	lightFire: function() {
		var wood = $SM.get('stores["木头"]');
		if(wood < 5) {
			Notifications.notify(Room, "木头不足, 无法生火");
			Button.clearCooldown($('#lightButton.button'));
			return;
		} else if(wood > 4) {
			$SM.set('stores["木头"]', wood - 5);
		}
		Room.fire = Room.FireEnum.Burning;
		Room.onFireChange();
	},
	
	stokeFire: function() {
		var wood = $SM.get('stores["木头"]');
		if(wood === 0) {
			Notifications.notify(Room, "木头用光了");
			Button.clearCooldown($('#stokeButton.button'));
			return;
		}
		if(wood > 0) {
			$SM.set('stores["木头"]', wood - 1);
		}
		if(Room.fire.value < 4) {
			Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
		}
		Room.onFireChange();
	},
	
	onFireChange: function() {
		if(Engine.activeModule != Room) {
			Room.changed = true;
		}
		Notifications.notify(Room, "火堆 " + Room.fire.text, true);
		if(Room.fire.value > 1 && $SM.get('game.builder.level') < 0) {
			$SM.set('game.builder.level', 0);
			Notifications.notify(Room, "火堆的光芒映过窗户射进了茫茫黑暗");
			setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}	
		window.clearTimeout(Room._fireTimer);
		Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room.updateButton();
		Room.setTitle();
	},
	
	coolFire: function() {
		var wood = $SM.get('stores["木头"]');
		if(Room.fire.value <= Room.FireEnum.Flickering.value &&
			$SM.get('game.builder.level') > 3 && wood > 0) {
			Notifications.notify(Room, "工人给火堆添加木头", true);
			$SM.set('stores["木头"]', wood - 1);
			Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
		}
		if(Room.fire.value > 0) {
			Room.fire = Room.FireEnum.fromInt(Room.fire.value - 1);
			Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
			Room.onFireChange();
		}
	},
	
	adjustTemp: function() {
		var old = Room.temperature.value;
		if(Room.temperature.value > 0 && Room.temperature.value > Room.fire.value) {
			Room.temperature = Room.TempEnum.fromInt(Room.temperature.value - 1);
			Notifications.notify(Room, "木屋 " + Room.temperature.text, true);
		}
		if(Room.temperature.value < 4 && Room.temperature.value < Room.fire.value) {
			Room.temperature = Room.TempEnum.fromInt(Room.temperature.value + 1);
			Notifications.notify(Room, "木屋 " + Room.temperature.text, true);
		}
		if(Room.temperature.value != old) {
			Room.changed = true;
		}
		Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
	},
	
	unlockForest: function() {
		$SM.set('stores["木头"]', 4);
		Outside.init();
		Notifications.notify(Room, "外面寒风呼啸");
		Notifications.notify(Room, "木头快烧完了");
		Engine.event('progress', 'outside');
	},
	
	updateBuilderState: function() {
		var lBuilder = $SM.get('game.builder.level');
		if(lBuilder == 0) {
			Notifications.notify(Room, "一个衣衫褴褛的陌生人跌撞进门, 摔倒在墙角");
			lBuilder = $SM.setget('game.builder.level', 1);
			setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		} 
		else if(lBuilder < 3 && Room.temperature.value >= Room.TempEnum.Warm.value) {
			var msg = "";
			switch(lBuilder) {
			case 1:
				msg = "陌生人冻得发抖并且胡言乱语不知所云.";
				break;
			case 2:
				msg = "陌生人缩在墙角并不再发抖, 呼吸也平静下来了.";
				break;
			}
			Notifications.notify(Room, msg);
			if(lBuilder < 3) {
				lBuilder = $SM.setget('game.builder.level', lBuilder + 1);
			}
		}
		if(lBuilder < 3) {
			setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		Engine.saveGame();
	},
	
	updateStoresView: function() {
		var stores = $('div#stores');
		var weapons = $('div#weapons');
		var needsAppend = false, wNeedsAppend = false, newRow = false;
		if(stores.length == 0) {
			stores = $('<div>').attr({
				id: 'stores'
			}).css('opacity', 0);
			needsAppend = true;
		}
		if(weapons.length == 0) {
			weapons = $('<div>').attr({
				id: 'weapons'
			}).css('opacity', 0);
			wNeedsAppend = true;
		}
		for(var k in $SM.get('stores')) {
			
			var type = null;
			if(Room.Craftables[k]) {
				type = Room.Craftables[k].type;
			} else if(Room.TradeGoods[k]) {
				type = Room.TradeGoods[k].type;
			} else if (Room.MiscItems[k]) {
			  type = Room.MiscItems[k].type;
			}
			
			var location;
			switch(type) {
			case 'upgrade':
				// Don't display upgrades on the Room screen
				continue;
			case 'weapon':
				location = weapons;
				break;
			default:
				location = stores;
				break;
			}
			
			var id = "row_" + k.replace(' ', '-');
			var row = $('div#' + id, location);
			var num = $SM.get('stores["'+k+'"]');
			
			if(typeof num != 'number' || isNaN(num)) {
				// No idea how counts get corrupted, but I have reason to believe that they occassionally do.
				// Build a little fence around it!
				num = 0;
				$SM.set('stores["'+k+'"]', 0);
			}
			
			
			// thieves?
			if(typeof $SM.get('game["小偷"]') == 'undefined' && num > 5000 && $SM.get('features.location.world')) {
				$SM.startThieves();
			}
			
			if(row.length == 0 && num > 0) {
				row = $('<div>').attr('id', id).addClass('storeRow');
				$('<div>').addClass('row_key').text(k).appendTo(row);
				$('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
				$('<div>').addClass('clear').appendTo(row);
				var curPrev = null;
				location.children().each(function(i) {
					var child = $(this);
					var cName = child.attr('id').substring(4).replace('-', ' ');
					if(cName < k && (curPrev == null || cName > curPrev)) {
						curPrev = cName;
					}
				});
				if(curPrev == null) {
					row.prependTo(location);
				} else {
					row.insertAfter(location.find('#row_' + curPrev.replace(' ', '-')));
				}
				newRow = true;
			} else if(num>= 0){
				$('div#' + row.attr('id') + ' > div.row_val', location).text(Math.floor(num));
			}
		}
		
		if(needsAppend && stores.children().length > 0) {
			stores.appendTo('div#storesContainer');
			stores.animate({opacity: 1}, 300, 'linear');
		}
		
		if(wNeedsAppend && weapons.children().length > 0) {
			weapons.appendTo('div#storesContainer');
			weapons.animate({opacity: 1}, 300, 'linear');
		}
		
		if(newRow) {
			Room.updateIncomeView();
		}

		if($("div#outsidePanel").length) {
			Outside.updateVillage();
		}
	},
	
	updateIncomeView: function() {
		var stores = $('div#stores');
		if(stores.length == 0 || typeof $SM.get('income') == 'undefined') return;
		$('div.storeRow', stores).each(function(index, el) {
			el = $(el);
			$('div.tooltip', el).remove();
			var tt = $('<div>').addClass('tooltip bottom right');
			var storeName = el.attr('id').substring(4).replace('-', ' ');
			for(var incomeSource in $SM.get('income')) {
				var income = $SM.get('income["'+incomeSource+'"]');
				for(var store in income.stores) {
					if(store == storeName && income.stores[store] != 0) {
						$('<div>').addClass('row_key').text(incomeSource).appendTo(tt);
						$('<div>')
							.addClass('row_val')
							.text(Engine.getIncomeMsg(income.stores[store], income.delay))
							.appendTo(tt);
					}
				}
			}
			if(tt.children().length > 0) {
				tt.appendTo(el);
			}
		});
	},
	
	buy: function(buyBtn) {
		var thing = $(buyBtn).attr('buildThing');
		var good = Room.TradeGoods[thing];
		var numThings = $SM.get('stores["'+thing+'"]', true);
		if(numThings < 0) numThings = 0;
		if(good.maximum <= numThings) {
			return;
		}
		
		var storeMod = {};
		var cost = good.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, k + " 不足");
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);
		
		Notifications.notify(Room, good.buildMsg);
		
		$SM.add('stores["'+thing+'"]', 1);
		
		if(thing == '罗盘') {
			Path.openPath();
		}
	},
	
	build: function(buildBtn) {
		var thing = $(buildBtn).attr('buildThing');
		if(Room.temperature.value <= Room.TempEnum.Cold.value) {
			Notifications.notify(Room, "工人在发抖");
			return false;
		}
		var craftable = Room.Craftables[thing];
		
		var numThings = 0; 
		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'tool':
		case 'upgrade':
			numThings = $SM.get('stores["'+thing+'"]', true);
			break;
		case 'building':
			numThings = $SM.get('game.buildings["'+thing+'"]', true);
			break;
		}
		
		if(numThings < 0) numThings = 0;
		if(craftable.maximum <= numThings) {
			return;
		}
		
		var storeMod = {};
		var cost = craftable.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, "缺乏 " + k);
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);
		
		Notifications.notify(Room, craftable.buildMsg);
		
		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'upgrade':
		case 'tool':
			$SM.add('stores["'+thing+'"]', 1);
			break;
		case 'building':
			$SM.add('game.buildings["'+thing+'"]', 1);
			break;
		}		
	},
	
	needsWorkshop: function(type) {
		return type == 'weapon' || type == 'upgrade' || type =='tool';
	},
	
	craftUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		}
		if($SM.get('game.builder.level') < 4) return false;
		var craftable = Room.Craftables[thing];
		if(Room.needsWorkshop(craftable.type) && $SM.get('game.buildings["工具房"]', true) == 0) return false;
		var cost = craftable.cost();
		
		//show button if one has already been built
		if($SM.get('game.buildings["'+thing+'"]') > 0){
			Room.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the wood, and all other components have been seen.
		if($SM.get('stores["木头"]', true) < cost['木头'] * 0.5) {
			return false;
		}
		for(var c in cost) {
			if(!$SM.get('stores["'+c+'"]')) {
				return false;
			}
		}
		
		Room.buttons[thing] = true;
		//don't notify if it has already been built before
		if(!$SM.get('game.buildings["'+thing+'"]')){
			Notifications.notify(Room, craftable.availableMsg);
		}
		return true;
	},
	
	buyUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		} else if($SM.get('game.buildings["贸易栈"]', true) > 0) {
			if(thing == '罗盘' || typeof $SM.get('stores["'+thing+'"]') != 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	},
	
	updateBuildButtons: function() {
		var buildSection = $('#buildBtns');
		var needsAppend = false;
		if(buildSection.length == 0) {
			buildSection = $('<div>').attr('id', 'buildBtns').css('opacity', 0);
			needsAppend = true;
		}
		
		var craftSection = $('#craftBtns');
		var cNeedsAppend = false;
		if(craftSection.length == 0 && $SM.get('game.buildings["工具房"]', true) > 0) {
			craftSection = $('<div>').attr('id', 'craftBtns').css('opacity', 0);
			cNeedsAppend = true;
		}
		
		var buySection = $('#buyBtns');
		var bNeedsAppend = false;
		if(buySection.length == 0 && $SM.get('game.buildings["贸易栈"]', true) > 0) {
			buySection = $('<div>').attr('id', 'buyBtns').css('opacity', 0);
			bNeedsAppend = true;
		}
		
		for(var k in Room.Craftables) {
			craftable = Room.Craftables[k];
			var max = $SM.num(k, craftable) + 1 > craftable.maximum;
			if(craftable.button == null) {
				if(Room.craftUnlocked(k)) {
					var loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
					craftable.button = new Button.Button({
						id: 'build_' + k,
						cost: craftable.cost(),
						text: k,
						click: Room.build,
						width: '80px',
						ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({opacity: 1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', craftable.button);
				costTooltip.empty();
				var cost = craftable.cost();
				for(var k in cost) {
					$("<div>").addClass('row_key').text(k).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
				}
				if(max && !craftable.button.hasClass('disabled')) {
					Notifications.notify(Room, craftable.maxMsg);
				}
			}
			if(max) {
				Button.setDisabled(craftable.button, true);
			} else {
				Button.setDisabled(craftable.button, false);
			}
		}
		
		for(var k in Room.TradeGoods) {
			good = Room.TradeGoods[k];
			var max = $SM.num(k, good) + 1 > good.maximum;
			if(good.button == null) {
				if(Room.buyUnlocked(k)) {
					good.button = new Button.Button({
						id: 'build_' + k,
						cost: good.cost(),
						text: k,
						click: Room.buy,
						width: '80px'
					}).css('opacity', 0).attr('buildThing', k).appendTo(buySection).animate({opacity:1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', good.button);
				costTooltip.empty();
				var cost = good.cost();
				for(var k in cost) {
					$("<div>").addClass('row_key').text(k).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
				}
				if(max && !good.button.hasClass('disabled')) {
					Notifications.notify(Room, good.maxMsg);
				}
			}
			if(max) {
				Button.setDisabled(good.button, true);
			} else {
				Button.setDisabled(good.button, false);
			}
		}
		
		if(needsAppend && buildSection.children().length > 0) {
			buildSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(cNeedsAppend && craftSection.children().length > 0) {
			craftSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(bNeedsAppend && buildSection.children().length > 0) {
			buySection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'stores'){
			Room.updateStoresView();
			Room.updateBuildButtons();
		} else if(e.category == 'income'){
			Room.updateStoresView();
			Room.updateIncomeView();
		} else if(e.stateName.indexOf('game.buildings') == 0){
			Room.updateBuildButtons();
		}
	}
};
