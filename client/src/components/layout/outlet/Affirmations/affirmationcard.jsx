const AffirmationCard = ({ quote, onNext, onSave }) => {
    return (
        <div className="affirmation-card">
            <p className="quote">"{quote.text}"</p>
            <span className="author">- {quote.author}</span>

            <div className="actions">
                <button onClick={onNext}>Next Affirmation</button>
                <button onClick={onSave}>Save to Favorites</button>
            </div>
            </div>
    );
}
export default AffirmationCard;