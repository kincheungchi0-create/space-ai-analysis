document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Create Background Stars
    const starsContainer = document.getElementById('stars-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.opacity = Math.random();
        star.style.borderRadius = '50%';

        // Twinkle animation
        star.animate([
            { opacity: star.style.opacity },
            { opacity: 0.2 },
            { opacity: star.style.opacity }
        ], {
            duration: 2000 + Math.random() * 3000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });

        starsContainer.appendChild(star);
    }

    // Chart.js Visualization (Comparison Analysis)
    const ctx = document.getElementById('costChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1次性發射成本', '硬體固定成本 (5年)', '地表 5年電費', '運維費用 (5年)'],
            datasets: [{
                label: '5年預計支出 (十億美金)',
                data: [1, 4, 5, 0.5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(148, 163, 184, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(245, 158, 11, 0.6)'
                ],
                borderColor: [
                    '#3b82f6',
                    '#94a3b8',
                    '#ef4444',
                    '#f59e0b'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });

    // 5-Year TCO Cumulative Cost Line Chart
    const lineCtx = document.getElementById('tcoLineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['第0年', '第1年', '第2年', '第3年', '第4年', '第5年'],
            datasets: [
                {
                    label: '地表方案成本 (累積)',
                    data: [4.5, 5.5, 6.5, 7.5, 8.5, 9.5], // CapEx $4.5B + $1B/yr
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: '太空方案成本 (累積)',
                    data: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0], // 一次性 $5B (CapEx $4B + Launch $1B), 電費 $0
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#94a3b8', font: { size: 12 } }
                }
            },
            scales: {
                y: {
                    title: { display: true, text: '十億美金 ($ Billion)', color: '#94a3b8' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });

    // Efficiency Gauge Chart (Semi-circle)
    const gaugeCtx = document.getElementById('efficiencyGauge').getContext('2d');
    new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#10b981', 'rgba(255,255,255,0.05)'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                borderRadius: 10
            }]
        },
        options: {
            aspectRatio: 1.5,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            cutout: '85%'
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple reveal animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cost-card, .hurdle-item, .glass-section, .comp-card, .detail-item, .impact-stat').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
