"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Redirects legacy route pages to the matching hash section on the home SPA. */
export default function SpaRedirect({ hash }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${hash}`);
  }, [router, hash]);

  return null;
}
