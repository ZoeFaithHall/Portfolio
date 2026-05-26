import styles from './Image.module.scss';

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const Image = ({ src, alt, width, height }: ImageProps) => {
  return (
    <div className={styles.root}>
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};  

export default Image;