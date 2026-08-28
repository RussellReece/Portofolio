import React from 'react';

interface VideoEmbedProps {
  src: string;
  title?: string;
}

export default function VideoEmbed({ src, title = 'Video Player' }: VideoEmbedProps) {
  if (!src) return null;
  
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg my-8">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
}
