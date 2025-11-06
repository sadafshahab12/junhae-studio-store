import FacebookIcon from "@/app/icons/FacebookIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import PinterestIcon from "@/app/icons/PinterestIcon";
import ThreadsIcon from "@/app/icons/ThreadsIcon";
import TwitterIcon from "@/app/icons/TwitterIcon";
import Link from "next/link";
import React from "react";

const SocialShare: React.FC = () => {
  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon /> },
    { name: "Pinterest", icon: <PinterestIcon /> },
    { name: "X", icon: <TwitterIcon /> },
    { name: "Threads", icon: <ThreadsIcon /> },
    { name: "Facebook", icon: <FacebookIcon /> },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4">
      <p className="text-sm font-medium text-gray-600">Share this story</p>
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href="#"
            aria-label={`Share on ${link.name}`}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
