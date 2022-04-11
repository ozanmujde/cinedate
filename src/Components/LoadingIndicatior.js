import { MotiView } from "moti";
import React from "react";
const LoadingIndicator = ({ size }) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        shadowOpacity: 0.26,
      }}
      animate={{
        // width: size * 1.5,
        // height: size * 1.5,
        // borderRadius: size * 1.5 / 2,
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1,
      }}
      transition={{
        duration: 1000,
        type: "timing",
        loop: true,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#6200ed",
        shadowColor: "#6200ed",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      }}
    />
  );
};

export default LoadingIndicator;
