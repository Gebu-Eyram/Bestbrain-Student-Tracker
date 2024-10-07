"use client";
import Header from "@/components/custom/parts/Header";
import Sidebar from "@/components/custom/parts/Sidebar";
import { useState } from "react";
import { UpdateContentContext } from "../(context)/UpdateContext";
import { ThemeProvider } from "@/components/theme-provider";
import { UpdateModeContext } from "../(context)/UpdateModeContext";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [UpdateContent, setUpdateContent] = useState<string>("");
  const [UpdateMode, setUpdateMode] = useState<any>("light");
  return (
    <main className="bg-background">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <UpdateContentContext.Provider
          value={{ UpdateContent, setUpdateContent }}
        >
          <UpdateModeContext.Provider value={{ UpdateMode, setUpdateMode }}>
            <div
              className="flex min-h-screen w-full flex-col
      sm:pl-14"
            >
              <Sidebar />
              <div className="flex flex-col">
                <Header />
                <main className="p-2 sm:p-4">{children}</main>
              </div>
            </div>
          </UpdateModeContext.Provider>
        </UpdateContentContext.Provider>
      </ThemeProvider>
    </main>
  );
};

export default layout;
