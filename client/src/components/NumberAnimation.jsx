import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

function Counter({ from, to, floor }) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 5,
      onUpdate(value) {
        let formattedValue;
        formattedValue = Math.floor(value);
        if (ref.current) {
          ref.current.textContent = formattedValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
    });

    return () => controls.stop();
  }, [from, to, floor]);

  return <span ref={ref} />;
}

export default function NumberAnimation({ number, lastNumber, floor }) {
  return <Counter from={lastNumber} to={number} floor={floor} />;
}
