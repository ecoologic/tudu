import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { tShirtSizes } from '../helpers/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  defaultValue = 'M',
  register 
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm mb-2">{label}</label>
      <Select 
        name={name} 
        defaultValue={defaultValue}
        onValueChange={(value) => {
          // This is needed because react-hook-form doesn't automatically detect the change
          const event = { target: { name, value } };
          register(name).onChange(event as React.ChangeEvent<HTMLSelectElement>);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${name}`} />
        </SelectTrigger>
        <SelectContent>
          {tShirtSizes.map(size => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" defaultValue={defaultValue} {...register(name)} />
    </div>
  );
};
