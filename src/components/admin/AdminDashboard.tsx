'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { MORAL_VALUES } from '@/data/qmi-data';
import { TECHNIQUES } from '@/data/techniques';
import {
  Users,
  Shield,
  BookOpen,
  FileText,
  Settings,
  Building2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export function AdminDashboard() {
  const { navigate } = useAppStore();

  const totalTechniques = TECHNIQUES.length;
  const approvedTechniques = TECHNIQUES.filter(t => t.reviewStatus === 'approved').length;
  const pendingReview = TECHNIQUES.filter(t => t.reviewStatus === 'educational_review' || t.reviewStatus === 'quranic_review' || t.reviewStatus === 'draft').length;
  const totalValues = MORAL_VALUES.length;

  const stats = [
    { labelAr: 'التقنيات الكلية', value: totalTechniques, icon: BookOpen, color: 'text-primary' },
    { labelAr: 'تقنيات معتمدة', value: approvedTechniques, icon: CheckCircle2, color: 'text-emerald-600' },
    { labelAr: 'بانتظار المراجعة', value: pendingReview, icon: Clock, color: 'text-amber-600' },
    { labelAr: 'القيم الأخلاقية', value: totalValues, icon: Shield, color: 'text-teal-600' },
  ];

  const reviewItems = TECHNIQUES.filter(t => t.reviewStatus !== 'approved').slice(0, 5);

  const statusColorMap: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    educational_review: 'bg-amber-100 text-amber-700',
    quranic_review: 'bg-emerald-100 text-emerald-700',
    revision_required: 'bg-orange-100 text-orange-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const statusNameMap: Record<string, string> = {
    draft: 'مسودة',
    educational_review: 'مراجعة تربوية',
    quranic_review: 'مراجعة قرآنية',
    revision_required: 'يحتاج تعديل',
    rejected: 'مرفوض',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">لوحة الإدارة</h2>
        <p className="text-sm text-muted-foreground">إدارة المؤسسات والمستخدمين والمحتوى</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.labelAr}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.labelAr}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { titleAr: 'إدارة المؤسسات', descAr: 'إضافة وتعديل المؤسسات التعليمية', icon: Building2, view: 'admin-dashboard' },
          { titleAr: 'إدارة المستخدمين', descAr: 'إضافة المستخدمين وتعيين الأدوار', icon: Users, view: 'admin-dashboard' },
          { titleAr: 'إدارة القيم والسلوكيات', descAr: 'تعديل خريطة القيم والسلوكيات', icon: Shield, view: 'values-map' },
          { titleAr: 'إدارة التقنيات', descAr: 'مراجعة واعتماد التقنيات', icon: BookOpen, view: 'techniques-library' },
          { titleAr: 'سير العمل العلمي', descAr: 'متابعة عمليات المراجعة التربوية والقرآنية', icon: FileText, view: 'review-workflow' },
          { titleAr: 'الإعدادات', descAr: 'إعدادات النظام والخصوصية', icon: Settings, view: 'admin-dashboard' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Card key={action.titleAr} className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(action.view as any)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{action.titleAr}</p>
                  <p className="text-xs text-muted-foreground">{action.descAr}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            بانتظار المراجعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reviewItems.map((tech) => (
              <div key={tech.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">{tech.titleAr}</p>
                    <p className="text-xs text-muted-foreground">{tech.valueNameAr} — {tech.durationMinutes} دقيقة</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${statusColorMap[tech.reviewStatus] || ''}`}>
                    {statusNameMap[tech.reviewStatus] || tech.reviewStatus}
                  </Badge>
                  <Button size="sm" variant="outline" className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      useAppStore.getState().setSelectedTechniqueId(tech.id);
                      navigate('technique-details', { id: tech.id });
                    }}
                  >
                    مراجعة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notice */}
      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="p-4 flex items-start gap-3">
          <Eye className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">وضع النموذج الأولي</p>
            <p className="text-xs text-amber-700">
              هذه واجهة مُبسّطة لأغراض العرض. الوظائف الإدارية الكاملة ستكون متاحة في الإصدار النهائي.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}