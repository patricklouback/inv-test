/* eslint-disable react/no-danger */
import Button from '@components/Button';
import { AuthContext } from 'contexts/AuthContext';
import { ConfigContext } from 'contexts/ConfigContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  CheckboxLabel,
  ConditionsAndTermsContent,
  ConditionsAndTermsForm,
  ModalTitle,
} from './styles';

interface ConditionsAndTermsModalProps {
  // isOpen: boolean;
  onRequestClose: () => void;
}

type CheckboxTypes = {
  label: string;
  value: boolean;
  onChange: () => void;
};

const Input = ({ label, value, onChange }: CheckboxTypes): JSX.Element => {
  return (
    <label htmlFor="checkbox">
      <input
        id="checkbox"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const ConditionsAndTermsText = (): JSX.Element => {
  return (
    <div>
      <h3>I. DISPOSIÇÕES INICIAIS</h3>
      <br />
      <br />
      <h4>1. DESIGNAÇÃO</h4>
      <br />
      INVENTTA CONSULTORIA LTDA., pessoa jurídica de direito privado com sede no
      município de Campinas, no estado de São Paulo, com endereço na Av. José
      Rocha Bomfim, 214 Bloco B, Conj 213, 214 e 215 - Bairro: Loteamento Center
      Santa Genebra, CEP: 13080-650, inscrita no CNPJ/MF sob o número
      09.306.228/0001-89, doravante denominada EMPRESA, é proprietária,
      criadora, titular, mantenedora e provedora de software de gestão e geração
      de ideias de inovação, denominado “Avantt.i”, cujo domínio é definido como
      www.avanttinovacao.com.br, possuindo diversos módulos com funcionalidades
      distintas e, tendo por base o interesse nos serviços por ela
      disponibilizados, estabelece-se estes Termos e Condições de Uso, que serão
      regidos pelas condições a seguir expostas.
      <br />
      <br />
      <h4>2. CIÊNCIA E ACEITE</h4>
      <br />
      É imprescindível, antes de aceitar estes Termos e Condições de Uso,
      certificar-se de ter lido e compreendido de forma satisfatória esse
      documento. Caso persista alguma dúvida, não hesite em fazer contato pelo
      endereço: avanttinovacao@inventta.net.
      <br />
      <br />
      Ao aceitar o presente documento, a Autorizada e seus Usuários têm
      garantido o direito, não exclusivo, não sublicenciável, intransferível e
      limitado de acessar o software e utilizar todos os módulos contratados.
      <br />
      <br />
      Ao manifestar concordância a esse documento a Autorizada e os Usuários
      aceitam integralmente os termos nele descritos, declarando que leram e
      concordaram, vinculando-se automaticamente às regras aqui contidas.
      <br />
      <br />
      Esse documento vincula legalmente a Empresa, as Autorizadas e os Usuários
      com relação aos atuais e aos novos serviços a serem oferecidos pela
      Empresa, vinculados ao Software “Avantt.i”.
      <br />
      <br />
      Além disso, os presentes contratantes e seus Usuários declaram que aceitam
      o Software no estado técnico e de perfeição em que se encontra no momento
      do aceite do presente documento para o uso contratado.
      <br />
      <br />
      A aceitação destes Termos e Condições de Uso é indispensável à utilização
      do Software e seus módulos.
      <br />
      <br />
      <h4>3. DEFINIÇÕES E TERMINOLOGIA</h4>
      <br />
      AUTORIZADA: trata-se da pessoa física ou jurídica que contrata os
      serviços/produtos e que é responsável pelo pagamento da licença de uso e
      por gerenciar os Usuários por ela indicados, sob sua responsabilidade.
      <br />
      <br />
      HOSPEDAGEM (hosting): armazenamento do banco de dados, disponibilizado
      pela Autorizada, pela Empresa ou por terceiro.
      <br />
      <br />
      MÓDULOS: tratam-se das diversas soluções tecnológicas oferecidas pela
      Empresa para suprir as necessidades da Autorizada e de seus Usuários.
      <br />
      <br />
      SERVICE LEVEL AGREEMENT (SLA): termo que se refere ao “Acordo de Nível de
      Serviço”, trata do tempo de resposta da Empresa para as solicitações
      realizadas pela Autorizada e seus Usuários.
      <br />
      <br />
      SOFTWARE: solução tecnológica desenvolvida pela Empresa, que pode ser
      acessada através de website e aplicativos, com o fim de auxiliar as
      Autorizadas e os seus Usuários nas demandas necessárias.
      <br />
      <br />
      USUÁRIOS: tratam-se de todas as pessoas cadastradas que utilizam o
      Software “Avantt.i” sob responsabilidade da Autorizada.
      <br />
      <br />
      <h4>4. CONSIDERAÇÕES PRÉVIAS</h4>
      <br />
      Considerando que a Empresa é proprietária e desenvolvedora do Software
      “Avantt.i”, bem como pode eventualmente ser mantenedora de nuvem para a
      prestação de serviços de hospedagem (hosting) ou contratar empresa
      terceira para esta função; Considerando que a Autorizada e seus Usuários
      são totalmente desvinculados, sob nenhuma forma de subordinação à Empresa,
      com total liberdade de decisão e trabalho;
      <br />
      <br />
      Considerando os elementos e esclarecimentos prestados pela área comercial,
      no contato através dos canais de comunicação disponibilizados (Site,
      WhatsApp, e-mail, etc.) da Empresa, ou de outra empresa que venha a compor
      este grupo econômico ou ser contratada como prestadora de serviços por
      aquela;
      <br />
      <br />
      Considerando que a Autorizada e os Usuários por esta cadastrados têm como
      sanadas suas dúvidas acerca dos produtos e serviços prestados na presente
      relação;
      <br />
      <br />
      Estabelecem-se os presentes Termos e Condições de Uso do Software
      “Avantt.i” conforme os elementos a seguir discriminados.
      <br />
      <br />
      <h3>II. CONDIÇÕES DE USO</h3>
      <br />
      <br />
      <h4>1. OBJETO</h4>
      <br />
      O objeto do presente documento consiste em disciplinar o uso do Software
      “Avantt.i”, de seus módulos e serviços, pela Autorizada e Usuários. A
      Autorizada e seus Usuários declaram estar cientes de que o Software
      “Avantt.i”, bem como seus módulos e serviços, estão em constante
      desenvolvimento e que novas versões poderão ser disponibilizadas a
      qualquer momento. Não obstante, o Software “Avantt.i” é aceito no estado
      técnico e de perfeição em que se encontra no momento do aceite do presente
      documento para o uso contratado.
      <br />
      <br />
      <h4>2. CADASTRO DE USUÁRIOS PELA AUTORIZADA</h4>
      <br />
      Para utilizar o Software “Avantt.i” e os módulos contratados a Autorizada
      deverá ser pessoa física ou jurídica, de direito público ou privado, e
      declarar que leu, compreendeu e está de acordo com as regras previstas
      neste documento. Os Usuários, pessoas físicas, deverão ter, no mínimo, 18
      (dezoito) anos de idade completos, e declararem que leram, compreenderam e
      estão de acordo com as regras previstas nestes Termos e Condições de Uso.
      <br />
      <br />
      A Autorizada deverá fornecer as seguintes informações, suas e de seus
      usuários, para realização do cadastro no Software, de forma a habilitar o
      acesso aos conteúdos, serviços e módulos por eles contratados e
      disponibilizados pela Empresa:
      <br />
      <br />
      Pessoa Jurídica: a) Razão Social; b) CNPJ; c) Endereço completo; d)
      Telefone Celular (WhatsApp) e Fixo e) E-mail; f) Inscrição municipal; g)
      Inscrição estadual;
      <br />
      <br />
      Pessoa Física: a) Nome completo; b) E-mail
      <br />
      <br />
      O tratamento de dados pessoais acima mencionados será disposto na Política
      de Privacidade específica.
      <br />
      <br />
      <h4>3. RESPONSABILIDADE PELAS INFORMAÇÕES</h4>
      <br />
      A Empresa não se responsabiliza por informações incorretas ou inverídicas
      fornecidas pela Autorizada e seus Usuários quando do seu cadastro e por
      eventuais danos gerados a terceiros em função dessas informações, uma vez
      que oferece todas as condições para o bom desempenho do Software
      “Avantt.i” e o preenchimento cadastral, dos campos disponibilizados
      naquele ambiente, é feito por quem o contrata.
      <br />
      <br />
      O acesso aos serviços disponibilizados no software “Avantt.i” será
      liberado para a Autorizada e seus usuários após o preenchimento do
      cadastro, com todas as informações solicitadas, concordância aos Termos de
      Uso, confirmação de pagamento, quando assim exigir, e com a respectiva
      criação de login e senha de acesso.
      <br />
      <br />
      A segurança das senhas cadastradas pela Autorizada, para cada um de seus
      Usuários, é de responsabilidade exclusiva da Autorizada e de seus
      Usuários, que não deverão compartilhá-la com terceiros, devendo mantendo
      também o controle dos equipamentos utilizados para o acesso ao Software
      “Avantt.i”, sendo a Autorizada e seus Usuários os únicos responsáveis
      pelos acessos indevidos decorrentes de eventuais usos inadequados.
      <br />
      <br />
      A Autorizada e seus Usuários são responsáveis por manter as informações,
      por eles fornecidas, de forma exata, completa e atualizada em relação ao
      cadastro no Software “Avantt.i”, sendo a Autorizada a única responsável
      pelo pagamento. A partir do cadastro, será permitido a Autorizada e aos
      Usuários acessarem todas as funcionalidades contratadas do Software
      “Avantt.i”, o que deve ser feito de acordo com as regras estipuladas neste
      Termo.
      <br />
      <br />
      <h4>4. ACESSO AO SOFTWARE “Avantt.i”</h4>
      <br />
      Os serviços serão disponibilizados para a Autorizada e por seus Usuários
      cadastrados, bem como o acesso, conforme os módulos contratados e mediante
      apresentação de login e senha no Software “Avantt.i”, sob as condições de
      que o pagamento do mês atual esteja validado e os Termos de Uso tenham
      sido aceitos.
      <br />
      <br />
      Nos casos de inadimplemento por mais de um dia, a Autorizada e seus
      Usuários terão seus cadastros suspensos até regularização do débito. Em
      não havendo pagamento por mais de 3 meses, sem qualquer tentativa de
      regularização do débito, negociação ou comunicação de rescisão da
      contratação, por iniciativa da Autorizada, a Empresa poderá excluir os
      dados e bases de dados que se encontrem em sua posse conforme contrato de
      licença de uso.
      <br />
      <br />
      <h4>5. OPERAÇÃO DO SOFTWARE “Avantt.i”</h4>
      <br />
      Ao utilizar o Software “Avantt.i”, a Autorizada e os Usuários se
      comprometem a respeitar a legislação brasileira em vigor, bem como o
      disposto no presente Termo, não devendo produzir, anexar, disponibilizar,
      divulgar ou transmitir no Software “Avantt.i” qualquer conteúdo que:
      <br />
      <br />
      1. Seja contrário à qualquer norma da legislação brasileira ou que
      incentive qualquer forma de violência, xenofobia, discriminação e/ou
      preconceito de qualquer natureza;
      <br />
      <br />
      2. Seja protegido por quaisquer direitos de propriedade intelectual ou
      industrial pertencentes a terceiros, sem que a Autorizada e os Usuários
      tenham obtido previamente dos seus titulares a autorização necessária para
      utilizar referido conteúdo; <br />
      <br />
      3. Incorpore vírus, malwares, trojans, bugs ou outros elementos
      eletrônicos similares, que possam causar danos ou impedir o regular
      funcionamento do Software “Avantt.i”, bem como da rede mundial de
      computadores, do sistema ou de equipamentos informáticos ("hardware" e
      "software") de terceiros e da Empresa, ou que possam causar danos aos
      documentos eletrônicos e arquivos armazenados nestes equipamentos
      informáticos;
      <br />
      <br />
      4. Provoque, por suas características (tais como forma, extensão etc.),
      dificuldades no regular funcionamento dos serviços prestados pela Empresa
      e do Software “Avantt.i”. Deve a Autorizada disponibilizar os programas e
      aplicativos (softwares) e equipamentos (hardwares) necessários para o
      funcionamento do Software “Avantt.i”.
      <br />
      <br />
      A Empresa manterá as especificações atualizadas para que, inclusive, os
      dados possam ser enviados e hospedados em nuvem.
      <br />
      <br />
      A Empresa não responde por situações que não decorram de seus atos e estão
      fora do seu escopo de atuação, tais como, a título exemplificativo (e não
      exaustivo):
      <br />
      <br />
      I. Má utilização dos equipamentos e do Software “Avantt.i”;
      <br />
      <br />
      II. Indevida utilização de equipamentos que contenham software, hardware
      ou comunicação, em condições inferiores às mínimas exigidas;
      <br />
      <br />
      III. Incompatibilidade com software ou hardware instalados pela
      Autorizada;
      <br />
      <br />
      IV. Falhas em equipamentos e aparelhos, em aplicativos estranhos, bem como
      em programas e comunicações, em smartphones, computadores, tablets, que
      acessem a internet para utilizar o Software “Avantt.i”. Importante
      observar que o Software “Avantt.i” estará disponível 24 (vinte e quatro)
      horas por dia, 07 (sete) dias por semana, para a Autorizada e seus
      Usuários, salvo:
      <br />
      <br />
      i. Por razões alheias à vontade ou controle da Empresa (caso fortuito ou
      força maior);
      <br />
      <br />
      ii. Razões de ordem técnica que exijam suspensão da prestação de serviços
      (manutenção de equipamentos, sistemas ou canais de comunicação);
      <br />
      <br />
      iii. Interrupções pré-agendadas;
      <br />
      <br />
      iv. Razões originadas por terceiros: interrupções ocasionadas por empresas
      fornecedoras de conexão com a internet; ato ou norma governamental;
      utilização inadequada ou indevida dos equipamentos ou dos serviços pela
      Autorizada, bem como falhas provocadas pelo equipamento, instalação ou
      infraestrutura sob sua responsabilidade.
      <br />
      <br />
      Essas interrupções ou indisponibilidades na prestação dos serviços não
      implicarão em obrigatoriedade de indenização ou ressarcimento de qualquer
      natureza por parte da Empresa.
      <br />
      <br />
      A Autorizada e seus Usuários não poderão se envolver em engenharia
      reversa, SQL injection, crawler, DDOS e outros mecanismos que visem
      prejudicar ou plagiar recursos, utilizar robôs, bots, scraprs ou outros
      meios similares, para acessar a plataforma ou banco de dados para
      quaisquer finalidades. Inclui-se aí o uso ilícito de GPS falso ou
      irregular em celulares de Usuários cadastrados.
      <br />
      <br />
      A Autorizada e os Usuários aceitam que, em todas as circunstâncias, os
      seus direitos em relação ao conteúdo e serviço disponibilizado pela
      Empresa são limitados por direitos autorais e leis de propriedade
      intelectual.
      <br />
      <br />
      <h4>6. DESCRIÇÃO DOS SERVIÇOS</h4>
      <br />
      O Software “Avantt.i” foi desenvolvido com o propósito de otimizar
      processos e abrange os seguintes produtos e serviços, conforme exposto no
      site oficial: Proposição de Desafios, gestão de ideias, trilha de
      conhecimento.
      <br />
      <br />
      Caso persistam dúvidas quanto à utilização é possível abrir um chamado
      através da área de suporte, no horário das 08:00h às 12:00h e das 13:30h
      às 18:00h (pelo horário de Brasília) por correio eletrônico
      (avanttinovacao@inventta.net), para esclarecimento de dúvidas relacionadas
      ao uso do software, oferecendo uma solução ou entrando em contato com o
      cliente.
      <br />
      <br />
      <h4>7. ACESSO E DISPONIBILIDADE</h4>
      <br />
      A disponibilização do Software “Avantt.i” e o acesso dos Usuários serão
      condicionados ao regular pagamento do que foi contratado, além de
      cadastrar login e senha supramencionados, conforme especificações do
      Contrato de Licença de Uso firmado entre a Empresa e a Autorizada.
      <br />
      <br />
      <h4>8. SEGURANÇA</h4>
      <br />
      A Empresa monitora as atividades no Software “Avantt.i” com o único
      objetivo de criar uma identificação de sistema exclusiva, com o intuito de
      garantir segurança e evitar fraudes.
      <br />
      <br />
      A Empresa manterá em sigilo todos os dados coletados para essa finalidade.
      <br />
      <br />
      A respeito do tratamento de dados que sejam pessoais, veja a Política de
      Privacidade específica.
      <br />
      <br />
      A Autorizada está ciente de que é a única responsável pela segurança de
      sua navegação e de seus Usuários, bem como pela manutenção de seus
      equipamentos, programas de computador, meios de comunicação e licenças
      destes, usados para o acesso e funcionamento do Software.
      <br />
      <br />
      Para maior segurança e melhor utilização do Software, deverá a Autorizada
      e o Usuário manter atualizados os seus programas e equipamentos
      necessários, declarando expressamente ter ciência de que caso não o faça,
      poderá não mais ter acesso ao Software “Avantt.i”. Caso os equipamentos
      não sejam compatíveis com as novas versões do Software “Avantt.i”, não
      haverá qualquer prejuízo à Empresa, que não se responsabilizará pela
      omissão da Autorizada.
      <br />
      <br />
      Além disso, a Empresa não se responsabiliza pelo conteúdo disponível de
      quaisquer RSS Feeds ou sites com links para o Software “Avantt.i” sem que
      o acesso provenha de aplicativo disponível em loja de aplicativos oficial
      (por exemplo: PlayStore) ou do website oficial da Empresa.
      <br />
      <br />
      A Autorizada e os seus usuários são responsáveis pela guarda e não
      divulgação das suas credenciais de acesso, que são pessoais, sigilosas e
      intransferíveis, obedecendo aos supramencionados princípios de
      confidencialidade, integridade e disponibilidade das informações. Os
      registros de atividades (logs) serão mantidos com o intuito de permitir
      rastreabilidade de eventos, a título de identificação da origem e ou
      autores de algum incidente de segurança.
      <br />
      <br />
      <h4>9. GARANTIAS E LIMITAÇÃO DE RESPONSABILIDADE</h4>
      <br />
      A Empresa se exclui, expressamente, e se exime de qualquer representação,
      condição ou garantia, de que o acesso ou a utilização do Software
      “Avantt.i” estarão absolutamente livres de erros ou interrupções, ou de
      que a informação ou conteúdo serão totalmente precisos, contando com a
      colaboração da Autorizada, bem como de seus Usuários, para tanto e
      considerando as restrições naturais dos serviços web, no que tange à
      incapacidade de previsão de todos os infortúnios que poderão vir a ocorrer
      durante a utilização do software.
      <br />
      <br />
      A Empresa compromete-se a realizar seus melhores esforços para atender aos
      princípios da segurança e da qualidade dos dados, bem como à integridade,
      confidencialidade e disponibilidade das informações. Em nenhuma hipótese a
      Empresa (e qualquer subcontratante, empresa coligada, controlada,
      controladora ou de qualquer forma afiliada a ela) será responsável por:
      <br />
      <br />
      I. quaisquer perdas de lucros, receitas e negócios, nem pela interrupção
      destes;
      <br />
      <br />
      II. quaisquer perdas de dados (que não estejam sob sua posse);
      <br />
      <br />
      III. custos de aquisição de bens, tecnologias ou serviços;
      <br />
      <br />
      IV. custos de cobertura ou danos punitivos, danos diretos, indiretos,
      especiais, acidentais ou consequentes de qualquer tipo em conexão com ou
      resultantes do fornecimento, desempenho ou utilização do Software
      “Avantt.i”, incluindo negligência, inclusive se a Autorizada e seus
      Usuários tenham sido avisados da possibilidade de tais danos. Ademais, a
      Empresa não é responsável pelo provimento dos serviços de internet e,
      portanto, não se responsabiliza pela disponibilidade da rede.
      <br />
      <br />
      Além disso, a Empresa não se responsabiliza pelo correto funcionamento dos
      equipamentos e periféricos da Autorizada e de seus Usuários, incluindo,
      mas não se limitando a, computador, smartphones, impressoras, etc.
      <br />
      <br />
      O Software “Avantt.i” funciona na “nuvem” e, para que a Autorizada e seus
      Usuários possam acessá-lo, deverão utilizar um navegador web ou aplicativo
      para tanto. Todos os dados são armazenados em servidores, o que significa
      que, em caso de indisponibilidade do servidor, este entrará em manutenção
      e retornará em até 48 horas.
      <br />
      <br />
      Compete à Empresa a escolha de local e forma de armazenamento do software
      com os dados, sendo que o serviço de hospedagem poderá ser terceirizado,
      sem necessidade de autorização ou anuência da Autorizada ou seus Usuários.
      <br />
      <br />
      Em situações fora do controle da Empresa, esta não se responsabiliza e não
      garante a disponibilidade do Software “Avantt.i”, como aquelas decorrentes
      de fatos oriundos de caso fortuito ou força maior.
      <br />
      <br />
      Fica a Autorizada e seus Usuários responsáveis pela comunicação formal,
      através dos meios acordados com a Empresa, em no máximo 24 (vinte e
      quatro) horas de qualquer falha nos serviços objeto deste termo.
      <br />
      <br />
      Caso a Empresa identifique o uso compartilhado de acesso por mais de uma
      Autorizada e/ou Usuário, ou seja, uso simultâneo de um mesmo acesso por
      dois ou mais cadastros, poderá ser bloqueado o acesso ao Software
      “Avantt.i” sem prévia comunicação. O acesso somente será desbloqueado após
      a regularização pelo Responsável.
      <br />
      <br />
      <h4>10. PROPRIEDADE INTELECTUAL</h4>
      <br />
      O Software “Avantt.i”, e todos seus serviços e módulos, são de propriedade
      intelectual exclusiva da INVENTTA CONSULTORIA LTDA., sendo que todos os
      conteúdos e materiais disponibilizados, no todo ou em parte, devem ser,
      estar e permanecer como sua propriedade exclusiva, devendo ser observados
      os direitos relativos à propriedade intelectual, protegidos pela Lei
      9.609/88.
      <br />
      <br />
      A Autorizada e seus Usuários não podem vender, utilizar ou remover as
      marcas comerciais, documentos, manuais, fazer cópias, descompilar, fazer
      engenharia reversa do software ou qualquer ato que venha a prejudicar
      direta ou indiretamente os direitos garantidos pela Lei de Propriedade
      Intelectual de Programas de Computador (Lei 9.609/1998) de modo que altere
      alguma de suas funcionalidades.
      <br />
      <br />
      Todos os dados, direitos e interesses relativos aos conteúdos licenciados,
      utilizados ou disponibilizados através do Software “Avantt.i” permanecerão
      de propriedade exclusiva dos seus licenciadores. Os comentários e
      sugestões das Autorizadas e Usuários são de extrema importância e
      relevância e podem gerar inovações ou implementações que podem ser
      incorporadas no Software sem que isso conceda a eles nenhuma espécie de
      direitos sobre as novas funcionalidades.
      <br />
      <br />
      <h4>11. LICENÇA DE USO</h4>
      <br />
      A Empresa concede a Autorizada e aos seus Usuários uma licença não
      limitada, individual, não exclusiva, não transferível e plenamente
      revogável, para uso do Software “Avantt.i”, desde que em conformidade com
      os termos contidos neste documento.
      <br />
      <br />
      <h4>12. CONFIDENCIALIDADE</h4>
      <br />
      As partes comprometem-se a manter confidencialidade e sigilo sobre
      qualquer dado, informação, material, documento, política, programa,
      especificações técnicas ou comerciais, estratégicas, inovações ou
      aperfeiçoamentos a que venha a ter conhecimento e acesso em decorrência do
      uso do Software “Avantt.i”.
      <br />
      <br />
      Todos os dados, informações, materiais, documentos, políticas, programas,
      especificações técnicas ou comerciais, estratégias, inovações ou
      aperfeiçoamentos são confidenciais e só poderão ser divulgados a terceiros
      mediante autorização por escrito da Empresa sob pena de ação
      indenizatória, estando melhor detalhadas na Política de Privacidade do
      Software “Avantt.i”.
      <br />
      <br />
      A confidencialidade aqui estabelecida se prolonga no tempo e não restará
      afastada nem mesmo em caso de extinção do presente ajuste, sendo de cunho
      vitalício. A obrigação de confidencialidade se estende a todos os Usuários
      e prepostos das partes que tiverem acesso ou por qualquer forma tomarem
      conhecimento dos dados e informações de qualquer natureza.
      <br />
      <br />
      <h4>13. TRATAMENTO DE DADOS PESSOAIS</h4>
      <br />
      Os dados da Autorizada e dos Usuários serão utilizados exclusivamente para
      os atos legais vinculados ao objeto do contrato, em especial o faturamento
      do valor da contratação e emissão de nota fiscal. Os dados e informações
      cadastradas e/ou colhidas através do Software “Avantt.i” serão
      armazenadas, tratadas e utilizadas conforme o previsto na Política de
      Privacidade, que é o documento apto a disciplinar tais aplicações de forma
      completam em observância à Lei 13.709/18 (LGPD).
      <br />
      <br />
      <h4>14. MODIFICAÇÕES DOS TERMOS DE USO</h4>
      <br />
      A Empresa se reserva o direito de modificar os Termos e Condições do
      presente documento a qualquer momento, por seu exclusivo critério, sendo
      consideradas efetivadas as alterações após a publicação de uma versão
      atualizada destes Termos no Software “Avantt.i”, o que se sujeitará ao
      aceite pela Autorizada e seus Usuários. A Empresa informará sobre
      alterações significativas no Software “Avantt.i” através de avisos
      encaminhados por e-mail.
      <br />
      <br />
      <h4>15. SUPORTE TÉCNICO</h4>
      <br />
      A solução de qualquer imprevisto que seja oriundo do uso no Software
      “Avantt.i” deve ser requerida diretamente à Empresa, através de chamado
      aberto por correio eletrônico (avanttinovacao@inventta.net).
      <br />
      <br />
      A Empresa é responsável pela atualização do Software “Avantt.i” e por
      introduzir de forma licenciada todas as modificações necessárias,
      excluindo dessa responsabilidade a configuração de outros equipamentos e
      serviços, como ponto de acesso, instabilidades com a internet, problemas
      do computador do assinante ou Usuário (softwares maliciosos), problemas
      com navegadores (desatualizados ou softwares maliciosos), problemas do
      Usuário ou acessibilidade devido a alguma dificuldade técnica.
      <br />
      <br />
      <h3>III. DISPOSIÇÕES FINAIS</h3>
      <br />
      Qualquer comunicação relativa ao objeto do presente documento deverá ser
      encaminhada à Empresa, por meio do endereço eletrônico
      avanttinovacao@inventta.net.
      <br />
      <br />
      Os direitos decorrentes deste Termo não poderão ser cedidos ou
      transferidos pela Autorizada nem por seus Usuários, no todo ou em parte,
      sem o prévio consentimento por escrito da Empresa.
      <br />
      <br />
      As partes concordam que o foro de Campinas/SP tem competência exclusiva
      para dirimir qualquer disputa ou reclamação resultante da interpretação
      acerca do presente Termo ou do seu objeto ou sua formação.
      <br />
      <br />
      Caso qualquer disposição do presente documento esteja em conflito com a
      lei que o rege, ou se qualquer disposição for considerada nula, inválida
      ou ineficaz ou por um Tribunal, tal disposição deverá ser atualizada para
      refletir tanto quanto possível as intenções originais das Partes, em
      conformidade com a legislação aplicável, sendo que os demais termos e
      condições permanecerão em pleno vigor e efeito.
      <br />
      <br />
      A Autorizada e o Usuário reconhecem ter lido e entendido esses Termos de
      Uso e concordam em ficar a eles vinculados.
      <br />
      <br />
      As partes reconhecem que esses Termos de Uso poderão ser objeto de
      atualizações e ajustes a qualquer momento, cabendo às mesmas checar
      periodicamente o seu teor, não sendo responsabilidade da Empresa avisar a
      cada acréscimo/alteração havido. Documento atualizado em maio de 2023.
      <br />
      <br />
    </div>
  );
};

