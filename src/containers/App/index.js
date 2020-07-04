/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

// components
import Form, { useForm } from '../../components/Form';
import Input from '../../components/Input';

// hooks
import useAsync from '../../hooks/useAsync';
import useQuery from '../../hooks/useQuery';

// fake service
const typicodeSevice = async () => fetch('https://jsonplaceholder.typicode.com/todos/1');

const App = () => {
  const { fieldChange, getValueInField } = useForm();
  const { filters } = useQuery();

  const { run } = useAsync({
    onSuccess: payload => {
      console.log('say hi', payload);
    }
  });

  useEffect(() => {
    run(typicodeSevice);
  }, []);

  return (
    <div>
      <Form fieldChange={fieldChange}>
        <Input 
          name="email"
          value={getValueInField('email')}
          placeholder="Nhập email"
        />
        <br />
        <Input 
          name="password"
          value={getValueInField('password')}
          placeholder="Nhập mật khẩu"
        />
      </Form>
    </div>
  )
};

export default App;