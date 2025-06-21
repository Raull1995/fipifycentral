import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Privacidade - Fipify";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4 font-orbitron">Política de Privacidade</h1>
          <p className="text-text/80">Última atualização: 17 de junho de 2025</p>
        </div>

        <div className="card p-8 space-y-6">
          <section>
            <p className="text-text/90 leading-relaxed">
              A sua privacidade é importante para nós. É política do Fipify respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Fipify, e outros sites que possuímos e operamos.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </p>
          </section>

          <section>
            <p className="text-text/90 leading-relaxed">
              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Google AdSense</h2>
            <p className="text-text/90 leading-relaxed">
              O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
            </p>
            <p className="text-text/90 leading-relaxed mt-4">
              Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Publicidade Comportamental</h2>
            <p className="text-text/90 leading-relaxed">
              Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Cookies de Afiliados</h2>
            <p className="text-text/90 leading-relaxed">
              Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Compromisso do Usuário</h2>
            <p className="text-text/90 leading-relaxed mb-4">
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Fipify oferece no site e com caráter enunciativo, mas não limitativo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text/90">
              <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
              <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Fipify, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-4 font-orbitron">Mais Informações</h2>
            <p className="text-text/90 leading-relaxed">
              Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
            <p className="text-text/90 leading-relaxed mt-4">
              Esta política é efetiva a partir de 17 de junho de 2025 00:45.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;