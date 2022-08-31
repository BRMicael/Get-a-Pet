import React from 'react'
import styles from './Input.module.css';


export default function input({type, text, name, placeholder, handleOnChange, value, multiple}) {
  return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleOnChange} value={value} {...(multiple ? {multiple}: '')}/>
    </div>
  )
}
