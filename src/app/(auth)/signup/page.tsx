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

const signupSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  company: z.string().min(2, 'Le nom de l&apos;entreprise doit contenir au moins 2 caractères'),
  isFrenchTechMember: z.boolean().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions d&apos;utilisation'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { error } = await signup(data.email, data.password, {
        name: `${data.firstName} ${data.lastName}`,
        company: data.company,
        french_tech_member: data.isFrenchTechMember,
      });

      if (error) {
        setError('root', {
          message: 'Erreur lors de l&apos;inscription. Veuillez réessayer.',
        });
      }
    } catch (error) {
      setError('root', {
        message: 'Erreur lors de l&apos;inscription. Veuillez réessayer.',
      });
    }
  };

  return (
    <div className="w-full">
      {/* En-tête du formulaire */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Créer un compte
        </h1>
        <p className="text-gray-600">
          Rejoignez la communauté French Tech Barcelona
        </p>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              {...register('firstName')}
              label="Prénom"
              type="text"
              id="firstName"
              placeholder="Votre prénom"
              error={errors.firstName}
            />
            <FormInput
              {...register('lastName')}
              label="Nom"
              type="text"
              id="lastName"
              placeholder="Votre nom"
              error={errors.lastName}
            />
          </div>

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
            placeholder="Minimum 8 caractères"
            error={errors.password}
          />

          {/* Confirmation du mot de passe */}
          <PasswordInput
            {...register('confirmPassword')}
            label="Confirmer le mot de passe"
            id="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            error={errors.confirmPassword}
          />

          {/* Entreprise */}
          <FormInput
            {...register('company')}
            label="Entreprise"
            type="text"
            id="company"
            placeholder="Nom de votre entreprise"
            error={errors.company}
          />

          {/* Membre French Tech */}
          <Checkbox
            {...register('isFrenchTechMember')}
            label="Je suis membre de French Tech Barcelona"
          />

          {/* Acceptation des CGU */}
          <Checkbox
            {...register('acceptTerms')}
            label={
              <>
                J&apos;accepte les{' '}
                <Link
                  href="/conditions-utilisation"
                  className="text-french-tech-blue hover:text-french-tech-blue-600 underline"
                  target="_blank"
                >
                  conditions d&apos;utilisation
                </Link>{' '}
                et la{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-french-tech-blue hover:text-french-tech-blue-600 underline"
                  target="_blank"
                >
                  politique de confidentialité
                </Link>
                <span className="text-french-tech-red"> *</span>
              </>
            }
            error={errors.acceptTerms}
          />

          {/* Erreur générale */}
          {errors.root && (
            <ErrorMessage message={errors.root.message!} />
          )}

          {/* Bouton d'inscription */}
          <AuthButton
            type="submit"
            isLoading={loading}
            loadingText="Création du compte..."
          >
            Créer mon compte
          </AuthButton>
        </form>

        {/* Lien vers la connexion */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link
              href="/login"
              className="font-medium text-french-tech-blue hover:text-french-tech-blue-600 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          En créant un compte, vous acceptez nos{' '}
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
