import { NextResponse } from 'next/server';
import { DEMO_TEACHER, DEMO_CLASSES, DEMO_STUDENTS, FORBIDDEN_LABELS, BEHAVIOR_WARNING_AR } from '@/data/qmi-data';

export async function GET() {
  return NextResponse.json({ teacher: DEMO_TEACHER });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Check for forbidden labels in any text fields
    const allText = JSON.stringify(body).toLowerCase();
    for (const label of FORBIDDEN_LABELS) {
      if (allText.includes(label.toLowerCase())) {
        return NextResponse.json({ 
          error: BEHAVIOR_WARNING_AR,
          warningType: 'forbidden_label' 
        }, { status: 400 });
      }
    }

    // Demo login
    if (email === 'demo@qmi.edu' || email === 'ahmed@demo.qmi.edu') {
      return NextResponse.json({ user: DEMO_TEACHER, token: 'demo-token' });
    }

    // Simulated login
    const user = {
      id: `user-${Date.now()}`,
      nameAr: name || 'مستخدم جديد',
      nameEn: 'New User',
      email,
      role: 'teacher' as const,
    };

    return NextResponse.json({ user, token: `token-${Date.now()}` });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}