import { useEffect, useRef, useState } from 'react';
import { Heart, Activity, Droplet, Wind } from 'lucide-react';

interface LiveMonitorsProps {
  patientId: string;
}

export function LiveMonitors({ patientId }: LiveMonitorsProps) {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const spo2CanvasRef = useRef<HTMLCanvasElement>(null);
  const arterialCanvasRef = useRef<HTMLCanvasElement>(null);
  const capnographyCanvasRef = useRef<HTMLCanvasElement>(null);

  const [vitals, setVitals] = useState({
    hr: 78,
    spo2: 96,
    rr: 16,
    abpSystolic: 118,
    abpDiastolic: 72,
    abpMean: 87,
    etco2: 38,
    temp: 36.8
  });

  // ECG Waveform Generator
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // ECG pattern generator
    const generateECGPoint = (t: number) => {
      const baselineNoise = Math.sin(t * 0.5) * 2;
      const heartRate = vitals.hr / 60;
      const phase = (t * heartRate * 2 * Math.PI) % (2 * Math.PI);

      // P wave
      if (phase < 0.3) {
        return -15 * Math.sin(phase * 10) + baselineNoise;
      }
      // QRS complex
      if (phase >= 0.3 && phase < 0.6) {
        const qrsPhase = (phase - 0.3) / 0.3;
        if (qrsPhase < 0.2) return 10 * Math.sin(qrsPhase * 15) + baselineNoise;
        if (qrsPhase < 0.5) return -80 * Math.sin((qrsPhase - 0.2) * 10) + baselineNoise;
        return 100 * Math.sin((qrsPhase - 0.5) * 6) + baselineNoise;
      }
      // T wave
      if (phase >= 0.6 && phase < 1.2) {
        return -25 * Math.sin((phase - 0.6) * 5) + baselineNoise;
      }
      return baselineNoise;
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(x, 0, 3, height);

      const t = Date.now() / 1000;
      const y = centerY - generateECGPoint(t);

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 1, centerY - generateECGPoint(t - 0.01));
      ctx.lineTo(x, y);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      x = (x + 2) % width;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [vitals.hr]);

  // SpO2 Plethysmography Waveform
  useEffect(() => {
    const canvas = spo2CanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    const generateSpO2Point = (t: number) => {
      const heartRate = vitals.hr / 60;
      const phase = (t * heartRate * 2 * Math.PI) % (2 * Math.PI);
      
      // Pulse oximetry waveform
      if (phase < Math.PI) {
        return -30 * Math.sin(phase) + Math.sin(t * 2) * 2;
      }
      return Math.sin(t * 2) * 2;
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(x, 0, 3, height);

      const t = Date.now() / 1000;
      const y = centerY - generateSpO2Point(t);

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 1, centerY - generateSpO2Point(t - 0.01));
      ctx.lineTo(x, y);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      x = (x + 2) % width;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [vitals.hr]);

  // Arterial Blood Pressure Waveform
  useEffect(() => {
    const canvas = arterialCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;

    const generateABPPoint = (t: number) => {
      const heartRate = vitals.hr / 60;
      const phase = (t * heartRate * 2 * Math.PI) % (2 * Math.PI);
      
      // Arterial waveform with systolic peak and dicrotic notch
      if (phase < 0.4) {
        return 40 + 30 * Math.sin(phase * 7.5);
      }
      if (phase < 0.6) {
        return 70 - 20 * Math.sin((phase - 0.4) * 15);
      }
      if (phase < 0.8) {
        return 50 + 5 * Math.sin((phase - 0.6) * 15);
      }
      return 50 - 10 * ((phase - 0.8) / 1.2);
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(x, 0, 3, height);

      const t = Date.now() / 1000;
      const y = height - generateABPPoint(t) - 10;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 1, height - generateABPPoint(t - 0.01) - 10);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      x = (x + 2) % width;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [vitals.hr]);

  // Capnography (EtCO2) Waveform
  useEffect(() => {
    const canvas = capnographyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;

    const generateCapnoPoint = (t: number) => {
      const respRate = vitals.rr / 60;
      const phase = (t * respRate * 2 * Math.PI) % (2 * Math.PI);
      
      // Capnography square wave pattern
      if (phase < 0.3) {
        return 10 + 50 * (phase / 0.3);
      }
      if (phase < 1.5) {
        return 60;
      }
      if (phase < 1.8) {
        return 60 - 50 * ((phase - 1.5) / 0.3);
      }
      return 10;
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(x, 0, 3, height);

      const t = Date.now() / 1000;
      const y = height - generateCapnoPoint(t) - 10;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 1, height - generateCapnoPoint(t - 0.01) - 10);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      x = (x + 2) % width;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [vitals.rr]);

  // Simulate realistic vital sign variations
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        hr: prev.hr + (Math.random() - 0.5) * 2,
        spo2: Math.min(100, Math.max(90, prev.spo2 + (Math.random() - 0.5) * 0.5)),
        rr: prev.rr + (Math.random() - 0.5) * 0.5,
        abpSystolic: prev.abpSystolic + (Math.random() - 0.5) * 3,
        abpDiastolic: prev.abpDiastolic + (Math.random() - 0.5) * 2,
        abpMean: prev.abpMean + (Math.random() - 0.5) * 2,
        etco2: prev.etco2 + (Math.random() - 0.5) * 1,
        temp: prev.temp + (Math.random() - 0.5) * 0.1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* ECG Monitor */}
      <div className="bg-black rounded-lg p-4 border-2 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-500" />
            <span className="text-white text-sm">ECG (Lead II)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-green-400">Heart Rate</div>
              <div className="text-3xl text-green-500">{Math.round(vitals.hr)}</div>
              <div className="text-xs text-green-400">bpm</div>
            </div>
          </div>
        </div>
        <canvas
          ref={ecgCanvasRef}
          width={1200}
          height={150}
          className="w-full bg-black rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* SpO2 Plethysmography */}
        <div className="bg-black rounded-lg p-4 border-2 border-cyan-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-cyan-500" />
              <span className="text-white text-sm">SpO2 Plethysmography</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-cyan-400">SpO2</div>
              <div className="text-2xl text-cyan-500">{Math.round(vitals.spo2)}%</div>
            </div>
          </div>
          <canvas
            ref={spo2CanvasRef}
            width={580}
            height={120}
            className="w-full bg-black rounded"
          />
        </div>

        {/* Arterial Blood Pressure */}
        <div className="bg-black rounded-lg p-4 border-2 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              <span className="text-white text-sm">Arterial Blood Pressure</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-red-400">ABP</div>
              <div className="text-2xl text-red-500">
                {Math.round(vitals.abpSystolic)}/{Math.round(vitals.abpDiastolic)}
              </div>
              <div className="text-xs text-red-400">({Math.round(vitals.abpMean)}) mmHg</div>
            </div>
          </div>
          <canvas
            ref={arterialCanvasRef}
            width={580}
            height={120}
            className="w-full bg-black rounded"
          />
        </div>
      </div>

      {/* Capnography */}
      <div className="bg-black rounded-lg p-4 border-2 border-yellow-500">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-yellow-500" />
            <span className="text-white text-sm">Capnography (EtCO2)</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-yellow-400">EtCO2</div>
              <div className="text-2xl text-yellow-500">{Math.round(vitals.etco2)}</div>
              <div className="text-xs text-yellow-400">mmHg</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-yellow-400">RR</div>
              <div className="text-2xl text-yellow-500">{Math.round(vitals.rr)}</div>
              <div className="text-xs text-yellow-400">/min</div>
            </div>
          </div>
        </div>
        <canvas
          ref={capnographyCanvasRef}
          width={1200}
          height={120}
          className="w-full bg-black rounded"
        />
      </div>

      {/* Additional Vital Signs Display */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-300">
          <div className="text-xs text-red-700 mb-1">Temperature</div>
          <div className="text-2xl text-red-900">{vitals.temp.toFixed(1)}°C</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-300">
          <div className="text-xs text-blue-700 mb-1">Heart Rate</div>
          <div className="text-2xl text-blue-900">{Math.round(vitals.hr)} bpm</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-300">
          <div className="text-xs text-cyan-700 mb-1">SpO2</div>
          <div className="text-2xl text-cyan-900">{Math.round(vitals.spo2)}%</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-300">
          <div className="text-xs text-green-700 mb-1">Resp Rate</div>
          <div className="text-2xl text-green-900">{Math.round(vitals.rr)}/min</div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-700">All monitors active</span>
          </div>
          <div className="text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}
