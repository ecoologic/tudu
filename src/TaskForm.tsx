import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from './tasks';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { TShirtSizeSelect } from './components/TShirtSizeSelect';

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
        <Input
          {...register('title', { required: 'Title is required' })}
          placeholder="Task title"
          autoFocus
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div>
        <Textarea
          {...register('description')}
          placeholder="Description"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <TShirtSizeSelect
          name="value"
          label="Value"
          defaultValue={task.value}
          register={register}
        />

        <TShirtSizeSelect
          name="effort"
          label="Effort"
          defaultValue={task.effort}
          register={register}
        />
      </div>

      <div>
        <Input
          {...register('tags')}
          placeholder="Tags (comma-separated)"
        />
      </div>

      <Button type="submit">
        Save
      </Button>
    </form>
  );
};
