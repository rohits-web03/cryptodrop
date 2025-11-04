import { Element } from "react-scroll";
import { motion } from "framer-motion";

const WhatIsObscyra = () => {
  const features = [
    { text: "No installs", icon: "✓" },
    { text: "No tracking", icon: "✓" },
    { text: "No nonsense", icon: "✓" }
  ];

  return (
    <section className="relative overflow-hidden">
      <Element name="what-is-obsycra">
        <div className="container py-28 max-md:py-20">
          <div className="relative z-2 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 max-lg:gap-12 items-center">
              {/* Left side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="caption small-2 uppercase text-p3 mb-4"
                >
                  What is Obscyra?
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h2 max-md:h3 text-p4 mb-6 max-w-lg"
                >
                  Simple, Fast, and{" "}
                  <span className="text-p3">Private</span> File Sharing
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="body-1 text-p4 mb-8 max-w-lg leading-relaxed"
                >
                  <b>Obscyra</b> server-based hybrid
                  sharing platform that ensures your files are end-to-end
                  encrypted — whether you&apos;re sharing with one friend or a team.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-s3 bg-s1/50 backdrop-blur-sm"
                    >
                      <span className="text-p3 font-bold text-lg">
                        {feature.icon}
                      </span>
                      <span className="base-bold text-p4">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative border-2 border-s3 rounded-7xl bg-s1/50 backdrop-blur-sm p-12 max-md:p-8">
                  {/* Decorative elements */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-br from-p3/10 via-transparent to-p4/10 rounded-7xl pointer-events-none"
                  />

                  {/* Icon grid */}
                  <div className="relative z-10 grid grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl border border-s3 bg-s2/30"
                    >
                      <div className="size-16 rounded-full bg-p1/20 flex items-center justify-center mb-3">
                        <span className="text-2xl"><img src="/images/detail-2.png" /></span>
                      </div>
                      <span className="base-bold text-p4 text-center">
                        End-to-End Encrypted
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl border border-s3 bg-s2/30"
                    >
                      <div className="size-16 rounded-full bg-p1/20 flex items-center justify-center mb-3">
                        <span className="text-2xl"><img src="/images/detail-4.png" /></span>
                      </div>
                      <span className="base-bold text-p4 text-center">
                        Instant Transfer
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl border border-s3 bg-s2/30"
                    >
                      <div className="size-16 rounded-full bg-p1/20 flex items-center justify-center mb-3">
                        <span className="text-2xl"><img src="/images/detail-1.png" /></span>
                      </div>
                      <span className="base-bold text-p4 text-center">
                        Cloud Native
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl border border-s3 bg-s2/30"
                    >
                      <div className="size-16 rounded-full bg-p1/20 flex items-center justify-center mb-3">
                        <span className="text-2xl text-p1"><img src="/images/detail-3.png" /></span>
                      </div>
                      <span className="base-bold text-p4 text-center">
                        Team Ready
                      </span>
                    </motion.div>
                  </div>

                  {/* Center logo/badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 mt-3  rounded-full border-2 border-s3 bg-s1 flex items-center justify-center shadow-lg"
                  >
                    <img
                      src="/images/iconlogo.png"
                      alt="Obscyra"
                      className="size-12 object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-p3/40 to-transparent blur-3xl pointer-events-none max-md:w-64 max-md:h-64"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-p4/30 to-transparent blur-3xl pointer-events-none max-md:w-64 max-md:h-64"
          />
        </div>
      </Element>
    </section>
  );
};

export default WhatIsObscyra;