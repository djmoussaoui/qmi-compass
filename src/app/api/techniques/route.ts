import { NextResponse } from 'next/server';
import { TECHNIQUES } from '@/data/techniques';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const value = searchParams.get('value');
  const level = searchParams.get('level');
  const subject = searchParams.get('subject');
  const type = searchParams.get('type');
  const difficulty = searchParams.get('difficulty');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const id = searchParams.get('id');

  let results = [...TECHNIQUES];

  if (id) {
    const tech = results.find(t => t.id === id);
    if (!tech) return NextResponse.json({ error: 'Technique not found' }, { status: 404 });
    return NextResponse.json(tech);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(t => 
      t.titleAr.includes(search) || 
      t.titleEn.toLowerCase().includes(q) ||
      t.descriptionAr.includes(search) ||
      t.valueNameAr.includes(search) ||
      t.behaviorNameAr.includes(search)
    );
  }
  if (value) results = results.filter(t => t.valueId === value);
  if (level) results = results.filter(t => t.educationalLevel === level);
  if (subject) results = results.filter(t => t.subjects.includes(subject));
  if (type) results = results.filter(t => t.activityType === type);
  if (difficulty) results = results.filter(t => t.difficulty === difficulty);
  if (status) results = results.filter(t => t.reviewStatus === status);

  return NextResponse.json({ 
    techniques: results, 
    total: results.length 
  });
}