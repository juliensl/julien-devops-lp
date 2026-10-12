# Que obrigações legais e de privacidade tem o site?

> Pesquisa do ticket [#13](https://github.com/juliensl/julien-devops-lp/issues/13) (mapa [#4](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **12/10/2026**.
> **Isto é pesquisa, não aconselhamento jurídico.** Resume o que dizem as fontes oficiais e assinala o que ficou por confirmar. Em caso de dúvida, o Julien deve confirmar com o contabilista ou com um advogado.
> Este documento **não decide**. As decisões ficam para os tickets seguintes (por exemplo "Medimos as visitas? Com que ferramenta?" e a futura decisão sobre as páginas legais), validados pelo Julien.

## Pergunta

Que obrigações legais e de privacidade tem a landing page de um freelancer estabelecido em Portugal que vende só a empresas (B2B)?

Contexto considerado: página estática em julienlaffont.com (francês, inglês e português), alojada na Infomaniak (Suíça). Não tem contas, loja, pagamentos nem formulários próprios. Liga para uma ferramenta externa de marcação da Conversa (ou incorpora-a): Google Calendar, Calendly ou Cal.com, ainda por escolher. Mais tarde pode incorporar um vídeo Loom. Ainda não está decidido se haverá estatísticas de visitas.

## Resumo

- **Identificação do prestador: obrigatória.** O DL 7/2004 exige na página, de forma permanente e de acesso fácil, o nome, a morada geográfica, o email, os registos públicos (se existirem) e o NIF [P1]. A coima vai de 2 500 € a 50 000 € [P1][P3].
- **Política de privacidade: obrigatória na prática.** Mesmo uma página estática trata dados pessoais. O alojamento guarda logs de acesso [V5], que normalmente incluem o IP, e um IP é dado pessoal [U3]. Os emails e as marcações também são dados pessoais. O RGPD obriga a informar as pessoas no momento da recolha [U2].
- **Banner de cookies: só se for preciso.** Sem cookies nem scripts de terceiros, não há consentimento a pedir. Passa a ser obrigatório se a página tiver estatísticas com cookies ou incorporar a ferramenta de marcação, o Loom ou outros conteúdos que guardem informação no navegador ao carregar [P5][P7][U5]. Estatísticas "sem cookies" não são automaticamente isentas [U6].
- **Livro de Reclamações Eletrónico: zona cinzenta.** A lei abrange "todos" os prestadores com atividade por meios digitais e exige uma ligação visível e destacada à plataforma [P9]. O regime foi pensado para consumidores, mas não encontrei nenhuma exceção expressa para quem vende só a empresas [P9][P10]. Confirmar com a ASAE ou com o contabilista.
- **Não se aplicam a um B2B puro:** a informação sobre resolução alternativa de litígios, que é só para consumidores e só para quem aderiu a uma entidade [P12]; a ligação à plataforma europeia de litígios, que acabou em 2025 [U7]; o Ato Europeu da Acessibilidade [U8]; e as "mentions légales" francesas, porque vale a lei portuguesa (princípio do país de origem) [U1][P1].

## Tabela de obrigações

Legenda: **Obrigatório** · **Obrigatório se…** · **Zona cinzenta** (as fontes não respondem com clareza) · **Boa prática** · **Não se aplica**.

| Obrigação | Aplica-se? | Condição | Fonte |
|---|---|---|---|
| Identificação do prestador: nome, morada geográfica, email, registos públicos e NIF | **Obrigatório** | Sempre: a página é um serviço da sociedade da informação de um prestador estabelecido em Portugal | [P1] arts. 3.º, 4.º e 10.º; [U1] art. 5.º e cons. 18 |
| Indicar se os preços incluem impostos (IVA) | **Obrigatório se…** | Só se a página mostrar preços | [U1] art. 5.º, n.º 2; [P1] art. 10.º, n.º 4 |
| Natureza publicitária e anunciante claramente identificados | **Obrigatório** | Sempre; cumpre-se naturalmente numa página do próprio Julien | [P1] arts. 20.º e 21.º |
| Política de privacidade (informação do art. 13.º do RGPD) | **Obrigatório** (na prática) | Há tratamento de dados pessoais: logs do servidor com IP, emails recebidos e marcações | [U2] art. 13.º; [U3] |
| Contrato de subcontratação (DPA) com o alojamento e com a ferramenta de marcação | **Obrigatório** | Sempre que um fornecedor trata dados por conta do Julien | [U2] art. 28.º; [V1][V2][V3] |
| Registo das atividades de tratamento | **Obrigatório se…** | Se o tratamento não for ocasional, o que é provável num freelancer que recebe contactos com regularidade | [U2] art. 30.º, n.º 5 |
| Encarregado da proteção de dados (EPD) | **Não se aplica** | Só para organismos públicos ou para tratamentos em grande escala | [U2] art. 37.º, n.º 1 |
| Consentimento prévio para cookies (banner) | **Obrigatório se…** | Se a página guardar ou ler informação no navegador sem ser estritamente necessário: estatísticas, ferramenta de marcação incorporada, vídeo incorporado… | [P5] art. 5.º; [P7]; [U5] |
| Informar sobre conteúdos de terceiros incorporados | **Obrigatório se…** | Se um conteúdo incorporado fizer o navegador enviar dados do Visitante a um terceiro ao carregar a página | [U4]; [U2] art. 26.º |
| Estatísticas "sem cookies" dispensam consentimento? | **Zona cinzenta** | Depende da técnica; não encontrei orientação da CNPD | [U6] §§ 50–56; [P7]; [F1] (só França) |
| Livro de Reclamações Eletrónico: registo na plataforma e ligação visível e destacada | **Zona cinzenta** (provavelmente obrigatório) | A lei não exclui os prestadores B2B, mas o regime destina-se a consumidores e utentes | [P9] arts. 1.º, 2.º e 5.º-B; [P10] |
| Livro de reclamações em papel | **Não se aplica** (provavelmente) | Só com estabelecimento fixo **e** contacto com o público (requisitos cumulativos) | [P9] art. 2.º, n.º 1; [P10] |
| Informar sobre entidades de resolução alternativa de litígios (RAL) | **Não se aplica** | Só em litígios com consumidores, e só se o prestador aderiu a uma entidade ou está sujeito a arbitragem necessária | [P12] arts. 2.º, 3.º e 18.º |
| Ligação para a plataforma europeia de resolução de litígios em linha (ODR/RLL) | **Não se aplica** | Revogado desde 20/07/2025; já era só para consumidores | [U7] |
| "Mentions légales" francesas (LCEN) | **Não se aplica** | Vale a lei do país de estabelecimento (Portugal) | [U1] arts. 2.º, al. h), e 3.º; [P1] art. 4.º |
| Ato Europeu da Acessibilidade | **Não se aplica** | Só abrange serviços a consumidores; as microempresas que prestam serviços estão isentas | [U8] arts. 2.º, 3.º e 4.º, n.º 5; [P13] |
| Dizer na página que os serviços são só para empresas | **Boa prática** | Sugestão desta pesquisa: torna clara a natureza B2B, da qual dependem várias das linhas acima | (sem fonte legal) |
| Alojar no próprio site os tipos de letra e os scripts | **Boa prática** | Evita enviar o IP do Visitante a terceiros sem necessidade | raciocínio a partir de [U4] |

