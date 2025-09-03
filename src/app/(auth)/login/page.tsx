'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import FormInput from '@/components/auth/FormInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Checkbox from '@/components/auth/Checkbox';
import AuthButton from '@/components/auth/AuthButton';
import ErrorMessage from '@/components/auth/ErrorMessage';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { error } = await login(data.email, data.password);

      if (error) {
        setError('root', {
          message: 'Email ou mot de passe incorrect. Veuillez réessayer.',
        });
      }
    } catch (error) {
      setError('root', {
        message: 'Erreur de connexion. Veuillez réessayer.',
      });
    }
  };

  return (
    <div className="w-full">
      {/* En-tête du formulaire */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Connexion
        </h1>
        <p className="text-gray-600">
          Accédez à votre espace French Tech Barcelona
        </p>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormInput
            {...register('email')}
            label="Adresse email"
            type="email"
            id="email"
            placeholder="votre@email.com"
            error={errors.email}
          />

          {/* Mot de passe */}
          <PasswordInput
            {...register('password')}
            label="Mot de passe"
            id="password"
            placeholder="Votre mot de passe"
            error={errors.password}
          />

          {/* Se souvenir de moi */}
          <div className="flex items-center justify-between">
            <Checkbox
              {...register('rememberMe')}
              label="Se souvenir de moi"
            />
            <Link
              href="/forgot-password"
              className="text-sm text-french-tech-blue hover:text-french-tech-blue-600 transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Erreur générale */}
          {errors.root && (
            <ErrorMessage message={errors.root.message!} />
          )}

          {/* Bouton de connexion */}
          <AuthButton
            type="submit"
            isLoading={loading}
            loadingText="Connexion en cours..."
          >
            Se connecter
          </AuthButton>
        </form>

        {/* Lien vers l'inscription */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas de compte ?{' '}
            <Link
              href="/signup"
              className="font-medium text-french-tech-blue hover:text-french-tech-blue-600 transition-colors"
            >
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/conditions-utilisation" className="text-french-tech-blue hover:underline">
            conditions d&apos;utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/politique-confidentialite" className="text-french-tech-blue hover:underline">
            politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  );
}
