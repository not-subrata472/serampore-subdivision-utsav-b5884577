import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Maximize2,
} from "lucide-react";

import thakurPortrait from "@/assets/thakur-portrait.jpg.asset.json";
import thakurShrine from "@/assets/thakur-shrine.png.asset.json";
import venueQr from "@/assets/venue-qr.png.asset.json";
import utsavBanner from "@/assets/utsav-logo-navy.jpg.asset.json";
import utsavPoster from "@/assets/utsav-poster.jpg.asset.json";
import utsavPosterSquare from "@/assets/utsav-poster-square.jpg.asset.json";
import heroMusic from "@/assets/sabse-sundar-naam.mp3.asset.json";
import upcomingUtsavPoster from "@/assets/upcoming-utsav-blue-poster.jpeg.asset.json";
import upcomingUtsavMusic from "@/assets/tomake-jokhon-mone-pore.mp3.asset.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "শ্রীশ্রীঠাকুর অনুকূলচন্দ্র | সৎসঙ্গ ও জীবনসাধনা" },
      {
        name: "description",
        content:
          "শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের জীবনমুখী আদর্শ, বাণী, সৎসঙ্গ ও দৈনন্দিন সাধনার পথে সকল ভক্তের জন্য একটি আন্তরিক পরিসর।",
      },
      {
        property: "og:title",
        content: "শ্রীশ্রীঠাকুর অনুকূলচন্দ্র | সৎসঙ্গ ও জীবনসাধনা",
      },
      {
        property: "og:description",
        content:
          "শ্রীশ্রীঠাকুরের আদর্শে প্রেম, সেবা ও সুস্থ জীবনচর্চার পথে এগিয়ে চলার একটি ভক্তিময় পরিসর।",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: DevotionalPage,
});


const scenes = [
  {
    label: "\n",
    title: "\n",
    time: "",
    text: "\n",
    image: upcomingUtsavPoster.url,
    imageAlt: "শ্রীরামপুর মহকুমা উৎসব — অস্তি-উৎসর্জ্জী মহোৎসবের নীল-সাদা পোস্টার",
    music: upcomingUtsavMusic.url,
  },
  {
    label: "\n",
    title: "\n",
    time: "",
    text: "\n",
    image: utsavPoster.url,
    imageAlt: "শ্রীরামপুর মহকুমা উৎসব — অস্তি-উৎসজ্জী মহোৎসবের পোস্টার",
  },
  {
    label: "\n",
    title: "\n",
    time: "",
    text: "\n",
    image: utsavPosterSquare.url,
    imageAlt: "শ্রীরামপুর মহকুমা উৎসব — ১৩৯ তম জন্ম মহোৎসব, অস্তি উৎসর্জ্জী মহোৎসবের নীল-সাদা পোস্টার",
  },
];

const contactEmail = "serampore.mohokuma.utsav26@gmail.com";

type GalleryScene = {
  label: string;
  title: string;
  time: string;
  text: string;
  image: string;
  imageAlt: string;
  music?: string;
};

