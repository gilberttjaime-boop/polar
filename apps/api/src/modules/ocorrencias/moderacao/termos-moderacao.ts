import type { RegraModeracao } from "./moderacao.types.js";

export const TERMOS_MODERACAO: readonly RegraModeracao[] = [
  { id: "xingamento-idiota", termo: "idiota", categoria: "XINGAMENTO", tipo: "PALAVRA", variantes: ["idiotas"], detectarEvasoes: true },
  { id: "palavrao-caralho", termo: "caralho", categoria: "PALAVRAO", tipo: "PALAVRA", detectarEvasoes: true },
  { id: "palavrao-cu", termo: "cu", categoria: "PALAVRAO", tipo: "PALAVRA" },
  { id: "expressao-filho-da-puta", termo: "filho da puta", categoria: "XINGAMENTO", tipo: "EXPRESSAO", variantes: ["filha da puta"], detectarEvasoes: true },
  { id: "expressao-vai-tomar-no-cu", termo: "vai tomar no cu", categoria: "PALAVRAO", tipo: "EXPRESSAO" },
  { id: "expressao-pau-no-cu", termo: "pau no cu", categoria: "PALAVRAO", tipo: "EXPRESSAO" },
  { id: "contexto-burro", termo: "burro", categoria: "XINGAMENTO", tipo: "CONTEXTUAL", expressoes: ["voce e burro", "o aluno e burro"] },
  { id: "contexto-racial-preto", termo: "preto", categoria: "RACISMO", tipo: "CONTEXTUAL", expressoes: ["preto de merda"] },
  { id: "contexto-lgbtfobico-gay", termo: "gay", categoria: "LGBTFOBIA", tipo: "CONTEXTUAL", expressoes: ["gay de merda"] },
];
