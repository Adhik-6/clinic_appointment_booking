
import { Footer, Header } from "../components/index.components.js";

export const Service = () => {
  return (
    <>
      <section className="services-section">
        <div className="service-box">
          <i className="fas fa-user-md"></i>
          <h2>Orthopaedic Consultations</h2>
          <p>
            We provide expert consultations for a wide range of bone and joint
            issues, offering a personalized treatment plan for each patient.
          </p>
        </div>

        <div className="service-box">
          <i className="fas fa-procedures"></i>
          <h2>Joint Replacement</h2>
          <p>
            Advanced joint replacement procedures, including knee, hip, and
            shoulder replacement surgeries to restore mobility and quality of
            life.
          </p>
        </div>

        <div className="service-box">
          <i className="fas fa-bone"></i>
          <h2>Fracture Care</h2>
          <p>
            Comprehensive care for fractures, including casting, surgical
            intervention, and post-treatment rehabilitation.
          </p>
        </div>

        <div className="service-box">
          <i className="fas fa-running"></i>
          <h2>Sports Injuries</h2>
          <p>
            Specialized treatment for sports-related injuries, from diagnosis
            and non-surgical treatments to rehabilitation and recovery.
          </p>
        </div>

        <div className="service-box">
          <i className="fas fa-bone"></i>
          <i className="fas fa-syringe"></i>
          <h2>Arthroscopy & Bone Joint</h2>
          <p>
            Minimally invasive arthroscopic surgeries for joint issues and
            comprehensive bone joint treatments to improve mobility and restore
            function.
          </p>
        </div>
      </section>

    </>
  );
};
