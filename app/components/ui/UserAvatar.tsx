"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { useUser } from '../../contexts/user';
import { User } from 'lucide-react';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallback?: boolean;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10', 
  lg: 'h-12 w-12'
};

export default function UserAvatar({ 
  size = 'md', 
  className = '', 
  showFallback = true 
}: UserAvatarProps) {
  const { user, getAvatarUrl } = useUser();
  const [imageError, setImageError] = useState(false);

  if (!user) {
    return (
      <Avatar className={`${sizeClasses[size]} ${className}`}>
        <AvatarFallback className="bg-gray-200">
          <User className="h-4 w-4 text-gray-500" />
        </AvatarFallback>
      </Avatar>
    );
  }

  const avatarUrl = getAvatarUrl();
  const fallbackText = user.name 
    ? user.name.charAt(0).toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {!imageError && (
        <AvatarImage 
          src={avatarUrl}
          alt={`${user.name || user.email}'s avatar`}
          onError={() => setImageError(true)}
        />
      )}
      {showFallback && (
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
          {fallbackText}
        </AvatarFallback>
      )}
    </Avatar>
  );
}