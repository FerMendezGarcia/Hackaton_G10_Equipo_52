// Íconos de línea (lucide-react). Son los mismos del archivo de Figma.
// Para usar uno nuevo: impórtalo aquí y agrégalo al objeto ICONOS.
import {
  ArrowLeft, ArrowRight, BookOpen, Brain, Building2, Check, ChevronRight, CircleHelp,
  Clapperboard, Clock, CloudUpload, Compass, Download, Factory, FileSearch, FileText,
  GraduationCap, HandHeart, HardHat, HeartPulse, Landmark, Laptop, Layers, Leaf,
  Lightbulb, Microscope, Moon, Palette, PanelRightClose, PanelRightOpen, PenLine,
  RotateCcw, Scale, Share2, ShoppingBag, SkipForward, SlidersHorizontal, Sparkles,
  Sprout, Sun, Target, TrendingUp, Truck, User, UtensilsCrossed, Wheat, Wrench, Zap,
} from 'lucide-react';

const ICONOS = {
  ArrowLeft, ArrowRight, BookOpen, Brain, Building2, Check, ChevronRight, CircleHelp,
  Clapperboard, Clock, CloudUpload, Compass, Download, Factory, FileSearch, FileText,
  GraduationCap, HandHeart, HardHat, HeartPulse, Landmark, Laptop, Layers, Leaf,
  Lightbulb, Microscope, Moon, Palette, PanelRightClose, PanelRightOpen, PenLine,
  RotateCcw, Scale, Share2, ShoppingBag, SkipForward, SlidersHorizontal, Sparkles,
  Sprout, Sun, Target, TrendingUp, Truck, User, UtensilsCrossed, Wheat, Wrench, Zap,
};

export default function Icono({ nombre, tamano = 22, grosor = 1.8, ...resto }) {
  const Componente = ICONOS[nombre];
  if (!Componente) return null;
  // aria-hidden: los íconos son decorativos; el texto al lado ya dice qué es
  return <Componente size={tamano} strokeWidth={grosor} aria-hidden="true" {...resto} />;
}
