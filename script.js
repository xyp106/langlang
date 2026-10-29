// 水墨粒子效果
class InkParticles {
    constructor() {
        this.canvas = document.getElementById('ink-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 50;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '#8b6b47' : '#d9b38c'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 导航功能
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // 汉堡菜单切换
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }

        // 导航链接点击
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.setActiveLink(link);
                this.closeMobileMenu();
            });
        });

        // 滚动时导航栏效果
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.boxShadow = 'none';
            }
        });

        // 初始化当前页面高亮
        this.setCurrentPageActive();
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    setCurrentPageActive() {
        const currentPath = window.location.pathname.split('/').pop();
        const currentLink = Array.from(this.navLinks).find(link => {
            const href = link.getAttribute('href');
            return href === currentPath || (currentPath === '' && href === 'index.html');
        });

        if (currentLink) {
            this.setActiveLink(currentLink);
        }
    }

    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
    }
}

// 卡片悬停效果
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.character-card, .preview-card, .team-member, .interaction-card, .philosophy-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handleMouseLeave(e, card) {
        card.style.transform = '';
    }
}

// 滚动淡入动画
class ScrollFadeIn {
    constructor() {
        this.elements = document.querySelectorAll('.character-card, .preview-card, .team-member, .interaction-card, .philosophy-card, .timeline-content');
        this.init();
    }

    init() {
        this.checkVisibility();

        window.addEventListener('scroll', () => this.checkVisibility());
    }

    checkVisibility() {
        const triggerBottom = window.innerHeight * 0.8;

        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('fade-in');
            }
        });
    }
}

// 轮播图功能
class GalleryCarousel {
    constructor() {
        this.track = document.getElementById('gallery-track');
        this.slides = document.querySelectorAll('.gallery-slide');
        this.prevBtn = document.getElementById('gallery-prev');
        this.nextBtn = document.getElementById('gallery-next');
        this.indicators = document.querySelectorAll('.indicator');

        this.currentIndex = 0;
        this.slideCount = this.slides.length;

        this.init();
    }

    init() {
        if (!this.track || !this.slides.length) return;

        // 绑定事件
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // 指示器点击
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // 自动播放
        setInterval(() => this.nextSlide(), 5000);
    }

    updateSlide() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // 更新指示器
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }
}

// 分类过滤功能
class CharacterFilter {
    constructor() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.cards = document.querySelectorAll('.character-card');

        this.init();
    }

    init() {
        if (!this.tabs.length || !this.cards.length) return;

        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.filter;
                this.filterCards(filter);
                this.setActiveTab(tab);
            });
        });
    }

    filterCards(filter) {
        this.cards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setActiveTab(activeTab) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
}

// 表单验证
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // 简单的验证
        if (this.validateForm(data)) {
            alert('感谢您的留言！我们会尽快回复您。');
            this.form.reset();
        }
    }

    validateForm(data) {
        if (!data.name.trim()) {
            alert('请输入您的姓名');
            return false;
        }

        if (!data.email.trim() || !this.isValidEmail(data.email)) {
            alert('请输入有效的邮箱地址');
            return false;
        }

        if (!data.subject.trim()) {
            alert('请输入主题');
            return false;
        }

        if (!data.message.trim()) {
            alert('请输入留言内容');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各个模块
    new InkParticles();
    new Navigation();
    new CardTilt();
    new ScrollFadeIn();
    new GalleryCarousel();
    new CharacterFilter();
    new ContactForm();

    // 添加页面加载动画
    document.body.classList.add('loaded');

    // 统计条动画
    const statBars = document.querySelectorAll('.stat-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    });

    statBars.forEach(bar => observer.observe(bar));
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 按钮悬停音效（如果需要的话）
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // 这里可以添加音效或其他效果
        });
    });

    // 图片懒加载
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // 触发加载
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

