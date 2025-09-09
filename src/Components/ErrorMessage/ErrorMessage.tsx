import css from "./ErrorMessage.module.css"
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface ErrorMessageProps {
  message: string | null;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: 'top-right',
        duration: 4000, 
        className: css.error, 
      });

      
      onClose();
    }
  }, [message, onClose]);

  
  return null;
}