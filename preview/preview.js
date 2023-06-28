import ogc from "../src/ogc.js"
window.ogc = ogc;

ogc.init(document.body);
ogc.stage.resize(1000, 1000);
ogc.figure.create("test", ["../storage/red.png", "../storage/blue.png", "../storage/green.png"]);
ogc.figure.create("test2", ["../storage/blue.png", "../storage/green.png"]);
ogc.figure.all.test.collision.add("test", "test2", 25, ()=>alert("test2"));
ogc.figure.all.test.collision.add("test2", "edge", 25, ()=>alert("edge"));