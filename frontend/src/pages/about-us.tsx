import React from "react";
import { BaseLayout } from "@/layouts";
import AboutUsView from "@/sections/about-us/view";

function AboutUs() {
  return (
    <div className="about-us">
      <BaseLayout is_showcase={false} withMobileLogo={false}>
        <AboutUsView />
      </BaseLayout>
    </div>
  );
}

export default AboutUs;
