/**
 * AL-AWAEL PLUMBING & SANITARY WARE - MAIN JAVASCRIPT
 * Streamlined, fast, and responsive interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');

  // Mobile menu toggle
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinksContainer.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Universal homepage link handler (brand identity, nav item, mobile drawer)
  document.querySelectorAll('a[href="#home"]').forEach((homeLink) => {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, window.location.pathname);
      }

      navLinks.forEach((l) => l.classList.remove('active'));
      const mainHomeNav = document.querySelector('.nav-links a[href="#home"]');
      if (mainHomeNav) mainHomeNav.classList.add('active');

      // Close mobile menu if open
      if (navLinksContainer && navLinksContainer.classList.contains('open')) {
        navLinksContainer.classList.remove('open');
        const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  });

  // Smooth scroll with navbar offset for other section links
  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#home' && targetId.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
          window.scrollTo({
            top: Math.max(0, targetPos),
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        if (navLinksContainer && navLinksContainer.classList.contains('open')) {
          navLinksContainer.classList.remove('open');
          const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    }
  });

  // Handle hash on initial load or back navigation
  if (window.location.hash === '#home') {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Highlight active section on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const navHeight = navbar ? navbar.offsetHeight : 70;

    if (scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
          link.classList.add('active');
        }
      });
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 80;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // Thermal Scanner Modal Overlay Logic
  const openThermalModal = document.getElementById('openThermalModal');
  const closeThermalModal = document.getElementById('closeThermalModal');
  const thermalModal = document.getElementById('thermalModal');

  function showModal() {
    if (thermalModal) {
      thermalModal.classList.add('active');
      thermalModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideModal() {
    if (thermalModal) {
      thermalModal.classList.remove('active');
      thermalModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openThermalModal) {
    openThermalModal.addEventListener('click', showModal);
    openThermalModal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showModal();
      }
    });
  }

  if (closeThermalModal) {
    closeThermalModal.addEventListener('click', hideModal);
  }

  if (thermalModal) {
    thermalModal.addEventListener('click', (e) => {
      if (e.target === thermalModal) {
        hideModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && thermalModal && thermalModal.classList.contains('active')) {
      hideModal();
    }
  });

  // Mobile Quick Hub Screen links (Smooth scroll with fixed navbar offset)
  const hubCards = document.querySelectorAll('.mobile-hub-card');
  hubCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const targetId = card.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const navHeight = navbar ? navbar.offsetHeight : 60;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
          window.scrollTo({
            top: Math.max(0, targetPos),
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Interactive Service Rows Accordion (Click on whole box header to toggle)
  const serviceHeaders = document.querySelectorAll('.service-row-header');
  serviceHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const card = header.closest('.service-row-card');
      if (!card) return;

      const isOpening = !card.classList.contains('is-open');
      card.classList.toggle('is-open');
      header.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Open first service row by default so users immediately see available details
  const firstServiceCard = document.getElementById('serviceRow1');
  const firstServiceHeader = firstServiceCard ? firstServiceCard.querySelector('.service-row-header') : null;
  if (firstServiceCard && firstServiceHeader) {
    firstServiceCard.classList.add('is-open');
    firstServiceHeader.setAttribute('aria-expanded', 'true');
  }


  // ==========================================================================
  // DYNAMIC GALLERY CATEGORIES, PAGINATION & FILTERING LOGIC
  // ==========================================================================
  const loadMoreGalleryBtn = document.getElementById('loadMoreGalleryBtn');
  const galleryLoadMoreWrap = document.getElementById('galleryLoadMoreWrap') || (loadMoreGalleryBtn ? loadMoreGalleryBtn.parentElement : null);
  const galleryGrid = document.getElementById('galleryGrid');

  let currentGalleryFilter = 'all';
  let galleryVisibleCount = 6;
  const GALLERY_PAGE_SIZE = 6;

  const DEFAULT_CATEGORY_SLUG_MAP = {
    'حمامات فندقية وماستر': 'luxury',
    'أنظمة دفن وأطقم معلقة': 'concealed',
    'بانيوهات مستقلة وكبائن': 'tubs',
    'مطابخ وسخانات': 'kitchen-heaters',
    'luxury': 'حمامات فندقية وماستر',
    'concealed': 'أنظمة دفن وأطقم معلقة',
    'tubs': 'بانيوهات مستقلة وكبائن',
    'kitchen-heaters': 'مطابخ وسخانات',
  };

  const CATEGORY_META = {
    'حمامات فندقية وماستر': { icon: 'fa-crown', tag: 'فندقي', sub: 'تشطيبات راقية وفيلات ووحدات معلقة' },
    'أنظمة دفن وأطقم معلقة': { icon: 'fa-shield-halved', tag: 'دفن معتمد', sub: 'جروهي ودورافيت وشاسيهات دفن ليزر' },
    'بانيوهات مستقلة وكبائن': { icon: 'fa-bath', tag: 'بانيوهات', sub: 'بانيو ديكور بيضاوي وكبائن شاور زجاجي' },
    'مطابخ وسخانات': { icon: 'fa-fire-burner', tag: 'مطابخ', sub: 'سخانات ومحابس أمان وأحواض مطابخ' },
  };

  function getCategoryMeta(cat) {
    if (CATEGORY_META[cat]) return CATEGORY_META[cat];
    return {
      icon: 'fa-tag',
      tag: 'قسم مخصص',
      sub: `تصفح أعمال ومشاريع ${cat}`
    };
  }

  function getActiveCategories() {
    if (typeof SiteData !== 'undefined' && typeof SiteData.getGalleryCategories === 'function') {
      return SiteData.getGalleryCategories();
    }
    try {
      const raw = localStorage.getItem('alawael_custom_categories');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    return [
      'حمامات فندقية وماستر',
      'أنظمة دفن وأطقم معلقة',
      'بانيوهات مستقلة وكبائن',
      'مطابخ وسخانات'
    ];
  }

  function categoryMatches(cardCatStr, filterKey) {
    if (!filterKey || filterKey === 'all') return true;
    if (!cardCatStr) return false;

    const cardLower = cardCatStr.trim().toLowerCase();
    const filterLower = filterKey.trim().toLowerCase();

    // 1. Direct contains check
    if (cardLower.includes(filterLower)) return true;

    // 2. Slug check for built-in categories
    const mappedSlug = DEFAULT_CATEGORY_SLUG_MAP[filterKey];
    if (mappedSlug && cardLower.includes(mappedSlug.toLowerCase())) return true;

    // 3. Reverse slug check
    const mappedArabic = DEFAULT_CATEGORY_SLUG_MAP[filterLower];
    if (mappedArabic && cardLower.includes(mappedArabic.toLowerCase())) return true;

    return false;
  }

  function updateGalleryPagination() {
    if (!galleryGrid) return;
    const cards = Array.from(galleryGrid.querySelectorAll('.gallery-card'));

    const matchingCards = [];
    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const matches = categoryMatches(cardCategory, currentGalleryFilter);
      if (!matches) {
        card.classList.add('filter-hidden');
        card.classList.add('paged-hidden');
      } else {
        card.classList.remove('filter-hidden');
        matchingCards.push(card);
      }
    });

    const totalMatching = matchingCards.length;

    matchingCards.forEach((card, index) => {
      if (index < galleryVisibleCount) {
        card.classList.remove('paged-hidden');
      } else {
        card.classList.add('paged-hidden');
      }
    });

    if (!loadMoreGalleryBtn || !galleryLoadMoreWrap) return;

    if (totalMatching <= GALLERY_PAGE_SIZE) {
      galleryLoadMoreWrap.style.display = 'none';
    } else {
      galleryLoadMoreWrap.style.display = 'flex';
      const textSpan = loadMoreGalleryBtn.querySelector('span');
      const icon = loadMoreGalleryBtn.querySelector('i:last-child');

      if (galleryVisibleCount < totalMatching) {
        loadMoreGalleryBtn.setAttribute('data-action', 'more');
        loadMoreGalleryBtn.classList.remove('is-expanded');
        loadMoreGalleryBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'عرض المزيد من سابقة الأعمال';
        if (icon) icon.className = 'fa-solid fa-chevron-down';
      } else {
        loadMoreGalleryBtn.setAttribute('data-action', 'less');
        loadMoreGalleryBtn.classList.add('is-expanded');
        loadMoreGalleryBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'عرض مشاريع أقل';
        if (icon) icon.className = 'fa-solid fa-chevron-up';
      }
    }
  }

  window.updateGalleryPagination = updateGalleryPagination;

  if (loadMoreGalleryBtn) {
    loadMoreGalleryBtn.addEventListener('click', () => {
      const action = loadMoreGalleryBtn.getAttribute('data-action') || 'more';
      if (action === 'more') {
        galleryVisibleCount += GALLERY_PAGE_SIZE;
        updateGalleryPagination();
      } else {
        galleryVisibleCount = GALLERY_PAGE_SIZE;
        updateGalleryPagination();
        if (galleryGrid) {
          const navOffset = window.innerWidth <= 768 ? 70 : 85;
          const elementPosition = galleryGrid.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navOffset);
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // Mobile-Friendly Gallery Search & Genre Selection with Highlight Animation
  const gallerySearchBar = document.getElementById('gallerySearchBar');
  const gallerySearchInput = document.getElementById('gallerySearchInput');
  const clearGallerySearchBtn = document.getElementById('clearGallerySearchBtn');
  const toggleGalleryDropdownBtn = document.getElementById('toggleGalleryDropdownBtn');
  const galleryGenreDropdown = document.getElementById('galleryGenreDropdown');

  function openGalleryDropdown() {
    if (!galleryGenreDropdown || !gallerySearchBar) return;
    galleryGenreDropdown.style.display = 'block';
    gallerySearchBar.classList.add('is-open');
  }

  function closeGalleryDropdown() {
    if (!galleryGenreDropdown || !gallerySearchBar) return;
    galleryGenreDropdown.style.display = 'none';
    gallerySearchBar.classList.remove('is-open');
  }

  function applyGalleryGenre(filterKey, shouldScroll = true) {
    currentGalleryFilter = filterKey || 'all';
    galleryVisibleCount = GALLERY_PAGE_SIZE;

    // Sync filter tabs
    const filterTabsContainer = document.querySelector('.gallery-filter-tabs');
    if (filterTabsContainer) {
      filterTabsContainer.querySelectorAll('.filter-tab').forEach((tab) => {
        const tabFilter = tab.getAttribute('data-filter');
        const match = (tabFilter === currentGalleryFilter || 
                       (tabFilter && DEFAULT_CATEGORY_SLUG_MAP[tabFilter] === currentGalleryFilter) ||
                       (currentGalleryFilter && DEFAULT_CATEGORY_SLUG_MAP[currentGalleryFilter] === tabFilter));
        tab.classList.toggle('active', match);
        tab.classList.toggle('tab-highlight-active', match);
        tab.setAttribute('aria-selected', match ? 'true' : 'false');
        if (match) {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }

    // Sync dropdown options
    if (galleryGenreDropdown) {
      galleryGenreDropdown.querySelectorAll('.genre-option').forEach((opt) => {
        const optFilter = opt.getAttribute('data-filter');
        const match = (optFilter === currentGalleryFilter || 
                       (optFilter && DEFAULT_CATEGORY_SLUG_MAP[optFilter] === currentGalleryFilter) ||
                       (currentGalleryFilter && DEFAULT_CATEGORY_SLUG_MAP[currentGalleryFilter] === optFilter));
        opt.classList.toggle('active', match);
      });
    }

    // Update search bar text & clear button
    if (gallerySearchInput) {
      if (currentGalleryFilter === 'all') {
        gallerySearchInput.value = '';
        if (clearGallerySearchBtn) clearGallerySearchBtn.style.display = 'none';
      } else {
        const activeTab = document.querySelector(`.gallery-filter-tabs .filter-tab.active span`);
        gallerySearchInput.value = activeTab ? activeTab.textContent.trim() : currentGalleryFilter;
        if (clearGallerySearchBtn) clearGallerySearchBtn.style.display = 'inline-flex';
      }
    }

    closeGalleryDropdown();
    if (gallerySearchInput) gallerySearchInput.blur();
    updateGalleryPagination();

    // Smooth scroll down to gallery grid so user immediately sees results
    if (shouldScroll && galleryGrid) {
      const navOffset = 90;
      const elementPosition = galleryGrid.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // Apply visual pulse highlight on visible cards
    if (galleryGrid) {
      const visibleCards = galleryGrid.querySelectorAll('.gallery-card:not(.filter-hidden):not(.paged-hidden)');
      visibleCards.forEach((c) => {
        c.classList.remove('gallery-card-highlighted');
        void c.offsetWidth;
        c.classList.add('gallery-card-highlighted');
      });
    }
  }

  // DYNAMIC RENDERING OF FILTER TABS & SEARCH DROPDOWN
  function renderDynamicGalleryCategories() {
    const filterTabsContainer = document.querySelector('.gallery-filter-tabs');
    const categories = getActiveCategories();

    // 1. Build Filter Tabs
    if (filterTabsContainer) {
      let tabsHtml = `
        <button class="filter-tab ${currentGalleryFilter === 'all' ? 'active tab-highlight-active' : ''}" data-filter="all" role="tab" aria-selected="${currentGalleryFilter === 'all' ? 'true' : 'false'}">
          <i class="fa-solid fa-layer-group"></i>
          <span>الكل (المعرض الشامل)</span>
        </button>
      `;

      categories.forEach((cat) => {
        const meta = getCategoryMeta(cat);
        const isActive = (currentGalleryFilter === cat || currentGalleryFilter === DEFAULT_CATEGORY_SLUG_MAP[cat]);
        tabsHtml += `
          <button class="filter-tab ${isActive ? 'active tab-highlight-active' : ''}" data-filter="${cat}" role="tab" aria-selected="${isActive ? 'true' : 'false'}">
            <i class="fa-solid ${meta.icon}"></i>
            <span>${cat}</span>
          </button>
        `;
      });

      filterTabsContainer.innerHTML = tabsHtml;

      filterTabsContainer.querySelectorAll('.filter-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const filterKey = tab.getAttribute('data-filter') || 'all';
          applyGalleryGenre(filterKey, true);
        });
      });
    }

    // 2. Build Search Bar Dropdown Options
    if (galleryGenreDropdown) {
      let dropHtml = `
        <div class="genre-option ${currentGalleryFilter === 'all' ? 'active' : ''}" data-filter="all">
          <span class="genre-icon"><i class="fa-solid fa-layer-group"></i></span>
          <div class="genre-text">
            <strong>الكل (المعرض الشامل)</strong>
            <small>عرض جميع المشاريع المنفذة</small>
          </div>
          <span class="genre-tag">الكل</span>
        </div>
      `;

      categories.forEach((cat) => {
        const meta = getCategoryMeta(cat);
        const isActive = (currentGalleryFilter === cat || currentGalleryFilter === DEFAULT_CATEGORY_SLUG_MAP[cat]);
        dropHtml += `
          <div class="genre-option ${isActive ? 'active' : ''}" data-filter="${cat}">
            <span class="genre-icon"><i class="fa-solid ${meta.icon}"></i></span>
            <div class="genre-text">
              <strong>${cat}</strong>
              <small>${meta.sub}</small>
            </div>
            <span class="genre-tag">${meta.tag}</span>
          </div>
        `;
      });

      galleryGenreDropdown.innerHTML = dropHtml;

      galleryGenreDropdown.querySelectorAll('.genre-option').forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const filterKey = opt.getAttribute('data-filter') || 'all';
          applyGalleryGenre(filterKey, true);
        });
      });
    }

    // Reset filter to 'all' if current active category was deleted
    if (currentGalleryFilter !== 'all' && !categories.includes(currentGalleryFilter) && !categories.some(c => DEFAULT_CATEGORY_SLUG_MAP[c] === currentGalleryFilter)) {
      currentGalleryFilter = 'all';
    }
  }

  // Initialize Dynamic Categories
  renderDynamicGalleryCategories();

  // Listen to category additions or deletions in real-time
  window.addEventListener('alawael_categories_changed', () => {
    renderDynamicGalleryCategories();
    updateGalleryPagination();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'alawael_custom_categories') {
      renderDynamicGalleryCategories();
      updateGalleryPagination();
    }
  });

  // Search input events
  if (gallerySearchInput) {
    gallerySearchInput.addEventListener('focus', () => {
      openGalleryDropdown();
    });

    gallerySearchInput.addEventListener('click', (e) => {
      e.stopPropagation();
      openGalleryDropdown();
    });

    gallerySearchInput.addEventListener('input', () => {
      const val = gallerySearchInput.value.trim().toLowerCase();
      if (val) {
        if (clearGallerySearchBtn) clearGallerySearchBtn.style.display = 'inline-flex';
        openGalleryDropdown();

        // Live filter dropdown options
        if (galleryGenreDropdown) {
          galleryGenreDropdown.querySelectorAll('.genre-option').forEach((opt) => {
            const text = opt.textContent.toLowerCase();
            opt.style.display = text.includes(val) ? 'flex' : 'none';
          });
        }
      } else {
        if (clearGallerySearchBtn) clearGallerySearchBtn.style.display = 'none';
        if (galleryGenreDropdown) {
          galleryGenreDropdown.querySelectorAll('.genre-option').forEach((opt) => {
            opt.style.display = 'flex';
          });
        }
      }
    });

    gallerySearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (galleryGenreDropdown) {
          const firstVisible = Array.from(galleryGenreDropdown.querySelectorAll('.genre-option')).find((opt) => opt.style.display !== 'none');
          if (firstVisible) {
            applyGalleryGenre(firstVisible.getAttribute('data-filter'), true);
          } else {
            closeGalleryDropdown();
          }
        }
      }
    });
  }

  // Toggle button click
  if (toggleGalleryDropdownBtn) {
    toggleGalleryDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (galleryGenreDropdown && galleryGenreDropdown.style.display === 'block') {
        closeGalleryDropdown();
      } else {
        openGalleryDropdown();
        if (gallerySearchInput) gallerySearchInput.focus();
      }
    });
  }

  // Clear button click
  if (clearGallerySearchBtn) {
    clearGallerySearchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyGalleryGenre('all', true);
      genreOptions.forEach((opt) => { opt.style.display = 'flex'; });
    });
  }

  // Close dropdown when tapping anywhere outside
  document.addEventListener('click', (e) => {
    if (gallerySearchBar && !gallerySearchBar.contains(e.target) &&
        galleryGenreDropdown && !galleryGenreDropdown.contains(e.target)) {
      closeGalleryDropdown();
    }
  });

  // Initial gallery pagination run
  updateGalleryPagination();

  // Mobile-Only Reviews Show More / Show Less Logic (Comfortable Phone UX)
  const loadMoreReviewsBtn = document.getElementById('loadMoreReviewsBtn');
  const fbReviewsScroll = document.querySelector('.fb-reviews-scroll');

  if (loadMoreReviewsBtn && fbReviewsScroll) {
    loadMoreReviewsBtn.addEventListener('click', () => {
      const isExpanded = fbReviewsScroll.classList.toggle('is-expanded');
      loadMoreReviewsBtn.classList.toggle('is-expanded', isExpanded);
      loadMoreReviewsBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const textSpan = loadMoreReviewsBtn.querySelector('span');
      const icon = loadMoreReviewsBtn.querySelector('i');

      if (isExpanded) {
        if (textSpan) textSpan.textContent = 'عرض تقييمات أقل';
        if (icon) icon.className = 'fa-solid fa-chevron-up';
      } else {
        if (textSpan) textSpan.textContent = 'عرض المزيد من آراء العملاء (3 تقييمات إضافية)';
        if (icon) icon.className = 'fa-solid fa-chevron-down';
        // Smooth scroll to top of reviews section on mobile so user is comfortable
        const revSec = document.getElementById('reviews');
        if (revSec) {
          const navOffset = window.innerWidth <= 768 ? 70 : 85;
          const targetY = Math.max(0, revSec.getBoundingClientRect().top + window.pageYOffset - navOffset);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    });
  }

  // Real Work Gallery Lightbox Modal & Multi-Photo Slider Logic
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const modalGalleryImg = document.getElementById('modalGalleryImg');
  const modalGalleryLoc = document.getElementById('modalGalleryLoc');
  const modalGalleryTitle = document.getElementById('modalGalleryTitle');
  const modalGalleryTags = document.getElementById('modalGalleryTags');
  const modalGalleryDesc = document.getElementById('modalGalleryDesc');
  const modalGalleryWaBtn = document.getElementById('modalGalleryWaBtn');
  const modalGalleryPrevBtn = document.getElementById('modalGalleryPrevBtn');
  const modalGalleryNextBtn = document.getElementById('modalGalleryNextBtn');
  const modalGalleryCounter = document.getElementById('modalGalleryCounter');

  let modalImagesList = [];
  let modalCurrentIndex = 0;

  function updateModalSlide(newIdx) {
    if (!modalImagesList || modalImagesList.length === 0) return;
    modalCurrentIndex = (newIdx + modalImagesList.length) % modalImagesList.length;
    if (modalGalleryImg) {
      modalGalleryImg.style.opacity = '0.3';
      modalGalleryImg.style.transition = 'opacity 0.16s ease';
      setTimeout(() => {
        modalGalleryImg.src = modalImagesList[modalCurrentIndex];
        modalGalleryImg.style.opacity = '1';
      }, 70);
    }
    if (modalGalleryCounter) {
      const span = modalGalleryCounter.querySelector('span');
      if (span) span.textContent = `${modalCurrentIndex + 1} / ${modalImagesList.length}`;
    }
  }

  if (modalGalleryPrevBtn) {
    modalGalleryPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModalSlide(modalCurrentIndex - 1);
    });
  }

  if (modalGalleryNextBtn) {
    modalGalleryNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModalSlide(modalCurrentIndex + 1);
    });
  }

  // Multi-Photo Carousel Slider for Individual Gallery Cards
  function setupCardGallerySlider(card, imagesList = null) {
    if (!card) return;
    const imgWrap = card.querySelector('.gallery-img-wrap');
    const mainImg = card.querySelector('.gallery-img');
    if (!imgWrap || !mainImg) return;

    let images = imagesList;
    if (!images) {
      const dataImages = card.getAttribute('data-images');
      if (dataImages) {
        try {
          images = JSON.parse(dataImages);
        } catch (e) {
          images = null;
        }
      }
    }

    if (!Array.isArray(images) || images.length <= 1) {
      card._galleryImages = images || [mainImg.src];
      card._currentImageIndex = 0;
      return;
    }

    card._galleryImages = images;
    card._currentImageIndex = 0;

    // Avoid duplicate slider injection
    if (imgWrap.querySelector('.gallery-slide-btn')) return;

    // Prev Button (RTL: right arrow goes to previous)
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'gallery-slide-btn slide-prev';
    prevBtn.setAttribute('aria-label', 'الصورة السابقة');
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    // Next Button (RTL: left arrow goes to next)
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'gallery-slide-btn slide-next';
    nextBtn.setAttribute('aria-label', 'الصورة التالية');
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    // Counter Badge
    const counterBadge = document.createElement('span');
    counterBadge.className = 'gallery-photo-counter';
    counterBadge.innerHTML = `<i class="fa-solid fa-images"></i> <span>1 / ${images.length}</span>`;

    // Slide Dots
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'gallery-slide-dots';
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    });

    imgWrap.appendChild(prevBtn);
    imgWrap.appendChild(nextBtn);
    imgWrap.appendChild(counterBadge);
    imgWrap.appendChild(dotsWrap);

    function updateCardSlide(newIdx) {
      card._currentImageIndex = (newIdx + images.length) % images.length;
      mainImg.style.opacity = '0.35';
      mainImg.style.transition = 'opacity 0.16s ease';
      setTimeout(() => {
        mainImg.src = images[card._currentImageIndex];
        mainImg.style.opacity = '1';
      }, 70);

      const span = counterBadge.querySelector('span');
      if (span) span.textContent = `${card._currentImageIndex + 1} / ${images.length}`;

      const allDots = dotsWrap.querySelectorAll('.dot');
      allDots.forEach((d, idx) => {
        d.classList.toggle('active', idx === card._currentImageIndex);
      });
    }

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCardSlide(card._currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCardSlide(card._currentImageIndex + 1);
    });

    // Touch swipe left/right for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    imgWrap.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    imgWrap.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            updateCardSlide(card._currentImageIndex - 1);
          } else {
            updateCardSlide(card._currentImageIndex + 1);
          }
        }
      }
    }, { passive: true });
  }

  window.setupCardGallerySlider = setupCardGallerySlider;

  function openProjectModal(card) {
    if (!galleryModal || !card) return;

    const zoomBtn = card.querySelector('.gallery-zoom-btn');
    const imgEl = card.querySelector('.gallery-img');
    const badgeEl = card.querySelector('.gallery-badge');

    const imgSrc = imgEl ? (imgEl.currentSrc || imgEl.src || imgEl.getAttribute('src')) : '';
    const imgAlt = imgEl ? imgEl.getAttribute('alt') : 'مشروع سباكة وتشطيب شركة الأوائل';
    const title = (zoomBtn && zoomBtn.getAttribute('data-title')) || (card.querySelector('h4') ? card.querySelector('h4').textContent.trim() : 'مشروع تشطيب فاخر');
    const location = (zoomBtn && zoomBtn.getAttribute('data-loc')) || (badgeEl ? badgeEl.textContent.trim() : 'القاهرة والجيزة');
    const desc = (zoomBtn && zoomBtn.getAttribute('data-desc')) || (card.querySelector('p') ? card.querySelector('p').textContent.trim() : '');
    const tagsRaw = (zoomBtn && zoomBtn.getAttribute('data-tags')) || '';

    if (!card._galleryImages || !Array.isArray(card._galleryImages) || card._galleryImages.length === 0) {
      const dataImgs = card.getAttribute('data-images');
      if (dataImgs) {
        try {
          card._galleryImages = JSON.parse(dataImgs);
        } catch (e) {
          card._galleryImages = null;
        }
      }
    }

    modalImagesList = (Array.isArray(card._galleryImages) && card._galleryImages.length > 0)
      ? card._galleryImages
      : (imgSrc ? [imgSrc] : []);

    modalCurrentIndex = typeof card._currentImageIndex === 'number' ? card._currentImageIndex : 0;
    if (modalCurrentIndex >= modalImagesList.length || modalCurrentIndex < 0) {
      modalCurrentIndex = 0;
    }

    if (modalGalleryImg) {
      modalGalleryImg.src = modalImagesList[modalCurrentIndex] || imgSrc || '';
      modalGalleryImg.alt = imgAlt;
    }

    if (modalImagesList.length > 1) {
      if (modalGalleryPrevBtn) modalGalleryPrevBtn.style.display = 'flex';
      if (modalGalleryNextBtn) modalGalleryNextBtn.style.display = 'flex';
      if (modalGalleryCounter) {
        modalGalleryCounter.style.display = 'inline-flex';
        const span = modalGalleryCounter.querySelector('span');
        if (span) span.textContent = `${modalCurrentIndex + 1} / ${modalImagesList.length}`;
      }
    } else {
      if (modalGalleryPrevBtn) modalGalleryPrevBtn.style.display = 'none';
      if (modalGalleryNextBtn) modalGalleryNextBtn.style.display = 'none';
      if (modalGalleryCounter) modalGalleryCounter.style.display = 'none';
    }

    if (modalGalleryLoc) {
      modalGalleryLoc.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${location}</span>`;
    }

    if (modalGalleryTitle) {
      modalGalleryTitle.textContent = title;
    }

    if (modalGalleryDesc) {
      modalGalleryDesc.textContent = desc;
    }

    if (modalGalleryTags) {
      modalGalleryTags.innerHTML = '';
      if (tagsRaw) {
        tagsRaw.split(',').forEach((tagText) => {
          const trimmed = tagText.trim();
          if (trimmed) {
            const span = document.createElement('span');
            span.className = 'gtag';
            span.textContent = trimmed;
            modalGalleryTags.appendChild(span);
          }
        });
      }
    }

    if (modalGalleryWaBtn) {
      const waMsg = encodeURIComponent(`السلام عليكم يا بشمهندس وائل، شفت في موقعك مشروع: ${title} (${location})، ومحتاج أعرف تفاصيل وتكلفة تشطيب نفس المستوى.`);
      modalGalleryWaBtn.setAttribute('href', `https://wa.me/201144867114?text=${waMsg}`);
    }

    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideProjectModal() {
    if (galleryModal) {
      galleryModal.classList.remove('active');
      galleryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Setup sliders and initial bindings for static cards
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach((card) => {
    setupCardGallerySlider(card);
  });

  // Global Event Delegation on galleryGrid:
  // Guarantees zoom buttons and images ALWAYS work for both static and dynamically added projects!
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      // 1. If clicking slide arrows or phase switchers, let their handlers work
      if (e.target.closest('.gallery-slide-btn') || e.target.closest('.phase-btn')) return;

      // 2. If clicking links/WhatsApp, let them navigate
      if (e.target.closest('a') || e.target.closest('.gallery-link')) return;

      const card = e.target.closest('.gallery-card');
      if (!card) return;

      const zoomBtn = e.target.closest('.gallery-zoom-btn');
      const imgWrap = e.target.closest('.gallery-img-wrap');

      if (zoomBtn || imgWrap) {
        e.stopPropagation();
        openProjectModal(card);
      }
    });
  }

  if (closeGalleryModal) {
    closeGalleryModal.addEventListener('click', hideProjectModal);
  }

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        hideProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (galleryModal && galleryModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        hideProjectModal();
      } else if (e.key === 'ArrowRight') {
        updateModalSlide(modalCurrentIndex - 1);
      } else if (e.key === 'ArrowLeft') {
        updateModalSlide(modalCurrentIndex + 1);
      }
    }
  });

  // Interactive Phase Switcher for Transformation Cards (Before & After)
  const phaseButtons = document.querySelectorAll('.phase-btn');
  phaseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentRow = btn.closest('.phase-selector-row');
      const card = btn.closest('.gallery-card');
      if (!parentRow || !card) return;

      // Update active button in row
      parentRow.querySelectorAll('.phase-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const imgSrc = btn.getAttribute('data-img');
      const badgeText = btn.getAttribute('data-badge');
      const descText = btn.getAttribute('data-desc');

      const imgEl = card.querySelector('.transformation-img');
      const badgeEl = card.querySelector('.phase-indicator-badge');
      const descEl = card.querySelector('.transformation-card-desc');
      const zoomBtn = card.querySelector('.gallery-zoom-btn');

      if (imgEl && imgSrc) {
        imgEl.style.opacity = '0.35';
        setTimeout(() => {
          imgEl.src = imgSrc;
          imgEl.style.opacity = '1';
        }, 140);
      }

      if (badgeEl && badgeText) {
        badgeEl.textContent = badgeText;
      }

      if (descEl && descText) {
        descEl.textContent = descText;
      }

      if (zoomBtn && descText) {
        zoomBtn.setAttribute('data-desc', descText);
      }
    });
  });

  // ==========================================================================
  // DYNAMIC TOP ANNOUNCEMENT / ADVERTISING BAR (REACTIVE)
  // ==========================================================================
  // TOP ANNOUNCEMENT BAR (DESKTOP & MOBILE REACTIVE)
  // ==========================================================================
  async function initAnnouncementBar() {
    // Clear any past dismissal locks so refreshing always displays the announcement
    try { sessionStorage.removeItem('alawael_announcement_closed'); } catch(e) {}

    if (typeof SiteData === 'undefined') return;
    const bar = document.getElementById('topAnnouncementBar');
    if (!bar) return;

    // Reset dismissal status to ensure bar is rendered on fresh view/reload
    bar.classList.remove('is-dismissed');
    bar.style.removeProperty('display');
    document.body.classList.add('has-announcement');

    const ann = await SiteData.getAnnouncement();
    if (!ann || ann.is_active === false) {
      bar.classList.add('is-dismissed');
      bar.style.setProperty('display', 'none', 'important');
      document.body.classList.remove('has-announcement');
      document.documentElement.style.removeProperty('--ad-height');
      return;
    }

    // Populate Announcement Bar Data
    const badgeEl = document.getElementById('adBadgeDisplay');
    const textEl = document.getElementById('adTextDisplay');
    const ctaEl = document.getElementById('adCtaDisplay');
    const ctaTextEl = document.getElementById('adCtaTextDisplay');
    const closeBtn = document.getElementById('adCloseBtn');

    // Modal elements
    const modalEl = document.getElementById('adOfferModal');
    const modalBadge = document.getElementById('modalOfferBadge');
    const modalText = document.getElementById('modalOfferText');
    const modalCta = document.getElementById('modalOfferCta');
    const modalCtaText = document.getElementById('modalOfferCtaText');
    const closeOfferModalBtn = document.getElementById('closeAdOfferModal');
    const dismissOfferModalBtn = document.getElementById('dismissAdOfferModalBtn');
    const adContentTrigger = document.getElementById('adContentTrigger');

    if (badgeEl) badgeEl.textContent = ann.badge_text || 'عرض خاص 🔥';
    if (textEl) textEl.textContent = ann.message_text || '';
    if (ctaTextEl) ctaTextEl.textContent = ann.cta_text || 'احجز العرض على واتساب';
    if (ctaEl && ann.cta_link) ctaEl.href = ann.cta_link;

    // Sync Offer Details Modal
    if (modalBadge) modalBadge.textContent = ann.badge_text || 'عرض خاص 🔥';
    if (modalText) modalText.textContent = ann.message_text || '';
    if (modalCta && ann.cta_link) modalCta.href = ann.cta_link;
    if (modalCtaText && ann.cta_text) modalCtaText.textContent = ann.cta_text;

    // Apply Custom Background Color to top banner if set
    if (ann.bg_color) {
      bar.style.background = ann.bg_color;
    } else {
      bar.style.removeProperty('background');
    }

    // Modal open / close handlers
    function openOfferModal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (modalEl) {
        modalEl.classList.add('active');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeOfferModal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (modalEl) {
        modalEl.classList.remove('active');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.style.removeProperty('overflow');
      }
    }

    if (adContentTrigger && !adContentTrigger.dataset.bound) {
      adContentTrigger.dataset.bound = 'true';
      adContentTrigger.addEventListener('click', openOfferModal);
    }

    if (closeOfferModalBtn && !closeOfferModalBtn.dataset.bound) {
      closeOfferModalBtn.dataset.bound = 'true';
      closeOfferModalBtn.addEventListener('click', closeOfferModal);
    }

    if (dismissOfferModalBtn && !dismissOfferModalBtn.dataset.bound) {
      dismissOfferModalBtn.dataset.bound = 'true';
      dismissOfferModalBtn.addEventListener('click', closeOfferModal);
    }

    if (modalEl && !modalEl.dataset.bound) {
      modalEl.dataset.bound = 'true';
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeOfferModal(e);
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('active')) {
          closeOfferModal(e);
        }
      });
    }

    bar.classList.remove('is-dismissed');
    bar.style.removeProperty('display');
    document.body.classList.add('has-announcement');

    // Dynamically calculate and apply bar height for both desktop and mobile
    function updateBarHeight() {
      if (bar.classList.contains('is-dismissed') || bar.style.display === 'none') {
        document.body.classList.remove('has-announcement');
        document.documentElement.style.removeProperty('--ad-height');
        return;
      }
      const h = bar.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--ad-height', h + 'px');
      }
    }
    requestAnimationFrame(updateBarHeight);
    window.addEventListener('resize', updateBarHeight);

    function dismissAnnouncement(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      bar.classList.add('is-dismissed');
      bar.style.setProperty('display', 'none', 'important');
      document.body.classList.remove('has-announcement');
      document.documentElement.style.removeProperty('--ad-height');
    }

    if (closeBtn && !closeBtn.dataset.bound) {
      closeBtn.dataset.bound = 'true';
      closeBtn.addEventListener('click', dismissAnnouncement);
      closeBtn.addEventListener('touchend', dismissAnnouncement, { passive: false });
    }
  }

  // Initialize immediately
  initAnnouncementBar();

  // Listen to live changes from Admin Panel in other tabs or same window
  window.addEventListener('alawael_announcement_changed', () => {
    sessionStorage.removeItem('alawael_announcement_closed');
    const bar = document.getElementById('topAnnouncementBar');
    if (bar) bar.classList.remove('is-dismissed');
    initAnnouncementBar();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'alawael_announcement_data') {
      sessionStorage.removeItem('alawael_announcement_closed');
      const bar = document.getElementById('topAnnouncementBar');
      if (bar) bar.classList.remove('is-dismissed');
      initAnnouncementBar();
    }
  });
  window.addEventListener('focus', initAnnouncementBar);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) initAnnouncementBar();
  });
  window.addEventListener('resize', () => {
    const bar = document.getElementById('topAnnouncementBar');
    if (bar && bar.style.display !== 'none') {
      document.documentElement.style.setProperty('--ad-height', bar.offsetHeight + 'px');
    }
  });

  // ==========================================================================
  // DYNAMIC HERO MEDIA ROTATOR (WAEL PORTRAIT & PROMO VIDEO/IMAGE ALTERNATION)
  // ==========================================================================
  let heroCurrentSlide = 'portrait'; // 'portrait' | 'video'
  let heroConfig = null;
  let heroDurationMs = 10000;
  let heroStartTime = 0;
  let heroElapsedBeforePause = 0;
  let heroIsPaused = false;
  let heroAnimFrameId = null;

  async function renderHeroPromoMedia(cfg, wrapEl) {
    if (!wrapEl) return;
    const soundBtn = document.getElementById('heroVideoSoundBtn');

    // Promo Type: Image
    if (cfg.promo_type === 'image') {
      let imgUrl = (cfg.promo_image_url || cfg.poster_url || 'assets/wael_hero_banner.jpg').trim();
      if (!imgUrl || imgUrl.includes('logo_alawael')) {
        imgUrl = 'assets/wael_hero_banner.jpg';
      }
      if (imgUrl.startsWith('indexeddb:') && typeof SiteData !== 'undefined' && SiteData.getMediaObjectUrl) {
        const idbKey = imgUrl.replace('indexeddb:', '');
        const objUrl = await SiteData.getMediaObjectUrl(idbKey);
        if (objUrl) imgUrl = objUrl;
      }
      wrapEl.innerHTML = `<img src="${imgUrl}" alt="${cfg.video_title || 'معاينة أعمالنا'}" class="hero-promo-img">`;
      if (soundBtn) soundBtn.style.display = 'none';
      return;
    }

    // Promo Type: Video
    if (soundBtn) soundBtn.style.display = 'flex';

    let vUrl = (cfg.video_url || '').trim();
    let poster = (cfg.poster_url || 'assets/wael_hero_banner.jpg').trim();
    if (!poster || poster.includes('logo_alawael')) {
      poster = 'assets/wael_hero_banner.jpg';
    }

    if (!vUrl) {
      wrapEl.innerHTML = `<img src="${poster}" alt="${cfg.video_title || 'معاينة أعمالنا'}" class="hero-promo-img">`;
      return;
    }

    // If video is stored in IndexedDB (from phone/laptop device upload)
    if (vUrl.startsWith('indexeddb:') && typeof SiteData !== 'undefined' && SiteData.getMediaObjectUrl) {
      const idbKey = vUrl.replace('indexeddb:', '');
      const blobUrl = await SiteData.getMediaObjectUrl(idbKey);
      if (blobUrl) {
        wrapEl.innerHTML = `
          <video id="heroPromoVideoPlayer" autoplay muted loop playsinline webkit-playsinline preload="metadata" poster="${poster}" style="width:100%;height:100%;object-fit:cover;background:#000;">
            <source src="${blobUrl}">
          </video>
        `;
        const vPlayer = document.getElementById('heroPromoVideoPlayer');
        if (vPlayer) {
          vPlayer.src = blobUrl;
          try { vPlayer.load(); } catch(e) {}
          if (vPlayer.play) {
            vPlayer.play().catch(() => {});
          }
        }
        return;
      }
    }

    const norm = (typeof SiteData !== 'undefined' && SiteData.normalizeVideoUrl)
      ? SiteData.normalizeVideoUrl(vUrl)
      : { type: 'mp4', url: vUrl };

    if (norm.type !== 'youtube' && norm.type !== 'tiktok' && norm.type !== 'social') {
      wrapEl.innerHTML = `
        <video id="heroPromoVideoPlayer" autoplay muted loop playsinline webkit-playsinline preload="metadata" poster="${poster}" style="width:100%;height:100%;object-fit:cover;background:#000;">
          <source src="${norm.url}">
        </video>
      `;
      const vPlayer = document.getElementById('heroPromoVideoPlayer');
      if (vPlayer) {
        vPlayer.src = norm.url;
        try { vPlayer.load(); } catch(e) {}
        if (vPlayer.play) {
          vPlayer.play().catch(() => {});
        }
      }
    } else if (norm.type === 'youtube') {
      const ytMatch = norm.url.match(/embed\/([a-zA-Z0-9_-]+)/i);
      const ytId = ytMatch ? ytMatch[1] : '';
      const loopParam = ytId ? `&loop=1&playlist=${ytId}` : '';
      wrapEl.innerHTML = `
        <iframe id="heroPromoIframe" src="${norm.url}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1${loopParam}" title="فيديو ترويجي" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="width:100%;height:100%;object-fit:cover;border:none;"></iframe>
      `;
    } else {
      wrapEl.innerHTML = `
        <div style="position:relative;width:100%;height:100%;cursor:pointer;" class="hero-social-promo-trigger">
          <img src="${poster}" alt="فيديو العمل" style="width:100%;height:100%;object-fit:cover;">
          <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
            <div style="width:58px;height:58px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 4px 18px rgba(0,0,0,0.4);"><i class="fa-solid fa-play"></i></div>
          </div>
        </div>
      `;
    }
  }

  function stopHeroProgressBar() {
    if (heroAnimFrameId) {
      cancelAnimationFrame(heroAnimFrameId);
      heroAnimFrameId = null;
    }
  }

  function startHeroProgressBar() {
    stopHeroProgressBar();
    heroStartTime = performance.now() - heroElapsedBeforePause;

    function step(now) {
      if (heroIsPaused) return;

      const elapsed = now - heroStartTime;
      const progress = Math.min(1, Math.max(0, elapsed / heroDurationMs));

      const fillPortrait = document.getElementById('storyFillPortrait');
      const fillVideo = document.getElementById('storyFillVideo');

      if (heroCurrentSlide === 'portrait') {
        if (fillPortrait) fillPortrait.style.width = (progress * 100) + '%';
        if (fillVideo) fillVideo.style.width = '0%';
      } else {
        if (fillPortrait) fillPortrait.style.width = '100%';
        if (fillVideo) fillVideo.style.width = (progress * 100) + '%';
      }

      if (progress >= 1) {
        heroElapsedBeforePause = 0;
        const nextSlide = heroCurrentSlide === 'portrait' ? 'video' : 'portrait';
        switchHeroSlide(nextSlide, true);
      } else {
        heroAnimFrameId = requestAnimationFrame(step);
      }
    }

    heroAnimFrameId = requestAnimationFrame(step);
  }

  function switchHeroSlide(slideTarget, continueTimer = false) {
    heroCurrentSlide = slideTarget;
    heroElapsedBeforePause = 0;

    const slidePortrait = document.getElementById('heroSlidePortrait');
    const slideVideo = document.getElementById('heroSlideVideo');
    const segPortrait = document.getElementById('storySegPortrait');
    const segVideo = document.getElementById('storySegVideo');
    const fillPortrait = document.getElementById('storyFillPortrait');
    const fillVideo = document.getElementById('storyFillVideo');

    if (slideTarget === 'portrait') {
      if (slidePortrait) slidePortrait.classList.add('active');
      if (slideVideo) slideVideo.classList.remove('active');
      if (segPortrait) segPortrait.classList.add('active');
      if (segVideo) segVideo.classList.remove('active');
      if (fillPortrait) fillPortrait.style.width = '0%';
      if (fillVideo) fillVideo.style.width = '0%';
    } else {
      if (slidePortrait) slidePortrait.classList.remove('active');
      if (slideVideo) slideVideo.classList.add('active');
      if (segPortrait) segPortrait.classList.remove('active');
      if (segVideo) segVideo.classList.add('active');
      if (fillPortrait) fillPortrait.style.width = '100%';
      if (fillVideo) fillVideo.style.width = '0%';
    }

    if (continueTimer) {
      startHeroProgressBar();
    } else {
      stopHeroProgressBar();
    }
  }

  async function initHeroMediaCard() {
    if (typeof SiteData === 'undefined') return;
    const mediaCol = document.getElementById('heroMediaCol');
    const mediaCard = document.getElementById('heroMediaCard');
    if (!mediaCol || !mediaCard) return;

    heroConfig = await SiteData.getHeroMedia();
    const rawMode = heroConfig.mode || 'both';
    // Mode 'both' is default (Dual Story timer rotation), 'portrait' is clean photo only, 'video' is promo only
    const effectiveMode = (rawMode === 'none' || rawMode === 'portrait') ? 'both' : rawMode;
    heroConfig.mode = effectiveMode;
    mediaCard.setAttribute('data-mode', effectiveMode);
    heroDurationMs = Math.max(3000, Math.min(60000, (Number(heroConfig.duration) || 8) * 1000));

    const heroGrid = document.querySelector('.hero-grid-layout');
    const videoWrap = document.getElementById('heroPromoVideoWrap');

    // Guarantee Wael's card is ALWAYS visible on the site - NEVER hidden!
    mediaCol.style.display = '';
    mediaCol.classList.remove('is-card-hidden');
    if (heroGrid) heroGrid.classList.remove('no-media-card');

    // Populate Slide 1 (Portrait) - The Founder Face Guarantee
    const portraitImg = document.getElementById('heroPortraitImg');
    const portraitName = document.getElementById('heroPortraitName');
    const portraitSub = document.getElementById('heroPortraitSub');
    const mobileAvatar = document.getElementById('mobileWaelAvatar');

    let portraitUrl = heroConfig.portrait_url || 'assets/wael_portrait.jpg';
    if (!portraitUrl || portraitUrl.includes('logo_alawael')) {
      portraitUrl = 'assets/wael_portrait.jpg';
    }
    if (portraitUrl.startsWith('indexeddb:') && typeof SiteData !== 'undefined' && SiteData.getMediaObjectUrl) {
      const idbKey = portraitUrl.replace('indexeddb:', '');
      const blobUrl = await SiteData.getMediaObjectUrl(idbKey);
      if (blobUrl) portraitUrl = blobUrl;
    }
    if (portraitImg) {
      portraitImg.src = portraitUrl;
      portraitImg.onerror = () => { portraitImg.src = 'assets/wael_portrait.jpg'; };
    }
    if (mobileAvatar) {
      mobileAvatar.src = portraitUrl;
      mobileAvatar.onerror = () => { mobileAvatar.src = 'assets/wael_portrait.jpg'; };
    }
    if (portraitName) portraitName.textContent = heroConfig.portrait_name || 'البشمهندس وائل';
    if (portraitSub) portraitSub.textContent = heroConfig.portrait_sub || 'مؤسس ومدير شركة الأوائل للسباكة الحديثة';

    // Populate Slide 2 (Promo Video / Image)
    const promoBadge = document.getElementById('heroPromoBadgeText');
    const promoTitle = document.getElementById('heroPromoTitle');
    const promoCtaBtn = document.getElementById('heroPromoCtaBtn');
    const promoCtaText = document.getElementById('heroPromoCtaText');

    if (promoBadge) promoBadge.textContent = heroConfig.badge_text || 'فيديو حصري ومعاينة حية 🔥';
    if (promoTitle) promoTitle.textContent = heroConfig.video_title || 'شاهد أحدث أعمال وتشطيبات السباكة الفندقية 🎥';
    if (promoCtaText) promoCtaText.textContent = heroConfig.cta_text || 'احجز نفس التشطيب على واتساب';
    if (promoCtaBtn && heroConfig.cta_link) promoCtaBtn.href = heroConfig.cta_link;

    // Sound / Theater Button
    const soundBtn = document.getElementById('heroVideoSoundBtn');
    if (soundBtn && !soundBtn.dataset.bound) {
      soundBtn.dataset.bound = 'true';
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const vidPlayer = document.getElementById('heroPromoVideoPlayer');
        if (vidPlayer) {
          vidPlayer.muted = !vidPlayer.muted;
          soundBtn.classList.toggle('unmuted', !vidPlayer.muted);
          soundBtn.innerHTML = vidPlayer.muted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';
        } else if (typeof window.openVideoModal === 'function') {
          window.openVideoModal(
            heroConfig.video_url,
            'youtube',
            heroConfig.video_title || 'فيديو العرض الترويجي',
            'فيديو حصري ومعاينة لأعمال شركة الأوائل بإشراف البشمهندس وائل',
            heroConfig.badge_text || 'فيديو ترويجي',
            'القاهرة والجيزة'
          );
        }
      });
    }

    // Attach click events to top story segments
    const segPortrait = document.getElementById('storySegPortrait');
    if (segPortrait && !segPortrait.dataset.bound) {
      segPortrait.dataset.bound = 'true';
      segPortrait.addEventListener('click', (e) => {
        e.preventDefault();
        switchHeroSlide('portrait', heroConfig.mode === 'both');
      });
    }

    const segVideo = document.getElementById('storySegVideo');
    if (segVideo && !segVideo.dataset.bound) {
      segVideo.dataset.bound = 'true';
      segVideo.addEventListener('click', (e) => {
        e.preventDefault();
        switchHeroSlide('video', heroConfig.mode === 'both');
      });
    }

    // Hold-to-pause on Desktop (Instagram Story style - pauses only while mouse is actively pressed down)
    if (!mediaCard.dataset.hoverBound) {
      mediaCard.dataset.hoverBound = 'true';
      mediaCard.addEventListener('mousedown', (e) => {
        if (e.target && e.target.closest && e.target.closest('a, button, .hero-promo-cta-btn, .hero-video-sound-btn, .story-progress-segment')) {
          return;
        }
        heroIsPaused = true;
        heroElapsedBeforePause = performance.now() - heroStartTime;
        stopHeroProgressBar();
      });

      window.addEventListener('mouseup', () => {
        if (heroIsPaused) {
          heroIsPaused = false;
          startHeroProgressBar();
        }
      });
    }

    // Touch Gestures & Mobile Tap Navigation (Instagram/TikTok Story Style)
    if (!mediaCard.dataset.touchBound) {
      mediaCard.dataset.touchBound = 'true';
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      mediaCard.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = performance.now();

        // Pause progression while user holds finger down
        if (heroConfig && heroConfig.mode === 'both') {
          heroIsPaused = true;
          heroElapsedBeforePause = performance.now() - heroStartTime;
          stopHeroProgressBar();
        }
      }, { passive: true });

      mediaCard.addEventListener('touchend', (e) => {
        const touchEndTime = performance.now();
        const duration = touchEndTime - touchStartTime;

        // Resume timer if in both mode
        if (heroConfig && heroConfig.mode === 'both') {
          heroIsPaused = false;
          startHeroProgressBar();
        }

        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ignore if user was clicking an interactive element (button or link)
        const target = e.target;
        if (target && target.closest && target.closest('a, button, .hero-promo-cta-btn, .hero-video-sound-btn, .story-progress-segment')) {
          return;
        }

        // Horizontal Swipe detection (min 45px threshold, primarily horizontal)
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
          if (heroConfig && heroConfig.mode === 'both') {
            if (diffX < 0) {
              // Swiped left (in RTL: forward to video/ad)
              switchHeroSlide('video', true);
            } else {
              // Swiped right (in RTL: back to portrait)
              switchHeroSlide('portrait', true);
            }
          }
          return;
        }

        // Tap navigation: quick tap (<350ms and minimal movement)
        if (duration < 350 && Math.abs(diffX) < 15 && Math.abs(diffY) < 15) {
          if (heroConfig && heroConfig.mode === 'both') {
            const cardRect = mediaCard.getBoundingClientRect();
            const clickRelativeX = touchEndX - cardRect.left;
            // In RTL: Right half is portrait (Eng. Wael), Left half is video/ad
            if (clickRelativeX < cardRect.width * 0.5) {
              switchHeroSlide('video', true);
            } else {
              switchHeroSlide('portrait', true);
            }
          }
        }
      }, { passive: true });

      mediaCard.addEventListener('touchcancel', () => {
        if (heroConfig && heroConfig.mode === 'both') {
          heroIsPaused = false;
          startHeroProgressBar();
        }
      }, { passive: true });
    }

    // Desktop Click Navigation (Clicking anywhere on card toggles between portrait and ad)
    if (!mediaCard.dataset.clickBound) {
      mediaCard.dataset.clickBound = 'true';
      mediaCard.addEventListener('click', (e) => {
        // Do not trigger toggle if user clicked interactive buttons/links
        if (e.target && e.target.closest && e.target.closest('a, button, .hero-promo-cta-btn, .hero-video-sound-btn, .story-progress-segment')) {
          return;
        }
        if (heroConfig && heroConfig.mode === 'both') {
          const nextSlide = heroCurrentSlide === 'portrait' ? 'video' : 'portrait';
          switchHeroSlide(nextSlide, true);
        }
      });
    }

    // Mode-specific execution
    const storyStrip = document.getElementById('heroStoryProgressStrip');

    if (effectiveMode === 'portrait') {
      // Clean Founder Portrait Mode: NO AD, NO PROGRESS BAR (Wael's photo is 100% visible)
      if (videoWrap) videoWrap.innerHTML = '';
      if (storyStrip) storyStrip.style.display = 'none';
      mediaCard.style.cursor = 'default';
      switchHeroSlide('portrait', false);
      stopHeroProgressBar();
    } else if (effectiveMode === 'video') {
      await renderHeroPromoMedia(heroConfig, videoWrap);
      if (storyStrip) storyStrip.style.display = 'none';
      mediaCard.style.cursor = 'default';
      switchHeroSlide('video', false);
      stopHeroProgressBar();
    } else {
      // effectiveMode === 'both'
      await renderHeroPromoMedia(heroConfig, videoWrap);
      if (storyStrip) storyStrip.style.display = 'flex';
      mediaCard.style.cursor = 'pointer';
      switchHeroSlide('portrait', true);
    }
  }

  // Initialize Hero Media Rotator
  initHeroMediaCard();

  window.addEventListener('alawael_hero_media_changed', initHeroMediaCard);
  window.addEventListener('storage', (e) => {
    if (e.key === 'alawael_hero_media_config') {
      initHeroMediaCard();
    }
  });
  window.addEventListener('focus', initHeroMediaCard);

  // ==========================================================================
  // DYNAMIC FIELD WORK VIDEOS & VIDEO MODAL PLAYER
  // ==========================================================================
  // ==========================================================================
  // DYNAMIC FIELD WORK VIDEOS & DUAL BEFORE/AFTER VIDEO MODAL PLAYER
  // ==========================================================================
  let currentModalVideoState = null;

  async function initVideoShowcase() {
    if (typeof SiteData === 'undefined') return;
    const grid = document.getElementById('realVideosGrid');
    if (!grid) return;

    const videos = await SiteData.getVideos();
    if (!videos || videos.length === 0) return;

    grid.innerHTML = '';
    for (const v of videos) {
      let poster = v.poster_url || 'assets/wael_hero_banner.jpg';
      if (poster && poster.startsWith('indexeddb:') && typeof SiteData !== 'undefined' && typeof SiteData.getMediaObjectUrl === 'function') {
        try {
          const resolved = await SiteData.getMediaObjectUrl(poster);
          if (resolved) poster = resolved;
        } catch (e) {}
      }
      const isDual = Boolean(v.has_dual_videos || (v.video_url_before && v.video_url_after));

      const badgeMarkup = isDual
        ? `<span class="video-badge-pill dual-video-pill"><i class="fa-solid fa-code-compare"></i> قبل وبعد (فيديوهين)</span>`
        : `<span class="video-badge-pill">${v.tag || 'فيديو عمل'}</span>`;

      const dualTabsMarkup = isDual
        ? `
          <div class="dual-video-tabs">
            <button type="button" class="btn-dual-card-tab tab-before active" data-which="before">
              <span>فيديو قبل</span>
            </button>
            <button type="button" class="btn-dual-card-tab tab-after" data-which="after">
              <span>فيديو بعد التشطيب</span>
            </button>
          </div>
        `
        : '';

      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="video-thumb-wrap"
          data-video-url="${v.video_url || v.video_url_after || v.video_url_before || ''}"
          data-video-type="${v.video_type || 'youtube'}"
          data-has-dual="${isDual ? 'true' : 'false'}"
          data-video-before="${v.video_url_before || ''}"
          data-video-after="${v.video_url_after || ''}"
          data-type-before="${v.video_type_before || v.video_type || 'mp4'}"
          data-type-after="${v.video_type_after || v.video_type || 'mp4'}"
          data-active-video="${isDual ? 'before' : 'main'}"
          data-title="${v.title}"
          data-loc="${v.location || 'القاهرة'}"
          data-tag="${v.tag || 'فيديو عمل'}"
          data-desc="${v.description || ''}">
          <img src="${poster}" alt="${v.title}" class="video-thumb-img" loading="lazy" onerror="this.src='assets/wael_hero_banner.jpg'">
          ${badgeMarkup}
          <span class="video-loc-pill"><i class="fa-solid fa-location-dot text-gold"></i> ${v.location || 'القاهرة'}</span>
          <div class="video-play-btn-circle" aria-label="تشغيل الفيديو">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        ${dualTabsMarkup}
        <div class="video-details-body">
          <div>
            <h4>${v.title}</h4>
            <p>${v.description || 'فيديو حي من موقع العمل يوضح خطوات التنفيذ بدقة متناهية.'}</p>
          </div>
          <div class="video-card-foot">
            <span class="video-watch-link play-trigger-btn">
              <i class="fa-solid fa-circle-play"></i>
              <span>${isDual ? 'مشاهدة فيديوهات قبل وبعد' : 'مشاهدة الفيديو'}</span>
            </span>
            <a href="https://wa.me/201144867114?text=${encodeURIComponent('السلام عليكم يا بشمهندس وائل، شفت فيديو: ' + v.title + ' ومحتاج استفسر')}" target="_blank" class="video-wa-link">
              <i class="fa-brands fa-whatsapp"></i>
              <span>طلب معاينة</span>
            </a>
          </div>
        </div>
      `;

      if (isDual) {
        card.querySelectorAll('.btn-dual-card-tab').forEach((tabBtn) => {
          tabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const which = tabBtn.getAttribute('data-which');
            card.querySelectorAll('.btn-dual-card-tab').forEach(b => b.classList.remove('active'));
            tabBtn.classList.add('active');
            const wrap = card.querySelector('.video-thumb-wrap');
            if (wrap) wrap.setAttribute('data-active-video', which);
          });
        });
      }

      grid.appendChild(card);
    }

    // Videos 6x6 Pagination
    let videosVisibleCount = 6;
    const VIDEOS_PAGE_SIZE = 6;
    const videosLoadMoreWrap = document.getElementById('videosLoadMoreWrap');
    const loadMoreVideosBtn = document.getElementById('loadMoreVideosBtn');

    function updateVideosPagination() {
      const cards = Array.from(grid.querySelectorAll('.video-card'));
      const total = cards.length;

      cards.forEach((card, index) => {
        if (index < videosVisibleCount) {
          card.classList.remove('paged-hidden');
        } else {
          card.classList.add('paged-hidden');
        }
      });

      if (!videosLoadMoreWrap || !loadMoreVideosBtn) return;

      if (total <= VIDEOS_PAGE_SIZE) {
        videosLoadMoreWrap.style.display = 'none';
      } else {
        videosLoadMoreWrap.style.display = 'flex';
        const textSpan = loadMoreVideosBtn.querySelector('span');
        const icon = loadMoreVideosBtn.querySelector('i:last-child');

        if (videosVisibleCount < total) {
          loadMoreVideosBtn.setAttribute('data-action', 'more');
          loadMoreVideosBtn.classList.remove('is-expanded');
          loadMoreVideosBtn.setAttribute('aria-expanded', 'false');
          if (textSpan) textSpan.textContent = 'عرض المزيد من الفيديوهات';
          if (icon) icon.className = 'fa-solid fa-chevron-down';
        } else {
          loadMoreVideosBtn.setAttribute('data-action', 'less');
          loadMoreVideosBtn.classList.add('is-expanded');
          loadMoreVideosBtn.setAttribute('aria-expanded', 'true');
          if (textSpan) textSpan.textContent = 'عرض فيديوهات أقل';
          if (icon) icon.className = 'fa-solid fa-chevron-up';
        }
      }
    }

    if (loadMoreVideosBtn && !loadMoreVideosBtn.dataset.bound) {
      loadMoreVideosBtn.dataset.bound = 'true';
      loadMoreVideosBtn.addEventListener('click', () => {
        const action = loadMoreVideosBtn.getAttribute('data-action') || 'more';
        if (action === 'more') {
          videosVisibleCount += VIDEOS_PAGE_SIZE;
          updateVideosPagination();
        } else {
          videosVisibleCount = VIDEOS_PAGE_SIZE;
          updateVideosPagination();
          const vSec = document.getElementById('videos');
          if (vSec) vSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    updateVideosPagination();

    // Modal elements
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const playerContainer = document.getElementById('videoPlayerContainer');
    const modalTitle = document.getElementById('videoModalTitle');
    const modalDesc = document.getElementById('videoModalDesc');
    const modalTag = document.getElementById('videoModalTag');
    const modalLoc = document.getElementById('videoModalLoc');
    const modalWaBtn = document.getElementById('videoModalWaBtn');
    const modalDualSwitcher = document.getElementById('videoModalDualSwitcher');
    const modalBtnBefore = document.getElementById('modalBtnBefore');
    const modalBtnAfter = document.getElementById('modalBtnAfter');

    async function renderModalPlayerSource(url, type, title) {
      if (!playerContainer) return;
      if (!url) {
        playerContainer.innerHTML = '<p style="color:#fff;text-align:center;padding:40px;">رابط الفيديو غير متوفر</p>';
        return;
      }

      let playUrl = url;
      if (url.startsWith('indexeddb:') && typeof SiteData !== 'undefined' && typeof SiteData.getMediaObjectUrl === 'function') {
        const resolved = await SiteData.getMediaObjectUrl(url);
        if (resolved) playUrl = resolved;
      }

      // External direct link button
      const directBtn = document.getElementById('videoModalDirectBtn');
      if (directBtn) {
        const ytMatch = playUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i);
        if (ytMatch && ytMatch[1]) {
          directBtn.innerHTML = '<i class="fa-brands fa-youtube" style="color:#ef4444;"></i> <span>مشاهدة على يوتيوب مباشرة ↗</span>';
          directBtn.href = `https://www.youtube.com/watch?v=${ytMatch[1]}`;
          directBtn.style.display = 'inline-flex';
        } else if (type === 'social') {
          directBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> <span>مشاهدة الفيديو في التطبيق ↗</span>';
          directBtn.href = playUrl;
          directBtn.style.display = 'inline-flex';
        } else {
          directBtn.style.display = 'none';
        }
      }

      const isYouTube = playUrl.includes('youtube.com') || playUrl.includes('youtu.be');
      const isYouTubeShorts = isYouTube && playUrl.includes('/shorts/');
      const isFacebook = type === 'facebook' || playUrl.includes('facebook.com') || playUrl.includes('fb.watch');
      const isTikTok = type === 'tiktok' || playUrl.includes('tiktok.com');
      const isInstagram = type === 'instagram' || playUrl.includes('instagram.com');
      const isSocial = type === 'social' || isFacebook || isTikTok || isInstagram;
      const isDirectVideo = !isYouTube && !isSocial;

      // Smart Vertical Aspect Ratio Detection (Reels, TikTok, Instagram, Shorts, Facebook)
      const isVertical = isYouTubeShorts || isTikTok || isInstagram || isFacebook;

      // Update external watch button
      if (directBtn) {
        if (isYouTube) {
          const ytMatch = playUrl.match(/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([a-zA-Z0-9_-]+)/i);
          const ytId = ytMatch ? ytMatch[1] : '';
          directBtn.innerHTML = '<i class="fa-brands fa-youtube" style="color:#ef4444;"></i> <span>مشاهدة على يوتيوب ↗</span>';
          directBtn.href = ytId ? `https://www.youtube.com/watch?v=${ytId}` : playUrl;
          directBtn.style.display = 'inline-flex';
        } else if (isFacebook) {
          directBtn.innerHTML = '<i class="fa-brands fa-facebook" style="color:#1877f2;"></i> <span>مشاهدة على فيسبوك ↗</span>';
          directBtn.href = playUrl;
          directBtn.style.display = 'inline-flex';
        } else if (isInstagram) {
          directBtn.innerHTML = '<i class="fa-brands fa-instagram" style="color:#e1306c;"></i> <span>مشاهدة على إنستغرام ↗</span>';
          directBtn.href = playUrl;
          directBtn.style.display = 'inline-flex';
        } else if (isTikTok) {
          directBtn.innerHTML = '<i class="fa-brands fa-tiktok" style="color:#25f4ee;"></i> <span>مشاهدة على تيك توك ↗</span>';
          directBtn.href = playUrl;
          directBtn.style.display = 'inline-flex';
        } else if (isSocial) {
          directBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> <span>مشاهدة الفيديو في التطبيق ↗</span>';
          directBtn.href = playUrl;
          directBtn.style.display = 'inline-flex';
        } else {
          directBtn.style.display = 'none';
        }
      }

      if (isDirectVideo) {
        playerContainer.innerHTML = `
          <div class="${isVertical ? 'cinema-reel-viewport' : 'direct-video-player-wrap'}" style="width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:center;">
            <video 
              id="activeModalDirectVideo" 
              src="${playUrl}" 
              controls 
              autoplay 
              playsinline 
              webkit-playsinline 
              preload="metadata" 
              style="width:100%;height:100%;background:#000;object-fit:contain;margin:0 auto;display:block;">
              <source src="${playUrl}">
              متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.
            </video>
            <div id="videoErrorFallback" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.96);flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;color:#fff;z-index:10;">
              <i class="fa-solid fa-play-circle" style="font-size:3rem;color:#38bdf8;margin-bottom:14px;"></i>
              <p style="font-weight:800;font-size:1.15rem;margin-bottom:8px;">فيديو العمل جاهز للمشاهدة</p>
              <p style="font-size:0.88rem;color:#94a3b8;margin-bottom:18px;max-width:380px;line-height:1.5;">تم تسجيل الفيديو بجودة وتنسيق الهاتف. اضغط بالأسفل لفتحه فوراً في مشغل هاتفك:</p>
              <a href="${playUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-giant" style="display:inline-flex;padding:12px 24px;background:#0284c7;color:#fff;font-weight:700;border-radius:10px;text-decoration:none;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>فتح وتشغيل الفيديو في الهاتف 🎬</span>
              </a>
            </div>
          </div>
        `;

        const vEl = document.getElementById('activeModalDirectVideo');
        const vFallback = document.getElementById('videoErrorFallback');
        if (vEl) {
          vEl.onerror = () => {
            if (vFallback) vFallback.style.display = 'flex';
          };
          const playPromise = vEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
      } else if (isFacebook) {
        const fbEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(playUrl)}&show_text=false&autoplay=false`;
        playerContainer.innerHTML = `
          <div class="cinema-reel-viewport">
            <iframe 
              src="${fbEmbedUrl}" 
              class="cinema-reel-iframe" 
              scrolling="no" 
              frameborder="0" 
              allowfullscreen="true" 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen">
            </iframe>
          </div>
        `;
      } else if (isInstagram) {
        const instaMatch = playUrl.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
        const instaCode = instaMatch && instaMatch[1];
        const instaEmbedUrl = instaCode ? `https://www.instagram.com/reel/${instaCode}/embed/` : playUrl;
        playerContainer.innerHTML = `
          <div class="cinema-reel-viewport">
            <iframe 
              src="${instaEmbedUrl}" 
              class="cinema-reel-iframe" 
              scrolling="no" 
              frameborder="0" 
              allowfullscreen="true">
            </iframe>
          </div>
        `;
      } else if (isTikTok) {
        const tiktokIdMatch = playUrl.match(/tiktok\.com\/(?:@[\w.-]+\/video\/|v\/)(\d+)/i);
        const tiktokId = tiktokIdMatch && tiktokIdMatch[1];
        const tiktokEmbedUrl = tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : '';
        playerContainer.innerHTML = tiktokEmbedUrl ? `
          <div class="cinema-reel-viewport">
            <iframe 
              src="${tiktokEmbedUrl}" 
              class="cinema-reel-iframe" 
              scrolling="no" 
              frameborder="0" 
              allowfullscreen="true">
            </iframe>
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;padding:24px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:14px;border:1.5px solid #25f4ee;box-shadow:0 0 16px rgba(37,244,238,0.3);">
              <i class="fa-brands fa-tiktok" style="font-size:2rem;color:#25f4ee;"></i>
            </div>
            <p style="font-size:1.1rem;font-weight:800;margin-bottom:6px;color:#fff;">فيديو تيك توك من موقع العمل 🎬</p>
            <p style="font-size:0.84rem;color:#94a3b8;margin-bottom:18px;max-width:320px;line-height:1.5;">اضغط بالأسفل للمشاهدة بالصوت الكامل في تطبيق تيك توك:</p>
            <a href="${playUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#010101;border:1.5px solid #25f4ee;color:#fff;font-weight:700;border-radius:10px;text-decoration:none;box-shadow:0 4px 14px rgba(37,244,238,0.25);">
              <i class="fa-brands fa-tiktok" style="color:#25f4ee;"></i>
              <span>فتح وتشغيل في تيك توك ↗</span>
            </a>
          </div>
        `;
      } else if (type === 'social') {
        playerContainer.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;padding:24px;text-align:center;">
            <p style="font-size:1.1rem;font-weight:700;margin-bottom:14px;">هذا الفيديو مستضاف على منصات التواصل الاجتماعي</p>
            <a href="${playUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-giant" style="display:inline-flex;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
              <span>فتح ومشاهدة الفيديو في التطبيق ↗</span>
            </a>
          </div>
        `;
      } else {
        playerContainer.innerHTML = `
          <iframe 
            src="${playUrl}" 
            title="${title || ''}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen 
            style="width:100%;max-width:${isVertical ? '420px' : '100%'};height:100%;border:none;display:block;margin:0 auto;background:#000;">
          </iframe>
        `;
      }
    }

    async function switchModalDualTab(which) {
      if (!currentModalVideoState) return;
      if (which === 'before') {
        if (modalBtnBefore) modalBtnBefore.classList.add('active');
        if (modalBtnAfter) modalBtnAfter.classList.remove('active');
        const targetUrl = currentModalVideoState.urlBefore || currentModalVideoState.vUrl;
        await renderModalPlayerSource(targetUrl, currentModalVideoState.typeBefore, currentModalVideoState.title + ' (قبل العمل)');
      } else {
        if (modalBtnAfter) modalBtnAfter.classList.add('active');
        if (modalBtnBefore) modalBtnBefore.classList.remove('active');
        const targetUrl = currentModalVideoState.urlAfter || currentModalVideoState.vUrl;
        await renderModalPlayerSource(targetUrl, currentModalVideoState.typeAfter, currentModalVideoState.title + ' (بعد التشطيب)');
      }
    }

    if (modalBtnBefore) {
      modalBtnBefore.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        switchModalDualTab('before');
      };
    }

    if (modalBtnAfter) {
      modalBtnAfter.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        switchModalDualTab('after');
      };
    }

    window.switchModalDualTab = switchModalDualTab;

    async function openVideo(vUrl, vType, title, desc, tag, loc, hasDual = false, urlBefore = '', urlAfter = '', initialTab = 'before', typeBefore = 'mp4', typeAfter = 'mp4') {
      if (!videoModal || !playerContainer) return;

      currentModalVideoState = {
        hasDual,
        urlBefore: urlBefore || vUrl,
        typeBefore: typeBefore || vType || 'mp4',
        urlAfter: urlAfter || vUrl,
        typeAfter: typeAfter || vType || 'mp4',
        vUrl,
        vType,
        title,
        desc,
        tag,
        loc
      };

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalTag) modalTag.textContent = tag;
      if (modalLoc && modalLoc.querySelector('span')) modalLoc.querySelector('span').textContent = loc;
      if (modalWaBtn) {
        modalWaBtn.href = `https://wa.me/201144867114?text=${encodeURIComponent('السلام عليكم يا بشمهندس وائل، شفت فيديو (' + title + ') وعايز استفسر عن نفس الشغل')}`;
      }

      // 1. Activate modal and lock scroll
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (hasDual && modalDualSwitcher) {
        modalDualSwitcher.style.display = 'flex';
        if (initialTab === 'after' && urlAfter) {
          await switchModalDualTab('after');
        } else {
          await switchModalDualTab('before');
        }
      } else {
        if (modalDualSwitcher) modalDualSwitcher.style.display = 'none';
        await renderModalPlayerSource(vUrl, vType, title);
      }
    }

    window.openVideoModal = openVideo;

    function closeVideo() {
      if (!videoModal || !playerContainer) return;
      videoModal.classList.remove('active');
      const modalBox = document.querySelector('.video-modal-box');
      if (modalBox) modalBox.classList.remove('is-vertical-player');
      playerContainer.classList.remove('is-vertical-player');
      const vEl = playerContainer.querySelector('video');
      if (vEl) {
        try { vEl.pause(); vEl.src = ''; } catch(e) {}
      }
      playerContainer.innerHTML = '';
      document.body.style.overflow = '';
    }

    // Attach click events on video cards
    grid.querySelectorAll('.video-thumb-wrap, .play-trigger-btn').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const wrap = trigger.classList.contains('video-thumb-wrap')
          ? trigger
          : trigger.closest('.video-card').querySelector('.video-thumb-wrap');
        if (!wrap) return;

        const vUrl = wrap.getAttribute('data-video-url');
        const vType = wrap.getAttribute('data-video-type');
        const title = wrap.getAttribute('data-title');
        const desc = wrap.getAttribute('data-desc');
        const tag = wrap.getAttribute('data-tag');
        const loc = wrap.getAttribute('data-loc');
        const hasDual = wrap.getAttribute('data-has-dual') === 'true';
        const urlBefore = wrap.getAttribute('data-video-before');
        const urlAfter = wrap.getAttribute('data-video-after');
        const typeBefore = wrap.getAttribute('data-type-before') || vType;
        const typeAfter = wrap.getAttribute('data-type-after') || vType;
        const activeTab = wrap.getAttribute('data-active-video') || 'before';

        openVideo(vUrl, vType, title, desc, tag, loc, hasDual, urlBefore, urlAfter, activeTab, typeBefore, typeAfter);
      });
    });

    if (closeVideoModal && !closeVideoModal.dataset.bound) {
      closeVideoModal.dataset.bound = 'true';
      closeVideoModal.addEventListener('click', closeVideo);
    }

    if (videoModal && !videoModal.dataset.bound) {
      videoModal.dataset.bound = 'true';
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideo();
      });
    }

    if (!window._videoEscBound) {
      window._videoEscBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
          closeVideo();
        }
      });
    }
  }
  initVideoShowcase();

  // Listen to live video changes from Boss Dashboard in real time
  window.addEventListener('alawael_videos_changed', initVideoShowcase);
  window.addEventListener('storage', (e) => {
    if (e.key === 'alawael_videos_data') {
      initVideoShowcase();
    }
  });
  window.addEventListener('focus', initVideoShowcase);

  // Helper for escaping HTML attributes
  function escapeChoiceHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================================================
  // DYNAMIC CUSTOM PHOTOS IN GALLERY
  // ==========================================================================
  async function initCustomPhotos() {
    if (typeof SiteData === 'undefined') return;
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Remove any previously injected custom cards to prevent duplicates on refresh
    galleryGrid.querySelectorAll('.custom-photo-card').forEach((c) => c.remove());

    const customPhotos = await SiteData.getCustomPhotos();
    if (!customPhotos || customPhotos.length === 0) return;

    // Prepend so newly uploaded projects appear first in the gallery
    [...customPhotos].reverse().forEach((p) => {
      const card = document.createElement('div');
      card.className = 'gallery-card custom-photo-card';
      card.setAttribute('data-category', p.category || 'luxury');
      const imagesList = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image_url ? [p.image_url] : []);
      if (imagesList.length > 1) {
        card.setAttribute('data-images', JSON.stringify(imagesList));
      }

      const safeTitle = escapeChoiceHtml(p.title || 'مشروع سباكة وتشطيب');
      const safeLoc = escapeChoiceHtml(p.location || 'القاهرة والجيزة');
      const safeDesc = escapeChoiceHtml(p.description || 'تنفيذ وإشراف هندسي متكامل بأيدي البشمهندس وائل وفريق شركة الأوائل.');
      const safeTag = escapeChoiceHtml(p.tag || 'إشراف البشمهندس وائل');
      const firstImg = imagesList[0] || p.image_url || '';

      card.innerHTML = `
        <div class="gallery-img-wrap">
          <img src="${firstImg}" alt="${safeTitle}" class="gallery-img" loading="lazy">
          <span class="gallery-badge"><i class="fa-solid fa-location-dot"></i> ${safeLoc}</span>
          <button class="gallery-zoom-btn" type="button" aria-label="عرض الصورة عالية الدقة" data-title="${safeTitle}" data-loc="${safeLoc}" data-desc="${safeDesc}" data-tags="${safeTag}">
            <i class="fa-solid fa-expand"></i>
          </button>
        </div>
        <div class="gallery-details">
          <div class="gallery-tags">
            <span class="gtag">${safeTag}</span>
          </div>
          <h4>${safeTitle}</h4>
          <p>${safeDesc}</p>
          <div class="gallery-foot">
            <span class="worker-note"><i class="fa-solid fa-user-check"></i> إشراف: البشمهندس وائل</span>
            <a href="https://wa.me/201144867114?text=${encodeURIComponent('عايز استفسر عن مشروع: ' + (p.title || ''))}" target="_blank" class="gallery-link">
              <span>طلب نفس الشغل</span>
              <i class="fa-solid fa-chevron-left"></i>
            </a>
          </div>
        </div>
      `;

      if (imagesList.length > 1) {
        setupCardGallerySlider(card, imagesList);
      } else {
        card._galleryImages = imagesList;
        card._currentImageIndex = 0;
      }

      // Prepend so the newest project is displayed at the top of the gallery
      galleryGrid.prepend(card);
    });

    if (typeof window.updateGalleryPagination === 'function') {
      window.updateGalleryPagination();
    }
  }

  // Initialize Custom Photos
  initCustomPhotos();

  // Listen to photo additions and deletions in real-time
  window.addEventListener('alawael_photos_changed', () => {
    initCustomPhotos();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'alawael_custom_photos') {
      initCustomPhotos();
    }
  });
  window.addEventListener('focus', () => {
    initCustomPhotos();
  });

  // ==========================================================================
  // FAQ ACCORDION LOGIC
  // ==========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((i) => {
          i.classList.remove('active');
          const b = i.querySelector('.faq-question');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
  initFaqAccordion();

  // ==========================================================================
  // REAL-TIME THEME & FONT SIZE LISTENER (SITE THEME ENGINE)
  // ==========================================================================
  if (typeof SiteData !== 'undefined' && SiteData.applyThemeSettings) {
    SiteData.applyThemeSettings();

    window.addEventListener('alawael_theme_changed', (e) => {
      if (e.detail) {
        SiteData.applyThemeSettings(e.detail);
      }
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'alawael_theme_settings') {
        SiteData.applyThemeSettings();
      }
    });
  }
});



