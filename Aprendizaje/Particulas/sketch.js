let particles = [];
const N = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  for (let i = 0; i < N; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(230, 40, 8, 0.15); // fondo con transparencia = rastro

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      if (d < 60) {
        stroke(270, 60, 100, (1 - d / 60) * 0.5);
        line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      }
    }
  }

  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(2, 5);
    this.life = random(150, 255);
    this.hue = random(180, 300);
  }

  update() {
    // atracción al mouse
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let d = sqrt(dx * dx + dy * dy);
    if (d < 150 && d > 0) {
      this.vx += (dx / d) * 0.3;
      this.vy += (dy / d) * 0.3;
    }

    this.vx *= 0.96; // fricción
    this.vy *= 0.96;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.5;

    if (this.life < 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  show() {
    noStroke();
    fill(this.hue, 80, 100, this.life / 255);
    ellipse(this.x, this.y, this.size);
  }
}