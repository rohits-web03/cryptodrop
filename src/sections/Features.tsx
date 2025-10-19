import { details, features } from '@/constants/index.js';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';

const Features = () => {
	return (
		<section>
			<Element name="features">
				<div className="container">
					<div className="relative flex md:flex-wrap flex-nowrap border-2 border-s3 rounded-7xl md:overflow-hidden max-md:flex-col feature-after md:g7 max-md:border-none max-md:rounded-none max-md:gap-3">
						{features.map(({ id, icon, caption, title, text }, index) => (
							<motion.div
								key={id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px', amount: 0.3 }}
								transition={{
									duration: 0.5,
									delay: index * 0.15,
									ease: 'easeOut',
								}}
								className="relative z-2 md:px-10 px-5 md:pb-10 pb-5 flex-50 max-md:g7 max-md:border-2 max-md:border-s3 max-md:rounded-3xl max-md:flex-320"
							>
								<div className="w-full flex justify-start items-start">
									<div className="-ml-3 mb-12 flex items-center justify-center flex-col">
										<motion.div
											initial={{ scaleY: 0 }}
											whileInView={{ scaleY: 1 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{
												duration: 0.4,
												delay: index * 0.15 + 0.2,
												ease: 'easeOut',
											}}
											className="w-0.5 h-16 bg-s3 origin-top"
										/>

										<motion.img
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{
												duration: 0.4,
												delay: index * 0.15 + 0.3,
												ease: 'easeOut',
											}}
											whileHover={{ scale: 1.05 }}
											src={icon}
											className="size-28 object-contain"
											alt={title}
										/>
									</div>
								</div>

								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
									className="caption mb-5 max-md:mb-6"
								>
									{caption}
								</motion.p>

								<motion.h2
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.4, delay: index * 0.15 + 0.45 }}
									className="max-w-400 mb-7 h3 text-p4 max-md:mb-6 max-md:h5"
								>
									{title}
								</motion.h2>

								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
									className="mb-11 body-1 max-md:mb-8 max-md:body-3"
								>
									{text}
								</motion.p>
								{/* <Button icon={button.icon}>{button.title}</Button>*/}
							</motion.div>
						))}

						<ul className="relative flex justify-around flex-grow px-[5%] border-2 border-s3 rounded-7xl max-md:hidden">
							<motion.div
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
								className="absolute bg-s3/20 top-[38%] left-0 right-0 w-full h-[1px] z-10 origin-left"
							/>

							{details.map(({ id, icon, title }, index) => (
								<motion.li
									key={id}
									initial={{ opacity: 0, scaleY: 0 }}
									whileInView={{ opacity: 1, scaleY: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{
										duration: 0.4,
										delay: index * 0.1 + 0.4,
										ease: 'easeOut',
									}}
									className="relative pt-16 px-4 pb-14"
								>
									<motion.div
										initial={{ scaleY: 0 }}
										whileInView={{ scaleY: 1 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{
											duration: 0.4,
											delay: index * 0.1 + 0.5,
											ease: 'easeOut',
										}}
										className="absolute top-8 bottom-0 left-1/2 bg-s3/20 w-[1px] h-full z-10 origin-top"
									/>

									<motion.div
										whileHover={{ scale: 1.08 }}
										transition={{ duration: 0.2 }}
										className="flex items-center justify-center mx-auto mb-3 border-2 border-s2 rounded-full hover:border-s4 transition-all duration-500 shadow-500 size-20"
									>
										<img
											src={icon}
											alt={title}
											className="size-17/20 object-contain z-20"
										/>
									</motion.div>

									<h3 className="relative z-2 max-w-36 mx-auto my-0 base-small text-center uppercase">
										{title}
									</h3>
								</motion.li>
							))}
						</ul>
					</div>
				</div>
			</Element>
		</section>
	);
};

export default Features;
