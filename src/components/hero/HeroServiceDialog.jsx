import { serviceGuides } from './serviceGuides';
import './HeroServiceDialog.css';
import { useId } from 'react';

export default function HeroServiceDialog({ service, dialogRef }) {
    const guide = serviceGuides[service];
    const titleId = useId();
    const subtitleId = useId();
    return (
        <dialog className="hero-service-dialog" ref={dialogRef} aria-labelledby={titleId} aria-describedby={subtitleId} onClick={event => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
        }}>
            <button className="hero-service-dialog__close" type="button" autoFocus aria-label="안내 창 닫기" onClick={() => dialogRef.current.close()}>×</button>
            {guide && <>
                <header className="hero-service-dialog__header">
                    <span className="hero-service-dialog__icon" aria-hidden="true"><img src={`/images/hero/${service}-hover.svg`} alt="" /></span>
                    <span className="hero-service-dialog__brand">H+ YANGJI HOSPITAL</span>
                    <h2 id={titleId}>{guide.title}</h2>
                    <p id={subtitleId}>{guide.subtitle}</p>
                </header>
                <div className="hero-service-dialog__body">
                    <div className="hero-service-dialog__info"><h3>{guide.heading}</h3><p>{guide.description}</p></div>
                    <dl className="hero-service-dialog__details">{guide.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                    <div className="hero-service-dialog__actions">{guide.actions.map(([label, href], index) => <a className={`hero-service-dialog__action${index === 0 ? ' hero-service-dialog__action--primary' : ''}`} key={href} href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{label}{href.startsWith('https:') && <span aria-hidden="true"> ↗</span>}</a>)}</div>
                    {guide.note && <p className="hero-service-dialog__note">{guide.note}</p>}
                </div>
                <footer className="hero-service-dialog__footer">앞선 의학, 따뜻한 마음 · 에이치플러스 양지병원</footer>
            </>}
        </dialog>
    );
}
