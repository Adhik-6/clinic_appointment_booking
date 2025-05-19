import { Link } from "react-router-dom";
import { Footer, Header } from "../components/index.components.js";
import doctor_2 from './../assets/dr_vignesh_1.jpg';

export const About = () => {
  return (
    <>
      <section className="about-section">
        <img src={doctor_2} alt="Dr. Vignesh Image" />
        <div className="about-content">
          <h1>About Dr. Vignesh SV</h1>

          <div className="bio">
            <h2>Biography</h2>
            <p>
              Dr. Vignesh SV M.B.B.S, M.S(Ortho) is a renowned and experienced
              Consultant Orthopaedic Surgeon. He brings with him an experience
              of 2+ years and has been associated with some of the best
              hospitals. A dedicated, compassionate doctor who handles many
              challenging cases with the latest cutting-edge technology. He
              offers patient-friendly scientific advice to your problems while
              maintaining the highest professional and ethical values.
            </p>
          </div>

          <div className="education">
            <h2>Education</h2>
            <p>
              <strong>MBBS</strong>
            </p>
            <p>
              <strong>M.S(Ortho)</strong>
            </p>
          </div>

          <div className="experience">
            <h2>Experience</h2>
            <p>
              2+ years of experience in Orthopaedics, specializing in bone and
              joint treatments.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
