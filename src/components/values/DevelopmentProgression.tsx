'use client';

import { useState } from 'react';
import { MORAL_VALUES, EDUCATIONAL_LEVELS } from '@/data/qmi-data';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  TrendingUp,
  ChevronLeft,
  ArrowLeft,
  Eye,
} from 'lucide-react';

const LEVEL_COLORS: Record<string, string> = {
  primary: {
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    headerBg: 'bg-emerald-100',
    iconBg: 'bg-emerald-200',
    text: 'text-emerald-800',
    subtext: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  middle: {
    border: 'border-teal-300',
    bg: 'bg-teal-50',
    headerBg: 'bg-teal-100',
    iconBg: 'bg-teal-200',
    text: 'text-teal-800',
    subtext: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
  },
  secondary: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    headerBg: 'bg-amber-100',
    iconBg: 'bg-amber-200',
    text: 'text-amber-800',
    subtext: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
  },
  university: {
    border: 'border-rose-300',
    bg: 'bg-rose-50',
    headerBg: 'bg-rose-100',
    iconBg: 'bg-rose-200',
    text: 'text-rose-800',
    subtext: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-700',
  },
};

export default function DevelopmentProgression() {
  const [selectedValueId, setSelectedValueId] = useState('patience');

  const selectedValue = MORAL_VALUES.find((v) => v.id === selectedValueId);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full bg-emerald-100 p-2.5">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            تطور القيم عبر المراحل التعليمية
          </h1>
        </div>
        <p className="text-gray-500">
          كيف تتطور كل قيمة من الابتدائية إلى الجامعية
        </p>
      </div>

      <Separator />

      {/* Value Selector Tabs */}
      <div className="flex justify-center">
        <Tabs
          value={selectedValueId}
          onValueChange={setSelectedValueId}
          className="w-full max-w-3xl"
        >
          <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1 bg-gray-100 rounded-xl">
            {MORAL_VALUES.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id}
                className="flex-1 min-w-[100px] py-2.5 px-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-700 rounded-lg"
              >
                <span className="ml-1">{value.icon}</span>
                <span className="hidden sm:inline">{value.nameAr}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Selected Value Info */}
      {selectedValue && (
        <div className="text-center space-y-1">
          <div className="text-3xl">{selectedValue.icon}</div>
          <h2 className="text-xl font-bold text-gray-900">{selectedValue.nameAr}</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            {selectedValue.descriptionAr}
          </p>
        </div>
      )}

      {/* Progression Timeline */}
      {selectedValue && (
        <div className="space-y-0">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-4 items-start">
            {EDUCATIONAL_LEVELS.map((level, idx) => {
              const progression = selectedValue.progressions.find(
                (p) => p.level === level.id
              );
              const colors = LEVEL_COLORS[level.id];

              return (
                <div key={level.id} className="relative">
                  {/* Arrow between cards (not on last) */}
                  {idx < EDUCATIONAL_LEVELS.length - 1 && (
                    <div className="absolute top-12 -left-4 z-10">
                      <div className="flex items-center">
                        <div className="w-4 h-px bg-gray-300" />
                        <ChevronLeft className="h-4 w-4 text-gray-400 -mr-1" />
                      </div>
                    </div>
                  )}

                  <Card
                    className={`border ${colors.border} ${colors.bg} h-full overflow-hidden transition-all duration-300 hover:shadow-md`}
                  >
                    {/* Level Header */}
                    <CardHeader className={`pb-3 ${colors.headerBg}`}>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-lg p-1.5 ${colors.iconBg}`}>
                          <span className="text-xl">{level.icon}</span>
                        </div>
                        <div>
                          <CardTitle className={`text-sm font-bold ${colors.text}`}>
                            {level.nameAr}
                          </CardTitle>
                          <p className="text-xs text-gray-500">{level.nameEn}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-4">
                      {/* Focus */}
                      <div>
                        <h4 className={`text-xs font-bold mb-1.5 ${colors.subtext} uppercase tracking-wide`}>
                          التركيز
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {progression?.focusAr || '—'}
                        </p>
                      </div>

                      <Separator />

                      {/* Formats */}
                      <div>
                        <h4 className={`text-xs font-bold mb-2 ${colors.subtext} uppercase tracking-wide`}>
                          الصيغ المناسبة
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {progression?.formatsAr.map((fmt, fIdx) => (
                            <Badge
                              key={fIdx}
                              variant="secondary"
                              className={`${colors.badge} text-xs`}
                            >
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Observable Behavior */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Eye className={`h-3.5 w-3.5 ${colors.subtext}`} />
                          <h4 className={`text-xs font-bold ${colors.subtext} uppercase tracking-wide`}>
                            سلوك ملاحظ
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {progression?.observableBehaviorAr || '—'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="md:hidden space-y-0">
            {EDUCATIONAL_LEVELS.map((level, idx) => {
              const progression = selectedValue.progressions.find(
                (p) => p.level === level.id
              );
              const colors = LEVEL_COLORS[level.id];

              return (
                <div key={level.id}>
                  {/* Connector line + arrow */}
                  <div className="flex items-center justify-center py-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-px h-4 bg-gray-300" />
                      <ChevronLeft className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <Card
                    className={`border ${colors.border} ${colors.bg} overflow-hidden transition-all duration-300`}
                  >
                    {/* Level Header */}
                    <CardHeader className={`pb-3 ${colors.headerBg}`}>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-lg p-1.5 ${colors.iconBg}`}>
                          <span className="text-xl">{level.icon}</span>
                        </div>
                        <div>
                          <CardTitle className={`text-sm font-bold ${colors.text}`}>
                            {level.nameAr}
                          </CardTitle>
                          <p className="text-xs text-gray-500">
                            {level.nameEn} — {level.gradeRange}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-4">
                      {/* Focus */}
                      <div>
                        <h4 className={`text-xs font-bold mb-1.5 ${colors.subtext} uppercase tracking-wide`}>
                          التركيز
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {progression?.focusAr || '—'}
                        </p>
                      </div>

                      <Separator />

                      {/* Formats */}
                      <div>
                        <h4 className={`text-xs font-bold mb-2 ${colors.subtext} uppercase tracking-wide`}>
                          الصيغ المناسبة
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {progression?.formatsAr.map((fmt, fIdx) => (
                            <Badge
                              key={fIdx}
                              variant="secondary"
                              className={`${colors.badge} text-xs`}
                            >
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Observable Behavior */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Eye className={`h-3.5 w-3.5 ${colors.subtext}`} />
                          <h4 className={`text-xs font-bold ${colors.subtext} uppercase tracking-wide`}>
                            سلوك ملاحظ
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {progression?.observableBehaviorAr || '—'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary Footer */}
      {selectedValue && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4 flex items-start gap-3" dir="rtl">
            <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-800 text-sm mb-1">
                مسار التطور: {selectedValue.nameAr}
              </h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                يبدأ تعزيز قيمة &quot;{selectedValue.nameAr}&quot; من المرحلة الابتدائية بمهارات أساسية
                بسيطة، ويتدرج نحو تطبيقات معقدة في المرحلة الجامعية تشمل البحث والممارسة المهنية.
                كل مرحلة تبني على سابقتها وتُعمّق الفهم والممارسة.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}