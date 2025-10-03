import { useAccount } from "./AccountContext";
import AccountEdit from "./AccountEdit";
import PasswordEdit from "./PasswordEdit";

const Account = () => {
  const { user, userLoading, userError } = useAccount();
  console.log(user);

  if (userLoading) return <p>Loading your account...</p>;
  if (userError) return <p>Failed to load your account</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div className="account-container">
      <h1>Account & Security</h1>

      <AccountEdit label="Name" field="name" value={user.name} type="text" />

      <AccountEdit
        label="Email"
        field="email"
        value={user.email}
        type="email"
      />

      <PasswordEdit />

      <AccountEdit
        label="Address"
        field="address"
        value={user.address}
        type="text"
      />

      <AccountEdit
        label="Mobile Number"
        field="mobile_number"
        value={user.mobile_number}
        type="tel"
      />
    </div>
  );
};

export default Account;

// <form onSubmit={onUpdate}>
//   <label>
//     Name
//     <input type="text" name="name" defaultValue={user.name} required />
//   </label>
//   <label>
//     Email
//     <input
//       type="email"
//       name="password"
//       defaultValue={user.email}
//       required
//     />
//   </label>
//   <label>
//     Email
//     <input
//       type="email"
//       name="password"
//       defaultValue={user.email}
//       required
//     />
//   </label>
//   <label>
//     Mobile Number
//     <input
//       type="tel"
//       name="mobile_number"
//       defaultValue={user.mobile_number}
//       required
//     />
//   </label>
//   <label>
//     Address
//     <input
//       type="text"
//       name="address"
//       defaultValue={user.address}
//       required
//     />
//   </label>
//   <button>Save changes</button>
//   {updateError && <output>{updateError}</output>}
// </form>
