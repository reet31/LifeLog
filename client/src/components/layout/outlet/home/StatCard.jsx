const StatCard = ({ title, value, icon }) => {
    return (
        <div className="stat-card">
            <h4>{title}</h4>
            <h2>{value}</h2>
            <p> {icon}</p>
            </div>
    );
}
export default StatCard;