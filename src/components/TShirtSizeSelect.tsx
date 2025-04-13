import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { tShirtSizes } from '../helpers/types';
import { Task } from '../tasks';

interface TShirtSizeSelectProps {
  name: 'value' | 'effort';
  label: string;
  defaultValue?: string;
  register: UseFormRegister<Task>;
}

export const TShirtSizeSelect: FC<TShirtSizeSelectProps> = ({
  name,
  label,
  defaultValue,
  register
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm mb-2" htmlFor={name}>{label}</label>
      <select
        id={name}
        defaultValue={defaultValue}
        className="w-full h-10 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        {...register(name)}
      >
        <option value="" disabled>{`Select ${name}`}</option>
        {tShirtSizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
};
