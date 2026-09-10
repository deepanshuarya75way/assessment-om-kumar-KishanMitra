import React from "react";

function Testimonials() {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg font-medium text-gray-600 font-pj">
              Lot of farmers shared their experiences
            </p>
            <h2 className="mt-4 text-3xl font-bold text-green-800 sm:text-3xl xl:text-5xl font-serif">
              How digital tools changed farmers’ lives
            </h2>
          </div>

      
          {/* Testimonials grid */}
          <div className="relative mt-10 md:mt-24 md:order-2 w-full ml-10">
            {/* Gradient background */}
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-4 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            {/* Cards */}
            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-10">
              {/* Testimonial 1 */}
              <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  {/* Stars */}
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#FDB241]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Content */}
                  <blockquote className="flex-1 mt-8">
                    <p className="text-lg leading-relaxed text-gray-900 font-pj">
                      “Weather forecast app helped me plan irrigation and save water.
                      Now I don’t have to depend only on guesswork.”
                    </p>
                  </blockquote>
                  {/* Author */}
                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                      alt="Farmer 1"
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 font-pj">
                        Ramesh Kumar
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-gray-600">
                        Farmer, Uttar Pradesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#FDB241]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 mt-8">
                    <p className="text-lg leading-relaxed text-gray-900 font-pj">
                      “Online mandi price updates helped me sell crops at better rates.
                      Earlier, I had no idea of market trends.”
                    </p>
                  </blockquote>
                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                      alt="Farmer 2"
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 font-pj">
                        Sunita Devi
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-gray-600">
                        Farmer, Bihar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col overflow-hidden shadow-xl rounded-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#FDB241]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 mt-8">
                    <p className="text-lg leading-relaxed text-gray-900 font-pj">
                      “Using mobile payments saved me from middlemen delays.
                      Now I get money directly in my account.”
                    </p>
                  </blockquote>
                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                      alt="Farmer 3"
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 font-pj">
                        Harpal Singh
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-gray-600">
                        Farmer, Punjab
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of cards */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
