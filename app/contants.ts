import { Metadata } from "next";

export const navLinks: { href: string; label: string }[] = [
    { href: '/dashboard', label: 'Dashboard' },
    // { href: '/projects', label: 'Projects' }, 
    // { href: '/posts', label: 'Posts' },
    // { href: '/developers', label: 'Developers' },
  ];

  export const metadata: Metadata = {
    title: "DevHub",
    description: "A full-stack developer community platform",
  };