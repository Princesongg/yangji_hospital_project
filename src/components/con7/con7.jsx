import { useRef, useState } from 'react';
import './con7.css';
import { mobileAsset, mobileAssets } from '../../mobile-assets';
const mobileInstitutionImages = { research: 'imgRectangle25', rehabilitation: 'imgRectangle26', nursing: 'imgRectangle27', hanoi: 'imgRectangle28' };

const institutions = [
    { name: 'H+ 의생명연구원', image: 'research.png', type: 'research', category: '의생명 연구 · 임상시험', summary: '2011년 임상연구센터로 시작해 2019년 의생명연구원으로 문을 열었습니다. 서울 관악구 신림동에서 임상시험과 의생명 연구를 수행하며, 비대학병원 최초로 기관생명윤리위원회(IRB) 평가·인증을 획득했습니다.', address: '서울시 관악구 남부순환로 186가길', website: 'https://hyjhbri.com/' },
    { name: 'H+ 재활자립병원', image: 'rehabilitation.png', type: 'rehabilitation', category: '재활치료 · 일상 복귀', summary: '2019년 4월부터 서울효천의료재단이 운영하는 서울 구로구의 재활병원입니다. 121병상 규모로, 뇌졸중·척수손상·근육병·뇌성마비 등 재활치료가 필요한 환자들을 위한 진료를 제공합니다.', address: '서울 구로구 공원로6가길 4', phone: '1577-2588', website: 'https://hplusrehab.com/' },
    { name: '강남구립 행복요양병원', image: 'nursing.png', type: 'nursing', category: '요양 · 돌봄', summary: '2025년 1월부터 서울효천의료재단이 수탁 운영하는 요양병원입니다. 서울 강남구 헌릉로에 위치하며, 307병상과 7층 건물 규모의 시설을 운영하고 있습니다.', address: '서울 강남구 헌릉로 590길 60', phone: '02-6053-2114', website: 'https://www.gangnamguhospital.kr/' },
    { name: 'H+ 메디컬센터 하노이', officialName: 'H+ 국제의료센터', image: 'hanoi.png', type: 'hanoi', category: '국제의료 · 건강검진', summary: '2024년 12월 베트남 하노이 롯데몰에 개원한 재단의 첫 해외 의료기관입니다. 건강검진센터와 폴리클리닉을 운영하며, 국제다학제진료와 한국·베트남 원격진료시스템을 도입했습니다.', address: '베트남 하노이 서호 롯데몰 오피스 빌딩 7·8층', phone: '+84 24-7306-9889', website: 'https://clinichplus.com/' },
];

const Con7 = () => {
    const dialogRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const openInstitution = (institution) => {
        setSelected(institution);
        dialogRef.current.showModal();
        dialogRef.current.scrollTop = 0;
    };
    return (
    <section className="con7" aria-labelledby="con7-title">
        <header className="con7__heading">
            <p>{'H+  I N T E R N A T I O N A L M E D I C A L '}</p>
            <h2 id="con7-title">서울효천<strong>의료재단</strong></h2>
        </header>
        <ul className="con7__institutions">
            {institutions.map(institution => (
                <li key={institution.type}>
                    <button type="button" className={`con7__card con7__card--${institution.type}`} onClick={() => openInstitution(institution)} aria-haspopup="dialog" aria-controls="con7-institution-dialog" aria-label={`${institution.name} 소개 보기`}>
                        <div className="con7__card-heading">
                            <p>에이치플러스 메디컬 그룹</p>
                            <h3>{institution.name}</h3>
                        </div>
                        <div className="con7__photo">
                            <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets[mobileInstitutionImages[institution.type]])} /><img src={`/images/con7/${institution.image}`} alt={institution.name} loading="lazy" /></picture>
                            <div className="con7__tint" aria-hidden="true" />
                        </div>
                        <div className="con7__foundation">
                            <span className="con7__symbol"><picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgGroup)} /><img src="/images/con7/foundation-symbol.svg" alt="" /></picture></span>
                            <p>서울효천의료재단</p>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
        <dialog className="con7__dialog" id="con7-institution-dialog" ref={dialogRef} aria-labelledby="con7-dialog-title" onClick={event => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
        }}>
            <div className="con7__dialog-heading">
                <span>H+ MEDICAL GROUP</span>
                <button type="button" autoFocus aria-label="기관 소개 창 닫기" onClick={() => dialogRef.current.close()}>×</button>
            </div>
            {selected && <>
                <div className={`con7__dialog-photo con7__card--${selected.type}`}>
                    <div className="con7__photo"><img src={`/images/con7/${selected.image}`} alt={`${selected.name} 전경`} /></div>
                </div>
                <div className="con7__dialog-body">
                    <span className="con7__category">{selected.category}</span>
                    <h2 id="con7-dialog-title">{selected.officialName || selected.name}</h2>
                    <p className="con7__dialog-summary">{selected.summary}</p>
                    <dl className="con7__details">
                        <div><dt>주소</dt><dd>{selected.address}</dd></div>
                        {selected.phone && <div><dt>대표번호</dt><dd><a href={`tel:${selected.phone.replace(/[^+\d]/g, '')}`}>{selected.phone}</a></dd></div>}
                    </dl>
                    <a className="con7__website" href={selected.website} target="_blank" rel="noopener noreferrer">공식 홈페이지 보기 <span aria-hidden="true">↗</span></a>
                    <a className="con7__source" href="https://www.newyjh.com/foundation/foundation-010100.html" target="_blank" rel="noopener noreferrer">서울효천의료재단 소개 ↗</a>
                </div>
            </>}
        </dialog>
    </section>
);
};

export default Con7;
