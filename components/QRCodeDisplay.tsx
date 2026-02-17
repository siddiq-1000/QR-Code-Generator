
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QRConfig } from '../types';
import { Download, Loader2 } from 'lucide-react';

interface Props {
  config: QRConfig;
  themeId?: string;
}

const QRCodeDisplay: React.FC<Props> = ({ config, themeId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const drawQR = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      try {
        const qrSize = 1000; 
        const tempCanvas = document.createElement('canvas');
        await QRCode.toCanvas(tempCanvas, config.value || 'SIDDIQ-STUDIO', {
          width: qrSize,
          margin: 2,
          color: {
            dark: config.fgColor,
            light: config.bgColor,
          },
          errorCorrectionLevel: 'H',
        });

        canvas.width = qrSize;
        canvas.height = qrSize;
        ctx.clearRect(0, 0, qrSize, qrSize);
        ctx.drawImage(tempCanvas, 0, 0);

        if (config.includeImage && config.imageSrc) {
          const img = new Image();
          img.src = config.imageSrc;
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          // Logo Sizing
          const logoScale = config.imageSize / 100;
          const logoW = qrSize * logoScale;
          const logoH = logoW;

          const x = qrSize / 2;
          const y = qrSize / 2;
          const padding = (config.logoPadding || 12) * (qrSize / 400);
          
          ctx.fillStyle = config.bgColor;
          ctx.save();
          
          const drawShape = (context: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number, shape: string) => {
            context.beginPath();
            if (shape === 'circle') {
              context.arc(cx, cy, w / 2, 0, Math.PI * 2);
            } else {
              // Standard Square
              context.rect(cx - w / 2, cy - h / 2, w, h);
            }
          };

          // 1. Draw Mask
          drawShape(ctx, x, y, logoW + padding, logoH + padding, config.logoShape);
          ctx.fill();

          // 2. Draw Image (Clipped)
          ctx.save();
          drawShape(ctx, x, y, logoW, logoH, config.logoShape);
          ctx.clip();
          ctx.drawImage(img, x - logoW / 2, y - logoH / 2, logoW, logoH);
          ctx.restore();
          
          ctx.restore();
        }
      } catch (err) {
        console.error("Master QR Generation Failure:", err);
      }
    };

    drawQR();
  }, [config]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `siddiq-studio-${themeId || 'absolute'}-qr.png`;
      link.href = canvasRef.current!.toDataURL('image/png');
      link.click();
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full bg-white transition-all duration-500 overflow-hidden group">
      <div className="px-5 py-3 border-b border-black/5 flex justify-between items-center bg-zinc-50 font-mono">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Terminal_Link_Active</span>
        </div>
        <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Master_v4</div>
      </div>
      
      <div className="p-10 md:p-14 flex justify-center items-center bg-white relative min-h-[350px]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-auto max-w-[320px] transition-transform duration-700 group-hover:scale-[1.03]" 
          style={{ imageRendering: 'auto' }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="w-full h-16 bg-black text-white font-black text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-zinc-900 transition-all group disabled:opacity-50 font-mono border-t border-white/10"
      >
        {isExporting ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          <div className="flex items-center gap-3">
            <span>EXPORT MASTER</span>
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
};

export default QRCodeDisplay;
