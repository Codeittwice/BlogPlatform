import styles from "./Header.module.css";
import logo from "../../img/logo.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { Pathnames } from "@/utils/enums";
import Card from "../Card";

const Header = () => {
  const router = useRouter();
  let showPostNavigation = false;
  if (router.pathname !== Pathnames.home && router.pathname !== Pathnames.new)
    showPostNavigation = true;
  return (
    <>
      <header className={styles.main}>
        <div>
          <img src={logo.src}></img>
        </div>
        <div>
          <h1>Blog Platform</h1>
        </div>
        <div className={styles["link-container"]}>
          <Link
            href="/"
            className={
              router.pathname == "/" ? styles["active-link"] : styles.link
            }
          >
            <div className={styles.card}>
              <h3>Home</h3>
            </div>
          </Link>
        </div>
        <div className={styles["link-container"]}>
          <Link href="/new" className={styles.link}>
            <div className={styles.card}>
              <h3>New Post</h3>
            </div>
          </Link>
        </div>

        {showPostNavigation && (
          <div className={styles.card}>
            <div className={styles["link-container"]}>
              <Link
                href={{
                  pathname: "/[_id]/edit",
                  query: { _id: router.query._id },
                }}
                className={styles.link}
              >
                <h3>Edit Post</h3>
              </Link>
            </div>
            <div className={styles["link-container"]}>
              <Link
                href={{
                  pathname: "/[_id]/delete",
                  query: { _id: router.query._id },
                }}
                className={styles.deleteLink}
              >
                <h3>Delete Post</h3>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;
