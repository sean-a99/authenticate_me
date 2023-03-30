import { Route, Switch } from "react-router-dom";
import PostIndexItem from './components/LoginFormPage';

function App() {
  return (
    <>
      <h1>Hello from App bruh</h1>
      <Switch>
        <Route path="/login">
          <PostIndexItem />
        </Route>
      </Switch>
    </>
  );
}

export default App;
