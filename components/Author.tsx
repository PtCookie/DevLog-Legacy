import styles from '../styles/Components.module.css';

type Props = {
  author: Author;
};

export default function Author({ author }: Props) {
  return (
    <>
      <span className={styles.author}>{author.name}</span>
    </>
  );
}
