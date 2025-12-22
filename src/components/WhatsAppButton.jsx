import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971562930563"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed
        bottom-4 right-4
        md:bottom-8 md:right-8
        z-[999999]

        bg-green-500 hover:bg-green-600
        text-white p-4 rounded-full
        shadow-[0_12px_30px_rgba(0,0,0,0.4)]

        transition-transform
        hover:scale-110
        active:scale-95
      "
    >
      <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
    </a>
  );
}
