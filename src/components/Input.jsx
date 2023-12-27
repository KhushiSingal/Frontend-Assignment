import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputField from "./InputField";
import SelectField from "./SelectField";
import SwitchField from "./SwitchField";
import Switch from '@mui/material/Switch';
import InfoButton from "./InfoButton";
import Divider from '@mui/material/Divider';

function Input(){
    const [input, updateInput] = React.useState("");
    const [uiSchema, updateSchema] = React.useState("");

    function changeInput(event){
        const text = event.target.value;
        updateInput(text);
    }

    function getUISchema(){
        updateSchema(input);
    }

    function handleToggle(event){
        const id = event.target.value;
        var x = document.getElementById(id);
        var toggle = document.getElementById("show");
            if (x.style.display === "none") {
                x.style.display = "block";
                toggle.innerHTML = "Hide advanced fields";
            } else {
                x.style.display = "none";
                toggle.innerHTML = "Show advanced fields";
            }
    }

    function handleClick(event){
        const id = event.target.value;
        console.log(id);
        var div = document.getElementById(id);
            if (div.style.display === "none") {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
    }

    function invalidInput(){
        return (<h1>Enter Valid Input!!!!!!!!!!!</h1>);
    }

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    var count = 0;

    function divideAndRender(jsSchema){
        var required = [];
        var additional = [];
        required = jsSchema.filter(field => {
            const {validate: {required = false}} = field;
            return required;
        });
        additional = jsSchema.filter(field =>{
            const {validate: {required = false}} = field;
            return !required;
        })
        console.log(required);
        console.log(additional);
        var requiredRendering = renderForm(required);
        var additionalRendering = renderForm(additional);
        const additionalDivID = "additionalBox" + String(count);
        additionalRendering = <div id={additionalDivID} style={{display: "none"}}>{additionalRendering}</div>;

        const label = { inputProps: { 'aria-label': 'Switch demo' } };
        const showAdditional = (additional.length!==0) ? 
        <div><Switch value={additionalDivID} {...label} size="small" onClick={handleToggle}/><span id="show" className="label">Hide advanced fields</span></div>: null;
        var output = requiredRendering.concat(additionalRendering);
        output = output.concat(showAdditional);
        
        count = count+1;
        return output;  

    }

    function renderForm(jsSchema){
        return (
            jsSchema.map((field, index) => {
                const {sort, label, description, validate, jsonKey: key, uiType, icon, level, placeholder, subParameters = [], conditions = {}} = field;
                switch(uiType){
                    case "Input":
                        return <InputField key={index} label={label} description={description} validate={validate} icon={icon} placeholder={placeholder} />;
                    
                    case "Select":
                        return <SelectField key={index} label={label} description={description} validate={validate} icon={icon} placeholder={placeholder} />;   
                    
                    case "Switch":
                        return <SwitchField key={index} label={label} description={description} validate={validate} icon={icon} placeholder={placeholder} />;

                    case "Group":
                        const {requiredGroup, immutableGroup} = validate;
                        const describe = (!description) ? false : true;

                        return (
                        <div className="formField">
                            <span className="label">{label}
                                <span className="required">{(requiredGroup?"*    ":"     ")}</span>
                            </span>
                            {(describe) ?
                                <InfoButton label={label} description={description}/> : null}
                            <Divider sx={{marginTop:"5px", marginBottom:"5px"}} />
                            {divideAndRender(subParameters)}
                        </div>);

                    case "Radio":
                        const {required, options, defaultValue, immutable} = validate;
                        return (<div className="radioContainer" id="">
                            {options.map(item => {
                            if(defaultValue===item.value){
                                return (<Button size="small" value={(label.substring(0, label.indexOf(' '))).toLowerCase() + "." + key + "==" + item.value} variant="outlined" onClick={handleClick}>{item.label}</Button>);
                            }
                            else{
                                return (<Button size="small" value={(label.substring(0, label.indexOf(' '))).toLowerCase() + "." + key + "==" + item.value} variant="outlined" onClick={handleClick}>{item.label}</Button>);
                            }
                        })}
                        </div>);

                    case "Ignore":
                        const operation = conditions[0];
                        const {jsonKey, op, value} = operation;
                        const id = jsonKey+op+value;
                        console.log(id);
                        return (
                            <div style={{display: "none"}} className="formField" id={id}>
                                {divideAndRender(subParameters)}
                            </div>);

                    default:
                        return invalidInput();
                }
            })
        );
    }

    function generateFields(jsonSchema){
        if(isJsonString(jsonSchema)){
            const jsSchema = JSON.parse(jsonSchema);
            return divideAndRender(jsSchema);
        } else {
            console.log("Enter a valid input!");
            return;
        }
    }

    

    return (
    <div className="container">
    <div className="section">
        <form>
            <TextField
              id="outlined-multiline-flexible fullWidth margin-dense"
              label="UI Schema"
              onChange={changeInput}
              value={input}
              margin="dense"
              fullWidth
              multiline
              maxRows={15}
            />
            <Button id="generator" onClick={getUISchema} variant="contained" size="small">Generate Form</Button>
        </form>
    </div>
    <div id="output" className="section">
        <form>
            {generateFields(uiSchema)}
            <Button id="generator" variant="contained" size="small">Submit</Button>
        </form>
    </div>
    </div>
    );
}

export default Input;