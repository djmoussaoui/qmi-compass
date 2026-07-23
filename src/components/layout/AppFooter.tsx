'use client';

import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/app-store';
import { Compass } from 'lucide-react';

export function AppFooter() {
  const { navigate, isDemoMode } = useAppStore();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm text-primary">بوصلة QMI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              منصة تعليمية تُساعد المعلمين على تحويل القيم المستلهمة من القرآن إلى مواقف تعليمية عملية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-2">المنصة</h3>
            <div className="space-y-1.5">
              {[
                { id: 'about', label: 'عن المنصة' },
                { id: 'safeguards', label: 'الضمانات التربوية' },
                { id: 'privacy', label: 'سياسة الخصوصية' },
                { id: 'values-map', label: 'خريطة القيم' },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id as any)}
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Safeguards */}
          <div>
            <h3 className="font-semibold text-sm mb-2">مبادئنا</h3>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>• نُقيّم السلوك الملاحظ لا النوايا</p>
              <p>• لا نُصنّف الطلاب أخلاقياً</p>
              <p>• لا نُلصق تسميات بالشخصية</p>
              <p>• المراجع القرآنية تحتاج مراجعة علمية</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>QMI Compass — بوصلة التعليم القرآني</p>
          <p>القرآن كوسيلة للتعليم — من المبادئ القرآنية إلى الممارسة التعليمية</p>
        </div>

        {isDemoMode && (
          <p className="text-center text-xs text-amber-600 mt-2">
            ⚠️ هذا عرض تجريبي للمؤتمر — البيانات محاكاة وليست حقيقية
          </p>
        )}
      </div>
    </footer>
  );
}