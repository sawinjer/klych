"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

interface Props {
  initialValue?: string;
  onValueChange: (html: string) => void;
}

const Quill = dynamic(() => import("./Quill"), { ssr: false });

export const TextEditor: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<p>Завантажується редактор тексту...</p>}>
      <Quill {...props} />
    </Suspense>
  );
};
