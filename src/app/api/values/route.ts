import { NextResponse } from 'next/server';
import { MORAL_VALUES, EDUCATIONAL_LEVELS, SUBJECTS, ACTIVITY_TYPES, GROUP_SIZES, LOCATIONS, REVIEW_STATUSES, PROGRESS_LEVELS, INTERVENTION_TYPES, DEVELOPMENT_CYCLE, SAFEGUARDS } from '@/data/qmi-data';

export async function GET() {
  return NextResponse.json({
    values: MORAL_VALUES,
    educationalLevels: EDUCATIONAL_LEVELS,
    subjects: SUBJECTS,
    activityTypes: ACTIVITY_TYPES,
    groupSizes: GROUP_SIZES,
    locations: LOCATIONS,
    reviewStatuses: REVIEW_STATUSES,
    progressLevels: PROGRESS_LEVELS,
    interventionTypes: INTERVENTION_TYPES,
    developmentCycle: DEVELOPMENT_CYCLE,
    safeguards: SAFEGUARDS,
  });
}