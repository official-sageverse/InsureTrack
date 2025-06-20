import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-600',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      icon: 'text-white',
      shadow: 'shadow-blue-200'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-green-600',
      card: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
      icon: 'text-white',
      shadow: 'shadow-green-200'
    },
    yellow: {
      bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      text: 'text-yellow-600',
      card: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
      icon: 'text-white',
      shadow: 'shadow-yellow-200'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      text: 'text-purple-600',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      icon: 'text-white',
      shadow: 'shadow-purple-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.card} p-3 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border group cursor-pointer`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className={`${colors.bg} p-2 sm:p-4 rounded-xl shadow-lg ${colors.shadow} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className={`text-lg sm:text-2xl font-bold ${colors.text} mb-1 group-hover:scale-105 transition-transform duration-300 truncate`}>
            {typeof value === 'string' && value.length > 10 ? (
              <span className="text-sm sm:text-xl">{value}</span>
            ) : (
              value
            )}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 leading-tight truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;