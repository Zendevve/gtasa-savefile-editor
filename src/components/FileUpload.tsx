import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { useSaveStore } from '../store/useSaveStore';
import { SaveFileParser } from '../lib/parser/SaveFileParser';

export const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { setSaveData, setLoading, setError } = useSaveStore();

  const processFile = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const parser = new SaveFileParser(buffer);
      const data = parser.parse();

      // Simulate processing delay for better UX
      setTimeout(() => {
        setSaveData(data);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setError('Failed to parse save file. Please ensure it is a valid GTA SA save file.');
      setLoading(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center ${isDragging
        ? 'border-primary-500 bg-primary-500/10'
        : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/50'
        }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".b"
        onChange={onFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center pointer-events-none">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDragging ? 'bg-primary-500/20 text-primary-500' : 'bg-neutral-700/50 text-neutral-400'
          }`}>
          <Upload size={32} />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          {isDragging ? 'Drop file here' : 'Drag & drop your save file'}
        </h3>

        <p className="text-neutral-400 text-sm max-w-xs mx-auto mb-6">
          Supports GTASAsf1.b through GTASAsf8.b files from standard PC versions
        </p>

        <button className="btn-primary pointer-events-auto relative z-10">
          Select File
        </button>
      </div>
    </div>
  );
};
