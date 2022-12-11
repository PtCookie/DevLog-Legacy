import styles from '../styles/Components.module.css';

type Props = {
  active: boolean;
  onClick: () => void;
};

export default function BurgerButton({ active, onClick }: Props) {
  return (
    <div className={styles.burger} data-active={active} onClick={onClick}>
      <div />
      <div />
      <div />
    </div>
  );
}
