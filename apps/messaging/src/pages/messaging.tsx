import { Outlet } from "react-router-dom";

const MessagingPage = () => {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default MessagingPage;
