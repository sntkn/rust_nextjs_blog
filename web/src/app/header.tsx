"use client";
import { Button, Navbar, Alignment } from "./components/common";
import Link from "next/link";

export default function Header() {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Link href="/">Blog</Link>
        </Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp4-minimal" icon="home" text="Home" />
        <Button className="bp4-minimal" icon="document" text="Create Post" />
      </Navbar.Group>
    </Navbar>
  );
}
