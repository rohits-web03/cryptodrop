import Button from '@/components/Button.js';
import { plans } from '@/constants/index.js';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CountUp from 'react-countup';
import { Element } from 'react-scroll';

const Pricing = () => {
	const [monthly, setMonthly] = useState(false);

	return (
		<section>
			<Element name="pricing">
				<div className="container">
					<div className="max-w-960 pricing-head_before relative mx-auto border-l border-r border-s2 bg-s1/50 pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
						<motion.h3
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm px-4"
						>
							Flexible pricing for teams of all sizes
						</motion.h3>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
							className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-s4/25 bg-s1/50 p-2 backdrop-blur-[6px] max-md:w-[310px] max-sm:w-[280px]"
						>
							<button
								className={clsx('pricing-head_btn', monthly && 'text-p4')}
								onClick={() => setMonthly(true)}
							>
								Monthly
							</button>
							<button
								className={clsx('pricing-head_btn', !monthly && 'text-p4')}
								onClick={() => setMonthly(false)}
							>
								Annual
							</button>

							<motion.div
								animate={{ x: monthly ? 0 : '100%' }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="g4 rounded-14 before:h-100 pricing-head_btn_before absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] overflow-hidden shadow-400"
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="pricing-bg"
						>
							<img
								src="/images/bg-outlines.svg"
								width={960}
								height={380}
								alt="outline"
								className="relative z-2"
							/>
							<img
								src="/images/bg-outlines-fill.png"
								width={960}
								height={380}
								alt="outline"
								className="absolute inset-0 opacity-5 mix-blend-soft-light"
							/>
						</motion.div>
					</div>

					{/* Pricing section - responsive layout */}
					<div className="relative z-2 -mt-12 flex flex-col items-center justify-center gap-8 px-4 max-xl:gap-5 max-xl:pt-6 md:flex-row md:items-start">
						{plans.map((plan, index) => (
							<motion.div
								key={plan.id}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.5,
									delay: index * 0.15,
									ease: 'easeOut',
								}}
								whileHover={{ y: -8 }}
								className="pricing-plan_first pricing-plan_last pricing-plan_odd pricing-plan_even relative w-full border-2 p-7 max-w-[460px] max-lg:rounded-3xl md:w-[460px]"
							>
								{index === 1 && (
									<motion.div
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
										className="g4 absolute h-330 left-0 right-0 top-0 z-1 rounded-tl-3xl rounded-tr-3xl"
									/>
								)}

								<motion.div
									initial={{ opacity: 0, scale: 0.5, y: -20 }}
									whileInView={{ opacity: 1, scale: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.15 + 0.2,
										ease: 'easeOut',
									}}
									className={clsx(
										'absolute left-0 right-0 z-2 flex items-center justify-center',
										index === 1 ? '-top-6 max-md:-top-4' : '-top-6 max-md:-top-4 xl:-top-11'
									)}
								>
									<img
										src={plan.logo}
										alt={plan.title}
										className={clsx(
											'object-contain drop-shadow-2xl',
											index === 1 ? 'size-[120px] max-md:size-[100px]' : 'size-[88px] max-md:size-[70px]'
										)}
									/>
								</motion.div>

								<div
									className={clsx(
										'relative flex flex-col items-center',
										index === 1 ? 'pt-24 max-md:pt-20' : 'pt-12 max-md:pt-10'
									)}
								>
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
										className={clsx(
											'small-2 rounded-20 relative z-2 mx-auto mb-6 border-2 px-4 py-1.5 uppercase max-md:text-xs max-md:mb-4',
											index === 1 ? 'border-p3 text-p3' : 'border-p1 text-p1'
										)}
									>
										{plan.title}
									</motion.div>

									<motion.div
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
										className="relative z-2 flex items-center justify-center"
									>
										<div
											className={clsx(
												'h-num flex items-start max-md:text-5xl',
												index === 1 ? 'text-p3' : 'text-p4'
											)}
										>
											₹{' '}
											<CountUp
												start={plan.priceMonthly as number}
												end={
													(monthly
														? plan.priceMonthly
														: plan.priceYearly) as number
												}
												duration={0.4}
												useEasing={false}
												preserveValue
											/>
										</div>
										<div className="small-1 relative top-3 ml-1 uppercase max-md:text-xs max-md:top-2">
											/ mo
										</div>
									</motion.div>
								</div>

								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
									className={clsx(
										'body-1 relative z-2 mb-10 w-full border-b-s2 pb-9 text-center text-p4 max-md:mb-6 max-md:pb-6 max-md:text-sm',
										index === 1 && 'border-b'
									)}
								>
									{plan.caption}
								</motion.div>

								<motion.ul
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
									className="mx-auto space-y-4 xl:px-7 max-md:space-y-3"
								>
									{plan.features.map((feature, featureIndex) => (
										<motion.li
											key={feature}
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{
												duration: 0.3,
												delay: index * 0.15 + 0.7 + featureIndex * 0.05,
											}}
											className="relative flex items-center gap-5 max-md:gap-3"
										>
											<img
												src={'/images/check.png'}
												alt="check"
												className="size-10 object-contain max-md:size-8 flex-shrink-0"
											/>
											<p className="flex-1 max-md:text-sm">{feature}</p>
										</motion.li>
									))}
								</motion.ul>

								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.15 + 0.8 }}
									className="mt-10 flex w-full justify-center max-md:mt-6"
								>
									<Button icon={plan.icon}>Get Started</Button>
								</motion.div>

								{index === 1 && (
									<motion.p
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.15 + 0.9 }}
										className="small-compact mt-9 text-center text-p3 before:mx-2.5 before:content-['-'] after:mx-2.5 after:content-['-'] max-md:mt-6 max-md:text-xs"
									>
										Limited time offer
									</motion.p>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</Element>
		</section>
	);
};

export default Pricing;