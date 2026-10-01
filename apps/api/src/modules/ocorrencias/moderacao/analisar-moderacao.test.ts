import { describe, expect, it } from "vitest";

import {
  analisarModeracaoDescricao,
} from "./analisar-moderacao.js";

describe("moderação da descrição", () => {
  it.each([
    "O aluno chamou o colega de idiota.",
    "Os alunos foram chamados de idiotas.",
    "CARALHO",
    "c4r4lh0",
    "c.a.r.a.l.h.o",
    "c a r a l h o",
    "c-a-r-a-l-h-o",
    "filho da puta",
    "filha da puta",
    "vai tomar no cu",
    "pau no cu",
  ])("bloqueia: %s", (texto) => {
    expect(
      analisarModeracaoDescricao(texto).bloqueado
    ).toBe(true);
  });

  it.each([
    "O aluno interrompeu a explicação.",
    "A turma participou da atividade.",
    "O aluno utilizava um lápis preto.",
    "A aula abordou o trabalho escravo no Brasil.",
    "O aluno informou que é gay.",
    "O aluno é surdo.",
    "A aula tratou do burro e de outros animais.",
    "A imagem mostrava um macaco.",
    "cultura currículo documento execução cuidado",
  ])("não bloqueia: %s", (texto) => {
    expect(
      analisarModeracaoDescricao(texto).bloqueado
    ).toBe(false);
  });

  it("não altera o texto original", () => {
    const texto = "  CARALHO!  ";

    analisarModeracaoDescricao(texto);

    expect(texto).toBe("  CARALHO!  ");
  });

  it("não duplica a mesma regra", () => {
    const resultado =
      analisarModeracaoDescricao("idiota idiota");

    expect(resultado.correspondencias).toHaveLength(1);
  });
});
