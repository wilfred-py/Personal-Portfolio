"use client";

import React, { useRef } from "react";
import { words } from "./data";
import styles from "./Loader.module.scss";
import { useGSAP } from "@gsap/react";
import { collapseWords, introAnimation, progressAnimation, wipeUpAnimation } from "./animations";
const Loader = ({ timeline }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const progressNumberRef = useRef(null);
    const wordGroupsRef = useRef(null);
    const wordsRef = useRef(null);
    const overlayRef = useRef(null);
    const wipeUpRef = useRef(null);

    useGSAP(() => {
        timeline &&
            timeline
                .add(introAnimation(wordGroupsRef, overlayRef, wordsRef), 0.25)
                .add(progressAnimation(progressRef, progressNumberRef), "<")
                .add(wipeUpAnimation(wipeUpRef), "-=2");
        // .add(collapseWords(loaderRef), "-=2");
    }, [timeline]);

    return (
        <>
            <div className={styles.loader__wrapper}>
                <div className={styles.loader__progressWrapper}>
                    <div className={styles.loader__progress} ref={progressRef}></div>
                    <span className={styles.loader__progressNumber} ref={progressNumberRef}>
                        0
                    </span>
                </div>

                <div className={styles.loader__wipeUpWrapper} ref={wipeUpRef}></div>

                <div className={styles.loader} ref={loaderRef}>
                    <div className={styles.loader__words} ref={wordsRef}>
                        <div className={styles.loader__overlay} ref={overlayRef}></div>
                        <div ref={wordGroupsRef} className={styles.loader__wordsGroup}>
                            {words.map((word, index) => {
                                return (
                                    <span key={index} className={styles.loader__word}>
                                        {word}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loader;
