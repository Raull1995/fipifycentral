import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  useEffect(() => {
    document.title = "Termos de Uso - Fipify";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4 font-orbitron">Termos de Uso</h1>
          <p className="text-text/80">Última atualização: 17 de junho de 2025</p>
        </div>

        <div className="card p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">1. Termos</h2>
            <p className="text-text/90 leading-relaxed">
              Ao acessar ao site Fipify, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">2. Uso de Licença</h2>
            <p className="text-text/90 leading-relaxed mb-4">
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Fipify, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text/90">
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Fipify;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
            </ul>
            <p className="text-text/90 leading-relaxed mt-4">
              Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Fipify a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">3. Isenção de Responsabilidade</h2>
            <p className="text-text/90 leading-relaxed">
              Os materiais no site da Fipify são fornecidos 'como estão'. Fipify não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>
            <p className="text-text/90 leading-relaxed mt-4">
              Além disso, o Fipify não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">4. Limitações</h2>
            <p className="text-text/90 leading-relaxed">
              Em nenhum caso o Fipify ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Fipify, mesmo que Fipify ou um representante autorizado da Fipify tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">5. Precisão dos Materiais</h2>
            <p className="text-text/90 leading-relaxed">
              Os materiais exibidos no site da Fipify podem incluir erros técnicos, tipográficos ou fotográficos. Fipify não garante que qualquer material em seu site seja preciso, completo ou atual. Fipify pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Fipify não se compromete a atualizar os materiais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">6. Links</h2>
            <p className="text-text/90 leading-relaxed">
              O Fipify não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Fipify do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Modificações</h2>
            <p className="text-text/90 leading-relaxed">
              O Fipify pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Lei Aplicável</h2>
            <p className="text-text/90 leading-relaxed">
              Estes termos e condições são regidos e interpretados de acordo com as leis do Fipify e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;