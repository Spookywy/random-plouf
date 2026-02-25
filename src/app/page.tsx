import Home from "./[lng]/containers/home";
import { fallbackLng } from "./i18n/settings";

export default function HomePage() {
  return <Home params={Promise.resolve({ lng: fallbackLng })} />;
}