## Detalhes

### 1. Identificação do prestador (DL 7/2004, comércio eletrónico)

- **A página está abrangida.** "Serviço da sociedade da informação" é qualquer serviço prestado à distância por via eletrónica, "mediante remuneração ou pelo menos no âmbito de uma actividade económica" [P1 art. 3.º, n.º 1]. A diretiva esclarece que isto inclui serviços não pagos pelo destinatário, "como os que consistem em prestar informações em linha ou comunicações comerciais" [U1 cons. 18]. A landing page de um freelancer encaixa aqui.
- **Lei aplicável.** Os prestadores estabelecidos em Portugal "ficam integralmente sujeitos à lei portuguesa", mesmo quando o serviço chega a outro país da UE [P1 art. 4.º, n.º 1].
- **O que mostrar** "permanentemente em linha, em condições que permitam um acesso fácil e directo" [P1 art. 10.º, n.º 1]:
  - a) nome ou denominação social;
  - b) endereço geográfico do estabelecimento e endereço eletrónico, "em termos de permitir uma comunicação directa";
  - c) inscrições em registos públicos e respetivos números (por exemplo, o registo comercial, se existir);
  - d) número de identificação fiscal (NIF).
- **Só se se aplicar:** atividade sujeita a autorização prévia (n.º 2) ou profissão regulamentada (n.º 3). À partida não é o caso da consultoria DevOps, mas o Julien deve confirmar. Se houver custos para o destinatário além das telecomunicações, "incluindo ónus fiscais", devem ser indicados antes (n.º 4). A diretiva é mais direta: quando se indicam preços, a indicação tem de dizer "se inclui quaisquer despesas fiscais" [U1 art. 5.º, n.º 2]. Só interessa se a página vier a mostrar preços.
- **Publicidade.** A página é uma "comunicação publicitária em rede" [P1 art. 20.º, n.º 2]. Tem de identificar claramente a natureza publicitária e o anunciante [P1 art. 21.º], o que uma página do próprio Julien cumpre naturalmente.
- **Supervisão e coima.** A entidade de supervisão central é a ANACOM [P1 art. 35.º]. Não disponibilizar a informação do art. 10.º é contraordenação com coima de 2 500 € a 50 000 € [P1 art. 37.º, n.º 1, al. a)]. A Lei 12-A/2026 reescreveu a alínea a), que continua a incluir o art. 10.º, e não alterou o montante [P3]. Antes disso, a Lei 46/2012 também a tinha alterado sem mudar o montante [P2].
- **Versão em vigor.** Li o art. 10.º no texto original publicado no Diário da República [P1]. Segundo a lista da ANACOM [P4] e o texto da Lei 12-A/2026 [P3], as alterações posteriores (DL 62/2009, Lei 46/2012, Lei 26/2023, Lei 12-A/2026) não mexeram no art. 10.º. A Lei 40/2020 também alterou o diploma [P3], mas não verifiquei que artigos mudou (ver "O que não consegui confirmar").

