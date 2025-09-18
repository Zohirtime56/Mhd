
// البرومت: اكتب JavaScript لموقع خدمات رقمية. المهام: 1- جعل شريط التنقل مضغوطًا (sticky) عند scroll. 2- validation بسيط لنموذج التواصل في صفحة contact.html. 3- smooth scrolling للروابط الداخلية. 4- إضافة تأثيرات fade-in للعناصر عند scroll. 5- إظهار رسالة نجاح عند submit نموذج التواصل (even though it's static).

// انتظر حتى يتم تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {

    // 1. جعل الشريط العلوي مضغوطًا عند التمرير
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 5%';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '1rem 5%';
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // 2. التحقق من صحة نموذج التواصل (إذا وجد النموذج في الصفحة)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الإرسال الفعلي للصفحة (لأنه لا يوجد خادم yet)

            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // مسح رسائل الخطأ القديمة
            document.querySelectorAll('.error-message').forEach(msg => msg.remove());

            // التحقق من الاسم
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'الرجاء إدخال اسمك.'); // ✅ صح
                isValid = false;
            }

            // التحقق من البريد الإلكتروني
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, 'الرجاء إدخال بريد إلكتروني صحيح.'); // ✅ صح
                isValid = false;
            }

            // التحقق من الرسالة
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'الرسالة يجب أن تكون على الأقل 10 أحرف.');
                isValid = false;
            }

            // إذا كان النموذج صالحًا، show success message
            if (isValid) {
                alert('شكرًا لك! تم استلام رسالتك وسأرد عليك في أقرب وقت.');
                contactForm.reset(); // مسح النموذج
            }
        });
    }

    // 3. Smooth scrolling للروابط التي تبدأ بـ #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. تأثير الظهور (fade-in) للعناصر عند التمرير (Scroll Animation)
    const fadeElements = document.querySelectorAll('.feature-card, .service-card');
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // تهيئة العناصر وإضافة مستمع event للتمرير
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    window.addEventListener('scroll', checkFade);
    checkFade(); // تحقق مرة واحدة عند التحميل

});

// دالة مساعدة لإظهار رسالة الخطأ
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = 'red';
        }
