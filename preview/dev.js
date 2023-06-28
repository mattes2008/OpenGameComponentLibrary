import ogc from "../src/ogc.js"
window.ogc = ogc;

ogc.init(document.body);

let {stage, figure} = ogc;
window.stage = stage;
window.figure = figure;

stage.resize(1000, 1000);
figure.create("test", ["../storage/red.png", "../storage/blue.png", "../storage/green.png"]);
figure.all.test.prototype.initialize("jumpNRunPlayer");
stage.gravity = 3.6;
