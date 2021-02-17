import { useContext } from 'react'
import { AppContext } from 'context'
import { ParametersContext } from 'context/parameters'
import type { FieldBase } from 'config/interfaces'
import removeFromArray from 'utils/removeFromArray'

const InputCommon = ({
  id,
  name,
  placeholder,
  type,
  className,
  required,
  autoFocus,
  autoComplete,
  ro,
  value,
  dataPropKey,
  regExp,
}: FieldBase): JSX.Element => {
  const { parameters, updateParams } = useContext(ParametersContext),
    {
    setToastMessage,
  } = useContext(AppContext);
  return (
    <input
      id={id}
      name={name ? name : id}
      className={className}
      placeholder={placeholder}
      required={required ? required : false}
      autoFocus={autoFocus ? true : false}
      type={type}
      autoComplete={String(autoComplete ? autoComplete : "off")}
      aria-describedby={placeholder}
      readOnly={ro}
      defaultValue={value}
      data-propkey={dataPropKey}
      pattern={regExp}
      onChange={({ target: { value, defaultValue, parentNode, classList } }: any) => {
        let er: RegExp = new RegExp(regExp, 'i'),
          propKey = parentNode.parentNode.children[0].innerText;
        if (value && er.test(value)) {
          if (defaultValue !== value) {
            classList.remove("bg-danger");
            classList.add("bg-warning")
          } else {
            classList.remove("bg-warning");
          }
          setToastMessage((toastMessage: any) => [
            ...removeFromArray(toastMessage, propKey)
          ]);
        } else {
          classList.remove("bg-warning");
          classList.add("bg-danger");
          setToastMessage((toastMessage: any) => [
            ...toastMessage,
            {
              id: parentNode.parentNode.children[0].innerText,
              type: "bg-danger",
              msg: `Valor de la propiedad ${parentNode.parentNode.children[0].innerText}, incorrecto`,
            },
          ]);
        }
      }}
      onBlur={({ target: { id, name, value, defaultValue } }: any) => {
        let idParam = id.split("-")[1];
        if (defaultValue !== value) {
            updateParams({
            type: "ADD_PARAMETER",
            payload: { id: idParam, value }
          })
        }
      }}
    />
  );
};

export default InputCommon;
