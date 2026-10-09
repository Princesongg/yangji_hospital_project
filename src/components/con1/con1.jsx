import { useRef, useState } from 'react';
import DepartmentCard from './DepartmentCard';
import { departments } from './departments';
import './con1.css';

const pages = Array.from({ length: Math.ceil(departments.length / 10) }, (_, index) => departments.slice(index * 10, index * 10 + 10));
const mobilePages = Array.from({ length: Math.ceil(departments.length / 4) }, (_, index) => departments.slice(index * 4, index * 4 + 4));
const asset = (name) => `/images/con1/${name}`;

const Con1 = () => {
    const [activePage, setActivePage] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const viewportRef = useRef(null);
    const mobileViewportRef = useRef(null);
    const [mobilePage, setMobilePage] = useState(0);
    const dialogRef = useRef(null);

    const goToPage = (index) => {
        const pageIndex = (index + pages.length) % pages.length;
        const viewport = viewportRef.current;
        const page = viewport.children[pageIndex];
        viewport.scrollTo({ left: page.offsetLeft - viewport.children[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        setActivePage(pageIndex);
    };

    const handleScroll = () => {
        const viewport = viewportRef.current;
        const distance = viewport.children[1].offsetLeft - viewport.children[0].offsetLeft;
        setActivePage(Math.max(0, Math.min(pages.length - 1, Math.round(viewport.scrollLeft / distance))));
    };

    const selectDepartment = (department) => {
        setSelectedDepartment(department);
        dialogRef.current.showModal();
    };

    const toggleAll = () => {
        setShowAll(!showAll);
        setActivePage(0);
        setMobilePage(0);
    };

    const goToMobilePage = (index) => {
        const viewport = mobileViewportRef.current;
        const pageIndex = Math.max(0, Math.min(mobilePages.length - 1, index));
        viewport.scrollTo({ left: viewport.children[pageIndex].offsetLeft - viewport.children[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };

    const handleMobileScroll = () => {
        const viewport = mobileViewportRef.current;
        const distance = viewport.children[1].offsetLeft - viewport.children[0].offsetLeft;
        setMobilePage(Math.max(0, Math.min(mobilePages.length - 1, Math.round(viewport.scrollLeft / distance))));
    };

    return (
        <section className={`con1${showAll ? ' con1--expanded' : ''}`} aria-labelledby="con1-title">
            <header className="con1__heading">
                <p>에이치플러스 양지병원의 진료과를 소개합니다.</p>
                <h2 id="con1-title">양지병원 <strong>진료과</strong></h2>
            </header>
            <button className="con1__view-all" type="button" onClick={toggleAll} aria-expanded={showAll} aria-controls="department-list mobile-department-list">
                <img className="con1__view-background" src={asset('view-all.svg')} alt="" />
                <span className="con1__view-label">{showAll ? '접기' : '전체보기'}</span>
                <img className="con1__view-circle" src={asset('view-plus.svg')} alt="" />
                <img className="con1__view-circle con1__view-circle--hover" src={asset('view-plus-hover.svg')} alt="" />
                <span className="con1__view-symbol" aria-hidden="true">{showAll ? '−' : '+'}</span>
            </button>

            <div className="con1__mobile-content">
                {showAll ? <div id="mobile-department-list" className="con1__mobile-grid">
                    {departments.map(department => <DepartmentCard key={department.id} department={department} onSelect={selectDepartment} />)}
                </div> : <>
                    <div id="mobile-department-list" className="con1__mobile-viewport" ref={mobileViewportRef} onScroll={handleMobileScroll} tabIndex={0} aria-label="진료과 목록, 좌우로 넘겨보기" onKeyDown={event => {
                        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goToMobilePage(mobilePage + (event.key === 'ArrowRight' ? 1 : -1)); }
                    }}>
                        {mobilePages.map((page, index) => <div className="con1__mobile-page con1__mobile-grid" key={index} role="group" aria-label={`진료과 ${index + 1} / ${mobilePages.length} 페이지`} inert={index !== mobilePage}>
                            {page.map(department => <DepartmentCard key={department.id} department={department} onSelect={selectDepartment} />)}
                        </div>)}
                    </div>
                    <nav className="con1__mobile-pagination" aria-label="모바일 진료과 페이지 선택">
                        {mobilePages.map((_, index) => <button type="button" key={index} aria-label={`진료과 ${index + 1} 페이지`} aria-current={index === mobilePage ? 'page' : undefined} onClick={() => goToMobilePage(index)} />)}
                    </nav>
                    <p className="con1__mobile-hint" aria-live="polite">좌우로 넘겨보세요 · {mobilePage + 1} / {mobilePages.length}</p>
                </>}
            </div>
            {showAll ? (
                <div id="department-list" className="con1__all-grid">
                    {departments.map((department) => <DepartmentCard key={department.id} department={department} onSelect={selectDepartment} />)}
                </div>
            ) : (
                <>
                    <div id="department-list" className="con1__viewport" ref={viewportRef} onScroll={handleScroll} aria-label="진료과 목록" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goToPage(activePage + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
                        {pages.map((page, index) => (
                            <div className="con1__page" key={index} role="group" aria-label={`진료과 ${index + 1} / ${pages.length} 페이지`} inert={index !== activePage}>
                                {page.map((department) => <DepartmentCard key={department.id} department={department} onSelect={selectDepartment} />)}
                            </div>
                        ))}
                    </div>
                    <div className="con1__arrows">
                        <img className="con1__arrow-image" src={asset('arrows.svg')} alt="" />
                        <button type="button" className="con1__previous" onClick={() => goToPage(activePage - 1)} aria-label="이전 진료과 페이지" aria-controls="department-list"><img className="con1__mobile-arrow" src={asset('arrows.svg')} alt="" /></button>
                        <button type="button" className="con1__next" onClick={() => goToPage(activePage + 1)} aria-label="다음 진료과 페이지" aria-controls="department-list"><img className="con1__mobile-arrow" src={asset('arrows.svg')} alt="" /></button>
                    </div>
                    <nav className="con1__pagination" aria-label="진료과 페이지 선택">
                        {pages.map((_, index) => (
                            <button type="button" key={index} onClick={() => goToPage(index)} aria-label={`진료과 ${index + 1} 페이지`} aria-current={index === activePage ? 'page' : undefined}>
                                <img src={asset(index === activePage ? 'pagination-on.svg' : 'pagination-off.svg')} alt="" />
                            </button>
                        ))}
                    </nav>
                    <p className="con1__sr-only" aria-live="polite">진료과 {activePage + 1} / {pages.length} 페이지</p>
                </>
            )}

            <dialog className="con1__dialog" ref={dialogRef} aria-labelledby="department-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                <h3 id="department-dialog-title">{selectedDepartment?.name.replaceAll('\n', '')}</h3>
                <p>진료과 상세 안내는 준비 중입니다.</p>
                <form method="dialog"><button autoFocus>확인</button></form>
            </dialog>
        </section>
    );
};

export default Con1;


