import React from 'react'
import { Formik, useField} from 'formik'

function CustomTextInput({label, ...props}) {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field}{...props} />
      {meta.touch && meta.error ? (
        <div className="error">{meta.error}</div> ) : null}
    </>
  )
}

export default CustomTextInput