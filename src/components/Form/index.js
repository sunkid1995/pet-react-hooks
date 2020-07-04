import React, { useMemo, useState, useCallback } from 'react';
import _ from 'lodash'

export const useForm = () => {
  const [values, setValues] = useState({});

  const fieldChange = useCallback((key, value) => {
    return setValues({
      ...values,
      [key]: value
    });
  }, [values, setValues]);

  const getValueInField = useCallback((key) => {
    return _.get(values, key, null);
  }, [values]);

  return {
    values,
    fieldChange,
    getValueInField
  };
};

const Form = ({
  children,
  fieldChange
}) => {
  const handleInputChange = useCallback((key, val) => {
    return fieldChange(key, val);
  }, [fieldChange]);

  const handleCloneChildren = useCallback((child, passProps) => {
    return React.cloneElement(child, passProps);
  }, []);

  const renderContent = useMemo(() => {
    if (_.isArray(children)) {
      return _.map(children, (c, index) => handleCloneChildren(c, { 
        onChange: handleInputChange,
        key: index,
      }));
    };

    return handleCloneChildren(children, {
      onChange: handleInputChange,
    });
  }, [children, handleCloneChildren, handleInputChange]);

  return (
    <div>
      {renderContent}
    </div>
  )
};

export default Form;