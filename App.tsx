
import React, { useState, useEffect, useRef } from 'react';
import { QRConfig, LogoShape } from './types';
import QRCodeDisplay from './components/QRCodeDisplay';
import {
  Plus,
  ChevronDown,
  Layout,
  Check,
  Trash2,
  Info,
  Square,
  Circle as CircleIcon,
  Github,
  Linkedin,
  Instagram,
  User,
  ArrowDown
} from 'lucide-react';

interface ThemeConfig {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  fontDisplay: string;
  fontClass: string;
  sphereOpacity: number;
  qrBg: string;
  qrFg: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'absolute',
    name: 'ABSOLUTE PROTOCOL',
    bg: '#000000',
    text: '#ffffff',
    accent: '#ff4d4d',
    fontDisplay: "'Syne', sans-serif",
    fontClass: 'font-absolute tracking-tighter uppercase leading-[0.8]',
    sphereOpacity: 0.15,
    qrBg: '#ffffff',
    qrFg: '#000000'
  },
  {
    id: 'sanga',
    name: 'BLACK SÄNGA',
    bg: '#141212',
    text: '#ece5d8',
    accent: '#d48806',
    fontDisplay: "'Fraunces', serif",
    fontClass: 'font-sanga italic tracking-tighter leading-[0.9]',
    sphereOpacity: 0.05,
    qrBg: '#ece5d8',
    qrFg: '#141212'
  },
  {
    id: 'clash',
    name: 'CLASH VIBE',
    bg: '#000000',
    text: '#ffffff',
    accent: '#ff9d00',
    fontDisplay: "'Outfit', sans-serif",
    fontClass: 'font-clash uppercase tracking-tight leading-[0.75] bg-clip-text text-transparent bg-gradient-to-br from-white via-orange-200 to-orange-500',
    sphereOpacity: 0.2,
    qrBg: '#ffffff',
    qrFg: '#000000'
  },
  {
    id: 'maghfirea',
    name: 'MAGHFIREA',
    bg: '#dcd7cc',
    text: '#1a1a1a',
    accent: '#8b7d6b',
    fontDisplay: "'Italiana', serif",
    fontClass: 'font-maghfirea tracking-tight leading-[0.9]',
    sphereOpacity: 0,
    qrBg: '#ffffff',
    qrFg: '#1a1a1a'
  },
  {
    id: 'minimal',
    name: 'STUDIO DARK',
    bg: '#ffffff',
    text: '#000000',
    accent: '#000000',
    fontDisplay: "'JetBrains Mono', monospace",
    fontClass: 'font-mono uppercase tracking-widest leading-[1]',
    sphereOpacity: 0.05,
    qrBg: '#000000',
    qrFg: '#ffffff'
  }
];

