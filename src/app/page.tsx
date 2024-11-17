import Headerlanding from "@/components/Headerlanding";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-white">
      <Headerlanding />
      <Hero
        heading="Welcome to ThriveAgro"
        message="A platform tailored for farmers to  manage their inventory, voice their concerns, and access the highest bid."
      />
      <section className="bg-white" id="features">
        <Features />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </div>
  );
}
