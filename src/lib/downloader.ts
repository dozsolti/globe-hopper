export function download(
  content: BlobPart,
  filename: string,
  contentType: string = "application/json"
) {
  if (!contentType) contentType = "application/octet-stream";
  const a = document.createElement("a");
  const blob = new Blob([content], { type: contentType });
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
