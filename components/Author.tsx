import styles from './Author.module.css';

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
