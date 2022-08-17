import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { LevelScore } from '../../interface';

// Define a type for the slice state
export interface ScoresState {
  scoresByLevelId: Record<string, LevelScore>;
}

// Define the initial state using that type
const initialState: ScoresState = {
  scoresByLevelId: {}
};

export const ScoresSlice = createSlice({
  name: 'scores',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateScore: (state, action: PayloadAction<LevelScore>) => {
      return { ...state, scoresByLevelId: { ...state.scoresByLevelId, [action.payload.levelId]: action.payload } };
    }
  }
});

export const { updateScore } = ScoresSlice.actions;

export const selectScoreByLevelIds = (state: RootState) => state.scores.scoresByLevelId;
export const selectScoreByLevelId = (levelId: string | undefined) => (state: RootState) =>
  levelId ? state.scores.scoresByLevelId[levelId] : undefined;

export default ScoresSlice.reducer;
