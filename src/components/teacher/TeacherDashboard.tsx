'use client';

import { useAppStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  ClipboardCheck,
  Clock,
  Sparkles,
  BookOpen,
  Map,
  Eye,
  ArrowLeft,
  GraduationCap,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'عدد الصفوف', value: '٣', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'عدد الطلاب', value: '٨٣', icon: GraduationCap, color: 'text-amber-600 bg-amber-50' },
  { label: 'أنشطة مُنفّذة', value: '١٢', icon: CheckCircle2, color: 'text-teal-600 bg-teal-50' },
  { label: 'أنشطة قيد المراجعة', value: '٥', icon: Clock, color: 'text-orange-600 bg-orange-50' },
];

const quickActions = [
  { label: 'صمّم نشاطًا جديدًا', icon: Sparkles, view: 'activity-designer' as const, desc: 'أنشئ نشاطًا تعليميًا مخصصًا' },
  { label: 'مكتبة التقنيات', icon: BookOpen, view: 'techniques-library' as const, desc: 'تصفّح التقنيات التربوية المتاحة' },
  { label: 'خريطة القيم', icon: Map, view: 'values-map' as const, desc: 'استكشف القيم الأخلاقية الأساسية' },
  { label: 'ملاحظة سلوكية', icon: Eye, view: 'observation-card' as const, desc: 'سجّل ملاحظة على سلوك طالب' },
];

const recentActivities = [
  {
    id: '1',
    title: 'المحاولة الثانية',
    value: 'الصبر والمثابرة',
    subject: 'الرياضيات',
    level: 'المرحلة المتوسطة',
    status: 'completed' as const,
    date: 'منذ يومين',
  },
  {
    id: '2',
    title: 'فريق الواحد',
    value: 'العدل والإنصاف',
    subject: 'التربية البدنية',
    level: 'المرحلة المتوسطة',
    status: 'completed' as const,
    date: 'منذ ٤ أيام',
  },
  {
    id: '3',
    title: 'حكاية سمعتها',
    value: 'الصدق',
    subject: 'اللغة العربية',
    level: 'المرحلة الابتدائية',
    status: 'review' as const,
    date: 'منذ أسبوع',
  },
  {
    id: '4',
    title: 'القائد الصامت',
    value: 'تواضع القلب',
    subject: 'الدراسات الاجتماعية',
    level: 'المرحلة الثانوية',
    status: 'review' as const,
    date: 'منذ أسبوعين',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function TeacherDashboard() {
  const { navigate, currentUser } = useAppStore();

  const teacherName = currentUser?.nameAr || 'المعلم';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-l from-emerald-50 via-background to-amber-50/30 rounded-xl p-5 sm:p-6 border border-border/50"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">مرحبًا، {teacherName}</h2>
            <p className="text-sm text-muted-foreground">
              إليك ملخص نشاطك التعليمي
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item}>
              <Card className="h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none mb-0.5">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-semibold mb-3">إجراءات سريعة</h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.div key={action.label} variants={item}>
                <Card
                  className="h-full cursor-pointer hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
                  onClick={() => navigate(action.view)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold mb-1">{action.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{action.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">أنشطة حديثة</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-primary"
            onClick={() => navigate('techniques-library')}
          >
            عرض الكل
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {recentActivities.map((activity) => (
            <motion.div key={activity.id} variants={item}>
              <Card className="h-full hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground">{activity.subject} — {activity.level}</p>
                    </div>
                    <Badge
                      variant={activity.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        activity.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700 text-xs shrink-0'
                          : 'bg-amber-100 text-amber-700 text-xs shrink-0'
                      }
                    >
                      {activity.status === 'completed' ? 'مُنفّذ' : 'قيد المراجعة'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {activity.value}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}