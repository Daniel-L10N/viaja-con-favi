'use client';

import { useState, useRef, useCallback } from 'react';
import { ImagePlus, X, Upload } from 'lucide-react';

interface ImageUploadProps {
  value?: string | null;
  onChange: (file: File | null) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = 'Imagen', className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen');
      return;
    }

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(file);
  }, [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClick}
              className="p-2 bg-white rounded-lg hover:bg-gray-100"
              title="Cambiar imagen"
            >
              <ImagePlus className="w-5 h-5 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-white rounded-lg hover:bg-gray-100"
              title="Remover imagen"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          <Upload className={`w-8 h-8 ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
          <span className="text-sm text-gray-500">
            Click para seleccionar o arrastrar imagen
          </span>
        </button>
      )}
    </div>
  );
}