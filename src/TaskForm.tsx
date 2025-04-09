import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Task, TaskStatus } from './tasks';
import { tShirtSizes } from './helpers/types';

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'uuid' | 'created_at' | 'updated_at' | 'position'> & { tags: string[] | string }) => void;
  initialData?: Partial<Task>;
}

const taskStatuses: TaskStatus[] = ['todo', 'started', 'done'];

export const TaskForm: FC<TaskFormProps> = ({ onSubmit, initialData = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      value: initialData.value || 'M',
      effort: initialData.effort || 'M',
      status: initialData.status || 'todo',
      is_blocked: initialData.is_blocked || false,
      tags: initialData.tags || [],
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="Task title"
          className="w-full p-2 border rounded"
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

        <div>
          <label className="block text-sm">Status</label>
          <select {...register('status')} className="p-2 border rounded">
            {taskStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('is_blocked')} />
          <span>Is Blocked</span>
        </label>
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
        Save Task
      </button>
    </form>
  );
};
