import React from 'react';
import { LANGUAGE_COLORS } from '@/lib/github';

interface LanguageTagProps {
  language: string;
  size?: 'sm' | 'md';
}

export const LanguageTag: React.FC<LanguageTagProps> = ({ language, size = 'sm' }) => {
  const color = LANGUAGE_COLORS[language] || '#6b7280'; // Default to gray if language not found
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1'
  };

  return (
    <div className={`inline-flex items-center rounded-full font-medium text-white ${sizeClasses[size]}`}>
      <div 
        className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-zinc-700 text-xs font-medium">
        {language}
      </span>
    </div>
  );
};
