import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UiService {

    private currentLang: 'ar' | 'en' = 'ar';
    private isDark = false;

    getCurrentLang() {
      return this.currentLang;
    }

    setLanguage(lang: 'ar' | 'en') {
      this.currentLang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    initTheme() {
      const saved = localStorage.getItem('theme');

      if (saved === 'dark') {
        this.enableDark();
      } else {
        this.enableLight();
      }
    }

    enableDark() {
      this.isDark = true;
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }

    enableLight() {
      this.isDark = false;
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }

    toggleTheme() {
      this.isDark ? this.enableLight() : this.enableDark();
    }

    isDarkMode() {
      return this.isDark;
    }
}