const ogc = {
	init: (destination)=>{
		destination.innerHTML = "";
		ogc.stage = {
			size: {
				width: 500,
				height: 250,
			},
			resize: (width, height)=>{
				ogc.stage.size.width = width;
				ogc.stage.size.height = height;
				ogc.stage.update();
				return ogc.stage.size;
			},
			gravity: 9.81,
			background: {
				list: [{
					type: "color",
					value: "white",
				}],
				actual: 0,
				add: (type, value, title)=>{
					let ogc_temporal_background = {
						title: title,
						type: type,
						value: value,
					};
					if (title!==undefined && title!==null) {
						for (let i of ogc.stage.background.list) {
							if (title===i.title) {
								throw new Error("background '"+title+"' is already defined");
							}
						}
					}
					ogc.stage.background.list.push(ogc_temporal_background);
					return ogc_temporal_background;
				},
				remove: (index)=>{
					if (Number.isInteger(index)) {
						if (index>=ogc.stage.background.list.length) {
							throw new Error("background "+index+" does not exists");
						} else {
							ogc.stage.background.list.splice(index, 1);
						}
					} else {
						for (let i=0; i<ogc.stage.background.list.length; i++) {
							if (index===ogc.stage.background.list[i].title) {
								ogc.stage.background.list.splice(i, 1);
								break;
							} else if (i===ogc.stage.background.list.length-1) {
								throw new Error("background '"+index+"' does not exists");
							}
						}
					}
					return ogc.stage.background.list;
				},
				to: (index)=>{
					if (Number.isInteger(index)) {
						if (index>=ogc.stage.background.list.length) {
							throw new Error("background "+index+" does not exists");
						} else {
							ogc.stage.background.actual = index;
						}
					} else {
						for (let i=0; i<ogc.stage.background.list.length; i++) {
							if (index===ogc.stage.background.list[i].title) {
								ogc.stage.background.actual = i;
								break;
							} else if (i===ogc.stage.background.list.length-1) {
								throw new Error("background '"+index+"' does not exists");
							}
						}
					}
					ogc.stage.update();
					return ogc.stage.background.actual;
				},
				next: ()=>{
					ogc.stage.background.actual++;
					if (ogc.stage.background.actual>=ogc.stage.background.list.length) {
						ogc.stage.background.actual = 0;
					}
					ogc.stage.update();
					return ogc.stage.background.actual;
				},
				last: ()=>{
					ogc.stage.background.actual--;
					if (ogc.stage.background.actual<0) {
						ogc.stage.background.actual = ogc.stage.background.list.length-1;
					}
					ogc.stage.update();
					return ogc.stage.background.actual;
				},
			},
			event: {
				list: [],
				add: (event, method, title)=>{
					let ogc_temporal_event = {
						title: title,
						event: event,
						method: method,
					};
					if (title==undefined || event==undefined || method==undefined) {
						throw new Error("invalid parameter list");
					}
					for (let i of ogc.stage.event.list) {
						if (title===i.title) {
							throw new Error("event '"+title+"' is already defined");
						}
					}
					ogc.stage.event.list.push(ogc_temporal_event);
					document.addEventListener(event, method);
					ogc.stage.update();
					return ogc_temporal_event;
				},
				remove: (title)=>{
					for (let i=0; i<ogc.stage.event.list.length; i++) {
						if (title===ogc.stage.event.list[i].title) {
							document.removeEventListener(ogc.stage.event.list[i].event, ogc.stage.event.list[i].method);
							ogc.stage.event.list.splice(i, 1);
						} else if (i===ogc.stage.event.list.length-1) {
							throw new Error("event '"+title+"' does not exists");
						}
					}
					ogc.stage.update();
					return ogc.stage.event.list;
				},
			},
			toPixel: (x, y)=>{
				return {
					x: Math.round(ogc.stage.size.width/2)+x,
					y: Math.round(ogc.stage.size.height/2)-y,
				};
			},
			toCoordinate: (x, y)=>{
				return {
					x: Math.round((ogc.stage.size.width/2*-1)+x),
					y: Math.round((ogc.stage.size.height/2)-y),
				};
			},
			element: destination.appendChild(document.createElement("div")),
			update: ()=>{
				ogc.stage.element.style.width = ogc.stage.size.width+"px";
				ogc.stage.element.style.height = ogc.stage.size.height+"px";
				if (ogc.stage.background.list[ogc.stage.background.actual].type==="color") {
					ogc.stage.element.style.backgroundImage = "";
					ogc.stage.element.style.backgroundColor = ogc.stage.background.list[ogc.stage.background.actual].value;
				} else if (ogc.stage.background.list[ogc.stage.background.actual].type==="image") {
					ogc.stage.element.style.backgroundColor = "";
					ogc.stage.element.style.backgroundImage = "url("+ogc.stage.background.list[ogc.stage.background.actual].value+")";
				}
			},
		};
		ogc.stage.element.style.position = "relative";
		ogc.stage.update();
		ogc.figure = {
			create: (name, costume)=>{
				if (costume==undefined) {
					costume = [];
				}
				let ogc_temporal_figure = {
					position: {
						x: 0,
						y: 0,
					},
					move: (direction, length)=>{
						if (direction==="up") {
							ogc_temporal_figure.position.y += length;
						} else if (direction==="down") {
							ogc_temporal_figure.position.y -= length;
						} else if (direction==="right") {
							ogc_temporal_figure.position.x += length;
						} else if (direction==="left") {
							ogc_temporal_figure.position.x -= length;
						} else if (direction==="on") {
							ogc_temporal_figure.move(ogc_temporal_figure.rotation, length);
						} else {
							ogc_temporal_figure.position.x += Math.sin(Math.PI*(direction/180))*length;
							ogc_temporal_figure.position.y += Math.cos(Math.PI*(direction/180))*length;
                        }
						ogc_temporal_figure.update();
						return ogc_temporal_figure.position;
					},
					moveTo: (x, y)=>{
						if (x!=="~") {
							ogc_temporal_figure.position.x = x;
						}
						if (y!=="~") {
							ogc_temporal_figure.position.y = y;
						}
						ogc_temporal_figure.update();
						return ogc_temporal_figure.position;
					},
					moveToObject: (object)=>{
						ogc_temporal_figure.position.x = ogc.figure.all[object].position.x;
						ogc_temporal_figure.position.y = ogc.figure.all[object].position.y;
						ogc_temporal_figure.update();
						return ogc_temporal_figure.position;
					},
					gravity: {
						weight: 1,
						enable: (weight)=>{
							ogc_temporal_figure.gravity.disable();
							ogc_temporal_figure.gravity.weight = weight;
							ogc_temporal_figure.gravity.interval = setInterval(()=>{
								if ((ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y+Math.round(ogc_temporal_figure.size.height/2))+(ogc.stage.gravity*ogc_temporal_figure.gravity.weight)>=ogc.stage.size.height-1) {
									ogc_temporal_figure.moveTo("~", ogc.stage.toCoordinate(0, ogc.stage.size.height).y+(ogc_temporal_figure.size.height/2));
								} else {
									ogc_temporal_figure.move("down", ogc.stage.gravity*ogc_temporal_figure.gravity.weight);
								}
								return ogc_temporal_figure.position.y;
							}, 100);
							return true;
						},
						disable: ()=>{
							if (ogc_temporal_figure.gravity.interval!==undefined) {
								clearInterval(ogc_temporal_figure.gravity.interval);
							}
							return false;
						},
					},
					rotation: 0,
					rotate: (value, type)=>{
						if (type==="about") {
							ogc_temporal_figure.rotation += value;
						} else {
							ogc_temporal_figure.rotation = value;
						}
						ogc_temporal_figure.update();
						return ogc_temporal_figure.rotation;
					},
					distance: (object)=>{
						let ogc_temporal_catheter_x = Math.max(ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x, ogc.stage.toPixel(ogc.figure.all[object].position.x, 0).x)-Math.min(ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x, ogc.stage.toPixel(ogc.figure.all[object].position.x, 0).x);
						let ogc_temporal_catheter_y = Math.max(ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y, ogc.stage.toPixel(0, ogc.figure.all[object].position.y).y)-Math.min(ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y, ogc.stage.toPixel(0, ogc.figure.all[object].position.y).y);
						let ogc_temporal_distance = Math.sqrt(Math.pow(ogc_temporal_catheter_x, 2)+Math.pow(ogc_temporal_catheter_y, 2));
						return ogc_temporal_distance;
					},
					collision: {
						radius: 25,
						withObject: (object, radius)=>{
							if (radius==undefined) {
								radius = ogc_temporal_figure.collision.radius;
							}
							if (object==="edge") {
								let ogc_temporal_position = {
									x: ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x-Math.round(ogc_temporal_figure.size.width/2),
									y: ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y-Math.round(ogc_temporal_figure.size.height/2),
								};
								let ogc_temporal_collisionWithEdge = {
									x: (ogc_temporal_position.x<=0 || ogc_temporal_position.x+ogc_temporal_figure.size.width>=ogc.stage.size.width),
									y: (ogc_temporal_position.y<=0 || ogc_temporal_position.y+ogc_temporal_figure.size.height>=ogc.stage.size.height),
								};
								return (ogc_temporal_collisionWithEdge.x || ogc_temporal_collisionWithEdge.y);
							} else {
								return (ogc_temporal_figure.distance(object)<=radius);
							}
						},
						add: (title, object, radius, method)=>{
							let ogc_temporal_collision = {
								title: title,
								object: object,
								radius: radius,
								method: method,
							};
							if (title==undefined || object==undefined || radius==undefined) {
								throw new Error("invalid parameter list");
							}
							for (let i=0; i<ogc_temporal_figure.collision.list.length; i++) {
								if (title===ogc_temporal_figure.collision.list[i].title) {
									throw new Error("collision '"+title+"' already exists");
								}
							}
							ogc_temporal_figure.collision.list.push(ogc_temporal_collision);
							return ogc_temporal_collision;
						},
						remove: (title)=>{
							for (let i=0; i<ogc_temporal_figure.collision.list.length; i++) {
								if (title===ogc_temporal_figure.collision.list[i].title) {
									ogc_temporal_figure.collision.list.splice(i, 1);
									break;
								} else if (i===ogc_temporal_figure.collision.list.length-1) {
									throw new Error("collision '"+title+"' does not exist");
								}
							}
							return ogc_temporal_figure.collision.list;
						},
						list: [],
					},
					size: {
						width: 50,
						height: 50,
					},
					resize: (width, height)=>{
						ogc_temporal_figure.size.width = width;
						ogc_temporal_figure.size.height = height;
						ogc_temporal_figure.update();
						return ogc_temporal_figure.size;
					},
					visibility: {
						state: true,
						show: ()=>{
							ogc_temporal_figure.visibility.state = true;
							ogc_temporal_figure.update();
							return ogc_temporal_figure.visibility.state;
						},
						hide: ()=>{
							ogc_temporal_figure.visibility.state = false;
							ogc_temporal_figure.update();
							return ogc_temporal_figure.visibility.state;
						},
						toggle: ()=>{
							ogc_temporal_figure.visibility.state = !ogc_temporal_figure.visibility.state;
							ogc_temporal_figure.update();
							return ogc_temporal_figure.visibility.state;
						},
					},
					costumes: {
						list: costume,
						actual: 0,
						add: (src)=>{
							ogc_temporal_figure.costumes.list.push(src);
							ogc_temporal_figure.update();
							return ogc_temporal_figure.costumes.list;
						},
						remove: (index)=>{
							ogc_temporal_figure.costumes.list.splice(index, 1);
							ogc_temporal_figure.update();
							return ogc_temporal_figure.costumes.list;
						},
						next: ()=>{
							ogc_temporal_figure.costumes.actual++;
							if (ogc_temporal_figure.costumes.actual>=ogc_temporal_figure.costumes.list.length) {
								ogc_temporal_figure.costumes.actual = 0;
							}
							ogc_temporal_figure.update();
							return ogc_temporal_figure.actual;
						},
						last: ()=>{
							ogc_temporal_figure.costumes.actual--;
							if (ogc_temporal_figure.costumes.actual<0) {
								ogc_temporal_figure.costumes.actual = ogc_temporal_figure.costumes.list.length-1;
							}
							ogc_temporal_figure.update();
							return ogc_temporal_figure.actual;
						},
						to: (index)=>{
							if (index>=0 && index<ogc_temporal_figure.costumes.list.length) {
								ogc_temporal_figure.costumes.actual = index;
							}
							ogc_temporal_figure.update();
							return ogc_temporal_figure.actual;
						},
					},
					event: {
						list: [],
						add: (event, method, title)=>{
							let ogc_temporal_event = {
								title: title,
								event: event,
								method: method,
							};
							if (title==undefined || event==undefined || method==undefined) {
								throw new Error("invalid parameter list");
							}
							for (let i of ogc_temporal_figure.event.list) {
								if (title===i.title) {
									throw new Error("event '"+title+"' is already defined");
								}
							}
							ogc_temporal_figure.event.list.push(ogc_temporal_event);
							ogc_temporal_figure.element.addEventListener(event, method);
							ogc_temporal_figure.update();
							return ogc_temporal_event;
						},
						remove: (title)=>{
							for (let i=0; i<ogc_temporal_figure.event.list.length; i++) {
								if (title===ogc_temporal_figure.event.list[i].title) {
									ogc_temporal_figure.element.removeEventListener(ogc_temporal_figure.event.list[i].event, ogc_temporal_figure.event.list[i].method);
									ogc_temporal_figure.event.list.splice(i, 1);
									break;
								} else if (i===ogc_temporal_figure.event.list.length-1) {
									throw new Error("event '"+title+"' does not exists");
								}
							}
							ogc_temporal_figure.update();
							return ogc_temporal_figure.event.list;
						},
					},
					element: ogc.stage.element.appendChild(document.createElement("img")),
					update: ()=>{
						ogc_temporal_figure.element.style.top = (ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y-Math.round(ogc_temporal_figure.size.height/2))+"px";
						ogc_temporal_figure.element.style.left = (ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x-Math.round(ogc_temporal_figure.size.width/2))+"px";
						ogc_temporal_figure.element.width = ogc_temporal_figure.size.width;
						ogc_temporal_figure.element.height = ogc_temporal_figure.size.height;
						ogc_temporal_figure.element.src = ogc_temporal_figure.costumes.list[ogc_temporal_figure.costumes.actual];
						let ogc_temporal_position = {
							xLeft: ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x+Math.round(ogc_temporal_figure.size.width/2),
							yTop: ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y+Math.round(ogc_temporal_figure.size.height/2),
							xRight: (ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x)-Math.round(ogc_temporal_figure.size.width/2),
							yBottom: (ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y)-Math.round(ogc_temporal_figure.size.height/2),
						};
						let ogc_temporal_outOfStage = (ogc_temporal_position.xLeft-1<0 || ogc_temporal_position.xRight>ogc.stage.size.width-1 || ogc_temporal_position.yTop-1<0 || ogc_temporal_position.yBottom>ogc.stage.size.height-1);
						ogc_temporal_figure.element.style.display = (ogc_temporal_figure.visibility.state && !ogc_temporal_outOfStage) ? "" : "none";
						ogc_temporal_figure.element.style.visibility = (ogc_temporal_figure.visibility.state && !ogc_temporal_outOfStage) ? "" : "hidden";
						for (let i of ogc_temporal_figure.collision.list) {
							if (ogc_temporal_figure.collision.withObject(i.object, i.radius)) {
								i.method();
							}
						}
						return ogc_temporal_figure;
					},
					remove: ()=>{
						if (ogc_temporal_figure.prototype.type!==undefined) {
							ogc_temporal_figure.prototype.remove();
						}
						for (let i of ogc_temporal_figure.event.list) {
							ogc_temporal_figure.event.remove(i.title);
						}
						ogc.stage.element.removeChild(ogc_temporal_figure.element);
						delete ogc.figure.all[name];
						return ogc.figure.all;
					},
					prototype: {
						initialize: (prototype)=>{
							ogc_temporal_figure.prototype.all[prototype]();
						},
						all: {
							player: ()=>{
								ogc_temporal_figure.prototype.type = "player";
								ogc_temporal_figure.prototype.keys = {
									up: "w",
									down: "s",
									right: "d",
									left: "a",
								};
								ogc_temporal_figure.prototype.length = 10;
								ogc_temporal_figure.prototype.walk = (event)=>{
									if (event.key===ogc_temporal_figure.prototype.keys.up) {
										ogc_temporal_figure.move("up", ogc_temporal_figure.prototype.length);
									} else if (event.key===ogc_temporal_figure.prototype.keys.down) {
										ogc_temporal_figure.move("down", ogc_temporal_figure.prototype.length);
									} else if (event.key===ogc_temporal_figure.prototype.keys.right) {
										ogc_temporal_figure.move("right", ogc_temporal_figure.prototype.length);
									} else if (event.key===ogc_temporal_figure.prototype.keys.left) {
										ogc_temporal_figure.move("left", ogc_temporal_figure.prototype.length);
									}
								};
								document.addEventListener("keypress", ogc_temporal_figure.prototype.walk);
								ogc_temporal_figure.prototype.remove = ()=>{
									document.removeEventListener("keypress", ogc_temporal_figure.prototype.walk);
								}
								return ogc_temporal_figure.prototype;
							},
							jumpNRunPlayer: ()=>{
								ogc_temporal_figure.prototype.type = "jumpNRunPlayer";
								ogc_temporal_figure.prototype.keys = {
									jump: " ",
									right: "d",
									left: "a",
								};
								ogc_temporal_figure.prototype.length = 10;
								ogc_temporal_figure.prototype.jump = 10;
								ogc_temporal_figure.prototype.action = (event)=>{
									if (event.key===ogc_temporal_figure.prototype.keys.jump && ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y+Math.round(ogc_temporal_figure.size.height/2)>=ogc.stage.size.height-1) {
										ogc_temporal_figure.move("up", ogc_temporal_figure.prototype.jump*ogc.stage.gravity);
									} else if (event.key===ogc_temporal_figure.prototype.keys.right) {
										ogc_temporal_figure.move("right", ogc_temporal_figure.prototype.length);
									} else if (event.key===ogc_temporal_figure.prototype.keys.left) {
										ogc_temporal_figure.move("left", ogc_temporal_figure.prototype.length);
									}
								};
								document.addEventListener("keypress", ogc_temporal_figure.prototype.action);
								ogc_temporal_figure.gravity.enable(1);
								ogc_temporal_figure.prototype.remove = ()=>{
									document.removeEventListener("keypress", ogc_temporal_figure.prototype.action);
									ogc_temporal_figure.gravity.disable();
								}
								return ogc_temporal_figure.prototype;
							},
						},
					},
				};
				ogc_temporal_figure.show = ogc_temporal_figure.visibility.show;
				ogc_temporal_figure.hide = ogc_temporal_figure.visibility.hide;
				ogc_temporal_figure.element.style.position = "absolute";
				ogc_temporal_figure.update();
				if (ogc.figure.all[name]!==undefined) {
					throw new Error("figure '"+name+"' already exists");
				} else {
					ogc.figure.all[name] = ogc_temporal_figure;
				}
				return ogc.figure.all[name];
			},
			all: {},
		};
		ogc.audio = {
			list: [],
			add: (title, src)=>{
				let ogc_temporal_audio = {
					title: title,
					object: new Audio(src),
				};
				for (let i of ogc.audio.list) {
					if (title===i.title) {
						throw new Error("audio '"+title+"' already exists");
					}
				}
				ogc.audio.list.push(ogc_temporal_audio);
				return ogc_temporal_audio;
			},
			remove: (title)=>{
				for (let i=0; i<ogc.audio.list.length; i++) {
					if (title===ogc.audio.list[i].title) {
						ogc.audio.pause(title);
						ogc.audio.list.splice(i, 1);
						break;
					} else if (i===ogc.audio.list.length-1) {
						throw new Error("audio '"+title+"' does not exists");
					}
				}
				return ogc.audio.list;
			},
			play: (title)=>{
				for (let i=0; i<ogc.audio.list.length; i++) {
					if (title===ogc.audio.list[i].title) {
						ogc.audio.list[i].object.play();
						break;
					} else if (i===ogc.audio.list.length-1) {
						throw new Error("audio '"+title+"' does not exists");
					}
				}
				return ogc.audio.list;
			},
			pause: (title)=>{
				for (let i=0; i<ogc.audio.list.length; i++) {
					if (title===ogc.audio.list[i].title) {
						ogc.audio.list[i].object.pause();
						break;
					} else if (i===ogc.audio.list.length-1) {
						throw new Error("audio '"+title+"' does not exists");
					}
				}
				return ogc.audio.list;
			},
			setAttribute: (title, attribute, value)=>{
				if (attribute==="volume") {
					value *= 100;
				}
				let ogc_temporal_audio;
				for (let i=0; i<ogc.audio.list.length; i++) {
					if (title===ogc.audio.list[i].title) {
						ogc_temporal_audio = i;
						ogc.audio.list[i].object[attribute] = value;
						break;
					} else if (i===ogc.audio.list.length-1) {
						throw new Error("audio '"+title+"' does not exists");
					}
				}
				return ogc.audio.list[i].object[attribute];
			},
			quick: {
				volume: 100,
				play: (src)=>{
					let ogc_temporal_audio = new Audio(src);
					ogc_temporal_audio.volume = ogc.audio.quick.volume/100;
					ogc_temporal_audio.play();
					return ogc_temporal_audio;
				},
			},
		};
		return ogc;
	}
};