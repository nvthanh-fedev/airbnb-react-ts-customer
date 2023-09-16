import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./sliderUtilies.module.css";
import { utilityItems } from "../../Global/Variable";
import { selectedUtility } from "../../Redux/reducers/uiManagementReducer";
import { AppDispatch } from "../../Redux/configStore";
import { useDispatch } from "react-redux";

const SliderUtilities: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 22,
    slidesToScroll: 9,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 12,
          slidesToScroll: 6,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
    ],
  };

  const handleItemClick = (utilityProperty: string) => {
    const newUtilityObject = { [utilityProperty]: true };
    const action = selectedUtility(newUtilityObject);
    dispatch(action);
  };

  const renderUtilityItems = () => {
    const renderedItems: React.JSX.Element[] = [];

    for (let i = 0; i < 10; i++) {
      utilityItems.forEach((item, index) => {
        const key = i * utilityItems.length + index;
        renderedItems.push(
          <div
            className={styles.utilities}
            key={key}
            onClick={() => handleItemClick(item.utilityProperty)}
          >
            <img
              src={item.icon}
              className={styles.customIcon}
              alt="Custom Icon"
            />
            <p>{item.name}</p>
          </div>
        );
      });
    }

    return renderedItems;
  };

  return (
    <Slider {...settings} className={styles.container}>
      {renderUtilityItems()}
    </Slider>
  );
};

export default SliderUtilities;
