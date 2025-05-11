document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时Header样式变化
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    function toggleHeaderStyle() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', toggleHeaderStyle);
    toggleHeaderStyle();

    // 添加滚动动画
    const animElements = document.querySelectorAll('.challenge-card, .layer, .feature, .cycle-step, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    });
    
    animElements.forEach(element => {
        element.classList.add('anim-ready');
        observer.observe(element);
    });

    // 系统架构图交互效果
    const diagramPlaceholder = document.querySelector('.diagram-placeholder');
    if (diagramPlaceholder) {
        createArchitectureDiagram(diagramPlaceholder);
    }

    // 模拟网络可视化效果
    const networkVisualization = document.querySelector('.network-visualization');
    if (networkVisualization) {
        createNetworkVisualization(networkVisualization);
    }
    
    // 创建AI粒子效果
    const aiParticles = document.querySelector('.ai-particles');
    if (aiParticles) {
        createAIParticles(aiParticles);
    }
    
    // 为卡片添加动态效果
    addCardsInteraction();
    
    // 移动端导航菜单功能
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // 点击导航链接后关闭菜单
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-links') && 
                !event.target.closest('.mobile-menu-toggle') && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
});

// 创建系统架构图视觉效果
function createArchitectureDiagram(container) {
    // 检测当前语言
    const isEnglish = document.documentElement.lang === 'en';
    
    // 架构层级 - 根据语言选择
    const layers = isEnglish ? [
        { name: "Blockchain & Smart Contract Layer", color: "#7c3aed", y: 320 },
        { name: "A2A (Agent to Agent) Protocol Layer", color: "#4f46e5", y: 250 },
        { name: "MCP (Model Context Protocol) Layer", color: "#2563eb", y: 180 },
        { name: "Agent Entity Layer", color: "#10b981", y: 110 },
        { name: "P2P Network Layer", color: "#f59e0b", y: 40 }
    ] : [
        { name: "区块链与智能合约层", color: "#7c3aed", y: 320 },
        { name: "A2A (Agent to Agent)协议层", color: "#4f46e5", y: 250 },
        { name: "MCP (模型上下文协议)层", color: "#2563eb", y: 180 },
        { name: "智能体层", color: "#10b981", y: 110 },
        { name: "P2P网络层", color: "#f59e0b", y: 40 }
    ];
    
    // 创建SVG元素
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    
    // 添加每一层
    layers.forEach(layer => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", "10%");
        rect.setAttribute("y", layer.y);
        rect.setAttribute("width", "80%");
        rect.setAttribute("height", "40");
        rect.setAttribute("rx", "5");
        rect.setAttribute("fill", `${layer.color}20`);
        rect.setAttribute("stroke", layer.color);
        rect.setAttribute("stroke-width", "2");
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "50%");
        text.setAttribute("y", layer.y + 25);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", layer.color);
        text.setAttribute("font-weight", "bold");
        text.textContent = layer.name;
        
        svg.appendChild(rect);
        svg.appendChild(text);
    });
    
    // 添加连接线
    for (let i = 0; i < layers.length - 1; i++) {
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "30%");
        line1.setAttribute("y1", layers[i].y);
        line1.setAttribute("x2", "30%");
        line1.setAttribute("y2", layers[i+1].y + 40);
        line1.setAttribute("stroke", `${layers[i].color}80`);
        line1.setAttribute("stroke-width", "1.5");
        line1.setAttribute("stroke-dasharray", "4");
        
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "70%");
        line2.setAttribute("y1", layers[i].y);
        line2.setAttribute("x2", "70%");
        line2.setAttribute("y2", layers[i+1].y + 40);
        line2.setAttribute("stroke", `${layers[i].color}80`);
        line2.setAttribute("stroke-width", "1.5");
        line2.setAttribute("stroke-dasharray", "4");
        
        svg.appendChild(line1);
        svg.appendChild(line2);
    }
    
    // 添加动态数据流效果
    for (let i = 0; i < layers.length - 1; i++) {
        createDataFlow(svg, "30%", layers[i].y, "30%", layers[i+1].y + 40, layers[i].color);
        createDataFlow(svg, "70%", layers[i].y, "70%", layers[i+1].y + 40, layers[i].color);
    }
    
    container.appendChild(svg);
}

// 创建数据流动画效果
function createDataFlow(svg, x1, y1, x2, y2, color) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", color);
    circle.setAttribute("opacity", "0.8");
    
    // 添加动画
    const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    animateMotion.setAttribute("dur", `${2 + Math.random() * 2}s`);
    animateMotion.setAttribute("repeatCount", "indefinite");
    animateMotion.setAttribute("path", `M ${x1} ${y1} L ${x2} ${y2}`);
    
    circle.appendChild(animateMotion);
    svg.appendChild(circle);
}

