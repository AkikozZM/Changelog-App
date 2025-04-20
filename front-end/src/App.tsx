import Layout from "./components/Layout";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <main>
      <div className="flex min-h-screen w-full flex-row">
        <Layout>
          <Onboarding />
        </Layout>
      </div>
    </main>
  );
}

export default App;
