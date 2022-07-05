// ----------------------------------------------------------------------

declare module '@mui/system' {
  interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}

const shape = {
  borderRadius: 8,
  borderRadiusSm: 4,
  borderRadiusMd: 6
};

export default shape;
