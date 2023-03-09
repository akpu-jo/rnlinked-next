import AppBar from "@/layouts/AppBar";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import React, { useState } from "react";
import { typeOf } from "react-is";
import CsvDownloadButton from "react-json-to-csv";

const Admin = ({u}) => {
    const users = JSON.parse(u)
    console.log(typeof u, u)
  const [usersJson, setUsersJson] = useState("");

  return (
    <>
      <AppBar />
      <CsvDownloadButton data={users}></CsvDownloadButton>
      <div>welcome to admin</div>
    </>
  );
};

export default Admin;

export const getServerSideProps = async () => {
  await connectDb();

  const users = await User.find().select(
    "_id username name email role createdAt"
  );
//   console.log(users);

  return {
    props: {
      u: JSON.stringify(users),
    },
  };
};
