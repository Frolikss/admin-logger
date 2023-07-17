import { LoginForm } from '@features/login-form';

export const AuthModal = () => {
  return (
    <div className="w-2/3 flex flex-col gap-4 bg-white rounded-xl p-4">
      <h3 className="text-center">Welcome</h3>
      <LoginForm />
    </div>
  );
};
