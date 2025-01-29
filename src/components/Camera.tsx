import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera as CameraIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CameraProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

export const Camera = ({ onCapture, onClose }: CameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      toast.success("Photo captured!");
    } else {
      toast.error("Failed to capture photo. Please try again.");
    }
  }, [onCapture]);

  return (
    <div className="camera-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        onUserMedia={() => setIsCameraReady(true)}
        onUserMediaError={() => toast.error("Unable to access camera")}
      />
      <div className="camera-overlay">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        {isCameraReady && (
          <Button 
            onClick={capture}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <CameraIcon className="mr-2 h-4 w-4" />
            Capture
          </Button>
        )}
      </div>
    </div>
  );
};