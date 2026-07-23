'use client';

import { useAppStore } from '@/store/app-store';
import { TECHNIQUES } from '@/data/techniques';
import {
  REVIEW_STATUSES,
  EDUCATIONAL_LEVELS,
  SUBJECTS,
  ACTIVITY_TYPES,
  GROUP_SIZES,
  LOCATIONS,
  QURANIC_PENDING_AR,
} from '@/data/qmi-data';
import { AIDisclaimer } from '@/components/shared/AIDisclaimer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Clock,
  Save,
  Copy,
  Printer,
  Info,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Users,
  MapPin,
  BarChart3,
  BookOpen,
  Target,
  Lightbulb,
  ListChecks,
  TrendingUp,
  GitBranch,
  AlertOctagon,
  HeartHandshake,
  ClipboardList,
  Wrench,
} from 'lucide-react';

// Difficulty mapping (no constant in qmi-data)
const DIFFICULTY_MAP: Record<string, string> = {
  easy: 'سهل',
  medium: 'متوسط',
  hard: 'صعب',
};

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Card className="py-0 gap-0 overflow-hidden">
      <div className="flex items-center gap-3 border-b bg-muted/30 px-5 py-3">
        <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-emerald-100">
          <Icon className="h-4 w-4 text-emerald-700" />
        </div>
        <h3 className="font-semibold text-emerald-800">{title}</h3>
      </div>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-muted-foreground">{children}</span>
  );
}

