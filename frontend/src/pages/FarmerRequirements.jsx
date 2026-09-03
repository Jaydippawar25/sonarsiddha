import React, { useState, useEffect } from 'react';

const FarmerRequirements = ({ language }) => {
  const isMr = language === 'mr';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/requirements')
      .then(res => res.json())
      .then(reqData => {
        setData(reqData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching requirements data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-lg font-bold animate-pulse text-green-700">Loading...</div>;
  }

  if (!data || !data.documents) {
    return null;
  }

  return (
    <div className="bg-[#F3EEE1] py-8 md:py-12 px-4 font-body relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 drop-shadow-sm py-2">
            {isMr ? data.titleMr : data.titleEn}
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium max-w-2xl mx-auto">
            {isMr ? 'करार करण्यासाठी खालील कागदपत्रे आवश्यक आहेत.' : 'The following documents are required for the agreement.'}
          </p>
        </div>

        {/* Attractive List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.documents.map((doc, index) => (
            <div 
              key={doc.id} 
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 flex flex-col items-center text-center gap-3 group min-h-[180px] justify-center relative overflow-hidden hover:-translate-y-2"
            >
              {/* Icon / Number */}
              <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-3xl shadow-sm border-[3px] border-white z-10 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                {doc.icon}
              </div>
              
              {/* Document Name */}
              <div className="z-10 relative">
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  {isMr ? `कागदपत्र ${index + 1}` : `Document ${index + 1}`}
                </span>
                <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-green-800 transition-colors">
                  {isMr ? doc.nameMr : doc.nameEn}
                </h3>
              </div>
              
              {/* Decorative Background */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-50 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-[2.5] z-0"></div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-green-200 rounded-full blur-[100px] -z-10 opacity-30"></div>
    </div>
  );
};

export default FarmerRequirements;
