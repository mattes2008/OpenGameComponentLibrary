import ogc from "../src/ogc.js"
window.ogc = ogc;

ogc.init(document.body);

let {stage, figure} = ogc;
window.stage = stage;
window.figure = figure;

stage.resize(1000, 1000);
figure.create("test", ["../storage/red.png", "../storage/blue.png", "../storage/green.png"]);
figure.create("test2", ["../storage/blue.png", "../storage/green.png"]);
figure.all.test.event.add("click", ()=>alert("test2"), "test");