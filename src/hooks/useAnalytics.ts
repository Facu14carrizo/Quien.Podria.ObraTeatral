import { useEffect } from 'react';
import { initGA, trackPageView } from '../utils/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    // Inicializar Google Analytics cuando el componente se monta
    initGA();
    
    // Trackear la vista de página inicial
    trackPageView(window.location.pathname);
  }, []);

  return {
    trackPageView,
  };
}; 