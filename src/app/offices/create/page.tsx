'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import CreateHeader from '@/components/office/CreateHeader';
import RadioGroup from '@/components/office/RadioGroup';
import CapacitySlider from '@/components/office/CapacitySlider';
import PhotoUpload from '@/components/office/PhotoUpload';
import { FormInput, Checkbox, AuthButton } from '@/components/auth';

const createOfficeSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  officeType: z.enum(['shared', 'private']).refine(val => val !== undefined, {
    message: 'Veuillez sélectionner un type de bureau',
  }),
  neighborhood: z.string().min(1, 'Veuillez sélectionner un quartier'),
  price: z.number().min(100, 'Le prix minimum est de 100€').max(1000, 'Le prix maximum est de 1000€'),
  surface: z.number().min(10, 'La surface minimum est de 10m²'),
  capacity: z.number().min(1, 'La capacité minimum est de 1 personne').max(50, 'La capacité maximum est de 50 personnes'),
  amenities: z.array(z.string()).min(1, 'Sélectionnez au moins un équipement'),
  description: z.string().min(50, 'La description doit contenir au moins 50 caractères'),
  availableFrom: z.string().min(1, 'Veuillez sélectionner une date de disponibilité'),
  minDuration: z.string().min(1, 'Veuillez sélectionner une durée minimum'),
});

type CreateOfficeFormData = z.infer<typeof createOfficeSchema>;

const OFFICE_TYPES = [
  {
    value: 'shared',
    label: 'Bureau partagé',
    description: 'Espace de travail collaboratif avec d\'autres entrepreneurs',
  },
  {
    value: 'private',
    label: 'Bureau privé',
    description: 'Bureau individuel pour votre équipe',
  },
];

const NEIGHBORHOODS = [
  'Gràcia',
  'Eixample',
  'Poblenou',
  'Gothic Quarter',
  'Born',
  'Sant Antoni',
  'Sants',
  'Sarrià',
];

const AMENITIES = [
  { value: 'wifi', label: 'WiFi haut débit', icon: 'wifi' },
  { value: 'parking', label: 'Parking', icon: 'local_parking' },
  { value: 'meeting_room', label: 'Salle de réunion', icon: 'meeting_room' },
  { value: 'kitchen', label: 'Cuisine équipée', icon: 'kitchen' },
  { value: 'terrace', label: 'Terrasse', icon: 'deck' },
  { value: 'ac', label: 'Climatisation', icon: 'ac_unit' },
];

const DURATIONS = [
  { value: '1', label: '1 mois minimum' },
  { value: '3', label: '3 mois minimum' },
  { value: '6', label: '6 mois minimum' },
  { value: '12', label: '12 mois minimum' },
];

