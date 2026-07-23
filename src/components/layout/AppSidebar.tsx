'use client';

import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Compass,
  Menu,
  Home,
  LayoutDashboard,
  Wand2,
  BookOpen,
  Map,
  TrendingUp,
  Users,
  Eye,
  BookHeart,
  BarChart3,
  FileText,
  Shield,
  Lock,
  Info,
  Settings,
  Presentation,
  LogIn,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const teacherNavItems = [
  { id: 'teacher-dashboard', labelAr: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'activity-designer', labelAr: 'مصمم الأنشطة', icon: Wand2 },
  { id: 'techniques-library', labelAr: 'مكتبة التقنيات', icon: BookOpen },
  { id: 'values-map', labelAr: 'خريطة القيم', icon: Map },
  { id: 'development-progression', labelAr: 'التطور عبر المراحل', icon: TrendingUp },
  { id: 'classes', labelAr: 'الصفوف', icon: Users },
  { id: 'observation-card', labelAr: 'بطاقة الملاحظة', icon: Eye },
  { id: 'reflection-journal', labelAr: 'سجل التأمل', icon: BookHeart },
  { id: 'progress-dashboard', labelAr: 'تقدم الطلاب', icon: BarChart3 },
  { id: 'reports', labelAr: 'التقارير', icon: FileText },
];

const publicNavItems = [
  { id: 'techniques-library', labelAr: 'مكتبة التقنيات', icon: BookOpen },
  { id: 'values-map', labelAr: 'خريطة القيم', icon: Map },
  { id: 'development-progression', labelAr: 'التطور عبر المراحل', icon: TrendingUp },
  { id: 'about', labelAr: 'عن المنصة', icon: Info },
  { id: 'safeguards', labelAr: 'الضمانات التربوية', icon: Shield },
  { id: 'privacy', labelAr: 'سياسة الخصوصية', icon: Lock },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { currentView, navigate, isAuthenticated, currentUser, logout, isDemoMode } = useAppStore();

  const navItems = isAuthenticated && currentUser?.role === 'teacher' 
    ? [...teacherNavItems, { id: 'admin-dashboard', labelAr: 'الإدارة', icon: Settings }]
    : publicNavItems;

  const handleNav = (id: string) => {
    navigate(id as any);
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 pb-2">
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-right min-w-0">
            <h2 className="font-bold text-sm text-primary">بوصلة QMI</h2>
            <p className="text-xs text-muted-foreground truncate">التعليم القرآني</p>
          </div>
        </button>
      </div>

      <Separator className="my-2" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-right',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.labelAr}</span>
                {isActive && (
                  <ChevronLeft className="w-4 h-4 mr-auto shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Bottom section */}
      <div className="p-3 space-y-2">
        {isDemoMode && (
          <Badge variant="outline" className="w-full justify-center border-amber-500 text-amber-600 bg-amber-50">
            <Presentation className="w-3 h-3 ml-1" />
            وضع المؤتمر
          </Badge>
        )}
        
        {isAuthenticated ? (
          <div className="space-y-2">
            {currentUser && (
              <div className="px-3 py-2 rounded-lg bg-accent">
                <p className="text-sm font-medium truncate">{currentUser.nameAr}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => { logout(); onNavigate?.(); }}
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full"
            onClick={() => handleNav('login')}
          >
            <LogIn className="w-4 h-4 ml-1" />
            تسجيل الدخول
          </Button>
        )}
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col h-screen bg-card border-l border-border fixed right-0 top-0 z-40">
      <NavContent />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">القائمة</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <NavContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

import React from 'react';