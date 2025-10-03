import { useState } from "react";
import { useAccount } from "./AccountContext";
import RedPencil from "../../components/icons/RedPencil";

const PasswordEdit = () => {
  const { updateUserPassword, updateUserPasswordError } = useAccount();
  const [editing, setEditing] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
      if (newPassword && newPassword.length >= 8) {
        const isPasswordUpdated = await updateUserPassword({
          currentPassword,
          newPassword,
        });
        if (!isPasswordUpdated) return updateUserPasswordError;
        setEditing(false);
      } else {
        updateUserPasswordError("Password must be at least 8 characters");
      }
    } catch (error) {
      updateUserPasswordError("Current password is incorrect", error);
    }

    //   try {
    //     await updateUser({ [field]: newValue });
    //     setEditing(false);
    //   } catch (error) {
    //     updateError(error.message);
    //   }
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
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
          {updateUserPasswordError && (
            <output>{updateUserPasswordError}</output>
          )}
        </form>
      )}
    </div>
  );
};

export default PasswordEdit;
