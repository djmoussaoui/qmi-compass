'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { DEMO_STUDENTS } from '@/data/qmi-data';
import { PROGRESS_LEVELS } from '@/data/qmi-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  AlertTriangle,
  Save,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

export function ObservationCard() {
  const { selectedStudentId, goBack } = useAppStore();
  const student = DEMO_STUDENTS.find((s) => s.id === selectedStudentId);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [activityDescription, setActivityDescription] = useState('');
  const [behaviorNote, setBehaviorNote] = useState('');
  const [progressLevel, setProgressLevel] = useState('');
  const [indicatorNotes, setIndicatorNotes] = useState('');

  const handleSave = () => {
    if (!behaviorNote.trim()) {
      toast({
        title: 'يرجى إدخال ملاحظة السلوك',
        description: 'الحقل مطلوب لتسجيل الملاحظة',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'تم حفظ الملاحظة بنجاح',
      description: `تم تسجيل الملاحظة للطالب ${student?.identifier || ''}`,
    });

    setActivityDescription('');
    setBehaviorNote('');
    setProgressLevel('');
    setIndicatorNotes('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Warning */}
      <Alert className="border-amber-300 bg-amber-50">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <AlertDescription className="text-sm text-amber-800 leading-relaxed">
          يرجى وصف السلوك المحدد الذي تمت ملاحظته في هذا الموقف، بدلاً من إصدار حكم عام على شخصية الطالب.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            بطاقة الملاحظة السلوكية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Student identifier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>معرّف الطالب</Label>
              <Input
                value={student?.identifier || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>التاريخ</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Activity description */}
          <div className="space-y-2">
            <Label>وصف النشاط / الموقف</Label>
            <Textarea
              placeholder="مثال: أثناء حل مسألة رياضية بمستوى متوسط الصعوبة..."
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Behavior note */}
          <div className="space-y-2">
            <Label>ملاحظة السلوك <span className="text-destructive">*</span></Label>
            <Textarea
              placeholder="صِف السلوك المحدد الذي لاحظته بدقة (ماذا فعل الطالب بالضبط؟ متى؟ كيف؟)..."
              value={behaviorNote}
              onChange={(e) => setBehaviorNote(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Progress level */}
          <div className="space-y-2">
            <Label>مستوى التقدم</Label>
            <Select value={progressLevel} onValueChange={setProgressLevel}>
              <SelectTrigger>
                <SelectValue placeholder="اختر مستوى التقدم" />
              </SelectTrigger>
              <SelectContent>
                {PROGRESS_LEVELS.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    {level.nameAr} — {level.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Indicator notes */}
          <div className="space-y-2">
            <Label>ملاحظات إضافية على المؤشرات</Label>
            <Textarea
              placeholder="أي ملاحظات إضافية حول المؤشرات السلوكية المرتبطة..."
              value={indicatorNotes}
              onChange={(e) => setIndicatorNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Save */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              حفظ الملاحظة
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}