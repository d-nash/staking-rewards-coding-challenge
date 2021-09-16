import "./styles.css";
import React, { useState } from "react";
import { FormControl } from "./FormControl";
import { UserSelector } from "./UserSelector";
import { usePosts } from "./usePosts";
import { FieldError, StringMap, Post } from "./types";

export const App = () => {
  const [values, setValues] = useState<Post>({
    userId: "",
    title: "",
    body: ""
  });
  const [errors, setErrors] = useState<StringMap<FieldError>>({});
  const [hasTriedToSubmit, setTriedToSubmit] = useState(false);
  const { sendPost, isSendingPost, sendPostStatus } = usePosts();

  const hasErrors = () => !!Object.values(errors).filter(Boolean).length;

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedToSubmit(true);
    if (hasErrors()) {
      return;
    }

    sendPost(values);
  };

  const handleFieldChange = (
    name: string,
    value: string,
    error: FieldError
  ) => {
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
  };

  return (
    <div className="App">
      <h1>
        Staking Rewards Coding Challenge{" "}
        <span role="img" aria-label="sparks">
          ✨
        </span>
      </h1>
      <form onSubmit={(e) => submitForm(e)}>
        <FormControl
          name="userId"
          label="User"
          value={values.userId}
          validate={(value) => (!value ? "Please select a user." : undefined)}
          onChange={handleFieldChange}
          renderFormField={(fieldProps) => <UserSelector {...fieldProps} />}
        />
        <FormControl
          name="title"
          label="Title"
          value={values.title}
          validate={(value) => (!value ? "Please enter a title." : undefined)}
          onChange={handleFieldChange}
          renderFormField={(fieldProps) => (
            <input type="text" {...fieldProps} />
          )}
        />
        <FormControl
          name="body"
          label="Body"
          value={values.body}
          validate={(value) => (!value ? "Please enter some text." : undefined)}
          onChange={handleFieldChange}
        />
        <input
          className="submit-button"
          type="submit"
          value="Submit"
          disabled={isSendingPost || (hasTriedToSubmit && hasErrors())}
        />
        {hasTriedToSubmit && hasErrors() ? (
          <div>{Object.values(errors).join(" ")}</div>
        ) : (
          <></>
        )}
        {sendPostStatus ? <div>{sendPostStatus}</div> : <></>}
      </form>
      <div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div>
    </div>
  );
};
