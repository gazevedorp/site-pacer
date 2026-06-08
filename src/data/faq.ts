export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Posso cancelar o plano a qualquer momento?",
    answer:
      "Sim! Todos os nossos planos são mensais e sem fidelidade. Basta solicitar o cancelamento na recepção de qualquer unidade ou via WhatsApp com pelo menos 30 dias de antecedência antes do próximo vencimento.",
  },
  {
    id: "faq-2",
    question: "Como funciona o acesso multi-unidades?",
    answer:
      "Com o Plano Multi ou Família, você pode frequentar qualquer uma das 12 unidades da rede Pacer sem custo adicional. Basta apresentar sua biometria ou carteirinha na catraca.",
  },
  {
    id: "faq-3",
    question: "As aulas coletivas estão incluídas em todos os planos?",
    answer:
      "As aulas coletivas (Funcional, Zumba, Dança, Muay Thai, etc.) estão inclusas nos planos Multi e Família. O Plano Básico contempla apenas musculação e área de cardio. Consulte disponibilidade de vagas na sua unidade.",
  },
  {
    id: "faq-4",
    question: "Quanto tempo dura a matrícula?",
    answer:
      "A matrícula é cobrada uma única vez e dá acesso ao plano escolhido. Não há mensalidade mínima — você paga mês a mês e pode pausar ou cancelar quando quiser.",
  },
  {
    id: "faq-5",
    question: "Posso experimentar antes de assinar?",
    answer:
      "Sim! Oferecemos um dia de treino experimental gratuito em qualquer unidade. Entre em contato pelo WhatsApp para agendar sua visita e experimentar nossas instalações.",
  },
  {
    id: "faq-6",
    question: "Pilates e hidroginástica são cobrados à parte?",
    answer:
      "Hidroginástica está inclusa no Plano Multi e Família para unidades que possuem piscina (Sertãozinho I e II). Pilates está disponível na unidade Galeria Ribeirão e pode ter custo adicional — consulte a recepção para valores.",
  },
  {
    id: "faq-7",
    question: "Existe desconto para estudantes, idosos ou servidores públicos?",
    answer:
      "Sim! Temos condições especiais para estudantes (com comprovante de matrícula), idosos acima de 60 anos e servidores públicos municipais. Fale com a nossa equipe pelo WhatsApp ou visite a recepção para saber mais.",
  },
  {
    id: "faq-8",
    question: "Como funciona o Plano Família? Quem pode ser dependente?",
    answer:
      "O Plano Família permite incluir cônjuge e filhos de até 21 anos (ou sem limite de idade em caso de deficiência). Cada dependente recebe acesso completo à rede, igual ao titular. Documentação exigida: certidão de nascimento, casamento ou RG.",
  },
  {
    id: "faq-9",
    question: "Posso congelar meu plano?",
    answer:
      "Oferecemos congelamento de até 30 dias por ano para situações como viagem, cirurgia ou licença médica, mediante apresentação de justificativa. Converse com nossa equipe para solicitar.",
  },
  {
    id: "faq-10",
    question: "A Pacer Academia possui personal trainers?",
    answer:
      "Sim! Contamos com personal trainers parceiros em todas as unidades. Confira o perfil dos profissionais na página de Personais e entre em contato diretamente com eles para contratar sessões individuais.",
  },
];
