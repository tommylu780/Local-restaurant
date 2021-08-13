import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Landing from './pages/Landing'
import Navbar from "./components/Navbar"
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OrderHistory from "./pages/OrderHistory"
import Success from "./pages/Success"
import Detail from "./pages/Detail"
import Error from "./pages/Error"
import { StoreProvider } from "./utils/GlobalState"

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Navbar />
            <Switch>
              <Route exact path ='/' component={Landing} />
              <Route exact path ='/shop' component={Shop} />
              <Route exact path ='/login' component={Login} />
              <Route exact path ='/signup' component={Signup} />
              <Route exact path ='/success' component={Success} />
              <Route exact path ='/orderHistory' component={OrderHistory} />
              <Route exact path ='/products/:id' component={Detail} />
              <Route component={Error} />
            </Switch>
        </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}



export default App;


