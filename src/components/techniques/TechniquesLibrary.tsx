'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/app-store';
import { TECHNIQUES } from '@/data/techniques';
import {
  MORAL_VALUES,
  EDUCATIONAL_LEVELS,
  SUBJECTS,
  ACTIVITY_TYPES,
  GROUP_SIZES,
  REVIEW_STATUSES,
} from '@/data/qmi-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Search, Clock, Eye, Wrench, BookOpen } from 'lucide-react';

export function TechniquesLibrary() {
  const { navigate, setSelectedTechniqueId } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [valueFilter, setValueFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTechniques = useMemo(() => {
    return TECHNIQUES.filter((tech) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          tech.titleAr.toLowerCase().includes(q) ||
          tech.descriptionAr.toLowerCase().includes(q) ||
          tech.valueNameAr.toLowerCase().includes(q) ||
          tech.behaviorNameAr.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Value filter
      if (valueFilter !== 'all' && tech.valueId !== valueFilter) return false;

      // Level filter
      if (levelFilter !== 'all' && tech.educationalLevel !== levelFilter)
        return false;

      // Subject filter
      if (subjectFilter !== 'all' && !tech.subjects.includes(subjectFilter))
        return false;

      // Activity type filter
      if (activityFilter !== 'all' && tech.activityType !== activityFilter)
        return false;

      // Review status filter
      if (statusFilter !== 'all' && tech.reviewStatus !== statusFilter)
        return false;

      return true;
    });
  }, [searchQuery, valueFilter, levelFilter, subjectFilter, activityFilter, statusFilter]);

  const getLevelName = (id: string) =>
    EDUCATIONAL_LEVELS.find((l) => l.id === id)?.nameAr || id;
  const getStatusInfo = (id: string) =>
    REVIEW_STATUSES.find((s) => s.id === id);

  const hasActiveFilters =
    valueFilter !== 'all' ||
    levelFilter !== 'all' ||
    subjectFilter !== 'all' ||
    activityFilter !== 'all' ||
    statusFilter !== 'all';

  const clearFilters = () => {
    setValueFilter('all');
    setLevelFilter('all');
    setSubjectFilter('all');
    setActivityFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
          <BookOpen className="h-7 w-7" />
          مكتبة التقنيات التربوية
        </h1>
        <p className="text-muted-foreground mt-1">
          تصفّح واستكشف التقنيات التربوية المتكاملة مع القيم القرآنية
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث في العنوان، الوصف، القيمة، أو السلوك المستهدف..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* القيمة */}
        <Select value={valueFilter} onValueChange={setValueFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="القيمة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع القيم</SelectItem>
            {MORAL_VALUES.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                {v.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* المرحلة التعليمية */}
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="المرحلة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المراحل</SelectItem>
            {EDUCATIONAL_LEVELS.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* المادة */}
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="المادة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المواد</SelectItem>
            {SUBJECTS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* نوع النشاط */}
        <Select value={activityFilter} onValueChange={setActivityFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="نوع النشاط" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            {ACTIVITY_TYPES.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* حالة المراجعة */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            {REVIEW_STATUSES.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count + Clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض{' '}
          <span className="font-semibold text-foreground">
            {filteredTechniques.length}
          </span>{' '}
          تقنية من{' '}
          <span className="font-semibold text-foreground">
            {TECHNIQUES.length}
          </span>
        </p>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            مسح الفلاتر
          </Button>
        )}
      </div>

      {/* Techniques Grid */}
      {filteredTechniques.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechniques.map((tech) => {
            const statusInfo = getStatusInfo(tech.reviewStatus);
            return (
              <Card
                key={tech.id}
                className="group hover:shadow-md transition-shadow py-0 gap-0"
              >
                <CardContent className="p-4 flex flex-col gap-3">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {tech.titleAr}
                  </h3>

                  {/* Badges Row */}
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    >
                      {tech.valueNameAr}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getLevelName(tech.educationalLevel)}
                    </Badge>
                    {statusInfo && (
                      <Badge
                        variant="secondary"
                        className={`${statusInfo.color} hover:opacity-90`}
                      >
                        {statusInfo.nameAr}
                      </Badge>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{tech.durationMinutes} دقيقة</span>
                  </div>

                  {/* Description (truncated) */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {tech.descriptionAr.length > 80
                      ? tech.descriptionAr.slice(0, 80) + '...'
                      : tech.descriptionAr}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                      onClick={() => {
                        setSelectedTechniqueId(tech.id);
                        navigate('technique-details', { id: tech.id });
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      عرض التفاصيل
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => {
                        setSelectedTechniqueId(tech.id);
                        navigate('activity-designer');
                      }}
                    >
                      <Wrench className="h-3.5 w-3.5" />
                      استخدم التقنية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-emerald-50 p-4 mb-4">
            <Search className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            لا توجد نتائج
          </h3>
          <p className="text-muted-foreground max-w-sm">
            لا توجد تقنيات تطابق البحث أو الفلاتر المحددة.
            جرّب تعديل معايير البحث أو مسح الفلاتر.
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              className="mt-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
              onClick={clearFilters}
            >
              مسح جميع الفلاتر
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
