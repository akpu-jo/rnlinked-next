import AppBar from "@/layouts/AppBar";
import React from "react";

import Link from "next/link";

const TOS = () => {
 
  return (
    <div>
      <AppBar extraclass={"fixed"} />
      <main className=" max-w-6xl mx-auto mb-10 mt-16  ">
        <article className=" ">
          <h2 className="pt-2 pb-2 md:text-5xl text-3xl text-center text-slate-600 leading-normal tracking-wider font-semibold font-serif">
            Terms of Service
          </h2>
          <div className="max-w-2xl py-6 mx-auto px-3 sm:px-0 text-justify text-slate-600 text-xl font-base leading-relaxed tracking-wide">
            <p className=" text-xl pb-5">
              Welcome to Rnlinked! Our mission is to connect, support, and
              empower nurses worldwide.
            </p>
            <p className=" text-xl pb-5">
              These terms of service (&quot;Terms&quot;) apply to your use of our website
              and services (&quot;Service&quot;). By using the Service, you agree to be
              bound by these Terms.
            </p>
            <p className=" text-xl pb-5">
              Our{" "}
              <Link
                href={"/policy/privacy"}
                className=" underline visited:text-burntSienna-400"
              >
                Privacy Policy
              </Link>{" "}
              outlines how we collect and use your personal information. By
              using our website and services, you agree to the terms of our{" "}
              <Link
                href={"/policy/privacy"}
                className=" underline visited:text-burntSienna-400"
              >
                Privacy Policy
              </Link>{" "}
              .
            </p>

            <KeyPoints
              heading={"1. Our Service"}
              text={txt(
                <>
                  Rnlinked is a social networking and educational website for
                  nurses and nursing students. We provide a platform for users
                  to connect with each other, share information, collaborate on
                  projects, and access educational resources.
                </>
              )}
            />
            <KeyPoints
              heading={"2. Who May Use The Service"}
              text={txt(
                <>
                  Our Service is intended for use by individuals who are 16
                  years of age or older and are currently working or studying in
                  the nursing field. By using our Service, you represent and
                  warrant that you meet these eligibility requirements.
                </>
              )}
            />
            <KeyPoints
              heading={"3. User Account and Responsibilities"}
              text={txt(
                <>
                  In order to access certain features of our Service, you may
                  need to create an account. You are responsible for maintaining
                  the confidentiality of your account information and password
                  and for restricting access to your computer or device. You
                  agree to accept responsibility for all activities that occur
                  under your account or password, If you become aware of any
                  unauthorized access to your account, you must notify us
                  immediately.
                  <br className="" />
                  <br></br>
                  <>
                    {" "}
                    You agree to provide accurate and complete information when
                    creating your account and to notify us of any changes to
                    your account information.
                  </>
                </>
              )}
            />
            <KeyPoints
              heading={"4. User Content and Ownership "}
              text={txt(
                <>
                  <>
                    Our Service allows users to post, upload, and share content
                    (“User Content”). You are solely responsible for your User
                    Content and the consequences of posting or publishing it. By
                    posting or publishing User Content, you represent and
                    warrant that you have the right to do so and that it does
                    not violate any intellectual property rights or any other
                    laws.
                  </>
                  <br />
                  <br />
                  <>
                    You retain ownership of any content that you submit, but by
                    submitting content, you grant us a worldwide, non-exclusive,
                    royalty-free license to use, copy, reproduce, modify,
                    publish, display, distribute, and create derivative works of
                    your content in connection with our website and services.
                  </>
                </>
              )}
            />
            <KeyPoints
              heading={"5. Prohibited Content"}
              text={txt(
                <>
                  You may not post or upload any User Content that is illegal,
                  offensive, or that promotes violence, hate speech, or
                  discrimination. This includes, but is not limited to, content
                  that is racist, sexist, homophobic, or promotes hate crimes.
                  Any User Content that violates this policy will be removed and
                  the user may be subject to suspension or termination of their
                  account.
                </>
              )}
            />
            <KeyPoints
              heading={"6.  Disclaimer of Warranties"}
              text={txt(
                <>
                  Our Service is provided on an “as is” and “as available”
                  basis. Rnlinked makes no representations or warranties of any
                  kind, express or implied, as to the operation of our Service
                  or the information, content, materials, or products included
                  on our Service. We do not guarantee the accuracy,
                  completeness, or reliability of any content or information on
                  our website, and we disclaim all liability for any errors or
                  omissions.
                </>
              )}
            />
            <KeyPoints
              heading={"7. Limitation of Liability"}
              text={txt(
                <>
                  Rnlinked shall not be liable for any damages of any kind
                  arising out of or in connection with the use of our Service,
                  including, but not limited to, direct, indirect, incidental,
                  punitive, and consequential damages, even if we have been
                  advised of the possibility of such damages.
                </>
              )}
            />
            <KeyPoints
              heading={"8. Indemnification "}
              text={txt(
                <>
                  You agree to indemnify and hold Rnlinked and its affiliates,
                  officers, agents, and employees harmless from any claim,
                  damages, liabilities, costs, and expenses (including
                  reasonable attorneys&apos; fees) arising out of or in connection
                  with your use of our website and services, your content, your
                  violation of these Terms, or your violation of any rights of
                  another.
                </>
              )}
            />

            <KeyPoints
              heading={"9.  Termination"}
              text={txt(
                <>
                  We may terminate or suspend your access to the Service at any
                  time, with or without cause, and without prior notice. Upon
                  termination, your right to access the Service will immediately
                  cease.
                </>
              )}
            />
            <KeyPoints
              heading={"10. Changes to Terms of Service"}
              text={txt(
                <>
                  We may revise these Terms from time to time. If we make
                  changes, we&apos;ll notify you in advance before making these
                  changes to provide you the opportunity to review the changes
                  before they become effective. These changes will not be
                  retroactive, Your continued use of our Service following any
                  such changes constitutes your acceptance of the new Terms of
                  Service. If you do not agree to these Terms, you must stop
                  stop the Service.
                </>
              )}
            />
            <KeyPoints
              heading={"11. Contact Us"}
              text={txt(
                <>
                  If you have any questions or concerns about these Terms of
                  Service, please contact us at{" "}
                  <span>
                    <Link className="underline visited:text-burntSienna-400" href={"mailto:support@rnlinked.com"}>
                      support@rnlinked.com
                    </Link>
                  </span>{" "}
                  .
                </>
              )}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default TOS;

export const KeyPoints = ({ heading, text }) => {
  return (
    <>
      <h2 className=" py-2 text-2xl font-semibold text-left">{heading}</h2>
      <p className=" text-xl md:text-lg pb-7">{text}</p>
    </>
  );
};

const txt = (text) => {
  return text;
};
