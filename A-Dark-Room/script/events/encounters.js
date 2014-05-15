/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
	/* Tier 1 */
	{ /* Snarling Beast */
		title: '咆哮的野兽',
 		isAvailable: function() {
 			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '暴怒野兽',
 				chara: 'B',
 				damage: 1,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 5,
 				loot: {
 					'毛皮': {
 						min: 1,
 						max: 3,
 						chance: 1
 					},
 					'肉': {
 						min: 1,
 						max: 3,
 						chance: 1
 					},
 					'牙齿': {
 						min: 1,
 						max: 3,
 						chance: 0.8
 					}
 				},
 				notification: '一只咆哮的野兽从草丛中串起'
 			}
 		}
	},
	{ /* Gaunt Man */
     	title: '一个落魄的人',
  		isAvailable: function() {
  			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '落魄者',
  				chara: 'G',
  				damage: 2,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 6,
  				loot: {
  					'布匹': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 1,
  						max: 2,
  						chance: 0.5
  					}
  				},
  				notification: '一个疯狂的家伙出现了'
  			}
		}
  	},
	{ /* Strange Bird */
     	title: '一只怪鸟',
  		isAvailable: function() {
  			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '怪鸟',
  				chara: 'B',
  				damage: 3,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 4,
  				loot: {
  					'鳞片': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.5
  					},
  					'肉': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					}
  				},
  				notification: '一只怪鸟略过平原'
  			}
		}
  	},
	/* Tier 2*/
	{ /* Shivering Man */
     	title: '一个瑟瑟发抖的人',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '抖人',
  				chara: 'S',
  				damage: 5,
  				hit: 0.5,
  				attackDelay: 1,
  				health: 20,
  				loot: {
  					'布匹': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.7
  					}
  				},
  				notification: '一个瑟瑟发抖的人接近中, 看上去力量无穷'
  			}
		}
  },
	{ /* Man-eater */
		title: '一个食人族',
 		isAvailable: function() {
 			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '食人族',
 				chara: 'E',
 				damage: 3,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 25,
 				loot: {
 					'毛皮': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'肉': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 0.8
 					}
 				},
 				notification: '一只巨大的生物接近了, 爪子上鲜血淋漓'
 			}
 		}
	},
	{ /* Scavenger */
     	title: '一个清道夫',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '清道夫',
  				chara: 'S',
  				damage: 4,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'布匹': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'铁': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '一个清道夫快速接近中, 想要偷袭'
  			}
		}
  	},
	{ /* Huge Lizard */
     	title: '一直饥饿的蜥蜴',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '蜥蜴',
  				chara: 'L',
  				damage: 5,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 20,
  				loot: {
  					'鳞片': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 5,
  						max: 10,
  						chance: 0.5
  					},
  					'肉': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					}
  				},
  				notification: '草丛扑出一只巨大的蜥蜴'
  			}
		}
  	},
	/* Tier 3*/
	{ /* Feral Terror */
		title: '一个恐怖生物',
 		isAvailable: function() {
 			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '恐怖生物',
 				chara: 'F',
 				damage: 6,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 45,
 				loot: {
 					'毛皮': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'肉': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 0.8
 					}
 				},
 				notification: '一只野兽, 比想象中更大更狂野'
 			}
 		}
	},
	{ /* Soldier */
     	title: '一个士兵',
  		isAvailable: function() {
  			return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'布匹': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'子弹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'步枪': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '一个士兵从沙漠那边开火'
  			}
		}
  	},
	{ /* Sniper */
     	title: '一个狙击手',
  		isAvailable: function() {
  			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '狙击手',
  				chara: 'S',
  				damage: 15,
  				hit: 0.8,
  				attackDelay: 4,
  				health: 30,
				ranged: true,
  				loot: {
  					'布匹': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'子弹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'步枪': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '一声枪响, 远远得传来'
  			}
		}
  	}
];
