import Footer from "../../widgets/Footer";
import Header from "../../widgets/header";
import FAQs from "./faqs";
import Home from "./home";
import HowToPlay from "./howtoplay";

export default function Layout() {
  return (
    <div className="">
      <Header />
      <Home />
      <HowToPlay />
      <FAQs />
      <Footer />
    </div>
  );
}
