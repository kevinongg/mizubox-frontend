import { useState } from "react";
import { useAccount } from "./AccountContext";
import RedPencil from "../../components/icons/RedPencil";

const PasswordEdit = () => {
  const {} = useAccount();
  const [editing, setEditing] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const newValue = formData.get(field);
    //   try {
    //     await updateUser({ [field]: newValue });
    //     setEditing(false);
    //   } catch (error) {
    //     updateError(error.message);
    //   }
    // };

    return (
      <div>
        <strong>{label}</strong>
        {!editing ? (
          <>
            <div>{value}</div>
            <button onClick={() => setEditing(true)}>
              <RedPencil />
            </button>
          </>
        ) : (
          <form onSubmit={onSave}>
            <input
              name={field}
              type={type}
              defaultValue={value}
              required={field === "name" || field === "email"}
            />
            <button type="submit">Save changes</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
            {updateError && <output>{updateError}</output>}
          </form>
        )}
      </div>
    );
  };
};

export default PasswordEdit;
