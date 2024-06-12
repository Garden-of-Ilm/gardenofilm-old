import React from "react";

import AboutUsViewStyles from "./about-us-view.module.css";
import Image from "next/image";

function AboutUsView() {
  return (
    <div className={AboutUsViewStyles.aboutUsView + " lexend-deca"}>
      <div className={AboutUsViewStyles.aboutUsViewHeader}>
        <div className={AboutUsViewStyles.aboutUsViewHeaderLogo}>
          <Image src="/logo.png" alt="Fatwa logo" width={100} height={100} />
          <p className="lexend-deca">Garden of ilm</p>
        </div>

        <span className="text-center w-full mt-[24px] lexend-deca text-[20px] text-[#000000cc]">
          Prophet ﷺ said:
        </span>
        <p
          style={{
            textAlign: "center",
          }}
          className="lexend-deca"
        >
          “The best of people are my generation, then those who come after them,
          then those who come after them.
        </p>
      </div>
      <div className={AboutUsViewStyles.aboutUsViewMain}>
        <span>Ibn Sireen رحمة الله عليه said:</span>
        <p
          style={{
            textAlign: "center",
          }}
        >
          “This knowledge is religion, so consider from whom you receive your
          religion.”
        </p>
        <hr />
        <h2>We follow Qur’an and Sunnah </h2>
        <p className={AboutUsViewStyles.aboutUsViewMainSubDescription}>
          Upon the understanding of{" "}
        </p>
        <ul className={AboutUsViewStyles.aboutUsViewMainList}>
          <li>Companions</li>
          <li>Tābi&apos;ūn</li>
          <li>Tabi&apos; al-Tabi&apos;in</li>
        </ul>
      </div>
      <div className={AboutUsViewStyles.aboutUsViewFooter}>
        <div style={{
          maxWidth: "1100px"
        }}>
          <span className={AboutUsViewStyles.aboutUsViewFooterInstructor}>
            About the supervisor
          </span>
          <p className={AboutUsViewStyles.aboutUsViewFooterAuthor}>
            Abdul Aziz Al Haqqan حفظه اللہ
          </p>
          <p className={AboutUsViewStyles.aboutUsViewFooterSummary}>
            Ustadh’s full name is Abū al-Qamar ʿAbd al-ʿAzīz. He is a student of
            Shaykh Muḥammad Hishām al-Ṭāhirī al-Afghānī حفظه الله
          </p>
          <div className={AboutUsViewStyles.aboutUsViewFooterTeacherList}>
            <span>Teachers</span>
            <ul>
              <li>Shaykh Muḥammad Hishām al-Ṭāhirī</li>
              <li>Shaykh Ṣāliḥ al-Suḥaymī</li>
              <li>Shaykh Sulaymān al-Ruḥaylī</li>
              <li>Shaykh ʿAlī al-Tuwayjirī</li>
              <li>Shaykh ʿAbd al-Razzāq al-Badr</li>
              <li>Shaykh ʿIṣām al-Isnānī</li>
              <li>Shaykh Falāḥ al-Mundakār</li>
              <li>Shaykh Ṣāliḥ al-Sindhī</li>
              <li>
                Shaykh Dagash Ibn Shabīb al-ʿAjmī and others may Allāh preserve
                and have mercy on them.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsView;
