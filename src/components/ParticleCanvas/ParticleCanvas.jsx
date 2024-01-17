function ParticleAnimation() {
    var ctx;
    var cW;
    var cH;

    var raindrops;

    var rainStrength = 1;

    function initCanvas() {
        ctx = document.getElementById("particleCanvas").getContext("2d");

        ctx.canvas.width = window.innerWidth; 
        ctx.canvas.height = window.innerHeight;

        cW = ctx.canvas.width;
        cH = ctx.canvas.height;
    }

    function Raindrops() {
        this.drops = [];
        this.splashes = [];
    }

    Raindrops.prototype.addDrop = function () {
        if (this.drops.length < 150) {
            var drop = {
                x: Math.random() * cW,
                y: 0,
                width: (Math.random() * 3) / 3,
                height: (Math.random() * 8),
                speed: (Math.random() * 1) + 1,
                life: 120
            };

            this.drops.push(drop);
        }
    };

    Raindrops.prototype.render = function () {
        for (var i = 0; i < rainStrength; i++) {
            this.addDrop();
        }

        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        ctx.fillStyle = 'rgba(2, 214, 136)';

        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < this.drops.length; i++) {
            var drop = this.drops[i];
            var gradientStartY = drop.y;
            var gradientEndY = drop.y + drop.height + 50;

            var gradient = ctx.createLinearGradient(drop.x, gradientStartY, drop.x, gradientEndY);
            gradient.addColorStop(0, 'rgba(2, 214, 136, 1)');
            gradient.addColorStop(1, 'rgba(2, 214, 136, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(drop.x, drop.y - drop.height, drop.width, gradientEndY - gradientStartY);
            drop.y += drop.speed * 2;

            if (drop.y + drop.height > cH) {
                this.splashes.push(drop);
                this.drops.splice(i, 1);
            }
        }

        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < this.splashes.length; i++) {
            var splash = this.splashes[i];
            ctx.fillRect(splash.x, splash.y, splash.width / 3, splash.height / 3);

            splash.y -= splash.speed / 6;
            splash.life--;
            splash.x += 0.15 * splash.speed;

            if (splash.life <= 0) {
                this.splashes.splice(i, 1);
            }
        }

        ctx.restore();
    };

    function init() {
        raindrops = new Raindrops();
        loop();
    }

    function render() {
        raindrops.render();
    }

    function loop() {
        requestAnimationFrame(loop);
        render();
        document.getElementById("status1").innerHTML = 'Particle Count: ' + (raindrops.drops.length + raindrops.splashes.length);
    }

    window.addEventListener('load', function () {
        initCanvas();
        init();
    });
}

export default ParticleAnimation;
