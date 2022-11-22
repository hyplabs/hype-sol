interface MessageBubbleProperties {
  message: string;
  side: "left" | "right";
}

const MessageBubble = (props: MessageBubbleProperties) => {
  let flexDirection = "";

  if (props.side === "left") {
    flexDirection = "flex-row";
  } else if (props.side === "right") {
    flexDirection = "flex-row-reverse";
  }

  return (
    <section className={`flex ${flexDirection}`}>
      <article className="bg-blue-700 mb-2 p-2 text-white rounded-xl">
        {props.message}
      </article>
    </section>
  );
};

export default MessageBubble;
