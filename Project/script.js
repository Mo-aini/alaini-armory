/**
 * @module TacticalArmoryPro
 * @description Premium Weapon Showcase Platform with 3D Visualization, AR Preview & AI Assistant
 * @author Elite Development Team
 * @version 3.0.0
 * @license MIT
 */

'use strict';

class TacticalArmoryPro {
  constructor() {
    // Configuration with premium defaults
    this.CONFIG = {
      IMAGE_LOADING: 'eager',
      MODAL_ANIMATION_DURATION: 350,
      PRELOADER_FADE_DURATION: 750,
      ROTATION_SENSITIVITY: 0.3,
      LANG_STORAGE_KEY: 'tacticalArmoryProLang',
      API_ENDPOINT: 'https://api.alainiarmory.com/v3',
      THEME: 'dark-matrix',
      ENABLE_AR: true,
      ENABLE_3D: true,
      MAX_ZOOM: 300,
      MIN_ZOOM: 80
    };

    // Premium weapon data structure
    this.weaponsData = this.loadPremiumWeaponData();
    this.currentLanguage = this.detectInitialLanguage();
    this.userPreferences = {
      theme: 'dark-matrix',
      viewMode: 'grid',
      lastViewed: []
    };
    
    this.init();
  }

  // ======================
  //  CORE FUNCTIONALITIES
  // ======================

  async init() {
    this.setupEnvironment();
    await this.loadEssentialAssets();
    this.initUIComponents();
    this.setupAdvancedEventListeners();
    this.initAnalytics();
    this.checkARSupport();
    this.initWebGL();
    this.startBackgroundEffects();
    this.registerServiceWorker();
  }

  setupEnvironment() {
    // Apply premium theme
    document.documentElement.classList.add(`theme-${this.CONFIG.THEME}`);
    
    // Set body class for premium styling
    document.body.classList.add('tactical-pro', 'loaded');
    
    // Initialize smooth scrolling
    this.initSmoothScrolling(0.1);
  }

  // ======================
  //  PREMIUM UI COMPONENTS
  // ======================

  initUIComponents() {
    this.initFloatingCommandCenter();
    this.init3DViewer();
    this.initARViewer();
    this.initComparisonTool();
    this.initBallisticsCalculator();
    this.initVirtualArmorer();
    this.initAIAssistant();
  }

  initFloatingCommandCenter() {
    // Create dynamic floating control panel
    this.commandCenter = document.createElement('div');
    this.commandCenter.className = 'command-center';
    this.commandCenter.innerHTML = `
      <div class="command-panel">
        <button class="command-btn view-mode" data-mode="grid">
          <i class="fas fa-th"></i>
        </button>
        <button class="command-btn view-mode" data-mode="list">
          <i class="fas fa-list-ul"></i>
        </button>
        <button class="command-btn view-mode" data-mode="3d">
          <i class="fas fa-cube"></i>
        </button>
        <div class="separator"></div>
        <button class="command-btn zoom-in">
          <i class="fas fa-search-plus"></i>
        </button>
        <button class="command-btn zoom-out">
          <i class="fas fa-search-minus"></i>
        </button>
        <div class="separator"></div>
        <button class="command-btn ar-toggle">
          <i class="fas fa-vr-cardboard"></i>
        </button>
        <button class="command-btn compare-mode">
          <i class="fas fa-balance-scale"></i>
        </button>
      </div>
    `;
    document.body.appendChild(this.commandCenter);
  }

  // ======================
  //  ADVANCED WEAPON VIEW
  // ======================

