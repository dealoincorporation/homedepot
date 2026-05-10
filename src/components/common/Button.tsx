import Link from 'next/link';
import type { FC } from 'react';
import type { ButtonProps } from '@/types';
import { cn, isExternalUrl } from '@/utils';

const Button: FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false
}) => {
  const baseClasses = "inline-block font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-800 focus:ring-white"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    const isExternal = isExternalUrl(href);
    const Component = isExternal ? 'a' : Link;

    return (
      <Component
        href={href}
        className={classes}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;