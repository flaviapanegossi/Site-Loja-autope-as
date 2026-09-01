'use client';

import { useEffect, useState } from 'react';
import { defaultSiteContent, mergeSiteContent, type SiteContent } from './content';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    let active = true;
    fetch('/api/site-content')
      .then((response) => response.ok ? response.json() : null)
      .then((result: unknown) => {
        if (active && result && typeof result === 'object' && 'content' in result) {
          const content = (result as { content?: unknown }).content;
          if (content && typeof content === 'object') setContent(mergeSiteContent(content as Record<string, string>));
        }
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  return content;
}
