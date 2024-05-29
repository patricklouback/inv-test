import { BackToTop } from '@components/BackToTop';
import { ArticlesCampaingsComponent } from '@components/CampaignDefault';
import { Container as ContainerPage } from '@components/Container';
import { FilterComponent } from '@components/ItemFilter';
import { Pagination } from '@components/Pagination';
import { DefaultSection } from '@components/SectionDefault';
import { CampaignContext } from 'contexts/Campaign';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { RiTrophyLine } from 'react-icons/ri';
import { BackButton, Container, ContentPage } from './styles';

export const PageAllCampaigns: React.FC = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { loadCampaignsUserArea, campaigns, paginate } =
    useContext(CampaignContext);
  const { back } = useRouter();

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      await loadCampaignsUserArea({
        limit: paginate.limit,
        offset: paginate.pages,
        page: newPage,
      });
    },
    [paginate, loadCampaignsUserArea]
  );

  useEffect(() => {
    loadCampaignsUserArea();
    // window.scrollTo(0, 0);
  }, [loadCampaignsUserArea]);

  return (
    <ContainerPage>
      <Container>
        <BackButton onClick={() => back()}>
          <BiLeftArrowAlt size={20} />
          <span>Voltar</span>
        </BackButton>
        <DefaultSection
          type="normal"
          header={{
            title: 'Lista de direcionais de inovação',
            Icon: <RiTrophyLine size={24} />,
            small_header: true,
            item_right: <FilterComponent screen="campaigns" />,
          }}
        />
        <ContentPage>
          {campaigns.map((item, index) => (
            <div className="ittem">
              <ArticlesCampaingsComponent
                key={item.id}
                campaignData={item}
                index={index}
              />
            </div>
          ))}
        </ContentPage>
      </Container>
      <Pagination
        onPageChange={handleChangePage}
        currentPage={page}
        lastPage={paginate?.pages}
      />
      <BackToTop />
    </ContainerPage>
  );
};
