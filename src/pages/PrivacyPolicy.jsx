import { Helmet, HelmetProvider } from "react-helmet-async";

export default function About() {
  return (
    <div className="bg-white col-span-3 lg:col-span-2 p-5 dark:bg-warmgray-900 dark:text-white mb-2">
      <HelmetProvider>
        <Helmet>
          <title>ROM Collection | Privacy Policy</title>
        </Helmet>
      </HelmetProvider>
      <div className="bg-white dark:bg-warmgray-900 p-5 dark:text-white">
        <>
          <h1 className="title text-4xl font-bold">Privacy Policy</h1>
          <div className="content prose md:prose-lg lg:prose-xl max-w-none dark:prose-invert py-1 pr-4">
            <strong>Effective Date: 13-10-2023</strong>

            <p className="py-4">
              At XTR, accessible from xtr.my.id, one of our main priorities is
              the privacy of our visitors. This Privacy Policy document contains
              types of information that is collected and recorded by XTR and how
              we use it.
            </p>

            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </p>

            <h2 className="title text-2xl font-bold py-4">Log Files</h2>

            <p>
              XTR follows a standard procedure of using log files. These files
              log visitors when they visit websites. All hosting companies do
              this and a part of hosting services' analytics. The information
              collected by log files include internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time
              stamp, referring/exit pages, and possibly the number of clicks.
              These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the
              website, and gathering demographic information. Our Privacy Policy
              was created with the help of the{" "}
              <a href="https://www.privacypolicyonline.com/privacy-policy-generator/">
                Privacy Policy Generator
              </a>
              .
            </p>

            <h2 className="title text-2xl font-bold py-4">
              Our Advertising Partners
            </h2>

            <p>
              Some of advertisers on our site may use cookies and web beacons.
              Our advertising partners are listed below. Each of our advertising
              partners has their own Privacy Policy for their policies on user
              data. For easier access, we hyperlinked to their Privacy Policies
              below.
            </p>

            <ul>
              <li>
                <p>Google</p>
                <p>
                  <a href="https://policies.google.com/technologies/ads">
                    https://policies.google.com/technologies/ads
                  </a>
                </p>
              </li>
            </ul>

            <h2 className="title text-2xl font-bold py-4">Privacy Policies</h2>

            <p>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of XTR.
            </p>

            <p>
              Third-party ad servers or ad networks uses technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on XTR, which are
              sent directly to users' browser. They automatically receive your
              IP address when this occurs. These technologies are used to
              measure the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on websites that
              you visit.
            </p>

            <p>
              Note that XTR has no access to or control over these cookies that
              are used by third-party advertisers.
            </p>

            <h2 className="title text-2xl font-bold py-4">
              Third Party Privacy Policies
            </h2>

            <p>
              XTR's Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options.{" "}
            </p>

            <p>
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers'
              respective websites. What Are Cookies?
            </p>

            <h2 className="title text-2xl font-bold py-4">
              Children's Information
            </h2>

            <p>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
            </p>

            <p>
              XTR does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best efforts to promptly remove such information from our
              records.
            </p>

            <h2 className="title text-2xl font-bold py-4">
              Online Privacy Policy Only
            </h2>

            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in XTR. This policy is not
              applicable to any information collected offline or via channels
              other than this website.
            </p>

            <h2>Consent</h2>

            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its Terms and Conditions.
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
