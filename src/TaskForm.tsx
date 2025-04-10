import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from './tasks';
import { tShirtSizes } from './helpers/types';

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'uuid' | 'created_at' | 'updated_at' | 'position'> & { tags: string[] }) => void;
  task?: Partial<Task>;
}

export const TaskForm: FC<TaskFormProps> = ({ onSubmit, task = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    defaultValues: {
      title: task.title || '',
      description: task.description || '',
      value: task.value || 'M',
      effort: task.effort || 'M',
      tags: task.tags || [],
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          autoFocus
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm">Value</label>
          <select {...register('value')} className="p-2 border rounded">
            {tShirtSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm">Effort</label>
          <select {...register('effort')} className="p-2 border rounded">
            {tShirtSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <input
          {...register('tags')}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};
