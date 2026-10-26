/* Page interactions: department pagination and medical center tabs. */
(() => {
    'use strict';
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const templateNode = (id, selector) => $(selector, $(`#${id}`).content).cloneNode(true);
    const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    const originalDepartments = $('.con1').cloneNode(true);
    let centerIndex = 0;

    const header = $('.hero-header');
    const hoverHeader = matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
    let headerHeight = header.offsetHeight;
    let pointerY = Infinity;
    let headerRevealed = false;
    let keyboardNavigation = true;

    function syncHeader() {
        if (pointerY <= 24) headerRevealed = true;
        else if (pointerY > headerHeight + 12) headerRevealed = false;
        const keyboardFocus = keyboardNavigation && header.contains(document.activeElement);
        const hidden = hoverHeader.matches && window.scrollY > headerHeight
            && !headerRevealed && !keyboardFocus;
        header.classList.toggle('hero-header--hidden', hidden);
    }
    window.addEventListener('scroll', syncHeader, { passive: true });
    document.addEventListener('pointerdown', event => {
        keyboardNavigation = false;
        pointerY = event.clientY;
        syncHeader();
    }, { passive: true });
    document.addEventListener('keydown', () => {
        keyboardNavigation = true;
        syncHeader();
    });
    document.addEventListener('pointermove', event => {
        if (!hoverHeader.matches || event.pointerType !== 'mouse') return;
        pointerY = event.clientY;
        syncHeader();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => {
        pointerY = Infinity;
        syncHeader();
    });
    header.addEventListener('focusin', syncHeader);
    header.addEventListener('focusout', () => queueMicrotask(syncHeader));
    window.addEventListener('resize', () => {
        headerHeight = header.offsetHeight;
        syncHeader();
    });
    hoverHeader.addEventListener('change', syncHeader);
    syncHeader();

    const quickMenu = $('.quick-menu');
    const quickToggle = $('.quick-menu__toggle', quickMenu);
    const quickPanel = $('.quick-menu__panel', quickMenu);
    const compactQuickMenu = matchMedia('(max-width: 900px)');

    function setQuickMenu(open, restoreFocus = false) {
        const expanded = compactQuickMenu.matches && open;
        quickMenu.classList.toggle('quick-menu--open', expanded);
        quickToggle.setAttribute('aria-expanded', String(expanded));
        quickToggle.setAttribute('aria-label', `빠른 서비스 메뉴 ${expanded ? '닫기' : '열기'}`);
        quickPanel.inert = compactQuickMenu.matches && !expanded;
        if (restoreFocus) quickToggle.focus();
    }
    quickToggle.addEventListener('click', () => {
        setQuickMenu(quickToggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('pointerdown', event => {
        if (!quickMenu.contains(event.target)) setQuickMenu(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && quickToggle.getAttribute('aria-expanded') === 'true') {
            setQuickMenu(false, true);
        }
    });
    quickMenu.addEventListener('focusout', event => {
        if (!quickMenu.contains(event.relatedTarget)) setQuickMenu(false);
    });
    compactQuickMenu.addEventListener('change', () => setQuickMenu(false));
    setQuickMenu(false);

    function selectCenter(index) {
        centerIndex = Math.max(0, Math.min(11, index));
        const source = $(`#center-${centerIndex}`).content;
        $('#center-panel').replaceWith($('#center-panel', source).cloneNode(true));
        $$('.con2__tabs [role="tab"]').forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === centerIndex));
            tab.tabIndex = i === centerIndex ? 0 : -1;
        });
    }
    function page(viewport, index, wrap = false) {
        const pages = [...viewport.children];
        const next = wrap ? (index + pages.length) % pages.length : Math.max(0, Math.min(pages.length - 1, index));
        viewport.scrollTo({ left: pages[next].offsetLeft - pages[0].offsetLeft, behavior: motion() });
    }
    function syncPages(viewport) {
        const mobile = viewport.classList.contains('con1__mobile-viewport');
        const children = [...viewport.children];
        const distance = children[1]?.offsetLeft - children[0].offsetLeft;
        const index = distance ? Math.max(0, Math.min(children.length - 1, Math.round(viewport.scrollLeft / distance))) : 0;
        viewport.dataset.page = String(index);
        children.forEach((child, i) => { child.inert = i !== index; });
        $$(mobile ? '.con1__mobile-pagination button' : '.con1__pagination button').forEach((button, i) => {
            if (i === index) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
            const image = $('img', button);
            if (image) image.src = `images/con1/pagination-${i === index ? 'on' : 'off'}.svg`;
        });
        $(mobile ? '.con1__mobile-hint' : '.con1__sr-only').textContent = `${mobile ? '좌우로 넘겨보세요 ·' : '진료과'} ${index + 1} / ${children.length}${mobile ? '' : ' 페이지'}`;
    }
    document.addEventListener('scroll', event => {
        if (event.target.matches?.('.con1__viewport, .con1__mobile-viewport')) syncPages(event.target);
    }, true);
    document.addEventListener('click', event => {
        const target = event.target.closest('button, a');
        if (!target) return;
        if (target.matches('.con1__view-all')) {
            const expanded = $('.con1').classList.contains('con1--expanded');
            $('.con1').replaceWith(expanded ? originalDepartments.cloneNode(true) : templateNode('departments-expanded', '.con1'));
            $('.con1__view-all').focus();
            return;
        }
        if (target.matches('.con1__previous, .con1__next')) {
            const viewport = $('.con1__viewport');
            return page(viewport, Number(viewport.dataset.page || 0) + (target.matches('.con1__next') ? 1 : -1), true);
        }
        if (target.matches('.con1__pagination button, .con1__mobile-pagination button')) {
            const mobile = Boolean(target.closest('.con1__mobile-pagination'));
            return page($(mobile ? '.con1__mobile-viewport' : '.con1__viewport'), [...target.parentElement.children].indexOf(target));
        }
        if (target.matches('.con2__tabs button')) return selectCenter(Number(target.id.replace('center-tab-', '')) - 1);
        if (target.matches('.con2__counter-previous, .con2__counter-next')) return selectCenter(centerIndex + (target.matches('.con2__counter-next') ? 1 : -1));
        if (target.matches('.con2__mobile-card')) return selectCenter($$('.con2__mobile-card').indexOf(target));
        if (target.matches('.quick-menu__top')) return window.scrollTo({ top: 0, behavior: motion() });
    });
    document.addEventListener('keydown', event => {
        const tab = event.target.closest('.con2__tabs [role="tab"]');
        if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            selectCenter(event.key === 'Home' ? 0 : event.key === 'End' ? 11 : (centerIndex + (event.key === 'ArrowRight' ? 1 : 11)) % 12);
            $(`#center-tab-${centerIndex + 1}`).focus();
        }
        const viewport = event.target.closest('.con1__viewport, .con1__mobile-viewport');
        if (viewport && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            page(viewport, Number(viewport.dataset.page || 0) + (event.key === 'ArrowRight' ? 1 : -1), viewport.classList.contains('con1__viewport'));
        }
    });
    document.addEventListener('submit', event => {
        if (event.target.matches('.hero-search')) event.preventDefault();
    });
})();
