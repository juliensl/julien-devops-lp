// O estimador da página de ecologia (#68). O build já escreve o resultado com os valores por
// defeito; aqui refaz-se tudo o que tem `data-v` sempre que um campo muda.
// Os números seguem a língua da página (`<html lang>`), como no build.
import { CURSORES, INTENSIDADES } from '../config/ecologia';
import { calcula, numeros, pontos } from '../lib/ecologia';

/** Depois de o Visitante parar de mexer, anuncia-se só o resultado, uma vez. */
const ESPERA_DO_ANUNCIO = 500;

const estimador = document.querySelector<HTMLElement>('[data-estimador]');
if (estimador) liga(estimador);

function liga(estimador: HTMLElement) {
	const formulario = estimador.querySelector('form')!;
	const anuncio = estimador.querySelector<HTMLElement>('[data-anuncio]')!;
	// O selo do PUE guarda os nomes dos dois estados possíveis, na língua da página.
	const seloDoPue = estimador.querySelector<HTMLElement>('[data-selo-pue]')!;
	const paises = formulario.querySelector('select')!;
	const caixaDosPontos = estimador.querySelector<HTMLElement>('[data-pontos]')!;
	const n = numeros(document.documentElement.lang);
	let espera: ReturnType<typeof setTimeout> | undefined;

	const campo = (nome: string) => formulario.elements.namedItem(nome) as HTMLInputElement;
	const escreve = (chave: string, texto: string) => {
		for (const e of estimador.querySelectorAll(`[data-v="${chave}"]`)) e.textContent = texto;
	};

	function atualiza(anunciar: boolean) {
		const vcpu = Number(campo('vcpu').value);
		const utilizacao = Number(campo('utilizacao').value);
		const horas = Number(campo('horas').value);
		const pue = Number(campo('pue').value);
		const pais = INTENSIDADES.find((i) => i.pais === campo('pais').value) ?? INTENSIDADES[0];
		const { kwh, kg } = calcula({ vcpu, utilizacao, horas, pue, intensidade: pais.g });

		// O valor de cada cursor, com a unidade, também no que os leitores de ecrã dizem.
		// Só o JS o põe: sem JS, um aria-valuetext fixo ficaria errado ao mover o cursor.
		for (const [nome, texto] of [
			['vcpu', n.dado(vcpu)],
			['utilizacao', n.percentagem(utilizacao)],
			['horas', n.horas(horas)],
			['pue', n.pue(pue)],
		]) {
			escreve(nome, texto);
			campo(nome).setAttribute('aria-valuetext', texto);
		}
		escreve('kwh', n.resultado(kwh));
		escreve('kg', n.resultado(kg));

		const { unidade, quantidade } = pontos(kg);
		escreve('unidade', n.dado(unidade));
		// Só se juntam ou tiram os pontos que mudam: os novos surgem, os outros ficam quietos.
		while (caixaDosPontos.childElementCount < quantidade) {
			caixaDosPontos.append(document.createElement('i'));
		}
		while (caixaDosPontos.childElementCount > quantidade) caixaDosPontos.lastElementChild!.remove();
		escreve('intensidade', n.dado(pais.g));
		escreve('pais', paises.selectedOptions[0]?.text ?? '');

		for (const linha of estimador.querySelectorAll<HTMLElement>('li[data-pais]')) {
			const { g } = INTENSIDADES.find((i) => i.pais === linha.dataset.pais)!;
			linha.querySelector('[data-v-pais]')!.textContent = n.resultado((kwh * g) / 1000);
			if (linha.dataset.pais === pais.pais) linha.setAttribute('aria-current', 'true');
			else linha.removeAttribute('aria-current');
		}

		// O PUE só é Publicado no valor do Uptime Institute; outro valor é uma Hipótese.
		const estado = pue === CURSORES.pue.defeito ? 'publicado' : 'hipotese';
		const selo = seloDoPue.firstElementChild as HTMLElement;
		selo.dataset.estado = estado;
		selo.textContent = seloDoPue.dataset[estado] ?? '';

		if (anunciar) {
			clearTimeout(espera);
			espera = setTimeout(() => {
				anuncio.textContent = `${n.resultado(kwh)} kWh, ${n.resultado(kg)} kg CO2e`;
			}, ESPERA_DO_ANUNCIO);
		}
	}

	formulario.addEventListener('input', () => atualiza(true));
	formulario.addEventListener('submit', (evento) => evento.preventDefault());
	// O navegador pode repor os campos de uma visita anterior: o resultado segue-os logo.
	atualiza(false);
}
