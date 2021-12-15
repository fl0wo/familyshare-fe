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
