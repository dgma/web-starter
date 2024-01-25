import { RootLayout } from "components/Layouts";
import { SocialIcons } from "components/SocialIcons";
import { MainBanner } from "components/MainBanner";

function App() {
  return (
    <RootLayout>
      <main>
        <MainBanner />
      </main>
      <footer className="p-6">
        <SocialIcons />
      </footer>
    </RootLayout>
  );
}

export default App;
