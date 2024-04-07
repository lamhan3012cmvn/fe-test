import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { HOCAuth } from "./hocs";
import { Provider } from "react-redux";
import store from "~/store";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {PUBLIC_ROUTES.map((routeItem) => {
              const Component = routeItem.layout ? (
                <routeItem.layout>
                  <routeItem.element />
                </routeItem.layout>
              ) : (
                <routeItem.element />
              );

              return (
                <Route
                  key={routeItem.path}
                  path={routeItem.path}
                  element={Component}
                />
              );
            })}
            0
            {PRIVATE_ROUTES.map((routeItem) => {
              const Component = routeItem.layout ? (
                <HOCAuth roles={routeItem.roles || []}>
                  <routeItem.layout>
                    <routeItem.element />
                  </routeItem.layout>
                </HOCAuth>
              ) : (
                <HOCAuth roles={routeItem.roles || []}>
                  <routeItem.element />
                </HOCAuth>
              );

              return (
                <Route
                  key={routeItem.path}
                  path={routeItem.path}
                  element={Component}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
