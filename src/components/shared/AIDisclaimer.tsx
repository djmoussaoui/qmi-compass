'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { AI_DISCLAIMER_AR } from '@/data/qmi-data';

export function AIDisclaimer() {
  return (
    <Alert className="border-amber-300 bg-amber-50 text-amber-800">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-sm">
        {AI_DISCLAIMER_AR}
      </AlertDescription>
    </Alert>
  );
}