const ogc = {
	init: (destination)=>{
		destination.innerHTML = "";
		ogc.stage = {
			parent: destination,
			size: {
				width: 500,
				height: 250,
			},
			resize: (width, height)=>{
				if (width==="fullScreen") {
					ogc.stage.size.width = window.innerWidth;
				} else {
					ogc.stage.size.width = width;
				}
				if (height==="fullScreen") {
					ogc.stage.size.height = window.innerHeight;
				} else {
					ogc.stage.size.height = height;
				}
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
						collider: 25,
						withObject: (object, radius, objectRadius)=>{
							if (radius==undefined) {
								radius = ogc_temporal_figure.collision.collider;
							}
							if (objectRadius==undefined) {
								objectRadius = ogc.figure.all[object].collision.collider;
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
								return (ogc_temporal_figure.distance(object)<=radius+objectRadius);
							}
						},
						add: (title, object, method, radius, objectRadius)=>{
							let ogc_temporal_collision = {
								title: title,
								object: object,
								radius: radius,
								objectRadius: objectRadius,
								method: method,
							};
							if (radius==undefined) {
								ogc_temporal_collision.radius = ogc_temporal_figure.collision.collider;
							}
							if (objectRadius==undefined) {
								ogc_temporal_collision.objectRadius = ogc.figure.all[object].collision.collider;
							}
							if (title==undefined || object==undefined) {
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
					message: {
						send: (keyword, data)=>{
							if (ogc.message[keyword]==undefined) {
								ogc.message[keyword] = [];
							}
							for (let i of ogc.message[keyword]) {
								i.method({
									data: data,
									sender: ogc_temporal_figure,
								}, ogc.figure.all[i.figure]);
							}
							return ogc.message[keyword];
						},
						on: (keyword, method)=>{
							if (ogc.message[keyword]==undefined) {
								ogc.message[keyword] = [];
							}
							let ogc_temporal_config = {
								figure: name,
								method: method,
							};
							ogc.message[keyword].push(ogc_temporal_config);
							return ogc.message[keyword];
						},
					},
					update: ()=>{
						ogc_temporal_figure.element.style.top = (ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y-Math.round(ogc_temporal_figure.size.height/2))+"px";
						ogc_temporal_figure.element.style.left = (ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x-Math.round(ogc_temporal_figure.size.width/2))+"px";
						ogc_temporal_figure.element.style.rotate = ogc_temporal_figure.rotation + "deg";
						ogc_temporal_figure.element.width = ogc_temporal_figure.size.width;
						ogc_temporal_figure.element.height = ogc_temporal_figure.size.height;
						if  (ogc_temporal_figure.costumes.list.length>0) {
							if (ogc_temporal_figure.element.src!==ogc_temporal_figure.costumes.list[ogc_temporal_figure.costumes.actual]) {
								ogc_temporal_figure.element.src = ogc_temporal_figure.costumes.list[ogc_temporal_figure.costumes.actual];
							}
						}
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
							if (ogc_temporal_figure.collision.withObject(i.object, i.radius, i.objectRadius)) {
								i.method();
							}
						}
						return ogc_temporal_figure;
					},
					remove: ()=>{
						ogc_temporal_figure.gravity.disable();
						for (let i of ogc_temporal_figure.event.list) {
							ogc_temporal_figure.event.remove(i.title);
						}
						ogc.stage.element.removeChild(ogc_temporal_figure.element);
						delete ogc.figure.all[name];
						return ogc.figure.all;
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
			templates: {
				player: (name, costume)=>{
					let ogc_temporal_figure = ogc.figure.create(name, costume);
					ogc_temporal_figure.template = {
						type: "player",
						keys: {
							up: "w",
							down: "s",
							left: "a",
							right: "d",
						},
						length: 10,
						walk: (event)=>{
							for (let i in ogc_temporal_figure.template.keys) {
								if (event.key===ogc_temporal_figure.template.keys[i]) {
									ogc_temporal_figure.move(i, ogc_temporal_figure.template.length);
								}
							}
							return ogc_temporal_figure.position;
						},
						coreRemove: ogc_temporal_figure.remove,
					};
					ogc_temporal_figure.remove = ()=>{
						document.removeEventListener("keypress", (event)=>{
							ogc_temporal_figure.template.walk(event);
						});
						ogc_temporal_figure.template.coreRemove();
					};
					document.addEventListener("keypress", (event)=>{
						ogc_temporal_figure.template.walk(event);
					});
					return ogc_temporal_figure;
				},
				jumpNRunPlayer: (name, costume)=>{
					let ogc_temporal_figure = ogc.figure.create(name, costume);
					ogc_temporal_figure.template = {
						type: "jumpNRunPlayer",
						keys: {
							jump: " ",
							left: "a",
							right: "d",
						},
						length: 10,
						weight: 1,
						movement: (event)=>{
							if (event.key===ogc_temporal_figure.template.keys.jump) {
								if (ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y+(ogc_temporal_figure.size.height/2)>=ogc.stage.size.height) {
									ogc_temporal_figure.move("up", (ogc.stage.size.height/2)-ogc.stage.gravity*ogc_temporal_figure.gravity.weight);
								}
							} else {
								for (let i in ogc_temporal_figure.template.keys) {
									if (event.key===ogc_temporal_figure.template.keys[i]) {
										ogc_temporal_figure.move(i, ogc_temporal_figure.template.length);
									}
								}
							}
							return ogc_temporal_figure.position;
						},
						coreRemove: ogc_temporal_figure.remove,
					};
					ogc_temporal_figure.remove = ()=>{
						document.removeEventListener("keypress", (event)=>{
							ogc_temporal_figure.template.movement(event);
						});
						ogc_temporal_figure.gravity.disable();
						ogc_temporal_figure.template.coreRemove();
					};
					document.addEventListener("keypress", (event)=>{
						ogc_temporal_figure.template.movement(event);
					});
					ogc_temporal_figure.gravity.enable(ogc_temporal_figure.template.weight);
					return ogc_temporal_figure;
				},
				variableDisplay: (name, referenceVariable)=>{
					let ogc_temporal_figure = ogc.figure.create(name, []);
					ogc_temporal_figure.template = {
						type: "variableDisplay",
						referenceVariable: referenceVariable,
						coreRemove: ogc_temporal_figure.remove,
					};
					ogc_temporal_figure.remove = ()=>{
						ogc_temporal_figure.template.coreRemove();
					};
					ogc_temporal_figure.costumeUpdate = ()=>{
						ogc_temporal_figure.element.style.top = (ogc.stage.toPixel(0, ogc_temporal_figure.position.y).y-Math.round(ogc_temporal_figure.size.height/2))+"px";
						ogc_temporal_figure.element.style.left = (ogc.stage.toPixel(ogc_temporal_figure.position.x, 0).x-Math.round(ogc_temporal_figure.size.width/2))+"px";
						ogc_temporal_figure.element.style.rotate = ogc_temporal_figure.rotation + "deg";
						ogc_temporal_figure.element.width = ogc_temporal_figure.size.width;
						ogc_temporal_figure.element.height = ogc_temporal_figure.size.height;
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
					};
					ogc.stage.element.removeChild(ogc_temporal_figure.element);
					ogc_temporal_figure.element = ogc.stage.element.appendChild(document.createElement("div"));
					ogc_temporal_figure.element.style.position = "absolute";
					ogc_temporal_figure.display = ogc_temporal_figure.element.appendChild(document.createElement("input"));
					ogc_temporal_figure.display.readOnly = true;
					ogc_temporal_figure.display.value = ogc.variables.storage[ogc_temporal_figure.template.referenceVariable].value;
					ogc_temporal_figure.costumeUpdate();
					ogc.variables.storage[ogc_temporal_figure.template.referenceVariable].display.push(name);
					return ogc_temporal_figure;
				},
			},
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
		ogc.storage = {
			sessionStorage: {
				add: (key, value, override)=>{
					if (override===false && sessionStorage[key]!==undefined) {
						throw new Error("key '"+key+"' already exists in sessionStorage");
					}
					let ogc_temporal_storage = {value: value};
					sessionStorage.setItem(key, JSON.stringify(ogc_temporal_storage));
					return sessionStorage;
				},
				read: (key)=>{
					if (sessionStorage[key]==undefined) {
						throw new Error("key '"+key+"' does not exist in sessionStorage");
					}
					return JSON.parse(sessionStorage.getItem(key)).value;
				},
				remove: (key)=>{
					if (sessionStorage[key]==undefined) {
						throw new Error("key '"+key+"' does not exist in sessionStorage");
					}
					sessionStorage.removeItem(key);
					return sessionStorage;
				},
				list: ()=>{
					let ogc_temporal_list = [];
					for (let i in sessionStorage) {
						if (i==="length" || i==="getItem" || i==="setItem" || i==="removeItem" || i==="clear" || i==="key") {
							continue;
						}
						ogc_temporal_list.push({key: i, value: JSON.parse(sessionStorage[i]).value,});
					}
					return ogc_temporal_list;
				},
				clear: ()=>{
					sessionStorage.clear();
					return sessionStorage;
				},
			},
			localStorage: {
				add: (key, value, override)=>{
					if (override===false && localStorage[key]!==undefined) {
						throw new Error("key '"+key+"' already exists in localStorage");
					}
					let ogc_temporal_storage = {value: value};
					localStorage.setItem(key, JSON.stringify(ogc_temporal_storage));
					return localStorage;
				},
				read: (key)=>{
					if (localStorage[key]==undefined) {
						throw new Error("key '"+key+"' does not exist in localStorage");
					}
					return JSON.parse(localStorage.getItem(key)).value;
				},
				remove: (key)=>{
					if (localStorage[key]==undefined) {
						throw new Error("key '"+key+"' does not exist in localStorage");
					}
					localStorage.removeItem(key);
					return localStorage;
				},
				list: ()=>{
					let ogc_temporal_list = [];
					for (let i in localStorage) {
						if (i==="length" || i==="getItem" || i==="setItem" || i==="removeItem" || i==="clear" || i==="key") {
							continue;
						}
						ogc_temporal_list.push({key: i, value: JSON.parse(localStorage[i]).value,});
					}
					return ogc_temporal_list;
				},
				clear: ()=>{
					localStorage.clear();
					return localStorage;
				},
			},
		};
		ogc.variables = {
			storage: {},
			set: (key, value, override)=>{
				let ogc_temporal_audio = {
					value: value,
					display: [],
				};
				if (ogc.variables.storage[key]!==undefined && override===false) {
					throw new Error("variable '"+key+"' already exists");
				} else if (ogc.variables.storage[key]==undefined) {
					ogc.variables.storage[key] = ogc_temporal_audio;
				}
				ogc.variables.storage[key].value = value;
				for (let i of ogc.variables.storage[key].display) {
					ogc.figure.all[i].display.value = ogc.variables.storage[key].value;
				}
				return ogc.variables.storage[key].value;
			},
			get: (key)=>{
				return ogc.variables.storage[key].value;
			},
			remove: (key)=>{
				delete ogc.variables.storage[key];
				return ogc.variables.storage;
			},
			clear: ()=>{
				for (let i in ogc.variables.storage) {
					delete ogc.variables.storage[i];
				}
				return ogc.variables.storage;
			},
		};
		ogc.message = {};
		return ogc;
	},
	quit: ()=>{
		for (let i in ogc.figure.all) {
			ogc.figure.all[i].remove();
		}
		while (ogc.stage.event.list.length>0) {
			ogc.stage.event.remove(ogc.stage.event.list[0].title);
		}
		ogc.stage.parent.removeChild(ogc.stage.element);
		for (let i in ogc) {
			if (i!=="init" && i!=="quit") {
				delete ogc[i];
			}
		}
		return ogc;
	},
};