
export default [
  {
    name: "IsoRoom",
    type: "glbModel",
    path: `${import.meta.env.BASE_URL}models/IsometricRoom16.glb`,
  },
  {
    name: "Screen",
    type: "videoTexture",
    path: `${import.meta.env.BASE_URL}textures/Room_vid10001-0240.mp4`,
  },
  {
    name: "FrameBigFragment",
    type: "shaders",
    path: `${import.meta.env.BASE_URL}shaders/FrameBigFragment.glsl`,
  },
  {
    name: "FrameBigVertex",
    type: "shaders",
    path: `${import.meta.env.BASE_URL}shaders/FrameBigVertex.glsl`,
  },
  {
    name: "FrameTopLeftFragment",
    type: "shaders",
    path: `${import.meta.env.BASE_URL}shaders/FrameTopLeftFragment.glsl`,
  },
  {
    name: "FrameBottomLeftFragment",
    type: "shaders",
    path: `${import.meta.env.BASE_URL}shaders/FrameBottomLeftFragment.glsl`,
  },
];

