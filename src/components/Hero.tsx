import BookingButton from './BookingButton';

interface Props {
	designation: string;
	promise: string;
	support: string;
	buttonText: string;
	note: string;
}

/** The top of the home page: the Designation, the Promise, the button, and beside them the dotted ∞. */
export default function Hero({ designation, promise, support, buttonText, note }: Props) {
	return (
		<section
			aria-labelledby="promise"
			className="page-width grid items-center gap-x-16 gap-y-8 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
		>
			<div>
				<p className="label">{designation}</p>
				<h1
					id="promise"
					data-fade-in
					className="mt-6 max-w-4xl text-[clamp(2.25rem,4.4vw,4.1rem)] leading-[1.05] tracking-[-0.012em]"
				>
					{promise}
				</h1>
				<p className="mt-6 max-w-2xl text-lg text-foreground-secondary">{support}</p>
				<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
					<BookingButton text={buttonText} />
					<p className="text-sm text-foreground-secondary">{note}</p>
				</div>
			</div>
			{/* DottedInfinity draws the ∞ in this box; without JS there is nothing to draw, so no space. */}
			<div
				data-infinity
				aria-hidden="true"
				className="aspect-[5/4] w-full max-w-[22rem] justify-self-center noscript:hidden lg:max-w-[30rem]"
			/>
		</section>
	);
}
