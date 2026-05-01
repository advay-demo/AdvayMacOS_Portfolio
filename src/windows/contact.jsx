import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import { Check } from "lucide-react";

const contacts = [
    { label: "GitHub", value: "github.com/advay-demo", link: "https://github.com/advay-demo" },
    { label: "LinkedIn", value: "linkedin.com/in/advaybhagat", link: "https://www.linkedin.com/in/advaybhagat/" },
    { label: "Phone", value: "+91 8595776681" },
    { label: "Email", value: "ad14bhagat@gmail.com" },
    { label: "LeetCode", value: "leetcode.com/advaybhagat", link: "https://leetcode.com/u/navdTt0YMi/" },
    { label: "Location", value: "Delhi, India" },
];

const Contact = () => {
    return (
        <>
            {/* HEADER SAME AS TERMINAL */}
            <div id="window-header">
                <WindowControls target={"contact"} />
                <h2>Contact</h2>
            </div>

            {/* CONTENT SAME STYLE */}
            <div className="techstack">
                <div className="flex justify-between items-start">
                    <div>
                        <p>
                            <span className="font-bold">@advay % </span>
                            show contacts
                        </p>

                        <div className="label">
                            <p className="w-32">Channel</p>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="w-25 h-25 rounded-full overflow-hidden border-2 border-gray-400 shadow-sm">
                        <img
                            src="/images/advayy.jpeg"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <ul className="content">
                    {contacts.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="check" size={20} />
                            <h3>{item.label}</h3>

                            <div className="ml-4">
                                {item.link ? (
                                    <a href={item.link} target="_blank">
                                        {item.value}
                                    </a>
                                ) : (
                                    <span>{item.value}</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20} /> {contacts.length} contact channels active (100%)
                    </p>

                    <p className="text-black">
                        Response time: {"<"}24hrs
                    </p>
                </div>
            </div>
        </>
    );
};
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;