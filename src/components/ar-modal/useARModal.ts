
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const useARModal = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [shoeColor, setShoeColor] = useState("#8B4513");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasCamera(true))
      .catch(() => setHasCamera(false));
  }, []);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setIsARActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      toast({
        title: "AR Try-On Active",
        description: "Point your camera at your feet and move them into the frame.",
      });
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use AR try-on feature.",
        variant: "destructive",
      });
    }
  };

  const stopAR = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsARActive(false);
  };

  const resetView = () => {
    setShoeColor("#8B4513");
    toast({
      title: "View Reset",
      description: "3D model has been reset to default position.",
    });
  };

  return {
    isARActive,
    cameraStream,
    hasCamera,
    shoeColor,
    videoRef,
    startAR,
    stopAR,
    resetView,
    setShoeColor
  };
};
