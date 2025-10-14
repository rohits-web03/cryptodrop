import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useState } from "react";
import { faq } from "../constants/index.js";
import FaqItem from "../components/FaqItem.js";

const Faq = () => {
  const halfLength = Math.floor(faq.length / 2);
const [activeId, setActiveId] = useState<string | number | null>(null);


  return (
    <section>
      <Element name="faq" className="relative">
        <div className="container relative z-2 py-28">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h3 max-md:h5 max-w-640 max-lg:max-w-md mb-7 text-p4"
            >
              Curiosity didn&apos;t kill the cat, it gave it answers.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="body-1 max-lg:max-w-sm"
            >
              You&apos;ve got questions, we&apos;ve got answers.
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-s2 origin-top"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="faq-glow_before relative z-2 border-2 border-s2 bg-s1"
        >
          <div className="container flex gap-10 max-lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 border-s2 bg-s1"
            >
              <img src="/images/iconlogo.png" alt="logo" className="size-1/2" />
            </motion.div>

            <div className="relative flex-1 pt-24">
              {faq.slice(0, halfLength).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <FaqItem 
                    item={item} 
                    index={index} 
                    activeId={activeId}
                    setActiveId={setActiveId}
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative flex-1 lg:pt-24">
              {faq.slice(halfLength).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <FaqItem 
                    item={item} 
                    index={halfLength + index} 
                    activeId={activeId}
                    setActiveId={setActiveId}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="faq-lin_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-s2 max-lg:hidden origin-top"
          />
        </motion.div>
      </Element>
    </section>
  );
};

export default Faq;