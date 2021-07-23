import React, { useState, useEffect } from "react";
import { useSpringCarousel } from "react-spring-carousel-js";

import styles from "./Main.module.css";
import { LeftSlider } from "../../../assets/icon/LeftSlider";
import { RightSlider } from "../../../assets/icon/RightSlider";
export default function Main() {
  const words = ["THE LAST TREND IS HERE"];
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      springConfig: {
        easing: 400,
      },
      withLoop: true,
      items: [
        {
          id: "1",
          renderItem: (
            <div>
              <img className={styles.main_image} src="/main_image.png" alt="" />
              <div
                style={{ backgroundColor: "#CC021C", zIndex: "-10" }}
                className={styles.background}
              ></div>
            </div>
          ),
        },
        {
          id: "2",
          renderItem: (
            <div>
              <div
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80)",
                  backgroundRepeat: "no-repeat",
                }}
                className={styles.background}
              ></div>
            </div>
          ),
        },
        {
          id: "3",
          renderItem: (
            <div>
              <div
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80)",
                }}
                className={styles.background}
              ></div>
            </div>
          ),
        },
      ],
    });

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter effect
  useEffect(() => {
    if (index === words.length) return;

    if (
      subIndex === words[index].length + 1 &&
      index !== words.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 100 : 100, parseInt(Math.random() * 1)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink, words]);

  return (
    <div>
      <div className={styles.back}></div>
      <div className={styles.heading_container}>
        <h1 className={styles.absolute_h1}>
          {`${words[index].substring(0, subIndex)}${blink ? "" : " "}`}
        </h1>
      </div>
      <div className={styles.absolute_center}>{carouselFragment}</div>
      <div className={styles.max_width}>
        <div className={styles.fill_container}>
          <button
            type="prev"
            onClick={slideToPrevItem}
            className={styles.chervon_left}
          >
            <LeftSlider />
          </button>
          <button
            type="next"
            onClick={slideToNextItem}
            className={styles.chervon_right}
          >
            <RightSlider />
          </button>
        </div>
      </div>
      <button className={styles.cta_btn}>GET IT NOW</button>
    </div>
  );
}