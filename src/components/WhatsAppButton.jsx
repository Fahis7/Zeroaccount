import { useWhatsAppLink } from "../hooks/useWhatsAppLink.js";

export default function WhatsAppButton() {
  const whatsappLink = useWhatsAppLink();

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5.1-.2 0-.4 0-.5C10.7 9 10 7.5 9.8 7c-.2-.5-.4-.5-.6-.5H8.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
        <path d="M12 2.1a9.9 9.9 0 00-8.5 15L2 22l5.1-1.3A9.9 9.9 0 1012 2.1zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20.1z" />
      </svg>
    </a>
  );
}
