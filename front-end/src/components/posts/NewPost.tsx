import { useRef, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import {
  onAccessRef,
  isValidTitle,
  isValidDescription,
  isValidDate,
  isValidPriority,
} from "../../utils/validationFunctions";
import styles from "./NewTask.module.css";
import Card from "../Card";
import Modal from "../Modal";
import { Pathnames, Priorities } from "@/utils/enums";

const NewPost = (props: any) => {
  const defaultErrorMsg = "Please enter valid task information!";
  const router = useRouter();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const priority = useRef<HTMLSelectElement>(null);

  // useEffect(() => {
  //   if (overlay) {
  //     router.push(Pathnames.new);
  //   } else {
  //     router.push(Pathnames.tasks);
  //   }
  // }, [overlay]);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (
      isValidForm(
        onAccessRef(title),
        onAccessRef(description),
        onAccessRef(date),
        onAccessRef(priority)
      )
    ) {
      let dateString = "";
      if (onAccessRef(date) !== "") {
        dateString += new Date(onAccessRef(date)).toDateString();
      }
      props.onSubmit(
        onAccessRef(title),
        onAccessRef(description),
        onAccessRef(date),
        onAccessRef(priority)
      );

      setError(false);
      setErrorMsg("");
      setOverlay(false);
      setTitleError(false);
      setDescriptionError(false);

      //onAccessRef(title) = undefined;
      //description.current.value = undefined;
      //date.current.value = undefined;
      //priority.current.value = undefined;
    } else {
      setError(true);
      setTitleError(!isValidTitle(onAccessRef(title)));
      setDescriptionError(!isValidDescription(onAccessRef(description)));
    }
  };
  const onTriggerOverlayHandler = () => {
    setOverlay(!overlay);
  };

  const isValidForm = (
    _title: string,
    _description: string,
    _date: string,
    _priority: string
  ) => {
    if (!isValidTitle(_title)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid name\n");
    }
    if (!isValidDescription(_description)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid description\n");
    }
    if (!isValidDate(_date)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid date\n");
    }
    if (!isValidPriority(_priority)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid priority\n");
    }

    if (
      isValidTitle(_title) &&
      isValidDescription(_description) &&
      isValidDate(_date) &&
      isValidPriority(_priority)
    )
      return true;
    return false;
  };

  return (
    <>
      <button className={styles.open} onClick={onTriggerOverlayHandler}>
        +
      </button>
      {overlay && (
        <Modal onClose={onTriggerOverlayHandler}>
          <div className={styles.new}>
            <form onSubmit={onSubmitHandler}>
              {error && (
                <div className={styles.error}>
                  <p>{defaultErrorMsg}</p>
                </div>
              )}
              <div className={styles.content}>
                {titleError && (
                  <label style={{ color: "red" }}> *required</label>
                )}
                <input type="text" placeholder="Title" ref={title}></input>
                {descriptionError && (
                  <label style={{ color: "red" }}> *required</label>
                )}
                <input
                  type="text"
                  placeholder="Description"
                  ref={description}
                />

                <input type="date" placeholder="Date" ref={date} />
                <select name="priority" id="priority" ref={priority}>
                  {Object.values(Priorities).map((prio) => {
                    return <option value={prio}>{prio}</option>;
                  })}
                </select>
              </div>
              <div className={styles.submit}>
                <button type="submit">Add New Task</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewPost;

//<input type="text" placeholder="Priority" ref={priority} />
