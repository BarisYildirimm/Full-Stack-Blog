import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-8 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.result.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 bprder-[lightGray] object-cover"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.result.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.result.email}
        />
        <TextInput type="text" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
        <div className="text-red-500 flex justify-between mt-5">
          <span onClick={"() => setShowModal(true)"} className="cursor-pointer">
            Delete Account
          </span>
          <span onClick={"handleSignout"} className="cursor-pointer">
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
