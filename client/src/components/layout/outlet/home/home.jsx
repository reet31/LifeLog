import StatCard from "./StatCard";
import "./home.css";

const Home = () => {
  return (
    <div className="home" >
      <h2>Welcome Back!</h2>
      <br></br> 
      <p className="subtitle">

        Here's your personal space to reflect and relax.
      </p>
<hr></hr>
<br></br>
      <h3>Your Home</h3>
        <br></br>
      <div className="card-grid">
        <StatCard
          title="Entries Written"
          value="5 entries"
          text="You've written 5 thoughts so far. Great job!"
        />
        <StatCard
          title="Last Entry"
          value="2 days ago"
          text="You last wrote 2 days ago. Keep it up!"
        />
        <StatCard
          title="Encouraging Quote"
          value="✨"
          text="Every day is a new beginning. Take a deep breath and start again."
        />
      </div>
    </div>
  );
};

export default Home;
