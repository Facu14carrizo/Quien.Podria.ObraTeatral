// Google Analytics Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Tu ID de Google Analytics (GA4)
export const GA_TRACKING_ID = 'G-S1XFNG6X48';

// Inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Cargar el script de Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Función para trackear eventos personalizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Función para trackear navegación de páginas
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Eventos específicos para tu sitio web
export const trackWhatsAppClick = () => {
  trackEvent('click', 'engagement', 'whatsapp_reservation');
};

export const trackTrailerClick = () => {
  trackEvent('click', 'engagement', 'trailer_view');
};

export const trackLocationClick = () => {
  trackEvent('click', 'engagement', 'location_map');
};

export const trackSocialMediaClick = (platform: string) => {
  trackEvent('click', 'social_media', platform);
};

export const trackCharacterView = (characterName: string) => {
  trackEvent('view', 'character', characterName);
}; 