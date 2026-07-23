'use client';

import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileSidebar } from './AppSidebar';
import { Compass, ArrowRight, Presentation } from 'lucide-react';

export function AppHeader() {
  const { currentView, navigate, goBack, isDemoMode, isAuthenticated, viewHistory } = useAppStore();

  const showBack = viewHistory.length > 0 && currentView !== 'home';
  const pageTitles: Record<string, string> = {
    'home': '',
    'login': 'تسجيل الدخول',
    'register': 'إنشاء حساب',
    'teacher-dashboard': 'لوحة تحكم المعلم',
    'activity-designer': 'مصمم الأنشطة QMI',
    'techniques-library': 'مكتبة التقنيات',
    'technique-details': 'تفاصيل التقنية',
    'values-map': 'خريطة القيم الأخلاقية',
    'development-progression': 'التطور عبر المراحل التعليمية',
    'classes': 'إدارة الصفوف',
    'students': 'إدارة الطلاب',
    'observation-card': 'بطاقة الملاحظة السلوكية',
    'reflection-journal': 'سجل التأمل والمراجعة',
    'progress-dashboard': 'لوحة تقدم الطلاب',
    'reports': 'التقارير',
    'quranic-sources': 'مستودع المصادر القرآنية',
    'review-workflow': 'سير العمل العلمي',
    'about': 'عن منصة بوصلة QMI',
    'safeguards': 'الضمانات التربوية والأخلاقية',
    'privacy': 'سياسة الخصوصية',
    'admin-dashboard': 'لوحة الإدارة',
    'conference-demo': 'وضع المؤتمر',
  };

  const title = pageTitles[currentView] || '';

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Right side: Mobile menu + Back */}
        <div className="flex items-center gap-2">
          <MobileSidebar />
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="gap-1 text-sm"
            >
              <ArrowRight className="w-4 h-4" />
              رجوع
            </Button>
          )}
        </div>

        {/* Center: Title */}
        <div className="flex items-center gap-3">
          {title && (
            <h1 className="text-base font-semibold text-foreground hidden sm:block">
              {title}
            </h1>
          )}
          {isDemoMode && (
            <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 text-xs">
              <Presentation className="w-3 h-3 ml-1" />
              عرض
            </Badge>
          )}
        </div>

        {/* Left side: Logo + Auth */}
        {currentView === 'home' ? (
            <div className="flex items-center gap-2">
              <img src="/qmi-logo.svg" alt="QMI" className="w-8 h-8 rounded-lg" />
              <div className="hidden sm:block">
                <span className="font-bold text-sm text-primary">بوصلة QMI</span>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('home')}
              className="gap-1.5 text-sm"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">الرئيسية</span>
            </Button>
          )}
          
          {!isAuthenticated && currentView !== 'login' && currentView !== 'register' && (
            <Button
              size="sm"
              onClick={() => navigate('login')}
              className="text-xs"
            >
              دخول
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
