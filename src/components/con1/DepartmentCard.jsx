import './DepartmentCard.css';

const DepartmentCard = ({ department, onSelect }) => (
    <button className={`department-card${department.name.replaceAll('\n', '').length > 4 ? ' department-card--long-name' : ''}`} type="button" onClick={() => onSelect(department)} aria-label={`${department.name.replaceAll('\n', '')} 바로가기`}>
        <span className="department-card__name">{department.name}</span>
        <span className="department-card__icons" aria-hidden="true">
            <img className="department-card__icon department-card__icon--default" src={department.icon} alt="" />
            <img className="department-card__icon department-card__icon--hover" src={department.hoverIcon} alt="" />
        </span>
        <span className="department-card__number">{department.number} / 32</span>
        <span className="department-card__footer"><span>바로가기 +</span></span>
    </button>
);

export default DepartmentCard;
