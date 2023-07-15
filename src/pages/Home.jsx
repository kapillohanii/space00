import React, { useEffect } from "react";
import LoggedinHeader from "../components/LoggedinHeader";
import UserFeedBody from "../components/UserFeedBody";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <LoggedinHeader />
      <UserFeedBody />
      <Footer />
    </div>
  );
}

export default Home;
