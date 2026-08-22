import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import heroReef from "@/assets/hero-reef.jpg";
import siteWall from "@/assets/site-wall.jpg";
import siteTurtle from "@/assets/site-turtle.jpg";
import sitePinnacle from "@/assets/site-pinnacle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bira Blue Dive Center | PADI Courses & Diving in Tanjung Bira" },
      {
        name: "description",
        content:
          "PADI dive courses, fun dives and dive site info in Tanjung Bira, South Sulawesi. Small groups, walls, turtles and pinnacles. Book your dive online.",
      },
      {
        property: "og:title",
        content: "Bira Blue Dive Center | Diving in Tanjung Bira, Sulawesi",
      },
      {
        property: "og:description",
        content:
          "PADI courses from Open Water to Divemaster, daily fun dive trips and 15+ dive sites around Tanjung Bira and Liukang Loe.",
      },
    ],
  }),
  component: Index,
});

const courses = [
  {
    name: "Discover Scuba Diving",
    level: "Beginner",
    price: 950_000,
    duration: "Half day",
    depth: "12 m",
    blurb: "No certification needed. Your first breaths underwater with an instructor at your side.",
    includes: ["1 guided dive", "All equipment", "Max 2 students", "Photos included"],
  },
  {
    name: "PADI Open Water Diver",
    level: "Beginner",
    price: 5_900_000,
    duration: "3–4 days",
    depth: "18 m",
    blurb: "The worldwide licence to dive. Theory, confined water and four open water dives.",
    includes: ["4 open water dives", "eLearning + theory", "PADI certification", "Equipment rental"],
  },
  {
    name: "PADI Advanced Open Water",
    level: "Intermediate",
    price: 4_800_000,
    duration: "2 days",
    depth: "30 m",
    blurb: "Five adventure dives including deep and navigation on Bira's best walls.",
    includes: ["5 adventure dives", "Deep dive training", "Navigation skills", "Nitrox intro"],
  },
  {
    name: "Emergency First Response",
    level: "Certification",
    price: 2_100_000,
    duration: "1 day",
    depth: "—",
    blurb: "Primary and secondary care, CPR and AED. Prerequisite for Rescue Diver.",
    includes: ["Primary care", "Secondary care", "CPR & AED", "EFR certification"],
  },
  {
    name: "PADI Rescue Diver",
    level: "Advanced",
    price: 5_200_000,
    duration: "2–3 days",
    depth: "30 m",
    blurb: "Prevent and manage problems in the water and dive with real confidence.",
    includes: ["Rescue scenarios", "Emergency management", "Problem solving", "Certification"],
  },
  {
    name: "PADI Divemaster",
    level: "Professional",
    price: 19_500_000,
    duration: "4–8 weeks",
    depth: "40 m",
    blurb: "Go pro. Lead certified divers, assist courses and dive Bira every single day.",
    includes: ["Unlimited diving", "Leadership training", "Teaching assistance", "Pro certification"],
  },
];

const funDives = [
  { label: "Single fun dive", price: 650_000, note: "Guide, tanks, weights" },
  { label: "2-dive day trip", price: 1_150_000, note: "Boat, lunch, 2 tanks" },
  { label: "3-dive day trip", price: 1_600_000, note: "Liukang Loe + outer walls" },
  { label: "10-dive package", price: 4_900_000, note: "Valid for your whole stay" },
  { label: "Night dive", price: 800_000, note: "Torches included" },
  { label: "Full equipment rental", price: 200_000, note: "Per day, BCD to fins" },
];

const diveSites = [
  {
    name: "Tanjung Bira Wall",
    image: siteWall,
    depth: "5 – 40 m+",
    level: "Open Water +",
    text: "A steep drop-off five minutes from the beach, carpeted in soft coral and sea fans. Big schools of fusiliers and the occasional eagle ray cruising the blue.",
  },
  {
    name: "Liukang Loe Reef",
    image: siteTurtle,
    depth: "3 – 18 m",
    level: "All levels",
    text: "Shallow hard coral garden off the island in front of Bira. Green turtles, cuttlefish and easy conditions, which makes it the training site of choice.",
  },
  {
    name: "Pulau Kambing Pinnacle",
    image: sitePinnacle,
    depth: "12 – 35 m",
    level: "Advanced",
    text: "An offshore pinnacle catching the current between Bira and Selayar. Barracuda tornadoes, trevally and grey reef sharks patrolling the deeper side.",
  },
];

