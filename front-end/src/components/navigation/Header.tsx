import styles from "./Header.module.css";
import logo from "../../img/logo.jpg";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const showTaskNavigaton = false; //props.route == "/tasks" ? true : false;
  const router = useRouter();
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
            <h3>Home</h3>
          </Link>
        </div>

        {showTaskNavigaton && (
          <>
            <div className={styles["link-container"]}>
              <Link
                href="/tasks"
                className={
                  router.pathname == "/tasks"
                    ? styles["active-link"]
                    : styles.link
                }
              >
                <h3>Tasks</h3>
              </Link>
            </div>
            <div className={styles["link-container"]}>
              <Link href="/tasks/new" className={styles.link}>
                <h3>Add New Task</h3>
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
};
export default Header;
