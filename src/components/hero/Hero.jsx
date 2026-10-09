import { useRef, useState } from 'react';
import './Hero.css';
import HeroService from './HeroService';
import HeroServiceDialog from './HeroServiceDialog';
import { mobileAsset, mobileAssets } from '../../mobile-assets';

const asset = (name) => `/images/hero/${name}`;
const mainMenus = ['병원소개', '진료예약 및 상담', '부속병원  /  진료센터', '병원 안내', '서울효천의료재단'];
const quickMenus = [
    { label: '진료예약', icon: 'reservation' },
    { label: '증명서 발급', icon: 'certificate' },
    { label: '건강검진', icon: 'checkup' },
    { label: '이용안내', icon: 'location' },
];

const Hero = () => {
    const [query, setQuery] = useState('');
    const [notice, setNotice] = useState({ title: '', description: '' });
    const dialogRef = useRef(null);
    const serviceDialogRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [selectedService, setSelectedService] = useState(null);
    const openService = (icon) => {
        setSelectedService(icon);
        serviceDialogRef.current.showModal();
        serviceDialogRef.current.scrollTop = 0;
    };

    const showNotice = (title, description = '이 안내 페이지는 준비 중입니다.') => {
        setNotice({ title, description });
        dialogRef.current.showModal();
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = query.trim();
        if (!searchTerm) return;
        showNotice('진료과 · 의료진 찾기', `“${searchTerm}” 검색 결과 안내는 준비 중입니다.`);
    };

    return (
        <div className="hospital-home">
            <header className="hero-header">
                <a className="hero-header__logo" href="/" aria-label="에이치 플러스 양지병원 홈">
                    <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgGroup2)} /><img className="hero-header__symbol" src={asset('logo-symbol.svg')} alt="" /></picture>
                    <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgGroup3)} /><img className="hero-header__wordmark" src={asset('logo-text.svg')} alt="양지병원" /></picture>
                </a>
                <button className="hero-mobile-menu" type="button" aria-label="전체 메뉴 열기" aria-haspopup="dialog" aria-controls="hero-mobile-navigation" onClick={() => mobileMenuRef.current.showModal()}><img src={mobileAsset(mobileAssets.imgIconMenu)} alt="" /></button>
                <nav className="hero-header__nav" aria-label="주요 메뉴">
                    {mainMenus.map((label) => (
                        <button key={label} type="button" onClick={() => showNotice(label)}>{label}</button>
                    ))}
                </nav>
                <div className="hero-header__account" aria-label="회원 메뉴">
                    <button className="hero-header__login" type="button" onClick={() => showNotice('로그인', '로그인 페이지는 준비 중입니다.')}>
                        <span className="hero-header__person" aria-hidden="true" />
                        <span>로그인</span>
                    </button>
                    <span className="hero-header__account-divider" aria-hidden="true">/</span>
                    <button type="button" onClick={() => showNotice('회원가입', '회원가입 페이지는 준비 중입니다.')}>회원가입</button>
                </div>
            </header>

            <section className="hero" aria-labelledby="hero-title">
                <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgHeroSlide1)} /><img className="hero__background" src={asset('hospital.png')} alt="양지병원 내부 전경" fetchPriority="high" /></picture>
                <div className="hero__headline">
                    <p className="hero__slogan">앞선 의학 , 따뜻한 마음</p>
                    <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgLine1)} /><img className="hero__line" src={asset('headline-line.svg')} alt="" /></picture>
                    <h1 id="hero-title" className="hero__title">
                        <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgGroup4)} /><img className="hero__symbol" src={asset('hero-symbol.svg')} alt="" /></picture>
                        <span>에이치 플러스 양지병원</span>
                    </h1>
                </div>
                <form className="hero-search" role="search" onSubmit={handleSearch}>
                    <label className="hero-search__label" htmlFor="hero-search-input">진료과 · 의료진 찾기</label>
                    <div className="hero-search__field">
                        <input id="hero-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="무엇을 도와드릴까요?" required autoComplete="off" />
                        <button className="hero-search__submit" type="submit" aria-label="진료과 또는 의료진 검색">
                            <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.imgMingcuteSearchLine)} /><img src={asset('search.svg')} alt="" /></picture>
                        </button>
                    </div>
                </form>
            </section>

            <section className="hero-services" aria-label="자주 찾는 서비스">
                <div className="hero-services__links">
                    {quickMenus.map(({ label, icon }) => (
                        <HeroService key={label} label={label} icon={icon} onClick={() => openService(icon)} />
                    ))}
                </div>
                <button className="hero-emergency" type="button" onClick={() => showNotice('응급진료 안내')} aria-label="24시간 응급진료 안내">
                    <picture><source media="(max-width: 600px)" srcSet={mobileAsset(mobileAssets.img04)} /><img className="hero-emergency__background" src={asset('emergency.png')} alt="" /></picture>
                    <span className="hero-emergency__english">{'H   P L U S   Y A N G  J I   H O S P I T A L  '}</span>
                    <span className="hero-emergency__message"><span className="hero-emergency__red">24</span><span className="hero-emergency__gray">시간 </span><span className="hero-emergency__red">응급진료  </span><span className="hero-emergency__gray">잘하는 </span><span>안심병원</span></span>
                    <img className="hero-emergency__line" src={asset('banner-line.svg')} alt="" />
                </button>
            </section>

            <HeroServiceDialog service={selectedService} dialogRef={serviceDialogRef} />
            <dialog className="hero-mobile-navigation" id="hero-mobile-navigation" ref={mobileMenuRef} aria-labelledby="hero-mobile-navigation-title">
                <header><h2 id="hero-mobile-navigation-title">전체 메뉴</h2><button type="button" autoFocus aria-label="전체 메뉴 닫기" onClick={() => mobileMenuRef.current.close()}>×</button></header>
                <nav aria-label="모바일 주요 메뉴">
                    {[['병원소개', 'con6-title'], ['진료과 · 의료진', 'con1-title'], ['진료센터', 'con2-title'], ['병원소식', 'con5-title'], ['서울효천의료재단', 'con7-title']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => mobileMenuRef.current.close()}>{label}<span aria-hidden="true">›</span></a>)}
                    <button type="button" onClick={() => { mobileMenuRef.current.close(); openService('reservation'); }}>진료예약 · 상담 <span aria-hidden="true">›</span></button>
                    <button type="button" onClick={() => { mobileMenuRef.current.close(); openService('location'); }}>병원 이용안내 <span aria-hidden="true">›</span></button>
                </nav>
                <a className="hero-mobile-navigation__phone" href="tel:18778875">콜센터 1877-8875</a>
            </dialog>
            <dialog className="hero-dialog" ref={dialogRef} aria-labelledby="hero-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                <h2 id="hero-dialog-title">{notice.title}</h2>
                <p>{notice.description}</p>
                <form method="dialog"><button autoFocus>확인</button></form>
            </dialog>
        </div>
    );
};

export default Hero;




