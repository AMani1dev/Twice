import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";
import styles from "./contact.module.css"; 

import { useMemo } from "react";
import AnimatedBtn from "../../components/ui/Btn";

import { MdEmail } from "react-icons/md"; 


function SocialLinks() {
  const socialLinksArray = useMemo(
    () => [
      { to: "/", i: <FaInstagram /> },
      { to: "/", i: <FaTiktok /> },
      { to: "/", i: <FaLinkedin /> },
    ],
    []
  );

  return (
    <ul className="d-flex justify-content-end gap-5 gap-sm-4 mt-3 mt-sm-2 list-unstyled">
      {socialLinksArray.map((link , index) => (
        <li key={index}>
          <Link to={link.to}
          onClick={(e) => e.preventDefault()}
          >
          {link.i}
          </Link>
        </li>
      ))}
    </ul>
  );
}
function GetInTouch() {
  return (
    <div>
      <span className={`${styles["get-in-touch"]} d-block justify-content-md-center d-md-flex mx-auto`}>
        <span>get</span>

        <span className="position-relative d-md-inline-block ms-3 mx-md-5">
          in
          <div className={`${styles["video-overlay"]} position-absolute`} data-trans-e>
            <video
            className="uts-fluid object-fit-cover"
              aria-hidden="true"
              src="/contact/x.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </span>

        <br className="d-md-none" />

        <span className={styles.touch}>touch</span>
      </span>
    </div>
  );
}

function MailWrapper() {
  return (
    <div className={`${styles["contact__icon-wrapper"]} d-flex justify-content-center p-2`}>
      <AnimatedBtn
      to="/"
      text="info@twicemediahouse.com"
      ocs=""
      initIcon={<MdEmail />}
      />
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="row address mt-5 mb-5 pb-5 pb-md-2 uts-step--100">
      <address className="col col-12 col-sm-5 text-center px-1 px-sm-0 ps-sm-3">
        <span className="d-block text-secondary fs-6">address</span>
        <span className={`${styles.ws__sm} d-inline-block lh-sm mt-3 mt-sm-2 mx-auto`}>
          Calle Pinar 17, Madrid, Spain
        </span>
      </address>

      <div className="col col-12 col-sm-3 ms-sm-auto mt-4 mt-sm-0 d-flex justify-content-center">
        <div>
          <span className="text-secondary vstack align-items-center ">socials</span>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}




const Contact = () => {
  return (
    <>

    
    <section className={`${styles.contact} text-uppercase fw-bold`}>
      <div className="text-center mx-auto">
        <GetInTouch />
        <MailWrapper />
      </div>
      <ContactInfo />
    </section>



    </>
  );
}


export default Contact ;