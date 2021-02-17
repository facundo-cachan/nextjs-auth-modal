import { FieldCheckBox } from '../../config/interfaces'

const CheckboxField = ({ id, name, value, className, describedby, checked }: FieldCheckBox): JSX.Element => (
    <>
        <input
            id={id}
            name={name ? name : id}
            data-testid={name}
            type="checkbox"
            value={value}
            className={`form-check-input ${className ? className : ""}`}
            checked={checked}
        />
        {describedby && <label className="form-check-label" htmlFor={id}>{describedby.value}</label>}
    </>
)

export default CheckboxField