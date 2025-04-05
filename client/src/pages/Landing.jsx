import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect, useState } from 'react';
import useAIText from '../hooks/useAIText';

const Landing = () => {
  const DEFAULT_TEXT = `Tired of scattered job applications and missed opportunities? Take control of your career journey with our intuitive job tracker! Effortlessly organize your applications, track your progress, and manage important deadlines. Visualize your success, identify areas for improvement, and watch your career prospects grow. Let us help you land your dream job, one organized step at a time. Start tracking smarter today!`; // Your original text
  const { text, isLoading } = useAIText(DEFAULT_TEXT);

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
            {isLoading ? (
              <span className="loading-text">Optimizing your career journey...</span>
            ) : (
              text
            )}
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
