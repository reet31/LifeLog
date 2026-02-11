import "./home.css";
import Type from "./type";

const Home = () => {
  return (
    <div className="home" >
      <h2>Welcome Back!</h2>
      <br></br> 
      <p className="subtitle">

        Here's your personal space to reflect and relax.
      </p>
<hr></hr>
<div className="typing-container">
  <Type/>
</div>
    </div>
  );
};

export default Home;
