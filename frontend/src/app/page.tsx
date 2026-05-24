import HeroSection from "@/components/home/HeroSection"
import MissionSection from "@/components/home/MissionSection"
import TopicsSection from "@/components/home/TopicsSection"
import GlossaryPreview from "@/components/home/GlossaryPreview"
import PartiesSection from "@/components/home/PartiesSection"
import LearningSection from "@/components/home/LearningSection"
import HomeFooter from "@/components/home/HomeFooter"

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TopicsSection />
      <GlossaryPreview />
      <PartiesSection />
      <LearningSection />
      <HomeFooter />
    </>
  )
}
