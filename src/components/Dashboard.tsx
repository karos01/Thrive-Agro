"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const Dashboard = () => {
  return (
    <div className="bg-white">
      <div>
        <section className="py-16">
          <div className="">
            <h1 className="font-bold text-3xl pb-10 text-center">
              WELCOME TO THRIVE AGRO
            </h1>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="w-[1000px]"
            >
              <SwiperSlide>
                <div className="grid items-center place-content-center md:grid-cols-2 gap-5">
                  <Image
                    src={"/images/yojana-1.jpg"}
                    width={600}
                    height={400}
                    alt="yojana 1"
                    className="rounded-md"
                  />
                  <div>
                    <div className="text-orange-600 hover:text-orange-800">
                      Yojana1
                    </div>
                    <div className="text-gray-600 hover:text-gray-800">
                      launched on 3rd feb
                    </div>
                    <h2 className="text-xl sm:text-3xl text-blue font-bold hover:text-gray-500">
                      Pradhan Mantri Fasal Bima Yojana (PMFBY):
                    </h2>
                    <p className="text-lg text-gray-600">
                      The Pradhan Mantri Fasal Bima Yojana (PMFBY) is a crop
                      insurance scheme introduced by the Government of India to
                      provide financial support to farmers in case of crop
                      failure or damage due to natural calamities, pests, or
                      diseases. The scheme aims to stabilize farmers&apos;
                      income and ensure their financial stability by mitigating
                      the risks associated with farming.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="grid items-center md:grid-cols-2 gap-5">
                    <Image
                      src={"/images/yojana-2.jpg"}
                      width={600}
                      height={400}
                      alt="yojana 2"
                      className="rounded-md"
                    />
                    <div>
                      <div className="text-orange-600 hover:text-orange-800">
                        Yojana1
                      </div>
                      <div className="text-gray-600 hover:text-gray-800">
                        launched on 3rd feb
                      </div>
                      <h2 className="text-xl sm:text-3xl text-blue font-bold hover:text-gray-500">
                        Pradhan Mantri Kisan Samman Nidhi (PM-Kisan)
                      </h2>
                      <p className="text-lg text-gray-600">
                        The Pradhan Mantri Kisan Samman Nidhi (PM-Kisan) Yojana
                        is a government initiative launched by the Government of
                        India to provide financial assistance to small and
                        marginal farmers across the country. It was announced in
                        the interim budget of 2019 and is implemented by the
                        Department of Agriculture, Cooperation & Farmers Welfare
                        under the Ministry of Agriculture & Farmers Welfare.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="grid items-center md:grid-cols-2 gap-5">
                    <div className=" flex justify-center items-center">
                      <Image
                        src={"/images/yojana-3.jpg"}
                        width={300}
                        height={400}
                        alt="yojana 3"
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <div className="text-orange-600 hover:text-orange-800">
                        Yojana1
                      </div>
                      <div className="text-gray-600 hover:text-gray-800">
                        launched on 3rd feb
                      </div>
                      <h2 className="text-xl sm:text-3xl text-blue font-bold hover:text-gray-500">
                        Soil Health Card Scheme:
                      </h2>
                      <p className="text-lg text-gray-600">
                        The Pradhan Mantri Kisan Samman Nidhi (PM-Kisan) Yojana
                        is a government initiative launched by the Government of
                        India to provide financial assistance to small and
                        marginal farmers across the country. It was announced in
                        the interim budget of 2019 and is implemented by the
                        Department of Agriculture, Cooperation & Farmers Welfare
                        under the Ministry of Agriculture & Farmers Welfare. By
                        promoting soil conservation and efficient nutrient
                        management, the SHC Scheme contributes to enhancing crop
                        productivity, reducing input costs, and ensuring
                        long-term agricultural sustainability.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="grid items-center md:grid-cols-2 gap-5">
                    <Image
                      src={"/images/yojana-2.jpg"}
                      width={600}
                      height={400}
                      alt="yojana 1"
                      className="rounded-md"
                    />
                    <div>
                      <div className="text-orange-600 hover:text-orange-800">
                        Yojana1
                      </div>
                      <div className="text-gray-600 hover:text-gray-800">
                        launched on 3rd feb
                      </div>
                      <h2 className="text-xl sm:text-3xl text-blue font-bold hover:text-gray-500">
                        Pradhan Mantri Kisan Samman Nidhi (PM-Kisan)
                      </h2>
                      <p className="text-lg text-gray-600">
                        The Pradhan Mantri Kisan Samman Nidhi (PM-Kisan) Yojana
                        is a government initiative launched by the Government of
                        India to provide financial assistance to small and
                        marginal farmers across the country. It was announced in
                        the interim budget of 2019 and is implemented by the
                        Department of Agriculture, Cooperation & Farmers Welfare
                        under the Ministry of Agriculture & Farmers Welfare.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="w-[1000px]"
            >
              <SwiperSlide>
                <div className="container mx-auto py-16">
                  <h2 className="text-3xl font-bold text-center mb-10">
                    Sustainable Practices
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-brown-200 p-4 rounded-md shadow-md hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-2">Cover Cropping</h3>
                      <p className="text-gray-600">
                        Cover cropping involves planting specific crops, known
                        as cover crops, during fallow periods or between cash
                        crop rotations. These cover crops help to protect and
                        improve the soil by reducing erosion, suppressing weeds,
                        and adding organic matter.
                      </p>
                      <button className="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-full hover:bg-yellow-800">
                        Read More
                      </button>
                    </div>{" "}
                    <div className="bg-brown-200 p-4 rounded-md shadow-md hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-2">Crop Rotation</h3>
                      <p className="text-gray-600">
                        Crop rotation is a sustainable farming method where
                        different crops are planted in the same area over
                        consecutive seasons. This practice helps improve soil
                        fertility, reduce soil erosion, control pests and
                        diseases, and increase crop yields.
                      </p>
                      <button className="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-full hover:bg-yellow-800">
                        Read More
                      </button>
                    </div>{" "}
                    <div className="bg-brown-200 p-4 rounded-md shadow-md hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-2">Agroforestry</h3>
                      <p className="text-gray-600">
                        Agroforestry systems offer a range of ecological,
                        economic, and social benefits. They contribute to soil
                        conservation, carbon sequestration, and water regulation
                        while providing additional income streams through
                        timber, fruit, nuts, and other forest products.
                        Agroforestr y also creates habitat for wildlife,
                        enhances biodiversity, and improves resilience to
                        climate change.
                      </p>
                      <button className="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-full hover:bg-yellow-800">
                        Read More
                      </button>
                    </div>{" "}
                    {/* <div className="bg-brown-200 p-4 rounded-md shadow-md hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-2">
                        Conservation Tillage:
                      </h3>
                      <p className="text-gray-600">
                        Conservation tillage refers to reduced or minimal
                        disturbance of the soil during planting and cultivation
                        activities. This practice aims to maintain soil
                        structure, reduce erosion, and conserve soil moisture.
                      </p>
                      <button className="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-full hover:bg-yellow-800">
                        Read More
                      </button>
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
