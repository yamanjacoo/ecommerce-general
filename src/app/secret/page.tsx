import type { Metadata } from "next";
import { ProductDownloadButton } from "./donwloadButton";

export const metadata: Metadata = {
  title: "About Us | Ariens",
  description:
    "Learn about Ariens, our mission, and our commitment to quality outdoor power equipment.",
};

export default function HiddenPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">A</h1>
      <ProductDownloadButton></ProductDownloadButton>
      {/* <AboutUsContent /> */}
    </div>
  );
}
