import type { Language } from '../config/site';
import { values } from '../config/values';
import { withNonBreakingSpaces } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	language: Language;
	title: string;
	text: string;
	buttonText: string;
	/** Por baixo do botão: 45 min, Google Meet, gratuita e sem compromisso. */
	conversation: string;
	/** Só nas línguas que não são a da página de marcação: a marcação está noutra língua. */
	bookingNotice: string;
}

/** O fim da página: «Nunca perdes a infraestrutura.» e o botão, para o CTO decidir ali mesmo. */
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
			<h2 id="final-cta-title" className="text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06]">
				{withNonBreakingSpaces(title)}
			</h2>
			<p className="max-w-2xl text-lg text-foreground-secondary">{withNonBreakingSpaces(text)}</p>
			{/* A única ligação da secção: o ramo (#73) acaba com 3 folhas junto dela. */}
			<BookingButton text={buttonText} />
			<p className="max-w-2xl text-sm text-foreground-secondary">{withNonBreakingSpaces(line)}</p>
		</section>
	);
}
