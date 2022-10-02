import React from 'react'
import "./FormInput.css"
// import { TextArea } from '@react-ui-org/react-ui';
export default function FormInput(props) {
  const { label, onchange, id, ...inputProps } = props
  return (

    inputProps.itype === "input" ?
      <div className="formInput ">
        <label  className='d-block text-muted' style={{fontWeight:"bold",marginBottom:"6px"}}>{label}</label>
        <input {...inputProps} className="border rounded" onChange={onchange} />
      </div>
      :
      inputProps.itype === "textarea" ?
        <div className='formInput d-block'>
        <label  className='d-block text-muted' style={{fontWeight:"bold",marginBottom:"6px"}}>{label}</label>
         <textarea {...inputProps} style={{width:"100%",height:"111px"}} className="border rounded" type="text" onChange={onchange}/>
        </div>
        :
        <div className='formInput'>
          <label  className='d-block text-muted' style={{fontWeight:"bold",marginBottom:"6px"}}>{label}</label>
          <select {...inputProps} className="border rounded" onChange={onchange}>
            {
              inputProps.options.map(item =>
                <option className='option' key={item}>
                  {item}
                </option>
              )
            }
          </select>
        </div>
  )
}
