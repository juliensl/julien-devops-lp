import BookingButton from './BookingButton';

interface Props {
	designation: string;
	promise: string;
	support: string;
	buttonText: string;
	note: string;
}

/** The top of the home page: the Designation, the Promise and the button. The ∞ comes with #72. */
export default function Hero({ designation, promise, support, buttonText, note }: Props) {
	return (
		<section aria-labelledby="promise" className="page-width py-16 sm:py-24">
			<p className="label">{designation}</p>
			<h1
				id="promise"
				className="mt-6 max-w-4xl text-[clamp(2.25rem,4.4vw,4.1rem)] leading-[1.05] tracking-[-0.012em]"
			>
				{promise}
			</h1>
			<p className="mt-6 max-w-2xl text-lg text-foreground-secondary">{support}</p>
			<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
				<BookingButton text={buttonText} />
				<p className="text-sm text-foreground-secondary">{note}</p>
			</div>
		</section>
	);
}
