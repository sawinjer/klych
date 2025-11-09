export const uploadPicture = async (
  file: File,
  width: number,
  height: number,
) => {
  const formData = new FormData();
  formData.append("file", file);

  const urlSearchParams = new URLSearchParams();

  urlSearchParams.set("w", width.toString());
  urlSearchParams.set("h", height.toString());

  const res = await fetch(`/api/upload-picture?${urlSearchParams.toString()}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url as string;
};
