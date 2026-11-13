import type { Language } from '../config/site';
import { values } from '../config/values';
import { withNonBreakingSpaces } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	language: Language;
	title: string;
	text: string;
	buttonText: string;
	/** Below the button: 45 min, Google Meet, free and with no commitment. */
	conversation: string;
	/** Only in the languages other than the booking page's: the booking is in another language. */
	bookingNotice: string;
}

/** The end of the page: "You never lose the infrastructure." and the button, so the CTO decides right there. */
export default function FinalCta({
	language,
	title,
	text,
	buttonText,
	conversation,
	bookingNotice,
}: Props) {
	const line =
		language === values.bookingPageLanguage ? conversation : `${conversation} ${bookingNotice}`;
	return (
		<section
			aria-labelledby="final-cta-title"
			className="page-width grid min-h-[70svh] content-center justify-items-start gap-6 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2
				id="final-cta-title"
				data-reveal
				className="text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06]"
			>
				{withNonBreakingSpaces(title)}
			</h2>
			<p data-reveal className="max-w-2xl text-lg text-foreground-secondary">
				{withNonBreakingSpaces(text)}
			</p>
			{/* The section's only link: the branch (#73) ends with 3 leaves next to it. The button takes
			    no other attributes, so its wrapper is what fades in. */}
			<div data-reveal className="flex">
				<BookingButton text={buttonText} />
			</div>
			<p data-reveal className="max-w-2xl text-sm text-foreground-secondary">
				{withNonBreakingSpaces(line)}
			</p>
		</section>
	);
}
