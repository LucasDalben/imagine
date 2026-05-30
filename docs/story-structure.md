# Estrutura Padrão das Histórias — Imagine

## Tipos de Página

| Código | Tipo | Descrição |
|--------|------|-----------|
| **N** | Normal | Narrativa pura — 1 escolha de "continuar" |
| **C2** | Decisão 2 | 2 caminhos: um bom, um que gera penalidade futura |
| **C3** | Decisão 3 | 3 caminhos: bom / penalidade futura / fim ruim |
| **BR** | Fim Ruim | Bad ending — história encerra aqui |
| **FM** | Fim Médio | Sobreviveu, mas não venceu de tudo |
| **FB** | Fim Bom | Vitória total — melhor final possível |

---

## Regras de Ramificação

### C3 — 3 caminhos

```
Opção A → trilha principal (sem custo)
Opção B → trilha com penalidade acumulada (perde item, perde aliado, chega enfraquecido)
           └─ leva a Fim Médio ou Fim Ruim mais adiante
Opção C → BR imediato (próxima página já é o fim ruim)
           OU → trilha curta de 2–3 N que converge no clímax como derrota
```

### C2 — 2 caminhos

```
Opção A → trilha principal
Opção B → bifurca, mas converge mais adiante COM desvantagem acumulada
           (o player não perde na hora, mas chega mais fraco ao clímax)
```

### Regras gerais

1. **Penalidade acumulada**: o caminho B do C3 não mata na hora — o player "carrega" a consequência e sente o efeito no clímax.
2. **Convergência antes do clímax**: todos os caminhos vivos chegam na mesma cena final, mas com status diferentes.
3. **Bad ending imediato (Opção C do C3)**: deve ser claro para o leitor *por que* aquela foi a escolha errada — não pode ser arbitrário.
4. **O clímax revela o histórico**: quem fez tudo certo chega com mais recursos e desbloqueia o Fim Bom melhor.

---

## Unidade Básica de Repetição

```
[N] → [N] → [C3] → [N] → [N] → [C2]
```

- 6 páginas na trilha principal por ciclo
- \+ 2–4 páginas de ramificação (BR, trilha B, convergência)
- ≈ **10 páginas totais por ciclo**

---

## Template — 60 Páginas

**Macro:** Intro → Ato 1 → Ato 2 → Clímax → Finais

```
INTRO (6 páginas)
  P1  N  — abertura, apresentação do personagem
  P2  N  — mundo e problema inicial
  P3  C3 — primeira decisão grande
        ├─ A: P4  N → Ato 1 (trilha principal)
        ├─ B: P5  N → Ato 1 (com penalidade acumulada)
        └─ C: P6  BR — Fim Ruim #1

ATO 1 (≈ 16 páginas)
  P7  N
  P8  N
  P9  C2
        ├─ A: P10 N → Ato 2
        └─ B: P11 N* → Ato 2 (penalidade)
  P12 N
  P13 N
  P14 C3
        ├─ A: P15 N → Ato 2
        ├─ B: P16 N* → Ato 2 (nova penalidade)
        └─ C: P17 BR — Fim Ruim #2

ATO 2 (≈ 16 páginas)
  P18 N
  P19 N
  P20 C2
        ├─ A: P21 N → Clímax (forte)
        └─ B: P22 N* → Clímax (fraco)
  P23 N
  P24 N
  P25 C3
        ├─ A: P26 N → Clímax (forte)
        ├─ B: P27 N* → Clímax (fraco)
        └─ C: P28 BR — Fim Ruim #3

CLÍMAX (10 páginas)
  P29 N  — todos os caminhos vivos convergem aqui
  P30 N  — tensão máxima
  P31 C2 — decisão final
        ├─ A + histórico bom:   P32 FB — Fim Bom
        ├─ A + histórico médio: P33 FM — Fim Médio #1
        └─ B:                   P34 FM — Fim Médio #2

PÁGINAS RESTANTES (≈ 26): ramificações, transições e finais extras

FINAIS: 3× BR, 2× FM, 1× FB
```

**Resumo:** 4 ciclos N-N-C · 3 fins ruins · 2 fins médios · 1 fim bom · 1 ponto de convergência

---

## Template — 100 Páginas

**Macro:** Intro → Ato 1 → Ato 2 → Ato 3 → Clímax → Finais

