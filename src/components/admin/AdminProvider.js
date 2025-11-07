// src/components/AdminProvider.jsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { useEffect } from "react";

export default function AdminProvider({ user, children }) {
  useEffect(() => {
    if (user) console.log(`user: ${user}`);
    store.dispatch(
      setUser({ name: user.name, email: user.email, role: user.role })
    );
  }, [user]);

  return <Provider store={store}>{children}</Provider>;
}
