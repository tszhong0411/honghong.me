export type CloudinaryImgType = {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  aspect?: {
    width: number;
    height: number;
  };
  className?: string;
  rounded?: boolean;
};
