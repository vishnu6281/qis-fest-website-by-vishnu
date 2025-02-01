import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "@/components/Camera";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

// Array of gradient backgrounds
const gradients = [
  "bg-gradient-to-br from-blue-600 to-purple-600",
  "bg-gradient-to-br from-pink-500 to-orange-500",
  "bg-gradient-to-br from-green-400 to-blue-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-yellow-400 to-red-500",
  "bg-gradient-to-br from-indigo-500 to-pink-500",
  "bg-gradient-to-br from-teal-400 to-blue-500",
  "bg-gradient-to-br from-orange-400 to-rose-500"
];

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<Array<{ id: string; image_url: string; name: string }>>([]);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);

  // Effect for changing background gradient
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gradients.length);
      setCurrentGradient(gradients[randomIndex]);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Fetch photos on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPhotos(data);
    } catch (error) {
      toast.error("Error fetching photos");
    }
  };

  const handleCapture = async (image: string) => {
    try {
      // Convert base64 to blob
      const base64Data = image.split(',')[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
      
      // Upload to Supabase Storage
      const fileName = `${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      setTempImage(publicUrl);
    } catch (error) {
      toast.error("Failed to upload photo");
    }
    setShowCamera(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tempImage && name.trim()) {
      try {
        const { error } = await supabase
          .from('photos')
          .insert([
            { image_url: tempImage, name: name.trim() }
          ]);

        if (error) throw error;

        setTempImage(null);
        setName("");
        toast.success("Photo added successfully!");
        fetchPhotos(); // Refresh the photos list
      } catch (error) {
        toast.error("Error saving photo");
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${currentGradient} text-white overflow-hidden`}>
      <main className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center gap-8">
          <motion.img 
            src="/lovable-uploads/ca7c2a52-60b2-4d93-b799-5e0b8d9edb44.png" 
            alt="QIS Fest Logo" 
            className="w-64 mx-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          />
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center w-full"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 photo-text">QIS FEST 2K25</h1>
            <p className="text-xl text-white/80 mb-8">
              QIS College of Engineering and Technology
            </p>
            
            <div className="flex flex-col gap-4 items-center max-w-xl mx-auto">
              {showCamera ? (
                <Camera onCapture={handleCapture} onClose={() => setShowCamera(false)} />
              ) : tempImage ? (
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <motion.div 
                    className="relative aspect-video rounded-lg overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={tempImage} alt="Preview" className="w-full h-full object-cover" />
                  </motion.div>
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

        <AnimatePresence>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
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
                duration: 30,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
                delay: index * 0.2,
              }}
              drag
              dragConstraints={{
                top: 0,
                left: 0,
                right: window.innerWidth - 128,
                bottom: window.innerHeight - 128,
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
            >
              <motion.div 
                className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={photo.image_url}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-1">
                  <p className="text-white text-xs truncate text-center">{photo.name}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;