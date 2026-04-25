"use client";

import { useEffect } from "react";

export default function SenjaReviews() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widget.senja.io/widget/1c25abdc-e900-4f4a-8da1-218a1c30fee3/platform.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="senja-embed"
      data-id="1c25abdc-e900-4f4a-8da1-218a1c30fee3"
      data-mode="shadow"
      data-lazyload="false"
      style={{ display: "block", width: "100%" }}
    />
  );
}