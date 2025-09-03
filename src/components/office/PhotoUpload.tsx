'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  error?: string;
}

export default function PhotoUpload({ photos, onPhotosChange, error }: PhotoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (photos.length + imageFiles.length > 5) {
      alert('Maximum 5 photos autorisées');
      return;
    }
    
    onPhotosChange([...photos, ...imageFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (photos.length + imageFiles.length > 5) {
      alert('Maximum 5 photos autorisées');
      return;
    }
    
    onPhotosChange([...photos, ...imageFiles]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Photos de l'espace
      </label>
      
      {/* Zone de drag & drop */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-french-tech-blue bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <span className="material-symbols-outlined text-4xl text-gray-400">
            cloud_upload
          </span>
          <div>
            <p className="text-lg font-medium text-gray-900">
              Glissez vos photos ici
            </p>
            <p className="text-sm text-gray-600 mt-1">
              ou cliquez pour sélectionner des fichiers
            </p>
          </div>
          <button
            type="button"
            onClick={openFileSelector}
            className="bg-french-tech-blue text-white px-4 py-2 rounded-lg hover:bg-french-tech-blue-600 transition-colors"
          >
            Sélectionner des photos
          </button>
          <p className="text-xs text-gray-500">
            JPG, PNG jusqu'à 5 photos (max 5MB chacune)
          </p>
        </div>
      </div>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview des photos */}
      {photos.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Supprimer la photo"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}/{photos.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-french-tech-red">{error}</p>
      )}
    </div>
  );
}
