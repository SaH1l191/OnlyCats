import { ModeToggle } from "@/components/ModeToggle"
import HeroSection from "./HeroSection"
import TodaysHighlight from "./TodaysHighlight"
import RotatedText from "@/components/decorators/RotatedText"
import MasonryGrid from "./MasonryGrid"
import Features from "./Features"
import Testimonials from "./Testimonials"
import MarqueeTestimonials from "./MarqueeTestimonials"
import Pricing from "@/components/pricing"
import Team from "./Team"


const AuthScreen = () => {
  return (
    <div className="flex flex-col">
      <ModeToggle />
      <HeroSection />

      <div className="mb-20 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className='text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center'>
            Today's{" "}
            <span className="underline decoration-orange-400 underline-offset-8 md:underline-offset-[12px] decoration-wavy">Highlight</span>
            <span className='text-2xl md:text-4xl ml-1'>🔥</span>
          </p>

          <div className="flex flex-col gap-10 mt-10 ">
            <TodaysHighlight />
            <div className="mt-24">
              <p className="font-bold text-2xl md:text-5xl text-center tracking-tighter">
                Meet the <RotatedText>Stars</RotatedText> of Our Farm
              </p>

              <MasonryGrid />
            </div>
            <Features />
            <Testimonials />

          </div>
        </div>
        <MarqueeTestimonials />
        <div className="max-w-6xl mx-auto px-4">
          <Pricing />
          <Team/>
        </div>

      </div>
    </div>
  )
}

export default AuthScreen