export type CategoriaModeracao =
  | "XINGAMENTO"
  | "PALAVRAO"
  | "RACISMO"
  | "MACHISMO"
  | "LGBTFOBIA"
  | "CAPACITISMO"
  | "OUTRA_DISCRIMINACAO";

export interface RegraModeracao {
  id: string;
  termo: string;
  categoria: CategoriaModeracao;
  tipo: "PALAVRA" | "EXPRESSAO" | "CONTEXTUAL";
  variantes?: readonly string[];
  expressoes?: readonly string[];
  detectarEvasoes?: boolean;
}

export interface CorrespondenciaModeracao {
  id: string;
  termo: string;
  categoria: CategoriaModeracao;
}

export interface ResultadoModeracao {
  bloqueado: boolean;
  correspondencias: CorrespondenciaModeracao[];
  mensagem?: string;
  orientacao?: string;
}