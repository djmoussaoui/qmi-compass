'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/store/app-store';
import {
  EDUCATIONAL_LEVELS,
  SUBJECTS,
  ACTIVITY_TYPES,
  GROUP_SIZES,
  LOCATIONS,
  MORAL_VALUES,
  INTERVENTION_TYPES,
  AI_DISCLAIMER_AR,
  QURANIC_PENDING_AR,
  BEHAVIOR_WARNING_AR,
  FORBIDDEN_LABELS,
} from '@/data/qmi-data';
import { TECHNIQUES, TechniqueData } from '@/data/techniques';
import { AIDisclaimer } from '@/components/shared/AIDisclaimer';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Target,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Save,
  Share2,
  LogIn,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Eye,
  User,
  Users,
  Package,
  HelpCircle,
  ArrowLeftRight,
  Shield,
  Globe,
  MessageSquare,
  Loader2,
} from 'lucide-react';

const STEP_LABELS = [
  'السياق التعليمي',
  'الهدف الأخلاقي',
  'صيغة النشاط',
  'النشاط المُولّد',
];

const STEP_ICONS = [BookOpen, Target, Sparkles, FileText];

const ACTIVITY_TYPE_ICONS: Record<string, React.ReactNode> = {
  story: <BookOpen className="h-6 w-6" />,
  roleplay: <Users className="h-6 w-6" />,
  experiment: <Sparkles className="h-6 w-6" />,
  competition: <Target className="h-6 w-6" />,
  project: <ClipboardList className="h-6 w-6" />,
  debate: <ArrowLeftRight className="h-6 w-6" />,
  case_study: <FileText className="h-6 w-6" />,
  community_service: <Globe className="h-6 w-6" />,
  reflection: <MessageSquare className="h-6 w-6" />,
  simulation: <User className="h-6 w-6" />,
  group_problem: <Users className="h-6 w-6" />,
};

