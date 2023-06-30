window.ogc = ogc;

ogc.init(document.body);

let {stage, figure} = ogc;
window.stage = stage;
window.figure = figure;

figure.create("test", ["../storage/red.png"]);
figure.all.test.prototype.initialize("jumpNRunPlayer");
stage.resize(500, 250);