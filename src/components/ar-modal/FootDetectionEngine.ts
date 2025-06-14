
export interface FootDetection {
  detected: boolean;
  confidence: number;
  position: { x: number; y: number };
  size: number;
  orientation: number;
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface CalibrationData {
  footLength: number; // in cm
  footWidth: number; // in cm
  shoeSize: number;
  preferredPosition: { x: number; y: number };
}

export class FootDetectionEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private calibration: CalibrationData | null = null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  setCalibration(data: CalibrationData) {
    this.calibration = data;
    localStorage.setItem('ar-calibration', JSON.stringify(data));
  }

  getCalibration(): CalibrationData | null {
    if (this.calibration) return this.calibration;
    
    const stored = localStorage.getItem('ar-calibration');
    if (stored) {
      this.calibration = JSON.parse(stored);
      return this.calibration;
    }
    return null;
  }

  detectFeet(videoElement: HTMLVideoElement): FootDetection[] {
    if (!videoElement.videoWidth || !videoElement.videoHeight) {
      return [];
    }

    // Simulate advanced foot detection with realistic parameters
    const detections: FootDetection[] = [];
    const baseConfidence = 0.75 + Math.random() * 0.2;
    
    if (baseConfidence > 0.6) {
      // Left foot detection
      const leftFoot: FootDetection = {
        detected: true,
        confidence: baseConfidence,
        position: {
          x: 35 + (Math.random() - 0.5) * 5,
          y: 65 + (Math.random() - 0.5) * 3
        },
        size: this.calibration ? this.calibration.footLength / 25 : 1.0 + (Math.random() - 0.5) * 0.2,
        orientation: (Math.random() - 0.5) * 15, // degrees
        boundingBox: {
          x: 25 + (Math.random() - 0.5) * 10,
          y: 55 + (Math.random() - 0.5) * 5,
          width: 80 + (Math.random() - 0.5) * 10,
          height: 120 + (Math.random() - 0.5) * 15
        }
      };

      // Right foot detection
      const rightFoot: FootDetection = {
        detected: baseConfidence > 0.7,
        confidence: baseConfidence * 0.9,
        position: {
          x: 65 + (Math.random() - 0.5) * 5,
          y: 65 + (Math.random() - 0.5) * 3
        },
        size: leftFoot.size + (Math.random() - 0.5) * 0.1,
        orientation: leftFoot.orientation + (Math.random() - 0.5) * 10,
        boundingBox: {
          x: 55 + (Math.random() - 0.5) * 10,
          y: 55 + (Math.random() - 0.5) * 5,
          width: 80 + (Math.random() - 0.5) * 10,
          height: 120 + (Math.random() - 0.5) * 15
        }
      };

      detections.push(leftFoot);
      if (rightFoot.detected) {
        detections.push(rightFoot);
      }
    }

    return detections;
  }

  calculateShoePosition(foot: FootDetection, shoeSize: number): {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  } {
    const sizeMultiplier = this.calibration 
      ? (shoeSize / this.calibration.shoeSize) 
      : 1.0;

    return {
      x: foot.position.x,
      y: foot.position.y - 5, // Slightly above foot
      scale: foot.size * sizeMultiplier,
      rotation: foot.orientation
    };
  }
}
