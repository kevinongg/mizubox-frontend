import { useState } from "react";
import { useAccount } from "./AccountContext";


const AccountEdit = ({ label, field, value, type }) => {
  const { updateUser, updateError, toastMessage } = useAccount();
  const [editing, setEditing] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newValue = formData.get(field);

    try {
      await updateUser({ [field]: newValue });
      toastMessage(`${label} updated successfully!`, "success");
      setEditing(false);
    } catch (error) {
      toastMessage(error.message, "error");
    }
  };

  return (

    <div>
      <strong>{label}</strong>
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{value}</div>
        <button onClick={() => setEditing(true)} className="icon-button">
         Edit
        </button>
        </div>
      </>

      {editing && (
        <>
          <form onSubmit={onSave}>
            <input
              name={field}
              type={type}
              defaultValue={value}
              required={field === "name" || field === "email"}
            />
            {updateError && <output>{updateError}</output>}
            <button type="submit">Save changes</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </form>
        </>
      )}
    </div>

  );
};

export default AccountEdit;
