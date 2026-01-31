"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/animations/loading.json";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Lottie animationData={loadingAnimation} style={{ width: 1000, height: 1000 }} loop={true} />
    </div>
  );
}
