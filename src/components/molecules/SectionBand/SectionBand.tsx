import styles from './SectionBand.module.scss';

interface SectionBandProps {
  label: string;
  meta?: string;
}

export const SectionBand = ({ label, meta }: SectionBandProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  );
};