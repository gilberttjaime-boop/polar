import type { RegraModeracao, ResultadoModeracao } from "./moderacao.types.js";
import { TERMOS_MODERACAO } from "./termos-moderacao.js";
import { normalizarTexto } from "./normalizar-texto.js";

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const LEET: Readonly<Record<string, string>> = { a: "[a4@]", e: "[e3]", i: "[i1!]", o: "[o0]", s: "[s5$]", t: "[t7]" };

function palavraComEvasao(palavra: string): string {
  return [...palavra.matchAll(/([a-z])\1*/g)]
    .map((match) => {
      const grupo = match[0] ?? "";
      const letra = match[1] ?? "";
      return `${LEET[letra] ?? escaparRegex(letra)}{${grupo.length},${grupo.length + 2}}`;
    })
    .join("");
}

function criarPadroes(forma: string, evasoes: boolean): RegExp[] {
  const partes = normalizarTexto(forma).split(" ");
  if (partes.length === 0 || partes.some((parte) => !/^[a-z]+$/.test(parte)) || forma.length > 80) throw new Error("Configuração de moderação inválida.");
  const separador = "[ \\t.,;:!?_-]{1,8}";
  const fontes = [partes.map(escaparRegex).join(separador)];
  if (evasoes) {
    fontes.push(partes.map((parte) => parte.length >= 4 ? palavraComEvasao(parte) : escaparRegex(parte)).join(separador));
    const primeiraParte = partes[0] ?? "";
    if (partes.length === 1 && primeiraParte.length >= 4) fontes.push([...primeiraParte].map((letra) => LEET[letra] ?? escaparRegex(letra)).join("[ ._-]{1,3}"));
  }
  return [...new Set(fontes)].map((fonte) => new RegExp(`(?:^|[^\\p{L}\\p{N}_])(?:${fonte})(?=$|[^\\p{L}\\p{N}_])`, "u"));
}

export function criarAnalisador(regras: readonly RegraModeracao[]): (texto: string) => ResultadoModeracao {
  const ids = new Set<string>();
  const compiladas = regras.map((regra) => {
    if (!regra.id || ids.has(regra.id)) throw new Error("ID de moderação vazio ou duplicado.");
    ids.add(regra.id);
    const formas = regra.tipo === "CONTEXTUAL" ? regra.expressoes ?? [] : [regra.termo, ...(regra.variantes ?? [])];
    if (formas.length === 0) throw new Error("Regra de moderação sem formas de comparação.");
    return { regra, padroes: formas.flatMap((forma) => criarPadroes(forma, regra.detectarEvasoes === true)) };
  });
  return (texto) => {
    const normalizado = normalizarTexto(texto);
    const correspondencias = compiladas.filter(({ padroes }) => padroes.some((padrao) => padrao.test(normalizado))).map(({ regra }) => ({ id: regra.id, termo: regra.termo, categoria: regra.categoria }));
    if (correspondencias.length === 0) return { bloqueado: false, correspondencias: [] };
    return { bloqueado: true, correspondencias, mensagem: "A ocorrência não foi enviada. Revise a linguagem da descrição.", orientacao: "Descreva os fatos e os comportamentos observados sem insultos ou rótulos pessoais." };
  };
}

export const analisarModeracaoDescricao = criarAnalisador(TERMOS_MODERACAO);