### 2. RGPD: o que acontece numa página que "não recolhe nada"

- **Mesmo assim há dados pessoais.** Um IP dinâmico guardado por quem disponibiliza um sítio é dado pessoal desse prestador, quando ele tem meios legais para identificar a pessoa [U3]. A Infomaniak guarda os logs de acesso e de erro "for at least 7 days" [V5]. Também são dados pessoais os emails que chegam ao Julien e os dados de marcação da Conversa (nome e email são obrigatórios no Google Calendar, por exemplo) [V4].
- **Papéis.**
  - **O Julien é responsável pelo tratamento.** Decide para que servem os logs, os contactos e as marcações [U2 art. 4.º, pontos 7 e 8].
  - **A Infomaniak e a ferramenta de marcação são subcontratantes.** Exigem um contrato com o conteúdo do art. 28.º [U2 art. 28.º]. A Calendly diz que "acts as a processor" das marcações [V1]. A Cal.com diz "you are the controller and we are the processor" [V2]. Com Google Workspace, "Google is a processor" ao abrigo do Cloud Data Processing Addendum [V3]. Para contas Google pessoais, não encontrei um DPA. A pesquisa do ticket [#9](https://github.com/juliensl/julien-devops-lp/issues/9) chegou à mesma conclusão.
  - **Conteúdos incorporados podem tornar o Julien responsável conjunto.** Isto vale para a ferramenta de marcação, o Loom, tipos de letra ou scripts carregados de servidores de terceiros. No caso Fashion ID, o TJUE decidiu que quem insere no seu sítio um módulo que faz o navegador transmitir dados a um terceiro é responsável pela "recolha e a comunicação por transmissão" desses dados [U4, ponto 2]. Tem também a obrigação de informar sobre essa parte [U4, ponto 4]. O RGPD regula a responsabilidade conjunta no art. 26.º [U2].
- **Informação obrigatória.** Quando os dados são recolhidos, o responsável tem de dar, entre outros elementos, a sua identidade e contactos, as finalidades e o fundamento jurídico, os destinatários e as transferências para fora da UE [U2 art. 13.º, n.os 1 e 2]. Na prática, isto é a política de privacidade da página.
- **Transferências.** A Suíça (Infomaniak) tem decisão de adequação. Os EUA também, para empresas certificadas no EU-US Data Privacy Framework [U9]. A Calendly declara essa certificação [V1]. A Cal.com diz que se apoia no DPF e, quando apropriado, em cláusulas contratuais-tipo [V2].
- **Registo das atividades de tratamento.** A dispensa para empresas com menos de 250 trabalhadores não se aplica se o tratamento "não seja ocasional" [U2 art. 30.º, n.º 5]. Num freelancer que recebe contactos e marcações com regularidade, o mais provável é ter de manter um registo simples.
- **EPD.** Não é obrigatório: o art. 37.º, n.º 1, só o exige a organismos públicos ou a tratamentos em grande escala [U2].
- **Autoridade.** A autoridade de controlo em Portugal é a CNPD [P8 art. 3.º].

### 3. Cookies e consentimento (Lei 41/2004)

- **Regra.** Guardar informação ou aceder a informação no equipamento do Visitante "apenas [é permitido] se estes tiverem dado o seu consentimento prévio, com base em informações claras e completas" [P5 art. 5.º, n.º 1]. Esta redação vem da Lei 46/2012 [P2]. A Lei 16/2022 só alterou os arts. 7.º e 10.º [P6].
- **Exceções.** Não precisam de consentimento o armazenamento ou o acesso que sirvam só para transmitir a comunicação, ou que sejam "estritamente necessário[s]" para fornecer um serviço "solicitado expressamente" pelo Visitante [P5 art. 5.º, n.º 2].
- **Como deve ser o consentimento.** Uma caixa pré-assinalada não é consentimento válido. A regra aplica-se quer a informação seja dado pessoal, quer não. E a informação a dar inclui a duração dos cookies e se terceiros lhes podem aceder [U5].
- **Posição da CNPD.** Os donos dos sítios "são responsáveis por todos os cookies que permitem que sejam colocados", próprios ou de terceiros. Têm de obter o consentimento "quando tal se impõe, como é o caso de cookies para fins de analítica" [P7]. Na mesma nota de 2021, a CNPD anunciava orientações específicas sobre cookies. Não as encontrei publicadas.
- **"Sem cookies" não quer dizer "sem consentimento".** Segundo o EDPB, o art. 5.º, n.º 3, da Diretiva ePrivacy também abrange pixels e ligações de rastreio, identificadores gerados por JavaScript e, em certos casos, o rastreio só pelo IP [U6 §§ 50–51 e 54–55]. O EDPB lembra que estar abrangido "does not systematically mean that consent needs to be collected": é preciso ver caso a caso se se aplica uma exceção [U6 § 56].
- **O que isto significa para a página:**
  - Página sem cookies, sem scripts nem conteúdos de terceiros: nada a consentir, logo não precisa de banner.
  - Ligação simples para a ferramenta de marcação: a página não carrega nada do fornecedor. O banner, se existir, é o da ferramenta, no domínio dela.
  - Marcação ou Loom incorporados: os cookies do fornecedor chegam com a página ou ao clicar. É preciso consentimento prévio, ou uma fachada "clicar para carregar" que só carrega o conteúdo depois do consentimento.
  - Estatísticas com cookies (por exemplo Google Analytics): é preciso consentimento [P7].
  - Estatísticas sem cookies, no navegador: zona cinzenta [U6]. Em França a CNIL isenta de consentimento a medição de audiência se cumprir condições estritas: finalidade limitada, só estatísticas anónimas, sem cruzamento com outros dados [F1]. Em Portugal não encontrei regra equivalente da CNPD.
  - Estatísticas a partir dos logs do servidor, sem nada no navegador: é a opção de menor risco. Mas não encontrei confirmação de que dispense consentimento, e o EDPB admite que usar o IP para seguir a navegação pode cair no art. 5.º, n.º 3 [U6 § 55].
- **Coima.** Violar o art. 5.º dá coima de 1 500 € a 25 000 € para pessoas singulares e de 5 000 € a 5 000 000 € para pessoas coletivas. A negligência também é punível [P5 art. 14.º, n.º 1, al. e), e n.º 5]. Quem aplica a coima é a CNPD [P5 art. 15.º, n.º 1].
- **Pode mudar.** O "Digital Omnibus" da UE propõe mudar o RGPD e a Diretiva ePrivacy, incluindo as regras sobre cookies. A 12/10/2026 estava em "Awaiting committee decision" no Parlamento Europeu [U10]. Até ser aprovado, vale o regime acima.

