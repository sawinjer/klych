import { ImageIcon } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useId } from "react";
import { fileToDataUrl } from "@/lib/fileToUrl";
import { useWeakState } from "@/lib/hooks/useWeakState";
import { uploadPicture } from "@/lib/uploadPicture";

interface Props {
  width: number;
  height: number;
  uploadScale?: number;
  alt: string;
  onUploadDone: (url: string) => void;
  imageUrl?: string;
}

export const ImageUploadButton: React.FC<Props> = (props) => {
  const id = useId();
  const [image, setImage] = useWeakState<string>(props.imageUrl);

  const onFilePick: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    let fileUploaded = false;

    fileToDataUrl(file).then((url) => {
      if (fileUploaded) {
        return;
      }

      setImage(url);
    });

    const uploadScale = props.uploadScale || 1;
    const url = await uploadPicture(
      file,
      props.width * uploadScale,
      props.height * uploadScale,
    );
    fileUploaded = true;

    setImage(url);
    props.onUploadDone(url);
  };

  return (
    <>
      <label
        htmlFor={id}
        className="rounded-xl border-1 border-white flex justify-center items-center overflow-hidden cursor-pointer"
        style={{ width: props.width, height: props.height }}
      >
        {image ? (
          <Image
            src={image}
            width={props.width}
            height={props.height}
            alt={props.alt}
          />
        ) : (
          <ImageIcon size={83} />
        )}
      </label>
      <input
        className="hidden"
        id={id}
        type="file"
        accept="image/*"
        onChange={onFilePick}
      />
    </>
  );
};
