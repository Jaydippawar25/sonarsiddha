import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { API_BASE } from '../config';

const YoutubeVideos = ({ language }) => {
  const isMr = language === 'mr';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const q = query(collection(db, 'youtube'), orderBy('title', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(data);
      setLoading(false);
    } catch (error) {
      try {
        const res = await fetch(`${API_BASE}/youtube`);
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('API fetch also failed:', err);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return (
    <div className="py-16 bg-[#F3EEE1] text-center font-mono text-xs uppercase tracking-widest text-[#1C2A1E]/60">
      {isMr ? 'व्हिडिओ डेटा लोड होत आहे...' : 'Loading Video Archive...'}
    </div>
  );

  return (
    <section className="py-8 md:py-12 bg-[#F3EEE1] text-[#1C2A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">04 // FIELD GUIDANCE & VIDEOS</span>
            <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
                {isMr ? 'शेती मार्गदर्शक व्हिडिओ संग्रहालय' : 'Farming Guidance & Field Operations Archive'}
              </h2>
              <p className="font-body text-xs sm:text-base text-[#1C2A1E]/70 mt-1 max-w-2xl">
                {isMr 
                  ? 'शेवगा लागवड, खत व्यवस्थापन आणि काढणी तंत्रावरील प्रत्यक्ष माहितीपट.' 
                  : 'Direct field recordings covering cultivation, pruning, and harvesting techniques.'}
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#B8862E] font-bold shrink-0 md:hidden bg-[#1C2A1E] text-[#F3EEE1] px-2.5 py-1 rounded-full border border-[#B8862E]/40">
              SWIPE ➔
            </span>
          </div>
        </ScrollReveal>

        {videos.length === 0 ? (
          <div className="text-center py-12 text-xs font-mono text-[#1C2A1E]/50 bg-white border border-[#1C2A1E]/20 p-6 rounded-xs">
            {isMr ? 'अद्याप कोणतेही व्हिडिओ उपलब्ध नाहीत.' : 'No archival videos loaded.'}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 snap-x snap-mandatory pb-4 no-scrollbar">
            {videos.map((video, idx) => (
              <ScrollReveal key={video.id} delay={idx * 100}>
                <div 
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center bg-white border-2 border-[#B8862E]/30 hover:border-[#B8862E] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 hover:bg-[#1C2A1E] hover:text-[#F3EEE1] shadow-sm hover:shadow-2xl group cursor-pointer h-full"
                >
                {/* Video Player Container with Curved Corners */}
                <div className="relative pt-[56.25%] bg-[#1C2A1E] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-hairline shadow-inner">
                  {video.isLocal ? (
                    <video 
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      src={video.videoUrl}
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                    ></video>
                  ) : (
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl"
                      src={`https://www.youtube.com/embed/${video.videoId || video.videoUrl}`} 
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                
                {/* Video Title & Meta */}
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-hairline flex flex-col justify-between flex-grow">
                  <h4 className="font-display font-bold text-[#1C2A1E] text-sm sm:text-base leading-snug group-hover:text-[#F3EEE1] transition-colors line-clamp-2">
                    {video.title || (isMr ? 'मार्गदर्शक व्हिडिओ' : 'Guidance Recording')}
                  </h4>
                  <div className="mt-2.5 sm:mt-3 pt-2 border-t border-hairline flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#1C2A1E]/60 group-hover:text-[#F3EEE1]/60 transition-colors">
                    <span className="font-bold text-[#2F5233] group-hover:text-[#B8862E]">▶ {video.isLocal ? 'LOCAL MP4' : 'STREAM'}</span>
                    <span className="text-[#B8862E] font-bold group-hover:text-[#D4AF37]">ARCHIVE</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        )}

      </div>
    </section>
  );
};

export default YoutubeVideos;