### 4. Livro de Reclamações Eletrónico (DL 156/2005, alterado pelo DL 74/2017)

- **Âmbito do formato eletrónico.** Estão abrangidos "todos os fornecedores de bens e prestadores de serviços […], quer desenvolvam a atividade em estabelecimento […] ou através de meios digitais" [P9 art. 2.º, n.º 2]. É obrigatório para todos os setores desde 1/07/2018 [P9 DL 74/2017, art. 9.º, n.º 3][P11]. A plataforma diz que, desde 1/01/2020, todos os prestadores abrangidos devem estar registados [P10].
- **Obrigações:**
  - divulgar no sítio, "em local visível e de forma destacada, o acesso à Plataforma Digital" [P9 art. 5.º-B, n.º 2];
  - responder ao reclamante em 15 dias úteis [P9 art. 5.º-B, n.º 4].
  - Ao registar-se, o prestador recebe grátis um crédito de 25 folhas de reclamação [P10].
- **Formato em papel.** Só é obrigatório com estabelecimento fixo **e** contacto com o público, e estes requisitos são cumulativos [P9 art. 2.º, n.º 1][P10]. Sem um espaço aberto a clientes, não se aplica.
- **E um prestador só B2B?** As fontes apontam em sentidos diferentes:
  - **Para "aplica-se":** a lei diz "todos" e não tem nenhuma exceção para quem vende a empresas [P9 art. 2.º]. A FAQ oficial diz que "qualquer sítio que disponibilize informação sobre um bem ou serviço, designadamente, indicando os contactos para onde possa ser efetuada a compra", obriga a ter o formato eletrónico e a registar-se [P10].
  - **Para "não se aplica":** o diploma visa "a defesa dos direitos dos consumidores e utentes" [P9 art. 1.º, n.º 1], e o livro pode ser usado "por qualquer consumidor ou utente" [P9 art. 2.º, n.º 5]. A FAQ também diz que "existem setores de atividade que não obrigam a ter livro de reclamações". Se o setor não aparecer na lista da entidade fiscalizadora, não se deve registar e deve contactá-la [P10].
  - **Entidade competente.** Para uma atividade sem regulador próprio, a entidade residual é a ASAE [P9 art. 5.º, n.º 1, al. d)].
