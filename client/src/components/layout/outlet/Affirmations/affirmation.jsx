import React from "react";
import "./affirmation.css";
import AffirmationCard from "./affirmationcard";
import { useState,useEffect } from "react";


const API_URL = "https://dummyjson.com/quotes/random";


const Affirmations = () => {
    const [quote, setQuote] = useState(null);
    const [favorite ,setFavorite] = useState    (
        JSON.parse(localStorage.getItem("favorite")) || []
    );
    const [loading, setLoading] = useState(false);

const fetchQuotes = async () => {
  setLoading(true);
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    setQuote({
      text: data.quote,
      author: data.author,
      id: Date.now(),
    });
  } catch (err) {
    console.error("Error fetching quote:", err);
  }
  setLoading(false);
};

    const saveFavorite=()=>{
        if(!favorite.some(f=>f.text===quote.text)){
            const updated=[...favorite,quote];
            setFavorite(updated);
            localStorage.setItem("favorite",JSON.stringify(updated));
        }
    };
    const deleteFavorite=(id)=>{
        const updated=favorite.filter(f=>f.id!==id);
        setFavorite(updated);
        localStorage.setItem("favorite",JSON.stringify(updated));
    };
    useEffect(()=>{
        fetchQuotes();
    },[]);
    return (
        <div className="affirmations">
             <h2>🌸 Daily Affirmation</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    quote && (
                        <AffirmationCard
                            quote={quote}
                            onNext={fetchQuotes}
                            onSave={saveFavorite}
                        />
                    )
                )}
              <div className="divider">
  <h3>💖 Saved Affirmations</h3>

  <div className="saved-list">
    {favorite.map(fav => (
      <div key={fav.id} className="fav-card">
        <p>"{fav.text}"</p>
        <span>- {fav.author}</span>
        <button onClick={() => deleteFavorite(fav.id)}>Delete</button>
      </div>
    ))}
  </div>
</div>
        </div>
    );
};export default Affirmations;
  