import { useState } from "react";
import { Camera } from "@/components/Camera";
import { PhotoMosaic } from "@/components/PhotoMosaic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera as CameraIcon } from "lucide-react";

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<Array<{ image: string; name: string }>>([]);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    setTempImage(image);
    setShowCamera(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempImage && name.trim()) {
      setPhotos([...photos, { image: tempImage, name: name.trim() }]);
      setTempImage(null);
      setName("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">QIS FEST 2K25</h1>
          <p className="text-xl text-white/80">
            QIS College of Engineering and Technology
          </p>
        </div>

        {showCamera ? (
          <Camera onCapture={handleCapture} onClose={() => setShowCamera(false)} />
        ) : (
          <div className="max-w-md mx-auto mb-16">
            {tempImage ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={tempImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTempImage(null)}
                    className="flex-1"
                  >
                    Retake
                  </Button>
                  <Button type="submit" className="flex-1">
                    Add to Mosaic
                  </Button>
                </div>
              </form>
            ) : (
              <Button
                onClick={() => setShowCamera(true)}
                size="lg"
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                <CameraIcon className="mr-2 h-5 w-5" />
                Take a Photo
              </Button>
            )}
          </div>
        )}

        <PhotoMosaic photos={photos} />
      </main>
    </div>
  );
};

export default Index;