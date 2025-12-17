
import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "O PDF Prático funciona com arquivos protegidos por senha?",
      a: "Para garantir a sua segurança e privacidade total (sem enviar nada para servidores), a nossa ferramenta atual só consegue processar arquivos que não possuam restrições de senha ou criptografia de abertura. Remova a senha antes de carregar o arquivo."
    },
    {
      q: "Vou perder a qualidade das imagens ao dividir o PDF?",
      a: "Não! Como o processamento é feito localmente e focado na estrutura das páginas, nós mantemos a integridade original de todas as fontes, vetores e imagens contidas no seu documento."
    },
    {
      q: "O site funciona no celular ou tablet?",
      a: "Sim, perfeitamente. Como o processamento ocorre no navegador, você pode juntar ou dividir PDFs direto do seu iPhone, Android ou iPad com a mesma velocidade e segurança de um computador."
    },
    {
      q: "Posso extrair apenas a primeira e a última página?",
      a: "Sim! No modo 'Extração Manual', basta digitar '1, ' seguido da última página (ex: 1, 15). O sistema irá gerar arquivos separados para cada entrada que você colocar após a vírgula."
    },
    {
      q: "Por que o processamento local é mais seguro que outros sites?",
      a: "Sites comuns pedem que você faça 'Upload'. Isso significa que seu documento (contratos, exames médicos, holerites) viaja pela internet e fica guardado em um servidor desconhecido. No PDF Prático, o arquivo entra na memória do seu navegador e morre lá. Nada viaja pela rede."
    },
    {
      q: "Existe algum custo ou limite de uso diário?",
      a: "Não. O PDF Prático é 100% gratuito e não possui limites. Como você está usando o poder de processamento do seu próprio dispositivo, não temos custos de servidor e repassamos essa liberdade para você."
    }
  ];

  return (
    <section id="faq" className="py-12 border-t border-gray-100">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Privacidade Levada a Sério</h2>
        <p className="text-gray-600 italic">Entenda por que somos a escolha preferida para documentos sensíveis.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start gap-2">
              <span className="text-blue-500 font-serif text-2xl leading-none">?</span>
              {faq.q}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed ml-5">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
