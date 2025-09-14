document.addEventListener('DOMContentLoaded', function () {
    const mainMenu = document.getElementById('list-main-menu');
    const menuToggleIcon = document.querySelector('#header-main-menu .toggle-icon');

    function expandMainMenu() {
        mainMenu.classList.remove('collapsed');
        mainMenu.style.maxHeight = mainMenu.scrollHeight + 'px';
        menuToggleIcon.classList.add('active');
    }

    function collapseMainMenu() {
        mainMenu.style.maxHeight = mainMenu.scrollHeight + 'px';
        requestAnimationFrame(() => {
            mainMenu.style.maxHeight = '0';
            mainMenu.classList.add('collapsed');
            menuToggleIcon.classList.remove('active');
        });
    }

    function toggleMainMenu() {
        const isCollapsed = mainMenu.classList.contains('collapsed');
        isCollapsed ? expandMainMenu() : collapseMainMenu();
    }

    if (menuToggleIcon && mainMenu) {
        menuToggleIcon.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMainMenu();
        });

        mainMenu.addEventListener('transitionend', () => {
            if (!mainMenu.classList.contains('collapsed')) {
                mainMenu.style.maxHeight = 'none';
            }
        });
    }

    document.querySelectorAll('.collapsible-header').forEach(header => {
        const icon = header.querySelector('.toggle-icon');
        const list = header.nextElementSibling;

        function expandList() {
            list.classList.remove('collapsed');
            list.style.maxHeight = list.scrollHeight + 'px';
            header.classList.add('active');
            if (icon) icon.classList.add('active');
        }

        function collapseList() {
            list.style.maxHeight = list.scrollHeight + 'px';
            requestAnimationFrame(() => {
                list.style.maxHeight = '0';
                list.classList.add('collapsed');
                header.classList.remove('active');
                if (icon) icon.classList.remove('active');
            });
        }

        function toggleList() {
            if (!list || !list.classList.contains('collapsible-list')) return;
            const isCollapsed = list.classList.contains('collapsed');
            isCollapsed ? expandList() : collapseList();
        }

        header.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleList();
        });

        if (icon) {
            icon.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleList();
            });
        }

        list.addEventListener('transitionend', () => {
            if (!list.classList.contains('collapsed')) {
                list.style.maxHeight = 'none';
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (
            !menuToggleIcon.contains(event.target) &&
            !mainMenu.contains(event.target)
        ) {
            if (!mainMenu.classList.contains('collapsed')) {
                collapseMainMenu();
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const darkModeToggle = document.querySelector('.darkmode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Load saved preference or use system default
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.add('active');
    }

    // Toggle dark mode on click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            darkModeToggle.classList.toggle('active');

            const mode = body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
            localStorage.setItem('darkMode', mode);
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('.carousel-stage');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentIndex = 0;
    const intervalTime = 4000;

    function updateCarousel() {
        // Calculate the item width every time the function is called
        const itemWidth = items[0].offsetWidth;
        const offset = -currentIndex * itemWidth;
        stage.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        updateCarousel();
    }

    // Set up automatic sliding
    let carouselInterval = setInterval(nextSlide, intervalTime);

    // Event listener for the "Next" button
    nextBtn.addEventListener('click', () => {
        clearInterval(carouselInterval);
        nextSlide();
        carouselInterval = setInterval(nextSlide, intervalTime);
    });

    // Event listener for the "Previous" button
    prevBtn.addEventListener('click', () => {
        clearInterval(carouselInterval);
        prevSlide();
        carouselInterval = setInterval(nextSlide, intervalTime);
    });

    // Update the carousel on initial load
    updateCarousel();

    // Re-calculate the position if the window is resized
    window.addEventListener('resize', updateCarousel);
});




document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = Array.from(document.querySelectorAll(
        '.gallery-item-flex .gallery-icon img, .gallery-item .gallery-icon img'
    ));

    const modal = document.getElementById('magnify-modal');
    const modalImage = document.getElementById('magnified-image');
    const modalCaption = document.getElementById('magnified-caption');
    const closeButton = document.querySelector('.close-button');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const header = document.querySelector('header');

    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        const img = galleryImages[currentIndex];

        // Find the closest figure-like container for caption
        const figure = img.closest('.gallery-item') ||
            img.closest('.gallery-item-flex');

        const caption = figure ? figure.querySelector('.img-text') : null;

        // Fade out before changing image
        modalImage.style.opacity = '0';

        setTimeout(() => {
            modalImage.src = img.src;
            modalCaption.textContent = caption
            modalImage.style.opacity = '1';
        }, 200);

        modal.style.display = 'flex';
        header.style.display = 'none';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalImage.style.opacity = '0';
        header.style.display = 'block';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openModal(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentIndex);
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    closeButton.addEventListener('click', closeModal);
    nextArrow.addEventListener('click', showNext);
    prevArrow.addEventListener('click', showPrev);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeModal();
        }
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const galleryContainers = document.querySelectorAll('.gallery-container-box, .gallery-container');

    galleryContainers.forEach(container => {
    const stage = container.querySelector('.gallery-stage');
    const items = container.querySelectorAll('.gallery-item');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    let currentIndex = 0;

    function updateGallery() {
        const itemWidth = items[0].offsetWidth;
        const offset = -currentIndex * itemWidth;
        stage.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateGallery();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateGallery();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', updateGallery);

    updateGallery(); // initialize position
    });
});

