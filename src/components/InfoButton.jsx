import React from "react";
import toolTip from "./ToolTip";
import Fab from '@mui/material/Fab';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';

function InfoButton(props){
    const Tooltip = toolTip();

    return (<Tooltip
                title={
                <React.Fragment>
                <div className="infoHeading">{props.label}</div>
                <Divider />
                <div className="info">{props.description}</div>
                </React.Fragment>
                }
            >
               <Fab style={{height:"15px", width:"15px", minHeight:"15px", backgroundColor:"#fbfdff"}} color="primary" aria-label="add">
                <InfoIcon color="primary" style={{height:"15px", width:"15px"}}/>
                </Fab>
            </Tooltip>);
}

export default InfoButton;