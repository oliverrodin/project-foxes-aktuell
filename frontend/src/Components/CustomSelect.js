import React from 'react'
import { Formik, useField } from "formik";
function CustomSelect({label, ...props}) {
    const [field, meta] = useField(props)

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field}{...props} />
        {meta.touch && meta.error ? (
          <div className="error">{meta.error}</div> ) : null}
      </>
    )
}

export default CustomSelect