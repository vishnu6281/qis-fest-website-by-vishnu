import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useLongPress } from "@/hooks/useLongPress";

interface PhotoMosaicProps {
  photos: Array<{ image: string; name: string }>;
  isAdmin?: boolean;
  onDeletePhoto?: (index: number) => void;
}

export const PhotoMosaic = ({ photos, isAdmin = false, onDeletePhoto }: PhotoMosaicProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const longPressProps = useLongPress((index: number) => {
    if (isAdmin && onDeletePhoto) {
      setSelectedPhoto(index);
    }
  });

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
    <div ref={containerRef} className="photo-text-container">
      <motion.h1 
        className="photo-text absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        QIS FEST
      </motion.h1>
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-8">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            {...longPressProps(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={photo.image}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col gap-2">
              <p className="text-white text-sm font-medium">{photo.name}</p>
              {(isAdmin && onDeletePhoto && (selectedPhoto === index || !selectedPhoto)) && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    onDeletePhoto(index);
                    setSelectedPhoto(null);
                  }}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};