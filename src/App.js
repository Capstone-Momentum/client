import React from 'react';
import AppBar from './components/appbar/AppBar';

// Material UI's theming/styling solution 
// (explained here: https://material-ui.com/customization/theming/ and here https://material-ui.com/styles/basics/)
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Using basic routing solution (explained here: https://reacttraining.com/react-router/web/guides/quick-start)
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Import each container here
import Landing from './containers/Landing';

// Top level component
function App() {

  const landing = (
    <Route path='/'>
      <Landing />
    </Route>
  )

  const pages = [landing]

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Switch>
          {pages}
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App;
