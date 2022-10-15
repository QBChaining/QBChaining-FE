import Layout from "./components/common/Layout";
import Router from "./shared/Router";
import { getCookie } from "./utils/cookie";
import { useDispatch } from "react-redux";
import { logIn } from "./redux/modules/userSlice";
import RouterChangeTracker from "./utils/RouterChangeTracker";

function App() {
  RouterChangeTracker();

  const dispatch = useDispatch();
  if (getCookie("token")) {
    dispatch(logIn());
  }
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
