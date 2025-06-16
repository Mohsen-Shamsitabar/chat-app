import { useParams } from "react-router";

const ConversationPage = () => {
  const userId = useParams();

  console.log(userId);

  return <div>CONVO</div>;
};

export default ConversationPage;
