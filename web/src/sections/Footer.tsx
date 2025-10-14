import { motion } from "framer-motion";
import { socials } from "../constants/index.js";

const Footer = () => {
  return (
    <footer className="relative border-t border-s3/30">
      {/* Decorative gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-p3/20 to-transparent pointer-events-none"
      />

      <div className="container py-10 relative z-10">
        <div className="flex w-full max-md:flex-col">
          {/* Left - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-compact flex flex-1 flex-wrap items-center justify-center gap-5"
          >
            <div className="flex items-center gap-3">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                src="/images/iconlogo.png"
                alt="CryptoDrop"
                className="size-8 object-contain"
              />
              <p className="opacity-70">
                © {new Date().getFullYear()} CryptoDrop. All rights reserved.
              </p>
            </div>
          </motion.div>

          {/* Center - Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex items-center justify-center sm:ml-auto max-md:mt-6"
          >
            <motion.a
              href="#privacy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="legal-after relative mr-9 text-p5 transition-all duration-500 hover:text-p1 cursor-pointer"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#terms"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="text-p5 transition-all duration-500 hover:text-p1 cursor-pointer"
            >
              Terms of Use
            </motion.a>
          </motion.div>

          {/* Right - Social Icons */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-1 justify-center gap-3 max-md:mt-10 md:justify-end"
          >
            {socials.map(({ id, url, icon, title }, index) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="social-icon"
                  aria-label={title}
                >
                  <img
                    src={icon}
                    alt={title}
                    className="size-1/3 object-contain"
                  />
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 pt-8 border-t border-s3/20 text-center"
        >
          <p className="caption text-p5/60 uppercase tracking-wider">
            Encrypted File Sharing — Built for Privacy
          </p>
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-p3/50 to-transparent origin-center"
      />
    </footer>
  );
};

export default Footer;