import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

import { Message } from "../../hooks/use_messaging_program";
import MessageBubble from "./message_bubble";

interface InboxProperties {
  messages: Message[];
  sendMessage: (message: string) => void;
}

const Inbox = (props: InboxProperties) => {
  const [message, setMessage] = useState("");

  return (
    <div className="rounded-xl shadow-xl w-3/4">
      <section className="overflow-auto pt-4/5 relative">
        <article className="absolute m-4 top-0">
          {props.messages.map((value, index) => (
            <MessageBubble
              key={index}
              message={value.account.message}
              side="left"
            />
          ))}
        </article>
      </section>
      <section className="flex gap-4 items-end m-4">
        <TextInput
          className=" w-full"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <Button
          onClick={() => {
            props.sendMessage(message);
            setMessage("");
          }}
        >
          Send
        </Button>
      </section>
    </div>
  );
};

export default Inbox;
