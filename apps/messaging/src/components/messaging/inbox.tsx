import { Button, TextInput } from "flowbite-react";

const Inbox = () => {
  return (
    <>
      <div className="overflow-hidden p-4 rounded-xl shadow-xl">
        <div className="pt-4/5">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-11">
              <TextInput />
            </div>
            <div className="col-span-1">
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
