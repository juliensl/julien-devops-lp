# Que ferramentas dão os fornecedores cloud para ver e controlar os custos?

> Pesquisa de apoio ao ticket [«Que pesos e limiares usa o gráfico de fornecedores cloud?»](https://github.com/juliensl/julien-devops-lp/issues/46) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes oficiais consultadas a **19/10/2026**, só documentação: nenhuma consola foi aberta.
> Este documento **não classifica** os fornecedores. O valor de cada um no critério «Visibilidade e controlo dos custos» é uma opinião do Julien e fica no ticket.
> Completa a pesquisa [«Que factos distinguem os fornecedores cloud para cada tipo de empresa?»](https://github.com/juliensl/julien-devops-lp/blob/research/factos-fornecedores-cloud/docs/research/factos-fornecedores-cloud.md) (16/10/2026), que já tinha os alertas e limites de gastos, mas não as ferramentas para ver os custos.

## Pergunta

Que ferramentas nativas dão AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway e Infomaniak para ver os custos de cloud (painel, repartição, previsão, exportação) e para os controlar (alertas, limites)?

## Resumo

- **Painel de custos:** existe nos cinco primeiros. Na Infomaniak não se encontrou nenhum painel documentado, só a API e a CLI de «rating» (CloudKitty).
- **Repartição:** AWS, Google Cloud e Azure dividem por projeto, por recurso ou produto e por etiqueta. A OVHcloud e a Scaleway dividem por projeto e por recurso ou produto, sem etiquetas encontradas. A Infomaniak só divide pela API, por tipo de recurso.
- **Previsão do fim do mês:** AWS, Google Cloud, Azure e OVHcloud. Não encontrada na Scaleway nem na Infomaniak.
- **Exportação:** todos têm API. Os dados detalhados exportam-se para armazenamento ou para o BigQuery em todos menos na Scaleway (relatório mensal para descarregar e FinOps API em Beta) e na Infomaniak (CSV não encontrado).
- **Controlo** (confirmação de dois factos de 16/10/2026): a Infomaniak não tem alertas de orçamento nativos, só quotas de recursos por projeto; os alertas da Scaleway só avisam e não param nada.

## 1. Painel nativo de custos

| Fornecedor | Nome | Citação |
|---|---|---|
| AWS | Cost Explorer | «a tool that enables you to view and analyze your costs and usage» [1] |
| Google Cloud | Cloud Billing Reports e Cost table | «Cloud Billing Reports» [4] |
| Microsoft Azure | Cost Management, Cost Analysis | «Cost Analysis is your tool for interactive analytics» [8] |
| OVHcloud | Projeto > Facturation > «Ma consommation actuelle» | «`Public Cloud` > Sélectionnez votre projet > `Facturation`» [12] |
| Scaleway | Billing > Consumption > Cost Manager | «a comprehensive tool to monitor and analyze cloud resource consumption and costs» [16] |
| Infomaniak | **Não encontrado** no Manager. Só a API e a CLI de «rating» (CloudKitty) | «You can query these metrics at any time» [24] |

## 2. Repartição dos custos

| Fornecedor | Por projeto ou conta | Por recurso ou produto | Por etiqueta |
|---|---|---|---|
| AWS | «Linked account» [2] | Por serviço; por recurso só no EC2: «available for Amazon EC2 instances» [2]. O CUR permite «by product or product resource» [3] | «Tag» [2] |
| Google Cloud | «Project» [5] | «Service», «SKU» [5]; por recurso só no export detalhado: «resource-level cost data» [6] | «Label keys» [5] |
| Microsoft Azure | «Subscription», «Resource group» [9] | «Break down costs by resource» [9] | «Break down costs by tag values» [9] |
| OVHcloud | «Chaque projet cloud a donc sa propre facture» [12] | «voir le détail des ressources» [12] | **Não encontrado.** O guia de landing zone só recomenda tags «for accurate cost allocation» [15] |
| Scaleway | «Project» [16] | «Category», «Product» e uma «detailed list of your resource consumption» [16] | **Não encontrado** no Cost Manager nem no esquema da FinOps API |
| Infomaniak | Só pela API e só para o projeto do utilizador: «limited to the user's project» [25] | Por tipo de recurso: «groupby=service» [25] | **Não encontrado** |

## 3. Previsão da fatura do fim do mês

| Fornecedor | Previsão | Citação |
|---|---|---|
| AWS | Sim | «forecast how much you're likely to spend for the next 18 months» [1] |
| Google Cloud | Sim | «Total forecasted cost for the entire current month» [5] |
| Microsoft Azure | Sim, nos gráficos de área e de colunas; o indicador de previsão está em preview | «Forecast costs are available in both smart and custom views» [8] |
| OVHcloud | Sim | «Estimation de ma prochaine facture» [12] |
| Scaleway | **Não encontrado.** O painel «Current consumption» «estimates your charges for the current month» [23], sem dizer se projeta até ao fim do mês | — |
| Infomaniak | **Não encontrado** | — |

## 4. Exportação e API

| Fornecedor | O que existe | Citação |
|---|---|---|
| AWS | CUR em CSV para o S3; Cost Explorer API a 0,01 USD por pedido | «publish your AWS billing reports to an Amazon Simple Storage Service (Amazon S3) bucket» [3]; «Each paginated API request incurs a charge of $0.01» [1] |
| Google Cloud | Export para o BigQuery; CSV a partir da Cost table | «automatically throughout the day to a BigQuery dataset» [6]; «The CSV report is a flat file» [7] |
| Microsoft Azure | Exports para o Azure Storage; Query API e Cost Details API [11] | «Choose the Format as CSV or Parquet» [10] |
| OVHcloud | Export FOCUS em CSV para um bucket S3, configurado por API; API `/usage/current` e `/usage/forecast` | «sous forme de fichier CSV» [13]; «Get usage forecast» [14] |
| Scaleway | Relatório do mês para descarregar; Billing API; FinOps API em Beta desde 03/06/2026 | «consumption report for the current month, are available for download» [19]; «FinOps API now available in Beta» [20] |
| Infomaniak | API e CLI CloudKitty; exportação CSV **não encontrada** | «openstack rating dataframes get» [24] |

## 5. Frescura dos dados

| Fornecedor | Citação |
|---|---|
| AWS | «refreshes your cost data at least once every 24 hours» [1]; CUR «up to three times a day» [3] |
| Google Cloud | «Typically, your cost details are available within a day» [5] |
| Microsoft Azure | «updated six times per day»; dados disponíveis «within 8-24 hours» (EA/MCA) ou até «72 hours» (pay-as-you-go) [11] |
| OVHcloud | Consola: **não encontrado**. O export pode correr «chaque heure» [13] |
| Scaleway | O gráfico circular é «calculated in real-time» [17]. Cost Manager: **não encontrado** |
| Infomaniak | «the billing is calculated every hour» [24] |

## 6. Controlo: confirmação de dois factos

| Facto | Resultado |
|---|---|
| Infomaniak: há alertas de orçamento? | **Não há alertas nativos.** Procurados em docs.infomaniak.cloud (103 páginas do sitemap), nas FAQ 2602, 2604 e 2605 e nas páginas de produto. A documentação do CloudKitty só fala de «Automated budget alerts» como algo que o cliente constrói com a API [25]. O que existe são limites de recursos: «afin d'éviter de se retrouver avec une facture trop élevée» [27] e «quota packs (level 1, 2 or 3)» [26]. |
| Scaleway: os Billing Alerts só avisam? | **Só avisam.** Os alertas «notify you when predefined budget thresholds are met» por SMS, email ou webhook [18]. Não há bloqueio: «you cannot configure a specific threshold after which your usage will be blocked» (FAQ das Generative APIs) [22]. O budget da CLI tem «consumption-limit», descrito como «Cost limit for the budget», e a CLI só lhe associa alertas e notificações; nada diz que pare recursos [21]. |

Os outros factos de controlo vêm da pesquisa de 16/10/2026: AWS Budgets com alertas e ações automáticas; Google Cloud com alertas e «spend cap budgets» que param alguns serviços (Cloud Run, Gemini API); Azure Budgets só com alertas (o «spending limit» só existe em subscrições com créditos); OVHcloud com alerta por email quando a previsão de consumo passa um limite.

## Limites

- **Só documentação.** Nenhuma consola foi aberta. «Não encontrado» quer dizer ausente da documentação, não prova de que não existe.
- **Infomaniak:** pode haver um ecrã de consumo no Manager que não está documentado.
- **OVHcloud:** a frescura dos dados na consola e a repartição por etiqueta não foram encontradas. O formato FOCUS prevê uma coluna de tags, mas não se confirmou se a OVHcloud a preenche.
- **Scaleway:** previsão e etiquetas não encontradas na documentação.
- **AWS:** citada a página do CUR clássico; o novo AWS Data Exports não foi verificado.
- **Google Cloud:** não há API de leitura de custos além do export para o BigQuery.

## Fontes

1. AWS Cost Explorer: <https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html>
2. AWS Cost Explorer, filtros: <https://docs.aws.amazon.com/cost-management/latest/userguide/ce-filtering.html>
3. AWS Cost and Usage Reports: <https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html>
4. Google Cloud Billing Reports (13/10/2026): <https://docs.cloud.google.com/billing/docs/reports>
5. Google Cloud, ver relatórios (13/10/2026): <https://docs.cloud.google.com/billing/docs/how-to/reports>
6. Google Cloud, export para o BigQuery (13/10/2026): <https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery>
7. Google Cloud, Cost table (13/10/2026): <https://docs.cloud.google.com/billing/docs/how-to/cost-table>
8. Azure Cost Analysis (17/03/2026): <https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis>
9. Azure, agrupar e filtrar (25/03/2026): <https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/group-filter>
10. Azure Exports (26/09/2025): <https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports>
11. Azure, dados do Cost Management (02/06/2026): <https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/understand-cost-mgt-data>
12. OVHcloud, analisar a faturação do Public Cloud (31/07/2026): <https://docs.ovhcloud.com/fr/guides/public-cloud/cross-functional/analyze-billing>
13. OVHcloud, exportar dados de faturação para um bucket (31/08/2026): <https://docs.ovhcloud.com/fr/guides/manage-and-operate/cost-center/export-billing-data-to-bucket>
14. OVHcloud API, esquema `cloud`: <https://eu.api.ovh.com/1.0/cloud.json>
15. OVHcloud, landing zone (02/09/2025): <https://docs.ovhcloud.com/en/guides/public-cloud/cross-functional/whats-is-landing-zone>
16. Scaleway Cost Manager (16/10/2025): <https://www.scaleway.com/en/docs/billing/how-to/use-the-cost-manager/>
17. Scaleway, conceitos de faturação (25/08/2025): <https://www.scaleway.com/en/docs/billing/concepts/>
18. Scaleway Billing Alerts (03/09/2025): <https://www.scaleway.com/en/docs/billing/how-to/use-billing-alerts/>
19. Scaleway, FAQ de faturação (09/09/2025): <https://www.scaleway.com/en/docs/billing/faq/>
20. Scaleway, changelog (entrada de 03/06/2026): <https://www.scaleway.com/en/docs/changelog/>
21. Scaleway CLI, billing: <https://www.scaleway.com/en/developers/cli/billing/>
22. Scaleway Generative APIs, FAQ (13/04/2026): <https://www.scaleway.com/en/docs/generative-apis/faq/>
23. Scaleway, preços das Instances (19/08/2025): <https://www.scaleway.com/en/docs/instances/reference-content/understanding-instance-pricing/>
24. Infomaniak Public Cloud, faturação: <https://docs.infomaniak.cloud/metering/billing/>
25. Infomaniak Public Cloud, CloudKitty: <https://docs.infomaniak.cloud/identity/policies/cloud-kitty/>
26. Infomaniak Public Cloud, quotas: <https://docs.infomaniak.cloud/quotas/>
27. Infomaniak, FAQ 2602 «Découvrir Public Cloud Infomaniak»: <https://www.infomaniak.com/fr/support/faq/2602/decouvrir-public-cloud-infomaniak>
