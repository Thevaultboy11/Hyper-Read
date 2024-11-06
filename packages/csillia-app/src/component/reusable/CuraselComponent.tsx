import styles from "../../styles/slider.module.scss";

const Slider = ({ children, index, setIndex, data }: any) => {
  return (
    <>
      <div className={styles.slide_show}>
        <div
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          className={styles.slider}
        >
          {children}
        </div>
      </div>
      <div className={styles.dots_cont}>
        {data.length != 1 && (
          <>
            {data.map((_: any, idx: any) => {
              return (
                <div
                  key={idx}
                  className={
                    styles[`slideshowDot${index === idx ? "_active" : ""}`]
                  }
                  onClick={() => {
                    setIndex(idx);
                  }}
                ></div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
export default Slider;
