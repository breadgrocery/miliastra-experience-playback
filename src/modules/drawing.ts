const pens = {
  default: new Pen(Color.red, 2),
  text: new Pen(Color.royalBlue, 2),
  img: new Pen(Color.mediumSeaGreen, 2),
  detect: new Pen(Color.orchid, 2)
} as const;

export const drawingBoard = {
  draw: <T extends Region>(region?: T, group?: string) => {
    if (region) region.drawSelf(`${group || Date.now()}`, pens.default);
    return region;
  },
  text: <T extends Region>(region?: T) => {
    if (region) region.drawSelf("group_text", pens.text);
    return region;
  },
  img: <T extends Region>(region?: T) => {
    if (region) region.drawSelf("group_img", pens.img);
    return region;
  },
  detect: <T extends Region>(region?: T) => {
    if (region) region.drawSelf("group_detect", pens.detect);
    return region;
  }
};
