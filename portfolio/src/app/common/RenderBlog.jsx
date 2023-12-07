import { chakra } from "@chakra-ui/react";
const getStyled = (e) => chakra(e);

const renderBlog = (input) => {
  const parts = input.split(/(#b#|#!b#|#f\d+#|;;;|\s+)/);
  let currentFontSize = 16;
  let fontWeight = "normal";
  let styleChanged = false;
  let Elem = getStyled("span");

  const selfClosing = ["img", "hr"]
  let temp = [];
  const elems = [];
  let attrs = {};
  let noChild = false;

  const dump = (idx) => {
    const str = temp.join(" ");
    if (!noChild) {
      if (temp.length === 0) return;
      if (str.replaceAll(" ", "").length === 0) return;
    }
    const style = {
      fontWeight: fontWeight,
      fontSize: `${currentFontSize}px`,
    };
    elems.push(
      noChild ? (
        <Elem key={idx} style={style} {...attrs} />
      ) : (
        <Elem key={idx} style={style} {...attrs}>
          {str}
        </Elem>
      )
    );

    temp = [];
    attrs = {};
  };

  parts.forEach((part, index) => {
    if (part.startsWith("#b")) {
      const wt = part.substring(2, part.length - 1);
      dump(index);
      fontWeight = !!wt ? wt : "bold";
      styleChanged = true;
    } else if (part === "#!b#") {
      dump(index);
      fontWeight = "normal";
      styleChanged = true;
    } else if (part.startsWith("#f")) {
      dump(index);
      const fontSize = parseInt(part.substring(2), 10);
      currentFontSize = isNaN(fontSize) ? 16 : fontSize;
      styleChanged = true;
    } else if (part.startsWith("#{")) {
      part
        .substring(2, part.length - 2)
        .split(";;")
        .forEach((e) => {
          const [k, v] = e.replaceAll(")", "").split("(");
          attrs[k] = v;
        });
    } else if (part.startsWith("#e")) {
      const tag = part.substring(2, part.length - 1);
      dump(index);
      noChild = selfClosing.includes(tag);
      Elem = getStyled(!!tag ? tag : "span");
      styleChanged = true;
    } else if (part === ";;;") {
      dump(index);
      elems.push(<br />);
    } else {
      if (styleChanged) {
        styleChanged = false;
        dump(index);
      } else {
        temp.push(part);
      }
    }
  });

  dump("last");
  return <>{elems.map((e) => e)}</>;
};

export default renderBlog
