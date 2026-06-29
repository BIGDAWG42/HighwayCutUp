// Highway Velocity - Developed by Anthony F

// Dynamic Traffic AI Simulation
const canvas = document.getElementById('traffic-canvas');
const ctx = canvas.getContext('2d');

let cars = [];
const lanes = [200, 350, 500, 650, 800]; // 5 lanes

class Car {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = lanes[Math.floor(Math.random() * lanes.length)];
        this.y = Math.random() * -800 - 100;
        this.speed = 3 + Math.random() * 4;
        this.width = 40;
        this.height = 80;
        this.color = ['#ff0000', '#00ff00', '#ffff00', '#00ffff', '#ff00ff'][Math.floor(Math.random()*5)];
        this.laneChangeCooldown = 0;
    }
    update() {
        this.y += this.speed;
        this.laneChangeCooldown--;
        
        // Occasional lane change (AI behavior)
        if (this.laneChangeCooldown <= 0 && Math.random() < 0.02) {
            const currentLaneIndex = lanes.indexOf(this.x);
            if (currentLaneIndex > 0 && Math.random() < 0.5) this.x = lanes[currentLaneIndex - 1];
            else if (currentLaneIndex < lanes.length - 1) this.x = lanes[currentLaneIndex + 1];
            this.laneChangeCooldown = 60;
        }
        
        if (this.y > canvas.height + 100) this.reset();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
        
        // Headlights
        ctx.fillStyle = '#ffff88';
        ctx.fillRect(this.x - this.width/2 + 5, this.y + 10, 8, 15);
        ctx.fillRect(this.x + this.width/2 - 13, this.y + 10, 8, 15);
    }
}

// Initialize traffic
function initTraffic() {
    cars = [];
    for (let i = 0; i < 18; i++) {
        const car = new Car();
        car.y = Math.random() * canvas.height;
        cars.push(car);
    }
}

function animateTraffic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Road overlay
    ctx.fillStyle = 'rgba(20, 20, 40, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    cars.forEach(car => {
        car.update();
        car.draw();
    });
    
    requestAnimationFrame(animateTraffic);
}

// Original road animation + init traffic
const roadLines = document.querySelector('.road-lines');
let roadPosition = 0;

function animateRoad() {
    roadPosition += 3;
    if (roadPosition >= 60) roadPosition = 0;
    if (roadLines) roadLines.style.transform = `translateY(${roadPosition}px)`;
    requestAnimationFrame(animateRoad);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTraffic();
    animateTraffic();
    animateRoad();
    
    // ... existing counter and button code ...
    setTimeout(() => {
        animateCounter(document.getElementById('drivers-count'), 0, 124567, 2000);
        animateCounter(document.getElementById('runs-completed'), 0, 2456789, 2000);
        animateCounter(document.getElementById('highest-score'), 0, 124567, 2000);
        animateCounter(document.getElementById('miles-driven'), 0, 1245678, 2000);
    }, 500);
});

// Button hover effects (unchanged)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 20px rgba(0, 243, 255, 0.4)';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.3)';
    });
});