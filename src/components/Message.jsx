const Message = ({ message }) => {
  return (
    <div className="mx-auto mt-2 flex w-5/6 flex-col justify-center break-words md:w-2/5">
      {message.text || message.image ? (
        <h1>{message.user || "Guest"}</h1>
      ) : null}

      <div className="rounded-lg bg-indigo-500 p-2">
        {message.text ||
          (message.image && (
            <p className="rounded-lg bg-indigo-500 p-2">{message.text}</p>
          ))}

        {message.image && (
          <img
            src={message.image}
            alt=""
            className={`${message.text ? "mt-2" : "mt-0"}`}
          />
        )}
      </div>
      {message.text || message.image ? (
        <span className="text-right text-sm">
          {message.createdAt?.toDate().toLocaleTimeString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ) : null}
    </div>
  );
};

export default Message;
