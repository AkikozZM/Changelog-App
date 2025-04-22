import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ChangelogOverview from "./pages/changelog/Overview";
import ChangelogBasil from "./pages/changelog/Basil";
import ChangelogAcacia from "./pages/changelog/Acacia";
import ChangelogDetail from "./pages/changelog/Detail";

function App() {
  return (
    <Router>
      <main>
        <div className="w-full h-full">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route
                path="/changelog/overview"
                element={<ChangelogOverview />}
              />
              <Route path="/changelog/basil" element={<ChangelogBasil />} />
              <Route path="/changelog/acacia" element={<ChangelogAcacia />} />
              <Route
                path="/changelog/entry/:date/:index"
                element={<ChangelogDetail />}
              />
            </Routes>
          </Layout>
        </div>
      </main>
    </Router>
  );
}

export default App;
