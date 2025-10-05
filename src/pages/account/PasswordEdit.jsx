import { useState } from "react";
import { useAccount } from "./AccountContext";
import RedPencil from "../../components/icons/RedPencil";

const PasswordEdit = () => {
  const { updateUserPassword, updateUserPasswordError, toastMessage } =
    useAccount();
  const [editing, setEditing] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.value);
    console.log(formData);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    console.log(formData);

    try {
      await updateUserPassword({
        currentPassword,
        newPassword,
      });
      toastMessage("Password updated successfully!", "success");
      setEditing(false);
    } catch (error) {
      toastMessage("Incorrect password", "error");
      console.error(error);
    }
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
