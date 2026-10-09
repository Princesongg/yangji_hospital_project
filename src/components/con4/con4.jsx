import './con4.css';

const videos = [
    { tags: '#췌장염 #관악구종합병원 #양지병원', lines: ['담도·췌장 질환 진단과 치료 핵심,', '담도췌관조형술(ERCP)'] },
    { tags: '#유방암 #관악구종합병원 #신림양지병원', lines: ['여성암 1위 유방암, 30대까지 번졌다.', "'정기검진'이 매우 중요"] },
    { tags: '#탈장 #탈장수술 #외과수술 #로봇수술', lines: ['탈장수술 1,000례 돌파!', '로봇수술로 흉터·통증 걱정 끝 📍관악구 종합병원'] },
    { tags: '#뇌졸중 #뇌출혈 #뇌경색 #FAST #언어장애 #얼굴마비 #골든타임 #응급실 #119', lines: ['이 신호 보이면 즉시 ‘119 신고’…', '뇌졸중 의심 증상 ‘FAST’ 📍관악구 종합병원'] },
];
const searchUrl = title => `https://www.youtube.com/results?search_query=${encodeURIComponent(`에이치플러스 양지병원 ${title}`)}`;
const mainTitle = '다빈치 로봇 수술 600례 달성 멀티';

const Con4 = () => (
    <section className="con4" aria-labelledby="con4-title">
        <div className="con4__inner">
            <header className="con4__heading">
                <p>{'H   P L U S   Y A N G  J I   H O S P I T A L  Y O U T U B E '}</p>
                <h2 id="con4-title">양지병원 <strong>유튜브</strong> 채널</h2>
            </header>
            <div className="con4__heading-line" aria-hidden="true"><img src="/images/con4/heading-line.svg" alt="" /></div>
            <div className="con4__columns">
                <article className="con4__featured">
                    <a className="con4__main-image" href={searchUrl(mainTitle)} target="_blank" rel="noopener noreferrer" aria-label={`${mainTitle} 유튜브에서 찾기 (새 창)`}>
                        <img src="/images/con4/main-source-01.png" alt="다빈치 로봇수술 600례 달성!" loading="lazy" />
                    </a>
                    <div className="con4__description">
                        <h3><a href={searchUrl(mainTitle)} target="_blank" rel="noopener noreferrer">{mainTitle}</a></h3>
                        <p className="con4__tags">#관악구로봇수술 #금천구로봇수술 #구로구로봇수술 #신림로봇수술 #봉천로봇수술 #흉터걱정없는수술 #회복빠른수술 #출혈적은수술 #차세대수술 #로봇자궁근종 #신림자궁근종로봇수술 #고난도수술 #정밀수술 #다빈치로봇수술병원 #로봇수술 #자궁근종수술 #관악구산부인과</p>
                        <p>저희 에이치플러스 양지병원이 다빈치 로봇수술 장비 도입 및 센터 활성화<br />이후 약 2년 만에 누적 로봇수술 600례를 돌파했습니다.</p>
                    </div>
                </article>
                <ul className="con4__list">
                    {videos.map((video, index) => (
                        <li key={video.lines[0]}>
                            <a className="con4__video" href={searchUrl(video.lines.join(' '))} target="_blank" rel="noopener noreferrer" aria-label={`${video.lines.join(' ')} 유튜브에서 찾기 (새 창)`}>
                                <img className="con4__thumbnail" src={`/images/con4/video-0${index + 1}.png`} alt="" loading="lazy" />
                                <div className="con4__video-text">
                                    <p className="con4__tags">{video.tags}</p>
                                    <h3>{video.lines.map(line => <span key={line}>{line}</span>)}</h3>
                                    <p className="con4__channel">에이치플러스양지병원</p>
                                </div>
                            </a>
                            <div className="con4__list-line" aria-hidden="true"><img src={`/images/con4/list-line-0${Math.min(index + 1, 3)}.svg`} alt="" /></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="con4__logo" aria-hidden="true">
            <img className="con4__logo-plus" src="/images/con4/logo-plus.svg" alt="" />
            <img className="con4__logo-square" src="/images/con4/logo-square.svg" alt="" />
            <img className="con4__logo-h" src="/images/con4/logo-h.svg" alt="" />
        </div>
    </section>
);

export default Con4;
