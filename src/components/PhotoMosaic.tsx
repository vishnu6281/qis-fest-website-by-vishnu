import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface PhotoMosaicProps {
  photos: Array<{ image: string; name: string }>;
  isAdmin?: boolean;
  onDeletePhoto?: (index: number) => void;
}

export const PhotoMosaic = ({ photos, isAdmin = false, onDeletePhoto }: PhotoMosaicProps) => {
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
    <div ref={containerRef} className="photo-text-container bg-black">
      <h1 className="photo-text absolute inset-0 flex items-center justify-center font-black text-[15vw] tracking-tight">
        QIS FEST
      </h1>
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform"
          >
            <img
              src={photo.image}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2">
              <p className="text-white text-sm font-medium">{photo.name}</p>
              {isAdmin && onDeletePhoto && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeletePhoto(index)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};