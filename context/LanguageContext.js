import React, { createContext, useState, useContext } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    home: "Home",
    settings: "Settings",
    dashboard: "Dashboard",
    admin: "Admin",
    globalSettings: "Global Settings",
    darkMode: "Dark Mode",
    newsNotifications: "News Notifications",
    signedUp: "You have signed up for news notifications.",
    unsubscribed: "You have unsubscribed from news notifications."
  },
  es: {
    home: "Inicio",
    settings: "Ajustes",
    dashboard: "Tablero",
    admin: "Administración",
    globalSettings: "Configuraciones Globales",
    darkMode: "Modo Oscuro",
    newsNotifications: "Notificaciones de Noticias",
    signedUp: "Te has registrado para recibir notificaciones de noticias.",
    unsubscribed: "Te has dado de baja de las notificaciones de noticias."
  }
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale);

  const setLanguage = (language) => {
    setLocale(language);
    i18n.locale = language;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage, t: i18n.t.bind(i18n) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