- **Conclusão.** Zona cinzenta. Não encontrei nenhuma posição oficial sobre prestadores exclusivamente B2B. Registar-se e pôr a ligação custa pouco e elimina o risco. A alternativa é obter da ASAE, ou através do contabilista, a confirmação de que a atividade do Julien não está abrangida.
- **Coima** (redação de 2017). Violar o art. 5.º-B, n.os 1 a 3, dá coima de 250 € a 3 500 € para pessoas singulares e de 1 500 € a 15 000 € para pessoas coletivas [P9 art. 9.º, n.º 1, al. a)]. A FAQ indica valores entre 150 € e 15 000 € consoante a infração [P10]. Não verifiquei alterações posteriores aos montantes.

### 5. Resolução alternativa de litígios (Lei 144/2015) e plataforma europeia

- **Só litígios de consumo.** A lei aplica-se a procedimentos "iniciados por um consumidor contra um fornecedor de bens ou prestador de serviços" [P12 art. 2.º, n.º 1]. "Consumidor" é uma pessoa singular que atua "com fins que não se incluam no âmbito da sua atividade comercial, industrial, artesanal ou profissional" [P12 art. 3.º, al. d)]. Um CTO que contrata em nome de um SaaS não é consumidor.
- **Mesmo com consumidores**, o dever de informar sobre entidades RAL só existe para quem está vinculado a elas "por adesão ou por imposição legal decorrente de arbitragem necessária" [P12 art. 18.º, na redação do DL 102/2017].
- **A plataforma europeia (ODR/RLL) acabou.** O Regulamento (UE) n.º 524/2013 foi revogado "com efeitos a partir de 20 de julho de 2025" [U7 art. 1.º]. A antiga obrigação de pôr uma ligação para a plataforma desapareceu.

### 6. Vender a clientes em França: interessam as regras francesas?

- **Identificação ("mentions légales").** O "domínio coordenado" da Diretiva 2000/31 inclui as exigências sobre o comportamento do prestador e o "conteúdo do serviço, incluindo as aplicáveis à publicidade" [U1 art. 2.º, al. h)]. O considerando 21 refere expressamente a "informação em linha" e a "publicidade em linha" [U1]. Cada Estado-Membro aplica as suas regras aos prestadores estabelecidos no seu território e não pode restringir os serviços vindos de outro Estado-Membro [U1 art. 3.º, n.os 1 e 2]. Portugal fá-lo no art. 4.º, n.º 1, do DL 7/2004 [P1]. Conclusão: aplica-se o art. 10.º do DL 7/2004, não as "mentions légales" da LCEN. Não consegui ler o texto da LCEN no Légifrance (acesso bloqueado a pedidos automáticos) [F2]. A conclusão assenta na diretiva.
- **Proteção de dados.** O princípio do país de origem não cobre a proteção de dados [U1 art. 1.º, n.º 5, al. b)]. Mas o RGPD é o mesmo em toda a UE, e o Julien, estabelecido em Portugal, responde à CNPD [P8].
- **Cookies.** As regras francesas aplicam-se através do art. 82 da lei "Informatique et Libertés" [F1]. Não confirmei se a CNIL as aplicaria a um prestador sem estabelecimento em França. Na prática a questão pouco importa: a regra portuguesa é igual ou mais exigente (em Portugal a analítica precisa de consentimento [P7]; em França há uma isenção com condições [F1]). Cumprir a regra portuguesa deve cobrir os Visitantes franceses.
- **Mercados de língua inglesa** (Reino Unido, Irlanda, EUA): fora do âmbito do ticket, não investigados. A Irlanda é UE e fica coberta pela análise acima.

