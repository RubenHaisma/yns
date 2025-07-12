"use client";

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  isMobile?: boolean;
  onLanguageChange?: () => void;
}

export function LanguageSwitcher({ isMobile = false, onLanguageChange }: LanguageSwitcherProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Extract locale from URL path
  const urlLocale = pathname.split('/')[1];
  const actualLocale = urlLocale === 'nl' || urlLocale === 'en' ? urlLocale : 'nl';

  const changeLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    setCurrentLocale(newLocale);
    if (onLanguageChange) onLanguageChange();
    
    window.location.href = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={isMobile ? "ghost" : "outline"} 
          size={isMobile ? "default" : "sm"}
          className={`items-center space-x-2 ${isMobile ? 'w-full justify-start h-10' : 'h-9 px-3'} group`}
        >
          <Globe className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg] group-hover:text-green-600" />
          <span className="font-medium">
            {isMobile 
              ? (actualLocale === 'nl' ? 'Nederlands' : 'English')
              : (actualLocale === 'nl' ? 'NL' : 'EN')
            }
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "start" : "end"} className="min-w-[140px] transition-all duration-200 ease-in-out">
          <DropdownMenuItem 
            onClick={() => changeLanguage('nl')}
            className={`cursor-pointer flex items-center space-x-2 ${actualLocale === 'nl' ? 'bg-green-50 text-green-700' : ''}`}
          >
            <span>🇳🇱</span>
            <span>Nederlands</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => changeLanguage('en')}
            className={`cursor-pointer flex items-center space-x-2 ${actualLocale === 'en' ? 'bg-green-50 text-green-700' : ''}`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
} 