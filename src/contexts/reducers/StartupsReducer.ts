import { Paginate } from '@default-types';
import { Startup, StartupMember, StartupSocialMedia } from "interfaces/startups";

interface StartupsProps {
    loading: boolean;
    startup: Startup;
    startupsList: Startup[];
    favoriteStartups: string[];
    lastInvestmentList: string[];
    markets: string[];
    investmentRounds: string[];
    members: StartupMember[];
    socialMedias: StartupSocialMedia[];
    paginate: Paginate;
}

export const StartupsDefaultValues = {
    loading: false,
    startup: null,
    startupsList: [],
    favoriteStartups: [],
    lastInvestmentList: [],
    markets: [],
    investmentRounds: [],
    members: [],
    socialMedias: [],
    paginate: null,
}

type StartupsAction = 
| { type: 'SET_LOADING'; loading: boolean }
| { type: 'SET_STARTUP'; startup: Startup }
| { type: 'SET_STARTUPS_LIST'; startupsList: Startup[] }
| { type: 'SET_FAVORITE_STARTUPS'; favoriteStartups: string[] }
| { type: 'SET_LAST_INVESTMENTS'; lastInvestmentList: string[] }
| { type: 'SET_MARKETS'; markets: string[] }
| { type: 'SET_INVESTMENT_ROUNDS'; investmentRounds: string[] }
| { type: 'SET_MEMBERS'; members: StartupMember[] }
| { type: 'SET_SOCIAL_MEDIAS'; socialMedias: StartupSocialMedia[] }
| { type: 'SET_PAGINATE'; paginate: Paginate  }

export const StartupsReducer = (
    state: StartupsProps,
    action: StartupsAction,
): StartupsProps => {
    const nextState = { ...state };

    switch (action.type) {
        case 'SET_LOADING':
            nextState.loading = action.loading;
            break;
        case 'SET_STARTUP':
            nextState.startup = action.startup;
            break;
        case 'SET_STARTUPS_LIST':
            nextState.startupsList = action.startupsList;
            break;
        case 'SET_FAVORITE_STARTUPS':
            nextState.favoriteStartups = action.favoriteStartups;
            break;
        case 'SET_LAST_INVESTMENTS':
            nextState.lastInvestmentList = action.lastInvestmentList;
            break;
        case 'SET_MARKETS':
            nextState.markets = action.markets;
            break;
        case 'SET_INVESTMENT_ROUNDS':
            nextState.investmentRounds = action.investmentRounds;
            break;
        case 'SET_MEMBERS':
            nextState.members = action.members;
            break;
        case 'SET_SOCIAL_MEDIAS':
            nextState.socialMedias = action.socialMedias;
            break;
        case 'SET_PAGINATE':
            nextState.paginate = action.paginate;
            break;
        default:
            return nextState;
    }

    return nextState;
}