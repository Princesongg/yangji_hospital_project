/* 일반 HTML에서 사용하는 화면 동작. React나 빌드 도구가 필요하지 않습니다. */
(() => {
    'use strict';
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const templateNode = (id, selector) => $(selector, $(`#${id}`).content).cloneNode(true);
    const open = dialog => { if (!dialog.open) dialog.showModal(); dialog.scrollTop = 0; };
    const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    const originalDepartments = $('.con1').cloneNode(true);
    const newsDirectory = $('.con5__dialog').innerHTML;
    let centerIndex = 0;

    function notice(title, description = '이 안내 페이지는 준비 중입니다.') {
        const dialog = $('.hero-dialog');
        $('h2', dialog).textContent = title;
        $('p', dialog).textContent = description;
        open(dialog);
    }
    function service(name) {
        const dialog = $('.hero-service-dialog');
        const content = templateNode(`service-${name}`, 'dialog');
        dialog.innerHTML = content.innerHTML;
        dialog.setAttribute('aria-labelledby', $('h2', dialog).id);
        dialog.setAttribute('aria-describedby', $('.hero-service-dialog__header p', dialog).id);
        open(dialog);
    }
    function selectCenter(index) {
        centerIndex = Math.max(0, Math.min(11, index));
        const source = $(`#center-${centerIndex}`).content;
        $('#center-panel').replaceWith($('#center-panel', source).cloneNode(true));
        $('#center-mobile-detail').innerHTML = $('#center-mobile-detail', source).innerHTML;
        $$('.con2__tabs [role="tab"]').forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === centerIndex));
            tab.tabIndex = i === centerIndex ? 0 : -1;
        });
        $('#center-directory').close();
    }
    function news(index) {
        const dialog = $('.con5__dialog');
        dialog.innerHTML = index == null ? newsDirectory : templateNode(`news-${index}`, '.con5__dialog').innerHTML;
        open(dialog);
    }
    function quick(icon) {
        const dialog = $('.quick-dialog');
        dialog.innerHTML = templateNode(`quick-${icon}`, '.quick-dialog').innerHTML;
        open(dialog);
    }
    function help(show) {
        const container = $('.mobile-help');
        if (show) container.innerHTML = templateNode('mobile-help', '.mobile-help').innerHTML;
        else {
            $('.mobile-help__backdrop', container)?.remove();
            $('.mobile-help__panel', container)?.remove();
            const trigger = $('.mobile-help__trigger', container);
            trigger.setAttribute('aria-expanded', 'false');
            trigger.innerHTML = '<span aria-hidden="true">?</span>도움이 필요하세요?';
        }
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
        const target = event.target.closest('button, a, dialog');
        if (!target) return;
        if (target.matches('dialog') && event.target === target) {
            const bounds = target.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) target.close();
            return;
        }
        if (target.matches('.hero-service-dialog__close, .quick-dialog__close, .con6__dialog-close, .con7__dialog-heading button, .hero-mobile-navigation header button')) return target.closest('dialog').close();
        if (target.matches('.hero-header__nav button, .hero-header__account button')) return notice(target.textContent.trim());
        if (target.matches('.hero-emergency')) return notice('응급진료 안내');
        if (target.matches('.hero-mobile-menu')) return open($('.hero-mobile-navigation'));
        if (target.matches('.hero-mobile-navigation nav a')) return $('.hero-mobile-navigation').close();
        if (target.matches('.hero-mobile-navigation nav button')) {
            $('.hero-mobile-navigation').close();
            return service(target.textContent.includes('예약') ? 'reservation' : 'location');
        }
        if (target.matches('.hero-service')) return service(['reservation', 'certificate', 'checkup', 'location'][$$('.hero-service').indexOf(target)]);
        if (target.matches('.con1__view-all')) {
            const expanded = $('.con1').classList.contains('con1--expanded');
            $('.con1').replaceWith(expanded ? originalDepartments.cloneNode(true) : templateNode('departments-expanded', '.con1'));
            $('.con1__view-all').focus();
            return;
        }
        if (target.matches('.department-card')) {
            const dialog = $('.con1__dialog');
            $('h3', dialog).textContent = $('.department-card__name', target).textContent.replaceAll('\n', '');
            return open(dialog);
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
        if (target.matches('.con2__view-all')) return open($('#center-directory'));
        if (target.matches('.con2__directory-grid button')) return selectCenter($$('.con2__directory-grid button').indexOf(target));
        if (target.matches('.con2__mobile-card')) { selectCenter($$('.con2__mobile-card').indexOf(target)); return open($('#center-mobile-detail')); }
        if (target.matches('.con5__view-all, .con5__back')) return news(null);
        if (target.matches('.con5__card')) return news($$('.con5__card').indexOf(target));
        if (target.matches('.con5__directory-card')) return news($$('.con5__directory-card').indexOf(target));
        if (target.matches('.con6__button')) return open($('#con6-introduction'));
        if (target.matches('.con7__card')) {
            const dialog = $('.con7__dialog');
            dialog.innerHTML = templateNode(`institution-${$$('.con7__card').indexOf(target)}`, '.con7__dialog').innerHTML;
            return open(dialog);
        }
        if (target.matches('.quick-menu__top')) return window.scrollTo({ top: 0, behavior: motion() });
        if (target.matches('button.quick-menu__item')) return quick(['phone', 'time', 'reservation'][$$('button.quick-menu__item').indexOf(target)]);
        if (target.matches('.mobile-help__trigger')) return help(target.getAttribute('aria-expanded') !== 'true');
        if (target.matches('.mobile-help__backdrop')) return help(false);
        if (target.matches('.mobile-help__links button')) {
            const reservation = target.textContent.includes('예약');
            help(false);
            return reservation ? service('reservation') : quick('phone');
        }
        if (target.matches('.mobile-help__links a')) help(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && $('.mobile-help__trigger').getAttribute('aria-expanded') === 'true') help(false);
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
        if (event.target.matches('.hero-search')) {
            event.preventDefault();
            const query = $('#hero-search-input').value.trim();
            if (query) notice('진료과 · 의료진 찾기', `“${query}” 검색 결과 안내는 준비 중입니다.`);
        }
        if (event.target.matches('.reservation-form')) {
            event.preventDefault();
            const fields = new FormData(event.target);
            const result = document.createElement('section');
            result.className = 'reservation-result';
            result.innerHTML = '<div class="reservation-result__heading"><h3 id="reservation-result-title">예약조회 결과</h3><span>예시 예약</span></div><p><strong></strong>님의 예시 진료 일정입니다.</p><dl><div><dt>예약번호</dt><dd></dd></div><div><dt>진료과</dt><dd>내과</dd></div><div><dt>진료일시</dt><dd>2026. 10. 20. · 오전 10:30</dd></div><div><dt>예약상태</dt><dd class="reservation-result__status">예약 완료 (예시)</dd></div></dl>';
            result.setAttribute('aria-labelledby', 'reservation-result-title');
            $('p strong', result).textContent = fields.get('name').trim();
            $('dd', result).textContent = fields.get('reservationNumber').trim() || 'YJ-DEMO-001';
            $('.quick-dialog [aria-live]').replaceChildren(result);
        }
    });
    document.addEventListener('input', event => {
        if (event.target.closest('.reservation-form')) $('.quick-dialog [aria-live]').replaceChildren();
    });
})();
