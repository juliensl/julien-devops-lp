import { values } from '../config/values';

interface Props {
	/** "Book a conversation", or the call that ends the section it is in. */
	text: string;
	/** Smaller, for the header, but always with the 44×44 px touch target. */
	compact?: boolean;
}

/** A plain link to the booking page, in the same tab. */
export default function BookingButton({ text, compact = false }: Props) {
	const size = compact ? 'px-3 text-[0.8125rem] sm:px-4 sm:text-[0.9375rem]' : 'px-6 text-base';
	return (
		<a
			href={values.bookingPage}
			className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-action py-1 text-center leading-tight font-semibold text-white transition-colors hover:bg-action-hover ${size}`}
		>
			{text}
		</a>
	);
}
