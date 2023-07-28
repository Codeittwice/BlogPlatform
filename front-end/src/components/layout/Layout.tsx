import Header from "../navigation/Header";
import TaskProvider from "../../_context/context/tasks-context";
import styles from "./Layout.module.css";

import configureTasksStore from "@/_context/hooks-store/tasks-store";

configureTasksStore();

function Layout(props: any) {
  return (
    <div>
      <TaskProvider>
        <Header route={props.route} />

        <div className={styles["main-container"]}>
          <main className={styles.main}>{props.children}</main>
        </div>
      </TaskProvider>
    </div>
  );
}

export default Layout;
