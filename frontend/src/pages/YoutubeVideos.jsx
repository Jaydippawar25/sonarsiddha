import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

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
        const res = await fetch('http://localhost:5000/api/youtube');
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
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-hairline">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8862E]">04 // FIELD GUIDANCE & VIDEOS</span>
          <span className="h-px bg-[#B8862E]/40 flex-grow"></span>
        </div>

        <div className="mb-12 text-left">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A1E]">
            {isMr ? 'शेती मार्गदर्शक व्हिडिओ संग्रहालय' : 'Farming Guidance & Field Operations Archive'}
          </h2>
          <p className="font-body text-base text-[#1C2A1E]/70 mt-2 max-w-2xl">
            {isMr 
              ? 'शेवगा लागवड, खत व्यवस्थापन आणि काढणी तंत्रावरील प्रत्यक्ष माहितीपट.' 
              : 'Direct field recordings covering cultivation, pruning, and harvesting techniques.'}
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12 text-xs font-mono text-[#1C2A1E]/50 bg-white border border-[#1C2A1E]/20 p-6 rounded-xs">
            {isMr ? 'अद्याप कोणतेही व्हिडिओ उपलब्ध नाहीत.' : 'No archival videos loaded.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="bg-white border-2 border-[#1C2A1E]/15 hover:border-[#B8862E] p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:bg-[#1C2A1E] hover:text-[#F3EEE1] shadow-sm hover:shadow-[0_15px_35px_rgba(28,42,30,0.3)] group cursor-pointer"
              >
                {/* Video Player Container with Curved Corners */}
                <div className="relative pt-[56.25%] bg-[#1C2A1E] w-full rounded-xl overflow-hidden border border-hairline shadow-inner">
                  {video.isLocal ? (
                    <video 
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                      src={video.videoUrl}
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                    ></video>
                  ) : (
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${video.videoId || video.videoUrl}`} 
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                
                {/* Video Title & Meta */}
                <div className="mt-4 pt-3 border-t border-hairline flex flex-col justify-between flex-grow">
                  <h4 className="font-display font-bold text-[#1C2A1E] text-base leading-snug group-hover:text-[#F3EEE1] transition-colors">
                    {video.title || (isMr ? 'मार्गदर्शक व्हिडिओ' : 'Guidance Recording')}
                  </h4>
                  <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between font-mono text-[11px] text-[#1C2A1E]/60 group-hover:text-[#F3EEE1]/60 transition-colors">
                    <span>{video.isLocal ? 'LOCAL MP4' : 'YOUTUBE STREAM'}</span>
                    <span className="text-[#B8862E] font-bold group-hover:text-[#D4AF37]">SONARSIDDHA ARCHIVE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default YoutubeVideos;
