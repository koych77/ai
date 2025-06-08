const canvas = document.getElementById('thoughtCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let nodes = [];
let score = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Node {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.radius = 35;
        this.children = [];
    }
}

function drawNode(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 128, 255, 0.7)';
    ctx.fill();
    ctx.strokeStyle = '#00f';
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px Arial';
    ctx.fillText(node.text, node.x, node.y);
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    for (const node of nodes) {
        drawNode(node);
        for (const child of node.children) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(child.x, child.y);
            ctx.strokeStyle = 'rgba(0, 128, 255, 0.4)';
            ctx.stroke();
        }
    }
    requestAnimationFrame(draw);
}

canvas.addEventListener('click', function (evt) {
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    for (const node of nodes) {
        const dx = x - node.x;
        const dy = y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius) {
            expandNode(node);
            break;
        }
    }
});

function expandNode(node) {
    const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    for (let a of angles) {
        const distance = 120;
        const nx = node.x + Math.cos(a) * distance;
        const ny = node.y + Math.sin(a) * distance;
        if (!nodes.some(n => Math.hypot(n.x - nx, n.y - ny) < n.radius * 2)) {
            const thought = randomThought();
            const child = new Node(nx, ny, thought);
            node.children.push(child);
            nodes.push(child);
            score += 1;
            document.getElementById('score').textContent = score;
        }
    }
}

function randomThought() {
    const thoughts = [
        'Что если?',
        'Интересно...',
        'Проверить!',
        'Новое решение',
        'Продолжим',
        'Вот идея',
        'Круто!',
        'Вызов принят',
        'Еще шаг'
    ];
    return thoughts[Math.floor(Math.random() * thoughts.length)];
}

function init() {
    nodes = [new Node(width / 2, height / 2, 'Начало')];
    draw();
}

init();
