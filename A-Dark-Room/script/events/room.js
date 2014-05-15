/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Nomad  --  Merchant */
		title: '游牧帐篷',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.毛皮', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					'一个游牧贸易团进入了视野, 他们携带了很多粗糙的麻线袋, 装满了货物.',
					"他们没有说他们从那里来, 显然也不会一直呆在这里."
				],
				notification: '一个游牧帐篷抵达并寻求贸易',
				buttons: {
					'buyScales': {
						text: '购买 鳞片',
						cost: { '毛皮': 100 },
						reward: { '鳞片': 1 }
					},
					'buyTeeth': {
						text: '购买 牙齿',
						cost: { '毛皮': 200 },
						reward: { '牙齿': 1 }
					},
					'buyBait': {
						text: '购买 诱饵',
						cost: { '毛皮': 5 },
						reward: { '诱饵': 1 },
						notification: '带诱饵的陷阱更有效.'
					},
					'buyCompass': {
						available: function() {
							return $SM.get('stores["罗盘"]', true) < 1;
						},
						text: '购买 罗盘',
						cost: { '毛皮': 300, '鳞片': 15, '牙齿': 5 },
						reward: { '罗盘': 1 },
						notification: '罗盘看上去很旧, 布满了灰尘, 但是依旧工作良好.',
						onChoose: Path.openPath
					}, 
					'goodbye': {
						text: '再见',
						nextScene: 'end'
					}
				}
			}
		}
	}, { /* Noises Outside  --  gain wood/fur */
		title: '噪音',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			'start': {
				text: [
					'嘈杂声穿墙入耳.',
					"不知道发生了什么事."
				],
				notification: '怪的声音穿墙而来',
				buttons: {
					'investigate': {
						text: '调查',
						nextScene: { 0.3: 'stuff', 1: 'nothing' }
					},
					'ignore': {
						text: '无视',
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					'模糊的身影移动着进入了黑暗.',
					'噪音消失了.'
				],
				buttons: {
					'backinside': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'stuff': {
				reward: { '木头': 100, '毛皮': 10 },
				text: [
					'一大捆用毛皮绑着的木头躺在门槛上.',
					'黑夜再次趋于宁静.'
				],
				buttons: {
					'backinside': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Inside  --  trade wood for better good */
		title: '噪音',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			start: {
				text: [
			       '摩擦声从储藏室内传来.',
			       '一定有什么东西在那.'
				],
				notification: '有东西在储藏室',
				buttons: {
					'investigate': {
						text: '调查',
						nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
					},
					'ignore': {
						text: '忽略',
						nextScene: 'end'
					}
				}
			},
			'鳞片': {
				text: [
			       '一些木头不见了.',
			       '地上有很多细小的鳞片'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numScales = Math.floor(numWood / 5);
			    	if(numScales == 0) numScales = 1;
			    	$SM.addM('stores', {'木头': -numWood, '鳞片': numScales});
			    },
			    buttons: {
			    	'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
			    }
			},
			'牙齿': {
				text: [
			       '一些木头丢失了.',
			       '地面流下了一些破碎的牙齿'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numTeeth = Math.floor(numWood / 5);
			    	if(numTeeth == 0) numTeeth = 1;
			    	$SM.addM('stores', {'木头': -numWood, '牙齿': numTeeth});
			    },
			    buttons: {
			    	'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
			    }
			},
			'布匹': {
				text: [
			       '丢失了一些木头.',
			       '地上有很多碎步屑'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numCloth = Math.floor(numWood / 5);
			    	if(numCloth == 0) numCloth = 1;
			    	$SM.addM('stores', {'木头': -numWood, '布匹': numCloth});
			    },
			    buttons: {
			    	'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},
	{ /* The Beggar  --  trade fur for better good */
		title: '乞丐',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
		},
		scenes: {
			start: {
				text: [
			       '来了一个乞丐.',
			       '乞求能给他一点暖和身子的皮毛.'
				],
				notification: '来了一个乞丐',
				buttons: {
					'50furs': {
						text: '给 50',
						cost: {'毛皮': 50},
						nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
					},
					'100furs': {
						text: '给 100',
						cost: {'毛皮': 100},
						nextScene: { 0.5: '牙齿', 0.8: '鳞片', 1: '布匹' }
					},
					'deny': {
						text: '撵走他',
						nextScene: 'end'
					}
				}
			},
			'鳞片': {
				reward: { '鳞片': 20 },
				text: [
			       '乞丐感激异常.',
			       '留下一堆20的鳞片.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			},
			'牙齿': {
				reward: { '牙齿': 20 },
				text: [
			       '乞丐感激异常.',
			       '留下一堆20的牙齿.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			},
			'布匹': {
				reward: { '布匹': 20 },
				text: [
			       '乞丐感激异常.',
			       '留下一堆20的布料.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},
	
	{ /* Mysterious Wanderer  --  wood gambling */
		title: '神秘流浪者',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			start: {
				text: [
			       '一个流浪汉带着一个空筐子来到了木屋, 说如果能给她一些木头带走, 他之后会带来更多.',
			       "工人不知道他是否值得信任."
				],
				notification: '一个神秘的流浪汉抵达',
				buttons: {
					'100wood': {
						text: '给 100',
						cost: {'木头': 100},
						nextScene: { 1: '100wood'}
					},
					'500wood': {
						text: '给 500',
						cost: {'木头': 500},
						nextScene: { 1: '500wood' }
					},
					'deny': {
						text: '撵走他',
						nextScene: 'end'
					}
				}
			},
			'100wood': {
				text: [
			       '流浪汉离开了, 筐子满载木头'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.5) {
			    		setTimeout(function() {
			    			$SM.add('stores["木头"]', 300);
			    			Notifications.notify(Room, '流浪女回来了, 带回来了300的木头.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			},
			'500wood': {
				text: [
				       '流浪汉离开了, 筐子满载木头'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.3) {
			    		setTimeout(function() {
			    			$SM.add('stores["木头"]', 1500);
			    			Notifications.notify(Room, '流浪女回来了, 带回来了1500的木头.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},
	
	{ /* Mysterious Wanderer  --  fur gambling */
		title: '神秘流浪者',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
		},
		scenes: {
			start: {
				text: [
			       '一个流浪女带着一个空筐子来到了木屋, 说如果能给她一些皮毛带走, 她之后会带来更多.',
			       "工人不知道她是否值得信任."
				],
				notification: '一个神秘的流浪女抵达',
				buttons: {
					'100fur': {
						text: '给 100',
						cost: {'毛皮': 100},
						nextScene: { 1: '100fur'}
					},
					'500fur': {
						text: '给 500',
						cost: {'毛皮': 500},
						nextScene: { 1: '500fur' }
					},
					'deny': {
						text: '撵走她',
						nextScene: 'end'
					}
				}
			},
			'100fur': {
				text: [
			       '流浪女离开了, 筐子满载皮毛'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.5) {
			    		setTimeout(function() {
			    			$SM.add('stores["毛皮"]', 300);
			    			Notifications.notify(Room, '流浪女回来了, 带回来了300的皮毛.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			},
			'500fur': {
				text: [
				       '流浪女离开了, 筐子满载皮毛'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.3) {
			    		setTimeout(function() {
			    			$SM.add('stores["毛皮"]', 1500);
			    			Notifications.notify(Room, '流浪女回来了, 带回来了1500的皮毛');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '再见',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},
	
	{ /* The Scout  --  Map Merchant */
		title: '侦察兵',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					"这个侦察兵说她已经去过所有的地图了.",
					"她愿意谈谈地图, 当然不是免费的."
				],
				notification: '一个侦察兵在夜幕中到来',
				buttons: {
					'buyMap': {
						text: '购买地图',
						cost: { '毛皮': 200, '鳞片': 10 },
						notification: '地图包含大地图的一角',
						onChoose: World.applyMap
					},
					'learn': {
						text: '学习侦察',
						cost: { '毛皮': 1000, '鳞片': 50, '牙齿': 20 },
						available: function() {
							return !$SM.hasPerk('千里眼');
						},
						onChoose: function() {
							$SM.addPerk('千里眼');
						}
					},
					'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
				}
			}
		}
	},
	
	{ /* The Wandering Master */
		title: '大师',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					'一个年老的流浪汉出现了',
					'他微笑着青请求寄宿过夜.'
				],
				notification: '一个年老的流浪汉出现了',
				buttons: {
					'agree': {
						text: '同意',
						cost: {
							'腌肉': 100,
							'毛皮': 100,
							'火炬': 1
						},
						nextScene: {1: 'agree'}
					},
					'deny': {
						text: '撵走他',
						nextScene: 'end'
					}
				}
			},
			'agree': {
				text: [
			       '作为交换, 老流浪汉分享了他的智慧.'
		        ],
		        buttons: {
		        	'evasion': {
		        		text: '逃脱术',
		        		available: function() {
		        			return !$SM.hasPerk('凌波微步');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('凌波微步');
		        		},
		        		nextScene: 'end'
		        	},
		        	'precision': {
		        		text: '精准术',
		        		available: function() {
		        			return !$SM.hasPerk('兰花佛穴手');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('兰花佛穴手');
		        		},
		        		nextScene: 'end'
		        	},
		        	'force': {
		        		text: '力量大师',
		        		available: function() {
		        			return !$SM.hasPerk('降龙十八掌');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('降龙十八掌');
		        		},
		        		nextScene: 'end'
		        	},
		        	'nothing': {
		        		text: '无视',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},
		
	{ /* The Sick Man */
  		title: '病人',
  		isAvailable: function() {
  			return Engine.activeModule == Room && $SM.get('stores["医疗药剂"]', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  					"一个男人躬着身, 咳嗽.",
  					"他乞求一些治疗药剂."
  				],
  				notification: '一个病人蹒跚而至',
  				buttons: {
  					'help': {
  						text: '给 1 治疗药剂',
  						cost: { '医疗药剂': 1 },
  						notification: '这个男人狼吞虎咽喝掉了治疗药剂',
  						nextScene: { 0.1: 'alloy', 0.3: 'cells', 0.5: '鳞片', 1.0: 'nothing' }
  					},
  					'ignore': {
  						text: '撵他走',
  						nextScene: 'end'
  					}
  				}
  			},
  			'alloy': {
  				text: [
  					"这个男人很感激.",
  					'他留下了他的反馈.',
  					'在他旅行中获得的一些奇怪的金属.'
  				],
  				onLoad: function() {
  					$SM.add('stores["外星合金"]', 1);
			    },
  				buttons: {
  					'bye': {
  						text: '再见',
  						nextScene: 'end'
  					}
  				}
  			},
  			'cells': {
  				text: [
  					"这个男人很感激.",
  					'他留下了他的反馈.',
  					'在他旅行中获得的一些奇怪的发光盒子.'
  				],
  				onLoad: function() {
  					$SM.add('stores["燃料电池"]', 3);
			    },
  				buttons: {
  					'bye': {
  						text: '再见',
  						nextScene: 'end'
  					}
  				}
  			},
  			'鳞片': {
  				text: [
  					"这个男人很感激.",
  					'他留下了他的反馈.',
  					'在他旅行中获得的一些鳞片.'
  				],
  				onLoad: function() {
  					$SM.add('stores["鳞片"]', 5);
			    },
  				buttons: {
  					'bye': {
  						text: '再见',
  						nextScene: 'end'
  					}
  				}
  			},
  			'nothing': {
  				text: [
  					"这个男人感谢异常, 挥手告别, 留下一根毛."
  				],
  				buttons: {
  					'bye': {
  						text: '再见',
  						nextScene: 'end'
  					}
  				}
  		  }
  	}
	}
];
