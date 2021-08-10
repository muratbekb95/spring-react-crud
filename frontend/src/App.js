import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StudentsList from './components/StudentsList';
import NewStudent from './components/NewStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <Router>
        <Route exact path="/" component={StudentsList} />
        <Route path="/showNewStudentForm" component={NewStudent} />
        <Route path="/showFormForUpdate/:id" component={UpdateStudent} />
    </Router >
  );
}

export default App;
