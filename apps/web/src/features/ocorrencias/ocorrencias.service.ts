export {
  createOcorrencia,
  getOcorrencia,
  getOcorrenciaDetalhada,
  listHistoricoOcorrencia,
  listOcorrencias,
  listOcorrenciasDetalhadas,
  updateOcorrenciaStatus,
  validarDescricaoOcorrencia
} from "../../services/school.service";

export type {
  CreateOcorrenciaPayload,
  Ocorrencia,
  OcorrenciaDetalhada,
  OcorrenciaHistorico,
  PrioridadeOcorrencia,
  StatusOcorrencia
} from "../../services/domain";
