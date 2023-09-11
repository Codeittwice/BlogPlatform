import { useRef, useState, FormEvent } from "react";
import {
  onAccessRef,
  isValidTitle,
  isValidDescription,
} from "../../utils/validationFunctions";
import styles from "./PostForm.module.css";
import Card from "../Card";

interface Errors {
  title?: boolean;
  description?: boolean;
}

const PostForm = (props: any) => {
  const defaultErrorMsg = "Please enter valid task information!";

  const buttonTxt = props.buttonType === "edit" ? "Edit Post" : "Add New Post";

  const [errors, setErrors] = useState<Errors>({});

  const titleRef = useRef<HTMLInputElement>(props.title);
  const descriptionRef = useRef<HTMLInputElement>(props.description);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (isValidForm(onAccessRef(titleRef), onAccessRef(descriptionRef))) {
      props.onSubmit({
        title: onAccessRef(titleRef),
        description: onAccessRef(descriptionRef),
      });

      setErrors({});
    } else {
      setErrors({
        title: !isValidTitle(onAccessRef(titleRef)),
        description: !isValidDescription(onAccessRef(descriptionRef)),
      });
    }
  };

  const isValidForm = (_title: string, _description: string) =>
    isValidTitle(_title) && isValidDescription(_description);

  const onClose = () => props.onClose();

  return (
    <>
      <Card>
        <div className={styles.new}>
          <form onSubmit={onSubmitHandler}>
            {(errors.title || errors.description) && (
              <div className={styles.error}>
                <p>{defaultErrorMsg}</p>
              </div>
            )}
            <div className={styles.content}>
              {errors.title && (
                <label style={{ color: "red" }}> *required</label>
              )}
              <input
                type="text"
                placeholder="Title"
                defaultValue={props.title}
                ref={titleRef}
              />
              {errors.description && (
                <label style={{ color: "red" }}> *required</label>
              )}
              <input
                type="text"
                placeholder="Description"
                defaultValue={props.description}
                ref={descriptionRef}
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
