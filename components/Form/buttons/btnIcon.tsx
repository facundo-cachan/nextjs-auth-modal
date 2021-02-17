import type { Btn } from "config/interfaces"

const BtnIcon = ({ type, label, icon }: Btn): JSX.Element => (
    <button type="button" className="btn btn-outline-dark btn-lg" disabled={type === "secondary" || type === "warning" ? true : false}>
        {icon && type === "warning" ? <div className={`spinner-border text-${type}`} role="status">
            <span className="sr-only">Loading...</span>
        </div> :
            <i className={`far fa-${icon} text-${type}`} />}{label}
    </button>
);

export default BtnIcon