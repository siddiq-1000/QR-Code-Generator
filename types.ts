
export type LogoShape = 'circle' | 'square' | 'rounded' | 'hexagon' | 'octagon' | 'diamond';

export interface QRConfig {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeImage: boolean;
  imageSrc?: string;
  imageSize: number;
  borderRadius: number;
  margin: number;
  logoPadding: number;
  logoShape: LogoShape;
}

export interface VaultEntry {
  id: string;
  timestamp: number;
  config: QRConfig;
}

export interface AISuggestion {
  primaryColor: string;
  secondaryColor: string;
  description: string;
  suggestedLevel: 'L' | 'M' | 'Q' | 'H';
}
