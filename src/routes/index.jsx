import Header from "./headerlogin";
import Footer from "./footerlogin";

export default function Index() {
    return (
      <div>
        <Header />
        <center>
        <p>
          This is a music player application
          <br />
        </p>
        <img src="src/routes/home.png" alt="headphone" width="800" height="600"></img>
        </center>
      <Footer />
      </div>
    );
  }