export default function ActivityDesigner() {
  const { navigate, isAuthenticated, setSelectedTechniqueId } = useAppStore();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    educationalLevel: '',
    grade: '',
    ageRange: '',
    subject: '',
    topic: '',
    academicObjective: '',
    studentCount: '',
    lessonDuration: '',
    moralDuration: '',
    learningFormat: '',
    location: '',
    behavior: '',
    valueId: '',
    situation: '',
    supportLevel: '',
    interventionType: '',
    activityType: '',
  });
  const [generatedActivity, setGeneratedActivity] = useState<TechniqueData | null>(null);
  const [behaviorWarning, setBehaviorWarning] = useState(false);

  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'behavior') {
      const hasMatch = FORBIDDEN_LABELS.some(
        (label) => value.includes(label)
      );
      setBehaviorWarning(hasMatch);
    }
  }, []);

  const findBestTechnique = useCallback(
    (valueId: string, educationalLevel: string, activityType?: string): TechniqueData | null => {
      // 1. Exact match: valueId + educationalLevel + activityType
      let matches = TECHNIQUES.filter(
        (t) =>
          t.valueId === valueId &&
          t.educationalLevel === educationalLevel &&
          (!activityType || t.activityType === activityType)
      );
      if (matches.length > 0) return matches[0];

      // 2. Match by valueId + educationalLevel
      matches = TECHNIQUES.filter(
        (t) => t.valueId === valueId && t.educationalLevel === educationalLevel
      );
      if (matches.length > 0) return matches[0];

      // 3. Match by valueId + activityType
      if (activityType) {
        matches = TECHNIQUES.filter(
          (t) => t.valueId === valueId && t.activityType === activityType
        );
        if (matches.length > 0) return matches[0];
      }

      // 4. Match by valueId only (closest level)
      matches = TECHNIQUES.filter((t) => t.valueId === valueId);
      if (matches.length > 0) {
        const levelOrder = ['primary', 'middle', 'secondary', 'university'];
        const currentIdx = levelOrder.indexOf(educationalLevel);
        if (currentIdx >= 0) {
          // Find closest level
          let closest = matches[0];
          let closestDist = Math.abs(levelOrder.indexOf(matches[0].educationalLevel) - currentIdx);
          for (const m of matches) {
            const dist = Math.abs(levelOrder.indexOf(m.educationalLevel) - currentIdx);
            if (dist < closestDist) {
              closest = m;
              closestDist = dist;
            }
          }
          return closest;
        }
        return matches[0];
      }

      return null;
    },
    []
  );

  const handleGenerate = useCallback(() => {
    if (!formData.valueId || !formData.educationalLevel) return;
    setIsGenerating(true);
    // Simulate brief loading
    setTimeout(() => {
      const technique = findBestTechnique(
        formData.valueId,
        formData.educationalLevel,
        formData.activityType || undefined
      );
      setGeneratedActivity(technique);
      setIsGenerating(false);
      setStep(4);
    }, 800);
  }, [formData, findBestTechnique]);

  const handleSave = useCallback(() => {
    if (generatedActivity) {
      setSelectedTechniqueId(generatedActivity.id);
    }
    // In a real app, this would save to the database
  }, [generatedActivity, setSelectedTechniqueId]);

  const handleEdit = useCallback(() => {
    setStep(1);
    setGeneratedActivity(null);
  }, []);

  const handleShare = useCallback(() => {
    // In a real app, this would open a share dialog
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-4">
        <div className="rounded-full bg-emerald-100 p-6">
          <LogIn className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">تسجيل الدخول مطلوب</h2>
        <p className="text-center text-gray-500 max-w-md">
          يرجى تسجيل الدخول للوصول إلى مصمم الأنشطة وإنشاء أنشطة تعليمية قرآنية مخصصة.
        </p>
        <Button
          onClick={() => navigate('login')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          size="lg"
        >
          <LogIn className="h-4 w-4 ml-2" />
          تسجيل الدخول
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Sparkles className="h-7 w-7 text-emerald-600" />
          مصمم الأنشطة
        </h1>
        <p className="text-gray-500">
          صمّم نشاطًا تعليميًا مدمجًا بالقيم الأخلاقية في أربع خطوات
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-0 px-4" dir="rtl">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const Icon = STEP_ICONS[idx];
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;

          return (
            <div key={stepNum} className="flex items-center">
              {idx > 0 && (
                <div
                  className={`h-0.5 w-8 md:w-16 transition-colors duration-300 ${
                    step > stepNum ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              )}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : isCompleted
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-600'
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  )}
                </div>
                <span
                  className={`text-xs md:text-sm font-medium hidden sm:block ${
                    isActive ? 'text-emerald-700' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-xs font-bold sm:hidden ${
                    isActive ? 'text-emerald-700' : 'text-gray-400'
                  }`}
                >
                  {stepNum}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4 md:p-8">
          {step === 1 && (
            <Step1Context formData={formData} updateField={updateField} />
          )}
          {step === 2 && (
            <Step2Moral formData={formData} updateField={updateField} behaviorWarning={behaviorWarning} />
          )}
          {step === 3 && (
            <Step3Format formData={formData} updateField={updateField} onGenerate={handleGenerate} isGenerating={isGenerating} />
          )}
          {step === 4 && (
            <Step4Generated
              technique={generatedActivity}
              onSave={handleSave}
              onEdit={handleEdit}
              onShare={handleShare}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between items-center">
          <div>
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="gap-2"
              >
                <ChevronRight className="h-4 w-4" />
                السابق
              </Button>
            )}
          </div>
          {step < 3 && (
            <Button
              onClick={() => setStep((s) => s + 1)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Step 1: Educational Context ─── */
function Step1Context({
  formData,
  updateField,
}: {
  formData: Record<string, string>;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-emerald-100 p-2">
          <BookOpen className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">السياق التعليمي</h2>
          <p className="text-sm text-gray-500">حدد معلومات البيئة التعليمية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Educational Level */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">المرحلة التعليمية *</Label>
          <Select
            value={formData.educationalLevel}
            onValueChange={(v) => updateField('educationalLevel', v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المرحلة..." />
            </SelectTrigger>
            <SelectContent>
              {EDUCATIONAL_LEVELS.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.icon} {level.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">الصف / السنة الدراسية</Label>
          <Input
            placeholder="مثال: الصف الثامن"
            value={formData.grade}
            onChange={(e) => updateField('grade', e.target.value)}
          />
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">الفئة العمرية</Label>
          <Input
            placeholder="مثال: 13-14"
            value={formData.ageRange}
            onChange={(e) => updateField('ageRange', e.target.value)}
            dir="ltr"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">المادة الدراسية *</Label>
          <Select
            value={formData.subject}
            onValueChange={(v) => updateField('subject', v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المادة..." />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  {sub.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lesson Topic */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-gray-700 font-medium">موضوع الدرس</Label>
          <Input
            placeholder="مثال: حل المعادلات الخطية"
            value={formData.topic}
            onChange={(e) => updateField('topic', e.target.value)}
          />
        </div>

        {/* Academic Objective */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-gray-700 font-medium">الهدف الأكاديمي</Label>
          <Textarea
            placeholder="مثال: يطبق الطالب خطوات حل المعادلة الخطية بدقة"
            value={formData.academicObjective}
            onChange={(e) => updateField('academicObjective', e.target.value)}
            rows={3}
          />
        </div>

        {/* Student Count */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">عدد الطلاب</Label>
          <Input
            type="number"
            placeholder="مثال: 28"
            value={formData.studentCount}
            onChange={(e) => updateField('studentCount', e.target.value)}
            dir="ltr"
          />
        </div>

        {/* Lesson Duration */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">مدة الدرس (دقيقة)</Label>
          <Input
            type="number"
            placeholder="مثال: 45"
            value={formData.lessonDuration}
            onChange={(e) => updateField('lessonDuration', e.target.value)}
            dir="ltr"
          />
        </div>

        {/* Moral Activity Duration */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">مدة النشاط الأخلاقي (دقيقة)</Label>
          <Input
            type="number"
            placeholder="مثال: 15"
            value={formData.moralDuration}
            onChange={(e) => updateField('moralDuration', e.target.value)}
            dir="ltr"
          />
        </div>

        {/* Learning Format */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">صيغة التعلم</Label>
          <Select
            value={formData.learningFormat}
            onValueChange={(v) => updateField('learningFormat', v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر الصيغة..." />
            </SelectTrigger>
            <SelectContent>
              {GROUP_SIZES.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-gray-700 font-medium">مكان التنفيذ</Label>
          <Select
            value={formData.location}
            onValueChange={(v) => updateField('location', v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المكان..." />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Moral Development Objective ─── */
function Step2Moral({
  formData,
  updateField,
  behaviorWarning,
}: {
  formData: Record<string, string>;
  updateField: (field: string, value: string) => void;
  behaviorWarning: boolean;
}) {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-emerald-100 p-2">
          <Target className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">الهدف الأخلاقي</h2>
          <p className="text-sm text-gray-500">حدد السلوك والقيمة المستهدفة</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Behavior */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">السلوك الذي يحتاج تحسينًا *</Label>
          <Textarea
            placeholder="صِف السلوك المحدد الذي لاحظته... (مثال: يترك المهمة بعد أول خطأ)"
            value={formData.behavior}
            onChange={(e) => updateField('behavior', e.target.value)}
            rows={3}
          />
          {behaviorWarning && (
            <Alert className="border-red-200 bg-red-50 text-red-700">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-sm">
                {BEHAVIOR_WARNING_AR}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Target Value */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">القيمة الأخلاقية المستهدفة *</Label>
          <Select
            value={formData.valueId}
            onValueChange={(v) => updateField('valueId', v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر القيمة..." />
            </SelectTrigger>
            <SelectContent>
              {MORAL_VALUES.map((val) => (
                <SelectItem key={val.id} value={val.id}>
                  {val.icon} {val.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Situation Description */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">وصف الموقف</Label>
          <Textarea
            placeholder="صِف الموقف التعليمي الذي يظهر فيه هذا السلوك..."
            value={formData.situation}
            onChange={(e) => updateField('situation', e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Support Level */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">مستوى الدعم الحالي</Label>
            <Select
              value={formData.supportLevel}
              onValueChange={(v) => updateField('supportLevel', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المستوى..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">مبدئي</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Intervention Type */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">نوع التدخل</Label>
            <Select
              value={formData.interventionType}
              onValueChange={(v) => updateField('interventionType', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر النوع..." />
              </SelectTrigger>
              <SelectContent>
                {INTERVENTION_TYPES.map((int) => (
                  <SelectItem key={int.id} value={int.id}>
                    {int.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Activity Format ─── */
function Step3Format({
  formData,
  updateField,
  onGenerate,
  isGenerating,
}: {
  formData: Record<string, string>;
  updateField: (field: string, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}) {
  const canGenerate = formData.valueId && formData.educationalLevel;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-emerald-100 p-2">
          <Sparkles className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">صيغة النشاط</h2>
          <p className="text-sm text-gray-500">اختر نوع النشاط المناسب</p>
        </div>
      </div>

      {/* Activity Type Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ACTIVITY_TYPES.map((type) => {
          const isSelected = formData.activityType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => updateField('activityType', type.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-emerald-100 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div
                className={`rounded-lg p-2 ${
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {ACTIVITY_TYPE_ICONS[type.id] || <Sparkles className="h-6 w-6" />}
              </div>
              <span
                className={`text-sm font-medium text-center ${
                  isSelected ? 'text-emerald-700' : 'text-gray-600'
                }`}
              >
                {type.nameAr}
              </span>
              {isSelected && (
                <div className="absolute top-2 left-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!canGenerate && (
        <Alert className="border-amber-200 bg-amber-50 text-amber-700">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm">
            يرجى إكمال الخطوتين الأولى والثانية (المرحلة التعليمية والقيمة المستهدفة) قبل توليد النشاط.
          </AlertDescription>
        </Alert>
      )}

      {/* Generate Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-base gap-3 shadow-lg shadow-emerald-200 disabled:opacity-50"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              جارٍ التوليد...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              توليد النشاط
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* ─── Step 4: Generated Activity ─── */
function Step4Generated({
  technique,
  onSave,
  onEdit,
  onShare,
}: {
  technique: TechniqueData | null;
  onSave: () => void;
  onEdit: () => void;
  onShare: () => void;
}) {
  if (!technique) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center" dir="rtl">
        <div className="rounded-full bg-gray-100 p-4">
          <AlertTriangle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">لم يتم العثور على نشاط مطابق</h3>
        <p className="text-gray-500 max-w-md">
          لم نتمكن من إيجاد تقنية مطابقة للقيمة والمرحلة المحددة. يرجى تعديل الخيارات والمحاولة مرة أخرى.
        </p>
        <Button onClick={onEdit} variant="outline" className="gap-2">
          <ChevronRight className="h-4 w-4" />
          تعديل الخيارات
        </Button>
      </div>
    );
  }

  const levelData = EDUCATIONAL_LEVELS.find((l) => l.id === technique.educationalLevel);
  const valueData = MORAL_VALUES.find((v) => v.id === technique.valueId);

  return (
    <div className="space-y-6" dir="rtl">
      {/* AI Disclaimer */}
      <AIDisclaimer />

      {/* Title Section */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-emerald-100 p-3 mt-1">
          <Sparkles className="h-7 w-7 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{technique.titleAr}</h2>
          <p className="text-sm text-gray-500 mt-1">{technique.descriptionAr}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {levelData && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {levelData.icon} {levelData.nameAr}
              </Badge>
            )}
            {valueData && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {valueData.icon} {valueData.nameAr}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {technique.durationMinutes} دقيقة
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-emerald-800">الهدف الأكاديمي</h3>
          </div>
          <p className="text-sm text-gray-700">{technique.academicObjectiveAr}</p>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-amber-600" />
            <h3 className="font-semibold text-amber-800">الهدف السلوكي</h3>
          </div>
          <p className="text-sm text-gray-700">{technique.behavioralObjectiveAr}</p>
        </div>
      </div>

      {/* Implementation Steps */}
      <SectionBlock icon={<ClipboardList className="h-5 w-5 text-emerald-600" />} title="خطوات التنفيذ">
        <ol className="space-y-3">
          {technique.implementationStepsAr.map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold">
                {idx + 1}
              </span>
              <span className="text-sm text-gray-700 leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </SectionBlock>

      {/* Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionBlock
          icon={<User className="h-5 w-5 text-emerald-600" />}
          title="دور المعلم"
        >
          <p className="text-sm text-gray-700">{technique.teacherRoleAr}</p>
        </SectionBlock>
        <SectionBlock
          icon={<Users className="h-5 w-5 text-emerald-600" />}
          title="دور الطالب"
        >
          <p className="text-sm text-gray-700">{technique.studentRoleAr}</p>
        </SectionBlock>
      </div>

      {/* Required Resources */}
      <SectionBlock icon={<Package className="h-5 w-5 text-emerald-600" />} title="الموارد المطلوبة">
        <div className="flex flex-wrap gap-2">
          {technique.requiredResourcesAr.map((res, idx) => (
            <Badge key={idx} variant="outline" className="border-emerald-200 text-emerald-700 py-1.5">
              {res}
            </Badge>
          ))}
        </div>
      </SectionBlock>

      {/* Reflection Questions */}
      <SectionBlock icon={<HelpCircle className="h-5 w-5 text-emerald-600" />} title="أسئلة التأمل">
        <ul className="space-y-2">
          {technique.reflectionQuestionsAr.map((q, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-700">
              <span className="text-emerald-500 mt-0.5">•</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Observation Indicators */}
      <SectionBlock icon={<Eye className="h-5 w-5 text-emerald-600" />} title="مؤشرات الملاحظة">
        <div className="flex flex-wrap gap-2">
          {technique.observationIndicatorsAr.map((ind, idx) => (
            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 py-1.5">
              {ind}
            </Badge>
          ))}
        </div>
      </SectionBlock>

      {/* Progress Levels */}
      <SectionBlock
        icon={<ArrowLeftRight className="h-5 w-5 text-emerald-600" />}
        title="مستويات التقدم"
      >
        <div className="space-y-2">
          {technique.progressLevelsAr.map((level, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  idx === 0
                    ? 'bg-emerald-300'
                    : idx === 1
                    ? 'bg-emerald-400'
                    : idx === 2
                    ? 'bg-emerald-500'
                    : 'bg-emerald-600'
                }`}
              />
              <span className="text-sm text-gray-700">{level}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Safeguards */}
      <SectionBlock icon={<Shield className="h-5 w-5 text-emerald-600" />} title="ضمانات السلامة الأخلاقية">
        <ul className="space-y-2">
          {technique.safeguardsAr.map((s, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-700">
              <Shield className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Daily Life Transfer */}
      <SectionBlock icon={<Globe className="h-5 w-5 text-emerald-600" />} title="نقل القيمة إلى الحياة اليومية">
        <p className="text-sm text-gray-700">{technique.dailyLifeTransferAr}</p>
      </SectionBlock>

      {/* Follow-up Recommendation */}
      <SectionBlock icon={<MessageSquare className="h-5 w-5 text-emerald-600" />} title="توصية المتابعة">
        <p className="text-sm text-gray-700">{technique.followUpRecommendationAr}</p>
      </SectionBlock>

      {/* Quranic Foundation */}
      {technique.quranicFoundation ? (
        <SectionBlock
          icon={<BookOpen className="h-5 w-5 text-emerald-600" />}
          title="الأساس القرآني"
        >
          <p className="text-sm text-gray-700">{technique.quranicFoundation}</p>
        </SectionBlock>
      ) : (
        <SectionBlock
          icon={<BookOpen className="h-5 w-5 text-amber-500" />}
          title="الأساس القرآني"
        >
          <p className="text-sm text-amber-600">{technique.foundationRelationshipAr}</p>
        </SectionBlock>
      )}

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <Button
          onClick={onSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <Save className="h-4 w-4" />
          حفظ
        </Button>
        <Button onClick={onEdit} variant="outline" className="gap-2">
          <ChevronRight className="h-4 w-4" />
          تعديل
        </Button>
        <Button onClick={onShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          مشاركة
        </Button>
      </div>
    </div>
  );
}

/* ─── Reusable Section Block ─── */
function SectionBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="mr-7">{children}</div>
    </div>
  );
}