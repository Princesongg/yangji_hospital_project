import './con3.css';

const benefits = ['정확하고 안전한 수술', '최소통증 · 출혈감소', '감염위험 감소', '조기회복'];

const Con3 = () => (
    <section className="con3" aria-labelledby="con3-title">
        <div className="con3__photo" aria-hidden="true">
            <div className="con3__image-frame">
                <img src="/images/con2/center-06.png" alt="" />
            </div>
            <div className="con3__shade" />
        </div>
        <div className="con3__content">
            <div className="con3__heading">
                <p className="con3__english">{'H   P  L  U  S   Y  A  N  G  J  I   H  O  S  P  I  T  A  L  '}</p>
                <div className="con3__titles">
                    <p className="con3__intro">로봇수술도 역시 <span>에이치플러스 양지병원</span>입니다.</p>
                    <h2 id="con3-title">다빈치 로봇 수술</h2>
                </div>
            </div>
            <ul className="con3__benefits">
                {benefits.map((benefit) => (
                    <li key={benefit}>
                        <span className="con3__check"><img src="/images/con3/check.svg" alt="" /></span>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Con3;
