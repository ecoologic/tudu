import { FC, useState, useRef, useEffect } from 'react';
import { Trash2, Check } from 'lucide-react';

interface ConfirmableActionProps {
  onConfirm: () => void;
  size?: number;
  className?: string;
}

export const ConfirmableAction: FC<ConfirmableActionProps> = ({
  onConfirm,
  size = 18,
  className = '',
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isConfirming) {
      onConfirm();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
    }
  };

  useEffect(() => {
    if (!isConfirming) return;

    const handleMouseLeave = () => {
      setIsConfirming(false);
    };

    const container = containerRef.current;
    container?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isConfirming]);

  return (
    <div 
      ref={containerRef}
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      aria-label={isConfirming ? "Confirm delete" : "Delete"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {isConfirming ? (
        <Check 
          size={size} 
          className="text-red-500 animate-pulse" 
        />
      ) : (
        <Trash2 
          size={size} 
          className="text-muted-foreground/70 hover:text-red-500 transition-colors" 
        />
      )}
    </div>
  );
};