const highlights = [
  { stat: "15+", label: "dive sites within 40 minutes" },
  { stat: "28–30°C", label: "water year round" },
  { stat: "20–40 m", label: "typical visibility" },
  { stat: "Apr–Nov", label: "best diving season" },
];

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value,
  );

const navLinks = [
  { href: "#courses", label: "Courses" },
  { href: "#fun-dives", label: "Fun Dives" },
  { href: "#dive-sites", label: "Dive Sites" },
  { href: "#info", label: "Info" },
  { href: "#booking", label: "Book" },
];

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

function Index() {
  const bookingOptions = useMemo(
    () => [...courses.map((c) => c.name), ...funDives.map((f) => f.label)],
    [],
  );
  const bookingPrices = useMemo(
    () => [...courses.map((c) => ({ label: c.name, price: c.price })), ...funDives.map((f) => ({ label: f.label, price: f.price }))],
    [],
  );
  const [selected, setSelected] = useState(bookingOptions[1]);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");

  const selectedPrice = bookingPrices.find((item) => item.label === selected)?.price ?? 0;
  const depositAmount = selectedPrice * 0.1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ocean-deep/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 text-primary-foreground">
            <img
              src="https://api.divinginasia.com/images/logo.png"
              alt="Bira Blue Dive Center logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-display text-base font-semibold leading-tight">
              Diving In Asia
              <span className="block text-[11px] font-normal uppercase tracking-[0.2em] text-surf">
                Bira Blue
              </span>
            </span>
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-surf"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#booking"
            className="rounded-full bg-surf-gradient px-5 py-2 text-sm font-semibold text-ocean-deep shadow-dive transition-transform hover:-translate-y-0.5"
          >
            Book a dive
          </a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src={heroReef}
          alt="Scuba diver beside a coral wall with a school of jackfish in Tanjung Bira"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-deep/55" />
        <div className="relative mx-auto max-w-3xl px-6 pt-24 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-surf">
            Tanjung Bira · South Sulawesi
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-primary-foreground sm:text-6xl md:text-7xl">
            Dive the walls
            <span className="block text-surf">of South Sulawesi</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/85">
            PADI courses, daily boat trips and small groups on the reefs between Bira, Liukang Loe and the
            Selayar strait.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#booking"
              className="rounded-full bg-surf-gradient px-7 py-3 font-semibold text-ocean-deep shadow-dive transition-transform hover:-translate-y-0.5"
            >
              Book your adventure
            </a>
            <a
              href="#courses"
              className="rounded-full border border-primary-foreground/50 px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              See courses
            </a>
          </div>
        </div>
      </section>

      <section className="bg-deep py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-3xl font-bold text-surf">{item.stat}</p>
              <p className="mt-1 text-sm text-primary-foreground/75">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="courses" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">Certifications</p>
          <h2 className="mt-3 text-4xl font-bold">PADI dive courses</h2>
          <p className="mt-4 text-muted-foreground">
            From your first breath underwater to going professional. Teaching in English and Bahasa
            Indonesia, maximum four students per instructor, lifetime certifications valid worldwide.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-dive"
            >
              <span className="w-fit rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                {course.level}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{course.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{course.blurb}</p>
              <p className="mt-5 font-display text-2xl font-bold text-ocean">{rupiah(course.price)}</p>
              <p className="text-xs text-muted-foreground">per person</p>
              <dl className="mt-4 flex gap-6 border-y border-border py-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Duration</dt>
                  <dd className="font-medium">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Max depth</dt>
                  <dd className="font-medium">{course.depth}</dd>
                </div>
              </dl>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {course.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                onClick={() => setSelected(course.name)}
                className="mt-6 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-ocean"
              >
                Book this course
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="fun-dives" className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">Certified divers</p>
          <h2 className="mt-3 text-4xl font-bold">Fun dive prices</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Boats leave at 08:00 and 13:30 daily. Prices include guide, tanks, weights and drinking water.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {funDives.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4"
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
                <p className="whitespace-nowrap font-display font-bold text-ocean">
                  {rupiah(item.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dive-sites" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">The reefs</p>
        <h2 className="mt-3 text-4xl font-bold">Dive sites around Bira</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Bira sits at the southern tip of Sulawesi where the Flores Sea meets the Selayar strait: deep
          walls a few minutes from shore, sheltered reefs for training and current-swept pinnacles offshore.
        </p>
        <div className="mt-12 space-y-8">
          {diveSites.map((site, index) => (
            <article
              key={site.name}
              className={`grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>img]:order-2" : ""
              }`}
            >
              <img
                src={site.image}
                alt={site.name}
                loading="lazy"
                width={1024}
                height={768}
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="p-6 md:p-9">
                <h3 className="text-2xl font-semibold">{site.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    Depth {site.depth}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {site.level}
                  </span>
                </div>
                <p className="mt-4 text-muted-foreground">{site.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="info" className="bg-deep py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold">Getting here</h2>
            <p className="mt-4 text-primary-foreground/80">
              Fly into Makassar (UPG), then roughly 5–6 hours by car or shuttle to Tanjung Bira. Ferries to
              Selayar leave from Bira harbour, five minutes from the shop.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-surf">Season & conditions</h3>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Best diving April to November with the calmest seas and best visibility. Water 28–30°C, a 3 mm
              wetsuit is plenty. Mild to moderate current on the offshore sites.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-surf">Good to know</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
              <li>Nitrox available on request</li>
              <li>Nearest chamber: Makassar</li>
              <li>Free pick-up from Bira accommodation</li>
              <li>No flying for 24 h after your last dive</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">Reservations</p>
        <h2 className="mt-3 text-4xl font-bold">Book your dive</h2>
        <div className="mt-4 flex flex-col gap-3 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Send your request and we confirm by email or WhatsApp within 24 hours. No prepayment needed —
            settle at the shop.
          </p>
          <a
            href="https://wa.me/6281353833289?text=Hi%20Bira%20Blue%20Dive%20Center%2C%20I%20want%20to%20book%20a%20dive."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            WhatsApp us
          </a>
        </div>
        <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          Deposit option available: pay 10% now and settle the remaining balance before or on arrival.
        </p>

        <form
          className="mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (!form) {
              return;
            }

            const data = new FormData(form);
            const name = String(data.get("name") || "Diver");
            const email = String(data.get("email") || "");
            const phone = String(data.get("phone") || "");
            const date = String(data.get("date") || "");
            const item = String(data.get("item") || selected);
            const payment = String(data.get("payment") || "10% deposit");
            const divers = String(data.get("divers") || "1");
            const notes = String(data.get("notes") || "");

            const payload = {
              access_key: WEB3FORMS_ACCESS_KEY,
              subject: `Dive booking request: ${item}`,
              name,
              email,
              phone,
              date,
              item,
              payment,
              divers,
              message: [`Payment option: ${payment}`, `Certification level & notes: ${notes}`].join("\n"),
              from_name: "Bira Blue Dive Center",
            };

            try {
              const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify(payload),
              });

              const result = await response.json();

              if (!response.ok || result.success !== true) {
                throw new Error(result.message || "Submission failed");
              }

              setSubmitted(name);
              setFormState("success");
              form.reset();
            } catch (error) {
              console.error(error);
              setSubmitted(name);
              setFormState("error");
              form.reset();
            }
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Full name
              <input
                name="name"
                required
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                required
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              WhatsApp
              <input
                name="phone"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Preferred date
              <input
                name="date"
                type="date"
                required
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Course or trip
              <select
                name="item"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              >
                {bookingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Payment option
              <select
                name="payment"
                defaultValue="10% deposit"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              >
                <option value="Full payment">Full payment</option>
                <option value="10% deposit">10% deposit</option>
              </select>
              <span className="text-xs text-muted-foreground">
                10% deposit estimate: {rupiah(depositAmount)}
              </span>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Divers
              <input
                name="divers"
                type="number"
                min={1}
                max={12}
                defaultValue={1}
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium">
            Certification level & notes
            <textarea
              name="notes"
              rows={4}
              placeholder="e.g. Open Water certified, 20 logged dives, need equipment rental"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-ocean focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-surf-gradient px-6 py-3 font-semibold text-ocean-deep shadow-dive transition-transform hover:-translate-y-0.5"
          >
            Send booking request
          </button>
          {submitted && formState === "success" && (
            <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              Thanks {submitted}! Your request is noted — we'll confirm availability within 24 hours.
            </p>
          )}
          {submitted && formState === "error" && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              We couldn’t send your request right now. Please email bookings@divinginasia.com or use WhatsApp to send your booking directly.
            </p>
          )}
        </form>
      </section>

      <footer className="bg-ocean-deep py-10 text-primary-foreground/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base font-semibold text-primary-foreground">
            Bira Blue Dive Center
          </p>
          <p>Jl. Pasir Putih, Tanjung Bira, Bulukumba, South Sulawesi</p>
          <p>bookings@divinginasia.com · +62 8135383 3289</p>
        </div>
      </footer>
    </div>
  );
}
