import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, label, name, register, error, type = "text", placeholder }) => {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
      <input
        id={id}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
    </div>
  );
};

export default Input;