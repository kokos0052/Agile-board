import {observer} from "mobx-react-lite";
import Dashboard from './componets/dashboard';
import Header from "./componets/header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  )
}

export default observer(App);
