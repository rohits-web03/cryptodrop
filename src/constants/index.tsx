export const features = [
  {
    id: "0",
    icon: "/images/feature-1.png",
    caption: "End-to-End Encryption",
    title: "Your files, fully protected",
    text: "CryptoDrop encrypts every file with advanced cryptography, guaranteeing only you and your recipient can access it securely.",
    button: {
      icon: "/images/magictouch.svg",
      title: "Learn more",
    },
  },
  {
    id: "1",
    icon: "/images/feature-2.png",
  caption: "Instant Transfer",
    title: "Share in real time",
    text: "Send files instantly using WebSocket-powered transfers. No delays, no waiting — just fast, seamless sharing between devices.",
    button: {
      icon: "/images/docs.svg",
      title: "Read the docs",
    },
  },
];

export const details = [
  {
    id: "0",
    icon: "/images/detail-1.png",
    title: "No Installation Needed",
  },
  {
    id: "1",
    icon: "/images/detail-2.png",
    title: "Auto Expiry",
  },
  {
    id: "2",
    icon: "/images/detail-3.png",
    title: "Enable protection",
  },
  {
    id: "3",
    icon: "/images/detail-4.png",
    title: "Account Optionality",
  },
];

export const faq = [
  {
    id: "0",
    question: "Is CryptoDrop free?",
    answer:
      "Yes, you can share files for free with a limited time duration and share count. Upgrade for extended storage and limits.",
  },
  {
    id: "1",
    question: "How secure are my files?",
    answer:
      "All files are encrypted using advanced cryptographic algorithms before upload, ensuring even we cannot access your data.",
  },
  {
    id: "2",
    question: "Can I send files to multiple people?",
    answer:
      "Yes, each uploaded file generates a unique link that can be shared multiple times, depending on your plan limits.",
  },
  {
    id: "3",
    question: "What happens after file expiry?",
    answer:
      "Once a file reaches its expiry time or share limit, it is automatically deleted from our servers through scheduled clean-up jobs.",
  },
  {
    id: "4",
    question: "Will you release a mobile app?",
    answer:
      "Yes, a mobile version of CryptoDrop is already in our roadmap and will launch soon after the web release.",
  },
  {
  id: "5",
  question: "Do I need an account to share files?",
  answer:
    "No, you can share files anonymously. However, creating an account lets you track uploads, manage expiries, and access premium features.",
},
{
  id: "6",
  question: "What file types are supported?",
  answer:
    "CryptoDrop supports all major file formats including documents, images, videos, and archives, with size limits based on your plan.",
},
{
  id: "7",
  question: "Can I delete a file manually before expiry?",
  answer:
    "Yes, registered users can manually delete their files anytime from the dashboard before the expiry limit is reached.",
},

];

export const plans = [
  {
    id: "0",
    title: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    caption: "Perfect for quick and temporary file sharing",
    features: [
      "File expiry: 1 hour",
      "7 shares per file",
      "File size up to 500 MB",
      "No password protection",
      "Temporary encrypted storage",
    ],
    icon: "/images/circle.svg",
    logo: "/images/plan-1.png",
  },
  {
    id: "1",
    title: "Pro",
    priceMonthly: 199,
    priceYearly: 179,
    caption: "Ideal for professionals needing secure file control",
    features: [
      "File expiry: 24 hours",
      "Unlimited shares per file",
      "File size up to 5 GB",
      "Password protection enabled",
      "Stored in Secure Encrypted Vault",
    ],
    icon: "/images/triangle.svg",
    logo: "/images/plan-2.png",
  },
];











export const Laptop = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Laptop Screen */}
      <rect
        x="5"
        y="6"
        width="23"
        height="16"
        rx="2"
        stroke="#EAEDFF"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Screen Inner Fill */}
      <rect
        x="6.5"
        y="7.5"
        width="20"
        height="13"
        rx="1"
        fill="#EAEDFF"
        fillOpacity="0.15"
      />
      {/* Keyboard Base */}
      <rect
        x="2.5"
        y="23"
        width="28"
        height="4"
        rx="1"
        fill="#EAEDFF"
      />
      {/* Bottom Shadow */}
      <path
        d="M2 27C2 27 6 28.5 16.5 28.5C27 28.5 31 27 31 27"
        stroke="#EAEDFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Mobile = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect
        x="11"
        y="4"
        width="11"
        height="24"
        rx="2.5"
        stroke="#EAEDFF"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Screen */}
      <rect
        x="12.5"
        y="6"
        width="8"
        height="18"
        rx="1.2"
        fill="#EAEDFF"
        fillOpacity="0.15"
      />
      {/* Speaker */}
      <rect
        x="14.5"
        y="5"
        width="4"
        height="0.8"
        rx="0.4"
        fill="#EAEDFF"
      />
      {/* Home Button */}
      <circle cx="16.5" cy="26.5" r="0.8" fill="#EAEDFF" />
    </svg>
  );
};
export const Tablet = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect
        x="6"
        y="3"
        width="21"
        height="26"
        rx="2.8"
        stroke="#EAEDFF"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Screen */}
      <rect
        x="7.5"
        y="5"
        width="18"
        height="20"
        rx="1.5"
        fill="#EAEDFF"
        fillOpacity="0.15"
      />
      {/* Camera */}
      <circle cx="16.5" cy="26.5" r="0.8" fill="#EAEDFF" />
    </svg>
  );
};
export const Computer = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Screen */}
      <rect
        x="3.5"
        y="5"
        width="26"
        height="17"
        rx="2"
        stroke="#EAEDFF"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Screen Fill */}
      <rect
        x="5"
        y="6.5"
        width="23"
        height="14"
        rx="1.2"
        fill="#EAEDFF"
        fillOpacity="0.15"
      />
      {/* Stand */}
      <rect
        x="15"
        y="22.5"
        width="3"
        height="3"
        rx="0.6"
        fill="#EAEDFF"
      />
      {/* Base */}
      <path
        d="M11 26.5C11 26.5 13.5 27.5 16.5 27.5C19.5 27.5 22 26.5 22 26.5"
        stroke="#EAEDFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const links = [
  {
    id: "0",
    title: "Mobile",
    icon: <Mobile />,
    url: "/share/send",
  },
  {
    id: "1",
    title: "Tablet",
    icon: <Tablet />,
    url: "/share/send",
  },
  {
    id: "2",
    title: "Computer",
    icon: <Computer />,
    url: "/share/send",
  },
  {
    id: "3",
    title: "Laptop",
    icon: <Laptop />,
    url: "/share/send",
  },
];

export const socials = [
  {
    id: "0",
    title: "x",
    icon: "/images/socials/x.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Threads",
    icon: "/images/socials/threads.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    icon: "/images/socials/instagram.svg",
    url: "#",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/images/socials/discord.svg",
    url: "#",
  },
];
