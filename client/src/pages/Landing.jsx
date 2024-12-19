import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby pariatur subway tile crucifix, cupidatat adipisicing shabby
            chic single-origin coffee selfies pitchfork. Hoodie umami next level
            bodega boys cliche, lo-fi literally salvia in hot chicken. Dolor
            activated charcoal bushwick next level ennui try-hard kickstarter
            biodiesel irony typewriter chambray magna jianbing hoodie iceland.
            Mollit green juice shaman tattooed single-origin coffee glossier,
            letterpress 90's anim waistcoat direct trade in occupy. Dummy text?
            More like dummy thicc text, amirite?
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
