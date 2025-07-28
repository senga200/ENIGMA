import FavorisList from "../components/FavorisList"; 
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="favoris-container">
      <section>
        <div className="dashboard-container">
          <FavorisList />
        </div>
      </section>          
    </div>
  );
}

export default Dashboard;
