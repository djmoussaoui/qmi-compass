'use client';

import { useAppStore } from '@/store/app-store';
import { MORAL_VALUES, EDUCATIONAL_LEVELS } from '@/data/qmi-data';
import { TECHNIQUES } from '@/data/techniques';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  ChevronLeft,
  Map,
  Sparkles,
  Search,
} from 'lucide-react';

const VALUE_BG_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-200',
  amber: 'bg-amber-50 border-amber-200',
  teal: 'bg-teal-50 border-teal-200',
  rose: 'bg-rose-50 border-rose-200',
  violet: 'bg-violet-50 border-violet-200',
  cyan: 'bg-cyan-50 border-cyan-200',
  orange: 'bg-orange-50 border-orange-200',
  slate: 'bg-slate-50 border-slate-200',
};

const VALUE_BADGE_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  teal: 'bg-teal-100 text-teal-700',
  rose: 'bg-rose-100 text-rose-700',
  violet: 'bg-violet-100 text-violet-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  orange: 'bg-orange-100 text-orange-700',
  slate: 'bg-slate-100 text-slate-700',
};

const VALUE_ICON_BG: Record<string, string> = {
  emerald: 'bg-emerald-100',
  amber: 'bg-amber-100',
  teal: 'bg-teal-100',
  rose: 'bg-rose-100',
  violet: 'bg-violet-100',
  cyan: 'bg-cyan-100',
  orange: 'bg-orange-100',
  slate: 'bg-slate-100',
};

export default function ValuesMap() {
  const { navigate } = useAppStore();

  const handleNavigateToTechniques = (valueId: string) => {
    navigate('techniques-library', { value: valueId });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full bg-emerald-100 p-2.5">
            <Map className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            خريطة التحويل الأخلاقي
          </h1>
        </div>
        <p className="text-gray-500">
          من السلوك المستهدف إلى القيمة إلى التقنية المناسبة
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-rose-100 px-3 py-1 text-rose-700 text-xs font-medium">
            سلوك مستهدف
          </div>
          <ChevronLeft className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-emerald-100 px-3 py-1 text-emerald-700 text-xs font-medium">
            قيمة أخلاقية
          </div>
          <ChevronLeft className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-gray-100 px-3 py-1 text-gray-700 text-xs font-medium">
            تقنيات مقترحة
          </div>
        </div>
      </div>

      <Separator />

      {/* Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MORAL_VALUES.map((value) => {
          const techniques = TECHNIQUES.filter((t) => t.valueId === value.id);
          const bgClass = VALUE_BG_COLORS[value.color] || 'bg-gray-50 border-gray-200';
          const badgeClass = VALUE_BADGE_COLORS[value.color] || 'bg-gray-100 text-gray-700';
          const iconBg = VALUE_ICON_BG[value.color] || 'bg-gray-100';

          return (
            <Card key={value.id} className={`border ${bgClass} overflow-hidden`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2.5 text-2xl ${iconBg}`}>
                      {value.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">
                        {value.nameAr}
                      </CardTitle>
                      <p className="text-xs text-gray-500 mt-0.5">{value.nameEn}</p>
                    </div>
                  </div>
                  {techniques.length > 0 && (
                    <Badge variant="secondary" className={badgeClass}>
                      {techniques.length} تقنية
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  {value.descriptionAr}
                </p>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {/* Transformation Flow: Behavior → Value → Techniques */}
                {value.behaviors.map((behavior) => (
                  <div key={behavior.id} className="space-y-3">
                    {/* Behavior Node */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-rose-400 border-2 border-rose-200" />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-lg bg-rose-50 border border-rose-100 p-3">
                          <h4 className="font-medium text-rose-800 text-sm">
                            {behavior.nameAr}
                          </h4>
                          <p className="text-xs text-rose-600 mt-1">
                            {behavior.descriptionAr}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow: Behavior → Value */}
                    <div className="flex items-center gap-2 mr-1.5">
                      <div className="w-px h-4 bg-gray-300" />
                      <ChevronLeft className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}

                {/* Value Node (center) */}
                <div className="flex items-center gap-3 mr-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-200 flex-shrink-0" />
                  <div className="flex-1 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                    <h4 className="font-medium text-emerald-800 text-sm">
                      القيمة: {value.nameAr}
                    </h4>
                  </div>
                </div>

                {/* Arrow: Value → Techniques */}
                <div className="flex items-center gap-2 mr-1.5">
                  <div className="w-px h-4 bg-gray-300" />
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </div>

                {/* Techniques Node */}
                <div className="mr-1.5">
                  <div className="rounded-lg bg-white border border-gray-200 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <h4 className="font-medium text-gray-800 text-sm">
                        تقنيات مقترحة
                      </h4>
                    </div>
                    {techniques.length > 0 ? (
                      <div className="space-y-1.5">
                        {techniques.slice(0, 3).map((tech) => {
                          const levelData = EDUCATIONAL_LEVELS.find(
                            (l) => l.id === tech.educationalLevel
                          );
                          return (
                            <button
                              key={tech.id}
                              onClick={() => {
                                navigate('technique-details', { id: tech.id });
                              }}
                              className="w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors text-right group"
                            >
                              <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors">
                                {tech.titleAr}
                              </span>
                              {levelData && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs flex-shrink-0 bg-gray-100 text-gray-600"
                                >
                                  {levelData.icon} {levelData.nameAr}
                                </Badge>
                              )}
                            </button>
                          );
                        })}
                        {techniques.length > 3 && (
                          <p className="text-xs text-gray-400 text-center pt-1">
                            و{techniques.length - 3} تقنيات أخرى...
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-2">
                        لا توجد تقنيات متاحة حاليًا
                      </p>
                    )}
                  </div>
                </div>

                {/* View All Techniques Button */}
                {techniques.length > 0 && (
                  <div className="pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigateToTechniques(value.id)}
                      className="w-full gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <Search className="h-4 w-4" />
                      عرض جميع تقنيات &quot;{value.nameAr}&quot;
                      <ArrowLeft className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}