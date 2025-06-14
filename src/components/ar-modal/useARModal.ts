
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const useARModal = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [shoeColor, setShoeColor] = useState("#8B4513");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if camera is available
    const checkCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCamera(true);
      } catch (error) {
        console.error('Camera check failed:', error);
        setHasCamera(false);
      }
    };

    checkCamera();
  }, []);

  const startAR = async () => {
    try {
      console.log('Starting AR camera...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setCameraStream(stream);
      setIsARActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log('Camera started successfully');
      }

      toast({
        title: "AR Try-On Active",
        description: "Point your camera at your feet and position them in the frame.",
      });
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use AR try-on feature.",
        variant: "destructive",
      });
    }
  };

  const stopAR = () => {
    console.log('Stopping AR camera...');
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      setCameraStream(null);
    }
    setIsARActive(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the video frame
        ctx.drawImage(video, 0, 0);
        
        // Convert to base64
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        console.log('Photo captured successfully');
        toast({
          title: "Photo Captured!",
          description: "Your AR try-on photo has been saved. You can download it now.",
        });
      }
    }
  };

  const resetView = () => {
    setShoeColor("#8B4513");
    setCapturedImage(null);
    toast({
      title: "View Reset",
      description: "AR view has been reset to default settings.",
    });
  };

  return {
    isARActive,
    cameraStream,
    hasCamera,
    shoeColor,
    capturedImage,
    videoRef,
    startAR,
    stopAR,
    resetView,
    setShoeColor,
    capturePhoto
  };
};
