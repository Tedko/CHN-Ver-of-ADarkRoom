var Prestige = {
		
	name: 'Prestige',

	options: {},

	init: function(options) {
		this.options = $.extend(this.options, options);
	},
	
	storesMap: [
		{ store: '木头', type: 'g' },
		{ store: '毛皮', type: 'g' },
		{ store: '肉', type: 'g' },
		{ store: '铁', type: 'g' },
		{ store: '煤', type: 'g' },
		{ store: '硫磺', type: 'g' },
		{ store: '钢', type: 'g' },
		{ store: '腌肉', type: 'g' },
		{ store: '鳞片', type: 'g' },
		{ store: '牙齿', type: 'g' },
		{ store: '皮革', type: 'g' },
		{ store: '诱饵', type: 'g' },
		{ store: '火炬', type: 'g' },
		{ store: '布匹', type: 'g' },
		{ store: '骨枪', type: 'w' },
		{ store: '铁剑', type: 'w' },
		{ store: '钢剑', type: 'w' },
		{ store: '刺刀', type: 'w' },
		{ store: '步枪', type: 'w' },
		{ store: '镭射枪', type: 'w' },
		{ store: '子弹', type: 'a' },
		{ store: '燃料电池', type: 'a' },
		{ store: '手雷', type: 'a' },
		{ store: '链球', type: 'a' }
	],
	
	getStores: function(reduce) {
		var stores = [];
		
		for(var i in this.storesMap) {
			var s = this.storesMap[i];
			stores.push($SM.get('stores["' + s.store + '"]', true) / 
					(reduce ? this.randGen(s.type) : 1));
		}
		
		return stores;
	},
	
	get: function() {
		return {
			stores: $SM.get('previous.stores'),
			score: $SM.get('previous.score')
		};
	},
	
	set: function(prestige) {
		$SM.set('previous.stores', prestige.stores);
		$SM.set('previous.score', prestige.score);
	},
	
	save: function() {
		$SM.set('previous.stores', this.getStores(true));
		$SM.set('previous.score', Score.totalScore());
	},
  
	collectStores : function() {
		var prevStores = $SM.get('previous.stores');
		if(prevStores != null) {
			var toAdd = {};
			for(var i in this.storesMap) {
				var s = this.storesMap[i];
				toAdd[s.store] = prevStores[i];
			}
			$SM.addM('stores', toAdd);
			
			// Loading the stores clears em from the save
			prevStores.length = 0;
		}
	},

	randGen : function(storeType) {
		switch(storeType) {
		case 'g':
			return Math.floor(Math.random() * 10);
		case 'w':
			return Math.floor(Math.floor(Math.random() * 10) / 2);
		case 'a':
			return Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
		default:
			return 1;
		}
	}

};
