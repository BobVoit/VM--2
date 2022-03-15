import { uniqueId } from "../common/commonModule";

const Field = ({ value, setValue, labelName = "", elementName }) => {


    return (
        <div className="field">
            <label className="field_label-name" htmlFor={elementName}>{labelName + ":"}</label>
            <input 
                className="field__input" 
                type="text" value={value} 
                onChange={e => setValue(e.target.value)} 
                name={elementName}
            />
        </div>
    )
}

export default Field;