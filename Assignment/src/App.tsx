import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import jsonData from "../public/api/cars.json";
import forward from "/images/chevron-circled.svg";
import CarDetails from "./CarDetails";
const defaultView = () => {
  if (window.innerWidth < 769) return true;
  return false;
};
export default function App() {
  const [step, setStep] = useState<number>(0);
  const [bodyType, setBodyType] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(() => defaultView());
  const timerRef = useRef<NodeJS.Timer>();
  const getCarsData = async () => {
    fetch("../public/api/cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson, "json");
      });
  };
  function checkWidth() {
    if (window.innerWidth < 769) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  const filteredCars = useMemo(
    () => jsonData.filter((e) => e.bodyType.toLowerCase().includes(bodyType)),
    [jsonData, bodyType]
  );

  const timerFun = () => {
    setStep(
      (prev: number) =>
        ((prev + 1) % Math.floor(filteredCars.length / 4)) +
        (filteredCars.length % 4 === 0 ? 0 : 1)
    );
  };

  useEffect(() => {
    getCarsData();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && timerRef.current) clearInterval(timerRef.current);
    if (isMobile) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(timerFun, 5000);
    }
  }, [isMobile]);

  const uniqueBodyTypes = useMemo(
    () => [...new Set(jsonData.map((e) => e.bodyType))],
    [jsonData]
  );

  console.log(isMobile);
  return (
    <>
      <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
        <option value="">All</option>
        {uniqueBodyTypes.map((e: string) => (
          <option value={e}>{e}</option>
        ))}
      </select>
      <div className="App">
        {filteredCars.slice(0 + step * 4, (1 + step) * 4).map((e) => (
          <CarDetails key={e.id} details={e} />
        ))}
      </div>
      {isMobile ? (
        <div className="dots-ctn">
          {new Array(
            Math.floor(filteredCars.length / 1) +
              (filteredCars.length % 1 === 0 ? 0 : 1)
          )
            .fill(1)
            .map((e: number, idx: number) => {
              return (
                <div
                  className={`dots ${idx === step ? "active" : ""}`}
                  onClick={() => setStep(idx)}
                ></div>
              );
            })}
        </div>
      ) : (
        <div className="action-btn">
          {step > 0 && (
            <img
              src={forward}
              alt=""
              className="backward-img"
              onClick={() => setStep((prev) => prev - 1)}
            />
          )}

          {step + 1 <
            Math.floor(filteredCars.length / 4) +
              (filteredCars.length % 4 === 0 ? 0 : 1) && (
            <img
              src={forward}
              alt=""
              className="forward-img"
              onClick={() => setStep((prev) => prev + 1)}
            />
          )}
        </div>
      )}
      <div className="page-no">Page No. {step + 1}</div>
    </>
  );
}
