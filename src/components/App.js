import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-container">
        <Main/>
      </div>
    </>
  );
}

export default App;
