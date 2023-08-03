import { useRef, useState, FormEvent } from "react";
import {
  onAccessRef,
  isValidTitle,
  isValidDescription,
} from "../../utils/validationFunctions";
import styles from "./PostForm.module.css";
import Card from "../Card";

const PostForm = (props: any) => {
  const defaultErrorMsg = "Please enter valid task information!";

  const buttonTxt = props.buttonType === "edit" ? "Edit Post" : "Add New Post";

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const title = useRef<HTMLInputElement>(props.title);
  const description = useRef<HTMLInputElement>(props.description);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (isValidForm(onAccessRef(title), onAccessRef(description))) {
      props.onSubmit({
        title: onAccessRef(title),
        description: onAccessRef(description),
      });

      setError(false);
      setErrorMsg("");
      setTitleError(false);
      setDescriptionError(false);
    } else {
      setError(true);
      setTitleError(!isValidTitle(onAccessRef(title)));
      setDescriptionError(!isValidDescription(onAccessRef(description)));
    }
  };

  const isValidForm = (_title: string, _description: string) => {
    if (!isValidTitle(_title)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid name\n");
    }
    if (!isValidDescription(_description)) {
      setErrorMsg((oldMsg) => oldMsg + "\nInvalid description\n");
    }

    if (isValidTitle(_title) && isValidDescription(_description)) return true;
    return false;
  };
  const onClose = () => {
    props.onClose();
  };
  return (
    <>
      <Card>
        <div className={styles.new}>
          <form onSubmit={onSubmitHandler}>
            {error && (
              <div className={styles.error}>
                <p>{defaultErrorMsg}</p>
              </div>
            )}
            <div className={styles.content}>
              {titleError && <label style={{ color: "red" }}> *required</label>}
              <input
                type="text"
                placeholder="Title"
                defaultValue={props.title}
                ref={title}
              ></input>
              {descriptionError && (
                <label style={{ color: "red" }}> *required</label>
              )}
              <input
                type="text"
                placeholder="Description"
                defaultValue={props.description}
                ref={description}
              />
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.submitBtn}>
                {buttonTxt}
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default PostForm;
