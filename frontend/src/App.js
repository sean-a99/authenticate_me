import { Route, Switch, Link } from "react-router-dom";
import PostIndexItem from './components/LoginFormPage';

function App() {
  return (
    <>
      <h1>Authenticate Me Shawty</h1>
      <Switch>
        <Route path="/login">
          <PostIndexItem />
          <Link to="/">Back</Link>
        </Route>
        <Route path="/">
          <Link to="/login">Login</Link>
        </Route>
      </Switch>
    </>
  );
}

export default App;
