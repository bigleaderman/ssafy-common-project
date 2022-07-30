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
    return (
        <div>
            <p>this is ChatBar</p>
        </div>
    );
}
export function UserBar() {
    return (
        <div>
            <p>this is UserBar</p>
        </div>
    );
}
