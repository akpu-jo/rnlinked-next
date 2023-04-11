import AppBar from "@/layouts/AppBar";
import Link from "next/link";
import React from "react";
import { KeyPoints } from "./tos";

const CookiePolicy = () => {
  const txt = (text) => {
    return text;
  };

  return (
    <div>
      <AppBar extraclass={"fixed"} />
      <main className=" max-w-6xl mx-auto mb-10 mt-16  ">
        <article>
          <h2 className="pt-2 pb-2 md:text-5xl text-3xl text-center text-slate-600 leading-normal tracking-wider font-semibold font-serif">
            Cookie Policy
          </h2>
          <div className="max-w-2xl py-6 mx-auto px-3 sm:px-0 text-justify text-slate-600 text-xl font-base leading-relaxed tracking-wide">
            <p className=" text-xl pb-5">
              Our website, Rnlinked, uses cookies to improve your browsing
              experience and to personalize the content and advertisements we
              show you. This Cookie Policy explains what cookies are, how we use
              them, and how you can manage them.
            </p>

            <KeyPoints
              heading={"1. What are Cookies?"}
              text={txt(
                <>
                  Cookies are small text files that are placed on your device
                  when you visit a website. They are used to store information
                  such as your preferences, login information, and browsing
                  history. This allows websites to remember your actions and
                  preferences over time, so you don&apos;t have to re-enter them each
                  time you visit the site.{" "}
                </>
              )}
            />

            <KeyPoints
              heading={"2. Types of Cookies"}
              text={txt(
                <>
                  There are several types of cookies, including: Session
                  Cookies: These cookies are temporary and are deleted when you
                  close your browser. They are used to keep you logged in to a
                  website and to remember your preferences during a single
                  browsing session. Persistent Cookies: These cookies are stored
                  on your device for a set period of time, and are not deleted
                  when you close your browser. They are used to remember your
                  preferences over multiple browsing sessions. First-Party
                  Cookies: These cookies are set by the website you are
                  visiting. They are used to store information such as login
                  credentials and preferences. Third-Party Cookies: These
                  cookies are set by third-party services, such as analytics
                  providers and advertising networks. They are used to track
                  your browsing behavior and to serve you targeted
                  advertisements.
                </>
              )}
            />

            <KeyPoints
              heading={"3. How We Use Cookies"}
              text={txt(
                <>
                  Rnlinked uses cookies to personalize your browsing experience,
                  to remember your preferences, and to show you relevant content
                  and advertisements. We also use cookies to track your browsing
                  behavior and to analyze how our website is used. This
                  information helps us to improve our website and to provide you
                  with a better user experience.
                </>
              )}
            />

            <KeyPoints
              heading={"4. Managing Cookies: "}
              text={txt(
                <>
                  You can manage the cookies that are placed on your device
                  through your browser settings. You can choose to accept or
                  reject cookies, or to be notified when a cookie is set.
                  However, please note that disabling cookies may affect your
                  ability to use certain features of our website.
                </>
              )}
            />

            <KeyPoints
              heading={"5. Changes to Our Cookie Policy"}
              text={txt(
                <>
                  We may update this Cookie Policy from time to time to reflect
                  changes to our practices or for other operational, legal, or
                  regulatory reasons. We will post any changes to our Cookie
                  Policy on our website, and we encourage you to review this
                  Cookie Policy regularly for any updates.
                </>
              )}
            />

            <KeyPoints
              heading={"6. Contact Us"}
              text={txt(
                <>
                  If you have any questions or concerns about our Cookie Policy
                  or our use of cookies, please contact us at {' '}
                  <Link className=" underline" href={'mailto:support@rnlinked.com'}>support@rnlinked.com</Link>
                </>
              )}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default CookiePolicy;
