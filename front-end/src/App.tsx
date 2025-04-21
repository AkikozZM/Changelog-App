import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ChangelogOverview from "./pages/changelog/Overview";
import ChangelogBasil from "./pages/changelog/Basil";
import ChangelogAcacia from "./pages/changelog/Acacia";

function App() {
  return (
    <Router>
      <main>
        <div className="flex min-h-screen w-full flex-row">
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
            </Routes>
          </Layout>
        </div>
      </main>
    </Router>
  );
}

export default App;
