import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Welcome</h1>
        <p>This is your new Next.js starter. Begin building your site!</p>
      </main>
    </>
  );
}
