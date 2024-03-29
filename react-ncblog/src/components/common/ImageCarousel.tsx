import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: Array<{ url: string; caption: string }>;
}

const ImageCarousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = useCallback(() => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 7000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, nextImage]);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <>
      <div className="h-[450px] md:h-[880px] w-full m-auto py-8 relative group">
        <div
          style={{ backgroundImage: `url(${images[currentIndex].url})` }}
          className="w-full h-full rounded-0 bg-center bg-cover duration-500 bg-no-repeat"
        ></div>

        {/* Left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevImage} size={30} />
        </div>

        {/* Left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextImage} size={30} />
        </div>

        {/* Dots */}
        <div className="flex top-4 justify-center py-2">
          {images.map((_image, index) => (
            <div
              key={index}
              onClick={() => goToImage(index)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
        <Box bg="rgba(0, 0, 0, 0.35)" p="2" rounded="md" position="absolute" top="10" left="4" color="white">Scroll down to see the latest posts</Box>
      </div>
    </>
  );
};

export default ImageCarousel;
