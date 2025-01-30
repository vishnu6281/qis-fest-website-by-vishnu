import { useNavigate } from "react-router-dom";
import { PhotoMosaic } from "@/components/PhotoMosaic";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PhotoMosaicPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const photos = JSON.parse(localStorage.getItem("photos") || "[]");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 bg-black/20 p-4 rounded-lg">
          <Button 
            onClick={() => navigate("/")}
            variant="secondary"
            className="bg-white text-black hover:bg-white"
          >
            ← Back to Home
          </Button>
          <Button
            onClick={() => setIsAdmin(!isAdmin)}
            variant="secondary"
            className="bg-white text-black hover:bg-white"
          >
            {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
          </Button>
        </div>
        
        <h1 className="text-6xl font-bold text-center mb-8 photo-text">
          QIS FEST
        </h1>
        
        {photos.length > 0 ? (
          <PhotoMosaic photos={photos} isAdmin={isAdmin} onDeletePhoto={(index) => {
            const newPhotos = [...photos];
            newPhotos.splice(index, 1);
            localStorage.setItem("photos", JSON.stringify(newPhotos));
            window.location.reload();
          }} />
        ) : (
          <div className="text-center text-white/80 mt-8">
            No photos have been added yet. Take some photos from the home page!
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoMosaicPage;