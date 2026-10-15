import type { ComponentProps } from 'react';

export default function DetailArticleLink({ href, target, rel, ...props }: ComponentProps<'a'>) {
  const isPdf = href?.split(/[?#]/, 1)[0].toLowerCase().endsWith('.pdf');

  return (
    <a
      href={href}
      {...props}
      target={isPdf ? '_blank' : target}
      rel={isPdf ? 'noopener noreferrer' : rel}
    />
  );
}
