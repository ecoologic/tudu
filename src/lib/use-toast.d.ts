import { type ToastActionElement, type ToastProps } from "../components/ui/toast";

export interface ToasterToast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

export interface ToastState {
  toasts: ToasterToast[];
}

export interface UseToastReturn extends ToastState {
  toast: (props: Omit<ToasterToast, "id">) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  dismiss: (toastId?: string) => void;
}

export function useToast(): UseToastReturn;
export function toast(props: Omit<ToasterToast, "id">): {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};
