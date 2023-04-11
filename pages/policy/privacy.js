import AppBar from "@/layouts/AppBar";
import Link from "next/link";
import React from "react";
import { KeyPoints } from "./tos";

const PrivacyPolicy = () => {
  const txt = (text) => {
    return text;
  };

  return (
    <div>
      <AppBar extraclass={"fixed"} />
      <main className=" max-w-6xl mx-auto mb-10 mt-16  ">
        <article>
          <h2 className="pt-2 pb-2 md:text-5xl text-3xl text-center text-slate-600 leading-normal tracking-wider font-semibold font-serif">
            Privacy Policy
          </h2>
          <div className="max-w-2xl py-6 mx-auto px-3 sm:px-0 text-justify text-slate-600 text-xl font-base leading-relaxed tracking-wide">
            <p className=" text-xl pb-5">
              At Rnlinked, we are committed to protecting your privacy and
              personal information. This Privacy Policy explains how we collect,
              use, and share the information you provide to us through our
              website and services.
            </p>

            <KeyPoints
              heading={"1. Information We Collect"}
              text={txt(
                <>
                  When you create an account on Rnlinked, we may collect
                  personal information such as your name, email address, and
                  professional information related to your nursing career. We
                  may also collect information about your usage of our website
                  and services, including but not limited to your browsing
                  history, search queries, and the content you view or upload.
                </>
              )}
            />

            <KeyPoints
              heading={"2. How We Use Your Information"}
              text={txt(
                <>
                  We use the information we collect to provide and improve our
                  website and services. This includes using your information to
                  personalize your experience on our website, to respond to your
                  requests for support, and to send you important notices and
                  updates about our service. We may also use your information
                  for research and analytical purposes to better understand how
                  our users use our website and services, and to improve our
                  offerings.
                </>
              )}
            />

            <KeyPoints
              heading={"3. Sharing Your Information"}
              text={txt(
                <>
                  We may share your information with third-party service
                  providers, such as hosting providers, analytics providers, and
                  payment processors, who assist us in providing and improving
                  our website and services. These third-party service providers
                  are bound by strict confidentiality agreements and are not
                  permitted to use or disclose your information for any purpose
                  other than providing the services we request of them. We may
                  also disclose your information as required by law, such as in
                  response to a subpoena or court order.
                </>
              )}
            />

            <KeyPoints
              heading={"4. Data Retention"}
              text={txt(
                <>
                  We will retain your information for as long as your account is
                  active or as needed to provide you with our services. If you
                  choose to delete your account, we will delete your personal
                  information as soon as reasonably possible, subject to our
                  legal and regulatory obligations.
                </>
              )}
            />

            <KeyPoints
              heading={"5. Security"}
              text={txt(
                <>
                  We take the security of your personal information seriously
                  and have implemented appropriate technical and organizational
                  measures to protect your information from unauthorized access,
                  use, or disclosure. However, please note that no website or
                  internet transmission is completely secure, and we cannot
                  guarantee the security of your information.
                </>
              )}
            />

            <KeyPoints
              heading={"6. Your Rights"}
              text={txt(
                <>
                  You have the right to access, correct, or delete your personal
                  information. You also have the right to object to our
                  processing of your personal information and the right to data
                  portability. To exercise these rights, please contact us at{" "}
                  <Link
                    className=" underline"
                    href={"mailto:support@rnlinked.com"}
                  >
                    support@rnlinked.com
                  </Link>
                </>
              )}
            />

            <KeyPoints
              heading={"7. Changes to Our Privacy Policy"}
              text={txt(
                <>
                  We may update this Privacy Policy from time to time to reflect
                  changes to our practices or for other operational, legal, or
                  regulatory reasons. We will post any changes to our Privacy
                  Policy on our website, and we encourage you to review this
                  Privacy Policy regularly for any updates.
                </>
              )}
            />

            <KeyPoints
              heading={"8. Contact Us"}
              text={txt(
                <>
                  If you have any questions or concerns about our Privacy Policy
                  or our handling of your personal information, please contact
                  us at {" "}
                  <Link
                    className=" underline"
                    href={"mailto:support@rnlinked.com"}
                  >
                    support@rnlinked.com
                  </Link>
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

export default PrivacyPolicy;
