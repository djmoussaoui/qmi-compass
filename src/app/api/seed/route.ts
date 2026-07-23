import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MORAL_VALUES } from '@/data/qmi-data';
import { TECHNIQUES } from '@/data/techniques';
import { DEMO_TEACHER, DEMO_CLASSES, DEMO_STUDENTS } from '@/data/qmi-data';

export async function POST() {
  try {
    // Seed institution
    const institution = await db.institution.upsert({
      where: { id: 'demo-institution-1' },
      update: {},
      create: {
        id: 'demo-institution-1',
        nameAr: 'مدرسة النور النموذجية',
        nameEn: 'Al-Noor Model School',
        type: 'school',
      },
    });

    // Seed teacher
    await db.user.upsert({
      where: { email: DEMO_TEACHER.email },
      update: {},
      create: {
        id: DEMO_TEACHER.id,
        email: DEMO_TEACHER.email,
        nameAr: DEMO_TEACHER.nameAr,
        nameEn: DEMO_TEACHER.nameEn,
        role: DEMO_TEACHER.role,
        institutionId: DEMO_TEACHER.institutionId,
      },
    });

    // Seed values and behaviors
    for (const value of MORAL_VALUES) {
      await db.moralValue.upsert({
        where: { id: value.id },
        update: {},
        create: {
          id: value.id,
          nameAr: value.nameAr,
          nameEn: value.nameEn,
          descriptionAr: value.descriptionAr,
          descriptionEn: value.descriptionEn,
          icon: value.icon,
          color: value.color,
          sortOrder: MORAL_VALUES.indexOf(value),
          behaviors: {
            create: value.behaviors.map(b => ({
              id: b.id,
              nameAr: b.nameAr,
              nameEn: b.nameEn,
              descriptionAr: b.descriptionAr,
              descriptionEn: b.descriptionEn,
            })),
          },
          progressions: {
            create: value.progressions.map(p => ({
              educationalLevel: p.level,
              focusAr: p.focusAr,
              focusEn: p.focusEn,
              formatsAr: JSON.stringify(p.formatsAr),
              observableBehaviorAr: p.observableBehaviorAr,
              observableBehaviorEn: p.observableBehaviorEn,
            })),
          },
        },
      });
    }

    // Seed classes
    for (const cls of DEMO_CLASSES) {
      await db.classRoom.upsert({
        where: { id: cls.id },
        update: {},
        create: {
          id: cls.id,
          nameAr: cls.nameAr,
          nameEn: cls.nameEn,
          educationalLevel: cls.educationalLevel,
          institutionId: 'demo-institution-1',
        },
      });
    }

    // Seed students
    for (const student of DEMO_STUDENTS) {
      await db.student.upsert({
        where: { id: student.id },
        update: {},
        create: {
          id: student.id,
          identifier: student.identifier,
          classId: student.classId,
        },
      });
    }

    // Seed techniques
    for (const tech of TECHNIQUES) {
      await db.technique.upsert({
        where: { id: tech.id },
        update: {},
        create: {
          id: tech.id,
          titleAr: tech.titleAr,
          titleEn: tech.titleEn,
          descriptionAr: tech.descriptionAr,
          descriptionEn: tech.descriptionEn,
          educationalLevel: tech.educationalLevel,
          subjects: JSON.stringify(tech.subjects),
          topic: tech.topic,
          activityType: tech.activityType,
          durationMinutes: tech.durationMinutes,
          groupSize: tech.groupSize,
          location: tech.location,
          difficulty: tech.difficulty,
          academicObjectiveAr: tech.academicObjectiveAr,
          behavioralObjectiveAr: tech.behavioralObjectiveAr,
          implementationStepsAr: JSON.stringify(tech.implementationStepsAr),
          teacherRoleAr: tech.teacherRoleAr,
          studentRoleAr: tech.studentRoleAr,
          requiredResourcesAr: JSON.stringify(tech.requiredResourcesAr),
          reflectionQuestionsAr: JSON.stringify(tech.reflectionQuestionsAr),
          observationIndicatorsAr: JSON.stringify(tech.observationIndicatorsAr),
          progressLevelsAr: JSON.stringify(tech.progressLevelsAr),
          differentiationAr: JSON.stringify(tech.differentiationAr),
          educationalRisksAr: JSON.stringify(tech.educationalRisksAr),
          safeguardsAr: JSON.stringify(tech.safeguardsAr),
          dailyLifeTransferAr: tech.dailyLifeTransferAr,
          followUpRecommendationAr: tech.followUpRecommendationAr,
          reviewStatus: tech.reviewStatus,
          isAIGenerated: true,
          valueId: tech.valueId,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      stats: {
        values: MORAL_VALUES.length,
        techniques: TECHNIQUES.length,
        classes: DEMO_CLASSES.length,
        students: DEMO_STUDENTS.length,
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}