import type { ReactNode } from 'react';
import {
	ANO_DAS_INTENSIDADES,
	CURSORES,
	DIAS_POR_MES,
	INTENSIDADES,
	PAIS_POR_DEFEITO,
	WATTS_POR_VCPU,
} from '../config/ecologia';
import { CODIGOS_HTML, type Lingua } from '../config/site';
import type { Dicionario } from '../i18n/pt';
import { calcula, numeros, pontos } from '../lib/ecologia';
import './Estimador.css';
import Selo from './Selo';

interface Props {
	lingua: Lingua;
	textos: Dicionario['ecologia']['estimar'];
	selos: Dicionario['ecologia']['selos'];
}

/** O espaço inseparável entre um número e a unidade. */
const ESPACO = '\u00a0';

/** As barras da comparação são proporcionais à intensidade, por isso não mudam com a carga. */
const MAIOR_INTENSIDADE = Math.max(...INTENSIDADES.map((i) => i.g));

/**
 * «1 · Estimar uma carga»: os campos, o resultado, os pontos de CO2e, o cálculo completo,
 * com um selo em cada valor, e a mesma carga em cada país.
 * O build escreve tudo com os valores por defeito, para a página o mostrar sem JS.
 * O script `ecologia.ts` refaz os elementos com `data-v` sempre que um campo muda.
 */
