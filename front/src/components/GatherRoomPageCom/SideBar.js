import React from "react";

export default function SideBar() {
    return (
        <div>
            <ChatBar />
            <UserBar />
        </div>
    );
}

export function ChatBar() {
    return <span>this is ChatBar</span>;
}
export function UserBar() {
    return <span>this is UserBar</span>;
}
