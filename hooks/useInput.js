/**
 * useInput Recat RN Version
 * - TextInput 컴포넌트는 setValue라는 Props가 추가적으로 와도 문제가 안된다.
 * - HTML 컴포넌트에서는 문제가 되지..
 */
import React, { useState } from "react";

const useInput = intialValue => {
  const [value, setValue] = useState(intialValue);
  const onChangeText = text => {
    setValue(text);
  };
  return { value, onChangeText, setValue };
};

export default useInput;
