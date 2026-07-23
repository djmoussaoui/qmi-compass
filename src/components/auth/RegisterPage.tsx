'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore, type UserRole } from '@/store/app-store';
import { Compass, Loader2, UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const ROLES: { value: UserRole; labelAr: string; descriptionAr: string }[] = [
  { value: 'teacher', labelAr: 'معلم', descriptionAr: 'تصميم الأنشطة ومتابعة الطلاب' },
  { value: 'supervisor', labelAr: 'مشرف تربوي', descriptionAr: 'إشراف على المعلمين والتقويم' },
  { value: 'educational_reviewer', labelAr: 'مراجع تربوي', descriptionAr: 'مراجعة المحتوى التربوي' },
  { value: 'quranic_reviewer', labelAr: 'مراجع قرآني', descriptionAr: 'مراجعة المراجع القرآنية' },
  { value: 'researcher', labelAr: 'باحث', descriptionAr: 'الوصول إلى البيانات والأبحاث' },
];

export function RegisterPage() {
  const { navigate } = useAppStore();
  const [nameAr, setNameAr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedRole = ROLES.find((r) => r.value === role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nameAr || !email || !password || !role) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيدها غير متطابقتين');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/25 mb-4">
              <Compass className="w-9 h-9 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              إنشاء حساب جديد
            </h1>
            <p className="text-sm text-muted-foreground">انضم إلى مجتمع بوصلة QMI التعليمي</p>
          </div>

          {/* Register Card */}
          <Card className="border-border/60 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">التسجيل</CardTitle>
              <CardDescription>أنشئ حسابك للبدء في تصميم الأنشطة التعليمية</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (Arabic) */}
                <div className="space-y-2">
                  <Label htmlFor="nameAr" className="text-sm font-medium">
                    الاسم الكامل <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nameAr"
                    type="text"
                    placeholder="أدخل اسمك بالعربية"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="text-right"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-sm font-medium">
                    البريد الإلكتروني <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="example@qmi.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-right"
                    dir="ltr"
                    autoComplete="email"
                  />
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    الدور <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={role}
                    onValueChange={(val) => setRole(val as UserRole)}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر دورك في المنصة" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value} className="text-right">
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="font-medium">{r.labelAr}</span>
                            <span className="text-xs text-muted-foreground">{r.descriptionAr}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedRole && (
                    <p className="text-xs text-muted-foreground text-right">
                      {selectedRole.descriptionAr}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-sm font-medium">
                    كلمة المرور <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-left pl-10"
                      dir="ltr"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    تأكيد كلمة المرور <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-left"
                    dir="ltr"
                    autoComplete="new-password"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 text-right">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  {isLoading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
                </Button>
              </form>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                لديك حساب؟{' '}
                <button
                  onClick={() => navigate('login')}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  سجّل دخولك
                </button>
              </p>
            </CardContent>
          </Card>

          {/* Back to home */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('home')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              ← العودة إلى الصفحة الرئيسية
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}