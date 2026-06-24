"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Star, MoveLeft, MoveRight, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, folder = "listings", maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append("folder", folder);
    
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      if (data.urls && data.urls.length > 0) {
        onChange([...images, ...data.urls]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    onChange(newImages);
  };

  const makeFeatured = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const item = newImages.splice(index, 1)[0];
    newImages.unshift(item);
    onChange(newImages);
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index - 1];
    newImages[index - 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  };

  const moveRight = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index + 1];
    newImages[index + 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragActive ? "border-primary bg-primary/10" : "border-white/20 bg-[#1a1a1a] hover:bg-white/5 hover:border-white/30"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center justify-center text-white/70">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="font-semibold text-lg">Uploading images...</p>
            <p className="text-sm mt-1">Please wait</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-white/50">
            <UploadCloud className="w-12 h-12 mb-4 group-hover:text-primary transition-colors" />
            <p className="font-semibold text-lg text-white/90">Click or drag images here to upload</p>
            <p className="text-sm mt-1">Max {maxImages} images (JPEG, PNG, WEBP)</p>
          </div>
        )}
      </div>

      {/* Image Gallery Preview */}
      {images.length > 0 && (
        <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white/90 flex items-center gap-2">
              <ImageIcon size={18} className="text-primary" /> Gallery ({images.length})
            </h3>
            <span className="text-xs text-white/50">First image is the Featured cover</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className={`relative group rounded-xl overflow-hidden aspect-video bg-black/50 border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'}`}>
                <Image 
                  src={img} 
                  alt={`Preview ${idx}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold bg-black/80 px-2 py-1 rounded text-white">
                      {idx === 0 ? "COVER" : `#${idx + 1}`}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                      className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5">
                    {idx !== 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); makeFeatured(idx); }}
                        className="p-2 bg-white/20 hover:bg-primary text-white rounded-lg backdrop-blur-sm transition-colors"
                        title="Set as Cover"
                      >
                        <Star size={14} />
                      </button>
                    )}
                    {idx > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveLeft(idx); }}
                        className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors"
                        title="Move Left"
                      >
                        <MoveLeft size={14} />
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveRight(idx); }}
                        className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors"
                        title="Move Right"
                      >
                        <MoveRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
