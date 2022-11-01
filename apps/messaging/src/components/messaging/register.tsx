import { Button } from "flowbite-react";

interface RegisterProperties {
  registerUser: () => void;
}

const Register = (props: RegisterProperties) => {
  return (
    <>
      <div className="overflow-hidden p-4 rounded-xl shadow-xl">
        <div className="flex items-center justify-center">
          <Button onClick={props.registerUser}>Register</Button>
        </div>
      </div>
    </>
  );
};

export default Register;
