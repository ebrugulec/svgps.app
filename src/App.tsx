import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import lookie from "lookie";

import styles from "./App.module.css";
import "animate.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

import HoverScopeAnimation from "src/components/HoverScopeAnimation";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import About from "src/pages/About";
import Icons from "src/pages/Icons";
import convertToSelectionFormat from "src/utils/convertToSelectionFormat";
import { IconSet } from "./types";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [iconSet, setIconSet] = useState<IconSet>();

  useEffect(() => {
    const initialIcons = lookie.get("icons") || [];
    setIcons(initialIcons);
  }, []);

  useEffect(() => {
    const formattedIcons = convertToSelectionFormat(icons);
    setIconSet(formattedIcons);
    lookie.set("icons", icons);
  }, [icons]);

  const toastOptions = {
    style: {
      background: "var(--neutral-800)",
      color: "var(--neutral-50)",
    },
  };

  return (
    <>
      <div className={styles.App}>
        <Toaster toastOptions={toastOptions} position="top-right" />
        <HoverScopeAnimation />
        <Router>
          <Header icons={icons} setIcons={setIcons} />
          <div className={styles.Content}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route
                path="/icons"
                element={
                  <Icons iconSet={iconSet} icons={icons} setIcons={setIcons} />
                }
              />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    </>
  );
}
