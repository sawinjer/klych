import Quill from "quill";
import type React from "react";
import "quill/dist/quill.snow.css";
import { useEffect, useId, useRef } from "react";
import sanitize from "sanitize-html";

interface Props {
  initialValue?: string;
  onValueChange: (html: string) => void;
}

const QuillBox: React.FC<Props> = (props) => {
  const id = useId();
  const ref = useRef<Quill>(null);

  useEffect(() => {
    if (!ref.current) {
      ref.current = new Quill(`#${id}`, {
        theme: "snow",
      });

      const initialValue = props.initialValue;
      if (initialValue) {
        const delta = ref.current.clipboard.convert({
          html: sanitize(initialValue),
        });
        ref.current.setContents(delta);
      }
    }

    const quill = ref.current;

    const changeHandler = () => {
      const html = quill.getSemanticHTML();
      props.onValueChange(html);
    };

    quill.on("text-change", changeHandler);
    ref.current = quill;

    return () => {
      quill.off("text-change", changeHandler);
    };
  }, [id, props.onValueChange, props.initialValue]);

  return (
    <div>
      <div id={id}></div>
    </div>
  );
};

export default QuillBox;
