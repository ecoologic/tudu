import { FC } from "react";
import "./App.css";
import { MainPage } from "./MainPage";

const App: FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>An App</h1>
      </header>
      <main>
        <MainPage />
      </main>
    </div>
  );
};

export default App;