export default function Estimador({ lingua, textos: t, selos }: Props) {
	const codigo = CODIGOS_HTML[lingua];
	const n = numeros(codigo);
	const nomes = new Intl.DisplayNames([codigo], { type: 'region' });
	const { vcpu, utilizacao, horas, pue } = CURSORES;
	const pais = INTENSIDADES.find((i) => i.pais === PAIS_POR_DEFEITO)!;
	const { kwh, kg } = calcula({
		vcpu: vcpu.defeito,
		utilizacao: utilizacao.defeito,
		horas: horas.defeito,
		pue: pue.defeito,
		intensidade: pais.g,
	});
	const { unidade, quantidade } = pontos(kg);

	return (
		<section aria-labelledby="estimar-titulo" data-estimador className="largura grid gap-6 pt-16">
			<div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
				<div className="grid gap-2">
					<p className="etiqueta">{t.etiqueta}</p>
					<h2 id="estimar-titulo" className="text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.1]">
						{t.titulo}
					</h2>
				</div>
				<p className="max-w-2xl text-texto-secundario">{t.introducao}</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
				<form className="grid content-start gap-6 border-t border-linha-forte pt-6">
					<div className="grid gap-1.5">
						<label htmlFor="estimador-pais" className="text-[0.9375rem]">
							{t.pais}
						</label>
						<select
							id="estimador-pais"
							name="pais"
							defaultValue={PAIS_POR_DEFEITO}
							className="min-h-11 rounded-[10px] border border-linha-forte bg-fundo px-3 text-[0.9375rem] text-texto"
						>
							{INTENSIDADES.map(({ pais }) => (
								<option key={pais} value={pais}>
									{nomes.of(pais)}
								</option>
							))}
						</select>
					</div>
					<Cursor nome="vcpu" rotulo={t.vcpu} valor={n.dado(vcpu.defeito)} {...vcpu} />
					<Cursor
						nome="utilizacao"
						rotulo={t.utilizacao}
						valor={n.percentagem(utilizacao.defeito)}
						dica={
							<>
								<Selo estado="hipotese" rotulo={selos.hipotese} />{' '}
								{t.dicaUtilizacao(n.percentagem(utilizacao.defeito))}
							</>
						}
						{...utilizacao}
					/>
					<Cursor nome="horas" rotulo={t.horas} valor={n.horas(horas.defeito)} {...horas} />
					<Cursor
						nome="pue"
						rotulo={t.pue}
						valor={n.pue(pue.defeito)}
						dica={
							<>
								<Selo estado="publicado" rotulo={selos.publicado} /> {t.dicaPue(n.pue(pue.defeito))}
							</>
						}
						{...pue}
					/>
				</form>

				<div className="grid content-start gap-4 border-verde pt-6 max-lg:border-t-2 lg:border-l-2 lg:pl-8">
					<div className="grid gap-4 sm:grid-cols-2">
						<Resultado
							chave="kwh"
							valor={n.resultado(kwh)}
							unidade={t.kwh}
							selo={selos.calculado}
						/>
						<Resultado chave="kg" valor={n.resultado(kg)} unidade={t.kg} selo={selos.calculado} />
					</div>
					<div data-pontos aria-hidden="true" className="pontos-co2">
						{Array.from({ length: quantidade }, (_, i) => (
							<i key={i} />
						))}
					</div>
					<p className="text-[0.8125rem] text-texto-secundario">
						{t.pontos.antes} <span data-v="unidade">{n.dado(unidade)}</span>
						{ESPACO}
						{t.pontos.depois}
					</p>
					<p role="status" data-anuncio className="sr-only"></p>

					<details open>
						<summary className="inline-flex min-h-9 cursor-pointer items-center font-semibold text-verde">
							{t.calculo.resumo}
						</summary>
						<div className="grid gap-2 text-sm leading-[1.9]">
							<p>
								<span data-v="vcpu">{n.dado(vcpu.defeito)}</span>
								{ESPACO}vCPU × ({n.dado(WATTS_POR_VCPU.minimo)}
								{ESPACO}W + <span data-v="utilizacao">{n.percentagem(utilizacao.defeito)}</span> × (
								{n.dado(WATTS_POR_VCPU.maximo)} − {n.dado(WATTS_POR_VCPU.minimo)}){ESPACO}W){' '}
								<Selo estado="hipotese" rotulo={selos.hipotese} />{' '}
								<small className="text-texto-secundario">({t.calculo.notaWatts})</small> ×{' '}
								<span data-v="horas">{n.horas(horas.defeito)}</span> × {n.dado(DIAS_POR_MES)}
								{ESPACO}
								{t.calculo.dias} × PUE{ESPACO}
								<span data-v="pue">{n.pue(pue.defeito)}</span>{' '}
								<span data-selo-pue data-publicado={selos.publicado} data-hipotese={selos.hipotese}>
									<Selo estado="publicado" rotulo={selos.publicado} />
								</span>{' '}
								= <span data-v="kwh">{n.resultado(kwh)}</span>
								{ESPACO}kWh <Selo estado="calculado" rotulo={selos.calculado} />
							</p>
							<p>
								<span data-v="kwh">{n.resultado(kwh)}</span>
								{ESPACO}kWh × <span data-v="intensidade">{n.dado(pais.g)}</span>
								{ESPACO}g CO2e/kWh (<span data-v="pais">{nomes.of(pais.pais)}</span>, Ember{' '}
								{ANO_DAS_INTENSIDADES}, {t.calculo.cicloDeVida}){' '}
								<Selo estado="publicado" rotulo={selos.publicado} /> ={' '}
								<span data-v="kg">{n.resultado(kg)}</span>
								{ESPACO}kg CO2e <Selo estado="calculado" rotulo={selos.calculado} />
							</p>
						</div>
					</details>
				</div>
			</div>

			<div className="grid gap-3 border-t border-linha-forte pt-8">
				<div className="flex flex-wrap items-center gap-3">
					<h3 id="estimar-paises" className="text-xl">
						{t.paises}
					</h3>
					<Selo estado="calculado" rotulo={selos.calculado} />
				</div>
				<ul aria-labelledby="estimar-paises" className="grid gap-1.5">
					{INTENSIDADES.map(({ pais: codigo, g }) => (
						<li
							key={codigo}
							data-pais={codigo}
							aria-current={codigo === pais.pais ? 'true' : undefined}
							className="grid grid-cols-[7.5rem_minmax(0,1fr)_3.75rem] items-center gap-3 rounded-md px-1.5 py-0.5 text-sm aria-[current=true]:bg-verde/15 aria-[current=true]:font-semibold sm:grid-cols-[12rem_minmax(0,1fr)_4.5rem]"
						>
							<span>
								{nomes.of(codigo)}{' '}
								<small className="text-xs whitespace-nowrap text-texto-secundario">
									{n.dado(g)}
									{ESPACO}g/kWh
								</small>
							</span>
							<span className="h-2.5 rounded-full bg-superficie-2">
								<span
									className="block h-full rounded-full bg-verde"
									style={{ width: `${(g / MAIOR_INTENSIDADE) * 100}%` }}
								></span>
							</span>
							<span className="text-right whitespace-nowrap tabular-nums">
								<span data-v-pais>{n.resultado((kwh * g) / 1000)}</span>
								{ESPACO}kg
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

interface CursorProps {
	nome: 'vcpu' | 'utilizacao' | 'horas' | 'pue';
	rotulo: string;
	/** O valor por defeito, escrito na língua da página. */
	valor: string;
	min: number;
	max: number;
	passo: number;
	defeito: number;
	dica?: ReactNode;
}

/** Um cursor do estimador. O valor fica fora do <label>, para não mudar o nome do cursor. */
function Cursor({ nome, rotulo, valor, min, max, passo, defeito, dica }: CursorProps) {
	const id = `estimador-${nome}`;
	return (
		<div className="grid gap-1.5">
			<div className="flex justify-between gap-4 text-[0.9375rem]">
				<label htmlFor={id}>{rotulo}</label>
				<span data-v={nome} className="font-semibold whitespace-nowrap text-verde tabular-nums">
					{valor}
				</span>
			</div>
			<input
				type="range"
				id={id}
				name={nome}
				min={min}
				max={max}
				step={passo}
				defaultValue={defeito}
				className="min-h-6 w-full accent-verde"
			/>
			{dica && <p className="text-[0.8125rem] text-texto-secundario">{dica}</p>}
		</div>
	);
}

interface ResultadoProps {
	chave: 'kwh' | 'kg';
	valor: string;
	unidade: string;
	selo: string;
}

/** Um dos dois resultados, em grande: kWh por mês e kg CO2e por mês. */
function Resultado({ chave, valor, unidade, selo }: ResultadoProps) {
	return (
		<p className="grid justify-items-start gap-1">
			<Selo estado="calculado" rotulo={selo} />{' '}
			<span
				data-v={chave}
				className="font-titulos text-[clamp(2.2rem,5vw,3.2rem)] leading-none text-verde tabular-nums"
			>
				{valor}
			</span>{' '}
			<span className="text-sm text-texto-secundario">{unidade}</span>
		</p>
	);
}
