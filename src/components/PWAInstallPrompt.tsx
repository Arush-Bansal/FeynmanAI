/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<unknown>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then((choiceResult: unknown) => {
        if ((choiceResult as any).outcome === "accepted") {
          console.log("User accepted the PWA install prompt");
        } else {
          console.log("User dismissed the PWA install prompt");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50">
      <p className="mr-4">Add Feynman to your home screen for quick access!</p>
      <Button onClick={handleInstallClick} className="bg-violet-600 hover:bg-violet-700">
        <Download className="h-5 w-5 mr-2" /> Install App
      </Button>
    </div>
  );
};