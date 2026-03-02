document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sticky CTA - Scroll Logic (MANDATORY ACCURACY)
    const mainBtn = document.querySelector('.hero-cta-wrapper .btn');
    const stickyCta = document.querySelector('.mobile-sticky-cta');
    const header = document.querySelector('.header');

    if (mainBtn && stickyCta) {
        const toggleSticky = () => {
            const rect = mainBtn.getBoundingClientRect();
            // Получаем высоту шапки, под которую уходит кнопка
            const headerHeight = header ? header.offsetHeight : 0;

            // ПРАВКА: Кнопка вылетает немедленно, как только ее ВЕРХ коснулся НИЗА шапки.
            // rect.top <= headerHeight - это момент входа кнопки под шапку.
            if (rect.top <= headerHeight) {
                stickyCta.classList.add('active');
            } else {
                stickyCta.classList.remove('active');
            }
        };

        // Несколько слушателей для 100% срабатывания
        window.addEventListener('scroll', toggleSticky, { passive: true });
        window.addEventListener('touchmove', toggleSticky, { passive: true });
        window.addEventListener('resize', toggleSticky);

        // Цикличная проверка каждые 100мс для инерционного скролла iOS/Yandex
        setInterval(toggleSticky, 100);

        toggleSticky(); // Первичная проверка при загрузке
    }

    // 2. Simple Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
