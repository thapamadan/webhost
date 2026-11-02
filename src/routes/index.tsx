import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madan Thapa — Software Developer" },
      { name: "description", content: "Madan Thapa, software developer building card issuing, payment switching and fraud detection systems with Java, Spring Boot and Python." },
      { property: "og:title", content: "Madan Thapa — Software Developer" },
      { property: "og:description", content: "Fintech engineer working on issuer engines, ISO 8583 and AI-driven fraud rules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const roles = ["never miss a beat.", "feel inevitable.", "scale effortlessly."];

const experience = [
  {
    when: "Jun 2022 — Present",
    title: "Software Developer",
    org: "WOW Finstack",
    points: [
      "Built and maintain an Issuer Engine that validates cards, accounts, merchants and limits to approve or decline transactions.",
      "worked on a Python-based fraud rule engine, applying machine learning and AI-driven analysis to help identify suspicious transaction patterns and anti-money-laundering (AML) rules check whether the transaction breaks any compliance controls.",
      "Built JPOS components on ISO 8583 aligned with VISA and Mastercard rules; ran a VISA simulator.",
      "Integrated debit, credit and wallet systems; added multi-currency support and credit-management APIs.",
    ],
  },
  {
    when: "Mar 2022",
    title: "Intern",
    org: "IT Village Technology",
    points: ["Built the React.js interface for a Card Management System."],
  },
];

const skills = ["Java", "Python", "Spring Boot", "React", "REST APIs", "JavaScript", "C/C++", "JPOS", "ISO 8583", "Docker", "Git", "Liquibase", "JUnit", "PostgreSQL", "MySQL", "Oracle"];

function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = roles[i] ?? "";
    const t = setTimeout(() => {
      if (!del && text === word) return setDel(true);
      if (del && text === "") { setDel(false); setI((i + 1) % roles.length); return; }
      setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, !del && text === word ? 1600 : del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <span className="text-primary">{text}<span className="animate-pulse">|</span></span>;
}

function Section({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <section className="reveal mt-20" style={{ animationDelay: `${delay}ms` }}>
      <h2 className="mb-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Index() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <header className="reveal">
        <p className="text-sm text-muted-foreground">Pokhara, Nepal</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Madan Thapa</h1>
        <p className="mt-6 text-xl leading-relaxed">
          Backend engineer, building systems that <Typer />
        </p>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          a backend engineer based in Pokhara, Nepal. For the past 4 years I've been building and maintaining scalable backend systems for banking, AI and fintech products across Singapore, the US, India and Israel.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a className="underline decoration-primary underline-offset-4 hover:text-primary" href="mailto:tmadan446@gmail.com">tmadan446@gmail.com</a>
          <a className="underline decoration-primary underline-offset-4 hover:text-primary" href="https://linkedin.com/in/madan-thapa-942b25206/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="underline decoration-primary underline-offset-4 hover:text-primary" href="https://github.com/thapamadan" target="_blank" rel="noreferrer">GitHub</a>
          <a className="underline decoration-primary underline-offset-4 hover:text-primary" href="tel:9806622666">9806622666</a>
        </div>
      </header>

      <Section title="Experience" delay={150}>
        <div className="space-y-12">
          {experience.map((e) => (
            <div key={e.org} className="grid gap-2 sm:grid-cols-[9rem_1fr]">
              <p className="text-sm text-muted-foreground">{e.when}</p>
              <div>
                <h3 className="text-xl">{e.title} · <span className="text-primary">{e.org}</span></h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {e.points.map((p) => <li key={p} className="leading-relaxed">— {p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education" delay={300}>
        <div className="grid gap-2 sm:grid-cols-[9rem_1fr]">
          <p className="text-sm text-muted-foreground">2019 — 2023</p>
          <div>
            <h3 className="text-xl">BSc (Hons) Computer Systems Engineering</h3>
            <p className="mt-1 text-muted-foreground">ISMT College · University of Sunderland</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Projects: role-based live-streaming platform (Java, Oracle, React), security system (Go, PostgreSQL,
              React) and Android apps in Java.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Skills" delay={450}>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary">{s}</span>
          ))}
        </div>
      </Section>

      <footer className="mt-24 text-sm text-muted-foreground">© {new Date().getFullYear()} Madan Thapa</footer>
    </main>
  );
}
