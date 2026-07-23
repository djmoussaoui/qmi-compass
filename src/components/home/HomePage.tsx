'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/app-store';
import { MORAL_VALUES, EDUCATIONAL_LEVELS, SAFEGUARDS, DEVELOPMENT_CYCLE } from '@/data/qmi-data';
import {
  Compass,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Eye,
  Shield,
  CheckCircle2,
  Lightbulb,
  Target,
  BarChart3,
  Globe,
  ChevronDown,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';

const howItWorks = [
  { step: 1, titleAr: 'اختر المرحلة والمادة', icon: Target, desc: 'حدد المرحلة التعليمية والمادة الدراسية والدرس' },
  { step: 2, titleAr: 'حدد السلوك والقيمة', icon: Lightbulb, desc: 'صِف السلوك المستهدف واختر القيمة المناسبة' },
  { step: 3, titleAr: 'استلم تقنية مناسبة', icon: Sparkles, desc: 'يُولّد النظام نشاطًا تعليميًا مُصممًا خصيصًا' },
  { step: 4, titleAr: 'نفّذ النشاط', icon: BookOpen, desc: 'طبّق النشاط في الصف مع الإرشادات المرفقة' },
  { step: 5, titleAr: 'لاحظ التقدم', icon: BarChart3, desc: 'سجّل الملاحظات وتابع تطور السلوك' },
  { step: 6, titleAr: 'انقل القيمة للحياة', icon: Globe, desc: 'ساعد الطالب على نقل القيمة إلى حياته اليومية' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HomePage() {
  const { navigate, isAuthenticated, login, setDemoMode } = useAppStore();

  const handleDemoLogin = () => {
    login({
      id: 'demo-teacher-1',
      nameAr: 'أحمد محمد الخالدي',
      nameEn: 'Ahmed Al-Khalidi',
      email: 'ahmed@demo.qmi.edu',
      role: 'teacher',
      institutionId: 'demo-institution-1',
    });
    setDemoMode(true);
    navigate('teacher-dashboard');
  };

  const handleLogin = () => {
    navigate('login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-background to-amber-50/30">
        <div className="absolute inset-0 geometric-pattern opacity-40" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-lg shadow-primary/25 mb-6">
              <Compass className="w-12 h-12 text-primary-foreground" />
            </div>

            {/* Title */}
             <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
               QMI: Qur&apos;an as a Medium of Instruction
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
              <span className="text-primary">بوصلة التعليم القرآني</span>
            </h1>
           
            <p className="text-sm text-muted-foreground mb-1">
             
            </p>
            <p className="text-lg text-muted-foreground/80 mb-2 font-medium">
              القرآن كوسيلة للتعليم
            </p>

            {/* Tagline */}
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-medium mb-2">
                من المبادئ القرآنية إلى الممارسة التعليمية
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                تساعد بوصلة QMI المعلمين على تحويل المبادئ التربوية والقيم المستلهمة من القرآن إلى مواقف تعليمية عملية قابلة للتطبيق والملاحظة والتأمل والتقويم.
              </p>
            </div>

            {/* Alternative tagline */}
            <p className="text-sm text-primary/70 italic mb-8">
              كل درس فرصة لبناء الإنسان
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              {isAuthenticated ? (
                <Button size="lg" onClick={() => navigate('activity-designer')} className="gap-2 text-base px-8">
                  <Sparkles className="w-5 h-5" />
                  صمّم نشاطًا
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={handleLogin} className="gap-2 text-base px-8">
                    <Sparkles className="w-5 h-5" />
                    صمّم نشاطًا
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('values-map')} className="gap-2 text-base px-8">
                    <BookOpen className="w-5 h-5" />
                    استكشف القيم
                  </Button>
                </>
              )}
              <Button size="lg" variant="secondary" onClick={handleDemoLogin} className="gap-2 text-base px-8 border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100">
                <Star className="w-5 h-5" />
                عرض تجريبي
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 28C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="var(--color-background)" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">كيف تعمل المنصة؟</h2>
            <p className="text-muted-foreground">ست خطوات من التشخيص إلى نقل القيمة في الحياة اليومية</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.step} variants={item}>
                  <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{step.step}</span>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold text-sm mb-1">{step.titleAr}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Development Cycle */}
      <section className="py-16 bg-gradient-to-b from-background to-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">دورة التطور الأخلاقي</h2>
            <p className="text-muted-foreground">من التشخيص إلى نقل القيمة في الحياة اليومية</p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-primary/20" />
            
            <div className="space-y-4">
              {DEVELOPMENT_CYCLE.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 pr-2"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-lg z-10 shadow-sm">
                    {step.icon}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-3 py-2.5">
                      <p className="font-semibold text-sm">{step.nameAr}</p>
                      <p className="text-xs text-muted-foreground">{step.nameEn}</p>
                    </CardContent>
                  </Card>
                  {idx < DEVELOPMENT_CYCLE.length - 1 && (
                    <ChevronDown className="w-4 h-4 text-primary/40 -ml-2 shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Values */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">القيم الأخلاقية الأساسية</h2>
            <p className="text-muted-foreground">ثماني قيم جوهرية تُطوّر عبر المراحل التعليمية الأربع</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {MORAL_VALUES.map((value) => (
              <motion.div key={value.id} variants={item}>
                <Card
                  className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full"
                  onClick={() => navigate('values-map')}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl mb-2 block">{value.icon}</span>
                    <h3 className="font-bold text-sm mb-1">{value.nameAr}</h3>
                    <p className="text-xs text-muted-foreground">{value.nameEn}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {value.behaviors.length} سلوك مستهدف
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Educational Levels */}
      <section className="py-16 bg-gradient-to-b from-background to-emerald-50/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">المراحل التعليمية</h2>
            <p className="text-muted-foreground">كل قيمة تُقدّم بشكل مناسب لكل مرحلة عمرية</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {EDUCATIONAL_LEVELS.map((level) => (
              <motion.div key={level.id} variants={item}>
                <Card
                  className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full"
                  onClick={() => navigate('development-progression')}
                >
                  <CardContent className="p-5">
                    <span className="text-3xl mb-3 block">{level.icon}</span>
                    <h3 className="font-bold text-sm mb-1">{level.nameAr}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{level.nameEn}</p>
                    <Badge variant="outline" className="text-xs">
                      الصفوف {level.gradeRange}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Practical Example */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">مثال عملي</h2>
            <p className="text-muted-foreground">كيف تتحول قيمة الصبر إلى نشاط في درس الرياضيات</p>
          </motion.div>

          <Card className="border-primary/20 bg-gradient-to-bl from-emerald-50/50 to-transparent">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">المحاولة الثانية</h3>
                  <p className="text-sm text-muted-foreground">المرحلة المتوسطة — الرياضيات — حل المعادلات</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">السلوك المستهدف</p>
                    <p className="text-sm font-medium">ترك المهمة بعد أول خطأ</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">القيمة</p>
                    <Badge className="bg-emerald-100 text-emerald-700">الصبر والمثابرة</Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">المدة</p>
                    <p className="text-sm">١٥ دقيقة</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">الهدف الأكاديمي</p>
                    <p className="text-sm">يطبّق خطوات حل معادلة بسيطة</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">الهدف السلوكي</p>
                    <p className="text-sm">يُجري محاولة ثانية قبل التخلي</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">خطوات التنفيذ (مختصرة)</p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-foreground/90">
                  <li>تقديم معادلة مناسبة تحتوي تحدّيًا يمكن إدارته</li>
                  <li>السماح للطلاب بإكمال محاولة أولى</li>
                  <li>عدم تقديم الإجابة النهائية فورًا</li>
                  <li>طلب تحديد نقطة التوقف</li>
                  <li>السماح باختيار خيار دعم (تلميح / مثال مشابه / شرح زميل / مراجعة القاعدة)</li>
                  <li>إكمال محاولة ثانية</li>
                </ol>
              </div>

              <Button
                variant="outline"
                className="mt-4 gap-2"
                onClick={() => {
                  useAppStore.getState().setSelectedTechniqueId('tech-1');
                  navigate('technique-details', { id: 'tech-1' });
                }}
              >
                عرض التقنية كاملة
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safeguards */}
      <section className="py-16 bg-gradient-to-b from-background to-emerald-50/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">ضماناتنا التربوية</h2>
            <p className="text-muted-foreground">مبادئ لا نتنازل عنها لحماية كرامة الطلاب</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {SAFEGUARDS.map((safeguard) => (
              <motion.div key={safeguard.id} variants={item}>
                <Card className="h-full border-amber-200/50 bg-amber-50/30">
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl mb-2 block">{safeguard.icon}</span>
                    <p className="text-sm font-medium leading-relaxed">{safeguard.nameAr}</p>
                    <p className="text-xs text-muted-foreground mt-1">{safeguard.nameEn}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">ابدأ رحلتك التعليمية</h2>
            <p className="text-muted-foreground mb-8">
              انضم إلى مجتمع من المعلمين الذين يسعون لبناء إنسان يُربّى بالقيم
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={handleLogin} className="gap-2 text-base px-8">
                <Sparkles className="w-5 h-5" />
                ابدأ الآن
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('techniques-library')} className="gap-2 text-base px-8">
                تصفّح التقنيات
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
