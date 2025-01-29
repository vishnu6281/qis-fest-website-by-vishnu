import { useState } from "react";
import { Camera } from "@/components/Camera";
import { PhotoMosaic } from "@/components/PhotoMosaic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera as CameraIcon, KeyRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PhotoMosaicPage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<Array<{ image: string; name: string }>>([]);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      toast({
        title: "Photo added successfully!",
        description: "Your photo has been added to the mosaic.",
      });
    }
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    toast({
      title: "Photo deleted",
      description: "The photo has been removed from the mosaic.",
      variant: "destructive",
    });
  };

  const toggleAdmin = () => {
    const password = prompt("Enter admin password:");
    if (password === "Vishnu@062") {
      setIsAdmin(!isAdmin);
      toast({
        title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
        description: isAdmin ? "You are now in user mode" : "You can now manage photos",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again with the correct password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-8"
        >
          Back to Home
        </Button>

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

        <PhotoMosaic 
          photos={photos} 
          isAdmin={isAdmin} 
          onDeletePhoto={handleDeletePhoto}
        />

        <div className="fixed bottom-8 right-8">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleAdmin}
            className="bg-white/10 hover:bg-white/20"
          >
            <KeyRound className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PhotoMosaicPage;