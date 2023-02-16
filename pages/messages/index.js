import EmptyStates from "@/components/uiTemplates/EmptyStates";
import ChatLayout from "@/layouts/ChatLayout";

const Inbox = () => {
  return (
    <EmptyStates
      heading={"Your Messages"}
      message={"Choose an existing conversation or start a new one"}
      btnText={"Send Message"}
      // action={() => router.push("/messages/new")}
      data-hs-overlay="#hs-scroll-inside-body-modal"
    />
  );
};

Inbox.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};
export default Inbox;
