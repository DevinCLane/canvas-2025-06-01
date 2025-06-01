/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setCanvasToWindow(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasToWindow(canvas);

window.addEventListener("resize", () => {
    setCanvasToWindow(canvas);
    effect.handleParticles(ctx);
});

// clear canvas button
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.particles.length = 0;
});

class Particle {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 40 + 5;
        this.x =
            this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y =
            this.radius +
            Math.random() * (this.effect.height - this.radius * 2);
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.fillStyle = `oklch(70% 0.1 ${this.x})`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    update() {
        this.x++;
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 20;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }

    handleParticles(context) {
        for (const particle of this.particles) {
            particle.draw(context);
            particle.update();
        }
    }
}

const effect = new Effect(canvas);
function animate() {
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();
