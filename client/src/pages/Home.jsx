import { Link } from "react-router-dom";
import doctor_1 from './../assets/dr_vignesh_1.jpg'
import { Footer, Header } from "../components/index.components.js";

export const Home = () => {
  return (
    <>

      <section className="hero">
        <div className="hero-content">
          <h1>Personal care for your healthy living</h1>
          <p>
            We offer expert care and advanced treatment for bone and joint
            conditions to keep you active and pain-free. Book your appointment
            now!
          </p>
          <Link to="/contact" className="btn">
            Book Now
          </Link>
        </div>
        <div>
          <img src={doctor_1} alt="Doctor Image" />
        </div>
      </section>

      <div className="doctor-info">
        <h3>Dr. S.V. Vignesh</h3>
        <p>MBBS, MS(ORTHO)</p>
        <p>MMC Chennai</p>
      </div>

    </>
  );
};
