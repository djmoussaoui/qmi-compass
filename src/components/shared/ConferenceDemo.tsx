'use client';

import { useAppStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Presentation,
  Play,
  Compass,
  Wand2,
  BookOpen,
  Map,
  Users,
  Eye,
  BarChart3,
  ArrowLeft,
  Star,
  Clock,
  CheckCircle2,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DEMO_TEACHER } from '@/data/qmi-data';

const demoScenarios = [
  {
    id: 'scenario-1',
    titleAr: 'تصميم نشاط الصبر في الرياضيات',
    descAr: 'معلم متوسط يصمم نشاط "المحاولة الثانية" لطلاب يعطون بعد أول خطأ',
    icon: Wand2,
    targetView: 'activity-designer' as const,
    steps: ['لوحة التحكم', 'مصمم الأنشطة', 'السياق التعليمي', 'الهدف الأخلاقي', 'صيغة النشاط', 'النشاط المُولّد'],
    duration: '5 دقائق',
  },
  {
    id: 'scenario-2',
    titleAr: 'استعراض مكتبة التقنيات',
    descAr: 'تصفح 20 تقنية تعليمية موزعة على المراحل الأربع مع فلاتر متقدمة',
    icon: BookOpen,
    targetView: 'techniques-library' as const,
    steps: ['مكتبة التقنيات', 'تصفية بالقيمة', 'عرض التفاصيل', 'المؤشرات والمستويات'],
    duration: '3 دقائق',
  },
  {
    id: 'scenario-3',
    titleAr: 'خريطة التحويل الأخلاقي',
    descAr: 'استكشاف العلاقة بين السلوكيات المستهدفة والقيم والتقنيات المقترحة',
    icon: Map,
    targetView: 'values-map' as const,
    steps: ['خريطة القيم', 'السلوك ← القيمة ← التقنية', 'التطور عبر المراحل'],
    duration: '3 دقائق',
  },
  {
    id: 'scenario-4',
    titleAr: 'تطور القيم عبر المراحل',
    descAr: 'كيف تتطور قيمة الصبر من الابتدائية إلى الجامعية',
    icon: Lightbulb,
    targetView: 'development-progression' as const,
    steps: ['اختيار القيمة', 'المقارنة بين المراحل', 'الأنماط والتقنيات'],
    duration: '2 دقائق',
  },
  {
    id: 'scenario-5',
    titleAr: 'إدارة الصفوف والملاحظة',
    descAr: 'إدارة الصفوف وتسجيل الملاحظات السلوكية ومراجعة التأملات',
    icon: Eye,
    targetView: 'classes' as const,
    steps: ['الصفوف', 'الطلاب', 'بطاقة الملاحظة', 'سجل التأمل'],
    duration: '3 دقائق',
  },
  {
    id: 'scenario-6',
    titleAr: 'متابعة التقدم والتقارير',
    descAr: 'عرض لوحة التقدم والتقارير التجميعية',
    icon: BarChart3,
    targetView: 'progress-dashboard' as const,
    steps: ['تقدم الطلاب', 'التقارير'],
    duration: '2 دقائق',
  },
];

const features = [
  'مصمم أنشطة بـ 4 خطوات مع توليد ذكي',
  '20 تقنية تعليمية بخطوات تنفيذ كاملة',
  '8 قيم أخلاقية مع خريطة تحويل تفاعلية',
  'تطور القيم عبر 4 مراحل تعليمية',
  'ضمانات تربوية لحماية كرامة الطلاب',
  'نظام ملاحظة سلوكية بدون تصنيفات أخلاقية',
  'وضع RTL عربي كامل',
  'مراجعة علمية وتربوية مزدوجة',
];

export function ConferenceDemo() {
  const { navigate, login, setDemoMode, isAuthenticated } = useAppStore();

  const startDemo = () => {
    login({
      id: DEMO_TEACHER.id,
      nameAr: DEMO_TEACHER.nameAr,
      nameEn: DEMO_TEACHER.nameEn,
      email: DEMO_TEACHER.email,
      role: DEMO_TEACHER.role,
      institutionId: DEMO_TEACHER.institutionId,
    });
    setDemoMode(true);
  };

  const launchScenario = (targetView: string) => {
    if (!isAuthenticated) {
      startDemo();
    }
    // Small delay to ensure state is set
    setTimeout(() => {
      navigate(targetView as any);
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-amber-50 via-background to-emerald-50/30 geometric-pattern relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-300 text-sm px-4 py-1">
              <Presentation className="w-4 h-4 ml-1" />
              وضع المؤتمر — عرض تفاعلي
            </Badge>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/25 mb-6">
              <Compass className="w-10 h-10 text-primary-foreground" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              عرض <span className="text-primary">QMI Compass</span> التفاعلي
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              بوصلة التعليم القرآني — من المبادئ القرآنية إلى الممارسة التعليمية
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
              اختر سيناريو العرض لاستكشاف ميزة معينة، أو ابدأ جولة كاملة عبر المنصة.
              جميع البيانات المعروضة هي بيانات تجريبية لأغراض العرض.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={() => { startDemo(); setTimeout(() => navigate('teacher-dashboard'), 100); }} className="gap-2 text-base px-8">
                <Play className="w-5 h-5" />
                جولة كاملة
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('home')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                الصفحة الرئيسية
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Info */}
      <section className="py-8 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="border-amber-200 bg-amber-50/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Star className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">معلومات العرض</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  هذا العرض التجريبي يستخدم بيانات محاكاة. المعلم التجريبي: <strong>{DEMO_TEACHER.nameAr}</strong>.
                  جميع الأنشطة والتقنيات تحتاج مراجعة تربوية وعلمية بشرية قبل الاستخدام الفعلي.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scenarios Grid */}
      <section className="py-8 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">سيناريوهات العرض</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoScenarios.map((scenario, idx) => {
              const Icon = scenario.icon;
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    onClick={() => launchScenario(scenario.targetView)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-right min-w-0">
                          <CardTitle className="text-sm leading-tight">{scenario.titleAr}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{scenario.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{scenario.descAr}</p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.steps.map((s, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] px-1.5">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-8 bg-gradient-to-b from-background to-emerald-50/20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">ميزات المنصة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border/50">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">جاهز للبدء؟</h2>
          <p className="text-sm text-muted-foreground mb-4">
            ابدأ الجولة الكاملة أو اختر سيناريو محدد لاستكشاف ميزة معينة
          </p>
          <Button size="lg" onClick={() => { startDemo(); setTimeout(() => navigate('teacher-dashboard'), 100); }} className="gap-2">
            <Play className="w-5 h-5" />
            ابدأ العرض الكامل
          </Button>
        </div>
      </section>
    </div>
  );
}