import { useRef, useState } from 'react';
import './con5.css';

const news = [
    { title: '독감 예방 접종 그리고 폐렴 구균도 함께 예방해요!', image: '/images/con5/news-01.png?v=2', type: 'pneumococcal', caption: <><strong>독감 예방 접종</strong> 그리고<br /><strong>폐렴 구균</strong>도 함께 예방해요!</> },
    { title: '[ 10월 ] ‘가을힐링’ 검진 이벤트', image: '/images/con5/news-02.png?v=2', type: 'checkup', caption: <><strong>[ 10월 ]</strong> ‘가을힐링’ 검진 이벤트</> },
    { title: '독감 예방 접종 안내', image: '/images/con5/news-03.png?v=2', type: 'flu', caption: <><strong>독감 예방</strong> 접종 안내</> },
];
const newsDetails = {
    pneumococcal: { postId: '224435062920', summary: '독감 예방접종을 받으러 오셨다면 폐렴구균 접종 이력도 함께 확인해보세요. 연령·기저질환·과거 접종 여부에 따라 필요한 백신과 일정이 달라지므로 의료진 상담을 안내합니다.' },
    checkup: { postId: '224420715468', summary: '10월 한 달간 기본검사와 선택검사 3종으로 구성된 가을힐링 검진 이벤트를 진행합니다. 오후 검진 또는 2인 이상 검진 할인과 추가 정밀검사 옵션을 함께 안내합니다.' },
    flu: { postId: '224424720094', summary: '2026–2027절기 독감 예방접종의 무료 대상과 대상별 접종 기간을 안내합니다. 방문 전 필요한 서류와 일반 성인 유료 접종, 다른 백신의 동시접종 정보도 확인할 수 있습니다.' },
    'vaccine-event': { postId: '224420679221', summary: '10월 1일부터 재고 소진 시까지 독감과 폐렴구균 또는 대상포진 백신의 동시접종 이벤트를 진행합니다. 국가검진을 함께 받는 경우의 접종 혜택과 비용을 안내합니다.' },
    'women-checkup': { postId: '224420666976', summary: '10월 한 달간 유방검진을 중심으로 기본·정밀·종합 여성검진 프로그램을 제공합니다. 국가검진 유방암 대상자를 위한 혜택과 갑상선·자궁 검사 등을 포함한 구성을 안내합니다.' },
    orthopedics: { postId: '224433177841', summary: '정형외과 유현열 전문의가 2026년 10월 19일부터 진료를 시작합니다. 어깨·팔꿈치·손목 질환, 골절·외상, 인공관절·관절경 수술과 스포츠손상을 전문으로 진료합니다.' },
};
const allNews = [
    ...news.map(item => ({ ...item, category: item.type === 'checkup' ? '검진 이벤트' : '예방접종' })),
    { title: '독감 동시 접종 EVENT', image: '/images/con5/news-vaccine-event.png', type: 'vaccine-event', category: '예방접종 이벤트' },
    { title: '[ 10월 ] ‘여성정밀검진’ 이벤트', image: '/images/con5/news-women-checkup.png', type: 'women-checkup', category: '검진 이벤트' },
    { title: '정형외과 유현열 전문의 초빙', image: '/images/con5/news-orthopedics.png', type: 'orthopedics', category: '의료진 소식' },
].map(item => ({ ...item, ...newsDetails[item.type] }));

const Con5 = () => {
    const dialogRef = useRef(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const openNews = (item = null) => {
        setSelectedNews(item ? allNews.find(entry => entry.type === item.type) : null);
        dialogRef.current.showModal();
    };

    return (
        <section className="con5" aria-labelledby="con5-title">
            <header className="con5__heading">
                <p>{'H   P L U S   Y A N G  J I   H O S P I T A L  N E W S'}</p>
                <h2 id="con5-title">양지병원 <strong>NEWS</strong></h2>
            </header>
            <ul className="con5__cards">
                {news.map(item => (
                    <li key={item.type}>
                        <button className="con5__card" type="button" onClick={() => openNews(item)} aria-haspopup="dialog" aria-controls="con5-news-dialog">
                            <span className={`con5__image con5__image--${item.type}`}><img src={item.image} alt="" loading="lazy" /></span>
                            <span className="con5__caption">{item.caption}</span>
                            <span className="con5__mobile-summary">{newsDetails[item.type].summary}</span>
                            <span className="con5__mobile-more">더보기 +</span>
                        </button>
                    </li>
                ))}
            </ul>
            <button className="con5__view-all" type="button" onClick={() => openNews()} aria-haspopup="dialog" aria-controls="con5-news-dialog">
                <img className="con5__view-background" src="/images/con1/view-all.svg" alt="" />
                <span className="con5__view-label">전체보기</span>
                <img className="con5__view-circle" src="/images/con1/view-plus.svg" alt="" />
                <img className="con5__view-circle con5__view-circle--hover" src="/images/con1/view-plus-hover.svg" alt="" />
                <span className="con5__view-symbol" aria-hidden="true">+</span>
            </button>
            <dialog className="con5__dialog" id="con5-news-dialog" ref={dialogRef} aria-labelledby="con5-dialog-title" onClick={event => {
                if (event.target !== event.currentTarget) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
            }}>
                <div className="con5__dialog-heading">
                    <h2 id="con5-dialog-title">{selectedNews ? selectedNews.title : '양지병원 NEWS 전체보기'}</h2>
                    <form method="dialog"><button type="submit">닫기</button></form>
                </div>
                {selectedNews ? (
                    <div className="con5__dialog-news">
                        <button className="con5__back" type="button" onClick={() => { setSelectedNews(null); dialogRef.current.scrollTop = 0; }}>← 전체 소식으로</button>
                        <div className="con5__detail-layout">
                            <img className="con5__detail-image" src={selectedNews.image} alt={selectedNews.title} />
                            <div className="con5__detail-copy">
                                <span className="con5__category">{selectedNews.category}</span>
                                <h3>{selectedNews.title}</h3>
                                <p>{selectedNews.summary}</p>
                                <a className="con5__source" href={`https://blog.naver.com/new_yjh/${selectedNews.postId}`} target="_blank" rel="noopener noreferrer">공식 블로그에서 자세히 보기 ↗</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ul className="con5__directory">
                        {allNews.map(item => (
                            <li key={item.type}>
                                <button className="con5__directory-card" type="button" onClick={() => { setSelectedNews(item); dialogRef.current.scrollTop = 0; }}>
                                    <span className="con5__directory-image"><img src={item.image} alt="" loading="lazy" /></span>
                                    <span className="con5__directory-text">
                                        <span className="con5__category">{item.category}</span>
                                        <span className="con5__directory-title">{item.title}</span>
                                        <span className="con5__directory-summary">{item.summary}</span>
                                        <span className="con5__directory-more">자세히 보기 →</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </dialog>
        </section>
    );
};

export default Con5;
