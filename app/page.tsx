"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serifHeadline = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" } as const;
const handDisplay = { fontFamily: "'Gloria Hallelujah', 'Comic Sans MS', cursive" } as const;
const sansBody = {
  fontFamily:
    "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
} as const;

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 14200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-emerald-200 dark:from-emerald-950 dark:to-emerald-900">
      <AnimatePresence>
        {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && <MainPage />}
    </div>
  );
}

function Splash({ onDone }: { onDone: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background image with vignette and subtle parallax noise */}
      <div
        className="absolute inset-0 bg-center bg-cover"
style={{
  backgroundImage: "url('/runner.png')",
}}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-950/35 to-black/60" />
      <div className="pointer-events-none absolute inset-6 rounded-[40px] ring-1 ring-white/10 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />
      <motion.div
        className="absolute -inset-20 opacity-30"
        initial={{ scale: 1.05 }}
        animate={{ scale: [1.05, 1.08, 1.05] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(16,185,129,.25), transparent 45%), radial-gradient(circle at 70% 80%, rgba(56,189,248,.2), transparent 40%)" }}
      />
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-50 text-center px-6 max-w-3xl mx-auto"
      >
        <motion.h1
          className="text-5xl md:text-7xl text-white drop-shadow-[0_8px_24px_rgba(16,185,129,0.35)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
          style={serifHeadline}
        >
          Run, Forrest, Run!
        </motion.h1>
<p
  className="mt-4 text-xl md:text-3xl text-emerald-50/90 z-50"
  style={serifHeadline}
>
  “Life is like a box of chocolates.”
</p>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-2 rounded-full bg-emerald-400/40 blur-2xl"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            />
            <span
              className="relative z-10 text-lg md:text-xl bg-white/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-50 px-6 py-3 rounded-full shadow-lg"
              style={sansBody}
            >
              Women love a man in uniform… until he rolls in. - Lt. Dan
            </span>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.button
            onClick={onDone}
            className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-white shadow-lg hover:bg-emerald-600 active:scale-95 transition"
            whileTap={{ scale: 0.96 }}
          >
            <span style={sansBody}>Start</span>
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              ➜
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function MainPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-5xl text-emerald-900 dark:text-emerald-100" style={serifHeadline}>
          Run, Forrest, Run!
        </h2>
        <p className="mt-3 text-emerald-800/80 dark:text-emerald-200/80" style={sansBody}>
          Settle in for movie night with snacks, and a quick game
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Notebook />
        <MiniGame />
      </section>

      <section className="mt-8 md:mt-10">
        <VideoPlayer />
      </section>
    </main>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl border border-emerald-900/10 dark:border-emerald-100/10 bg-white/80 dark:bg-emerald-950/60 shadow-lg backdrop-blur-md overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-transparent dark:from-emerald-800/10" />
      <div className="relative p-5 md:p-6">{children}</div>
    </div>
  );
}

