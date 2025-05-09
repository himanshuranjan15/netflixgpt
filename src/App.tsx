import { Provider } from "react-redux";
import Body from "./components/Body";
import { appStore, persistorAppStore } from "./utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistorAppStore}>
        <Body />
      </PersistGate>
    </Provider>
  );
}

export default App;
