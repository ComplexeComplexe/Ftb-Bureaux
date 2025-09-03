import Image from 'next/image';
import Link from 'next/link';

interface Office {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  imageUrl: string;
}

interface OfficeCardProps {
  office: Office;
}

export default function OfficeCard({ office }: OfficeCardProps) {
  // Formatage du prix avec séparateurs de milliers
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  return (
    <Link 
      href={`/offices/${office.id}`}
      className="block group"
      aria-label={`Voir les détails de ${office.title} à ${office.neighborhood}`}
    >
      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <Image
            src={office.imageUrl || '/placeholder-office.jpg'}
            alt={`Photo de ${office.title}`}
            fill
            className="bg-cover bg-center object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              // Fallback vers une image placeholder en cas d'erreur
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-office.jpg';
            }}
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-french-tech-blue transition-colors duration-200">
            {office.title}
          </h3>
          <p className="text-sm text-gray-600">
            {office.neighborhood}
          </p>
          <p className="mt-2 text-base font-semibold text-french-tech-blue">
            {formatPrice(office.price)}€ / mois
          </p>
        </div>
      </div>
    </Link>
  );
}
