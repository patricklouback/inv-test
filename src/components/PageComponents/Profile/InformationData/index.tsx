import { BannerComponent } from '@components/Banner';
import { AreaContext } from 'contexts/AreaContext';
import { BannersContext } from 'contexts/Banners';
import { DepartamentContext } from 'contexts/DepartamentContext';
import { UserContext } from 'contexts/User';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoRocketOutline } from 'react-icons/io5';
import { RiLightbulbFlashLine, RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { Card } from '../Card';
import { EditUser } from './EditUser';
import {
  AllContent,
  BannerContentWrapper,
  BannerSubtitle,
  BannerTitle,
  ButtonActionImage,
  ButtonEdit,
  ButtonEditData,
  CardsContainer,
  CloseButtonWrapper,
  Exit,
  InputSendImg,
  ItemOutherInformations,
  KnowPlans,
  Name,
  SectionBanner,
  UserImage,
  WapperActionsButtonImage,
  WapperDataInfo,
  WapperDataInformation,
  WapperEditImage,
  WapperImage,
  WapperOutherInformations,
} from './styles';

export function InformationData(): JSX.Element {
  const { colors } = useTheme();
  const inputFile = useRef<HTMLInputElement>(null);
  const { editImageProfile, user } = useContext(UserContext);

  const [fileUpload, setFileUpload] = useState({
    name: '',
    fileData: '',
  });

  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);

  const [filePreview, setFilePreview] = useState(null);

  const [preview, setPreview] = useState(null);
  const [isBannerActive, setIsBannerActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { areas, getAreas } = useContext(AreaContext);
  const { departaments, getDepartaments } = useContext(DepartamentContext);
  const { getBannersForPage, bannersList, loading } =
    useContext(BannersContext);

  function closeBanner(): void {
    setIsBannerActive(false);
  }

  function actionButton(url: string): void {
    window.open(url, '_blank');
  }

  const handleFile = useCallback(
    file => {
      setFileUpload({
        name: file.target?.files[0]?.name,
        fileData: file.target?.files[0],
      });
      setFilePreview(file.target?.files[0]);
    },
    [setFileUpload, setFilePreview]
  );

  const onSubmitNewImage = useCallback(async () => {
    const formData = new FormData();
    // formData.append('file', fileUpload.fileData);
    formData.append('file', fileUpload.fileData);
    await editImageProfile(formData);
    setFileUpload({
      name: '',
      fileData: '',
    });
    setPreview(null);
  }, [editImageProfile, fileUpload]);

  const isTrial = process.env.NEXT_PUBLIC_CLIENT === 'trial';
  const isCommonUser = !user?.isAdmin && !user?.isManager;

  // EFFECT'S
  useEffect(() => {
    if (filePreview) {
      return setPreview(URL.createObjectURL(filePreview));
    }

    setPreview('');
  }, [filePreview]);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      if (isTrial) {
        await getBannersForPage('USER_PROFILE', isTrial);
      }
      await getDepartaments();
      await getAreas();
    };
    loadData();
  }, [getDepartaments, getAreas, getBannersForPage, isTrial]);

  return (
    <>
      {isModalAddUserOpen && (
        <Exit onClick={() => setIsModalAddUserOpen(false)} />
      )}

      {isModalAddUserOpen && (
        <EditUser
          setIsModalAddUserOpen={setIsModalAddUserOpen}
          departaments={departaments}
          areas={areas}
        />
      )}

      <WapperDataInfo>
        <WapperImage>
          <UserImage
            img={preview || user?.image || 'https://via.placeholder.com/255'}
          />
          <InputSendImg
            onChange={handleFile}
            ref={inputFile}
            type="file"
            hidden
          />
          <WapperEditImage>
            <ButtonEdit
              onClick={() => {
                inputFile.current.click();
              }}
            >
              <FiEdit2 color={colors.font} />
              <span>Editar Foto</span>
            </ButtonEdit>

            <WapperActionsButtonImage>
              {fileUpload?.fileData && (
                <ButtonActionImage
                  onClick={() => {
                    setPreview(null);
                    setFileUpload(null);
                    inputFile.current.files = null;
                    inputFile.current.value = '';
                  }}
                >
                  Cancelar
                </ButtonActionImage>
              )}
              {fileUpload?.fileData && (
                <ButtonActionImage onClick={onSubmitNewImage}>
                  Salvar
                </ButtonActionImage>
              )}
            </WapperActionsButtonImage>
          </WapperEditImage>
        </WapperImage>
        <WapperDataInformation>
          <Name>{user?.name}</Name>
          <WapperOutherInformations>
            <ItemOutherInformations>
              <strong>Área:</strong> {user?.area?.name ?? 'Empty Area'}
            </ItemOutherInformations>
            <ItemOutherInformations>
              <strong>Departamento:</strong>{' '}
              {user?.departament?.name ?? 'Empty Departament'}
            </ItemOutherInformations>
            <ItemOutherInformations>
              <strong>Email:</strong> {user?.email}
            </ItemOutherInformations>
          </WapperOutherInformations>
          <ButtonEditData onClick={() => setIsModalAddUserOpen(true)}>
            <FiEdit2 color={colors.font} />
            <span>Editar Dados</span>
          </ButtonEditData>
          {isTrial && !isCommonUser ? (
            <SectionBanner isOpen={isBannerActive}>
              {bannersList && bannersList.length > 0 && (
                <BannerComponent banner={bannersList[0]}>
                  <AllContent>
                    <BannerContentWrapper>
                      <BannerTitle>
                        {bannersList[0].title}
                        <KnowPlans
                          onClick={() =>
                            actionButton(
                              'https://www.labinventta.com.br/price.php'
                            )
                          }
                        >
                          Conhecer Planos
                        </KnowPlans>
                      </BannerTitle>
                      <BannerSubtitle>{bannersList[0].subtitle}</BannerSubtitle>
                    </BannerContentWrapper>
                    <CloseButtonWrapper onClick={() => closeBanner()}>
                      <IoMdClose
                        size={20}
                        color={isHovered ? colors.background : colors.font}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      />
                    </CloseButtonWrapper>
                  </AllContent>
                </BannerComponent>
              )}
            </SectionBanner>
          ) : null}
        </WapperDataInformation>
        <CardsContainer>
          <Card
            title="Iniciativas em Andamento"
            value={String(user?.ideasInProgress || 0)}
            icon={<RiLightbulbFlashLine color={colors.background} size={50} />}
          />
          <Card
            title="Posição no Ranking"
            value={`${String(user?.rank || 0)}º`}
            icon={<RiTrophyLine color={colors.background} size={50} />}
          />
          <Card
            title="Iniciativas em Implementação"
            value={String(user?.implementedIdeas || 0)}
            icon={<IoRocketOutline color={colors.background} size={50} />}
          />
          <Card
            title="Pontuação"
            value={String(user?.points || 0)}
            icon={<AiFillStar color={colors.background} size={50} />}
          />
        </CardsContainer>
      </WapperDataInfo>
    </>
  );
}
