import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { useSaveStore } from '../store/useSaveStore';
import { SaveFileParser } from '../lib/parser/SaveFileParser';

export const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { setSaveData, setLoading, setError, error } = useSaveStore();
  const inputRef = React.useRef<HTMLInputElement>(null);

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
      setError(err instanceof Error ? err.message : 'Failed to parse save file. Please ensure it is a valid GTA SA save file.');
      setLoading(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set dragging to false if we're leaving the drop zone entirely
    // and not just entering a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-4 border-dashed border-black p-6 transition-all duration-100 text-center cursor-pointer ${isDragging
          ? 'bg-brutal-yellow'
          : 'bg-white hover:bg-neutral-100'
          } ${error ? 'bg-red-100 border-red-600' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".b"
          onChange={onFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center pointer-events-none">
          <div className={`w-16 h-16 border-4 border-black flex items-center justify-center mb-4 ${isDragging
            ? 'bg-black text-brutal-yellow'
            : 'bg-white text-black'
            }`}>
            <Upload size={32} strokeWidth={3} />
          </div>

          <h3 className="text-xl font-black text-black uppercase mb-1 tracking-tighter">
            {isDragging ? 'DROP IT HERE!' : 'DRAG & DROP SAVE FILE'}
          </h3>

          <p className="text-black font-mono text-xs max-w-xs mx-auto mb-6 bg-brutal-yellow px-2 inline-block -rotate-1">
            Supports GTASAsf1.b - GTASAsf8.b
          </p>

          <button
            className="brutal-btn pointer-events-auto relative z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Select File
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-600 text-white border-4 border-black font-bold text-center uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          ERROR: {error}
        </div>
      )}
    </div>
  );
};
