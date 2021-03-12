import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Route,Link} from "react-router-dom"
import './App.css';
import logo from "./1.jpg"
import CreateTask from "./components/create-task"
import EditTask from "./components/edit-task"
import TaskList from "./components/task-list"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" >
            <img src={logo} width="70" height="70" />
          </a>
          <Link to="/" className="navbar-brand">Task App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Tasks</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Tasks</Link>
                </li>
              </ul>
            </div>
        </nav>


        <Route path="/" exact component={TaskList} />
        <Route path="/edit/:id" component={EditTask} />
        <Route path="/create" component={CreateTask} />
      </div>
    </BrowserRouter>
  );
}

export default App;
