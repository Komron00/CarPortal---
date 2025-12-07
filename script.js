// Современная логика для автомобильного портала

// Массив с данными об автомобилях для демонстрации
const carsData = {
    toyota: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander', 'Land Cruiser'],
    bmw: ['X5', 'X3', 'Series 3', 'Series 5', 'X7', 'M3'],
    audi: ['A4', 'A6', 'Q7', 'Q5', 'A3', 'Q8'],
    mercedes: ['C-Class', 'E-Class', 'GLE', 'GLC', 'S-Class', 'GLS'],
    volkswagen: ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Polo', 'Arteon'],
    ford: ['Focus', 'Mustang', 'Explorer', 'F-150', 'Escape', 'Edge'],
    hyundai: ['Solaris', 'Creta', 'Tucson', 'Santa Fe', 'Elantra', 'Kona'],
    kia: ['Rio', 'Ceed', 'Sportage', 'Sorento', 'Optima', 'Telluride']
};

// Функция для обновления списка моделей в зависимости от выбранной марки
document.getElementById('brand').addEventListener('change', function() {
    const brand = this.value;
    const modelSelect = document.getElementById('model');
    
    // Очищаем список моделей
    modelSelect.innerHTML = '<option value="">Любая</option>';
    
    // Если выбрана марка, добавляем соответствующие модели
    if (brand && carsData[brand]) {
        carsData[brand].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase().replace(/\s+/g, '-');
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

// Обработчик отправки формы поиска
document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем значения из формы
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const priceFrom = document.getElementById('price-from').value;
    const priceTo = document.getElementById('price-to').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    showNotification('Поиск автомобилей начался...', 'info');
    
    // Имитация поиска
    setTimeout(() => {
        showNotification(`Найдено 42 автомобиля по запросу:\nМарка: ${brand || 'Любая'}\nМодель: ${model || 'Любая'}\nЦена: от ${priceFrom || '0'} до ${priceTo || '∞'} ₽`, 'success');
    }, 1500);
});

// Плавная прокрутка для навигационных ссылок
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

// Анимация при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдение за элементами с классами анимации
document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-slide-up, .animate-zoom-in, .animate-fade-in-up, .animate-counter').forEach(el => {
    observer.observe(el);
});

// Счетчики статистики
const statItems = document.querySelectorAll('.stat-number');
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Запуск анимации счетчиков при их появлении в области видимости
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => {
    statObserver.observe(item);
});

// Изменение хедера при скролле
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Мобильное меню
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
});

// Анимация при наведении на карточки
const adCards = document.querySelectorAll('.ad-card');
adCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const badge = card.querySelector('.ad-badge');
        if (badge) {
            badge.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const badge = card.querySelector('.ad-badge');
        if (badge) {
            badge.style.transform = 'scale(1)';
        }
    });
});

// Функциональность кнопок избранного
const favoriteButtons = document.querySelectorAll('.btn-favorite');
favoriteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#e74c3c';
            showNotification('Добавлено в избранное', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
            showNotification('Удалено из избранного', 'info');
        }
    });
});

// Система уведомлений
function showNotification(message, type = 'info') {
    // Создание контейнера для уведомлений, если его нет
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            width: 300px;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Создание уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        cursor: pointer;
    `;
    
    notification.textContent = message;
    
    // Добавление уведомления в контейнер
    notificationContainer.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Удаление по клику
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для элементов hero секции
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Анимация для карточек объявлений
    const adCards = document.querySelectorAll('.ad-card');
    adCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Инициализация слайдера отзывов (если будет добавлен)
    initTestimonialSlider();
});

// Инициализация слайдера отзывов
function initTestimonialSlider() {
    // Пока просто заглушка, в будущем можно добавить полноценный слайдер
    console.log('Testimonial slider initialized');
}

// Эффект параллакса для hero секции
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `rotateY(-5deg) translateY(${scrollPosition * 0.2}px)`;
    }
});

// === ЗАЩИТА ОТ СОХРАНЕНИЯ ===
// Блокировка правой кнопки мыши
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Функция недоступна', 'info');
    return false;
});

// Блокировка клавиш сохранения
document.addEventListener('keydown', function(e) {
    // Ctrl+S
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showNotification('Сохранение недоступно', 'info');
        return false;
    }
    
    // Ctrl+Shift+I (инструменты разработчика)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showNotification('Инструменты разработчика недоступны', 'info');
        return false;
    }
    
    // F12 (инструменты разработчика)
    if (e.key === 'F12') {
        e.preventDefault();
        showNotification('Инструменты разработчика недоступны', 'info');
        return false;
    }
    
    // Ctrl+U (просмотр исходного кода)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showNotification('Просмотр исходного кода недоступен', 'info');
        return false;
    }
    
    // Ctrl+P (печать)
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        showNotification('Печать недоступна', 'info');
        return false;
    }
});

// Инициализация слайдера отзывов (если будет добавлен)
initTestimonialSlider();

// Инициализация слайдера отзывов
function initTestimonialSlider() {
    // Пока просто заглушка, в будущем можно добавить полноценный слайдер
    console.log('Testimonial slider initialized');
}
