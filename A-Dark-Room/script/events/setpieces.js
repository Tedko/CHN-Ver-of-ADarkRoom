/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
	"哨站": { /* Friendly Outpost */
		title: '一个前哨战(友善)',
		scenes: {
			'start': {
				text: [
					'一个庇护所.'
				],
				notification: '一个野外的庇护所.',
				loot: {
					'腌肉': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				onLoad: function() {
					World.useOutpost();
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
	"沼泽": { /* Swamp */
		title: '一个烟雾迷茫的沼泽',
		scenes: {
			'start': {
				text: [
					'腐烂的芦苇漂浮在沼泽上.',
					'一个孤单的青蛙静静的蹲坐在淤泥上.'
				],
				notification: '污浊溃烂的气息弥漫在空气中.',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {1: 'cabin'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'cabin': {
				text: [
					'沼泽深处有一个覆满苔藓的小屋.',
					'一个年老的流浪汉在里面, 看似精神恍惚.'
				],
				buttons: {
					'talk': {
						cost: {'护身符': 1},
						text: '对话',
						nextScene: {1: 'talk'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'talk': {
				text: [
					'流浪者点头拿过了护身符.',
					'他说有一次带领着一个大团队抵达了一个新世界.',
					'但是未知事物带来的破坏毁灭了那个团队, 剩余的人忍饥挨饿痛苦异常.',
					'现在轮到他了, 流落在这里深深的忏悔....'
				],
				onLoad: function() {
					$SM.addPerk('九阳神功');
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"洞穴": { /* Cave */
		title: '一个潮湿的洞穴',
		scenes: {
			'start': {
				text: [
					'洞穴的入口宽而深.',
					"无法看清内部的清醒."
				],
				notification: '这里的地面到处都是裂痕, 就好像一条条古老的大地伤痕',
				buttons: {
					'enter': {	
						text: '进入一探',
						cost: { '火炬': 1 }, //tim mark in case of bug
						nextScene: {0.3: 'a1', 0.6: 'a2', 1: 'a3'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: '一头受惊的野兽正要捍卫自己的巢穴',
				loot: {
					'毛皮': {
						min: 1,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text: [
					'洞穴已经小的没有落脚之地了.',
					"墙壁很潮湿并覆满了苔藓"
				],
				buttons: {
					'continue': {	
						text: '挤进去',
						nextScene: {0.5: 'b2', 1: 'b3'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
			       '一个老旧的营地呈现在你面前.',
			       '灰黑的睡袋被褥都撕裂开了, 布满了灰尘.'
				],
				loot: {
					'腌肉': {
						min: 1,
						max: 5,
						chance: 1
					},
					'火炬': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'皮革': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
			       '一个流浪者的尸体躺在一个小穴里面.',
			       "尸体高度腐烂, 一些肢体已经不见了.",
			       "鬼知道还剩下些什么有用东西."
				],
				loot: {
					'铁剑': {
						min: 1,
						max: 1,
						chance: 1
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'火炬': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'医疗药剂': {
					  min: 1,
					  max: 2,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				text: [
			       '火炬熄灭在潮湿的空气中',
			       '黑暗再度来袭'
			    ],
				notification: '火炬熄灭了',
				buttons: {
					'continue': {	
						text: '继续前进',
						cost: {'火炬': 1},
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: '一个受惊的野兽正要保护它的巢穴',
				loot: {
					'毛皮': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				combat: true,
				enemy: '洞穴蜥蜴',
				chara: 'L',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				notification: '一头洞穴蜥蜴向你攻击',
				loot: {
					'鳞片': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '一头巨大的野兽冲出黑暗',
				loot: {
					'毛皮': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: '蜥蜴',
				chara: 'L',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '一只巨大的蜥蜴躺在地上',
				loot: {
					'鳞片': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.7: 'end2', 1: 'end3'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
			       '一只大型动物的巢穴就在洞穴的后方.'
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'毛皮': {
						min: 5,
						max: 10,
						chance: 1
					},
					'鳞片': {
						min: 5,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 5,
						max: 10,
						chance: 1
					},
					'布匹': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
			       '一个小型供给点隐藏在洞穴后方.'
		        ],
		        loot: {
					'布匹': {
						min: 5,
						max: 10,
						chance: 1
					},
					'皮革': {
						min: 5,
						max: 10,
						chance: 1
					},
					'铁': {
						min: 5,
						max: 10,
						chance: 1
					},
					'腌肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'钢': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'链球': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'医疗药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.15
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
			       '一个老旧的包裹嵌在石头后方, 满布灰尘.'
		        ],
		        loot: {
		        	'钢剑': {
		        		min: 1,
		        		max: 1,
		        		chance: 1
		        	},
		        	'链球': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.5
		        	},
    					'医疗药剂': {
    					  min: 1,
    					  max: 3,
    					  chance: 0.3
    					}
		        },
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"小镇": { /* Town */
		title: '一个沙漠小镇',
		scenes: {
			'start': {
				text: [
					'一个小型社区坐落在前方, 房子都烧焦残破了.',
					"路灯都破烂锈迹斑斑, 这个地方失去光明很旧了."
				],
				notification: "小镇废弃在前方, 里面的居民已经死了很久了",
				buttons: {
					'enter': {	
						text: '探索',
						nextScene: {0.3: 'a1', 0.7: 'a3', 1: 'a2'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				text: [
					"学校房屋的玻璃窗都没有碎掉, 但是都被熏黑了.",
					'大门吱吱不停的摇曳在残风中.'
				],
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {0.5: 'b1', 1: 'b2'},
						cost: {'火炬': 1}  //tim tag in case of bug
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			
			'a2': {
				combat: true,
				enemy: '暴徒',
				chara: 'T',
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
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
  				},
  				notification: '街头有埋伏.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					"前方有一坐建筑物.",
					'在肮脏的窗子后面有一个绿十字.'
				],
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {0.5: 'b5', 1: 'end5'},
						cost: {'火炬': 1} //tim mark, in case of bug
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
			       '生锈的锁柜里面有一些供给品.'
			    ],
			    loot: {
			    	'腌肉': {
			    		min: 1,
			    		max: 5,
			    		chance: 1
			    	},
			    	'火炬': {
			    		min: 1,
			    		max: 3,
			    		chance: 0.8
			    	},
			    	'子弹': {
			    		min: 1,
			    		max: 5,
			    		chance: 0.3
			    	},
  					'医疗药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.05
  					}
		    	},
		    	buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b2': {
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
  					'腌肉': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					}
  				},
  				notification: '一个清道夫就在门里面.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 3,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: '有一头野兽坐在杂草丛生的公园内.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				text: [
			       '一个撞翻的大篷车中的物件洒落在整个街道.',
			       "拾荒者已经扫荡过一遍了, 但是应该还找得到一些有用的东西."
				],
				loot: {
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'火炬': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'医疗药剂': {
					  min: 1,
					  max: 3,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'c5', 1: 'c6' }
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b5': {
				combat: true,
				enemy: '疯徒',
				chara: 'M',
				damage: 6,
  				hit: 0.3,
  				attackDelay: 1,
  				health: 10,
  				loot: {
  					'布匹': {
  						min: 2,
  						max: 4,
  						chance: 0.3
  					},
  					'腌肉': {
  						min: 1,
  						max: 5,
  						chance: 0.9
  					},
  					'医疗药剂': {
  						min: 1,
  						max: 2,
  						chance: 0.4
  					}
  				},
  				notification: '一个疯子尖叫着攻击你.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.3: 'end5', 1: 'end6'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: '暴徒',
				chara: 'T',
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
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
  				},
  				notification: '一个暴徒走出了阴影.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 3,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: '一头野兽冲突了已经空荡荡的教室.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c3': {
				text: [
			       '在通过体育馆大门的时候, 脚步声清晰可闻.',
			       '火炬照亮了走廊.',
			       '脚步声停了下来.'
		        ],
		        buttons: {
			        'continue': {
						text: '进入',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		        }
			},
			'c4': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 4,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: '通过噪声可以感觉到另外一头野兽, 在树林里面.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c5': {
				text: [
			       "有什么事情在下边的路上引起了骚动.",
			       "可能是战斗."
		        ],
		        buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c6': {
				text: [
			       '一个装满食物的小篮子隐藏在公园的长椅下, 上面还有个纸条.',
			       "看不懂写的什么."
		        ],
		        loot: {
		        	'腌肉': {
		        		min: 1,
		        		max: 5,
		        		chance: 1
		        	}
		        },
		        buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'd1': {
				combat: true,
				enemy: '清道夫',
				chara: 'S',
				damage: 5,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.5
					}
  				},
  				notification: '一个惊慌的清道夫尖叫着闯过了大门.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'd2': {
				combat: true,
				enemy: '警员',
				chara: 'V',
				damage: 6,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'钢剑': {
  						min: 1,
  						max: 1,
  						chance: 0.5
  					}
  				},
  				notification: "一个男人站在死去的流浪汉边上, 意识到他不是唯一的人类.",
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end3', 1: 'end4'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
			       '清道夫有一个小营地在学校里面.',
			       '收集的各种垃圾散落在地面上, 就好像是从天上下下来的.'
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 1
					},
					'钢': {
						min: 5,
						max: 10,
						chance: 1
					},
					'腌肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'链球': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'医疗药剂': {
					  min: 1,
					  max: 2,
					  chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
			       "清道夫似乎一直在寻找各种物资.",
			       "不好意思, 我笑纳了."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'煤': {
						min: 5,
						max: 10,
						chance: 1
					},
					'腌肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'皮革': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
			       "流浪汉身体下有一些东西, 手上也抓着很多, 闪闪发光.",
			       "真值得一杀."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end4': {
				text: [
			       "以牙还牙相当公平.",
			       "无往而不利.",
			       "骨头捡起来之后发现了一些小东西."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'腌肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'铁': {
						min: 5,
						max: 10,
						chance: 1
					},
					'火炬': {
						min: 1,
						max: 5,
						chance: 1
					},
					'链球': {
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
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end5': {
				text: [
			       '抽屉里面有一些治疗药剂.'
		        ],
		    onLoad: function() {
					World.clearDungeon();
				},
        loot: {
        	'医疗药剂': {
        		min: 2,
        		max: 5,
        		chance: 1
        	}
        },
        buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		    }
			},
			'end6': {
				text: [
			       '诊所已经被洗劫一空.',
			       '只有污浊的尘土依旧.'
		        ],
		    onLoad: function() {
					World.clearDungeon();
				},
        buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		    }
			}
		}
	},
	"城镇": { /* City */
		title: '一座诅咒之城',
		scenes: {
			'start': {
				text: [
					'一个可怜的高速公路标志坐落在这座曾经的大城市的入口.',
					"曾经壮观的高塔就好比是野兽的身体突出部位一般诡异.",
					'可能有一些有用的东西在里面.'
				],
				notification: "一个破损的高塔指向天际",
				buttons: {
					'enter': {	
						text: '探索',
						nextScene: {0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				text:[
				    '街道都是空的.',
				    '空气飘满了灰尘, 任凭风吹雨打.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text:[
				    '橙色的交通警示标记平方在街道上, 不过都破烂得不行了.',
				    '灯光闪烁在建筑的缝隙中.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
			       '一直巨大的棚屋延绵穿过了街区.',
			       '一张张灰黑布满血迹的脸从小破屋里面伸出来.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'b5', 1: 'b6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a4': {
				text: [
			       '一个废弃的医院坐落在前方.'
		        ],
        buttons: {
          'enter': {
            text: '进入',
            cost: { '火炬': 1 },
            nextScene: {0.5: 'b7', 1: 'b8'}
          },
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
        }
			},
			'b1': {
				text: [
			       '塔的内部似乎保存完整.',
			       '烧烂的汽车壳子挡住了入口.',
			       '大多数的落地窗户被捣毁了.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '进入',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b2': {
				combat: true,
				notification: '一个巨大的蜥蜴打破了老地铁站的宁静.',
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
		        buttons: {
		        	'descend': {	
						text: '拜访',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b3': {
				notification: '枪响在街道上产生回声.',
				combat: true,
  				enemy: '狙击手',
  				chara: 'S',
  				damage: 15,
  				hit: 0.8,
  				attackDelay: 4,
  				health: 30,
				ranged: true,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b4': {
				notification: '士兵在建筑之间战斗, 奔跑和射击.',
				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'c5', 1: 'c6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b5': {
				notification: '一个看上去挺斯文的人挡住去路并挑衅.',
				combat: true,
  				enemy: '斯文禽兽',
  				chara: 'M',
  				damage: 1,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 10,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'皮革': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.05
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'c7', 1: 'c8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b6': {
				text: [
			       '除了低垂的眼帘.',
			       '这个人很旧以前就被杀死了.'
		        ],
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'c8', 1: 'c9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b7': {
				text: [
			       '空荡的走廊.',
			       '清道夫已经把这搜刮干净了.'
		        ],
		    buttons: {
		      'continue': {	
						text: '继续前进',
						nextScene: {0.3: 'c12', 0.7: 'c10', 1: 'c11'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			'b8': {
				notification: '一个老人挥舞着手术刀冲了过来.',
				combat: true,
				enemy: '老家伙',
  				chara: 'M',
  				damage: 3,
  				hit: 0.5,
  				attackDelay: 2,
  				health: 10,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 3,
  						chance: 0.5
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'医疗药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.5
  					}
  				},
        buttons: {
        	'continue': {	
    				text: '继续前进',
    				nextScene: {0.3: 'c13', 0.7: 'c11', 1: 'end15'}
    			},
    			'leave': {
    				text: '离开城市',
    				nextScene: 'end'
    			}
		    }
			},
			'c1': {
				notification: '一个暴徒等在另外一边墙那.',
				combat: true,
				enemy: '暴徒',
  				chara: 'T',
  				damage: 3,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'钢剑': {
  						min: 1,
  						max: 1,
  						chance: 0.5
  					},
  					'腌肉': {
  						min: 1,
  						max: 3,
  						chance: 0.5
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'd1', 1: 'd2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c2': {
				notification: '一头咆哮着的野兽从车后面跳出来.',
				combat: true,
				enemy: '野兽',
  				chara: 'B',
  				damage: 2,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 30,
  				loot: {
  					'肉': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'毛皮': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c3': {
				text: [
			       '地铁站上方的街道已经被摧毁了.',
			       '一些光线照射到阴霾的尘土中.',
			       '前方传来一些声响.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '调查',
						cost: { '火炬': 1 },
						nextScene: {0.5: 'd2', 1: 'd3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c4': {
				text: [
			       '好像前方有一个营地.',
			       '生锈的链条东拉西扯的.',
			       '大火灾庭院前燃烧.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {0.5: 'd4', 1: 'd5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c5': {
				text: [
			       '前方传来更多的声响.',
			       '肯定有什么事情发生了.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {1: 'd5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c6': {
				text: [
			       '风中传来枪响.',
			       '前方街道闪光连连.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {0.5: 'd5', 1: 'd6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c7': {
				text: [
			       '越来越多的人挤过来了.',
			       '有人扔出一块石头.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {0.5: 'd7', 1: 'd8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c8': {
				text: [
					'一个简易车间被安置在路边.',
					'店主坚强的站在边上.'
				],
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 8,
						chance: 0.25
					},
					'外星合金': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'医疗药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.5
					}
				},
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {1: 'd8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c9': {
				text: [
			       '很多肉条晒在路边.',
			       '人们纷纷后退, 躲闪着眼光.'
		        ],
		        loot: {
		        	'腌肉': {
		        		min: 5,
		        		max: 10,
		        		chance: 1
		        	}
		        },
		        buttons: {
		        	'enter': {	
						text: '继续前进',
						nextScene: {0.5: 'd8', 1: 'd9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c10': {
				text: [
			       '有人反锁了手术室的门.'
		        ],
		    buttons: {
		      'enter': {	
						text: '继续前进',
						nextScene: {0.2: 'end12', 0.6: 'd10', 1: 'd11'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c11': {
				notification: '老人们的蜗居就在这间病房.',
				combat: true,
				enemy: '一群难民',
				plural: true,
				chara: 'SSS',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
  			loot: {
					'腌肉': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'布匹': {
						min: 3,
						max: 8,
						chance: 0.8
					},
					'医疗药剂': {
					  min: 1,
					  max: 3,
					  chance: 0.3
					}
				},
        buttons: {
    			'continue': {
    				text: '继续前进',
    				nextScene: { 1: 'end10' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c12': {
				notification: '一群蜥蜴在角落里.',
				combat: true,
				enemy: '一群蜥蜴',
				plural: true,
				chara: 'LLL',
				damage: 4,
				hit: 0.7,
				attackDelay: 0.7,
				health: 30,
  			loot: {
					'肉': {
						min: 3,
						max: 8,
						chance: 1
					},
					'牙齿': {
						min: 2,
						max: 4,
						chance: 1
					},
					'鳞片': {
					  min: 3,
					  max: 5,
					  chance: 1
					}
				},
        buttons: {
    			'continue': {
    				text: '继续前进',
    				nextScene: { 1: 'end10' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c13': {
				text: [
					'肉条挂在房间里面风干.'
				],
				loot: {
					'腌肉': {
					  min: 3,
					  max: 10,
					  chance: 1
					}
				},
        buttons: {
    			'continue': {
    				text: '继续前进',
    				nextScene: { 0.5: 'end10', 1: 'end11' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
						
			'd1': {
				notification: '楼梯尽头有一个巨大的鸟巢.',
				combat: true,
				enemy: '怪鸟',
  				chara: 'B',
  				damage: 5,
  				hit: 0.7,
  				attackDelay: 1,
  				health: 45,
  				loot: {
  					'肉': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd2': {
				text: [
			       "这里碎片密布.",
			       "可能在碎片中会有一些有用的东西."
		        ],
		        loot: {
		        	'子弹': {
		        		min: 1,
		        		max: 5,
		        		chance: 0.5
		        	},
		        	'钢': {
		        		min: 1,
		        		max: 10,
		        		chance: 0.8
		        	},
		        	'外星合金': {
		        		min: 1,
		        		max: 1,
		        		chance: 0.01
		        	},
		        	'布匹': {
		        		min: 1,
		        		max: 10,
		        		chance: 1
		        	}
		        },
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {1: 'end2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd3': {
				notification: '一大群老鼠冲入隧道.',
				combat: true,
				enemy: '一群老鼠',
				plural: true,
  				chara: 'RRR',
  				damage: 1,
  				hit: 0.8,
  				attackDelay: 0.25,
  				health: 60,
  				loot: {
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
					'牙齿': {
						min: 5,
						max: 10,
						chance: 0.5
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {0.5: 'end2', 1: 'end3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd4': {
				notification: '一个高大的男人挥舞着刺刀进行攻击.',
				combat: true,
				enemy: '老兵',
				chara: 'V',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 45,
				loot: {
					'刺刀': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end4', 1: 'end5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd5': {
				notification: '第二个士兵开火了.',
				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续前进',
						nextScene: {1: 'end5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd6': {
				notification: '一个蒙面士兵持枪站在角落',
				combat: true,
				enemy: '民兵',
				chara: 'C',
				ranged: true,
				damage: 3,
				hit: 0.9,
				attackDelay: 2,
				health: 55,
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end5', 1: 'end6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd7': {
				notification: '人群涌动.',
				combat: true,
				enemy: '一群难民',
				plural: true,
				chara: 'SSS',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end7', 1: 'end8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd8': {
				notification: '小年轻拿了根树枝就跳出来了.',
				combat: true,
				enemy: '洗剪吹',
				chara: 'Y',
				damage: 2,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'end8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd9': {
				notification: '有个人坚守在小木屋的门口.',
				combat: true,
				enemy: '难民',
				chara: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {0.5: 'end8', 1: 'end9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd10': {
				notification: '在门后的一个畸形人进行攻击.',
				combat: true,
				enemy: '畸形人',
				chara: 'D',
				damage: 8,
				hit: 0.6,
				attackDelay: 2,
				health: 40,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 2,
						max: 2,
						chance: 1
					},
					'钢': {
					  min: 1,
					  max: 3,
					  chance: 0.6
					},
					'鳞片': {
					  min: 2,
					  max: 3,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'end14'}
					}
				}
			},
			
			'd11': {
				notification: '门只要开了一点, 几百个触手就涌过来.',
				combat: true,
				enemy: '满天触手',
				plural: true,
				chara: 'TTT',
				damage: 2,
				hit: 0.6,
				attackDelay: 0.5,
				health: 60,
				loot: {
					'肉': {
						min: 10,
						max: 20,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: {1: 'end13'}
					}
				}
			},
		
			'end1': {
				text: [
				   '鸟儿都喜欢闪亮的东西.',
				   '它们的巢里面经常有好东西.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'子弹': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'链球': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'外星合金': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end2': {
				text: [
				   '没什么东西了.',
				   '清道夫已经来过这里了.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'火炬': {   //tim mark, incase of bug
						min: 1,
						max: 5,
						chance: 0.8
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end3': {
				text: [
				   '隧道通向一个平台.',
				   '残破的墙壁.',
				   '肢体和供给散落在墙壁两旁.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'镭射枪': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'燃料电池': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'外星合金': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			
			'end4': {
				text: [
				   '小型军事哨站补给充分.',
				   '武器弹药整理的排列在储藏室的地上.',
				   '跟以往一样的致命.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 10,
						chance: 1
					},
					'手雷': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end5': {
				text: [
				   '搜索尸体会得到一些物资.',
				   '路上会遇到更多的尸体的.',
				   '该离开了.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 10,
						chance: 1
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'医疗药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end6': {
				text: [
				   '小型定居点已经烧了一阵子了.',
				   '透过火焰仍可看到在燃烧的尸体.',
				   "还有时间取得一些物资."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'镭射枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'燃料电池': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'腌肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			
			'end7': {
				text: [
				   '剩下的居民四处逃逸, 他们的物资都被抛下了.',
				   "还能找到一些有用的东西, 虽然不多."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'燃料电池': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'腌肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end8': {
				text: [
				   '那个年轻的居民背着的是帆布包.',
				   "里面有一些旅行用品和几个装饰品",
				   "没别的了."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'链球': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'腌肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end9': {
				text: [
				   '小木屋内, 一个孩子在哭.',
				   "有几个行李靠在墙边.",
				   "没有东西了."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'链球': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'外星合金': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end10': {
				text: [
				   '腐烂和死亡的气息弥漫在手术室.',
				   "有一些东西散落在地上.",
				   '没有其他东西了.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'燃料电池': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'医疗药剂': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'牙齿': {
						min: 3,
						max: 8,
						chance: 1
					},
					'鳞片': {
						min: 4,
						max: 7,
						chance: 0.9
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end11': {
				text: [
				   '一个朴素的药箱在走廊尽头.',
				   "医院里面已经没什么了."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'燃料电池': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'医疗药剂': {
						min: 3,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end12': {
				text: [
				   '肯定有人一直储备东西在这里.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'燃料电池': {
						min: 1,
						max: 3,
						chance: 0.2
					},
					'医疗药剂': {
						min: 3,
						max: 10,
						chance: 0.5
					},
					'子弹': {
						min: 2,
						max: 8,
						chance: 1
					},
					'火炬': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'手雷': {
					  min: 1,
					  max: 1,
					  chance: 0.5
					},
					'外星合金': {
					  min: 1,
					  max: 2,
					  chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end13': {
				text: [
				   '恐怖触手被几百了.',
				   '里面到处都是遇难者的尸体.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'步枪': {
						min: 1,
						max: 2,
						chance: 0.3
					},
					'牙齿': {
						min: 2,
						max: 8,
						chance: 1
					},
					'布匹': {
					  min: 3,
					  max: 6,
					  chance: 0.5
					},
					'外星合金': {
					  min: 1,
					  max: 1,
					  chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end14': {
				text: [
				   '扭曲的男人死了.',
				   '手术室有很多奇怪的设备.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'燃料电池': {
						min: 2,
						max: 5,
						chance: 0.8
					},
					'医疗药剂': {
						min: 3,
						max: 12,
						chance: 1
					},
					'布匹': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'钢': {
					  min: 2,
					  max: 3,
					  chance: 0.3
					},
					'外星合金': {
					  min: 1,
					  max: 1,
					  chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end15': {
				text: [
					'这个老人有一些有趣的小收藏.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'外星合金': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'医疗药剂': {
					  min: 1,
					  max: 4,
					  chance: 1
					},
					'腌肉': {
					  min: 3,
					  max: 7,
					  chance: 1
					},
					'链球': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'毛皮': {
					  min: 1,
					  max: 5,
					  chance: 0.8
					}
				},
				buttons: {
    			'leave': {
    				text: '离开城市',
    				nextScene: 'end'
    			}
		    }
			}
		}	
	},
	"废屋": { /* Abandoned House */
		title: '一所老房子',
		scenes: {
			'start': {
				text: [
					'一所老房子依旧留存着, 白色的外墙泛黄脱落.',
					'门开着.'
				],
				notification: '老房子好比是一座对时代的纪念碑一般',
				buttons: {
					'enter': {
						text: '进入一探',
						nextScene: { 0.25: 'medicine', 0.5: 'supplies', 1: 'occupied' }
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'supplies': {
				text: [
					'房子虽然被废弃了, 但是还有一些东西.',
					'水井里面依旧有水.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.setWater(World.getMaxWater());
					Notifications.notify(null, '水满了');
				},
				loot: {
 					'腌肉': {
 						min: 1,
 						max: 10,
 						chance: 0.8
 					},
					'皮革': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'布匹': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'medicine': {
				text: [
				  '房子已经被洗劫一空了.',
					'但是地板下面还有一些医疗用品.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'医疗药剂': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'occupied': {
				combat: true,
				enemy: '难民',
				chara: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '一个男人占据着大厅, 手持大刀',
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
 					'腌肉': {
 						min: 1,
 						max: 10,
 						chance: 0.8
 					},
					'皮革': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'布匹': {
						min: 1,
						max: 10,
						chance: 0.5
					}
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
	"战场": { /* Discovering an old battlefield */
		title: '遗落战场',
		scenes: {
			'start': {
				text: [
			       '很久以前的大战.',
			       '双方的高科技造成了如此壮观的景象.'
		        ],
		        onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
		        loot: {
		        	'步枪': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.5
		        	},
		        	'子弹': {
		        		min: 5,
		        		max: 20,
		        		chance: 0.8
		        	},
		        	'镭射枪': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.3
		        	},
		        	'燃料电池': {
		        		min: 5,
		        		max: 10,
		        		chance: 0.5
		        	},
		        	'手雷': {
		        		min: 1,
		        		max: 5,
		        		chance: 0.5
		        	},
		        	'外星合金': {
		        		min: 1,
		        		max: 1,
		        		chance: 0.3
		        	}
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
	"巨坑": { /* Admiring a huge borehole */
		title: '一个巨坑',
		scenes: {
			'start': {
				text: [
			       '一个巨大的深坑切入地表.',
			       '他们拿走所需, 拍拍屁股.',
			       '通过悬崖边依旧能看清庞大的废弃场.'
		        ],
		        onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
		        loot: {
		        	'外星合金': {
		        		min: 1,
		        		max: 3,
		        		chance: 1
		        	}
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
	"飞船": { /* Finding a way off this rock */
		title: '破损的飞船',
		scenes: {
			'start': {
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.drawRoad();
					World.state.ship = true;
				},
				text: [
			       '尘土和灰烬之下流露出熟悉的各种曲线. ',
				   "很幸运当地人不会机械.",
			       '飞船可以被修复.'
		        ],
		        buttons: {
		        	'leavel': {
		        		text: '打捞',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},
	"硫磺矿": { /* Clearing the Sulphur Mine */
		title: '一座硫磺矿',
		scenes: {
			'start': {
				text: [
					"军队已经驻扎在矿井入口了.",
					'巡逻兵挎着步枪.'
				],
				notification: '军队已经驻扎在矿井入口了',
				buttons: {
					'attack': {	
						text: '攻击',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
  				notification: '一个士兵发现并开火了.',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: '逃跑',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'腌肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
  				notification: '第二个士兵加入战斗.',
 				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: '逃跑',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: '老兵',
				chara: 'V',
				damage: 10,
				hit: 0.8,
				attackDelay: 2,
				health: 65,
				loot: {
					'刺刀': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: '一个头发花白的士兵加入战斗, 挥舞着刺刀.',
 				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'军队已经被清除.',
					'矿坑现在可以工作了.'
				],
				notification: '硫磺矿解除危险了',
				onLoad: function() {
					World.drawRoad();
					World.state.sulphurmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"煤矿": { /* Clearing the Coal Mine */
		title: '一座煤矿',
		scenes: {
			'start': {
				text: [
					'矿坑入口篝火很旺.',
					'有人带着武器驻守在那.'
				],
				notification: '这座老矿坑没有被遗弃',
				buttons: {
					'attack': {	
						text: '攻击',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: '壮汉',
				chara: 'M',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'腌肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: '一个人加入战斗攻击',
				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: '逃跑',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
 				enemy: '壮汉',
 				chara: 'M',
 				damage: 3,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 10,
 				loot: {
					'腌肉': {
						min: 1,
 						max: 5,
						chance: 0.8
					},
					'布匹': {
						min: 1,
 						max: 5,
						chance: 0.8
					}
 				},
 				notification: '一个人加入战斗',
 				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: '逃跑',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
 				enemy: 'chief',
 				chara: 'C',
 				damage: 5,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 20,
 				loot: {
					'腌肉': {
						min: 5,
 						max: 10,
						chance: 1
					},
					'布匹': {
						min: 5,
 						max: 10,
						chance: 0.8
					},
					'铁': {
						min: 1,
						max: 5,
						chance: 0.8
					}
 				},
 				notification: '只有老大还在.',
 				buttons: {
					'continue': {
						text: '继续前进',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'营地依旧, 还有火焰燃烧的声音.',
					'矿坑安全了.'
				],
				notification: '矿坑解除危险了',
				onLoad: function() {
					World.drawRoad();
					World.state.coalmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"铁矿": { /* Clearing the Iron Mine */
		title: '一个铁矿',
 		scenes: {
			'start': {
				text: [
					'一个老矿坑在哪, 生锈的工具被乱丢.',
					'各种白骨散落一地, 上面还有深深的齿痕.',
					'黑暗中传来野性的咆哮.'
				],
				notification: '通向矿坑的小路',
				buttons: {
					'enter': {
						text: '进入一探',
						nextScene: { 1: 'enter' },
						cost: { '火炬': 1 }
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
 			'enter': {
 				combat: true,
 				enemy: '兽女',
 				chara: 'M',
 				damage: 4,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 10,
 				loot: {
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
					'鳞片': {
						min: 5,
 						max: 10,
						chance: 0.8
					},
					'布匹': {
						min: 5,
 						max: 10,
						chance: 0.5
					}
 				},
 				notification: '一个巨大的生物出现, 肌肉大到爆',
 				buttons: {
					'leave': {
						text: '离开',
						nextScene: { 1: 'cleared' }
					}
				}
 			},
			'cleared': {
				text: [
					'野兽死了.',
					'矿坑安全了.'
				],
				notification: '矿坑解除危险了',
				onLoad: function() {
					World.drawRoad();
					World.state.ironmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	
	"临时": { /* Cache - contains some of supplies from previous game */
		title: '一个毁灭的村庄',
		scenes: {
			'start': {
				text: [
					'毁灭的村子到处都是灰尘.',
					'破烂的尸体到处都是.'
				],
				notification: '被烧焦的尸体挂在空中.',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {1: 'underground'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'underground': {
				text: [
					'一个木屋处理在村子中心.',
					'里面还有一些物资.'
				],
				buttons: {
					'take': {
						text: '拿走',
						nextScene: {1: 'exit'}
					}
				}
			},
			'exit': {
				text: [
					'前代人的痕迹就在这里了.',
					'是时候采摘果实了.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					Prestige.collectStores();
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
};
