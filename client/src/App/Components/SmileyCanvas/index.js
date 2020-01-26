import React, { useEffect } from 'react';

export default function SmileyCanvas() {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 70;
        const eyeRadius = 10;
        const eyeXOffset = 25;
        const eyeYOffset = 20;

        // draw the yellow circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();

        // draw the eyes
        context.beginPath();
        var eyeX = centerX - eyeXOffset;
        const eyeY = centerY - eyeXOffset;
        context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
        var eyeX = centerX + eyeXOffset;
        context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();

        // draw the mouth
        context.beginPath();
        context.arc(centerX, centerY, 50, 0, Math.PI, false);
        context.stroke();
    }, []);

    return (
        <canvas id="canvas" width="150" height="150" />
    );
}