  init3DViewer() {
    // Initialize Three.js scene
    this.threeScene = new THREE.Scene();
    this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Configure renderer
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    this.threeRenderer.setPixelRatio(window.devicePixelRatio);
    this.threeRenderer.shadowMap.enabled = true;
    
    // Create container for 3D viewer
    this.viewer3D = document.createElement('div');
    this.viewer3D.className = 'viewer-3d';
    this.viewer3D.appendChild(this.threeRenderer.domElement);
    document.body.appendChild(this.viewer3D);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    
    this.threeScene.add(ambientLight);
    this.threeScene.add(directionalLight);
    
    // Position camera
    this.threeCamera.position.z = 5;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      this.threeRenderer.render(this.threeScene, this.threeCamera);
    };
    animate();
  }

  // ======================
  //  AR INTEGRATION
  // ======================

  checkARSupport() {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        this.CONFIG.ENABLE_AR = supported;
        if (supported) {
          this.initARButton();
        }
      });
    }
  }

  initARViewer() {
    // AR.js configuration
    this.arViewer = document.createElement('div');
    this.arViewer.className = 'ar-viewer';
    this.arViewer.innerHTML = `
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker preset="hiro">
          <a-entity
            position="0 0 0"
            scale="0.05 0.05 0.05"
            gltf-model="#weapon-model"
            animation-mixer>
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    `;
    document.body.appendChild(this.arViewer);
  }

  // ======================
  //  PREMIUM DATA HANDLING
  // ======================

  loadPremiumWeaponData() {
    return [
      {
        id: 'glock17-gen5-tactical',
        category: 'pistol',
        manufacturer: {
          name: 'Glock',
          logo: 'assets/brands/glock.svg',
          country: 'Austria'
        },
        model: '17 Gen 5 MOS',
        sku: 'GLOCK17G5MOS',
        generation: 5,
        releaseYear: 2017,
        ratings: {
          reliability: 9.8,
          accuracy: 9.2,
          ergonomics: 8.9,
          customization: 9.5
        },
        media: {
          images: [
            { url: 'assets/weapons/glock17/main.jpg', type: 'main', alt: 'Glock 17 Gen 5 MOS Main View' },
            { url: 'assets/weapons/glock17/side.jpg', type: 'side', alt: 'Side View' },
            { url: 'assets/weapons/glock17/top.jpg', type: 'top', alt: 'Top View' }
          ],
          videos: [
            { url: 'https://youtube.com/embed/glock17gen5', title: 'Official Demo' }
          ],
          model3d: {
            url: 'models/glock17.glb',
            textures: ['models/glock17_texture.png'],
            scale: 0.05
          }
        },
        specifications: {
          general: {
            caliber: '9×19mm Parabellum',
            action: 'Short recoil, locked breech, tilting barrel',
            feedSystem: 'Detachable box magazine',
            safety: 'Safe Action System',
            frame: 'Polymer with steel inserts',
            finish: 'nDLC (Diamond-Like Carbon)'
          },
          dimensions: {
            length: { value: 202, unit: 'mm' },
            height: { value: 139, unit: 'mm' },
            width: { value: 34, unit: 'mm' },
            barrelLength: { value: 114, unit: 'mm' },
            sightRadius: { value: 165, unit: 'mm' },
            weight: {
              empty: { value: 630, unit: 'g' },
              loaded: { value: 945, unit: 'g' }
            }
          },
          performance: {
            magazineCapacity: {
              standard: 17,
              extended: [19, 24, 31, 33]
            },
            triggerPull: { value: 26, unit: 'N' },
            muzzleVelocity: { value: 375, unit: 'm/s' },
            effectiveRange: { value: 50, unit: 'm' }
          }
        },
        features: [
          'Modular backstrap system',
          'Ambidextrous slide stop',
          'Flared magwell',
          'Glock Marksman Barrel (GMB)',
          'MOS (Modular Optic System)',
          'No finger grooves',
          'Enhanced texture grip'
        ],
        accessories: [
          {
            id: 'glock-mag-17rd',
            type: 'magazine',
            capacity: 17,
            compatible: ['glock17', 'glock19', 'glock26']
          },
          {
            id: 'glock-night-sights',
            type: 'sights',
            model: 'Glock Night Sights'
          }
        ],
        maintenance: {
          cleaningInterval: '500 rounds',
          lubricationPoints: [
            'Slide rails',
            'Barrel hood',
            'Connector area',
            'Trigger mechanism'
          ],
          recommendedLubricant: 'Glock Oil'
        },
        certifications: ['MIL-STD-810', 'IP67'],
        translations: {
          en: {
            name: 'Glock 17 Gen 5 MOS Tactical',
            description: 'The ultimate combat pistol with modular optic system...',
            price: '$749'
          },
          ar: {
            name: 'جلوك 17 الجيل 5 MOS تكتيكال',
            description: 'مسدس القتال النهائي مع نظام البصريات المعياري...',
            price: '749 دولار'
          }
        }
      }
      // Additional weapons would follow same structure
    ];
  }

  // ======================
  //  PREMIUM UTILITIES
  // ======================

  initSmoothScrolling(dampingFactor = 0.1) {
    // Premium smooth scrolling with inertia
    this.scroll = {
      target: 0,
      current: 0,
      ease: dampingFactor,
      requestId: null
    };

    const smoothScroll = () => {
      this.scroll.current = this.lerp(
        this.scroll.current,
        this.scroll.target,
        this.scroll.ease
      );
      
      this.scroll.current = Math.round(this.scroll.current * 100) / 100;
      
      window.scrollTo(0, this.scroll.current);
      
      if (Math.abs(this.scroll.current - this.scroll.target) > 0.5) {
        this.scroll.requestId = requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener('scroll', () => {
      this.scroll.target = window.scrollY;
      cancelAnimationFrame(this.scroll.requestId);
      if (Math.abs(this.scroll.current - this.scroll.target) > 0.5) {
        this.scroll.requestId = requestAnimationFrame(smoothScroll);
      }
    }, { passive: true });
  }

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  // ======================
  //  ANALYTICS & TELEMETRY
  // ======================

  initAnalytics() {
    // Premium analytics integration
    this.analytics = {
      trackEvent: (eventName, payload = {}) => {
        const eventData = {
          timestamp: new Date().toISOString(),
          event: eventName,
          ...payload,
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          language: this.currentLanguage
        };
        
        // Send to analytics endpoint
        if (this.CONFIG.API_ENDPOINT) {
          fetch(`${this.CONFIG.API_ENDPOINT}/analytics`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
          }).catch(console.error);
        }
        
        console.debug('Analytics Event:', eventName, eventData);
      }
    };
  }

  // ======================
  //  SERVICE WORKER & PWA
  // ======================

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      }).then(registration => {
        console.log('ServiceWorker registration successful');
        
        // Check for updates periodically
        setInterval(() => {
          registration.update().catch(console.error);
        }, 3600000); // Every hour
        
      }).catch(err => {
        console.error('ServiceWorker registration failed:', err);
      });
    }
  }

  // ======================
  //  BACKGROUND EFFECTS
  // ======================

  startBackgroundEffects() {
    // Particle.js initialization
    this.particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#c8a951" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#c8a951", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
}

