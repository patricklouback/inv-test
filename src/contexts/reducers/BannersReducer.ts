import { Banner } from 'interfaces/banners';

interface BannersProps {
  loading: boolean;
  banner: Banner;
  bannersList: Banner[];
}

export const BannersDefaultValues = {
  loading: false,
  banner: null,
  bannersList: [],
};

type BannersAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_BANNER'; banner: Banner }
  | { type: 'SET_BANNERS_LIST'; bannersList: Banner[] };

export const BannersReducer = (
  state: BannersProps,
  action: BannersAction
): BannersProps => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      nextState.loading = action.loading;
      break;
    case 'SET_BANNER':
      nextState.banner = action.banner;
      break;
    case 'SET_BANNERS_LIST':
      nextState.bannersList = action.bannersList;
      break;
    default:
      return nextState;
  }

  return nextState;
};
