import { useRef, useState } from 'react';
import { centers } from './centers';
import './con2.css';

const Con2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dialogRef = useRef(null);
    const center = centers[activeIndex];

    const selectCenter = (index) => {
        setActiveIndex(index);
        if (dialogRef.current.open) dialogRef.current.close();
    };

    const handleTabKeyDown = (event, index) => {
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % centers.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + centers.length) % centers.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = centers.length - 1;
        if (nextIndex === undefined) return;
        event.preventDefault();
        selectCenter(nextIndex);
        document.getElementById(`center-tab-${nextIndex + 1}`).focus();
    };

    return (
        <section className="con2" aria-labelledby="con2-title">
            <header className="con2__heading">
                <p>양지병원의 진료센터는 최상의 의료서비스를 제공합니다.</p>
                <h2 id="con2-title">양지병원 <strong>진료센터</strong></h2>
            </header>

            <div className="con2__menu">
                <div className="con2__tabs" role="tablist" aria-label="진료센터 선택">
                    {[centers.slice(0, 6), centers.slice(6)].map((row, rowIndex) => (
                        <div className={`con2__tab-row con2__tab-row--${rowIndex + 1}`} role="presentation" key={rowIndex}>
                            {row.map((item) => (
                                <button id={`center-tab-${item.id}`} key={item.id} type="button" role="tab" aria-selected={item.id === center.id} aria-controls="center-panel" tabIndex={item.id === center.id ? 0 : -1} onClick={() => selectCenter(item.id - 1)} onKeyDown={(event) => handleTabKeyDown(event, item.id - 1)}>{item.menu}</button>
                            ))}
                        </div>
                    ))}
                    <img className="con2__menu-line" src="/images/con2/menu-line.svg" alt="" />
                </div>
                <button className="con2__view-all" type="button" onClick={() => dialogRef.current.showModal()} aria-haspopup="dialog" aria-controls="center-directory">
                    <img className="con2__view-background" src="/images/con1/view-all.svg" alt="" />
                    <span className="con2__view-label">전체보기</span>
                    <img className="con2__view-circle" src="/images/con1/view-plus.svg" alt="" />
                    <img className="con2__view-circle con2__view-circle--hover" src="/images/con1/view-plus-hover.svg" alt="" />
                    <span className="con2__view-symbol" aria-hidden="true">+</span>
                </button>
            </div>

            <div className="con2__content">
                <article id="center-panel" className="con2__panel" role="tabpanel" aria-labelledby={`center-tab-${center.id}`} tabIndex={0}>
                    <div className="con2__information" style={{ '--center-gap': center.gap, '--center-title-size': center.titleSize }}>
                        <div className="con2__intro">
                            <h3>{center.title}</h3>
                            <p>{center.description}</p>
                        </div>
                        <div className="con2__details">
                            {center.details.map((segment, index) => (
                                <span key={index} style={{ '--segment-size': segment.size, '--segment-weight': segment.weight, '--segment-color': segment.color }}>{segment.text}</span>
                            ))}
                        </div>
                        <nav className="con2__counter" aria-label="진료센터 이동">
                            {activeIndex > 0 && <button className="con2__counter-previous" type="button" onClick={() => selectCenter(activeIndex - 1)} aria-label="이전 진료센터">−</button>}
                            <span className={`con2__position${activeIndex === 0 ? ' con2__position--first' : ''}`} aria-live="polite"><strong>{center.id}</strong> / {centers.length}</span>
                            {activeIndex < centers.length - 1 && <button className="con2__counter-next" type="button" onClick={() => selectCenter(activeIndex + 1)} aria-label="다음 진료센터">+</button>}
                        </nav>
                    </div>
                    <div className={`con2__photo${center.id === 1 ? ' con2__photo--digestive' : ''}`}>
                        <img key={center.id} src={center.image} alt={`${center.menu} 의료 현장`} />
                    </div>
                </article>
            </div>

            <dialog id="center-directory" className="con2__directory" ref={dialogRef} aria-labelledby="center-directory-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                <header className="con2__directory-heading">
                    <h3 id="center-directory-title">양지병원 진료센터</h3>
                    <form method="dialog"><button type="submit" aria-label="진료센터 전체보기 닫기">닫기</button></form>
                </header>
                <div className="con2__directory-grid">
                    {centers.map((item) => (
                        <button type="button" key={item.id} onClick={() => selectCenter(item.id - 1)}>
                            <img src={item.image} alt="" />
                            <span>{item.menu}</span>
                        </button>
                    ))}
                </div>
            </dialog>
        </section>
    );
};

export default Con2;

