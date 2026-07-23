'use client';

import { useState } from 'react';
import { DEMO_CLASSES, DEMO_STUDENTS, MORAL_VALUES, PROGRESS_LEVELS } from '@/data/qmi-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

// Simulated progress data — no rankings, just individual progress levels
type SimulatedProgress = {
  studentId: string;
  identifier: string;
  valueId: string;
  levelIndex: number; // index into PROGRESS_LEVELS
  observationsCount: number;
};

const SIMULATED_PROGRESS: SimulatedProgress[] = [
  { studentId: 'demo-student-1', identifier: 'طالب/001', valueId: 'patience', levelIndex: 3, observationsCount: 5 },
  { studentId: 'demo-student-1', identifier: 'طالب/001', valueId: 'honesty', levelIndex: 2, observationsCount: 3 },
  { studentId: 'demo-student-2', identifier: 'طالب/002', valueId: 'patience', levelIndex: 1, observationsCount: 2 },
  { studentId: 'demo-student-2', identifier: 'طالب/002', valueId: 'justice', levelIndex: 4, observationsCount: 6 },
  { studentId: 'demo-student-3', identifier: 'طالب/003', valueId: 'honesty', levelIndex: 3, observationsCount: 4 },
  { studentId: 'demo-student-3', identifier: 'طالب/003', valueId: 'empathy', levelIndex: 2, observationsCount: 3 },
  { studentId: 'demo-student-4', identifier: 'طالب/004', valueId: 'justice', levelIndex: 2, observationsCount: 2 },
  { studentId: 'demo-student-4', identifier: 'طالب/004', valueId: 'humility', levelIndex: 1, observationsCount: 1 },
  { studentId: 'demo-student-5', identifier: 'طالب/005', valueId: 'empathy', levelIndex: 3, observationsCount: 4 },
  { studentId: 'demo-student-5', identifier: 'طالب/005', valueId: 'gratitude', levelIndex: 4, observationsCount: 5 },
  { studentId: 'demo-student-6', identifier: 'طالب/006', valueId: 'humility', levelIndex: 2, observationsCount: 2 },
  { studentId: 'demo-student-6', identifier: 'طالب/006', valueId: 'gratitude', levelIndex: 3, observationsCount: 3 },
];

const getLevelColor = (index: number): string => {
  const colors = [
    'bg-amber-400',
    'bg-orange-400',
    'bg-yellow-500',
    'bg-emerald-400',
    'bg-teal-500',
  ];
  return colors[index] || 'bg-emerald-400';
};

const getProgressPercent = (index: number): number => {
  // Map 0-4 levels to 10-100% range (no zero — we always have some base)
  return Math.round(((index + 1) / PROGRESS_LEVELS.length) * 100);
};

export function ProgressDashboard() {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [selectedValueFilter, setSelectedValueFilter] = useState<string>('all');

  // Get student IDs for selected class
  const classStudentIds = selectedClassFilter === 'all'
    ? null
    : DEMO_STUDENTS.filter((s) => s.classId === selectedClassFilter).map((s) => s.id);

  // Filter progress data
  const filteredProgress = SIMULATED_PROGRESS.filter((p) => {
    if (classStudentIds && !classStudentIds.includes(p.studentId)) return false;
    if (selectedValueFilter !== 'all' && p.valueId !== selectedValueFilter) return false;
    return true;
  });

  // Group by student
  const groupedByStudent = filteredProgress.reduce<Record<string, SimulatedProgress[]>>((acc, p) => {
    if (!acc[p.studentId]) acc[p.studentId] = [];
    acc[p.studentId].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold">تقدم الطلاب</h2>
          <p className="text-sm text-muted-foreground">
            متابعة التطور الفردي لكل طالب
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">تصفية</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">الصف</label>
              <Select value={selectedClassFilter} onValueChange={setSelectedClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الصفوف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الصفوف</SelectItem>
                  {DEMO_CLASSES.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">القيمة</label>
              <Select value={selectedValueFilter} onValueChange={setSelectedValueFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع القيم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع القيم</SelectItem>
                  {MORAL_VALUES.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.icon} {v.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Progress Cards */}
      {Object.keys(groupedByStudent).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">لا توجد بيانات تقدم مطابقة للتصفية المحددة</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {Object.entries(groupedByStudent).map(([studentId, entries]) => (
            <motion.div
              key={studentId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>{entries[0].identifier}</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      {entries.length} قيم
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {entries.map((entry) => {
                    const value = MORAL_VALUES.find((v) => v.id === entry.valueId);
                    const level = PROGRESS_LEVELS[entry.levelIndex];
                    const percent = getProgressPercent(entry.levelIndex);
                    return (
                      <div key={entry.valueId} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <span>{value?.icon}</span>
                            <span className="font-medium">{value?.nameAr}</span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {level?.nameAr}
                          </span>
                        </div>
                        <Progress value={percent} className="h-2" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {level?.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {entry.observationsCount} ملاحظة مُسجّلة
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}