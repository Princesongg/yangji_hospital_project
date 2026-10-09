import './Footer.css';

const menus = ['이용약관', '개인정보취급방침', '환자의권리와의무', 'CCTV 설치 · 운영지침', '채용정보', '비급여진료안내', '찾아오시는길'];

export default function Footer() {
    return (
        <footer className="site-footer">
            <p className="site-footer__mobile-title">에이치 플러스 양지병원</p>
            <ul className="site-footer__menus" aria-label="병원 이용 정보">
                {menus.map(menu => <li key={menu}>{menu}</li>)}
            </ul>
            <div className="site-footer__contact">
                <p><strong>콜센터</strong> <a href="tel:18778875">1877 - 8875</a></p>
                <p><strong>응급의료센터</strong> <a href="tel:07046659119">070 - 4665 - 9119</a></p>
            </div>
            <div className="site-footer__info">
                <p>사업자등록증 : 873-82-00549　 대표자 : 김철수</p>
                <p>업체명 : (의)서울효천의료재단 에이치플러스 양지병원</p>
                <p>(우) 08779　서울시 관악구 남부순환로 1636</p>
            </div>
            <div className="site-footer__brand">
                <p>에이치 플러스 양지병원</p>
                <small>Copyright © H PLUS YANGJI HOSPITAL. All rights reserved.</small>
            </div>
            <div className="site-footer__symbol" role="img" aria-label="H+ 양지병원">
                <img className="site-footer__square" src="/images/footer/logo-square.svg" alt="" />
                <img className="site-footer__h" src="/images/footer/logo-h.svg" alt="" />
                <img className="site-footer__plus" src="/images/footer/logo-plus.svg" alt="" />
            </div>
            <div className="site-footer__mobile-logo" aria-label="양지병원"><img src="/images/hero/logo-symbol.svg" alt="" /><img src="/images/hero/logo-text.svg" alt="양지병원" /></div>
        </footer>
    );
}
