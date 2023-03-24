function setBackground(bgID){
    const canvas = document.getElementById(bgID);
    const context = canvas.getContext('2d');
    let stars = [];
    const starCount = 800;
    const tau = Math.PI * 2.0;
    const step = 1000.0 / 60.0;

    let img = new Image();
    img.src = 'resources/lam.png';

    for (i = 0; i < starCount; i++) {
        stars[i] = {}; randomizeStar(stars[i], true);
    }
    updateStars();
    setInterval(updateStars, step);
    function randomizeStar(star, justSpawned) {
        let a = Math.random() * tau;
        let s = Math.random() * 0.000005 + 0.00000001;

        star.x = Math.random();
        star.y = Math.random();
        star.r = Math.random() * 2.0 + 0.5;
        star.z = Math.tan(a) * s;
        star.w = Math.tan(a) * s;
        star.l = (Math.random() * 6.0 + 1.0) * 1000.0;
        star.a = justSpawned ? Math.random() * star.l : 0.0;
    }

    function updateStars() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img,window.innerWidth / 4, 30, window.innerWidth / 2, window.innerWidth / 2);
        for (i = 0; i < starCount; i++) {
            const star = stars[i];
            star.x += star.z * step;
            star.y += star.w * step;
            star.a += step;
            if (star.a >= star.l) randomizeStar(star, false);
            context.beginPath();
            context.fillStyle = 'white';
            context.globalAlpha = 1.0 - Math.abs((star.a / star.l - 0.5) * 2.0);
            context.arc(star.x * canvas.width, star.y * canvas.width, star.r, 0.0, tau, false);
            context.closePath();
            context.fill();
        }
        context.globalAlpha = 0.1;
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
setBackground("page-background")