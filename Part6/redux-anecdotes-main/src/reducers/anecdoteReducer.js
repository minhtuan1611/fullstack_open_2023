import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdote'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const NewAnecdote = action.payload
      state.push(NewAnecdote)
    },
    votesChange(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { votesChange, appendAnecdote, setAnecdotes } =
  anecdotesSlice.actions

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(NewAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    dispatch(votesChange(id))
    await anecdoteService.updateVotes(id)
  }
}

export default anecdotesSlice.reducer