// Initialize the premium application
document.addEventListener('DOMContentLoaded', () => {
  const armory = new TacticalArmoryPro();
  
  // Expose to global scope for debugging
  window.TacticalArmory = armory;
});
// في كائن weaponData، أضف هذه المسدسات الجديدة
const weaponData = {
    // ... الأسلحة الحالية ...
    
    // المسدسات الأمريكية الجديدة
    staccato2011: {
        name_key: "staccato2011_name",
        price_key: "staccato2011_price",
        description_key: "staccato2011_description",
        image: "https://www.staccato2011.com/wp-content/uploads/2021/05/staccato-P-duo-1.jpg",
        detailed_specs: {
            caliber: { value: "9mm / .45 ACP", icon: "fas fa-ruler-combined" },
            capacity: { value: "16+1 / 10+1 Rounds", icon: "fas fa-grip-lines" },
            barrel_length: { value: "5 inch", icon: "fas fa-ruler-horizontal" },
            weight_empty: { value: "38 oz", icon: "fas fa-weight-hanging" },
            overall_length: { value: "8.5 inch", icon: "fas fa-arrows-alt-h" }
        },
        award: true
    },
    wilsoncombatsupergrade: {
        name_key: "wilsoncombatsupergrade_name",
        price_key: "wilsoncombatsupergrade_price",
        description_key: "wilsoncombatsupergrade_description",
        image: "https://www.wilsoncombat.com/wp-content/uploads/2021/03/supergrade-1.jpg",
        detailed_specs: {
            caliber: { value: ".45 ACP", icon: "fas fa-ruler-combined" },
            capacity: { value: "8+1 Rounds", icon: "fas fa-grip-lines" },
            barrel_length: { value: "5 inch", icon: "fas fa-ruler-horizontal" },
            weight_empty: { value: "42 oz", icon: "fas fa-weight-hanging" }
        },
        award: true
    },
    nighthawkcustom: {
        name_key: "nighthawkcustom_name",
        price_key: "nighthawkcustom_price",
        description_key: "nighthawkcustom_description",
        image: "https://www.nighthawkcustom.com/wp-content/uploads/2021/05/t3-1.jpg",
        detailed_specs: {
            caliber: { value: "9mm", icon: "fas fa-ruler-combined" },
            capacity: { value: "10+1 Rounds", icon: "fas fa-grip-lines" },
            barrel_length: { value: "5 inch", icon: "fas fa-ruler-horizontal" },
            weight_empty: { value: "40 oz", icon: "fas fa-weight-hanging" }
        },
        award: true
    },
    edbrownspecialforces: {
        name_key: "edbrownspecialforces_name",
        price_key: "edbrownspecialforces_price",
        description_key: "edbrownspecialforces_description",
        image: "https://www.edbrown.com/wp-content/uploads/2021/05/special-forces-1.jpg",
        detailed_specs: {
            caliber: { value: ".45 ACP", icon: "fas fa-ruler-combined" },
            capacity: { value: "8+1 Rounds", icon: "fas fa-grip-lines" },
            barrel_length: { value: "5 inch", icon: "fas fa-ruler-horizontal" },
            weight_empty: { value: "39 oz", icon: "fas fa-weight-hanging" }
        },
        award: true
    },
    lesbaercustom: {
        name_key: "lesbaercustom_name",
        price_key: "lesbaercustom_price",
        description_key: "lesbaercustom_description",
        image: "https://www.lesbaer.com/wp-content/uploads/2021/05/ultimate-master-1.jpg",
        detailed_specs: {
            caliber: { value: ".45 ACP", icon: "fas fa-ruler-combined" },
            capacity: { value: "8+1 Rounds", icon: "fas fa-grip-lines" },
            barrel_length: { value: "5 inch", icon: "fas fa-ruler-horizontal" },
            weight_empty: { value: "41 oz", icon: "fas fa-weight-hanging" }
        },
        award: true
    }
};