function SectionValue({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-foreground">{children}</span>;
}

export function TechniqueDetails() {
  const { viewParams, goBack, navigate, setSelectedTechniqueId } = useAppStore();
  const techniqueId = viewParams.id;
  const technique = TECHNIQUES.find((t) => t.id === techniqueId);

  // Helper functions
  const getLevelName = (id: string) =>
    EDUCATIONAL_LEVELS.find((l) => l.id === id)?.nameAr || id;
  const getSubjectName = (id: string) =>
    SUBJECTS.find((s) => s.id === id)?.nameAr || id;
  const getActivityName = (id: string) =>
    ACTIVITY_TYPES.find((a) => a.id === id)?.nameAr || id;
  const getGroupName = (id: string) =>
    GROUP_SIZES.find((g) => g.id === id)?.nameAr || id;
  const getLocationName = (id: string) =>
    LOCATIONS.find((l) => l.id === id)?.nameAr || id;
  const getDifficultyName = (id: string) =>
    DIFFICULTY_MAP[id] || id;
  const getStatusInfo = (id: string) =>
    REVIEW_STATUSES.find((s) => s.id === id);

  if (!technique) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <AlertOctagon className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          التقنية غير موجودة
        </h2>
        <p className="text-muted-foreground mb-6">
          لم يتم العثور على التقنية المطلوبة. قد تكون قد حُذفت أو أن الرابط غير صحيح.
        </p>
        <Button
          variant="outline"
          className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          onClick={goBack}
        >
          <ArrowRight className="h-4 w-4" />
          العودة
        </Button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(technique.reviewStatus);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button + Title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="text-emerald-700 hover:bg-emerald-50"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-emerald-800">
          تفاصيل التقنية
        </h1>
      </div>

      {/* AI Disclaimer */}
      <AIDisclaimer />

      {/* Header Card */}
      <Card className="py-0 gap-0 overflow-hidden">
        <CardContent className="p-5 space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            {technique.titleAr}
          </h2>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              {technique.valueNameAr}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {getLevelName(technique.educationalLevel)}
            </Badge>
            {statusInfo && (
              <Badge
                variant="secondary"
                className={`${statusInfo.color} hover:opacity-90`}
              >
                {statusInfo.nameAr}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
              <Clock className="h-3 w-3 ml-1" />
              {technique.durationMinutes} دقيقة
            </Badge>
          </div>

          {/* Quick Info Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {getActivityName(technique.activityType)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {getGroupName(technique.groupSize)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {getLocationName(technique.location)}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              {getDifficultyName(technique.difficulty)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Layout for Context + Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Context Card */}
        <SectionCard title="السياق التعليمي" icon={ClipboardList}>
          <dl className="space-y-3">
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>المادة</SectionLabel>
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {technique.subjects.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {getSubjectName(s)}
                  </Badge>
                ))}
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>الموضوع</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{technique.topic}</SectionValue>
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>نوع النشاط</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{getActivityName(technique.activityType)}</SectionValue>
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>حجم المجموعة</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{getGroupName(technique.groupSize)}</SectionValue>
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>المكان</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{getLocationName(technique.location)}</SectionValue>
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>الصعوبة</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{getDifficultyName(technique.difficulty)}</SectionValue>
              </dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <dt className="min-w-[80px]">
                <SectionLabel>المدة</SectionLabel>
              </dt>
              <dd>
                <SectionValue>{technique.durationMinutes} دقيقة</SectionValue>
              </dd>
            </div>
          </dl>
        </SectionCard>

        {/* Objectives Card */}
        <SectionCard title="الأهداف" icon={Target}>
          <div className="space-y-4">
            <div>
              <SectionLabel>الهدف الأكاديمي</SectionLabel>
              <p className="mt-1 text-sm text-foreground leading-relaxed border-r-2 border-emerald-200 pr-3">
                {technique.academicObjectiveAr}
              </p>
            </div>
            <Separator />
            <div>
              <SectionLabel>الهدف السلوكي</SectionLabel>
              <p className="mt-1 text-sm text-foreground leading-relaxed border-r-2 border-emerald-400 pr-3">
                {technique.behavioralObjectiveAr}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Summary */}
      <SectionCard title="الملخص" icon={BookOpen}>
        <p className="text-sm text-foreground leading-relaxed">
          {technique.descriptionAr}
        </p>
      </SectionCard>

      {/* Qur'anic Foundation */}
      <SectionCard title="الأساس القرآني" icon={Lightbulb}>
        {technique.quranicFoundation ? (
          <p className="text-sm text-foreground leading-relaxed">
            {technique.quranicFoundation}
          </p>
        ) : (
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <Info className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800">{QURANIC_PENDING_AR}</p>
          </div>
        )}
      </SectionCard>

      {/* Implementation Steps */}
      <SectionCard title="خطوات التنفيذ" icon={ListChecks}>
        <ol className="space-y-3">
          {technique.implementationStepsAr.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* Two-Column: Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Teacher Role */}
        <SectionCard title="دور المعلم" icon={Users}>
          <p className="text-sm text-foreground leading-relaxed">
            {technique.teacherRoleAr}
          </p>
        </SectionCard>

        {/* Student Role */}
        <SectionCard title="دور الطالب" icon={Users}>
          <p className="text-sm text-foreground leading-relaxed">
            {technique.studentRoleAr}
          </p>
        </SectionCard>
      </div>

      {/* Required Resources */}
      {technique.requiredResourcesAr.length > 0 && (
        <SectionCard title="الموارد المطلوبة" icon={ClipboardList}>
          <ul className="space-y-2">
            {technique.requiredResourcesAr.map((res, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{res}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Reflection Questions */}
      {technique.reflectionQuestionsAr.length > 0 && (
        <SectionCard title="أسئلة التأمل" icon={Lightbulb}>
          <ol className="space-y-2">
            {technique.reflectionQuestionsAr.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{q}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
      )}

      {/* Observation Indicators */}
      {technique.observationIndicatorsAr.length > 0 && (
        <SectionCard title="مؤشرات الملاحظة" icon={CheckCircle2}>
          <ul className="space-y-2">
            {technique.observationIndicatorsAr.map((ind, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{ind}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Progress Levels */}
      {technique.progressLevelsAr.length > 0 && (
        <SectionCard title="مستويات التقدم" icon={TrendingUp}>
          <ul className="space-y-2">
            {technique.progressLevelsAr.map((level, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center h-6 w-6 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{level}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Differentiation */}
      {technique.differentiationAr.length > 0 && (
        <SectionCard title="الفروق" icon={GitBranch}>
          <ul className="space-y-2">
            {technique.differentiationAr.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Two-Column: Risks + Safeguards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Educational Risks */}
        {technique.educationalRisksAr.length > 0 && (
          <SectionCard title="المخاطر التربوية" icon={AlertTriangle}>
            <ul className="space-y-2">
              {technique.educationalRisksAr.map((risk, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{risk}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Safeguards */}
        {technique.safeguardsAr.length > 0 && (
          <SectionCard title="الضمانات" icon={Shield}>
            <ul className="space-y-2">
              {technique.safeguardsAr.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{s}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>

      {/* Daily Life Transfer */}
      <SectionCard title="النقل للحياة اليومية" icon={HeartHandshake}>
        <p className="text-sm text-foreground leading-relaxed">
          {technique.dailyLifeTransferAr}
        </p>
      </SectionCard>

      {/* Follow-up Recommendation */}
      <SectionCard title="التوصية" icon={ClipboardList}>
        <p className="text-sm text-foreground leading-relaxed">
          {technique.followUpRecommendationAr}
        </p>
      </SectionCard>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2 pb-8">
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => {
            setSelectedTechniqueId(technique!.id);
            navigate('activity-designer');
          }}
        >
          <Wrench className="h-4 w-4" />
          استخدم التقنية
        </Button>
        <Button variant="outline">
          <Save className="h-4 w-4" />
          حفظ
        </Button>
        <Button variant="outline">
          <Copy className="h-4 w-4" />
          تكرار
        </Button>
        <Button
          variant="outline"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4" />
          طباعة
        </Button>
        <Button
          variant="ghost"
          className="text-emerald-700 hover:bg-emerald-50"
          onClick={goBack}
        >
          <ArrowRight className="h-4 w-4" />
          العودة
        </Button>
      </div>
    </div>
  );
}
