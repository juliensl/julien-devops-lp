// Prints the cloud chart's boundary cases (#66) as a Markdown table, ready to paste into an issue:
// each provider within 0.05 of a threshold, with the rating it would have on the other side. Julien
// reviews them before the Commercial launch (#75), once the facts are updated. The weights are never
// tuned to avoid a threshold. Names and ratings are the Portuguese site copy:
//   npm run boundary-cases
import { PROVIDERS, boundaryCases } from '../src/config/cloud-providers.ts';
import { pt } from '../src/i18n/pt.ts';

const { scenarios, ratings } = pt.cloud.chart;
const decimal = new Intl.NumberFormat('pt-PT', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const cases = boundaryCases();
console.log('| Scenario | Provider | Score | Rating | On the other side |');
console.log('|---|---|---|---|---|');
for (const { scenario, provider, score, rating, otherSide } of cases) {
	const name = PROVIDERS.find(({ id }) => id === provider)!.name;
	console.log(
		`| ${scenarios[scenario].name} | ${name} | ${decimal.format(score)} | ${ratings[rating]} | ${ratings[otherSide]} |`,
	);
}
console.log(`\n${cases.length} boundary cases.`);