### 7. Ato Europeu da Acessibilidade (EAA)

- Só abrange "serviços prestados aos consumidores", entre eles os "serviços de comércio eletrónico" [U8 art. 2.º, n.º 2]. Estes são definidos como serviços prestados "tendo em vista a celebração de um contrato de consumo" [U8 art. 3.º, ponto 30]. Uma página B2B não está abrangida.
- Além disso, "as microempresas que prestam serviços ficam isentas" [U8 art. 4.º, n.º 5]. Microempresa: menos de 10 pessoas e volume de negócios ou balanço até 2 milhões de euros [U8 art. 3.º, ponto 23].
- Em Portugal, a diretiva foi transposta pelo DL 82/2022 [P13]. A ANACOM lista-o junto da legislação de comércio eletrónico [P4]. A relação com a diretiva foi confirmada só por fontes secundárias; não li o texto do decreto-lei.
- Uma página acessível continua a ser boa prática, mas não encontrei obrigação legal para este caso.

### 8. Fora do âmbito (não investigado)

- **Promessas e garantias.** O pitch tem garantias e números ("Garantie Sans Régression", "80 % des bugs…"). Podem estar sujeitas às regras gerais da publicidade (Código da Publicidade). Não foi investigado aqui, e o mapa já prevê que o Julien valide promessas, garantias e números.
- **Contratação eletrónica** (arts. 27.º a 31.º do DL 7/2004). Não foi analisada, porque a página não recebe encomendas.

## Implicações para a decisão

Esta secção não decide. Mostra o que cada decisão futura implica.

- **Páginas legais (decisão futura).**
  - **O mínimo que as fontes sustentam:**
    - um bloco de identificação do prestador (art. 10.º do DL 7/2004) de acesso permanente, por exemplo no rodapé ou numa página "Informação legal";
    - uma política de privacidade;
    - se o Julien optar por cumprir o regime, a ligação visível e destacada ao Livro de Reclamações Eletrónico.
  - **Uma página de cookies** só é precisa se houver cookies ou rastreio além do estritamente necessário.
  - **Línguas:** tudo isto deve existir em francês, inglês e português no Lançamento comercial.
  - **Forma:** cabe numa ou duas páginas por língua, o que não impede o futuro site institucional.
- **"Medimos as visitas? Com que ferramenta?"** A escolha decide se é preciso banner:
  - sem estatísticas: sem banner;
  - estatísticas a partir dos logs do servidor: provavelmente sem banner, mas não confirmado;
  - estatísticas sem cookies no navegador: zona cinzenta em Portugal;
  - estatísticas com cookies: banner e consentimento obrigatórios.
