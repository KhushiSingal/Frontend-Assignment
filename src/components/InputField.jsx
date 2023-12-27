import React from "react";
import InfoButton from "./InfoButton";
import toolTip from "./ToolTip";


function InputField(props){
    const {required, immutable} = props.validate;
    const placeholder = (!props.placeholder) ? ("Enter " + props.label) : props.placeholder;
    const describe = (!props.description) ? false : true;
    const Tooltip = toolTip();

    return ( 
        <div className="formField">
            <span className="label">{props.label}
                <span className="required">{(required?"*    ":"     ")}</span>
            </span>
            {(describe) ?
                <InfoButton label={props.label} description={props.description}/> : null}
            <input className="inputField" type="text" required={required} 
            placeholder={placeholder} readOnly={immutable}></input>
        </div>
    );
}

export default InputField;