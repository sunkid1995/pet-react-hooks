import React, { useCallback } from 'react';

const Input = ({
  onChange,
  name,
  ...rest
}) => {
  const handleInputChange = useCallback((event) => {
    const { name: inputName, value } =  event.target;
    
    if (inputName) {
      return onChange(inputName, value);
    }

    return onChange(name, value);
  }, [name, onChange]);

  return (
    <input
      {...rest}
      onChange={handleInputChange}
    />
  )
};

export default Input;
