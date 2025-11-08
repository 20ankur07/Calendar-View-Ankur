
import React from 'react';
import { clsx } from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'ghost'|'danger' };

export const Button: React.FC<Props> = ({ className, variant='primary', ...props }) => {
  const base = 'px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  }[variant];
  return <button className={clsx(base, styles, className)} {...props} />;
};
