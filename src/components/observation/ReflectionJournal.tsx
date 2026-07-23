'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import {
  BookHeart,
  Save,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const REFLECTION_PROMPTS = [
  'ما الذي تعلمته اليوم عن نفسك؟',
  'كيف شعرت عندما واجهت التحدي في النشاط؟',
  'ما السلوك الذي ترغب في تحسينه في الأيام القادمة؟',
  'صف موقفًا طبّقت فيه قيمة تعلمتها في الصف.',
];

export function ReflectionJournal() {
  const { selectedStudentId } = useAppStore();

  const [selectedPrompt, setSelectedPrompt] = useState(REFLECTION_PROMPTS[0]);
  const [response, setResponse] = useState('');
  const [personalGoal, setPersonalGoal] = useState('');

  const handleSave = () => {
    if (!response.trim()) {
      toast({
        title: 'يرجى كتابة ردّك',
        description: 'حقل الاستجابة مطلوب لحفظ التأمل',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'تم حفظ التأمل بنجاح',
      description: 'تم حفظ التأمل في سجل الطالب',
    });

    setResponse('');
    setPersonalGoal('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Privacy Notice */}
      <Alert className="border-emerald-300 bg-emerald-50">
        <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
        <AlertDescription className="text-sm text-emerald-800 leading-relaxed">
          هذا التأمل خاص ولن يراه إلا المعلم المعتمد
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-primary" />
            سجل التأمل والمراجعة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prompt selector */}
          <div className="space-y-2">
            <Label>موجّه التأمل</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REFLECTION_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`text-right text-sm px-3 py-2.5 rounded-lg border transition-colors leading-relaxed ${
                    selectedPrompt === prompt
                      ? 'border-primary bg-primary/5 text-primary font-medium'
                      : 'border-border hover:border-primary/30 hover:bg-accent text-foreground/80'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Response */}
          <div className="space-y-2">
            <Label>الاستجابة <span className="text-destructive">*</span></Label>
            <Textarea
              placeholder="اكتب تأمّلك هنا..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          {/* Personal goal */}
          <div className="space-y-2">
            <Label>هدف شخصي (اختياري)</Label>
            <Textarea
              placeholder="ما الهدف الذي تودّ تحقيقه بناءً على هذا التأمل؟"
              value={personalGoal}
              onChange={(e) => setPersonalGoal(e.target.value)}
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
              حفظ التأمل
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}