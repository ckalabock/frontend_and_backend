// Основные функции для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров при скролле
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    };

    // Плавная прокрутка для якорных ссылок
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Инициализация функций
    animateProgressBars();
    smoothScroll();

    console.log('Сайт загружен и готов к работе!');
});

// Функция для отправки формы (можно расширить)
function handleFormSubmit(formId, successMessage) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-error)';
                } else {
                    field.style.borderColor = 'var(--color-success)';
                }
            });
            
            if (isValid) {
                // В реальном приложении здесь был бы AJAX запрос
                alert(successMessage || 'Форма успешно отправлена!');
                form.reset();
                
                // Сбрасываем цвет границ
                requiredFields.forEach(field => {
                    field.style.borderColor = '';
                });
            } else {
                alert('Пожалуйста, заполните все обязательные поля!');
            }
        });
    }
}