// import React, { useEffect, useState } from "react";
// import { FaChevronLeft } from "react-icons/fa";
// import { FaChevronRight } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const App = () => {
//   const images = [
//     "https://www.shutterstock.com/image-photo/ram-god-260nw-2525488295.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjNMeybYXFov-UfQQrsVJlD3wDbTjXLqLtsA&s",
//     "https://i.pinimg.com/474x/66/41/53/66415315048113072cbcd6a72eb2ee52.jpg",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const duration = 5000;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//       setProgress(0);
//     }, duration);

//     const progressInterval = setInterval(() => {
//       setProgress((prev) => (prev < 100 ? prev + 1 : 100));
//     }, duration / 100);

//     return () => {
//       clearInterval(interval);
//       clearInterval(progressInterval);
//     };
//   }, [currentIndex]);

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//     setProgress(0);
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     setProgress(0);
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto ">
//       <div className="relative flex items-center">
//         <button className="absolute left-2 top-32 z-10 bg-black p-2 bg-opacity-50 flex items-center justify-center rounded-full">
//           <FaChevronLeft className="" size={30} />
//         </button>
//         <img
//           src={images[currentIndex]}
//           className="w-full h-80 mt-10 bg-cover "
//         />
//         <button className="absolute right-2 top-32 z-10 bg-black p-2 bg-opacity-50 flex items-center justify-center rounded-full">
//           <FaChevronRight size={30} />
//         </button>
//       </div>
//       <div className="mt-2 flex gap-2 justify-center">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className="w-6 h-1 bg-gray-300 rounded-full overflow-hidden"
//           >
//             <motion.div
//               initial={{ width: "0%" }}
//               animate={{
//                 width: currentIndex === index ? `${progress}%` : "0%",
//               }}
//               className="h-full bg-blue-500"
//             ></motion.div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import "@fontsource/ubuntu-mono";
import "@fontsource/lobster";
import "@fontsource/montserrat";
import "@fontsource/open-sans";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
} from "@mui/material";

const products = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s",
    name: "Laptop",
    price: 60000,
  },
  {
    id: 2,
    image:
      "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1702983367485/d0467cb4099841dae725d707fce48b51.png",
    name: "Smartphone",
    price: 45000,
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRsLIxZwbjoJFwnQZbHKpjnc1ZPgryD86ow&s",
    name: "Tablet",
    price: 30000,
  },
  {
    id: 4,
    image:
      "https://images.jdmagicbox.com/quickquotes/images_main/samsung-monitor-23-06-2023-21-272530057-q5i8z9kg.png",
    name: "Monitor",
    price: 55000,
  },
  {
    id: 5,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/1/RI/LV/NJ/9670299/boat-rockerz-450-bluetooth-on-ear-headphones-with-mic-500x500.jpg",
    name: "Headphones",
    price: 20000,
  },
];

const App = () => {
  const [priceRange, setPriceRange] = useState([20000, 60000]);
  const [filterAbove50k, setFilterAbove50k] = useState(false);
  const [filterBelow50k, setFilterBelow50k] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  console.log(sortOrder);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProduct = products.filter((product) => {
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    if (filterAbove50k && filterBelow50k) return inPriceRange;
    if (filterAbove50k) return product.price > 50000 && inPriceRange;
    if (filterBelow50k) return product.price <= 50000 && inPriceRange;
    return priceRange;
  });

  const sortedProducts = [...filteredProduct].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  console.log(sortedProducts);
  return (
    <div className="max-w-xl  mx-auto p-4">
      <h1 className="text-[20px] md:text-3xl font-ubuntu font-semibold">
        E-commerce Filter Product
      </h1>
      <div className="mb-4 mt-5">
        <label className="font-opensans font-light block">
          <span className="text-slate-900 font-bold tracking-[2px]">
            Price-Range
          </span>{" "}
          : {`₹ ${priceRange[0]} - ₹ ${priceRange[1]}`}
        </label>
        <Slider
          color="secondary"
          onChange={handlePriceChange}
          value={priceRange}
          valueLabelDisplay="auto"
          min={20000}
          max={60000}
          style={{
            width: "200px",
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        />
      </div>
      <div className="flex gap-3">
        <FormControlLabel
          control={<Checkbox color="warning" />}
          label="Above 50,000"
          checked={filterAbove50k}
          onChange={() => setFilterAbove50k(!filterAbove50k)}
        />
        <FormControlLabel
          control={<Checkbox color="warning" />}
          label="Below 50,000"
          checked={filterBelow50k}
          onChange={() => setFilterBelow50k(!filterBelow50k)}
        />
      </div>
      <div>
        <FormControl sx={{ marginTop: 3, width: 300 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            input={<OutlinedInput label="Sort by Price" />}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-5  md:gap-10 ">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className=" border md:border-none border-slate-500 rounded-lg md:px-3 md:w-[200px] p-2"
          >
            <ul className="  border-green-600">
              <li className="flex space-x-4 md:space-x-1">
                <img
                  src={product.image}
                  className="h-[40px] md:h-[50px]  border border-pink-500 rounded-full p-2 "
                />
                <div>
                  <h1 className="text-[13px] text-purple-800 font-montserrat font-semibold">
                    {product.name}
                  </h1>
                  <p className="text-[14px] font-lobster text-slate-800">
                    Rs.{product.price}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
