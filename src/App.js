import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <div className="d-flex flex-column flex-fill">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
