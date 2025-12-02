import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function RippleButton({ children, onClick, className = '', disabled = false }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 500,
            height: 500,
            opacity: 0,
            x: -250,
            y: -250,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </button>
  );
}
