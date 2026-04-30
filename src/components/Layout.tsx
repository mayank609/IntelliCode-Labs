import { ReactNode, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Cleanup and re-observe on route changes can be handled via MutationObserver or simply 
    // relying on component mounts if we wrap them, but for global css classes this is a lightweight approach.
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      newElements.forEach(el => observer.observe(el));
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
