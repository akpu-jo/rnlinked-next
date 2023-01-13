import Head from "next/head";
import MobileNav from "../components/navs/MobileNav";
import { Timeline } from "@/components/users/Timeline";
import Welcome from "./welcome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ArticleList from "@/components/articles/ArticleList";
import { useRouter } from "next/router";
import SideNav from "@/components/navs/SideNav";
import AppBar from "@/layouts/AppBar";
import { useAuth } from "@/contexts/AuthContext";

export default function Home({ posts }) {
  const { user } = useAuth();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = ["Community", "Articles"];

  useEffect(() => {
    setSelectedIndex(categories.indexOf(router.query.feed));
  }, [router.query]);

  const head = () => {
    return (
      <Head>
        <title>RNlinked</title>
        <meta name="description" content="Connecting nurses around the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    );
  };

  if (user) {
    return (
      <div className=" ">
        {head()}
        <AppBar />
        <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5  ">
          <SideNav />
          <main className=" mb-24 col-span-6 sm:mt-2  ">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={(index) => {
                router.push(
                  `/?feed=${categories[index]}`,
                  categories[index] === "Community" && `/`
                );
                setSelectedIndex(index);
                console.log(categories[index]);
              }}
            >
              <Tab.List className=" sticky top-0 z-4 bg-white space-x-3  border-b whitespace-nowrap overflow-x-scroll hide-scrollbar">
                {categories.map((category) => (
                  <Tab key={category}>
                    {({ selected }) => (
                      <h2
                        className={` p-2 ${
                          selected && " border-b-2 border-primary-confetti"
                        } `}
                      >
                        {category}
                      </h2>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Timeline posts={posts} />
                </Tab.Panel>
                <Tab.Panel>
                  <ArticleList />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </main>
          <section className=" hidden lg:block sticky top-16  col-span-3 bg-slate-40 mt-2 bg-white rounded-xl p-5 max-h-96">
            {/* <TrendingPosts /> */}
          </section>
          <MobileNav user={user} />
        </div>
      </div>
    );
  }
  return (
    <>
      {head()}
      <Welcome />
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log(process.env.NEXT_PUBLIC_URL);
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/posts`);

  return {
    props: {
      posts: data.posts,
    },
  };
};

// Home.getLayout = function getLayout(page){
//   return(
//     <AppBar>
//       {page}
//     </AppBar>
//   )
// }
