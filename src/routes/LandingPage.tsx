import HowItWorks from '@/sections/About.js';
import Download from '@/sections/Download.js';
import Faq from '@/sections/Faq.js';
import Features from '@/sections/Features.js';
import Footer from '@/sections/Footer.js';
import Header from '@/sections/Header.js';
import Hero from '@/sections/Hero.js';
import Pricing from '@/sections/Pricing.js';
import WhatIsObscyra from '@/sections/What.js';

export default function LandingPage() {
	return (
		<main className="overflow-hidden">
			<Header />
			<Hero />
			<WhatIsObscyra />
			<HowItWorks />
			<Features />
			<Pricing />
			<Faq />
			{/* <Testimonials /> */}
			<Download />
			<Footer />
		</main>
	);
}
