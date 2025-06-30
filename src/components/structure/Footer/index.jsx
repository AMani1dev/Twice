import { Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pb-5 px-3 d-flex gap-3 flex-column flex-sm-row justify-content-sm-between text-uppercase">

      <div className="p-1 d-flex flex-column flex-sm-row gap-3 gap-md-4">
        <Link to="/" className="text-decoration-none">
        home
        </Link>
        
        <Link to="/two-percent" className="d-sm-none d-md-inline-block text-decoration-none">
        2%
        </Link>

        <Link  className="text-decoration-none" to="/general-terms">
        legal terms
        </Link>
      </div>
      
      <div className="p-1 justify d-flex flex-column flex-sm-row gap-3 gap-md-4">
        <Link  className="text-decoration-none" to="/" onClick={(e) => e.preventDefault()}>
        design by dylan
        </Link>
        <Link  className="text-decoration-none" to="/" onClick={(e) => e.preventDefault()}>
        code by amine
        </Link>
      </div>

    </footer>
  );
};

export default Footer;
