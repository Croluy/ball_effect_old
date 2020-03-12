var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c=canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 40;

var colorArray = ["#00374C", "#009BD8", "#00658C", "#006E99", "#005272"];

window.addEventListener('mousemove', function (evt) {
    mouse.x = evt.x;
    mouse.y = evt.y;
});

window.addEventListener('resize',function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function Circle(x, y, vel_x, vel_y, radius) {
    this.x = x;
    this.y = y;
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vel_x = -this.vel_x;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vel_y = -this.vel_y;
        }

        this.x += this.vel_x;
        this.y += this.vel_y;

        //activity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50     &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.radius < maxRadius){
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    };
}

var cirlceArray = [];
function init() {
    cirlceArray = [];
    for (var i=0; i<3000; i++){
        var radius = Math.random() *3 +1;
        var x = Math.random() * (innerWidth - radius*2) + radius;
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var vel_x = (Math.random() - 0.5) * 3 ;
        var vel_y = (Math.random() - 0.5) * 3;
        cirlceArray.push(new Circle(x, y, vel_x, vel_y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);

    for (var i=0; i<cirlceArray.length; i++){
        cirlceArray[i].update();
    }
}

init();
animate();