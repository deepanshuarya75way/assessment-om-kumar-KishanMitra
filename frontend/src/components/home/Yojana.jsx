import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Yojana() {
  const schemes = [
    {
      id: 1,
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      desc: "Direct income support to small and marginal farmers to supplement their financial needs.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80&auto=format&fit=crop",
      beneficiaries: 12000000,
      tag: "Highly Beneficial",
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      desc: "Crop insurance scheme to protect farmers from crop losses due to natural calamities.",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80&auto=format&fit=crop",
      beneficiaries: 8500000,
      tag: "Highly Beneficial",
    },
    {
      id: 3,
      name: "Kisan Credit Card (KCC)",
      desc: "Provides farmers with timely access to credit for cultivation and allied activities.",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80&auto=format&fit=crop",
      beneficiaries: 9500000,
      tag: "Highly Beneficial",
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      desc: "Periodic soil testing and customised nutrient recommendations to improve productivity.",
      image:
        "https://iasnext.com/wp-content/uploads/2024/02/Soil-Health-Cards.webp",
      beneficiaries: 4300000,
      tag: "Highly Beneficial",
    },
    {
      id: 5,
      name: "e-NAM (National Agriculture Market)",
      desc: "Digital marketplace connecting farmers to buyers across mandis for better price discovery.",
      image:
        "https://cdn1.byjus.com/wp-content/uploads/2016/05/e-nam-logo1.png",
      beneficiaries: 3000000,
      tag: "Highly Beneficial",
    },
    {
      id: 6,
      name: "PM-AASHA (Price Support Scheme & MSP operations)",
      desc: "Measures to ensure remunerative prices for farmers through procurement and market support.",
      image:
        "https://www.financialexpress.com/wp-content/uploads/2019/02/crop.jpg?w=1024",
      beneficiaries: 2750000,
      tag: "Highly Beneficial",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 650, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-8 px-3 sm:px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-green-800 font-serif">
            Top Government Schemes Helping Indian Farmers
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-gray-800 mt-3">
            Shown: only schemes that proved highly beneficial — beneficiaries shown for scale
          </p>
        </div>

        {/* Slider Start */}
        <Slider {...settings}>
          {schemes.map((s) => (
            <div key={s.id} className="px-2 sm:px-3">
              <motion.article
                className="bg-white flex flex-col h-full min-h-[340px] md:min-h-[380px] lg:min-h-[400px] rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.05, boxShadow: "0 20px 40px rgba(0,255,162,0.2)" }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded">
                    {s.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-semibold leading-tight  text-green-900">
                    {s.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-3 sm:mb-4 flex-grow">
                    {s.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Beneficiaries</p>
                      <p className="text-sm sm:text-base font-medium text-green-700">
                        <CountUp end={s.beneficiaries} duration={2} separator="," /> farmers
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </Slider>
        {/* Slider End */}
      </div>
    </section>
  );
}

export default Yojana;