export default function CreateOfficePage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateOfficeFormData>({
    resolver: zodResolver(createOfficeSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const handleOfficeTypeChange = (value: string) => {
    setValue('officeType', value as 'shared' | 'private');
  };

  const handleCapacityChange = (value: number) => {
    setValue('capacity', value);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = watchedValues.amenities || [];
    if (checked) {
      setValue('amenities', [...currentAmenities, amenity]);
    } else {
      setValue('amenities', currentAmenities.filter(a => a !== amenity));
    }
  };

  const onSubmit = async (data: CreateOfficeFormData) => {
    if (photos.length === 0) {
      alert('Veuillez ajouter au moins une photo');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Intégrer avec Supabase pour sauvegarder l'annonce
      console.log('Données du formulaire:', data);
      console.log('Photos:', photos);
      
      // Simulation d'un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers la page des bureaux
      router.push('/offices');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    // TODO: Implémenter la prévisualisation
    console.log('Prévisualisation:', watchedValues);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateHeader />
      
      <form onSubmit={handleSubmit(onSubmit)} className="pb-32">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          
          {/* Section 1: Informations de base */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Informations de base
            </h2>
            
            <div className="space-y-6">
              <FormInput
                {...register('title')}
                label="Titre de l'annonce"
                type="text"
                placeholder="Ex: Bureau moderne au cœur de Gràcia"
                error={errors.title}
              />

              <RadioGroup
                label="Type de bureau"
                options={OFFICE_TYPES}
                value={watchedValues.officeType || ''}
                onChange={handleOfficeTypeChange}
                error={errors.officeType?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartier
                </label>
                <select
                  {...register('neighborhood')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
                    errors.neighborhood ? 'border-french-tech-red' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez un quartier</option>
                  {NEIGHBORHOODS.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
                {errors.neighborhood && (
                  <p className="mt-1 text-sm text-french-tech-red">{errors.neighborhood.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Détails */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Détails
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                {...register('price', { valueAsNumber: true })}
                label="Prix mensuel"
                type="number"
                placeholder="250"
                error={errors.price}
              />

              <FormInput
                {...register('surface', { valueAsNumber: true })}
                label="Surface"
                type="number"
                placeholder="120"
                error={errors.surface}
              />

              <div>
                <CapacitySlider
                  label="Capacité"
                  value={watchedValues.capacity || 5}
                  onChange={handleCapacityChange}
                  min={1}
                  max={50}
                  step={1}
                  error={errors.capacity?.message}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Équipements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Équipements
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AMENITIES.map((amenity) => (
                <Checkbox
                  key={amenity.value}
                  label={
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-french-tech-blue">
                        {amenity.icon}
                      </span>
                      <span>{amenity.label}</span>
                    </div>
                  }
                  checked={watchedValues.amenities?.includes(amenity.value) || false}
                  onChange={(e) => handleAmenityChange(amenity.value, e.target.checked)}
                />
              ))}
            </div>
            {errors.amenities && (
              <p className="mt-2 text-sm text-french-tech-red">{errors.amenities.message}</p>
            )}
          </div>

          {/* Section 4: Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Description
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Décrivez votre espace
              </label>
              <textarea
                {...register('description')}
                rows={6}
                placeholder="Décrivez votre espace de travail, son ambiance, ses avantages, la proximité des transports, etc. Soyez précis pour attirer les bonnes personnes !"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
                  errors.description ? 'border-french-tech-red' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description && (
                  <p className="text-sm text-french-tech-red">{errors.description.message}</p>
                )}
                <span className={`text-sm ${
                  (watchedValues.description?.length || 0) < 50 ? 'text-gray-500' : 'text-green-600'
                }`}>
                  {(watchedValues.description?.length || 0)} / 50 caractères minimum
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Photos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <PhotoUpload
              photos={photos}
              onPhotosChange={setPhotos}
              error={photos.length === 0 ? 'Veuillez ajouter au moins une photo' : undefined}
            />
          </div>

          {/* Section 6: Disponibilité */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Disponibilité
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de disponibilité
                </label>
                <input
                  {...register('availableFrom')}
                  type="date"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
                    errors.availableFrom ? 'border-french-tech-red' : 'border-gray-300'
                  }`}
                />
                {errors.availableFrom && (
                  <p className="mt-1 text-sm text-french-tech-red">{errors.availableFrom.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée minimum
                </label>
                <select
                  {...register('minDuration')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
                    errors.minDuration ? 'border-french-tech-red' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez une durée</option>
                  {DURATIONS.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
                {errors.minDuration && (
                  <p className="mt-1 text-sm text-french-tech-red">{errors.minDuration.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Footer sticky avec boutons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isValid && photos.length > 0 ? (
              <span className="text-green-600">✓ Formulaire complet</span>
            ) : (
              <span>Veuillez remplir tous les champs requis</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <AuthButton
              type="button"
              variant="secondary"
              onClick={handlePreview}
              disabled={!isValid || photos.length === 0}
            >
              Aperçu
            </AuthButton>
            
            <AuthButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Publication en cours..."
              disabled={!isValid || photos.length === 0}
              onClick={handleSubmit(onSubmit)}
            >
              Publier l'annonce
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
}