const DEFAULT_CONFIG: QRConfig = {
  value: 'ANYTHING WORTH HAVING TAKES TIME',
  size: 400,
  fgColor: '#000000',
  bgColor: '#ffffff',
  level: 'H',
  includeImage: false,
  imageSrc: '',
  imageSize: 22,
  borderRadius: 0,
  margin: 4,
  logoPadding: 12,
  logoShape: 'square'
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES[0]);
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [aboutImage, setAboutImage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    setConfig(prev => ({
      ...prev,
      fgColor: theme.qrFg,
      bgColor: theme.qrBg
    }));
    document.documentElement.style.setProperty('--bg-color', theme.bg);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--font-display', theme.fontDisplay);
    setIsDropdownOpen(false);
  };

  const handleColorChange = (type: 'fg' | 'bg', color: string) => {
    setConfig(prev => ({
      ...prev,
      [type === 'fg' ? 'fgColor' : 'bgColor']: color
    }));
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAboutImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col p-8 md:p-12 overflow-hidden transition-all duration-700">
      {/* Dynamic Background Sphere */}
      <div
        className="fixed top-1/4 right-1/4 glass-sphere z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: currentTheme.sphereOpacity }}
      ></div>

      {/* Header section */}
      <header className="relative z-50 flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 md:mb-24 uppercase tracking-tighter">
        <div className="flex flex-col">
          <span className="text-[11px] font-black tracking-[0.2em]">STUDIO ARCHIVE</span>
          <span className="text-[11px] font-black opacity-30 font-mono">VARIANT: {currentTheme.id.toUpperCase()}</span>
        </div>

        {/* System Description Block */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <Info size={12} className="opacity-30" />
            <span className="text-[10px] font-black opacity-30 font-mono tracking-widest uppercase">System_Overview</span>
          </div>
          <p className="text-[10px] font-bold leading-relaxed opacity-60">
            Absolute QR Architect — A high-fidelity visual identity generator. Focus on precision, accessibility, and high-performance design assets.
          </p>
        </div>

        <div className="flex items-center gap-6 self-end lg:self-start">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-6 py-2.5 border rounded-full border-current flex items-center gap-3 hover:bg-current hover:text-[var(--bg-color)] transition-all text-[10px] font-black group"
            >
              <Layout size={12} className="group-hover:rotate-12 transition-transform" />
              THEME SELECTOR
              <ChevronDown size={12} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-black border border-white/20 shadow-2xl rounded-2xl overflow-hidden dropdown-animate z-[100]">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => applyTheme(t)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors text-[10px] font-bold text-white border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }}></div>
                      <span>{t.name}</span>
                    </div>
                    {currentTheme.id === t.id && <Check size={14} className="text-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="px-6 py-2.5 border rounded-full border-current flex items-center gap-3 hover:bg-current hover:text-[var(--bg-color)] transition-all text-[10px] font-black group backdrop-blur-sm"
            >
              <ArrowDown size={12} className={`transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`} />
              ABOUT ME
            </button>

            {isAboutOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-black border border-white/20 shadow-2xl rounded-3xl overflow-hidden dropdown-animate z-[100] p-8 text-white">
                <div className="flex flex-col gap-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group/img flex items-center justify-center cursor-pointer">
                    {aboutImage ? (
                      <img src={aboutImage} alt="Mohammed Siddiq" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="opacity-20" />
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleAboutImageUpload}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <Plus size={20} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black tracking-widest uppercase">Mohammed Siddiq</h3>
                    <p className="text-[10px] leading-relaxed font-bold opacity-60">
                      Hello! I’m Mohammed Siddiq.
                    </p>
                    <p className="text-[10px] leading-relaxed font-medium opacity-60 italic">
                      I am currently a B.Tech student specializing in Artificial Intelligence and Machine Learning (AIML). I built this platform to serve as a helpful resource for fellow students and a creative space for myself.
                    </p>
                    <p className="text-[10px] leading-relaxed font-medium opacity-60">
                      Unlike other sites that might feel restricted or overly complex, this website is built for unlimited creativity. You can generate, edit, and customize colors to your heart's content—everything here is designed to be enjoyed and used freely.
                    </p>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Let’s Connect!</span>
                      <p className="text-[10px] mt-2 font-medium opacity-60">
                        If you find this tool helpful, feel free to follow my journey. Check the footer for links.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start lg:items-end mb-24">

        {/* Left: Interactive Input Area */}
        <div className="lg:col-span-8 space-y-12 w-full">
          <div className="relative group">
            <div className="absolute -top-16 left-0 flex items-center gap-4" style={{ color: currentTheme.accent }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest uppercase">DATA INPUT</span>
                <span className="text-[9px] font-bold opacity-40 font-mono italic">PASTE URL OR TEXT</span>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={config.value}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                className={`w-full bg-zinc-500/10 border-b border-current/10 focus:border-current/30 p-8 pt-12 ${currentTheme.fontClass.replace('uppercase', '')} text-lg outline-none resize-none overflow-hidden placeholder:opacity-20 transition-all duration-700 leading-tight rounded-t-3xl`}
                spellCheck={false}
                placeholder="https://example.com"
                style={{ minHeight: '180px' }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-12 gap-y-10 border-t border-current/10 pt-12">
            {/* Center Mark Customization */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] font-mono">1. Center Mark</span>
              <div className="flex flex-wrap items-center gap-6">
                <div className="relative w-12 h-12 bg-current/5 border border-current/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-current/10 transition-all overflow-hidden group shadow-inner">
                  {config.imageSrc ? (
                    <img src={config.imageSrc} className="w-2/3 h-2/3 object-contain" alt="mark" />
                  ) : (
                    <Plus size={18} className="opacity-40 group-hover:scale-110 transition-transform" />
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setConfig({ ...config, imageSrc: reader.result as string, includeImage: true });
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>

                {config.imageSrc && (
                  <>
                    {/* Shape Selector - Square & Circle Focus */}
                    <div className="flex bg-current/5 p-1 rounded-full border border-current/10">
                      {[
                        { label: 'SQR', value: 'square' as LogoShape, icon: <Square size={10} /> },
                        { label: 'CRC', value: 'circle' as LogoShape, icon: <CircleIcon size={10} /> }
                      ].map((shape) => (
                        <button
                          key={shape.value}
                          onClick={() => setConfig({ ...config, logoShape: shape.value })}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[8px] font-black transition-all ${config.logoShape === shape.value ? 'bg-current text-[var(--bg-color)]' : 'opacity-30 hover:opacity-100'}`}
                        >
                          {shape.icon}
                          {shape.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <div className="flex justify-between text-[8px] font-black opacity-30 font-mono">
                        <span>SIZE</span>
                        <span>{config.imageSize}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="35"
                        value={config.imageSize}
                        onChange={(e) => setConfig({ ...config, imageSize: parseInt(e.target.value) })}
                        className="w-full accent-current h-1 opacity-40 hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <button
                      onClick={() => setConfig({ ...config, imageSrc: '', includeImage: false })}
                      className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Chromatics */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] font-mono">2. Chromatics</span>
              <div className="flex gap-4">
                <div className="relative flex items-center gap-3 px-4 h-11 rounded-full bg-current/5 border border-current/10 overflow-hidden group hover:border-current/30 transition-all">
                  <div className="w-3 h-3 rounded-full border border-current/20 shadow-inner" style={{ backgroundColor: config.fgColor }}></div>
                  <span className="text-[9px] font-bold opacity-40 font-mono uppercase tracking-widest">DARK</span>
                  <input type="color" value={config.fgColor} onChange={(e) => handleColorChange('fg', e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <span className="text-[9px] font-bold font-mono">{config.fgColor.toUpperCase()}</span>
                </div>
                <div className="relative flex items-center gap-3 px-4 h-11 rounded-full bg-current/5 border border-current/10 overflow-hidden group hover:border-current/30 transition-all">
                  <div className="w-3 h-3 rounded-full border border-current/20 shadow-inner" style={{ backgroundColor: config.bgColor }}></div>
                  <span className="text-[9px] font-bold opacity-40 font-mono uppercase tracking-widest">LIGHT</span>
                  <input type="color" value={config.bgColor} onChange={(e) => handleColorChange('bg', e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <span className="text-[9px] font-bold font-mono">{config.bgColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The High-Quality QR Terminal */}
        <div className="lg:col-span-4 space-y-12 w-full lg:sticky lg:top-12">
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-current/5 bg-zinc-900/5 backdrop-blur-md">
            <QRCodeDisplay config={config} themeId={currentTheme.id} />
          </div>
        </div>
      </main>

      {/* Footer D O C K */}
      <footer className="relative z-50 flex flex-col items-center gap-12 mt-auto border-t border-current/10 pt-12 pb-12">
        <div className="flex items-center justify-center">
          <Dock>
            <DockIcon label="GitHub" href="https://github.com/siddiq-1000">
              <Github className="w-5 h-5" />
            </DockIcon>
            <DockIcon label="LinkedIn" href="https://linkedin.com/in/mohammed-siddiq100/">
              <Linkedin className="w-5 h-5" />
            </DockIcon>
            <DockIcon label="Instagram" href="https://instagram.com/siddiqpower/">
              <Instagram className="w-5 h-5" />
            </DockIcon>
          </Dock>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div className="flex flex-col gap-4">
            <div className={`text-[3.5vw] md:text-[3vw] leading-none uppercase font-black tracking-tighter transition-all duration-700 ${currentTheme.fontClass.includes('clash') ? 'bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-500' : ''}`}>
              TYPES OF<br />YOUR CHOICE
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-6 text-right">
            <div className={`text-[6vw] md:text-[5vw] leading-none opacity-20 italic font-black transition-all duration-700 ${currentTheme.fontClass}`}>
              {currentYear}
            </div>
            <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.5em] leading-relaxed font-mono">
              Mohammed Siddiq &copy; Architecture <br />
              Absolute Protocol Systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Custom Dock Components */
const Dock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 px-3 py-3 bg-current/5 backdrop-blur-2xl rounded-3xl border border-current/10 shadow-2xl transition-all hover:bg-current/10">
    {children}
  </div>
);

const DockIcon: React.FC<{ label: string; href: string; children: React.ReactNode }> = ({ label, href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-current/5 border border-current/10 transition-all duration-300 hover:scale-125 hover:-translate-y-4 hover:bg-current/10 shadow-lg"
      >
        {children}
      </a>
      <div className={`absolute -top-12 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200 pointer-events-none ${hovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'}`}>
        {label}
      </div>
    </div>
  );
};

export default App;
