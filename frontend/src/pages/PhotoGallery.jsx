import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { X } from 'lucide-react';
import image11 from '../assets/image11.jpeg';
import image12 from '../assets/image12.jpeg';
import image13 from '../assets/image13.jpeg';
import image14 from '../assets/image14.jpeg';
import image15 from '../assets/image15.jpeg';
import image16 from '../assets/image16.jpeg';
import image18 from '../assets/image18.jpeg';
import image19 from '../assets/image19.jpeg';
import image20 from '../assets/image20.jpeg';
import image21 from '../assets/image21.jpeg';
import image22 from '../assets/image22.jpeg';
import image23 from '../assets/image23.jpeg';

const PhotoGallery = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    image11, image12, image13, image14, image15, image16, 
    image18, image19, image20, image21, image22, image23
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#1C2A1E] py-8 md:py-12 px-4 font-body border-b border-[#1C2A1E]/15" id="gallery">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">05 // PHOTO GALLERY</span>
            <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
          </div>

          <div className="mb-12 text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
              {language === 'mr' ? 'शेवगा शेती व खरेदी केंद्र छायाचित्रे' : 'Photo Gallery: Plantation & Mandi Operations'}
            </h2>
            <p className="font-body text-base text-[#1C2A1E]/70 mt-2 max-w-2xl">
              {language === 'mr' 
                ? 'सोनारसिद्ध संस्थेची प्रत्यक्ष शेती, प्रतवारी आणि खरेदी केंद्रांची छायाचित्रे.' 
                : 'Direct photographs from our drumstick plantations, sorting facilities, and mandi hubs.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {images.map((src, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <div 
                className="bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:bg-[#1C2A1E] group cursor-pointer h-full"
                onClick={() => setSelectedImage(src)}
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl h-40 sm:h-64 bg-[#1C2A1E]/5 relative">
                  <img 
                    src={src} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#1C2A1E]/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#B8862E]/40 text-[9px] sm:text-[10px] font-mono text-[#B8862E] font-bold">
                    🔍 VIEW
                  </div>
                </div>
                <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-hairline flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#1C2A1E]/60 group-hover:text-[#F3EEE1]/70 transition-colors">
                  <span>SPECIMEN #{index + 1}</span>
                  <span className="text-[#B8862E] font-bold hidden xs:inline">SONARSIDDHA</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={32} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
