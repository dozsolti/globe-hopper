import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/home/home";
import MapPage from "./pages/map/map";
import SettingsPage from "./pages/settings";
import Error404Page from "./pages/error404";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter basename={import.meta.env.BASE_URL} >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
