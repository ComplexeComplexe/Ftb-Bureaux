import Link from 'next/link';
import Image from 'next/image';

interface OfficeCardProps {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  type: 'shared' | 'private';
  surface: number;
  capacity: number;
  imageUrl?: string;
  amenities?: string[];
}

export default function OfficeCard({
  id,
  title,
  neighborhood,
  price,
  type,
  surface,
  capacity,
  imageUrl,
  amenities = []
}: OfficeCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: 'shared' | 'private') => {
    return type === 'shared' ? 'Bureau partagé' : 'Bureau privé';
  };

  const getTypeColor = (type: 'shared' | 'private') => {
    return type === 'shared' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <Link href={`/offices/${id}`} className="block group">
      <div className="card-hover overflow-hidden">
        {/* Image */}
        <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-gray-400">
                business
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-french-tech-blue transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
              {getTypeLabel(type)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="text-sm">{neighborhood}</span>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="material-symbols-outlined text-sm">straighten</span>
                <span>{surface} m²</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="material-symbols-outlined text-sm">group</span>
                <span>{capacity} pers.</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{amenities.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-french-tech-blue">
                {formatPrice(price)}
              </span>
              <span className="text-sm text-gray-500 ml-1">/mois</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-french-tech-blue transition-colors duration-200">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