export function ConditionsAndTermsModal({
  /* isOpen, */ onRequestClose,
}: ConditionsAndTermsModalProps): JSX.Element {
  const { getAcceptedTerms, acceptTerms, acceptedTerms } =
    useContext(AuthContext);

  const { getGlobalConfigs, company_terms } = useContext(ConfigContext);

  const [isOpenState, setIsOpenState] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [checkedDefault, setCheckedDefault] = useState(false);
  const [checkedCompany, setCheckedCompany] = useState(false);
  const [showDefaultTerms, setShowDefaultTerms] = useState(true);
  const [showCompanyTerms, setShowCompanyTerms] = useState(false);
  const [acceptedtermsState, setAcceptedterms] = useState(acceptedTerms);

  const handleChangeDefault = useCallback(() => {
    setCheckedDefault(!checkedDefault);
    setIsButtonDisable(!isButtonDisable);
  }, [setCheckedDefault, checkedDefault, isButtonDisable]);

  const handleChangeCompany = useCallback(() => {
    setCheckedCompany(!checkedCompany);
    setIsButtonDisable(!isButtonDisable);
  }, [setCheckedCompany, checkedCompany, isButtonDisable]);

  const onClickButtonDefaultTerm = useCallback(() => {
    if (company_terms?.length <= 1 || company_terms === undefined) {
      acceptTerms();
      setIsOpenState(false);
    } else {
      setShowDefaultTerms(false);
      setShowCompanyTerms(true);
      setIsButtonDisable(true);
    }
  }, [company_terms, acceptTerms]);

  const onClickButtonCompanyTerm = useCallback(() => {
    acceptTerms();
    setIsOpenState(false);
  }, [acceptTerms]);

  useEffect(() => {
    getGlobalConfigs();
    getAcceptedTerms();
    setAcceptedterms(acceptedTerms);
    let mustShowTerms = true;
    if (acceptedTerms) {
      const acceptedDate: Date = new Date(acceptedTerms);

      const today: Date = new Date();

      const ninetyDaysAgo: Date = new Date();
      ninetyDaysAgo.setDate(today.getDate() - 90);

      mustShowTerms = acceptedDate < ninetyDaysAgo || acceptedDate > today;
    }

    if (acceptTerms === null) return;

    setIsOpenState(mustShowTerms);
  }, [
    getGlobalConfigs,
    getAcceptedTerms,
    setIsOpenState,
    company_terms,
    acceptedTerms,
  ]);

  return (
    <Modal
      isOpen={isOpenState}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-terms"
    >
      <ConditionsAndTermsForm showTerms={showDefaultTerms}>
        <ModalTitle>TERMOS DE USO DO SOFTWARE Avantt.i </ModalTitle>
        <ConditionsAndTermsContent>
          <ConditionsAndTermsText />
        </ConditionsAndTermsContent>
        <CheckboxLabel>
          <Input
            label="Li e concordo com os termos de uso."
            value={checkedDefault}
            onChange={handleChangeDefault}
          />
        </CheckboxLabel>
        <Button
          max_width={200}
          type="button"
          onClick={onClickButtonDefaultTerm}
          disabled={isButtonDisable}
        >
          Concordo
        </Button>
      </ConditionsAndTermsForm>
      <ConditionsAndTermsForm showTerms={showCompanyTerms}>
        <ModalTitle>TERMOS DE USO DA EMPRESA </ModalTitle>
        <ConditionsAndTermsContent>
          <div dangerouslySetInnerHTML={{ __html: company_terms }} />
        </ConditionsAndTermsContent>
        <CheckboxLabel>
          <Input
            label="Li e concordo com os termos de uso."
            value={checkedCompany}
            onChange={handleChangeCompany}
          />
        </CheckboxLabel>
        <Button
          max_width={200}
          type="button"
          onClick={onClickButtonCompanyTerm}
          disabled={isButtonDisable}
        >
          Concordo
        </Button>
      </ConditionsAndTermsForm>
    </Modal>
  );
}
