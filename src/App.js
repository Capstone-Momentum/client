import React from 'react';
import AppBar from './components/appbar/AppBar';
import { LANDING, INTERACTIVE_MAP, INITATIVES, CUSTOMIZATION, TUTORIALS, CONTACT_US, ACCOUNT } from './constants';

// Material UI's theming/styling solution 
// (explained here: https://material-ui.com/customization/theming/ and here https://material-ui.com/styles/basics/)
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Using basic routing solution (explained here: https://reacttraining.com/react-router/web/guides/quick-start)
// For when we add authentication this is a good example: https://reacttraining.com/react-router/web/example/auth-workflow
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Containers
import Landing from './containers/Landing';
import InteractiveMap from './containers/InteractiveMap';
import Initiatives from './containers/Initiatives';
import Customization from './containers/Customization';
import Tutorials from './containers/Tutorials';
import ContactUs from './containers/ContactUs';
import Account from './containers/Account';

// Top level component
function App() {

  const landing = (
    <Route path={LANDING} exact>
      <Landing />
    </Route>
  )
  const interactiveMap = (
    <Route path={INTERACTIVE_MAP}>
      <InteractiveMap />
    </Route>
  )
  const initiatives = (
    <Route path={INITATIVES}>
      <Initiatives />
    </Route>
  )
  const customization = (
    <Route path={CUSTOMIZATION}>
      <Customization />
    </Route>
  )
  const tutorials = (
    <Route path={TUTORIALS}>
      <Tutorials />
    </Route>
  )
  const contactUs = (
    <Route path={CONTACT_US}>
      <ContactUs />
    </Route>
  )
  const account = (
    <Route path={ACCOUNT}>
      <Account />
    </Route>
  )

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Switch>
          {landing}
          {interactiveMap}
          {initiatives}
          {customization}
          {tutorials}
          {contactUs}
          {account}
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App;
