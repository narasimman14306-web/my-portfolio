import { fitnessService } from './fitnessService';

/**
 * Real-time automatic step detection engine using DeviceMotion accelerometer.
 * Detects footsteps via acceleration magnitude peak filtering.
 */
class PedometerService {
  constructor() {
    this.isTracking = false;
    this.stepCount = 0;
    this.lastStepTime = 0;
    this.stepThreshold = 11.8; // Peak threshold in m/s²
    this.minStepInterval = 320; // Min time (ms) between steps (~3 steps/sec max)
    this.maxStepInterval = 2000; // Max time (ms) between continuous steps
    this.onStepCallback = null;
    this.motionHandler = this.handleMotion.bind(this);
    this.saveDebounceTimer = null;
  }

  isSupported() {
    return typeof window !== 'undefined' && 'DeviceMotionEvent' in window;
  }

  async requestPermission() {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        return response === 'granted';
      } catch (e) {
        console.warn('DeviceMotionEvent permission denied:', e);
        return false;
      }
    }
    return true; // Granted by default on Android and desktop browsers
  }

  startTracking(onStep) {
    if (this.isTracking) return;
    this.onStepCallback = onStep;
    this.isTracking = true;

    if (typeof window !== 'undefined') {
      window.addEventListener('devicemotion', this.motionHandler, true);
    }
  }

  stopTracking() {
    if (!this.isTracking) return;
    this.isTracking = false;

    if (typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', this.motionHandler, true);
    }

    // Flush any pending save
    this.saveStepsToDatabase();
  }

  handleMotion(event) {
    if (!this.isTracking) return;

    const acc = event.accelerationIncludingGravity || event.acceleration;
    if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;

    // Calculate acceleration vector magnitude
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const now = Date.now();

    // Peak detection with human walking frequency debounce
    if (magnitude > this.stepThreshold) {
      const timeSinceLastStep = now - this.lastStepTime;

      if (timeSinceLastStep > this.minStepInterval) {
        this.lastStepTime = now;
        this.stepCount += 1;

        if (this.onStepCallback) {
          this.onStepCallback(1);
        }

        this.scheduleDatabaseSync();
      }
    }
  }

  // Debounced auto-save to Dexie so we don't hammer disk I/O on every single step
  scheduleDatabaseSync() {
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }
    this.saveDebounceTimer = setTimeout(() => {
      this.saveStepsToDatabase();
    }, 2500);
  }

  async saveStepsToDatabase() {
    if (this.stepCount > 0) {
      const stepsToSave = this.stepCount;
      this.stepCount = 0; // Reset session buffer
      await fitnessService.logActivity({
        steps: stepsToSave,
        type: 'walk'
      });
      window.dispatchEvent(new Event('levelup-data-changed'));
    }
  }
}

export const pedometerService = new PedometerService();
