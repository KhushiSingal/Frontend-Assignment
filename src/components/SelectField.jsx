import React from "react";
import InfoButton from "./InfoButton";
import toolTip from "./ToolTip";

function SelectField(props){
    const [option, setOption] = React.useState("");
    const handleChange = (event) => {
        setOption(event.target.value);
    };
    const {required, options, defaultValue, immutable} = props.validate;
    const describe = (!props.description) ? false : true;
    const Tooltip = toolTip();

    function placeholderOption(placeholder){
        const exists = (!props.placeholder) ? false : true;
        if(exists){
            return <option value="placeholder">{placeholder}</option>;
        }
        return null;
    }

    return ( 
        <div className="formField">
            <span className="label">{props.label}
                <span className="required">{(required?"*    ":"     ")}</span>
            </span>
            {(describe) ?
                <InfoButton label={props.label} description={props.description}/> : null
            }
            <select className="inputField" disabled={immutable} name={props.label} required={required}>
                {placeholderOption(props.placeholder)}
                {options.map(item => {
                    if(defaultValue===item.value){
                        return (<option value={item.value} selected>{item.label}</option>);
                    }
                    else{
                        return (<option value={item.value}>{item.label}</option>);
                    }
                })}
            </select>
        </div>
    );
}
export default SelectField;