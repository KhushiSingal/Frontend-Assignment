import React from "react";
import toolTip from "./ToolTip";
import Fab from '@mui/material/Fab';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import InfoButton from "./InfoButton";
import Checkbox from '@mui/material/Checkbox';

function SwitchField(props){
    const {required, defaultValue, immutable} = props.validate;
    const describe = (!props.description) ? false : true;
    const Tooltip = toolTip();

    return (
        <div className="formField">
            <Checkbox sx={{padding:"3px"}} defaultChecked={defaultValue} required={required} disabled={immutable} size="small" />
            <span className="label">{"          " + props.label}
                <span className="required">{(required?"*    ":"     ")}</span>
            </span>
            {(describe) ?
                <InfoButton label={props.label} description={props.description}/> : null}
        </div>);
}

export default SwitchField;