```
INTRO (8 páginas)
  N-N-N  — apresentação do mundo e do personagem
  C3     — decisão que define o "estilo" inicial (sem fim ruim ainda)

ATO 1 — 2 ciclos completos (≈ 20 páginas)
  N-N-C3 → BR #1
  N-N-C2
  N-N-C3 → BR #2
  N-N-C2

ATO 2 — 2 ciclos (≈ 20 páginas)
  N-N-C2
  N-N-C3 → BR #3
  N-N-C2
  N-N-C3 → BR #4

ATO 3 — 2 ciclos (≈ 20 páginas)
  N-N-C2
  N-N-C3 → BR #5
  N-N-C2
  (ponto de convergência: todos os caminhos vivos chegam aqui)

CLÍMAX (15 páginas)
  N-N-N  — tensão crescente, revelação
  C3     — decisão crucial
        ├─ A: N-N → FB — Fim Bom
        ├─ B: N   → FM — Fim Médio
        └─ C: BR  — Fim Ruim #6

PÁGINAS RESTANTES (≈ 17): ramificações e transições entre atos

FINAIS: 6× BR, 2× FM, 1× FB · 2 pontos de convergência
```

---

## Template — 150 Páginas

**Macro:** Intro → Ato 1 → Ato 2 → Ato 3 → Ato 4 → Clímax → Finais

```
INTRO (10 páginas)
  N-N-N-N — mundo, personagem, problema central
  C3      — abertura (sem fim ruim — define trilha inicial)

ATO 1 — 3 ciclos (≈ 30 páginas)
  N-N-C3 → BR #1
  N-N-C2
  N-N-C3 → BR #2
  N-N-C2
  N-N-C3 → BR #3
  N-N-C2

ATO 2 — 3 ciclos (≈ 30 páginas)
  N-N-C2
  N-N-C3 → BR #4
  N-N-C2
  N-N-C3 → BR #5
  N-N-C2
  N-N-C2
  (convergência parcial: trilhas B do Ato 1 chegam debilitadas)

ATO 3 — 3 ciclos (≈ 30 páginas)
  N-N-C3 → BR #6
  N-N-C2
  N-N-C3 → BR #7
  N-N-C2
  N-N-C3 → BR #8
  (convergência final: todos os sobreviventes chegam aqui)

ATO 4 / CLÍMAX (20 páginas)
  N-N-N  — revelação final, custo máximo
  C3     — decisão climática
        ├─ A: N-N-N → FB #1 — vitória total
        ├─ B: N-N   → FB #2 — vitória parcial
        └─ C: N     → FM    — Fim Médio

EPÍLOGO (10 páginas)
  Páginas bônus acessíveis somente ao FB #1
  (revelações extras, pós-créditos da história)

PÁGINAS RESTANTES (≈ 20): ramificações e transições

FINAIS: 8× BR, 2× FM, 2× FB · 3 pontos de convergência
```

---

## Resumo Comparativo

| Tamanho | Ciclos N-N-C | Fins Ruins | Fins Médios | Fins Bons | Convergências |
|---------|:-----------:|:---------:|:----------:|:--------:|:------------:|
| **60p** | 4 | 3 BR | 2 FM | 1 FB | 1 |
| **100p** | 8 | 6 BR | 2 FM | 1 FB | 2 |
| **150p** | 12 | 8 BR | 2 FM | 2 FB | 3 |

---

## Exemplo Aplicado — "O Grande Dia do Caju" (≈ 36 páginas, versão compacta)

```
INTRO
  P1 C3 — acordar cedo
       ├─ A: P2 N (arruma mochila) → trilha FULL
       ├─ B: P3 N (café primeiro)  → trilha BF_ONLY (sem pincel)
       └─ C: P4 N (dorme mais)    → trilha NONE (sem café + mochila)

ATO 1 — manhã / caminho pra escola
  P5/6/7   N por trilha
  P8/9/10  N por trilha
  (convergência no pátio: P11/12/13 por trilha)

ATO 2 — Xadrez
  P14 N  — começa partida (todos)
  P15 C2 — momento decisivo
         ├─ A: P16 N → vitória no xadrez
         └─ B: P17 N → derrota no xadrez

ATO 3 — Atividade Física
  P18 N
  P19 C2
         ├─ A: P22 N → vitória física
         └─ B: P20/21 N → derrota física (BR para trilha NONE)

CLÍMAX — Artes
  P26/27/28 N por trilha
  C2 (implícito pela trilha)
         ├─ trilha FULL + boa escolha → P30 FB
         ├─ trilha mista              → P29 FM
         └─ trilha NONE              → BR implícito
```
