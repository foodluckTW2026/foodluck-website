import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ForConsumers from "@/components/ForConsumers";
import ForMerchants from "@/components/ForMerchants";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ForConsumers />
      <ForMerchants />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
