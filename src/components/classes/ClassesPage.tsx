'use client';

import { useAppStore } from '@/store/app-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_CLASSES, EDUCATIONAL_LEVELS } from '@/data/qmi-data';
import { toast } from '@/hooks/use-toast';
import {
  Users,
  Plus,
  ArrowLeft,
  School,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

export function ClassesPage() {
  const { navigate, setSelectedClassId } = useAppStore();

  const handleViewStudents = (classId: string) => {
    setSelectedClassId(classId);
    navigate('students');
  };

  const handleAddClass = () => {
    toast({
      title: 'قريبًا',
      description: 'سيتم إضافة إمكانية إنشاء صفوف جديدة في تحديث لاحق',
    });
  };

  const getLevelName = (levelId: string) => {
    return EDUCATIONAL_LEVELS.find((l) => l.id === levelId)?.nameAr || levelId;
  };

  const getLevelIcon = (levelId: string) => {
    return EDUCATIONAL_LEVELS.find((l) => l.id === levelId)?.icon || '🏫';
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">الصفوف الدراسية</h2>
          <p className="text-sm text-muted-foreground">
            إدارة الصفوف المُسجّلة لديك
          </p>
        </div>
        <Button
          onClick={handleAddClass}
          className="gap-2"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          إضافة صف
        </Button>
      </div>

      {/* Classes Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {DEMO_CLASSES.map((cls) => (
          <motion.div key={cls.id} variants={item}>
            <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl">
                    {getLevelIcon(cls.educationalLevel)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{cls.nameAr}</h3>
                    <Badge variant="outline" className="text-xs">
                      {getLevelName(cls.educationalLevel)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span>{cls.studentCount} طالبًا</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => handleViewStudents(cls.id)}
                >
                  عرض الطلاب
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add Class Placeholder Card */}
        <motion.div variants={item}>
          <Card
            className="h-full border-dashed border-2 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            onClick={handleAddClass}
          >
            <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[140px] text-muted-foreground">
              <Plus className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium">إضافة صف جديد</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}