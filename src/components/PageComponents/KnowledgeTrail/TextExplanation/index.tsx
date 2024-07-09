import { useCallback, useEffect, useState } from 'react';
import { Content, TextBox, Title } from './styles';

interface VideoTextInfo {
  videoInfo: {
    title?: string;
    target?: string;
    mandatoryDiscussion?: string;
    results?: string;
    atentionPoints?: [];
    time?: string;
  };
}

export const TextExplanation: React.FC<VideoTextInfo> = ({
  videoInfo,
}): JSX.Element => {
  const [atentionPoints, setAtentionPoints] = useState([]);

  const show = useCallback((): boolean => {
    return videoInfo.title !== null && videoInfo.title !== undefined;
  }, [videoInfo.title]);

  const showAllFields = useCallback((): boolean => {
    return (
      videoInfo.mandatoryDiscussion !== undefined &&
      videoInfo.mandatoryDiscussion !== null
    );
  }, [videoInfo.mandatoryDiscussion]);

  function showTime(): boolean {
    return videoInfo.time !== null && videoInfo.time !== undefined;
  }

  const [height, setHeight] = useState(showAllFields() ? 682 : 271);

  useEffect(() => {
    if (showAllFields()) {
      setHeight(682);
    } else if (show()) {
      setHeight(271);
    }
    if (videoInfo.atentionPoints !== undefined) {
      setAtentionPoints(
        // @ts-ignore
        videoInfo.atentionPoints.sort((a, b) => b.key.length - a.key.length)
      );
    }
  }, [showAllFields, show, videoInfo.atentionPoints]);

  return (
    <div>
      {show() && (
        <TextBox height={height}>
          <Title>{videoInfo.title}</Title>
          <Title>OBJETIVO GERAL</Title>
          <Content>{videoInfo.target}</Content>
          {showTime() && (
            <Content>
              {`⏲️ Tempo de Duração das Atividades da Etapa: `}
              <u>{videoInfo.time}</u>
            </Content>
          )}
          {showAllFields() && (
            <div>
              <Title>DISCUSSÕES NECESSÁRIAS</Title>
              <Content>{videoInfo.mandatoryDiscussion}</Content>
              <Title>RESULTADOS E PRÓXIMOS PASSOS</Title>
              <Content>{videoInfo.results}</Content>
              <Title>PONTOS DE ATENÇÃO</Title>
              <ul>
                {atentionPoints.map(point => {
                  return (
                    <Content key={point.key}>
                      <b> {point.key} </b> {point.value}
                    </Content>
                  );
                })}
              </ul>
            </div>
          )}
        </TextBox>
      )}
    </div>
  );
};
