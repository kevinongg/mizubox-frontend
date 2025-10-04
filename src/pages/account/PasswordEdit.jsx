import { useState } from "react";
import { useAccount } from "./AccountContext";
import RedPencil from "../../components/icons/RedPencil";

const PasswordEdit = () => {
  const { updateUserPassword, updateUserPasswordError } = useAccount();
  const [editing, setEditing] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    //   const [visibleError, setVisibleError] = useState("");
    // const [successMessage, setSuccessMessage] = useState("");

    // // Fade error in/out
    // useEffect(() => {
    //   if (updateUserPasswordError) {
    //     setVisibleError(updateUserPasswordError);
    //     const timer = setTimeout(() => setVisibleError(""), 4000);
    //     return () => clearTimeout(timer);
    //   }
    // }, [updateUserPasswordError]);

    // // Fade success in/out
    // useEffect(() => {
    //   if (successMessage) {
    //     const timer = setTimeout(() => setSuccessMessage(""), 4000);
    //     return () => clearTimeout(timer);
    //   }
    // }, [successMessage]);

    await updateUserPassword({
      currentPassword,
      newPassword,
    });
    if (!updateUserPasswordError) setEditing(false);
  };

  return (
    <div>
      <strong>Password</strong>
      {!editing ? (
        <>
          <div>*********</div>
          <button onClick={() => setEditing(true)}>
            <RedPencil />
          </button>
        </>
      ) : (
        <form onSubmit={onSave}>
          <label>
            Current Password
            <input
              name="currentPassword"
              type="password"
              placeholder="current password"
              required
            />
          </label>
          <label>
            New Password
            <input
              name="newPassword"
              type="password"
              placeholder="minimum 8 characters"
              required
              minLength={8}
            />
          </label>
          {updateUserPasswordError && (
            <output>{updateUserPasswordError}</output>
          )}
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordEdit;
