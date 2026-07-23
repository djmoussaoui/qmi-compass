'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/app-store';
import {
  Info,
  Shield,
  Lock,
  SearchX,
  Ban,
  AlertTriangle,
  BookOpen,
  GitBranch,
  ArrowRight,
  Home,
  CheckCircle2,
  Eye,
  XCircle,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Star,
  Users,
  Heart,
  Lightbulb,
  GraduationCap,
  Globe,
  FileText,
  PenTool,
  ChevronLeft,
  Compass,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ============================
// About Page
// ============================
export function AboutPage() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-background to-amber-50/30 py-16 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <Info className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">عن بوصلة QMI</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              منصة تعليمية تسعى لتحويل المبادئ القرآنية إلى ممارسات تربوية عملية
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Project Purpose */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">الغاية من المشروع</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-right space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                بوصلة QMI هي منصة تعليمية متكاملة تهدف إلى مساعدة المعلمين على دمج القيم الأخلاقية
                المستلهمة من القرآن الكريم في المواقف التعليمية اليومية. لا تهدف المنصة إلى استبدال
                المنهج الدراسي، بل إلى إثرائه بتجارب تعليمية تبني شخصية الطالب المتكاملة.
              </p>
              <p>
                الاسم &quot;QMI&quot; يرمز إلى <span className="font-medium text-foreground">Qur&apos;an as a Medium of Instruction</span>،
                أي القرآن كوسيلة للتعليم — وهو نهج يرى أن القيم القرآنية يمكن أن تُترجم إلى
                سلوكيات ملموسة وقابلة للملاحظة في أي درس وبأي مادة.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inspiration */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-700" />
                </div>
                <CardTitle className="text-lg">مصدر الإلهام</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-right space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                جاءت فكرة بوصلة QMI من إيمان عميق بأن التعليم الحقيقي لا يقتصر على نقل المعرفة،
                بل يشمل بناء الإنسان بكليته. القرآن الكريم يقدم نموذجًا فريدًا في التربية والتوجيه،
                حيث يربط بين القيمة والسلوك، وبين المبدأ والتطبيق.
              </p>
              <p>
                نستلهم من الآيات القرآنية منهجية في صياغة المواقف التعليمية التي تنمي السلوك
                الإيجابي لدى الطلاب، مع الحفاظ على الخصوصية والكرامة لكل طالب.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">المهمة والرؤية</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-right space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                <h3 className="font-semibold text-sm text-primary mb-1">مهمتنا</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  تمكين كل معلم من تصميم أنشطة تعليمية مبنية على القيم القرآنية، بطريقة علمية
                  وموثوقة، مع ضمان كرامة الطالب وخصوصيته.
                </p>
              </div>
              <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-200/50">
                <h3 className="font-semibold text-sm text-emerald-700 mb-1">رؤيتنا</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  أن تصبح بوصلة QMI المرجع الأول للمعلمين الذين يسعون لتحويل كل درس إلى فرصة
                  حقيقية لبناء الإنسان.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">فريق العمل</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-right">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                يضم فريق بوصلة QMI باحثين في التربية الإسلامية، متخصصين في التقنيات التعليمية،
                ومراجعين للمراجع القرآنية، ومشرفين تربويين ذوي خبرة في الميدان.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: GraduationCap, label: 'باحثون تربويون', desc: 'تصميم المنهج والأنشطة' },
                  { icon: BookOpen, label: 'مراجعون قرآنيون', desc: 'ضمان دقة المراجع' },
                  { icon: Eye, label: 'مشرفون ميدانيون', desc: 'تطوير واختبار المحتوى' },
                ].map((member) => (
                  <div key={member.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <member.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.label}</p>
                      <p className="text-xs text-muted-foreground">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

// ============================
// Safeguards Page
// ============================
export function SafeguardsPage() {
  const { navigate } = useAppStore();

  const safeguards = [
    {
      icon: XCircle,
      title: 'لا توجد ترتيب أخلاقي',
      desc: 'لا نُصنّف الطلاب حسب مستوى الأخلاق أو نسبة التزامهم بالقيم. القيم ليست مادة للتقييم التنافسي.',
    },
    {
      icon: Ban,
      title: 'لا توجد ملصقات أو تصنيفات',
      desc: 'لا نُطلق على أي طالب صفات مثل "مؤدب" أو "غير مؤدب". كل طالب في رحلة نمو فريدة.',
    },
    {
      icon: Eye,
      title: 'التركيز على السلوك القابل للملاحظة فقط',
      desc: 'نُلاحظ ونُسجّل السلوك الظاهر القابل للملاحظة، ولا نتطرق إلى النوايا أو المشاعر الداخلية.',
    },
    {
      icon: Brain,
      title: 'مراجعة الذكاء الاصطناعي مطلوبة',
      desc: 'جميع المحتوى المُولّد بواسطة الذكاء الاصطناعي يخضع لمراجعة تربوية متخصصة قبل استخدامه.',
    },
    {
      icon: MessageSquare,
      title: 'مراجعة قرآنية متخصصة',
      desc: 'كل مرجع قرآني يمر بمراجعة علمية متخصصة للتأكد من دقة الاستدلال والاستشهاد.',
    },
    {
      icon: Lock,
      title: 'خصوصية الطالب محمية',
      desc: 'بيانات الملاحظات والسلوكيات محمية ولا تُشارك مع أي طرف ثالث. المعلم هو المسؤول الأول.',
    },
    {
      icon: Heart,
      title: 'الكرامة أولاً',
      desc: 'في كل نشاط نُصمّمه، نضمن أن الطالب يشعر بالاحترام والتقدير بغض النظر عن أدائه.',
    },
    {
      icon: ClipboardCheck,
      title: 'شفافية المنهجية',
      desc: 'الطرق المستخدمة في تصميم الأنشطة موثقة ومفتوحة للمراجعة من قبل المختصين.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-amber-50/60 via-background to-emerald-50/30 py-16 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 mb-4">
              <Shield className="w-7 h-7 text-amber-700" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">ضماناتنا التربوية</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              مبادئ لا نتنازل عنها لحماية كرامة الطلاب وضمان جودة المحتوى
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safeguards.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full border-amber-200/50 bg-amber-50/20 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Separator className="my-10" />

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                هذه الضمانات ليست مجرد سياسات، بل هي قيم جوهرية متأصلة في تصميم المنصة.
                نلتزم بها في كل نشاط نُصمّمه وكل ميزة نُضيفها.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

// ============================
// Privacy Page
// ============================
export function PrivacyPage() {
  const { navigate } = useAppStore();

  const sections = [
    {
      title: 'جمع البيانات',
      content: 'نجمع فقط البيانات الضرورية لعمل المنصة: الاسم، البريد الإلكتروني، والدور التعليمي. لا نطلب أي بيانات شخصية إضافية من الطلاب.',
    },
    {
      title: 'استخدام البيانات',
      content: 'تُستخدم البيانات حصريًا لتقديم الخدمات التعليمية وتحسين تجربة المستخدم. لا نبيع أو نشارك البيانات مع أي طرف ثالث.',
    },
    {
      title: 'ملاحظات السلوك',
      content: 'ملاحظات المعلمين عن سلوكيات الطلاب تبقى داخل حساب المعلم ولا تُنشر علنًا. هذه الملاحظات أداة تطوير مهني وليست سجلًا تقييميًا.',
    },
    {
      title: 'حماية البيانات',
      content: 'نستخدم تقنيات التشفير المتقدمة لحماية البيانات أثناء النقل والتخزين. يتم إجراء نسخ احتياطية منتظمة مع ضمان سرية المعلومات.',
    },
    {
      title: 'حقوق المستخدم',
      content: 'يمكن لأي مستخدم طلب عرض بياناته أو تعديلها أو حذفها في أي وقت. التواصل مع فريق الدعم لكافة الاستفسارات المتعلقة بالخصوصية.',
    },
    {
      title: 'ملفات تعريف الارتباط',
      content: 'نستخدم ملفات تعريف الارتباط فقط لضمان عمل المنصة بشكل صحيح وحفظ تفضيلات المستخدم. لا نستخدمها لأغراض إعلانية.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-background to-emerald-50/20 py-16 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">سياسة الخصوصية</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              كيف نحمي بياناتك ونبني ثقتك
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 space-y-4">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: idx * 0.05 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary">{idx + 1}</span>
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <p className="text-xs text-muted-foreground">
            آخر تحديث: يناير ٢٠٢٥ — للأسئلة والاستفسارات تواصل معنا عبر البريد الإلكتروني
          </p>
        </motion.div>
      </section>
    </div>
  );
}

// ============================
// Not Found Page
// ============================
export function NotFoundPage() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <SearchX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold text-muted-foreground/30 mb-2">404</h1>
        <h2 className="text-xl font-bold text-foreground mb-3">الصفحة غير موجودة</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>
        <Button onClick={() => navigate('home')} className="gap-2">
          <Home className="w-4 h-4" />
          العودة إلى الصفحة الرئيسية
        </Button>
      </motion.div>
    </div>
  );
}

// ============================
// Access Denied Page
// ============================
export function AccessDeniedPage() {
  const { goBack, navigate } = useAppStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
          <Ban className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-muted-foreground/30 mb-2">403</h1>
        <h2 className="text-xl font-bold text-foreground mb-3">ليس لديك صلاحية الوصول</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          ليس لديك الصلاحيات المطلوبة للوصول إلى هذه الصفحة. يرجى التواصل مع المشرف إذا كنت تعتقد أن هذا خطأ.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => goBack()} variant="outline" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة
          </Button>
          <Button onClick={() => navigate('home')} variant="secondary" className="gap-2">
            <Home className="w-4 h-4" />
            الصفحة الرئيسية
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================
// Error Page
// ============================
export function ErrorPage() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-3">حدث خطأ</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          نعتذر عن حدوث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => navigate('home')} className="gap-2">
            <Home className="w-4 h-4" />
            الصفحة الرئيسية
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
            إعادة المحاولة
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================
// Quranic Sources Page
// ============================
export function QuranicSourcesPage() {
  const { navigate } = useAppStore();

  const placeholderValues = [
    { id: 1, nameAr: 'الصبر والمثابرة', nameEn: 'Patience & Perseverance' },
    { id: 2, nameAr: 'الأمانة', nameEn: 'Honesty' },
    { id: 3, nameAr: 'العدل', nameEn: 'Justice' },
    { id: 4, nameAr: 'الاحترام', nameEn: 'Respect' },
    { id: 5, nameAr: 'التعاون', nameEn: 'Cooperation' },
    { id: 6, nameAr: 'المسؤولية', nameEn: 'Responsibility' },
    { id: 7, nameAr: 'الإحسان', nameEn: 'Excellence' },
    { id: 8, nameAr: 'التواضع', nameEn: 'Humility' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-background to-amber-50/30 py-16 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">المراجع القرآنية</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              مستودع المراجع القرآنية المعتمدة للقيم والمبادئ التعليمية
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Notice */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="border-amber-200/50 bg-amber-50/30">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-right">
                <p className="text-sm font-medium text-amber-800 mb-1">قيد المراجعة العلمية</p>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  جميع المراجع القرآنية في هذه الصفحة تخضع لعملية مراجعة علمية متخصصة.
                  ستتم إضافة المراجع المعتمدة بعد اكتمال عملية المراجعة.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values list with placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {placeholderValues.map((val, idx) => (
            <motion.div
              key={val.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>{val.nameAr}</span>
                    <Badge variant="secondary" className="text-xs">قيد المراجعة</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">{val.nameEn}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground italic">
                      يضاف المرجع القرآني بعد المراجعة العلمية
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================
// Review Workflow Page
// ============================
export function ReviewWorkflowPage() {
  const { navigate } = useAppStore();

  const steps = [
    {
      id: 1,
      titleAr: 'المسودة',
      titleEn: 'Draft',
      icon: PenTool,
      description: 'يقوم النظام بتوليد مسودة النشاط التعليمي بناءً على مدخلات المعلم: السلوك المستهدف، القيمة، المرحلة التعليمية، والمادة.',
      color: 'bg-slate-100 text-slate-600',
      badge: 'مسودة',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 2,
      titleAr: 'المراجعة التربوية',
      titleEn: 'Educational Review',
      icon: ClipboardCheck,
      description: 'يخضع النشاط لمراجعة متخصصة من مراجع تربوي للتأكد من ملاءمته للمرحلة العمرية ودقة الأهداف السلوكية وجودة خطوات التنفيذ.',
      color: 'bg-amber-100 text-amber-700',
      badge: 'تربوي',
      badgeVariant: 'outline' as const,
    },
    {
      id: 3,
      titleAr: 'المراجعة القرآنية',
      titleEn: 'Qur\'anic Review',
      icon: BookOpen,
      description: 'يُراجع المرجع القرآني من قِبل متخصص في العلوم القرآنية للتأكد من دقة الاستدلال ومناسبة الآية للسياق التربوي.',
      color: 'bg-emerald-100 text-emerald-700',
      badge: 'قرآني',
      badgeVariant: 'outline' as const,
    },
    {
      id: 4,
      titleAr: 'معتمد',
      titleEn: 'Approved',
      icon: CheckCircle2,
      description: 'بعد اجتياز المراجعتين بنجاح، يُعتمد النشاط ويصبح متاحًا للاستخدام من قِبل المعلمين مع الإشارة إلى حالة الاعتماد.',
      color: 'bg-primary/10 text-primary',
      badge: 'معتمد',
      badgeVariant: 'default' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-background to-amber-50/30 py-16 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <GitBranch className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">مسار المراجعة العلمية</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              كل نشاط يمر بمراجعة مزدوجة لضمان الجودة التربوية ودقة المراجع القرآنية
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="absolute right-6 top-16 bottom-0 w-0.5 bg-primary/20" />
                )}

                <div className="flex gap-4 pb-8">
                  {/* Step icon */}
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shrink-0 z-10 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Step content */}
                  <Card className="flex-1">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full w-6 h-6 flex items-center justify-center">
                            {step.id}
                          </span>
                          <h3 className="font-semibold text-sm">{step.titleAr}</h3>
                        </div>
                        <Badge variant={step.badgeVariant} className="text-xs">
                          {step.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{step.titleEn}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-right">
                  <h3 className="font-semibold text-sm mb-1">ضمان الجودة</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    هذا المسار يضمن أن كل نشاط تعليمي على المنصة قد خضع لمراجعتين
                    متخصصتين: واحدة تربوية وأخرى قرآنية، قبل أن يصل إلى المعلم.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}