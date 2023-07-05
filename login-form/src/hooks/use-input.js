import React, { useState } from 'react'

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const valuChangeHandler = (e) => {
  setEnteredValue(e.target.value)
  }
  const inputBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valuChangeHandler,
    inputBlurHandler,
    reset

  }
}

export default useInput
