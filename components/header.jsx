"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { BarLoader } from "react-spinners";
import { Unauthenticated, Authenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";
const Header = () => {
  const pathName = usePathname();
  const { isLoading } = useStoreUserEffect();
  if (pathName.includes("/editor")) {
    return null;
  }
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div className="backdrop-blur-md bg-white/10 border-white/20 rounded-full px-8 py-3  flex items-center justify-evenly gap-8">
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/pixel logo.png"
            alt="Pixel Logo"
            className="min-w-24 object-cover"
            width={96}
            height={24}
          />
        </Link>

        {pathName == "/" && (
          <div className="hidden md:flex justify-evenly space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 ml-10 md:ml-20">
          <Unauthenticated Unauthenticated>
            <SignInButton>
              <Button variant="glass">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="glass">
                <LayoutDashboard className="h-5 w-5" />
                <span className="hidden md:flex text-[15px]">Dashboard</span>
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12",
                },
              }}
            />
          </Authenticated>

          {isLoading && (
            <div className="fixed bottom-0 left-0  w-full z-40 flex justify-center">
              <BarLoader width={`95%`} color="#06b6d4"></BarLoader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
