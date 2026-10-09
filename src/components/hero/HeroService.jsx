import './HeroService.css';

import { mobileAsset, mobileAssets } from '../../mobile-assets';
const mobileIcons = { reservation: 'imgGroup5', certificate: 'imgGroup6', checkup: 'imgGroup1', location: 'imgGroup1' };

const HeroService = ({ label, icon, onClick }) => (
    <button className="hero-service" type="button" onClick={onClick}>
        <span className="hero-service__box">
            <span className="hero-service__icon-frame" aria-hidden="true">
                <img className="hero-service__icon hero-service__icon--default" src={`/images/hero/${icon}.svg`} alt="" />
                <img className="hero-service__icon hero-service__icon--hover" src={`/images/hero/${icon}-hover.svg`} alt="" />
            </span>
        </span>
        <span className="hero-service__label">{label}</span>
        <img className="hero-service__mobile-icon" src={mobileAsset(mobileAssets[mobileIcons[icon]])} alt="" />
    </button>
);

export default HeroService;
