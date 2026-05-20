let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(220, 40, 10);

  let numWaves = 8;
  // mouseX controla frecuencia, mouseY controla amplitud
  let freq = map(mouseX, 0, width, 1, 5);
  let amp  = map(mouseY, 0, height, 10, 80);

  noFill();
  strokeWeight(1.5);

  for (let w = 0; w < numWaves; w++) {
    let hue   = map(w, 0, numWaves, 180, 320);
    let yBase = map(w, 0, numWaves - 1, height * 0.2, height * 0.8);
    let offset = w * 0.4; // desfase entre ondas

    stroke(hue, 80, 100, 0.7);
    beginShape();
    for (let x = 0; x <= width; x += 3) {
      let angle = (x / width) * TWO_PI * freq;
      let y = yBase + sin(angle + t + offset) * amp;
      curveVertex(x, y);
    }
    endShape();
  }

  t += 0.07; // velocidad de animación
}