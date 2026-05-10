import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import type { CardProps } from '@/types';
import { cn } from '@/utils';

const Card: FC<CardProps> = ({ title, href, image, className }) => {
  return (
    <Link href={href} className={cn("card", className)}>
      <img src={image} alt={title} />
      <div className="card-copy">{title}</div>
    </Link>
  );
};

export default Card;