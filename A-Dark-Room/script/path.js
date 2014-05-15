var Path = {
		
	DEFAULT_BAG_SPACE: 10,
	
	// Everything not in this list weighs 1
	Weight: {
		'骨枪': 2,
		'铁剑': 3,
		'钢剑': 5,
		'步枪': 5,
		'子弹': 0.1,
		'燃料电池': 0.2,
		'镭射枪': 5,
		'链球': 0.5
	},
		
	name: 'Path',
	options: {}, // Nuthin'
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		// Init the World
		World.init();
		
		// Create the path tab
		this.tab = Header.addLocation("探索者尘路", "path", Path);
		
		// Create the Path panel
		this.panel = $('<div>').attr('id', "pathPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		// Add the outfitting area
		var outfitting = $('<div>').attr('id', 'outfitting').appendTo(this.panel);
		$('<div>').attr('id', 'bagspace').appendTo(outfitting);
		
		// Add the embark button
		new Button.Button({
			id: 'embarkButton',
			text: "出发",
			click: Path.embark,
			width: '80px',
			cooldown: World.DEATH_COOLDOWN
		}).appendTo(this.panel);
		
		Path.outfit = {};
		
		Engine.updateSlider();
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Path.handleStateUpdates);
	},
	
	openPath: function() {
		Path.init();
		Engine.event('progress', 'path');
		Notifications.notify(Room, '罗盘指向 ' + World.dir);
	},
	
	getWeight: function(thing) {
		var w = Path.Weight[thing];
		if(typeof w != 'number') w = 1;
		
		return w;
	},
	
	getCapacity: function() {
		if($SM.get('stores["大货车"]', true) > 0) {		//same  
			return Path.DEFAULT_BAG_SPACE + 60;   //tim test, should be 60
		} else if($SM.get('stores["货车"]', true) > 0) { 			//same
			return Path.DEFAULT_BAG_SPACE + 30;
		} else if($SM.get('stores["旅行包"]', true) > 0) {  //tim mark, in case of bug stores.rucksack
			return Path.DEFAULT_BAG_SPACE + 10;
		}
		return Path.DEFAULT_BAG_SPACE;
	},
	
	getFreeSpace: function() {
		var num = 0;
		if(Path.outfit) {
			for(var k in Path.outfit) {
				var n = Path.outfit[k];
				if(isNaN(n)) {
					// No idea how this happens, but I will fix it here!
					Path.outfit[k] = n = 0;
				}
				num += n * Path.getWeight(k);
			}
		}
		return Path.getCapacity() - num;
	},
	
	updatePerks: function() {
		if($SM.get('character.perks')) {
			var perks = $('#perks');
			var needsAppend = false;
			if(perks.length == 0) {
				needsAppend = true;
				perks = $('<div>').attr('id', 'perks');
			}
			for(var k in $SM.get('character.perks')) {
				var id = 'perk_' + k.replace(' ', '-');
				var r = $('#' + id);
				if($SM.get('character.perks["'+k+'"]') && r.length == 0) {
					r = $('<div>').attr('id', id).addClass('perkRow').appendTo(perks);
					$('<div>').addClass('row_key').text(k).appendTo(r);
					$('<div>').addClass('tooltip bottom right').text(Engine.Perks[k].desc).appendTo(r);
				}
			}
			
			if(needsAppend && perks.children().length > 0) {
				perks.appendTo(Path.panel);
			}
			
			if(Engine.activeModule === Path) {
				$('#storesContainer').css({top: perks.height() + 26 + 'px'});
			}
		}
	},
	
	updateOutfitting: function() {
		var outfit = $('div#outfitting');
		
		if(!Path.outfit) {
			Path.outfit = {};
		}
		
		// Add the armour row
		var armour = "none";
		if($SM.get('stores["钢甲"]', true) > 0)
			armour = "钢甲";
		else if($SM.get('stores["铁甲"]', true) > 0)
			armour = "铁甲";
		else if($SM.get('stores["皮甲"]', true) > 0)
			armour = "皮甲";
		var aRow = $('#armourRow');
		if(aRow.length == 0) {
			aRow = $('<div>').attr('id', 'armourRow').addClass('outfitRow').prependTo(outfit);
			$('<div>').addClass('row_key').text('防护装甲').appendTo(aRow);
			$('<div>').addClass('row_val').text(armour).appendTo(aRow);
			$('<div>').addClass('clear').appendTo(aRow);
		} else {
			$('.row_val', aRow).text(armour);
		}
		
		// Add the water row
		var wRow = $('#waterRow');
		if(wRow.length == 0) {
			wRow = $('<div>').attr('id', 'waterRow').addClass('outfitRow').insertAfter(aRow);
			$('<div>').addClass('row_key').text('水').appendTo(wRow);
			$('<div>').addClass('row_val').text(World.getMaxWater()).appendTo(wRow);
			$('<div>').addClass('clear').appendTo(wRow);
		} else {
			$('.row_val', wRow).text(World.getMaxWater());
		}
		
		
		var space = Path.getFreeSpace();
		var total = 0;
		// Add the non-craftables to the craftables
		var carryable = $.extend({
			'腌肉': { type: 'tool' },
			'子弹': { type: 'tool' },
			'手雷': {type: 'weapon' },
			'链球': {type: 'weapon' },
			'镭射枪': {type: 'weapon' },
			'燃料电池': {type: 'tool' },
			'刺刀': {type: 'weapon' },
			'护身符': {type: 'tool'},
			'医疗药剂': {type: 'tool'}
		}, Room.Craftables);
		
		for(var k in carryable) {
			var store = carryable[k];
			var have = $SM.get('stores["'+k+'"]');
			var num = Path.outfit[k];
			num = typeof num == 'number' ? num : 0;
			var numAvailable = $SM.get('stores["'+k+'"]', true);
			var row = $('div#outfit_row_' + k.replace(' ', '-'), outfit);
			if((store.type == 'tool' || store.type == 'weapon') && have > 0) {
				total += num * Path.getWeight(k);
				if(row.length == 0) {
					row = Path.createOutfittingRow(k, num);
					
					var curPrev = null;
					outfit.children().each(function(i) {
						var child = $(this);
						if(child.attr('id').indexOf('outfit_row_') == 0) {
							var cName = child.attr('id').substring(11).replace('-', ' ');
							if(cName < k && (curPrev == null || cName > curPrev)) {
								curPrev = cName;
							}
						}
					});
					if(curPrev == null) {
						row.insertAfter(wRow);
					} 
					else 
					{
						row.insertAfter(outfit.find('#outfit_row_' + curPrev.replace(' ', '-')));
					}
				} else {
					$('div#' + row.attr('id') + ' > div.row_val > span', outfit).text(num);
					$('div#' + row.attr('id') + ' .tooltip .numAvailable', outfit).text(numAvailable - num);
				}
				if(num == 0) {
					$('.dnBtn', row).addClass('disabled');
					$('.dnManyBtn', row).addClass('disabled');
				} else {
					$('.dnBtn', row).removeClass('disabled');
					$('.dnManyBtn', row).removeClass('disabled');
				}
				if(num >= numAvailable || space < Path.getWeight(k)) {
					$('.upBtn', row).addClass('disabled');
					$('.upManyBtn', row).addClass('disabled');
				} else if(space >= Path.getWeight(k)) {
					$('.upBtn', row).removeClass('disabled');
					$('.upManyBtn', row).removeClass('disabled');
				}
			} else if(have == 0 && row.length > 0) {
				row.remove();
			}
		}
		
		// Update bagspace
		$('#bagspace').text('容量 ' + Math.floor(Path.getCapacity() - total) + '/' + Path.getCapacity());
		
		if(Path.outfit['腌肉'] > 0) {
			Button.setDisabled($('#embarkButton'), false);
		} else {
			Button.setDisabled($('#embarkButton'), true);
		}
	},
	
	createOutfittingRow: function(name, num) {
		var row = $('<div>').attr('id', 'outfit_row_' + name.replace(' ', '-')).addClass('outfitRow');
		$('<div>').addClass('row_key').text(name).appendTo(row);
		var val = $('<div>').addClass('row_val').appendTo(row);
		
		$('<span>').text(num).appendTo(val);
		$('<div>').addClass('upBtn').appendTo(val).click([1], Path.increaseSupply);
		$('<div>').addClass('dnBtn').appendTo(val).click([1], Path.decreaseSupply);
		$('<div>').addClass('upManyBtn').appendTo(val).click([10], Path.increaseSupply);
		$('<div>').addClass('dnManyBtn').appendTo(val).click([10], Path.decreaseSupply);
		$('<div>').addClass('clear').appendTo(row);
		
		var numAvailable = $SM.get('stores["'+name+'"]', true);
		var tt = $('<div>').addClass('tooltip bottom right').appendTo(row);
		$('<div>').addClass('row_key').text('重量').appendTo(tt);
		$('<div>').addClass('row_val').text(Path.getWeight(name)).appendTo(tt);
		$('<div>').addClass('row_key').text('库存').appendTo(tt);
		$('<div>').addClass('row_val').addClass('numAvailable').text(numAvailable).appendTo(tt);
		
		return row;
	},
	
  increaseSupply: function(btn) {
		var supply = $(this).closest('.outfitRow').children('.row_key').text().replace('-', ' ');
		Engine.log('increasing ' + supply + ' by up to ' + btn.data);
		var cur = Path.outfit[supply];
		cur = typeof cur == 'number' ? cur : 0;
		if(Path.getFreeSpace() >= Path.getWeight(supply) && cur < $SM.get('stores["'+supply+'"]', true)) {
		  var maxExtraByWeight = Math.floor(Path.getFreeSpace() / Path.getWeight(supply));
		  var maxExtraByStore  = $SM.get('stores["'+supply+'"]', true) - cur;
		  var maxExtraByBtn    = btn.data;
			Path.outfit[supply] = cur + Math.min(maxExtraByBtn, Math.min(maxExtraByWeight, maxExtraByStore));
			Path.updateOutfitting();
		}
	},
	
	decreaseSupply: function(btn) {
		var supply = $(this).closest('.outfitRow').children('.row_key').text().replace('-', ' ');
		Engine.log('decreasing ' + supply + ' by up to ' + btn.data);
		var cur = Path.outfit[supply];
		cur = typeof cur == 'number' ? cur : 0;
		if(cur > 0) {
			Path.outfit[supply] = Math.max(0, cur - btn.data);
			Path.updateOutfitting();
		}
	},
	
	onArrival: function(transition_diff) {
		Path.setTitle();
		Path.updateOutfitting();
		Path.updatePerks();

		Engine.moveStoresView($('#perks'), transition_diff);
	},
	
	setTitle: function() {
		document.title = '探索者尘路';
	},
	
	embark: function() {
		for(var k in Path.outfit) {
			$SM.add('stores["'+k+'"]', -Path.outfit[k]);
		}
		World.onArrival();
		$('#outerSlider').animate({left: '-700px'}, 300);
		Engine.activeModule = World;
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'character' && e.stateName.indexOf('character.perks') == 0 && Engine.activeModule == Path){
			Path.updatePerks();
		};
	}
};