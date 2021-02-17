import type { Btn } from "config/interfaces"

const BtnColor = ({ type, label }: Btn): JSX.Element => (
    <button type="button" className={`btn btn-${type} btn-lg`} >
        <div className="cell">{label} {type === "warning" ? (<div className="spinner-border" role="status">
            <span className="sr-only">{label}</span>
        </div>) : null}</div>
    </button>
);

export default BtnColor