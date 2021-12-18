import { User } from '../types';

export const startAction = (base: any) => ({
  type: "base",
  payload: base
});

export const setLivePaths = (path: any) => ({
  type: "livepath",
  payload: path
});

export const setFirstTimeOnly = (wantMore: boolean) => ({
  type: "liveupdate",
  payload: wantMore
});

export const updateUser = (user:any) => ({
  type: "newuser",
  payload: user
});