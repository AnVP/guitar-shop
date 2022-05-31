import {store} from '../store';
import {Guitar} from './guitar';
import {Review} from './comment';

export type ProductData = {
    guitars: Guitar[],
    guitar: Guitar | null,
    comments: Review[],
    isDataLoaded: boolean,
    isCommentsLoaded: boolean,
    error: string,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