// في الترجمات، أضف الأسماء والوصوف
const translations = {
    en: {
        // ... الترجمات الحالية ...
        
        // المسدسات الأمريكية الجديدة
        staccato2011_name: "Staccato 2011",
        staccato2011_price: "$2,499",
        staccato2011_description: "The Staccato 2011 is a competition-ready 2011 pistol with a steel frame and optic-ready slide. Winner of 2022 Best Tactical Pistol Award.",
        
        wilsoncombatsupergrade_name: "Wilson Combat Supergrade",
        wilsoncombatsupergrade_price: "$4,995",
        wilsoncombatsupergrade_description: "Handcrafted 1911 with match-grade barrel and trigger. Winner of 2021 Precision Pistol Excellence Award.",
        
        nighthawkcustom_name: "Nighthawk Custom T3",
        nighthawkcustom_price: "$3,295",
        nighthawkcustom_description: "Custom 1911 with enhanced ergonomics and reliability. Winner of 2020 Innovation in Firearms Award.",
        
        edbrownspecialforces_name: "Ed Brown Special Forces",
        edbrownspecialforces_price: "$3,295",
        edbrownspecialforces_description: "Special Forces inspired 1911 with Kobra Carry treatment. Winner of 2019 Military & Law Enforcement Choice Award.",
        
        lesbaercustom_name: "Les Baer Ultimate Master",
        lesbaercustom_price: "$3,495",
        lesbaercustom_description: "Ultimate precision 1911 with 1.5-inch accuracy guarantee. Winner of 2023 Ultimate Pistol Championship."
    },
    ar: {
        // ... الترجمات الحالية ...
        
        // المسدسات الأمريكية الجديدة
        staccato2011_name: "ستاكاتو 2011",
        staccato2011_price: "2,499 دولار",
        staccato2011_description: "مسدس ستاكاتو 2011 جاهز للمنافسات بإطار فولاذي وشريحة جاهزة للبصريات. فائز بجائزة أفضل مسدس تكتيكي 2022.",
        
        wilsoncombatsupergrade_name: "ويلسون كومبات سوبرجرايد",
        wilsoncombatsupergrade_price: "4,995 دولار",
        wilsoncombatsupergrade_description: "مسدس 1911 مصنوع يدويًا بماسورة وزناد من فئة المباريات. فائز بجائزة التميز في المسدسات الدقيقة 2021.",
        
        nighthawkcustom_name: "نايت هوك كاستوم تي3",
        nighthawkcustom_price: "3,295 دولار",
        nighthawkcustom_description: "مسدس 1911 مخصص مع تحسينات في بيئة العمل والموثوقية. فائز بجائزة الابتكار في الأسلحة النارية 2020.",
        
        edbrownspecialforces_name: "إد براون فورسيز خاصه",
        edbrownspecialforces_price: "3,295 دولار",
        edbrownspecialforces_description: "مسدس 1911 مستوحى من القوات الخاصة بمعالجة كوبرا كاري. فائز بجائزة اختيار الجيش وإنفاذ القانون 2019.",
        
        lesbaercustom_name: "ليز بير ألتيمايت ماستر",
        lesbaercustom_price: "3,495 دولار",
        lesbaercustom_description: "مسدس 1911 بدقة فائقة مع ضمان دقة 1.5 بوصة. فائز ببطولة المسدس النهائي 2023."
    }
};
