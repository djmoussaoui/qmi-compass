'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/app-store';
import { Compass, Eye, EyeOff, Loader2, Star, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginPage() {
  const { navigate, login, setDemoMode } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    login({
      id: 'demo-teacher-1',
      nameAr: 'أحمد محمد الخالدي',
      nameEn: 'Ahmed Al-Khalidi',
      email: 'ahmed@demo.qmi.edu',
      role: 'teacher',
      institutionId: 'demo-institution-1',
    });
    setDemoMode(true);
    navigate('teacher-dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate successful login
    login({
      id: 'user-1',
      nameAr: 'المستخدم',
      nameEn: 'User',
      email: email,
      role: 'teacher',
      institutionId: 'inst-1',
    });
    setIsLoading(false);
    navigate('teacher-dashboard');
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
              بوصلة <span className="text-primary">QMI</span>
            </h1>
            <p className="text-sm text-muted-foreground">بوصلة التعليم القرآني</p>
          </div>

          {/* Login Card */}
          <Card className="border-border/60 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
              <CardDescription>أدخل بياناتك للوصول إلى المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@qmi.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-right"
                    dir="ltr"
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-left pl-10"
                      dir="ltr"
                      autoComplete="current-password"
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

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>

              <Separator className="my-6" />

              {/* Demo Login */}
              <Button
                variant="secondary"
                className="w-full gap-2 border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                onClick={handleDemoLogin}
              >
                <Star className="w-4 h-4" />
                دخول تجريبي (عرض توضيحي)
              </Button>

              {/* Register Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                ليس لديك حساب؟{' '}
                <button
                  onClick={() => navigate('register')}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  سجّل الآن
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