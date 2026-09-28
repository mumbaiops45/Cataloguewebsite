"use client";

import { useEffect, useState } from "react";
import { getBanners, splitBanners } from "../../router/banner.router";

// Uses the server-fetched banners when present. If the server got none
// (e.g. the API needs a token), retries in the browser, where the axios
// interceptor attaches the logged-in user's token.
export default function useBanners(initial, key) {
  const [banners, setBanners] = useState(initial);

  useEffect(() => {
    if (initial.length) return;
    let alive = true;
    getBanners()
      .then((all) => {
        if (alive) setBanners(splitBanners(all)[key]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [initial.length, key]);

  return banners;
}
