import type { FieldValues, Option } from "config/interfaces";

const SelectField = ({ id, name, values, label, placeholder,className,  describedby }: FieldValues): JSX.Element => (
    <>
        {!label && <label htmlFor={name}>{placeholder}</label>}
        <select
            id={id}
            name={name}
            data-testid={id}
            className={`form-select form-select-lg ${className}`}
            aria-describedby={describedby && String(describedby.key)}
        >
            {values.map(({key, value, select}:Option)=> <option value={value} selected={select}>{key}</option>)}
        </select>
    </>
);

export default SelectField