import { useRef, useState } from 'react';
import './QuickMenu.css';
import HeroServiceDialog from '../hero/HeroServiceDialog';

const menus = [
    { label: '전화번호', icon: 'phone', description: '궁금한 점이 있으시면 편하게 연락해 주세요.' },
    { label: '진료시간', icon: 'time', description: '방문 전 진료 일정을 확인해 주세요.' },
    { label: '예약조회', icon: 'reservation', description: '예약하신 진료 일정을 확인해 보세요.' },
    { label: '문의하기', icon: 'talk', href: 'https://pf.kakao.com/_pxijdM' },
];

export default function QuickMenu() {
    const dialogRef = useRef(null);
    const reservationDialogRef = useRef(null);
    const [helpOpen, setHelpOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [reservationResult, setReservationResult] = useState(null);

    const lookupReservation = (event) => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        setReservationResult({ name: fields.get('name').trim(), number: fields.get('reservationNumber').trim() });
    };

    const openMenu = (menu) => {
        setSelected(menu);
        setReservationResult(null);
        dialogRef.current.showModal();
    };

    return (
        <>
            <nav className="quick-menu" aria-label="빠른 서비스 메뉴">
                <button className="quick-menu__top" type="button" aria-label="페이지 맨 위로 이동" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
                    <img src="/images/quick-menu/top.svg" alt="" />
                    <span>TOP</span>
                </button>
                <div className="quick-menu__panel">
                    {menus.map(menu => menu.href ? (
                        <a className={`quick-menu__item quick-menu__item--${menu.icon}`} key={menu.icon} href={menu.href} target="_blank" rel="noopener noreferrer" aria-label="양지병원 공식 카카오톡 문의하기 (새 탭)">
                            <span className="quick-menu__icon" aria-hidden="true"><img src={`/images/quick-menu/${menu.icon}.svg`} alt="" /></span>
                            <span>{menu.label}</span>
                        </a>
                    ) : (
                        <button className={`quick-menu__item quick-menu__item--${menu.icon}`} key={menu.icon} type="button" onClick={() => openMenu(menu)}>
                            <span className="quick-menu__icon" aria-hidden="true"><img src={`/images/quick-menu/${menu.icon}.svg`} alt="" /></span>
                            <span>{menu.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
            <div className="mobile-help">
                {helpOpen && <>
                    <button className="mobile-help__backdrop" type="button" aria-label="도움창 닫기" onClick={() => setHelpOpen(false)} />
                    <section className="mobile-help__panel" id="mobile-help-panel" aria-labelledby="mobile-help-title">
                        <h2 id="mobile-help-title">무엇을 도와드릴까요?</h2>
                        <p>필요한 안내를 선택해 주세요.</p>
                        <nav className="mobile-help__links" aria-label="모바일 빠른 서비스">
                <button type="button" onClick={() => { setHelpOpen(false); reservationDialogRef.current.showModal(); }} aria-haspopup="dialog">
                    <img src="/images/quick-menu/reservation.svg" alt="" />
                    <span>진료예약</span>
                </button>
                <button type="button" onClick={() => { setHelpOpen(false); openMenu(menus[0]); }} aria-haspopup="dialog">
                    <img src="/images/quick-menu/phone.svg" alt="" />
                    <span>전화문의</span>
                </button>
                <a href={menus[3].href} target="_blank" rel="noopener noreferrer" aria-label="양지병원 카카오톡 문의 (새 탭)" onClick={() => setHelpOpen(false)}>
                    <img src="/images/quick-menu/talk.svg" alt="" />
                    <span>카카오톡</span>
                </a>
                        </nav>
                    </section>
                </>}
                <button className="mobile-help__trigger" type="button" aria-expanded={helpOpen} aria-controls="mobile-help-panel" onClick={() => setHelpOpen(!helpOpen)} onKeyDown={event => { if (event.key === 'Escape') setHelpOpen(false); }}><span aria-hidden="true">{helpOpen ? '×' : '?'}</span>{helpOpen ? '닫기' : '도움이 필요하세요?'}</button>
            </div>
            <HeroServiceDialog service="reservation" dialogRef={reservationDialogRef} />
            <dialog className="quick-dialog" ref={dialogRef} aria-labelledby="quick-menu-dialog-title" aria-describedby="quick-menu-dialog-description" onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                <button className="quick-dialog__close" type="button" aria-label="창 닫기" autoFocus onClick={() => dialogRef.current.close()}><span aria-hidden="true">×</span></button>
                <header className="quick-dialog__header">
                    <span className="quick-dialog__icon" aria-hidden="true">{selected && <img src={`/images/quick-menu/${selected.icon}.svg`} alt="" />}</span>
                    <span className="quick-dialog__brand">H+ YANGJI HOSPITAL</span>
                    <h2 id="quick-menu-dialog-title">{selected?.label}</h2>
                    <p id="quick-menu-dialog-description">{selected?.description}</p>
                </header>
                <div className="quick-dialog__body">
                    {selected?.icon === 'phone' && <>
                        <a className="quick-dialog__contact" href="tel:18778875"><span>진료예약 · 상담<strong>1877-8875</strong></span><span className="quick-dialog__badge">전화 연결</span></a>
                        <a className="quick-dialog__contact" href="tel:07046659119"><span>응급의료센터<strong>070-4665-9119</strong></span><span className="quick-dialog__badge">전화 연결</span></a>
                        <p className="quick-dialog__note">전화번호를 누르면 바로 연결됩니다.</p>
                    </>}
                    {selected?.icon === 'time' && <>
                        <div className="quick-dialog__info"><h3>외래 진료 안내</h3><p>진료과와 의료진에 따라 진료 일정이 다를 수 있습니다. 정확한 진료시간은 콜센터에서 확인해 주세요.</p></div>
                        <div className="quick-dialog__row"><span>응급의료센터</span><strong>24시간 응급진료</strong></div>
                        <a className="quick-dialog__action" href="tel:18778875">진료시간 전화 문의</a>
                    </>}
                    {selected?.icon === 'reservation' && <>
                        <div className="quick-dialog__demo"><span>체험용</span> 예시 정보를 입력하고 예약조회 화면을 체험해 보세요.</div>
                        <form className="reservation-form" onSubmit={lookupReservation} onChange={() => setReservationResult(null)}>
                            <label htmlFor="reservation-name">예약자 이름</label>
                            <input id="reservation-name" name="name" placeholder="예: 홍길동" required maxLength={30} pattern=".*\S.*" autoComplete="off" />
                            <label htmlFor="reservation-phone">연락처</label>
                            <input id="reservation-phone" name="phone" type="tel" inputMode="tel" placeholder="예: 010-1234-5678" required pattern="[0-9]{3}-?[0-9]{3,4}-?[0-9]{4}" title="010-1234-5678 또는 숫자만 입력해 주세요." maxLength={13} autoComplete="off" />
                            <label htmlFor="reservation-number">예약번호 <span>선택</span></label>
                            <input id="reservation-number" name="reservationNumber" placeholder="예: YJ-2026-001" maxLength={30} autoComplete="off" />
                            <button className="quick-dialog__action" type="submit">예약 조회하기</button>
                        </form>
                        <div aria-live="polite" aria-atomic="true">
                            {reservationResult && <section className="reservation-result" aria-labelledby="reservation-result-title">
                                <div className="reservation-result__heading"><h3 id="reservation-result-title">예약조회 결과</h3><span>예시 예약</span></div>
                                <p><strong>{reservationResult.name}</strong>님의 예시 진료 일정입니다.</p>
                                <dl>
                                    <div><dt>예약번호</dt><dd>{reservationResult.number || 'YJ-DEMO-001'}</dd></div>
                                    <div><dt>진료과</dt><dd>내과</dd></div>
                                    <div><dt>진료일시</dt><dd>2026. 10. 20. · 오전 10:30</dd></div>
                                    <div><dt>예약상태</dt><dd className="reservation-result__status">예약 완료 (예시)</dd></div>
                                </dl>
                            </section>}
                        </div>
                        <p className="quick-dialog__note">실제 예약과 연결되지 않으며 입력 내용은 전송·저장되지 않습니다.</p>
                        <a className="reservation-help" href="tel:18778875">실제 예약 문의 1877-8875</a>
                    </>}
                </div>
                <footer className="quick-dialog__footer">앞선 의학, 따뜻한 마음 <strong>에이치플러스 양지병원</strong></footer>
            </dialog>
        </>
    );
}
