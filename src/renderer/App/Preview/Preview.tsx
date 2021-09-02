import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppState } from "../../store/AppStore";

const Preview = () => {
  const { selectedFontFilePath } = useAppState();

  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elem = previewRef.current;
    if (!elem) {
      return;
    }
    console.log(selectedFontFilePath);
    const fontFace = new FontFace(
      "hoge",
      `url(file://${selectedFontFilePath})`
    );

    document.fonts.add(fontFace);
  }, [selectedFontFilePath]);

  return <FontPreview ref={previewRef}>へろーわ～～るど</FontPreview>;
};

export default Preview;

const FontPreview = styled.div`
  font-family: "hoge";
  font-size: 32px;
`;
