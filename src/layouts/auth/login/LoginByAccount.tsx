import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import SlideCaptcha from './subComponent/SlideCaptcha.vue';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import { useState } from 'react';

interface LoginByAccountProps {
  onChangePage: (type: PageType) => void; // 匹配父组件传递的函数类型
}

const HeaderSection = () => {
  return (
    <CardHeader className="relative">
      <CardTitle className="text-4xl font-bold flex items-center">
        欢迎回来
      </CardTitle>
      <CardDescription>输入您的账户信息以开始管理您的博客</CardDescription>
      <img
        className="w-24 absolute top-0 right-4"
        src="@/assets/images/welcome-en.png"
        alt=""
      />
    </CardHeader>
  );
};

const ContentSection = () => {
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>这是你的公开显示名称。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">提交</Button>
        </form>
      </Form>
    </CardContent>
  );
};

const FooterSection = () => {
  return <CardFooter className="block px-6"></CardFooter>;
};
const LoginByAccount = ({ onChangePage }) => {
  const form = useForm();
  return (
    <Card className="w-full px-[15%] py-[10%] opacity-90 absolute left-0 top-0">
      <HeaderSection />
      <ContentSection />
      <FooterSection />
    </Card>
  );
};

export default LoginByAccount;