// 创建网络可视化效果
function createNetworkVisualization(container) {
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 网络节点
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 2;
            this.speed = Math.random() * 0.5 + 0.2;
            this.directionX = Math.random() * 2 - 1;
            this.directionY = Math.random() * 2 - 1;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
            this.pulse = 0;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
        }
        
        update() {
            this.x += this.directionX * this.speed;
            this.y += this.directionY * this.speed;
            
            if (this.x < 0 || this.x > canvas.width) {
                this.directionX *= -1;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.directionY *= -1;
            }
            
            // 脉冲效果
            this.pulse += this.pulseSpeed;
            if (this.pulse > 1) {
                this.pulse = 0;
            }
        }
        
        draw() {
            // 主节点
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // 光环效果
            if (this.pulse > 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size + 10 * this.pulse, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - this.pulse)})`;
                ctx.stroke();
            }
        }
    }
    
    // 创建节点数组
    const nodes = [];
    for (let i = 0; i < 40; i++) {
        nodes.push(new Node());
    }
    
    // 绘制连接线
    function drawConnections() {
        const now = Date.now();
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i+1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    // 变色更明显
                    const t = (Math.sin(now/900 + i*0.9 + j*1.7) + 1) / 2;
                    const colorStops = [
                        [59,130,246],   // 蓝
                        [139,92,246],   // 紫
                        [6,182,212],    // 青
                        [251,146,60],   // 橙
                        [255,56,100],   // 红
                        [59,130,246]    // 蓝
                    ];
                    function lerp(a, b, t) { return a + (b-a)*t; }
                    const seg = Math.floor(t * (colorStops.length-1));
                    const localT = (t * (colorStops.length-1)) - seg;
                    const c1 = colorStops[seg];
                    const c2 = colorStops[(seg+1)%colorStops.length];
                    const r = Math.round(lerp(c1[0], c2[0], localT));
                    const g = Math.round(lerp(c1[1], c2[1], localT));
                    const b = Math.round(lerp(c1[2], c2[2], localT));
                    ctx.strokeStyle = `rgba(${r},${g},${b},${0.7 * (100-distance)/100})`;
                    ctx.lineWidth = 1.2;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawConnections();
        
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 处理窗口大小调整
    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// 创建AI粒子效果
function createAIParticles(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    canvas.width = container.offsetWidth || window.innerWidth;
    canvas.height = container.offsetHeight || window.innerHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // AI粒子
    class AIParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.5 + 0.2;
            this.velocity = {
                x: (Math.random() - 0.5) * this.speed,
                y: (Math.random() - 0.5) * this.speed
            };
            this.color = this.getRandomColor();
            this.alpha = Math.random() * 0.5 + 0.3;
            this.blinkSpeed = Math.random() * 0.02;
            this.blinkDirection = Math.random() > 0.5 ? 1 : -1;
        }
        
        getRandomColor() {
            const colors = [
                '124, 58, 237',   // Purple
                '37, 99, 235',    // Blue
                '6, 182, 212',    // Cyan
                '16, 185, 129'    // Green
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // 边界检查
            if (this.x < 0 || this.x > canvas.width) {
                this.velocity.x *= -1;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.velocity.y *= -1;
            }
            
            // 闪烁效果
            this.alpha += this.blinkSpeed * this.blinkDirection;
            if (this.alpha >= 0.8 || this.alpha <= 0.2) {
                this.blinkDirection *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
            
            // 光晕效果
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.3})`;
            ctx.fill();
        }
    }
    
    // 数字雨效果的垂直线
    class DigitalRainLine {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.length = Math.random() * 150 + 50;
            this.speed = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = this.getRandomColor();
        }
        
        getRandomColor() {
            const colors = [
                '124, 58, 237',   // Purple
                '37, 99, 235',    // Blue
                '6, 182, 212'     // Cyan
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.y += this.speed;
            
            if (this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y - this.length);
            
            // 创建渐变
            const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.length);
            gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // 创建粒子数组
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new AIParticle());
    }
    
    // 创建数字雨线数组
    const rainLines = [];
    for (let i = 0; i < 15; i++) {
        rainLines.push(new DigitalRainLine());
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制数字雨线
        rainLines.forEach(line => {
            line.update();
            line.draw();
        });
        
        // 绘制粒子
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 处理窗口大小调整
    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth || window.innerWidth;
        canvas.height = container.offsetHeight || window.innerHeight;
    });
}

// 为卡片添加动态交互效果
function addCardsInteraction() {
    const cards = document.querySelectorAll('.challenge-card, .feature, .layer');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 计算鼠标位置相对于卡片中心的百分比
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            // 3D倾斜效果（轻微）
            card.style.transform = `perspective(1000px) rotateX(${percentY * -2}deg) rotateY(${percentX * 2}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // 光效跟随鼠标
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.1) 0%,
                    rgba(255, 255, 255, 0) 50%
                ),
                var(--card-bg)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            card.style.background = '';
        });
    });
}

// 为动画元素添加CSS
const style = document.createElement('style');
style.textContent = `
    .anim-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    header.scrolled {
        padding: 0.5rem 0;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    /* 光标悬停卡片效果 */
    .challenge-card, .feature, .layer {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    }
    
    /* 文字高亮动画 */
    .highlight-text {
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--primary-color));
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 2s linear infinite;
    }
    
    @keyframes shine {
        to {
            background-position: 200% center;
        }
    }
`;
document.head.appendChild(style); 