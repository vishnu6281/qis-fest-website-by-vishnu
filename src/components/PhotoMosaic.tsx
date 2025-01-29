import { useEffect, useRef } from "react";

interface PhotoMosaicProps {
  photos: Array<{ image: string; name: string }>;
}

export const PhotoMosaic = ({ photos }: PhotoMosaicProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.style.opacity = "0";
    
    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transition = "opacity 0.5s ease-in-out";
    }, 100);
  }, [photos]);

  return (
    <div ref={containerRef} className="relative min-h-[200px]">
      <h1 className="photo-text">QIS FEST</h1>
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <img
              src={photo.image}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm font-medium">{photo.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};