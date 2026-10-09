import { useRef } from 'react';
import './con6.css';

const asset = name => `/images/con6/${name}`;

const Con6 = () => {
    const dialogRef = useRef(null);

    return (
        <section className="con6" aria-labelledby="con6-title">
            <div className="con6__backdrop" aria-hidden="true">
                <img className="con6__hospital" src={asset('hospital.png')} alt="" loading="lazy" />
                <img className="con6__overlay" src={asset('background-overlay.png')} alt="" loading="lazy" />
                <div className="con6__canvas">
                    <img className="con6__panel" src={asset('panel.svg')} alt="" />
                    <img className="con6__left" src={asset('panel-left.svg')} alt="" />
                    <img className="con6__left-overlay" src={asset('panel-left-overlay.svg')} alt="" />
                    <img className="con6__glow" src={asset('glow.svg')} alt="" />
                    <img className="con6__divider" src={asset('divider.svg')} alt="" />
                    <img className="con6__handle" src={asset('divider-handle.svg')} alt="" />
                </div>
            </div>
            <div className="con6__content">
                <div className="con6__logo"><img src={asset('logo.svg')} alt="" /></div>
                <p className="con6__slogan">앞선 의학, 따뜻한 마음</p>
                <h2 id="con6-title"><span>H+</span>양지병원</h2>
                <p className="con6__description">정확한 진단과 세심한 진료로 건강한 일상을 함께합니다.</p>
                <button className="con6__button" type="button" onClick={() => dialogRef.current.showModal()} aria-haspopup="dialog" aria-controls="con6-introduction">
                    <img className="con6__button-background" src={asset('button-background.svg')} alt="" />
                    <span className="con6__button-label">병원 소개</span>
                    <img className="con6__button-circle" src={asset('button-circle.svg')} alt="" />
                    <img className="con6__button-circle con6__button-circle--hover" src={asset('button-circle-hover.svg')} alt="" />
                    <img className="con6__button-arrow" src={asset('button-arrow.svg')} alt="" />
                </button>
            </div>
            <div className="con6__graphic" aria-hidden="true">
                <div className="con6__graphic-canvas">
                    <img className="con6__circle" src={asset('medical-circle.svg')} alt="" />
                    <img className="con6__chart" src={asset('medical-chart.svg')} alt="" />
                    <img className="con6__dot" src={asset('medical-dot.svg')} alt="" />
                </div>
            </div>
            <dialog className="hero-dialog con6__dialog" id="con6-introduction" ref={dialogRef} aria-labelledby="con6-dialog-title" onClick={event => {
                if (event.target !== event.currentTarget) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
            }}>
                <button className="con6__dialog-close" type="button" aria-label="병원 소개 닫기" onClick={() => dialogRef.current.close()} autoFocus>×</button>
                <h2 id="con6-dialog-title">H+양지병원</h2>
                <p className="con6__intro-lead">Hope · Humanity · Healing</p>
                <section className="con6__intro-section" aria-labelledby="con6-mission">
                    <span className="con6__intro-label">Mission · 미션</span>
                    <h3 id="con6-mission">앞선 의학 · 따뜻한 마음</h3>
                    <p>앞선 의학으로 환자와 세상에 희망을 주고, 인간존중의 따뜻한 마음으로 세상을 치유하고 보다 건강하게 한다.</p>
                </section>
                <section className="con6__intro-section" aria-labelledby="con6-vision">
                    <span className="con6__intro-label">Vision · 비전</span>
                    <h3 id="con6-vision">세상에 행복을 더하는 혁신</h3>
                    <p>우리는 직원, 환자, 사회를 행복하게 하는 대한민국 최고의 혁신병원이 된다.</p>
                </section>
                <section className="con6__intro-section" aria-labelledby="con6-values">
                    <span className="con6__intro-label">Core Value · 핵심가치</span>
                    <h3 id="con6-values">Do the BEST</h3>
                    <dl className="con6__values">
                        <div><dt>Dream</dt><dd>직원 모두의 꿈이 이루어지는 병원</dd></div>
                        <div><dt>Ownership</dt><dd>직원 모두가 주인인 병원</dd></div>
                        <div><dt>Think creative</dt><dd>항상 창의적으로 혁신, 변화, 발전하는 병원</dd></div>
                        <div><dt>Happiness</dt><dd>직원, 고객, 사회 모두가 행복해지는 병원</dd></div>
                        <div><dt>Enjoy &amp; Fun</dt><dd>즐겁게 즐기면서 일하는 병원</dd></div>
                        <div><dt>BEST</dt><dd>누구에게나 최고로 인정받는 병원</dd></div>
                    </dl>
                </section>
                <form method="dialog"><button type="submit">닫기</button></form>
            </dialog>
        </section>
    );
};

export default Con6;
