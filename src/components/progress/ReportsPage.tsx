'use client';

import { useState } from 'react';
import { DEMO_CLASSES, DEMO_STUDENTS, MORAL_VALUES, PROGRESS_LEVELS } from '@/data/qmi-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  FileText,
  Download,
  Users,
  Heart,
  UserCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Simulated data for reports
const classReportData = DEMO_CLASSES.map((cls) => ({
  classId: cls.id,
  className: cls.nameAr,
  totalStudents: cls.studentCount,
  totalActivities: Math.floor(Math.random() * 6) + 2,
  totalObservations: Math.floor(Math.random() * 20) + 5,
  valuesCovered: Math.floor(Math.random() * 4) + 3,
}));

const valueReportData = MORAL_VALUES.slice(0, 6).map((v) => ({
  valueId: v.id,
  valueName: v.nameAr,
  valueIcon: v.icon,
  totalActivities: Math.floor(Math.random() * 8) + 1,
  totalObservations: Math.floor(Math.random() * 25) + 3,
  classesActive: Math.floor(Math.random() * 3) + 1,
}));

const studentReportData = DEMO_STUDENTS.map((s) => ({
  studentId: s.id,
  identifier: s.identifier,
  classId: s.classId,
  className: DEMO_CLASSES.find((c) => c.id === s.classId)?.nameAr || '',
  totalObservations: Math.floor(Math.random() * 10) + 1,
  valuesProgressed: Math.floor(Math.random() * 4) + 1,
  reflectionsCount: Math.floor(Math.random() * 5),
}));

function ExportButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 text-xs"
      onClick={() =>
        toast({
          title: 'قريبًا',
          description: 'سيتم إضافة هذه الميزة قريبًا',
        })
      }
    >
      <Download className="w-3.5 h-3.5" />
      تصدير
    </Button>
  );
}

export function ReportsPage() {
  const [classFilter, setClassFilter] = useState<string>('all');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold">التقارير</h2>
            <p className="text-sm text-muted-foreground">
              تقارير مُلخّصة عن الأنشطة والملاحظات والتقدم
            </p>
          </div>
        </div>
        <ExportButton />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="class" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="class" className="gap-1.5 text-xs sm:text-sm">
            <Users className="w-4 h-4" />
            تقرير الصف
          </TabsTrigger>
          <TabsTrigger value="value" className="gap-1.5 text-xs sm:text-sm">
            <Heart className="w-4 h-4" />
            تقرير القيمة
          </TabsTrigger>
          <TabsTrigger value="student" className="gap-1.5 text-xs sm:text-sm">
            <UserCircle className="w-4 h-4" />
            تقرير الطالب
          </TabsTrigger>
        </TabsList>

        {/* Class Report Tab */}
        <TabsContent value="class">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">ملخص الصفوف</h3>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-48">
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

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الصف</TableHead>
                      <TableHead className="text-center">عدد الطلاب</TableHead>
                      <TableHead className="text-center">الأنشطة</TableHead>
                      <TableHead className="text-center">الملاحظات</TableHead>
                      <TableHead className="text-center">القيم المُغطّاة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classReportData
                      .filter((r) => classFilter === 'all' || r.classId === classFilter)
                      .map((row) => (
                        <TableRow key={row.classId}>
                          <TableCell className="font-medium text-sm">{row.className}</TableCell>
                          <TableCell className="text-center text-sm">{row.totalStudents}</TableCell>
                          <TableCell className="text-center text-sm">{row.totalActivities}</TableCell>
                          <TableCell className="text-center text-sm">{row.totalObservations}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="text-xs">
                              {row.valuesCovered}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end mt-4">
                <ExportButton />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Value Report Tab */}
        <TabsContent value="value">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-sm font-semibold mb-4">ملخص القيم الأخلاقية</h3>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">القيمة</TableHead>
                      <TableHead className="text-center">الأنشطة</TableHead>
                      <TableHead className="text-center">الملاحظات</TableHead>
                      <TableHead className="text-center">الصفوف النشطة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {valueReportData.map((row) => (
                      <TableRow key={row.valueId}>
                        <TableCell className="font-medium text-sm">
                          <span className="flex items-center gap-1.5">
                            <span>{row.valueIcon}</span>
                            {row.valueName}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-sm">{row.totalActivities}</TableCell>
                        <TableCell className="text-center text-sm">{row.totalObservations}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {row.classesActive}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end mt-4">
                <ExportButton />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Report Tab */}
        <TabsContent value="student">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">ملخص الطلاب</h3>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-48">
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

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">المعرّف</TableHead>
                      <TableHead className="text-right">الصف</TableHead>
                      <TableHead className="text-center">الملاحظات</TableHead>
                      <TableHead className="text-center">القيم</TableHead>
                      <TableHead className="text-center">التأملات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentReportData
                      .filter((r) => classFilter === 'all' || r.classId === classFilter)
                      .map((row) => (
                        <TableRow key={row.studentId}>
                          <TableCell className="font-medium text-sm">{row.identifier}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{row.className}</TableCell>
                          <TableCell className="text-center text-sm">{row.totalObservations}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="text-xs">
                              {row.valuesProgressed}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-sm">{row.reflectionsCount}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end mt-4">
                <ExportButton />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}