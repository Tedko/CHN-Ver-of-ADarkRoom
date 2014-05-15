/**
 * Module that registers the starship!
 */
var Ship = {
	LIFTOFF_COOLDOWN: 120,
	ALLOY_PER_HULL: 1,
	ALLOY_PER_THRUSTER: 1,
	BASE_HULL: 0,
	BASE_THRUSTERS: 1,
	
	name: "Ship",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(!$SM.get('features.location.spaceShip')) {
			$SM.set('features.location.spaceShip', true);
			$SM.setM('game.spaceShip', {
				hull: Ship.BASE_HULL,
				thrusters: Ship.BASE_THRUSTERS
			});
		}
		
		// Create the Ship tab
		this.tab = Header.addLocation("古老的飞船", "ship", Ship);
		
		// Create the Ship panel
		this.panel = $('<div>').attr('id', "shipPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		Engine.updateSlider();
		
		// Draw the hull label
		var hullRow = $('<div>').attr('id', 'hullRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('外壳:').appendTo(hullRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.hull')).appendTo(hullRow);
		$('<div>').addClass('clear').appendTo(hullRow);
		
		// Draw the thrusters label
		var engineRow = $('<div>').attr('id', 'engineRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('引擎:').appendTo(engineRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.thrusters')).appendTo(engineRow);
		$('<div>').addClass('clear').appendTo(engineRow);
		
		// Draw the reinforce button
		new Button.Button({
			id: 'reinforceButton',
			text: '加固船身',
			click: Ship.reinforceHull,
			width: '100px',
			cost: {'外星合金': Ship.ALLOY_PER_HULL}
		}).appendTo('div#shipPanel');
		
		// Draw the engine button
		new Button.Button({
			id: 'engineButton',
			text: '升级引擎',
			click: Ship.upgradeEngine,
			width: '100px',
			cost: {'外星合金': Ship.ALLOY_PER_THRUSTER}
		}).appendTo('div#shipPanel');
		
		// Draw the lift off button
		var b = new Button.Button({
			id: 'liftoffButton',
			text: '飞向火星',
			click: Ship.checkLiftOff,
			width: '100px',
			cooldown: Ship.LIFTOFF_COOLDOWN
		}).appendTo('div#shipPanel');
		
		if($SM.get('game.spaceShip.hull') <= 0) {
			Button.setDisabled(b, true);
		}
		
		// Init Space
		Space.init();
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Ship.handleStateUpdates);
	},
	
	options: {}, // Nothing for now
	
	onArrival: function(transition_diff) {
		Ship.setTitle();
		if(!$SM.get('game.spaceShip.seenShip')) {
			Notifications.notify(Ship, '在大量机械残骸中, 古老的飞船停在岩石上, 已经等待得太久了.');
			$SM.set('game.spaceShip.seenShip', true);
		}

		Engine.moveStoresView(null, transition_diff);
	},
	
	setTitle: function() {
		if(Engine.activeModule == this) {
			document.title = "一艘古老的星际飞船";
		}
	},
	
	reinforceHull: function() {
		if($SM.get('stores["外星合金"]', true) < Ship.ALLOY_PER_HULL) {
			Notifications.notify(Ship, "外星合金 不足");
			return false;
		}
		$SM.add('stores["外星合金"]', -Ship.ALLOY_PER_HULL);
		$SM.add('game.spaceShip.hull', 1);
		if($SM.get('game.spaceShip.hull') > 0) {
			Button.setDisabled($('#liftoffButton', Ship.panel), false);
		}
		$('#hullRow .row_val', Ship.panel).text($SM.get('game.spaceShip.hull'));
	},
	
	upgradeEngine: function() {
		if($SM.get('stores["外星合金"]', true) < Ship.ALLOY_PER_THRUSTER) {
			Notifications.notify(Ship, "外星合金 不足");
			return false;
		}
		$SM.add('stores["外星合金"]', -Ship.ALLOY_PER_THRUSTER);
		$SM.add('game.spaceShip.thrusters', 1);
		$('#engineRow .row_val', Ship.panel).text($SM.get('game.spaceShip.thrusters'));
	},
	
	getMaxHull: function() {
		return $SM.get('game.spaceShip.hull');
	},
	
	checkLiftOff: function() {
		if(!$SM.get('game.spaceShip.seenWarning')) {
			Events.startEvent({
				title: '真的准备离开了么?',
				scenes: {
					'start': {
						text: [
							"总算要离开这个失落之地了, 永远不回头!"
						],
						buttons: {
							'fly': {
								text: '起飞',
								onChoose: function() {
									$SM.set('game.spaceShip.seenWarning', true);
									Ship.liftOff();
								},
								nextScene: 'end'
							},
							'wait': {
								text: '再考虑下',
								onChoose: function() {
									Button.clearCooldown($('#liftoffButton'));
								},
								nextScene: 'end'
							}
						}
					}
				}
			});
		} else {
			Ship.liftOff();
		}
	},
	
	liftOff: function () {
		$('#outerSlider').animate({top: '700px'}, 300);
		Space.onArrival();
		Engine.activeModule = Space;
	},
	
	handleStateUpdates: function(e){
		
	}
};