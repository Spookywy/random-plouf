"use client";
import Home from "./containers/home";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export default function TranslatedHomePage({ params }: PageProps) {
  return <Home params={params} />;
}