- **Forma de marcação (ticket #10).**
  - Uma **ligação simples** não põe cookies de terceiros na página.
  - A **incorporação inline** põe-nos ao carregar e obriga a consentimento prévio, ou a uma fachada "clicar para carregar".
  - O mesmo vale para o **vídeo Loom**.
  - A ferramenta tem de ter **DPA**. Com Google Calendar, isso aponta para Google Workspace em vez de uma conta pessoal.
- **Implementação.** Alojar no próprio site os tipos de letra e os scripts evita transmitir o IP do Visitante a terceiros e simplifica a política de privacidade.

**Informação que o Julien tem de fornecer ou confirmar:**

- **Identidade e estatuto:**
  - nome completo ou denominação, conforme a forma jurídica;
  - estatuto profissional: trabalhador independente, empresário em nome individual ou sociedade;
  - registos públicos, se existirem (por exemplo, conservatória e número de registo comercial);
  - NIF e, se aplicável, número de IVA intracomunitário.
- **Morada geográfica do estabelecimento**, que fica pública. Se não quiser publicar a morada de casa, deve ver com o contabilista que alternativa conta como "endereço geográfico em que se encontra estabelecido".
- **Contacto e atividade:**
  - email de contacto direto;
  - código de atividade (CAE ou código do art. 151.º do CIRS), para saber se o Livro de Reclamações se aplica e qual a entidade fiscalizadora.
- **Clientes:** confirmação de que só contrata com empresas e de que aceita dizê-lo na página.
- **Ferramentas e fornecedores:**
  - ferramentas a usar (marcação, Loom, estatísticas, email) e respetivos DPA;
  - aceitação do DPA da Infomaniak e prazo de conservação dos logs.
- **Livro de Reclamações:** decisão a validar com o contabilista ou com a ASAE (registar-se, ou confirmar que não está abrangido).

## O que não consegui confirmar

- Se o Livro de Reclamações Eletrónico se aplica a um prestador **exclusivamente B2B**. Não há exceção expressa nem posição oficial encontrada.
- O texto atual da **LCEN** francesa e se a **CNIL** aplicaria as regras de cookies a um prestador sem estabelecimento em França (Légifrance bloqueado; conclusão baseada na Diretiva 2000/31).
- Se a **CNPD** publicou as orientações sobre cookies anunciadas em 2021, e se aceita estatísticas sem cookies, ou a partir de logs, sem consentimento.
- Que artigos do DL 7/2004 a **Lei 40/2020** alterou. A lista da ANACOM não a descreve [P4], mas a Lei 12-A/2026 voltou a fixar a redação da alínea que sanciona o art. 10.º [P3].
- Os montantes atuais das **coimas do Livro de Reclamações** depois de 2017 (por exemplo, por via do regime das contraordenações económicas).
- Um **DPA da Google para contas pessoais**. O **DPA e o prazo de conservação dos logs da Infomaniak** só foram vistos em parte: os logs ficam "at least 7 days" [V5].

## Como foi feita a pesquisa

O sítio do Diário da República é uma aplicação JavaScript que não deu para ler automaticamente. Por isso usei:

- o **PDF oficial do Diário da República** (DL 7/2004);
- a **página do DR com o DL 74/2017**, numa cópia alojada pela AMT, que republica o DL 156/2005;
- as **reproduções da ANACOM** (Lei 41/2004, Lei 46/2012, Lei 16/2022, Lei 12-A/2026);
- o **texto consolidado da PGDL** (Lei 144/2015);
- as **ligações ELI do DRE**, verificadas para cada diploma;
- os **textos da UE e acórdãos do TJUE**, lidos em português através do serviço Cellar do Serviço das Publicações da UE (mesmo conteúdo do EUR-Lex);
- a **FAQ do Livro de Reclamações Eletrónico**, lida através do serviço de dados da própria plataforma.

## Fontes

**Portugal**

- [P1] Decreto-Lei n.º 7/2004 (comércio eletrónico), arts. 3.º, 4.º, 10.º, 20.º, 21.º, 35.º e 37.º. Texto original, DR I-A n.º 5, 7/01/2004: <https://files.dre.pt/1s/2004/01/005a00/00700078.pdf>. Ficha DRE: <https://diariodarepublica.pt/dr/detalhe/decreto-lei/7-2004-240775>
- [P2] Lei n.º 46/2012 (altera o DL 7/2004 e republica a Lei 41/2004). ANACOM: <https://www.anacom.pt/render.jsp?contentId=1136073>. DRE: <https://diariodarepublica.pt/dr/detalhe/lei/46-2012-174793>
- [P3] Lei n.º 12-A/2026 (execução do Regulamento dos Serviços Digitais; altera os arts. 11.º e 37.º do DL 7/2004). ANACOM: <https://www.anacom.pt/render.jsp?contentId=1833941>. DRE: <https://diariodarepublica.pt/dr/detalhe/lei/12-a-2026-1086140524>
- [P4] ANACOM, "Comércio eletrónico" (lista de diplomas e alterações): <https://www.anacom.pt/render.jsp?categoryId=331632> e <https://www.anacom.pt/render.jsp?categoryId=331633>
- [P5] Lei n.º 41/2004 (privacidade nas comunicações eletrónicas), arts. 5.º, 14.º e 15.º, na redação republicada pela Lei 46/2012. ANACOM: <https://www.anacom.pt/render.jsp?contentId=944401>. DRE: <https://diariodarepublica.pt/dr/detalhe/lei/41-2004-480710>
- [P6] Lei n.º 16/2022 (Lei das Comunicações Eletrónicas; altera os arts. 7.º e 10.º da Lei 41/2004). ANACOM: <https://www.anacom.pt/render.jsp?contentId=1727429>. DRE: <https://diariodarepublica.pt/dr/detalhe/lei/16-2022-187481298>
- [P7] CNPD, Nota informativa relativa à utilização de cookies, 25/06/2021: <https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf>
- [P8] Lei n.º 58/2019 (execução do RGPD), art. 3.º. DRE: <https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982>. PGDL: <https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=3118A0002&nid=3118&tabela=leis&ficha=1&nversao=>
- [P9] Decreto-Lei n.º 156/2005 (livro de reclamações), republicado no anexo II do Decreto-Lei n.º 74/2017 (DR 1.ª série n.º 118, 21/06/2017), arts. 1.º, 2.º, 5.º, 5.º-B e 9.º; DL 74/2017, art. 9.º. DRE: <https://diariodarepublica.pt/dr/detalhe/decreto-lei/74-2017-107541411> e <https://diariodarepublica.pt/dr/detalhe/decreto-lei/156-2005-143320>. Página do DR (cópia AMT): <https://www.amt-autoridade.pt/media/1405/decreto-lei-nº-74_2017-de-21-de-junho.pdf>
- [P10] Livro de Reclamações Eletrónico, Perguntas frequentes: <https://www.livroreclamacoes.pt/Inicio/PerguntasFrequentes>
- [P11] ASAE, Livro de Reclamações: <https://www.asae.gov.pt/reclamacoes-e-denuncias/livro-de-reclamacoes.aspx>
- [P12] Lei n.º 144/2015 (resolução alternativa de litígios de consumo), arts. 2.º, 3.º e 18.º (este na redação do DL 102/2017). DRE: <https://diariodarepublica.pt/dr/detalhe/lei/144-2015-70215248> e <https://diariodarepublica.pt/dr/detalhe/decreto-lei/102-2017-108041482>. Texto consolidado PGDL: <https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=2425&tabela=leis>
- [P13] Decreto-Lei n.º 82/2022 (requisitos de acessibilidade de produtos e serviços). DRE: <https://diariodarepublica.pt/dr/detalhe/decreto-lei/82-2022-204379872>

**União Europeia**

- [U1] Diretiva 2000/31/CE (comércio eletrónico), considerandos 18 e 21; arts. 1.º, n.º 5, 2.º, al. h), 3.º, 5.º e 6.º: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32000L0031>
- [U2] Regulamento (UE) 2016/679 (RGPD), arts. 4.º, 13.º, 26.º, 28.º, 30.º e 37.º: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679>
- [U3] TJUE, acórdão de 19/10/2016, Breyer, C-582/14: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:62014CJ0582>
- [U4] TJUE, acórdão de 29/07/2019, Fashion ID, C-40/17: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:62017CJ0040>
- [U5] TJUE, acórdão de 1/10/2019, Planet49, C-673/17: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:62017CJ0673>
- [U6] EDPB, Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive, versão 2.0 de 7/10/2024: <https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf>
- [U7] Regulamento (UE) 2024/3228 (descontinuação da plataforma europeia de resolução de litígios em linha), arts. 1.º e 2.º: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R3228>
- [U8] Diretiva (UE) 2019/882 (Ato Europeu da Acessibilidade), arts. 2.º, 3.º, 4.º e 31.º: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L0882>
- [U9] Comissão Europeia, decisões de adequação: <https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en>
- [U10] Parlamento Europeu, Observatório Legislativo, procedimento 2025/0360(COD) ("Digital Omnibus"): <https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)>

**França**

- [F1] CNIL, "Cookies : solutions pour les outils de mesure d'audience": <https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience>
- [F2] Loi n.º 2004-575 (LCEN), Légifrance: <https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164> (**não lido**: acesso bloqueado)

**Fornecedores**

- [V1] Calendly, Privacy Notice (em vigor desde 3/07/2026): <https://calendly.com/legal/privacy-notice>
- [V2] Cal.com, Privacy Policy (em vigor desde 1/10/2026): <https://cal.com/privacy>
- [V3] Google, Cloud Data Processing Addendum, secção 4.1: <https://cloud.google.com/terms/data-processing-addendum/>
- [V4] Google Calendar Help, appointment schedules: <https://support.google.com/calendar/answer/10729749>
- [V5] Infomaniak, "Show web access and error logs": <https://www.infomaniak.com/en/support/faq/1926/show-web-access-and-error-logs>
