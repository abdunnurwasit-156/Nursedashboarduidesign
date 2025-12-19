import { Search, Bell, Clock, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { UserRole } from '../App';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface TopBarProps {
  userRole: UserRole;
}

export function TopBar({ userRole }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getUserInfo = () => {
    switch (userRole) {
      case 'nurse': return { name: 'Nurse Jennifer', initials: 'JW', role: 'Head Nurse', shift: '07:00 - 19:00' };
      case 'doctor': return { name: 'Dr. Adams', initials: 'SA', role: 'Chief Resident', shift: 'On Call' };
      case 'ward-incharge': return { name: 'Maria Rodriguez', initials: 'MR', role: 'Ward Manager', shift: '08:00 - 20:00' };
      case 'lab-tech': return { name: 'Dr. David Kim', initials: 'DK', role: 'Pathologist', shift: '06:00 - 14:00' };
      case 'pharmacist': return { name: 'Robert Chen', initials: 'RC', role: 'Senior Pharmacist', shift: '08:00 - 18:00' };
      case 'radiologist': return { name: 'Dr. Thompson', initials: 'AT', role: 'Radiologist', shift: '07:00 - 19:00' };
      case 'nutritionist': return { name: 'Emily Martinez', initials: 'EM', role: 'Dietitian', shift: '08:00 - 17:00' };
      case 'physical-therapist': return { name: 'Sarah Johnson', initials: 'SJ', role: 'PT Specialist', shift: '08:00 - 17:00' };
      default: return { name: 'User', initials: 'U', role: 'Staff', shift: 'Shift' };
    }
  };

  const userInfo = getUserInfo();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, meds, or reports..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Indicators */}
        <div className="flex items-center gap-2 mr-4 border-r border-gray-100 pr-4 hidden lg:flex">
          {userRole === 'nurse' && (
             <>
               <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100 font-medium">
                 2 Critical
               </Badge>
               <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100 font-medium border-0">
                 3 Warnings
               </Badge>
             </>
          )}
          <div className="flex items-center gap-2 text-gray-500 text-sm ml-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium tabular-nums">{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">{userInfo.name}</p>
            <p className="text-xs text-gray-500 mt-1">{userInfo.role}</p>
          </div>
          <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-100 transition-all">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userInfo.initials}`} />
            <AvatarFallback>{userInfo.initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}