const PLUS_CLICK = 'PLUS_CLICK';
const RANDOM_SHOW = 'RANDOM_SHOW';
const FINISH = 'FINISH';
const LEVEL_PLUS = 'LEVEL_PLUS';
const LEVEL_DOWN = 'LEVEL_DOWN';

export const plusClickAction = () => ({type: PLUS_CLICK});
export const randomShow = randomNumber => ({type: RANDOM_SHOW, randomNumber: randomNumber});
export const finish = ()=>({type: FINISH});
export const levelPlus = ()=>({type: LEVEL_PLUS});
export const levelDown = ()=>({type: LEVEL_DOWN});

const initialState = {
    dogArray: [
        {id: 1, checkClick: false},
        {id: 2, checkClick: false},
        {id: 3, checkClick: false},
        {id: 4, checkClick: false},
        {id: 5, checkClick: false},
        {id: 6, checkClick: false},
        {id: 7, checkClick: false},
        {id: 8, checkClick: false},
        {id: 9, checkClick: false}
    ],
    counterClick: 0,
    level: 0,
};

const ReducerGame = (state = initialState, action) => {
    switch (action.type) {
        case PLUS_CLICK:
            return {
                ...state,
                counterClick: state.counterClick + 1,
            };
        case RANDOM_SHOW:
            return {
                ...state,
                dogArray: state.dogArray.map(item => {
                    if (item.id === action.randomNumber) return {...item, checkClick: true};
                    else return {...item, checkClick: false};
                })
            };
        case FINISH:
            return {
                ...state,
                counterClick: state.counterClick = 0,
            };
        case LEVEL_PLUS:
            return {
                ...state,
                level: state.level + 1,
            };
        case LEVEL_DOWN:
            return {
                ...state,
                level: state.level = 0,
            };
        default:
            return {...state}
    }
    return state;
};

export default ReducerGame;