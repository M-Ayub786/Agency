# World-Class Digital Agency & Personal Portfolio

A luxury, Awwwards-inspired personal portfolio and creative agency website designed for **Ayub Ahmad**. This project utilizes **Bootstrap 5.3**, custom CSS3 glassmorphism elements, GSAP ScrollTrigger timelines, and modular structures built to easily port to a **PHP / Laravel** framework structure.

---

## 🚀 Key Features

*   **Apple-Level Minimalism & Agency Grid:** Clean typography, generous spacing, and modern UI structures.
*   **Dual Color Modes:** Integrated Dark/Light mode using Bootstrap 5.3's native `data-bs-theme` configuration, complete with custom variable transition curves.
*   **Advanced Scroll Animations:** Custom Animate On Scroll (AOS) combined with high-fidelity GSAP ScrollTrigger transitions.
*   **Awwwards Interaction Details:** Custom circular mouse follower cursor, magnetic buttons, and wave ripple effects.
*   **Premium Visual Assets:** Clean inline SVGs that scale perfectly across all screens, avoiding broken asset URLs and slow loading times.
*   **Optimized & Lightweight:** Zero compilation steps required. Full modular separation ready for Laravel Blade templates.
*   **Fully Responsive:** Fluid layouts designed mobile-first.

---

## 📁 File Structure

```text
Portfolio/
├── assets/
│   ├── css/
│   │   └── style.css      # Core theme variables, glassmorphism, custom cursor & animations
│   ├── js/
│   │   └── main.js        # GSAP triggers, Swiper sliders, filters, dark mode & forms
│   ├── images/            # Directory for local raster images and assets
│   ├── icons/             # Custom SVG icon storage
│   └── fonts/             # Custom webfont storage
├── components/            # Placeholder for HTML/PHP slice components
├── pages/                 # Multi-page layouts (if extended)
└── index.html             # Central entry point with full SEO & schema layouts
```

---

## 🛠️ Technology Integration

The website implements CDNs for rapid loading speeds and zero build-system requirements:
*   [Bootstrap v5.3.3](https://getbootstrap.com/) - Frontend layout and component system.
*   [Bootstrap Icons v1.11.3](https://icons.getbootstrap.com/) - Premium vector iconography.
*   [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - Initial scroll reveals.
*   [GSAP & ScrollTrigger](https://greensock.com/gsap/) - Advanced mouse coordinate tracking and title transitions.
*   [Swiper.js v11](https://swiperjs.com/) - Testimonial slide decks and tech stack logo slider.
*   [Typed.js](https://mattboldt.github.io/typed.js/) - Dynamic typing header rotating titles.

---

## 🐘 Integrating with PHP / Laravel

This project was built from the ground up to be easily integrated into a Laravel blade ecosystem:

### 1. Master Layout Setup
Rename the root `index.html` structure or create a Laravel layouts master file (e.g. `resources/views/layouts/app.blade.php`). Put the common `<head>` tags and scripts at the bottom:
```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <!-- Include SEO tags and asset headers -->
    @stack('styles')
</head>
<body>
    @include('components.navbar')
    
    <main>
        @yield('content')
    </main>

    @include('components.footer')
    
    <!-- Include CDNs and asset footers -->
    @stack('scripts')
</body>
</html>
```

### 2. Blade Component Slicing
You can copy-paste sections from `index.html` directly into separate Laravel blade component files:
*   `resources/views/components/hero.blade.php` (The `#home` section)
*   `resources/views/components/about.blade.php` (The `#about` section)
*   `resources/views/components/skills.blade.php` (The `#skills` section)
*   `resources/views/components/services.blade.php` (The `#services` section)
*   `resources/views/components/portfolio.blade.php` (The `#portfolio` section)
*   `resources/views/components/contact.blade.php` (The `#contact` section)
