document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'zh';

    langToggle.addEventListener('click', function() {
        const zhElements = document.querySelectorAll('.zh');
        const enElements = document.querySelectorAll('.en');
        
        if (currentLang === 'zh') {
            zhElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            langToggle.textContent = '中';
            currentLang = 'en';
        } else {
            zhElements.forEach(el => el.classList.remove('hidden'));
            enElements.forEach(el => el.classList.add('hidden'));
            langToggle.textContent = 'EN';
            currentLang = 'zh';
        }
    });

    // 导航栏激活状态
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 更新导航栏激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应部分
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 搜索功能
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" class="search-box" placeholder="搜索内容...">
    `;
    document.body.appendChild(searchContainer);

    const searchBox = document.querySelector('.search-box');
    const allTextElements = document.querySelectorAll('p, h1, h2, h3');

    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        allTextElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                // 滚动到匹配的元素
                if (searchTerm.length > 2) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                element.style.backgroundColor = '';
            }
        });
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

    // 标签页切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加新的活动状态
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 横向时间轴进度更新
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const progressLine = document.querySelector('.progress-line');
    let currentProgress = 0;

    timelinePoints.forEach((point, index) => {
        point.addEventListener('mouseenter', () => {
            const progress = (index / (timelinePoints.length - 1)) * 100;
            progressLine.style.width = `${progress}%`;
        });

        point.addEventListener('mouseleave', () => {
            progressLine.style.width = `${currentProgress}%`;
        });

        point.addEventListener('click', () => {
            currentProgress = (index / (timelinePoints.length - 1)) * 100;
            progressLine.style.width = `${currentProgress}%`;
            
            // 为所有点重置样式
            timelinePoints.forEach(p => p.querySelector('.point-dot').style.background = 'white');
            
            // 为当前及之前的点添加完成样式
            for (let i = 0; i <= index; i++) {
                timelinePoints[i].querySelector('.point-dot').style.background = 'var(--secondary-color)';
            }
        });
    });
}); 