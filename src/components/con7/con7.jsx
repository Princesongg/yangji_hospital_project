import './con7.css';

const institutions = [
    { name: 'H+ 의생명연구원', image: 'research.png', type: 'research' },
    { name: 'H+ 재활자립병원', image: 'rehabilitation.png', type: 'rehabilitation' },
    { name: '강남구립 행복요양원', image: 'nursing.png', type: 'nursing' },
    { name: 'H+ 메디컬센터 하노이', image: 'hanoi.png', type: 'hanoi' },
];

const Con7 = () => (
    <section className="con7" aria-labelledby="con7-title">
        <header className="con7__heading">
            <p>{'H+  I N T E R N A T I O N A L M E D I C A L '}</p>
            <h2 id="con7-title">서울효천<strong>의료재단</strong></h2>
        </header>
        <ul className="con7__institutions">
            {institutions.map(institution => (
                <li key={institution.type}>
                    <article className={`con7__card con7__card--${institution.type}`}>
                        <div className="con7__card-heading">
                            <p>에이치플러스 메디컬 그룹</p>
                            <h3>{institution.name}</h3>
                        </div>
                        <div className="con7__photo">
                            <img src={`/images/con7/${institution.image}`} alt={institution.name} loading="lazy" />
                            <div className="con7__tint" aria-hidden="true" />
                        </div>
                        <div className="con7__foundation">
                            <span className="con7__symbol"><img src="/images/con7/foundation-symbol.svg" alt="" /></span>
                            <p>서울효천의료재단</p>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    </section>
);

export default Con7;
