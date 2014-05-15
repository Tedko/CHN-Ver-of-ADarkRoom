/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
    { /* Ruined traps */
    	title: '破损的陷阱',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["陷阱"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					'一些陷阱已经严重损毁.',
					'巨大的足印导向森林.'
				],
				onLoad: function() {
					var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["陷阱"]', true)) + 1;
					$SM.add('game.buildings["陷阱"]', -numWrecked);
					Outside.updateVillage();
					Outside.updateTrapButton();
				},
				notification: '一些陷阱损坏了',
				buttons: {
					'track': {
						text: '追踪足迹',
						nextScene: {0.5: 'nothing', 1: 'catch'}
					},
					'ignore': {
						text: '忽略',
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					'踪迹消失了...',
					'森林再次归于宁静.'
				],
				buttons: {
					'end': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'catch': {
				text: [
			       '在离开村子的不远处发现了一只巨大的野兽, 它的皮毛覆满了暗淡的血液.',
			       '在武器面前, 它已经没什么抵抗力了.'
		        ],
				reward: {
					'毛皮': 100,
					'肉': 100,
					'牙齿': 10
				},
				buttons: {
					'end': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
    },
    
    { /* Sickness */
    	title: '疾病',
  		isAvailable: function() {
  			return Engine.activeModule == Outside && 
  				$SM.get('game.population', true) > 10 && 
  				$SM.get('game.population', true) < 50 && 
  				$SM.get('stores["医疗药剂"]', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  			    '疾病在村子里面传播.',
  			    '急需医疗药剂.'
  		    ],
  		    buttons: {
  		      'heal': {
  		        text: '1 医疗药剂',
  		        cost: { '医疗药剂' : 1 },
  		        nextScene: {1: 'healed'}
  		      },
  					'ignore': {
  						text: '置之不理',
  						nextScene: {1: 'death'}
  					}
  				}
  			},
  			'healed': {
  				text: [
  			    '疾病被即时控制了.'
  		    ],
  		    buttons: {
  					'end': {
  						text: '离开',
  						nextScene: 'end'
  					}
  				}
  			},
  			'death': {
  				text: [
  			    '疾病蔓延在整个村庄.',
  			    '天天都有人死去.',
  			    '黑夜总是伴随着惊声尖叫.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 20) + 1;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '离开',
  						nextScene: 'end'
  					}
  				}
  			}
  		}
    },
    
    { /* Plague */
    	title: '瘟疫',
  		isAvailable: function() {
  			return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores["医疗药剂"]', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  			    '一场可怕的瘟疫在村子里面迅速蔓延开.',
  			    '急需治疗药剂.'
  		    ],
  		    buttons: {
  		      'heal': {
  		        text: '5 治疗药剂',
  		        cost: { '医疗药剂' : 5 },
  		        nextScene: {1: 'healed'}
  		      },
  					'ignore': {
  						text: '置之不理',
  						nextScene: {1: 'death'}
  					}
  				}
  			},
  			'healed': {
  				text: [
  			    '瘟疫不制止了.',
  			    '我们只失去了几个人.',
  			    '我们埋葬了这些死者.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 5) + 2;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '离开',
  						nextScene: 'end'
  					}
  				}
  			},
  			'death': {
  				text: [
  			    '瘟疫席卷了整个村庄.',
  			    '尖叫恐惧声响彻了整个黑夜.',
  			    '死亡也许是更好的归宿.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 80) + 10;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '离开',
  						nextScene: 'end'
  					}
  				}
  			}
  		}
    },
    
    { /* Beast attack */
    	title: '猛兽袭击',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
		},
		scenes: {
			'start': {
				text: [
			       '一群野兽冲出了森林奔向村庄.',
			       '战斗短暂而血腥, 兽群最终被击退了.',
			       '村名们放弃了追击, 集体悼念了死去的人.'
		        ],
		        onLoad: function() {
					var numKilled = Math.floor(Math.random() * 10) + 1;
					Outside.killVillagers(numKilled);
				},
		        reward: {
		        	'毛皮': 100,
		        	'肉': 100,
		        	'牙齿': 10
		        },
		        buttons: {
					'end': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
    },
    
    { /* Soldier attack */
    	title: '武装冲突',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');;
		},
		scenes: {
			'start': {
				text: [
			       '一声枪响穿透树林.',
			       '武装精良的士兵冲突森林, 向我们的人开火.',
			       '在冲突后, 几个村名死亡, 随即武装人员就离开了.'
		        ],
		        onLoad: function() {
					var numKilled = Math.floor(Math.random() * 40) + 1;
					Outside.killVillagers(numKilled);
				},
		        reward: {
		        	'子弹': 10,
		        	'腌肉': 50
		        },
		        buttons: {
					'end': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
    }
];
	