function Notebook() {
  const snacks = [
    {
      id: "chocolates",
      title: "Chocolate Assortment",
      note: "A box of assorted chocolates. No peeking at the map!",
      ingredients: [
        "Milk, dark, and white chocolate pieces",
        "Caramel centers",
        "Hazelnut praline",
        "Strawberry cream",
      ],
    },
    {
      id: "shrimp",
      title: "Bubba Gump Shrimp Trio",
      note: "Grilled, fried, and garlic butter shrimp — Bubba-approved.",
      recipe: [
        "Season peeled shrimp with salt, pepper, and paprika.",
        "Skillet 1: Sauté with garlic and butter, finish with parsley.",
        "Skillet 2: Grill on skewers 2–3 min/side.",
        "Skillet 3: Dredge in flour and pan-fry until golden.",
      ],
    },
    {
      id: "popcorn",
      title: "Feather Popcorn",
      note: "Light and fluffy with a touch of butter and chives.",
      ingredients: [
        "Popcorn kernels",
        "Butter, melted",
        "Sea salt",
        "Finely chopped chives",
      ],
    },
    {
      id: "sweet-tea",
      title: "Sweet Tea Lemonade",
      note: "Half sweet tea, half lemonade, all Southern charm.",
      recipe: [
        "Steep black tea bags in hot water 5–7 minutes.",
        "Stir in sugar while warm; cool completely.",
        "Mix equal parts tea and lemonade over ice.",
        "Garnish with lemon wheels and mint.",
      ],
    },
  ] as const;

  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Card className="md:h-[360px]">
      <div className="flex items-start gap-4">
        <div className="w-1.5 h-full bg-emerald-400 rounded-full" />
        <div className="flex-1">
          <h3 className="text-2xl text-emerald-900 dark:text-emerald-100" style={serifHeadline}>
            Movie Night Notebook
          </h3>
          <p className="text-emerald-800/80 dark:text-emerald-200/80 mt-1" style={sansBody}>
            Snack ideas inspired by Forrest Gump ✨
          </p>

          <div className="mt-4 max-h-60 md:max-h-64 overflow-y-auto pr-1 scroll-area">
            <ul className="space-y-3">
              {snacks.map((s, i) => {
                const isOpen = openIds.has(s.id);
                return (
                  <motion.li
                    key={s.id}
                    initial={{ x: -12, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-emerald-900/10 dark:border-emerald-100/10 bg-white/70 dark:bg-emerald-900/40 p-4 shadow-sm"
                  >
                    <button
                      onClick={() => toggle(s.id)}
                      className="w-full text-left flex items-start justify-between gap-3"
                    >
                      <span className="text-xl text-emerald-900 dark:text-emerald-100" style={handDisplay}>
                        {s.title}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-emerald-700/60 dark:text-emerald-200/60">
                        {isOpen ? "hide" : "view"}
                      </span>
                    </button>
                    <p className="mt-1 text-emerald-800/80 dark:text-emerald-200/80" style={sansBody}>
                      {s.note}
                    </p>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {"ingredients" in s ? (
                            <ul className="mt-3 list-disc pl-5 text-emerald-800/90 dark:text-emerald-200/90" style={sansBody}>
                              {s.ingredients.map((ing) => (
                                <li key={ing}>{ing}</li>
                              ))}
                            </ul>
                          ) : (
                            <ol className="mt-3 list-decimal pl-5 text-emerald-800/90 dark:text-emerald-200/90" style={sansBody}>
                              {s.recipe?.map((step) => (
                                <li key={step} className="mb-1">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MiniGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 80, y: 80 });
  const areaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const int = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(int);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) setIsRunning(false);
  }, [timeLeft]);

  function randomizeTarget() {
    const container = areaRef.current;
    const featherSize = 48;
    if (container) {
      const rect = container.getBoundingClientRect();
      const maxX = Math.max(rect.width - featherSize - 12, 0);
      const maxY = Math.max(rect.height - featherSize - 12, 0);
      const x = 6 + Math.random() * maxX;
      const y = 6 + Math.random() * maxY;
      setTargetPos({ x, y });
    } else {
      setTargetPos({ x: 80, y: 80 });
    }
  }

  function startGame() {
    setScore(0);
    setTimeLeft(20);
    setIsRunning(true);
    // Small delay to ensure ref has layout
    setTimeout(randomizeTarget, 0);
  }

  return (
    <Card className="md:h-[360px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl text-emerald-900 dark:text-emerald-100" style={serifHeadline}>
            Catch the Feather
          </h3>
          <p className="text-emerald-800/80 dark:text-emerald-200/80 mt-1" style={sansBody}>
            Click the drifting feather to score points before time runs out. Click, click, click retards.
          </p>
        </div>
        <button
          onClick={startGame}
          className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm shadow hover:bg-emerald-700 active:scale-95 transition"
        >
          {isRunning ? "Restart" : "Start"}
        </button>
      </div>

      <div
        ref={areaRef}
        className="relative mt-4 h-56 md:h-64 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 overflow-hidden border border-emerald-900/10 dark:border-emerald-100/10"
      >
        <div className="absolute left-3 top-3 text-xs text-emerald-700/70 dark:text-emerald-200/70">
          Score: <span className="font-semibold">{score}</span>
        </div>
        <div className="absolute right-3 top-3 text-xs text-emerald-700/70 dark:text-emerald-200/70">
          Time: <span className="font-semibold">{timeLeft}s</span>
        </div>

        {isRunning && (
          <motion.button
            key={`${targetPos.x}-${targetPos.y}-${timeLeft}`}
            onClick={() => {
              setScore((s) => s + 1);
              randomizeTarget();
            }}
            className="absolute select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ left: targetPos.x, top: targetPos.y }}
            whileTap={{ scale: 0.9 }}
          >
            <FeatherIcon />
          </motion.button>
        )}
      </div>
    </Card>
  );
}

function FeatherIcon() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow"
      animate={{ y: [0, -6, 0], rotate: [0, -3, 3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    >
      <path
        d="M2 22s8-2 12-6 6-12 6-12-8 2-12 6-6 12-6 12z"
        stroke="#10B981"
        strokeWidth="1.5"
        fill="white"
      />
    </motion.svg>
  );
}

function VideoPlayer() {
  return (
    <Card className="">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl text-emerald-900 dark:text-emerald-100" style={serifHeadline}>
          Forrest Gump 🎞️
        </h3>
        <span className="text-sm text-emerald-800/70 dark:text-emerald-200/70" style={sansBody}>
          movie night
        </span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-emerald-900/10 dark:border-emerald-100/10 bg-black">
        <video
          className="h-full w-full"
          controls
          poster="/vercel.svg"
        >
          <source src="https://lemon-squeezy.sfo3.cdn.digitaloceanspaces.com/gumpy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Card>
  );
}

