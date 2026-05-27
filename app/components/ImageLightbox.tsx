'use client';

import { useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ImageLightboxProps {
  children: ReactNode;
  imageUrl: string;
  imageName: string;
}

export default function ImageLightbox({ children, imageUrl, imageName }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const lightboxContent = isOpen ? (
    <div
      className="lightbox-overlay"
      onClick={handleClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={handleClose}
          aria-label="Close image viewer"
        >
          ✕
        </button>
        <div className="lightbox-image-container">
          <Image
            src={imageUrl}
            alt={imageName}
            fill
            sizes="90vw"
            style={{objectFit: 'contain'}}
            priority
          />
        </div>
        <div className="lightbox-caption">{imageName}</div>
      </div>

      <style jsx global>{`
            .lightbox-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.9);
              z-index: 10000;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              animation: fadeIn 0.2s ease-out;
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .lightbox-content {
              position: relative;
              width: 100%;
              max-width: 1200px;
              max-height: 90vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
            }

            .lightbox-image-container {
              position: relative;
              width: 100%;
              height: calc(90vh - 80px);
              background: white;
              border-radius: 12px;
              overflow: hidden;
            }

            .lightbox-close {
              position: absolute;
              top: -50px;
              right: 0;
              background: white;
              border: none;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              font-size: 24px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333;
              transition: all 0.2s;
              z-index: 10001;
            }

            .lightbox-close:hover {
              transform: scale(1.1);
              background: #f5f5f5;
            }

            .lightbox-caption {
              color: white;
              font-size: 18px;
              font-weight: 600;
              text-align: center;
              font-family: var(--font-fredoka);
            }

            @media (max-width: 768px) {
              .lightbox-close {
                top: 10px;
                right: 10px;
              }

              .lightbox-image-container {
                height: calc(90vh - 100px);
              }

              .lightbox-caption {
                font-size: 16px;
              }
            }
      `}</style>
    </div>
  ) : null;

  return (
    <>
      <div onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        {children}
      </div>
      {mounted && lightboxContent && createPortal(lightboxContent, document.body)}
    </>
  );
}
