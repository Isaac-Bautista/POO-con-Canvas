// Ejecutar el script solo después de cargar el contenido de la página
window.onload = function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    const window_height = window.innerHeight;
    const window_width = window.innerWidth;

    canvas.height = window_height;
    canvas.width = window_width;

    canvas.style.background = '#ff8';

    class Circle {
        constructor(x, y, radius, color, text) {
            this.posX = x;
            this.posY = y;
            this.radius = radius;
            this.color = color;
            this.text = text;
        }

        draw(context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = 2;

            // Dibujar el círculo
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.stroke();

            // Configurar propiedades para el texto
            context.fillStyle = 'black';
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = `${this.radius / 2}px Arial`;

            // Dibujar el texto en el centro del círculo
            context.fillText(this.text, this.posX, this.posY);
        }

        // Método para comprobar si este círculo se superpone con otro círculo
        intersects(other) {
            const dx = this.posX - other.posX;
            const dy = this.posY - other.posY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.radius + other.radius;
        }
    }

    const arrayCircle = [];
    const numCircles = 10;

    for (let i = 0; i < numCircles; i++) {
        let randomX, randomY, randomRadius, randomText;
        let isOverlapping;

        do {
            randomX = Math.random() * window_width;
            randomY = Math.random() * window_height;

            // Establecer un radio mínimo de 20 para que los círculos no sean demasiado pequeños
            randomRadius = Math.floor(Math.random() * (80)) + 20;

            randomText = Math.floor(Math.random() * 10) + 1;

            const newCircle = new Circle(randomX, randomY, randomRadius, 'blue', randomText.toString());

            // Verificar si el nuevo círculo se superpone con algún otro círculo
            isOverlapping = arrayCircle.some(circle => newCircle.intersects(circle));

            // Si no se superpone, añadimos el círculo al array y lo dibujamos
            if (!isOverlapping) {
                arrayCircle.push(newCircle);
                newCircle.draw(ctx);
            }
        } while (isOverlapping);
    }
};
