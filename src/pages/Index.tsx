import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera } from "@/components/Camera";
import { toast } from "sonner";

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<Array<{ image: string; name: string }>>([]);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const maxWidth = 800;
      const maxHeight = 600;
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
      setTempImage(compressedImage);
    };
    setShowCamera(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempImage && name.trim()) {
      const newPhotos = [...photos, { image: tempImage, name: name.trim() }];
      setPhotos(newPhotos);
      localStorage.setItem("photos", JSON.stringify(newPhotos));
      setTempImage(null);
      setName("");
      toast.success("Photo added successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden">
      <main className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center gap-8">
          <img 
            src="/lovable-uploads/ca7c2a52-60b2-4d93-b799-5e0b8d9edb44.png" 
            alt="QIS Fest Logo" 
            className="w-64 mx-auto animate-fade-in"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-center w-full"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">QIS FEST 2K25</h1>
            <p className="text-xl text-white/80 mb-8">
              QIS College of Engineering and Technology
            </p>
            
            <div className="flex flex-col gap-4 items-center max-w-xl mx-auto">
              {showCamera ? (
                <Camera onCapture={handleCapture} onClose={() => setShowCamera(false)} />
              ) : tempImage ? (
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img src={tempImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setTempImage(null)}
                      className="flex-1 bg-white text-black hover:bg-white/90"
                    >
                      Take Another Photo
                    </Button>
                    <Button type="submit" className="flex-1">
                      Add to Collection
                    </Button>
                  </div>
                </form>
              ) : (
                <Button
                  onClick={() => setShowCamera(true)}
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-xl py-6 px-8"
                >
                  Take a Photo
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {photos.length > 0 && (
          <div className="fixed inset-0 pointer-events-none">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              >
                <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                    <p className="text-white text-xs truncate">{photo.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;