'use client';

import { useAppStore } from '@/store/app-store';
import { DEMO_STUDENTS, DEMO_CLASSES } from '@/data/qmi-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  BookHeart,
  Users,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function StudentsPage() {
  const { navigate, selectedClassId, setSelectedStudentId, goBack } = useAppStore();

  const currentClass = DEMO_CLASSES.find((c) => c.id === selectedClassId);
  const students = DEMO_STUDENTS.filter((s) => s.classId === selectedClassId);

  const handleObservation = (studentId: string) => {
    setSelectedStudentId(studentId);
    navigate('observation-card');
  };

  const handleReflection = (studentId: string) => {
    setSelectedStudentId(studentId);
    navigate('reflection-journal');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold">طلاب {currentClass?.nameAr || 'الصف'}</h2>
          <p className="text-sm text-muted-foreground">
            {students.length} طالبًا مُسجّلًا
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">لا يوجد طلاب مُسجّلون في هذا الصف بعد</p>
          <Button
            variant="outline"
            className="mt-4"
            size="sm"
            onClick={() => navigate('classes')}
          >
            العودة إلى الصفوف
          </Button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {/* Table header - desktop */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_180px] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>المعرّف</span>
            <span className="text-left">الإجراءات</span>
          </div>

          {students.map((student) => (
            <motion.div
              key={student.id}
              variants={item}
              className="flex flex-col sm:grid sm:grid-cols-[1fr_180px] gap-3 sm:gap-4 items-start sm:items-center bg-card border border-border/50 rounded-lg px-4 py-3 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{student.identifier}</p>
                  <Badge variant="outline" className="text-xs mt-0.5">
                    {currentClass?.nameAr}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:justify-self-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => handleObservation(student.id)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  ملاحظة
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => handleReflection(student.id)}
                >
                  <BookHeart className="w-3.5 h-3.5" />
                  تأمل
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}