function GalleryFigure({ scene }: { scene: GalleryScene }) {
  const { label, title, image, imageAlt, music } = scene;
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleViewerChange = (open: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (open) {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        /* The visitor can retry by closing and reopening the picture. */
      });
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div
      className="relative overflow-hidden"
      aria-label={imageAlt}
    >
      <Dialog onOpenChange={handleViewerChange}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            aria-label={`${imageAlt} বড় করে দেখুন`}
            className="block h-auto w-full rounded-none p-0 focus-visible:ring-inset"
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={`${title} বড় করে দেখুন`}
            className="absolute left-3 top-3 z-10 rounded-full border-background/50 bg-background/85 px-3 text-xs font-bold shadow-sm backdrop-blur hover:bg-background"
          >
            <Maximize2 className="size-3.5" aria-hidden="true" /> পূর্ণ পর্দা
          </Button>
        </DialogTrigger>
        <DialogContent className="flex max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-6xl items-center justify-center overflow-hidden border-background/20 bg-foreground/95 p-3 shadow-2xl sm:rounded-2xl sm:p-5 [&>button]:rounded-full [&>button]:bg-background [&>button]:p-2 [&>button]:text-foreground [&>button]:opacity-100">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{label}</DialogDescription>
          <img
            src={image}
            alt={imageAlt}
            className="max-h-[86dvh] max-w-full object-contain"
          />
        </DialogContent>
      </Dialog>
      {music ? <audio ref={audioRef} src={music} preload="auto" className="hidden" /> : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}

const UTSAV_TARGET = Date.parse("2026-12-13T00:00:00+05:30");

function getRemaining() {
  const totalSeconds = Math.max(0, Math.floor((UTSAV_TARGET - Date.now()) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownTimer({ tone = "light" }: { tone?: "light" | "onDark" }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isDark = tone === "onDark";
  const units: Array<[string, number]> = [
    ["Days", remaining?.days ?? 0],
    ["Hours", remaining?.hours ?? 0],
    ["Minutes", remaining?.minutes ?? 0],
    ["Seconds", remaining?.seconds ?? 0],
  ];

  const boxClass = isDark
    ? "border-royal-deep/25 bg-royal-soft/90 shadow-lg backdrop-blur-sm"
    : "border-royal/15 bg-background/75";
  const numberClass = isDark ? "text-royal-deep" : "text-royal";
  const labelClass = isDark ? "text-royal-deep/65" : "text-foreground/55";

  return (
    <div
      aria-label="Time remaining until the utsav"
      aria-live="off"
      className="grid grid-cols-4 gap-2 sm:gap-3"
      role="timer"
    >
      {units.map(([unitLabel, value]) => (
        <div
          key={unitLabel}
          className={`rounded-2xl border px-1.5 py-3 text-center sm:rounded-3xl sm:py-4 ${boxClass}`}
        >
          <span
            className={`block text-2xl font-bold leading-none tabular-nums sm:text-3xl ${numberClass}`}
          >
            {remaining ? String(value).padStart(2, "0") : "00"}
          </span>
          <span className={`mt-2 block text-[0.6rem] font-bold sm:text-xs ${labelClass}`}>
            {unitLabel}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroMusic({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      void audio.play().catch(() => {
        /* Browsers require the visitor's first interaction for audible playback. */
      });
    };

    const onFirstInteraction = () => {
      tryPlay();
    };

    audio.load();
    tryPlay();
    window.addEventListener("pointerdown", onFirstInteraction, { capture: true, once: true });
    window.addEventListener("touchstart", onFirstInteraction, { capture: true, once: true });
    window.addEventListener("keydown", onFirstInteraction, { capture: true, once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction, { capture: true });
      window.removeEventListener("touchstart", onFirstInteraction, { capture: true });
      window.removeEventListener("keydown", onFirstInteraction, { capture: true });
      audio.pause();
    };
  }, [src]);

  return <audio ref={audioRef} src={src} loop preload="auto" className="hidden" />;
}

function DevotionalPage() {

  const mapsBrowserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
  const venueMapUrl = mapsBrowserKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsBrowserKey}&q=place_id:ChIJFzJToWCb-DkR-0MxjzP87Gs`
    : "";
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = `${message}\n\n— ${name}\n${email}`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };


  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="প্রথম অংশে ফিরুন">
          <img
            src={utsavBanner.url}
            alt="অস্তি উৎসর্জ্জী মহোৎসবের প্রাতিষ্ঠানিক প্রতীক"
            className="size-10 squircle-tight object-cover shadow-md ring-1 ring-foreground/10 sm:size-11"
          />
          <strong className="block text-xl leading-none sm:text-2xl">অস্তি উৎসর্জ্জী মহোৎসব</strong>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="প্রধান দিকনির্দেশনা">
          <a href="#ideal" className="text-sm font-semibold hover:text-primary">আদর্শ</a>
          
          
          <a href="#gallery" className="text-sm font-semibold hover:text-primary">উৎসবের পরিবেশ</a>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-8 sm:pt-12">
          <div className="group relative overflow-hidden squircle border-4 border-background/60 bg-foreground shadow-2xl">
            <HeroMusic src={heroMusic.url} />
            <img
              src={thakurShrine.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full scale-110 object-cover object-center opacity-45 blur-md"
            />

            <div className="absolute inset-0 bg-linear-to-l from-foreground/95 from-5% via-foreground/80 via-45% to-foreground/55" />
            <div className="pointer-events-none absolute inset-4 squircle border border-background/15" />

            <div className="relative z-10 grid min-h-[34rem] items-center gap-10 px-7 py-12 text-left sm:min-h-[36rem] sm:px-12 sm:py-16 lg:min-h-[38rem] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-16 lg:py-20">
              <figure className="relative order-first mx-auto w-full max-w-[19rem] sm:max-w-xs lg:mx-0 lg:w-full lg:max-w-none">
                <div aria-hidden="true" className="absolute -inset-3 rounded-[3rem] bg-sky/20 blur-2xl" />
                <div className="relative aspect-[0.92] overflow-hidden rounded-[2.5rem] border border-background/25 shadow-2xl ring-1 ring-foreground/20 sm:rounded-[3.25rem]">
                  <img
                    src={thakurPortrait.url}
                    alt="ফুলের মালায় সজ্জিত শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের সাদা প্রতিমূর্তি"
                    className="size-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                </div>
              </figure>
              <div className="flex flex-col items-start justify-center">
              <span className="inline-block rounded-full border border-background/20 bg-background/10 px-3.5 py-1.5 text-xs font-bold text-background backdrop-blur-sm">শ্রীরামপুর মহকুমায়</span>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-normal leading-[1.12] text-background drop-shadow-md sm:text-6xl lg:text-7xl">
                শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের শুভ ১৩৯তম জন্ম মহা মহোৎসব&nbsp;
              </h1>
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-sky/45 bg-sky/15 px-4 py-2 text-base font-bold text-sky backdrop-blur-sm sm:text-lg">
                <CalendarDays className="size-4 shrink-0 sm:size-5" aria-hidden="true" />
                ১৩ই ডিসেম্বর ২০২৬
              </p>
              <div className="mt-6 w-full max-w-md">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold text-background/70">
                  <Clock3 className="size-3.5 shrink-0 text-sky" aria-hidden="true" /> উৎসব শুরু হতে বাকি
                </p>
                <CountdownTimer tone="onDark" />
              </div>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-loose text-background/75 sm:text-base">
                

              </p>
                <div className="mt-7 flex flex-wrap items-start justify-start gap-3">
                  <Button asChild variant="kindled" size="pill"><a href="#gallery">উৎসবের পরিবেশ দেখুন</a></Button>
                  <Button asChild variant="kindledOutline" size="pill" className="border-background/40 bg-background/90"><a href="#ideal">আদর্শ জানুন</a></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ideal" className="border-y border-foreground/10 bg-card">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <span className="text-sm font-bold text-primary"></span>
              <h2 className="mt-3 max-w-[18ch] text-4xl font-normal leading-tight sm:text-6xl">শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের প্রেম, সেবা ও কল্যাণ চেতনায় অস্তি-উৎসর্জ্জীর অভিযাত্রা....</h2>
            </div>
            <div className="space-y-5 text-base font-medium leading-loose text-foreground/70">
              <p>{"\n"}</p>
              <p className="whitespace-pre-line">{`পরম প্রেমময় শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের ১৩৯তম শুভ জন্ম-মহামহোৎসব উপলক্ষে আয়োজিত শ্রীরামপুর মহকুমা উৎসব “অস্তি-উৎসর্জ্জী” (প্রথম বর্ষ)-এর ওয়েবসাইটে আপনাকে স্বাগত জানাই।


সমগ্র এই মহোৎসবটি পরম পূজ্যপাদ শ্রীশ্রীআচার্য্যদেবের অনুপ্রেরণা, আশীর্বাদ ও ঐকান্তিক প্রচেষ্টায় আয়োজিত হচ্ছে। তাঁর স্নেহময় প্রেরণা ও দিকনির্দেশনাকে পাথেয় করে এই মহোৎসবকে সার্থক ও সুন্দরভাবে সম্পন্ন করার প্রয়াস গ্রহণ করা হয়েছে।


শ্রীশ্রীঠাকুরের জীবন ও আদর্শ মানুষের অস্তি, বৃদ্ধি ও কল্যাণের পথকে সুস্পষ্ট করে তোলে। তিনি দেখিয়েছেন কীভাবে ব্যক্তি, পরিবার ও সমাজকে ভালোবাসা, সেবা, সদাচার এবং আদর্শনিষ্ঠ জীবনযাপনের মাধ্যমে আরও সুস্থ, সুন্দর ও সমৃদ্ধ করে গড়ে তোলা যায়। তাঁর এই জীবনমুখী আদর্শ আজও অসংখ্য মানুষের প্রেরণার উৎস।


“অস্তি-উৎসর্জ্জী” কেবল একটি উৎসবের নাম নয়; এটি এক গভীর জীবনদর্শনের প্রতীক। নিজের অস্তিকে রক্ষা, লালন ও বিকশিত করে তাকে বৃহত্তর মঙ্গল ও মানবকল্যাণের কাজে নিবেদন করার মধ্যেই এর মূল ভাবনা নিহিত। সেই চেতনাকে সামনে রেখেই এই উৎসবের আয়োজন।


শ্রীরামপুর মহকুমার বিভিন্ন সৎসঙ্গ কেন্দ্র, মন্দির, বিহার এবং ইষ্টপ্রাণ ভক্তবৃন্দের সম্মিলিত উদ্যোগে আয়োজিত এই মহোৎসব ভক্তি, আদর্শচর্চা, সাংগঠনিক সংহতি, সংস্কৃতি এবং সেবাধর্মের এক সুন্দর মিলনক্ষেত্র। উৎসবের বিভিন্ন কর্মসূচির মাধ্যমে শ্রীশ্রীঠাকুরের জীবন ও বাণীকে আরও বিস্তৃতভাবে মানুষের কাছে পৌঁছে দেওয়ার প্রয়াস গ্রহণ করা হয়েছে।


আমাদের বিশ্বাস, এই মহোৎসব শুধু একটি স্মরণোৎসব হয়ে থাকবে না; বরং আগামী দিনের জন্য আদর্শনিষ্ঠ, সেবামুখী ও সংহত সমাজ গঠনের প্রেরণা জোগাবে। শ্রীশ্রীঠাকুরের কৃপায় এই আয়োজন সকলের জীবনে শুভবোধ, ঐক্য, প্রেরণা ও কল্যাণের বার্তা বয়ে আনুক—এই আমাদের আন্তরিক প্রার্থনা।`}</p>
              <div className="pt-3 text-center text-foreground">
                <p className="font-semibold">🙏বন্দে পুরুষোত্তমম্🙏</p>
                <div className="my-4 border-t border-dashed border-foreground/50" aria-hidden="true" />
                <div className="space-y-1 font-semibold leading-relaxed">
                  <p>“অপরের মঙ্গল-কামনাই নিজ মঙ্গলের প্রসূতি।”</p>
                  <p>“শ্রীশ্রীঠাকুর অনুকূলচন্দ্র”</p>
                  <p>“সত্যানুসরণ”</p>
                </div>
                <div className="mt-4 border-t border-dashed border-foreground/50" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="venue-title" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 text-sm font-bold">
                <MapPin className="size-4" aria-hidden="true" /> উৎসব প্রাঙ্গণ
              </span>
              <h2 id="venue-title" className="mt-5 text-3xl font-normal leading-tight sm:text-6xl">উৎসবের স্থান</h2>
              <address className="mt-4 max-w-md text-base font-semibold not-italic leading-loose text-foreground/70 sm:mt-5 sm:text-lg">
                Alkali Ground, Konnagar,<br />
                Hooghly-712235, West Bengal
              </address>
              <p className="mt-3 text-base font-bold text-primary">Near Konnagar Railway Station</p>
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-sky/45 bg-sky/10 px-4 py-2 text-base font-bold text-foreground sm:text-lg">
                <CalendarDays className="size-4 shrink-0 text-sky sm:size-5" aria-hidden="true" />
                ১৩ই ডিসেম্বর ২০২৬
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative aspect-[4/3] min-h-[15rem] overflow-hidden rounded-[2rem] border border-foreground/10 bg-muted shadow-lg sm:aspect-auto sm:min-h-[22rem] sm:rounded-[4rem] sm:shadow-xl">
                {venueMapUrl ? (
                  <iframe
                    title="Alkali Ground, Konnagar-এর মানচিত্র"
                    src={venueMapUrl}
                    className="absolute inset-0 size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="grid size-full place-items-center p-8 text-center text-sm font-semibold text-foreground/55">
                    মানচিত্র এখানে দেখা যাবে
                  </div>
                )}
              </div>
              <div className="flex items-center gap-5">
                <div className="size-32 shrink-0 overflow-hidden rounded-[2rem] border border-foreground/15 bg-card shadow-sm" role="img" aria-label="ভেন্যুর QR কোড">
                  <img src={venueQr.url} alt="ভেন্যুর QR কোড" className="size-full object-cover" loading="lazy" />
                </div>
                <p className="max-w-[12rem] text-sm font-semibold leading-relaxed text-foreground/55">QR Code scan করে জানুন...</p>
              </div>
            </div>
          </div>
        </section>


        <section id="gallery" aria-labelledby="scenes-title" className="border-y border-foreground/10 bg-card">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 text-sm font-bold">
                  <CalendarDays className="size-4" aria-hidden="true" /> শ্রীরামপুর মহকুমায়
                </span>
                <h2 id="scenes-title" className="mt-5 text-4xl font-normal leading-[1.08] sm:text-6xl">আসন্ন উৎসবের পরিবেশ</h2>
              </div>
              <p className="max-w-xl text-sm font-semibold leading-loose text-foreground/60 sm:text-base">
                {"\n"}
              </p>
            </div>

            <div className="mt-10 flex max-w-2xl flex-col gap-6 sm:gap-8">
              {scenes.map((scene) => (
                <article key={scene.image} className="group overflow-hidden rounded-[2rem] border border-foreground/10 bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <GalleryFigure scene={scene} />
                </article>
              ))}
            </div>

          </div>

          <div className="bg-linear-to-b from-royal-mist via-royal-soft to-royal-soft py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <span className="inline-block rounded-full bg-sky px-4 py-2 text-sm font-bold text-royal-deep">উৎসবের সময়সূচী</span>
                <h3 className="mt-5 text-4xl font-normal leading-tight text-royal-deep sm:text-5xl">সারাদিন ব্যাপী নানাবিধ মাঙ্গলিক অনুষ্ঠান সূচী...</h3>
                <p className="mt-5 max-w-md text-sm font-medium leading-loose text-royal/70">
                  {"\n"}
                </p>
              </div>
              <div className="flex min-h-[14rem] items-center justify-center rounded-[2rem] border border-royal/20 bg-background/70 p-8 shadow-sm sm:min-h-[18rem]">
                <p className="text-center text-3xl font-normal leading-relaxed text-royal-deep sm:text-4xl">পরে জানানো হবে...</p>
              </div>
            </div>

              <div className="mt-14 grid items-center gap-7 border-t border-royal/15 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-royal px-4 py-2 text-sm font-bold text-royal-mist">
                    <Clock3 className="size-4" aria-hidden="true" /> উল্টো গণনা
                  </span>
                  <h3 className="mt-5 text-3xl font-normal leading-tight text-royal-deep sm:text-5xl">উৎসব শুরু হতে বাকি</h3>
                  <p className="mt-4 max-w-md text-sm font-medium leading-loose text-royal/70">
                    {"\n"}
                  </p>
                </div>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>


        <section id="contact" className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
          <div className="grid gap-10 rounded-[2rem] bg-primary p-7 sm:p-12 lg:grid-cols-2 lg:rounded-[3rem]">
            <div className="text-primary-foreground">
              <span className="inline-block rounded-full bg-background px-4 py-2 text-sm font-bold text-foreground">যোগাযোগ</span>
              <h2 className="mt-5 text-5xl font-normal leading-tight sm:text-6xl">উৎসব উদযাপনে অংশগ্রহণ করুন</h2>
              <p className="mt-5 max-w-md font-medium leading-loose text-primary-foreground/85">{"\n"}</p>
              <div className="mt-8 space-y-5 font-semibold">
                <p className="flex items-start gap-3 break-all text-[0.7rem] leading-relaxed sm:text-xs"><Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> serampore.mohokuma.utsav26@gmail.com</p>
                <div className="grid max-w-md grid-cols-1 gap-x-6 gap-y-2 text-sm tabular-nums sm:grid-cols-2" aria-label="যোগাযোগের ফোন নম্বর">
                  <a href="tel:+918240603619" className="whitespace-nowrap">+91 82406 03619</a>
                  <a href="tel:+918961896757" className="whitespace-nowrap">+91 89618 96757</a>
                  <a href="tel:+918777465400" className="whitespace-nowrap">+91 87774 65400</a>
                  <a href="tel:+918100669016" className="whitespace-nowrap">+91 81006 69016</a>
                  <a href="tel:+919433457684" className="whitespace-nowrap sm:col-span-2">+91 94334 57684</a>
                </div>
              </div>
            </div>
            <form className="space-y-5 rounded-[2rem] bg-background p-6 sm:p-8" onSubmit={handleContactSubmit}>
              <Field label="নাম"><Input required name="name" placeholder="আপনার নাম" className="h-12 rounded-xl bg-foreground/5 px-4" /></Field>
              <Field label="ইমেল"><Input required name="email" type="email" placeholder="আপনার ইমেল ঠিকানা" className="h-12 rounded-xl bg-foreground/5 px-4" /></Field>
              <Field label="বিষয়"><Input required name="subject" placeholder="কী বিষয়ে জানতে চান?" className="h-12 rounded-xl bg-foreground/5 px-4" /></Field>
              <Field label="বার্তা"><Textarea required name="message" rows={4} placeholder="আপনার বার্তা লিখুন" className="resize-none rounded-xl bg-foreground/5 px-4 py-3" /></Field>
              <Button type="submit" variant="kindledDark" size="pill" className="w-full">বার্তা পাঠান</Button>
              <p className="text-center text-xs font-semibold text-foreground/45">{sent ? "ধন্যবাদ! আপনার বার্তা ইমেল অ্যাপে তৈরি হয়েছে — পাঠানো টানলেই আমাদে পৌঁছাবে।" : "\n"}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2"><img src={utsavBanner.url} alt="" className="size-8 squircle-tight object-cover ring-1 ring-foreground/10" /><strong>অস্তি উৎসর্জ্জী মহোৎসব{"\n"}</strong></div>
        <div className="flex flex-wrap gap-5 text-xs font-semibold text-foreground/55"><span className="font-bold">উৎসবে সকলের সবান্ধবে আমন্ত্রণ রইল</span><a href="#">{"\n"}</a><a href="#">{"\n"}</a></div>
      </footer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-foreground/60">{label}</span>{children}</label>;
}