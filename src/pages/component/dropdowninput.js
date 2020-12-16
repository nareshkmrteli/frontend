/*
either an array or array of object then should pass keyname and value the value will pass to onChange field

*/
import React from 'react'
import {Link} from "react-router-dom"
import {FormControl,InputLabel,Select} from "@material-ui/core"
export function DropDownInput({label,values,onChange,keyname,value}){
    const callback=(e)=>{
        const value =e.target.value
        onChange(value)
    }
    return(
        <>
        <FormControl variant="outlined" fullWidth size='small' >
                <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
                <Select
                native
                label={label}
                inputProps={{
                    name: {label},
                    id: {label},
                }}
                onChange={callback}
                >
                <option aria-label="None" value="" />
                {
                    values && Array.isArray(values) && (typeof(values[0])=='string'? 
                    values.map((val,i)=>(<option key={i} value={val}>{val}</option>)):
                    values.map((val,i)=>(<option key={i} value={val[keyname]}>{val[value]}</option>)))
                }
                </Select>
        </FormControl>
        </>
    )
}