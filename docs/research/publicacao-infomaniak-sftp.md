# Publicar na Infomaniak por SFTP a partir do GitHub Actions

> Pesquisa para o ticket [#16](https://github.com/juliensl/julien-devops-lp/issues/16) (mapa [#4](https://github.com/juliensl/julien-devops-lp/issues/4)).
> Data: 2026-10-12. O alojamento ainda não está contratado, por isso tudo o que se segue vem de documentação pública.
> Este documento **não decide** a pipeline. A decisão fica para o ticket "Como fica a pipeline?" ([#17](https://github.com/juliensl/julien-devops-lp/issues/17)).

## Pergunta

Como se publica o resultado de `npm run build` (`dist/`) no **Hébergement Web** da Infomaniak por **SFTP**, a partir do GitHub Actions, depois de um merge em `main`? Interessa saber:

- o que a oferta permite (SFTP, SSH, rsync, contas, autenticação, pasta de destino, HTTPS com o domínio na OVH, restrições de IP);
- como apagar ficheiros antigos e evitar um site publicado a meio;
- que ferramentas e actions existem e quão fiáveis são.

## Resumo

- **A oferta paga "Hébergement Web" inclui FTP/FTPES, SFTP e SSH** (SFTP na porta 22, servidor `xxxx.ftp.infomaniak.com`). A oferta gratuita **Starter só tem FTP sem TLS** e não serve para este projeto ([FAQ 446][f446], [tarifas][tarifs]).
- **A autenticação pode ser por palavra-passe ou por chave SSH.** A chave tem de ser **ed25519**, porque a Infomaniak recusa chaves RSA, e instala-se à mão em `~/.ssh/authorized_keys` ([FAQ 2054][f2054]). Uma conta com SFTP/SSH vê **todo o alojamento**: só as contas "FTP" podem ser limitadas a uma pasta ([FAQ 1982][f1982]).
- **Cada site tem uma pasta-alvo** (por exemplo `/sites/julienlaffont.com`), que se muda no Manager ([FAQ 1988][f1988], [FAQ 963][f963]). O HTTPS com Let's Encrypt instala-se num clique, depois de a OVH apontar os registos A/AAAA para o IP do site ([FAQ 2130][f2130], [FAQ 2025][f2025]).
- **A documentação não refere nenhuma lista de IPs autorizados (allow-list) para SSH/SFTP no alojamento partilhado.** O risco documentado é outro: o **banimento automático do IP** depois de várias falhas de login ([FAQ 2138][f2138]). Os runners do GitHub usam IPs partilhados que mudam ([GitHub Docs][gh-ip]).
- **Ferramentas:** rsync por SSH (apaga com `--delete-after` e põe os ficheiros no lugar quase de uma vez com `--delay-updates`), mas **a Infomaniak não documenta se tem rsync**; ou lftp `mirror --delete` só com SFTP. As actions de terceiros variam muito. Várias **desligam a verificação da chave do servidor** ou **apagam tudo antes de enviar**. Seja qual for a escolhida, deve ser fixada a um **SHA completo** ([GitHub Docs][gh-secure]).

## O que a oferta da Infomaniak permite

Fontes: FAQ oficiais da Infomaniak (versão francesa, "Mise à jour" 05–06/10/2026) e a página de tarifas, consultadas a 2026-10-12.

### Protocolos e acesso

| Tema | O que a documentação diz | Fonte |
|---|---|---|
| Protocolos na oferta base paga | "Lors de la création d'un site Web via un hébergement Apache / PHP, un accès aux fichiers est possible via différents protocoles (FTP, SFTP, SSH)." | [FAQ 446][f446] |
| Oferta Starter (gratuita) | "seule une connexion FTP sur le port 21 (sans SSL/TLS) est possible." A tabela de tarifas indica "Accès FTP sans SSH". | [FAQ 446][f446], [tarifas][tarifs] |
| Tabela de tarifas, "Hébergement Web" | Acesso "FTP/SFTP, WebFTP, SSH, WebSSH"; contas FTP/SFTP "Illimité"; "Accès FTP et SSH"; 20 sites incluídos. | [tarifas][tarifs] |
| SFTP | "utilisez le port 22 pour la connexion" | [FAQ 446][f446] |
| FTPES | Porta 21 com TLS explícito. O FTPS implícito (porta 2121) não é suportado. | [FAQ 446][f446] |
| FTP passivo | Portas passivas 42000–44000 abertas para ligações ao servidor FTP da Infomaniak. | [FAQ 446][f446] |
| Nome do servidor | Alojamento pago: "xyzb.ftp.infomaniak.com" (o nome exato aparece no Manager, em FTP / SSH). Para SSH: `ssh username@server`, com server do tipo "xxxx.ftp.infomaniak.com". | [FAQ 1083][f1083], [FAQ 1941][f1941] |
| Utilizador | O nome da conta criada no Manager, por exemplo "xyzb_abcdefg". | [FAQ 1083][f1083] |
| Linha de comandos | Há consola SSH no browser (Manager › FTP / SSH › Console SSH) e acesso por terminal. Para saber que comandos existem: `whereis`. Git está disponível no alojamento partilhado. | [FAQ 1941][f1941], [FAQ 402][f402], [FAQ 2463][f2463] |
| Caminho absoluto | Os exemplos usam `/home/clients/[123456789]/...` | [FAQ 2463][f2463] |

**O rsync não aparece em nenhuma página da Infomaniak que consultei.** O rsync por SSH precisa de rsync instalado nas duas máquinas: "rsync must be installed on both the source and destination machines" ([manual do rsync][rsync-man]). A FAQ 2463 mostra `git`, `mkdir`, `rm` e `cd` a correr por SSH, por isso é uma shell normal e não um acesso só SFTP. Mesmo assim, só se confirma que há rsync no servidor com `whereis rsync`, depois de contratar.

### Contas FTP/SSH

- **Criação:** Manager › alojamento › **FTP / SSH** › **Ajouter**. Ao criar um site Apache/PHP é criado automaticamente um utilizador "FTP/SSH/SFTP" ([FAQ 1982][f1982]).
- **Tipos de conta** ([FAQ 1982][f1982]):
  - "Un compte **FTP + SSH** donne accès à l'utilisateur en question à **tout le contenu d'un hébergement** et lui permet de le gérer par FTP/SFTP et SSH."
  - "Un compte **FTP** permet de restreindre l'accès d'un utilisateur à un dossier et ses sous-dossiers."
  - **Consequência (inferência, não confirmada):** a FAQ só associa o SFTP às contas FTP + SSH. Se assim for, a conta de deploy por SFTP vê todo o alojamento (todos os sites e `~/.ssh`), e não apenas a pasta da landing page. A FAQ não diz se uma conta "FTP" limitada a uma pasta também pode usar SFTP.
- **Palavra-passe:** é definida por quem cria a conta e "Il n'est pas possible d'afficher un mot de passe déjà appliqué". Se se perder, define-se uma nova ([FAQ 1083][f1083]).

### Autenticação por chave SSH

Fonte: [FAQ 2054][f2054].

- Indisponível com "site de type Node.js" e "hébergements Starter". Na oferta "Hébergement Web" (Apache/PHP) está disponível.
- É obrigatório usar um algoritmo moderno: `ssh-keygen -t ed25519`. Com uma chave RSA "la connexion sera refusée", com o erro `no mutual signature algorithm`.
- **Não há interface no Manager para chaves.** A instalação é manual por SSH: `cd ~` (raiz do alojamento), `mkdir .ssh` com CHMOD 700, e `authorized_keys` com a chave pública "sur une seule ligne", em CHMOD 600.
- "Le transfert d'agent SSH (ForwardAgent / ssh -A) n'est pas supporté".
- **Não confirmado:** como `authorized_keys` fica na raiz do alojamento, não é claro se uma chave instalada aí vale para uma conta específica ou para todas as contas FTP + SSH desse alojamento.

### Pasta de destino (web root)

- O alojamento é multissite e "Chacun de ces sites sont stockés dans un dossier de votre hébergement, lequel est la cible du site" ([FAQ 963][f963]).
- Ao acrescentar um site, "le nouveau site est ajouté au répertoire `/sites/domain2.xyz`". Também é possível "Définir l'emplacement manuellement" ([FAQ 1988][f1988]).
- A raiz de um site fica "généralement dans `/web` ou `/sites/domain.xyz`" ([FAQ 1282][f1282]). O caminho exato aparece no Manager, em Informations do site ([FAQ 2093][f2093]).
- **A pasta-alvo pode ser mudada:** Manager › site › **Paramètres avancés** › Gérer. O exemplo oficial muda `/web` para `/web/v2`, e recomenda criar a nova pasta ao lado e não dentro ([FAQ 963][f963]). É uma alteração manual no Manager. **Não confirmei** se há um endpoint da API da Infomaniak para fazer o mesmo (o [portal da API][ik-api] precisa de JavaScript e não o consegui ler).
- **URL de pré-visualização** (`XXX.preview.infomaniak.website`): permite testar o site antes de mudar o DNS. Só existe nas ofertas pagas e "est susceptible de changer en tout temps" ([FAQ 2060][f2060]).

### HTTPS e DNS com o domínio na OVH

- **Ligar um domínio registado noutro fornecedor** ("Ailleurs avec des DNS externes"): editar a zona DNS onde ela está (na OVH), "en y spécifiant l'adresse IP du site … sous forme d'enregistrement A". Também é possível passar a usar os DNS da Infomaniak. A propagação pode levar "jusqu'à 48 heures" ([FAQ 2025][f2025]).
- **IP do site:** aparece no Manager. O IPv4 é "en principe la même pour chacun des sites sur l'hébergement" e o IPv6 também aparece nos alojamentos pagos ([FAQ 1500][f1500]). Do lado da OVH: registo **A** (IPv4) e **AAAA** (IPv6), na zona DNS do domínio ([OVHcloud: editar zona DNS][ovh-dns]).
- **Let's Encrypt:** é gratuito e está incluído em todos os alojamentos ([tarifas][tarifs]). Instala-se em Manager › site › ⋮ › **Installer un certificat** › gratuito. **Pré-requisito:** "les DNS du nom de domaine doivent être correctement configurés pour pointer sur le site". Limites: 100 subdomínios; 20 certificados por 7 dias por domínio; 5 pedidos falhados por hora ([FAQ 2130][f2130]).
- **CAA:** sem registos CAA, qualquer autoridade pode emitir certificados. Se a zona OVH tiver registos CAA, tem de autorizar `letsencrypt.org` ([Let's Encrypt: CAA][le-caa]).
- **Não tem de ser um IP dedicado:** um IP dedicado não é necessário para SSL ([FAQ 2138][f2138]).

### Restrições de IP e outros bloqueios

- **Allow-list de IPs para SSH/SFTP: não encontrei nenhuma** para o alojamento partilhado. A única lista branca documentada é a "Déblocage définitif (IP sur liste blanche)", e só "Avec un Serveur Cloud" com IP dedicado ([FAQ 2138][f2138]).
- **Banimento automático:** depois de "tentatives répétées de connexions infructueuses par FTP, SSH" ou de "erreurs 403 en masse", "votre accès aux serveurs Infomaniak peut être bloqué suite au bannissement de l'adresse IP". Para desbloquear, é preciso contactar o suporte com o IP público ([FAQ 2138][f2138]).
- **IPs dos runners do GitHub:** a lista vem da chave `actions` de `GET /meta` e "is updated once a week". O GitHub "do[es] not recommend that you use these as allowlists" ([GitHub Docs][gh-ip]). **Consequência (inferência):** um deploy mal configurado que falhe o login várias vezes pode banir um IP de runner. O GitHub não oferece forma de pôr os IPs dos runners normais numa allow-list. **Não confirmado:** se a Infomaniak bloqueia à partida gamas de IPs de clouds (Azure). Nada na documentação o indica.
- **Antivírus nos uploads:** "L'antivirus scanne tous les fichiers envoyés inférieurs à 1 Mo". Se detetar algo suspeito, "le mot de passe du compte FTP est automatiquement modifié et les fichiers incriminés … sont verrouillés (FTPban)" ([FAQ 1302][f1302]). Um falso positivo faria a pipeline falhar até alguém intervir.

## Opções de publicação e trade-offs

### Apagar ficheiros que já não existem no build

| Mecanismo | Como apaga | Fonte |
|---|---|---|
| rsync por SSH | `--delete` / `--delete-after` ("receiver deletes after transfer, not during") / `--delete-delay` | [manual do rsync][rsync-man] |
| lftp `mirror -R` por SFTP | `-e, --delete` ("delete files not present at the source"). Existe também `--delete-first` ("delete old files before transferring new ones"), que deve ser evitado. | [manual do lftp][lftp-man] |
| `sftp -b` (OpenSSH) | Não sincroniza: `put -r` só envia. Apagar exige comandos `rm`/`rmdir` explícitos. Suporta `rename` e `symlink` em modo batch. | [sftp(1)][sftp-man] |
| Actions "clean slate" | Apagam a pasta remota inteira antes de enviar (ver tabela de ferramentas). Durante o envio o site fica vazio ou incompleto. | código das actions |

**Atenção ao alvo do `--delete`:** apaga tudo o que estiver na pasta-alvo e não exista em `dist/`.

- Um `.htaccess` (cache, redirecionamento HTTPS) tem de viver em `public/`. O Astro copia `public/` "as-is" para o build ([Astro: configuração][astro-config]).
- A pasta-alvo **nunca** pode ser a raiz do alojamento (`~`), onde está `.ssh/authorized_keys`. Um `--delete` aí apagaria a própria chave de acesso.

### Evitar um site publicado a meio

**A. Sincronização no lugar, com as alterações aplicadas no fim**

- `rsync --delay-updates --delete-after`: com `--delay-updates`, os ficheiros alterados ficam numa pasta `.~tmp~` até ao fim e depois "are renamed into place in rapid succession". Segundo o manual, isto "attempts to make the updating of the files a little closer to atomic". Ocupa espaço extra para uma cópia dos ficheiros alterados ([manual do rsync][rsync-man]).
- O Astro ajuda: o build põe os assets em `_astro/` "with hashed filenames" ([Astro: nomes de ficheiros][astro-hash]). Os assets novos têm nomes novos, por isso o HTML antigo deve continuar a funcionar até ao fim do envio, desde que as remoções fiquem para o fim (inferência).
- **Vantagem:** um único comando, sem configuração no servidor. **Limite:** não é atómico, e voltar atrás significa reenviar um commit anterior.

**B. Uma pasta por versão e depois troca**

- **B1, com symlink:** a pasta-alvo do site é um symlink para `releases/<sha>`. A troca faz-se mudando o nome de um symlink novo por cima do antigo. Por SSH: `ln -sfn` para um nome temporário e depois `mv -T`. Por SFTP existem `symlink` e `rename` ([sftp(1)][sftp-man]), mas o manual não diz se `rename` substitui um destino que já existe, nem se o faz de forma atómica. Isso depende do servidor SFTP. **Não documentado pela Infomaniak:** se a pasta-alvo de um site pode ser um symlink (Apache com `FollowSymLinks`). Tem de ser testado.
- **B2, com duas mudanças de nome:** `current → old` e depois `new → current`, por SFTP `rename` ou por SSH `mv`. Não precisa de symlinks, mas entre as duas operações há um instante em que a pasta não existe e o site pode responder 404.
- **B3, mudando a pasta-alvo no Manager** ([FAQ 963][f963]): é a única troca documentada oficialmente, mas é manual. Serve para um rollback feito à mão, não para CI (a API não foi verificada).
- **Vantagem:** a troca é rápida e a versão anterior fica pronta para rollback. **Limite:** mais passos, limpeza das versões antigas, e B1 depende de um comportamento não documentado.

**C. Apagar tudo e enviar de novo:** é a mais simples, mas o site fica partido durante o envio. É o que fazem `delete_remote_files` (wlixcc) e `rm: true` (appleboy). Não é recomendável.

**Comparação de ficheiros:** cada `npm run build` cria ficheiros com datas novas.

- O rsync usa por omissão um "quick check" por tamanho e data, por isso reenviaria tudo. Com `--checksum` compara checksums dos ficheiros com o mesmo tamanho ([manual do rsync][rsync-man]).
- O lftp compara tamanho e data e não tem comparação por checksum. As alternativas são `--ignore-time`, que compara só o tamanho e pode falhar alterações com o mesmo tamanho, ou reenviar tudo ([manual do lftp][lftp-man]).
- Para uma landing page pequena, reenviar tudo é aceitável.

**Deploys em simultâneo:** com `concurrency` no workflow, "there can be at most one running job or workflow in a concurrency group at any time". Num deploy, `cancel-in-progress: true` pode interromper um envio a meio ([GitHub Docs: concurrency][gh-conc]).

### Cache

- Os assets em `_astro/` têm nomes com hash e são, nas palavras da documentação do Astro, "excellent for long-term caching" ([Astro][astro-hash]). Podem ter cache longa.
- O HTML deve ter cache curta ou revalidar, para que um deploy novo apareça logo.
- A Infomaniak documenta `mod_expires` num `.htaccess` na raiz do site. O exemplo dela põe "text/html "access plus 1 week"", o que é demasiado para HTML que muda a cada deploy. O Apache envia `Last-Modified` e responde 304 por omissão ([FAQ 1282][f1282]).
- O `.htaccess` deve estar em `public/` para fazer parte de `dist/` e não ser apagado pelo `--delete`.

## Ferramentas candidatas

Dados de atividade obtidos com a API do GitHub a 2026-10-12. Os comportamentos foram lidos em `action.yml`, `entrypoint.sh`, `Dockerfile` e no README de cada repositório.

**Runner `ubuntu-24.04`:** traz `rsync 3.2.7`, `openssh-client 9.6p1` (com `ssh`, `sftp`, `scp`, `ssh-keyscan`) e `sshpass`. **O `lftp` não vem pré-instalado** e tem de se instalar com `apt-get` ([runner-images, Ubuntu 24.04, imagem 20261004][runner-img]).

| Ferramenta | Mantenedor | Atividade | Protocolo | Autenticação | Apaga remotos? | Chave do servidor (host key) | Notas |
|---|---|---|---|---|---|---|---|
| `rsync` + `ssh` num passo `run:` | Projeto rsync / OpenSSH | Pré-instalados no runner | rsync por SSH | Chave (ficheiro) | Sim: `--delete-after`, `--delay-updates` | Controlo total (`known_hosts` guardado num secret) | Sem código de terceiros. **Precisa de rsync no servidor (não documentado).** |
| `lftp mirror -R` num passo `run:` | Projeto lftp | Instalar com `apt-get` | SFTP | Palavra-passe, ou chave via `sftp:connect-program "ssh -a -x -i …"` | Sim: `--delete` | Usa o `ssh` do sistema. `sftp:auto-confirm` está desligado por omissão. | Só precisa de SFTP, que está documentado. Sem comparação por checksum. |
| `sftp -b` num passo `run:` | OpenSSH | Pré-instalado | SFTP | Chave (o modo batch exige autenticação não interativa) | Só `rm` explícitos | Controlo total | Útil para o passo de troca (`rename`/`symlink`), não para sincronizar. |
| [Burnett01/rsync-deployments][a-burnett] | Burnett01 (pessoa) | v9 (2026-09-04), último commit 2026-09-08, ~450★ | rsync por SSH (Docker, Alpine fixada por digest) | Chave (+ passphrase) | Sim, via `switches` (ex. `--delete`) | Por omissão `StrictHostKeyChecking=no`. `strict_hostkeys_checking: true` faz `ssh-keyscan` no momento: confia na primeira chave que vê, sem fixar uma chave conhecida. | Ativo. Só corre em runners Linux (container). |
| [easingthemes/ssh-deploy][a-easing] | easingthemes (pessoa) | v6.0.1 (2026-04-02), node24, ~1,3k★ | rsync por SSH | Chave | Sim, via `ARGS` (ex. `--delete`) | `SSH_CMD_ARGS` por omissão `-o StrictHostKeyChecking=no` (configurável) | `SCRIPT_BEFORE`/`SCRIPT_AFTER` correm comandos remotos (serviria para a troca). O README sugere chaves RSA PEM, mas a Infomaniak recusa RSA. O código escreve a chave tal como vem, por isso ed25519 deve funcionar (a testar). |
| [SamKirkland/web-deploy][a-webdeploy] | Sam Kirkland (pessoa) | v1 (2022), último commit 2023-03-01, `runs.using: node16` | rsync por SSH | Chave | Sim, `--delete-after` por omissão | Não documentado | **Pouco ativo.** Declara node16, e o GitHub retirou o Node 20 a 2026-09-23 e passou para o Node 24 ([changelog][gh-node]). Não é claro como uma action node16 se comporta agora. |
| [SamKirkland/FTP-Deploy-Action][a-ftpdeploy] | Sam Kirkland (pessoa) | v4.4.0 (2026-04-23), node24, ~5,3k★ | **FTP/FTPS apenas** | Palavra-passe | Sim, com base num ficheiro de estado `.ftp-deploy-sync-state.json`; `dangerous-clean-slate` | n/a (TLS) | **Não faz SFTP.** O README manda quem tem SSH para o web-deploy. Funcionaria com o FTPES da Infomaniak (porta 21), mas não cumpre o brief (SFTP). |
| [wlixcc/SFTP-Deploy-Action][a-wlixcc] | wlixcc (pessoa) | v1.2.6 (2025-04), último commit 2026-03, **sem licença** | SFTP (`put -r`) + SSH para `mkdir`/`rm` | Chave ou palavra-passe (`sshpass`) | Só `delete_remote_files`: faz `rm -rf` da pasta **antes** do envio | `StrictHostKeyChecking=no` fixo no código | Apaga tudo antes de enviar e não verifica o servidor. |
| [appleboy/scp-action][a-appleboy] | appleboy (pessoa) | v1.0.0 (2025-04), último commit 2026-08, ~1,6k★ | tar + scp + extração no servidor | Chave ou palavra-passe | Só `rm: true`: remove a pasta **antes** do envio | Input `fingerprint` (sem ele, "host key verification is skipped") | Descarrega o binário `drone-scp` do GitHub a cada execução. Precisa de `tar` no servidor. |
| [pressidium/lftp-mirror-action][a-pressidium] | Pressidium (empresa) | v1 (2022-11), último commit 2024-01, ~40★ | SFTP (lftp mirror, Docker Alpine 3.15) | **Só palavra-passe** (`pass` obrigatório) | Sim, via `options: --delete` | Input `fingerprint`, senão `ssh-keyscan` | Pouco ativo. A linha do `lftp` (que leva a palavra-passe) corre com `xtrace`. O GitHub mascara os secrets nos logs, mas é uma prática frágil. |
| [milanmk/actions-file-deployer][a-milanmk] | milanmk (pessoa) | 1.18 (2026-04-25), composite | FTP/SFTP via lftp | Chave ou palavra-passe | Modo `mirror`. O modo "delta" usa o `git diff` do repositório e não se aplica a `dist/`, que não está no git. | `StrictHostKeyChecking=no` fixo | Instala lftp com `apt-get`. |

### Boas práticas de segurança

- **Fixar actions de terceiros a um SHA completo:** "Pinning an action to a full-length commit SHA is currently the only way to use an action as an immutable release." Uma tag "can be moved or deleted if a bad actor gains access to the repository". O GitHub tem políticas para exigir que as actions estejam fixadas a um SHA ([GitHub Docs: uso seguro][gh-secure]). O Dependabot atualiza actions fixadas, mas "will not create alerts for actions pinned to SHA values" (mesma fonte). Isto pesa a favor de usar comandos do sistema (`rsync`, `lftp`, `sftp`) em vez de uma action.
- **Verificar a chave do servidor (host key):**
  - Guardar a linha de `known_hosts` num secret e usar `StrictHostKeyChecking=yes`, em vez de `ssh-keyscan` em cada execução ou de `StrictHostKeyChecking=no`.
  - **Não encontrei as impressões digitais (fingerprints) das chaves dos servidores de alojamento Web publicadas pela Infomaniak** (só as do Swiss Backup, [FAQ 2889][f2889]). Essa FAQ também mostra que a Infomaniak por vezes muda as chaves dos servidores SFTP. Nesse caso o deploy falha em segurança e o secret tem de ser atualizado.
- **Secrets:**
  - Para criar secrets de repositório num repositório pessoal é preciso ser "repository collaborator". Os secrets de environment exigem ser "the repository owner" ([GitHub Docs: secrets][gh-secrets]).
  - Os secrets "are not passed to the runner when a workflow is triggered from a forked repository" (mesma fonte).
  - Na documentação do GitHub, "Users with GitHub Free plans can only configure environments for public repositories" ([GitHub Docs: environments][gh-env]). **Este repositório é privado** (verificado pela API). Com GitHub Free, só há secrets de repositório, sem regras de proteção por environment.
- **Usar uma chave só para o deploy:** um par ed25519 dedicado à CI, diferente da chave pessoal do Julien e fácil de revogar em `authorized_keys`.

### Exemplo ilustrativo (não é a decisão)

> **ILUSTRATIVO.** Este exemplo serve só para mostrar a mecânica e não deve ser copiado para o repositório tal como está. A forma final da pipeline decide-se no ticket "Como fica a pipeline?". Os nomes dos secrets e o caminho remoto são exemplos.

```yaml
# Excerto ILUSTRATIVO de um job de deploy (rsync por SSH, host key fixa)
on:
  push:
    branches: [main]
concurrency:
  group: deploy-producao
  cancel-in-progress: false   # não interromper um envio a meio
jobs:
  deploy:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@<SHA-completo>      # fixar por SHA
      - uses: actions/setup-node@<SHA-completo>
        with: { node-version: 24 }
      - run: npm ci && npm run build
      - name: Publicar dist/ por rsync/SSH
        env:
          SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}            # chave ed25519 privada
          KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}    # linha(s) de known_hosts verificadas
          TARGET: ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}
        run: |
          install -m 700 -d ~/.ssh
          printf '%s\n' "$SSH_KEY" > ~/.ssh/deploy_key && chmod 600 ~/.ssh/deploy_key
          printf '%s\n' "$KNOWN_HOSTS" > ~/.ssh/known_hosts
          rsync -rlz --checksum --delay-updates --delete-after \
            -e "ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=yes" \
            dist/ "$TARGET:sites/julienlaffont.com/"
```

Variante só com SFTP (ILUSTRATIVA, a testar), se o servidor não tiver rsync:

```sh
sudo apt-get install -y lftp
lftp -e "set sftp:connect-program 'ssh -a -x -i ~/.ssh/deploy_key'; \
         mirror --reverse --delete --verbose dist/ sites/julienlaffont.com/; bye" \
     -u "$DEPLOY_USER," "sftp://$DEPLOY_HOST"
```

## Implicações para a decisão

### Opções

| Opção | A favor | Contra | Depende de |
|---|---|---|---|
| **1. rsync por SSH**, com comandos próprios ou uma action ativa (Burnett01, easingthemes) | Eficiente (`--checksum`); apaga no fim; `--delay-updates` aproxima-se de uma troca atómica | Não é atómico; com uma action há código de terceiros (fixar por SHA) | **rsync no servidor**, a confirmar com `whereis rsync` |
| **2. lftp `mirror -R --delete` por SFTP** | Só depende de SFTP, que está documentado; usa ferramentas do sistema | Instalar lftp no runner; sem checksum (reenvia tudo, aceitável aqui); não é atómico | Conta FTP + SSH |
| **3. Pasta por versão + troca** (B1 symlink / B2 rename) | Troca quase instantânea; rollback imediato | Mais passos e limpeza; B1 depende de um comportamento não documentado; B2 tem um instante sem pasta | Testes no servidor (symlink como pasta-alvo) |
| **4. FTPES com FTP-Deploy-Action** (fora do brief) | Conta FTP limitada a uma pasta (privilégio mínimo); action muito usada | **Não é SFTP**; só palavra-passe | Alterar o requisito do brief |

**A evitar:** actions que apagam tudo antes de enviar (`delete_remote_files` do wlixcc, `rm: true` do appleboy) e actions que desligam a verificação da chave do servidor sem permitir fixá-la.

### O que o Julien tem de fornecer ou configurar

Só ele é dono do repositório e da conta Infomaniak/OVH.

1. **Contratar o "Hébergement Web"** (não o Starter) e criar o site `julienlaffont.com`. Anotar a pasta-alvo (provavelmente `/sites/julienlaffont.com`), o IPv4/IPv6 do site e o URL de pré-visualização.
2. **Criar uma conta FTP + SSH dedicada ao deploy** (Manager › FTP / SSH › Ajouter) e anotar o servidor (`xxxx.ftp.infomaniak.com`) e o utilizador.
3. **Gerar um par ed25519 só para a CI** e instalar a chave pública em `~/.ssh/authorized_keys` (700/600), pela consola SSH.
4. **Verificar no servidor**, antes de decidir: `whereis rsync` (e `tar`); se interessar a opção 3, se a pasta-alvo aceita um symlink.
5. **Obter a host key** do servidor (por exemplo `ssh-keyscan` a partir de uma rede de confiança, comparada com o primeiro login manual) e guardá-la num secret.
6. **Criar os secrets no GitHub** (os nomes são exemplos): `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (ou palavra-passe, se se escolher lftp com palavra-passe) e `DEPLOY_KNOWN_HOSTS`. O caminho remoto pode ser uma variável.
7. **DNS na OVH:** registos A (IPv4) e AAAA (IPv6) para `julienlaffont.com` e `www`, a apontar para o site Infomaniak. Remover os registos antigos que apontem para outro lado e verificar os CAA. Esperar a propagação (até 48 h segundo a Infomaniak).
8. **HTTPS:** depois do DNS, instalar o certificado Let's Encrypt no Manager e ativar o redirecionamento para HTTPS (a [FAQ 2130][f2130] remete para um guia próprio).
9. **Proteção do ramo `main`:** fica fora deste ticket, mas é necessária para "publicar só depois de merge".

## O que não foi possível confirmar

- **rsync** e **tar** no servidor de alojamento partilhado: não estão documentados e só se verificam depois de contratar.
- Se uma conta **"FTP" limitada a uma pasta** pode usar **SFTP**. A documentação só associa SFTP às contas FTP + SSH.
- Se `~/.ssh/authorized_keys` (na raiz do alojamento) vale **por conta** ou para **todas** as contas FTP + SSH.
- Se a **pasta-alvo de um site pode ser um symlink**, e se há um **endpoint da API** da Infomaniak para mudar a pasta-alvo (o portal da API precisa de JavaScript).
- Se a Infomaniak **bloqueia gamas de IPs de cloud** à partida. Só está documentado o banimento depois de falhas.
- As **impressões digitais das chaves (host keys)** dos servidores `*.ftp.infomaniak.com`: não estão publicadas.
- **Preço:** a página de tarifas, tal como foi servida nesta pesquisa, mostrou "Dès CHF 10.91 par mois" para o Hébergement Web (sem IVA). O valor em euros do brief (~5,75 € sem IVA) não foi reconfirmado.
- Como o runner trata hoje uma action `node16` (SamKirkland/web-deploy), depois da retirada do Node 20.

## Fontes

Infomaniak (FAQ oficiais, consultadas a 2026-10-12):

- [FAQ 446: protocolos de transferência][f446]
- [FAQ 1982: gerir contas FTP / SSH][f1982]
- [FAQ 1083: aceder por FTP com uma aplicação (servidor, utilizador, palavra-passe)][f1083]
- [FAQ 1941: ligar por SSH e usar a linha de comandos][f1941]
- [FAQ 2054: ligar com chave SSH][f2054]
- [FAQ 402: Git no alojamento][f402] e [FAQ 2463: Git e GitHub com o Hébergement Web][f2463]
- [FAQ 963: mudar a pasta de um site][f963]
- [FAQ 1988: acrescentar um site a um alojamento][f1988]
- [FAQ 2093: caminho absoluto do alojamento e do site][f2093]
- [FAQ 2060: URL de pré-visualização][f2060]
- [FAQ 2025: ligar um domínio a um Hébergement Web][f2025]
- [FAQ 1500: IP do site][f1500]
- [FAQ 2130: certificado Let's Encrypt][f2130]
- [FAQ 2138: problemas de IP (banimento, lista branca)][f2138]
- [FAQ 1302: bloqueio FTP pelo antivírus][f1302]
- [FAQ 1282: cabeçalhos de cache][f1282]
- [FAQ 2889: alerta SFTP e impressões digitais (Swiss Backup)][f2889]
- [Tarifas e características do alojamento][tarifs]
- [Portal da API (não legível sem JavaScript)][ik-api]

OVHcloud e Let's Encrypt:

- [OVHcloud: editar uma zona DNS][ovh-dns]
- [Let's Encrypt: CAA][le-caa]

GitHub:

- [Uso seguro (fixar por SHA, secrets)][gh-secure]
- [Runners alojados pelo GitHub: endereços IP][gh-ip]
- [Usar secrets][gh-secrets]
- [Gerir environments][gh-env]
- [Concorrência de workflows][gh-conc]
- [Changelog: Node 20 deixa de estar disponível (2026-09-23)][gh-node]
- [runner-images: Ubuntu 24.04][runner-img]

Ferramentas:

- [Manual do rsync][rsync-man]
- [Manual do lftp][lftp-man]
- [OpenSSH sftp(1)][sftp-man]
- [Astro: referência de configuração][astro-config]
- [Astro: nomes de ficheiros no build][astro-hash]
- Repositórios das actions: [Burnett01/rsync-deployments][a-burnett], [easingthemes/ssh-deploy][a-easing], [SamKirkland/web-deploy][a-webdeploy], [SamKirkland/FTP-Deploy-Action][a-ftpdeploy], [wlixcc/SFTP-Deploy-Action][a-wlixcc], [appleboy/scp-action][a-appleboy], [pressidium/lftp-mirror-action][a-pressidium], [milanmk/actions-file-deployer][a-milanmk]

[f446]: https://faq.infomaniak.com/446
[f1982]: https://faq.infomaniak.com/1982
[f1083]: https://faq.infomaniak.com/1083
[f1941]: https://faq.infomaniak.com/1941
[f2054]: https://faq.infomaniak.com/2054
[f402]: https://faq.infomaniak.com/402
[f2463]: https://faq.infomaniak.com/2463
[f963]: https://faq.infomaniak.com/963
[f1988]: https://faq.infomaniak.com/1988
[f2093]: https://faq.infomaniak.com/2093
[f2060]: https://faq.infomaniak.com/2060
[f2025]: https://faq.infomaniak.com/2025
[f1500]: https://faq.infomaniak.com/1500
[f2130]: https://faq.infomaniak.com/2130
[f2138]: https://faq.infomaniak.com/2138
[f1302]: https://faq.infomaniak.com/1302
[f1282]: https://faq.infomaniak.com/1282
[f2889]: https://faq.infomaniak.com/2889
[tarifs]: https://www.infomaniak.com/fr/hebergement/tarifs-et-caracteristiques
[ik-api]: https://developer.infomaniak.com/docs/api
[ovh-dns]: https://help.ovhcloud.com/csm/en-dns-edit-dns-zone?id=kb_article_view&sysparm_article=KB0051682
[le-caa]: https://letsencrypt.org/docs/caa/
[gh-secure]: https://docs.github.com/en/actions/reference/security/secure-use
[gh-ip]: https://docs.github.com/en/actions/reference/runners/github-hosted-runners
[gh-secrets]: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets
[gh-env]: https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments
[gh-conc]: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency
[gh-node]: https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/
[runner-img]: https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md
[rsync-man]: https://download.samba.org/pub/rsync/rsync.1
[lftp-man]: https://lftp.yar.ru/lftp-man.html
[sftp-man]: https://man.openbsd.org/sftp.1
[astro-config]: https://docs.astro.build/en/reference/configuration-reference/
[astro-hash]: https://docs.astro.build/en/recipes/customizing-output-filenames/
[a-burnett]: https://github.com/Burnett01/rsync-deployments
[a-easing]: https://github.com/easingthemes/ssh-deploy
[a-webdeploy]: https://github.com/SamKirkland/web-deploy
[a-ftpdeploy]: https://github.com/SamKirkland/FTP-Deploy-Action
[a-wlixcc]: https://github.com/wlixcc/SFTP-Deploy-Action
[a-appleboy]: https://github.com/appleboy/scp-action
[a-pressidium]: https://github.com/pressidium/lftp-mirror-action
[a-milanmk]: https://github.com/milanmk/actions-file-deployer
