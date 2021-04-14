// import logo from './logo.svg';
import './App.css';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Error from './Pages/Error';
import Footer from './Components/Footer';
import OwnerDashboard from './Pages/OwnerDashboard'
import CustomerDashboard from './Pages/CustomerDashboard'
import DishDetail from './Pages/DishDetail'
import Owner_dish_detail from './Pages/Owner_dish_detail'

function App() {
  return (
    <>
      <Router>
            <NavBar />
            <Switch>
                <Route exact path='/'><Home /></Route>
                <Route exact path='/about'><About /></Route>
                <Route exact path='/owner_dashboard/:id'><OwnerDashboard /></Route>
                <Route exact path='/customer_dashboard/:id'><CustomerDashboard /></Route>
                <Route exact path='/dish_detail/:id'><DishDetail /></Route>
                <Route exact path="/owner_dish_detail/:id"><Owner_dish_detail /></Route>
                <Route exact path='*'><Error /></Route>
            </Switch>
            <Footer />
        </Router>
    </>
  );
}

export default App;
