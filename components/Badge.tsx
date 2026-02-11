import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm',
        {
          'bg-white/10 text-lightgray border border-white/20': variant === 'default',
          'bg-accent/20 text-accent border border-accent/30': variant === 'success',
          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30': variant === 'warning',
          'bg-softblue/20 text-softblue border border-softblue/30': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
