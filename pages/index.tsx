import Hero from "@/components/Hero";
import Layout from "@/components/UI/Layout";

export default function Home() {
  return (
    <Layout title="app.hero.meta.title" description="app.hero.meta.description">
      <Hero />
    </Layout>
  );
}
