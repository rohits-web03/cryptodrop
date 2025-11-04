import { Element } from "react-scroll";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload your file",
      description: "drag & drop",
      icon: "/images/zap.svg"
    },
    {
      number: "02",
      title: "Get a unique share link",
      description: "one-click copy",
      icon: "/images/zap.svg"
    },
    {
      number: "03",
      title: "Receiver downloads",
      description: "via URL or room code",
      icon: "/images/zap.svg"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <Element name="how it works">
        <div className="container py-28 max-md:py-20">
          {/* How It Works */}
          <div className="relative z-2 mb-20 max-md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-16 max-md:mb-12"
            >
              <h2 className="h2 max-md:h3 text-p4 uppercase mb-4">
                How It <span className="text-p3">Works</span>
              </h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="absolute top-16 left-0 right-0 h-0.5 bg-s3/30 max-lg:hidden origin-left"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-lg:gap-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Number circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.2,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 flex items-center justify-center size-32 rounded-full border-2 border-s3 bg-s1 mb-6"
                    >
                      <span className="h3 text-p3">{step.number}</span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                      className="h5 text-p4 mb-2 max-w-[200px]"
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                      className="body-3 text-p5 max-w-[180px]"
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Obscyra */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-2 max-w-4xl mx-auto"
          >
            <div className="relative border-2 border-s3 rounded-7xl bg-s1/50 backdrop-blur-sm p-12 max-md:p-8">
              {/* Decorative gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-p3/10 to-transparent rounded-7xl pointer-events-none"
              />

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h3 max-md:h4 text-p4 uppercase mb-8 text-center"
              >
                Why <span className="text-p3">Obscyra?</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -left-4 -top-2 text-6xl text-p3/30 font-serif max-md:text-4xl">
                  &quot;
                </div>
                <blockquote className="relative z-10 body-1 text-p4 text-center mb-6 max-w-2xl mx-auto px-6">
                  We built Obscyra because we were tired of platforms reading
                  our data &apos;for security reasons.&apos;
                </blockquote>
                <div className="absolute -right-4 -bottom-2 text-6xl text-p3/30 font-serif max-md:text-4xl">
                  &quot;
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-p5 caption uppercase tracking-wider"
              >
                — Team Obscyra
              </motion.p>
            </div>
          </motion.div>

          {/* Background decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-p3/30 to-transparent blur-3xl pointer-events-none max-md:w-64 max-md:h-64"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-radial from-p4/20 to-transparent blur-3xl pointer-events-none max-md:w-64 max-md:h-64"
          />
        </div>
      </Element>
    </section>
  );
};

export default HowItWorks;