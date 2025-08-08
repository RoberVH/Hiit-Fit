import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface NumberInputProps {
  id: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, label, name, register, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
      <input
        id={id}
        type="number"
        {...register(name, { valueAsNumber: true })}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
    </div>
  );
};

export default NumberInput;