const fetch = require("node-fetch");
const { ACCESS_TOKEN } = require("../secrets.js");
const PAYLOAD_FIXTURE = require("./page.js");

const FIGMA_API = "https://api.figma.com/v1/files/";
const HEADERS = {
  method: "GET",
  headers: { "X-Figma-Token": ACCESS_TOKEN },
};

const FIGMA_FILE_ID = "buVyGo559CjlEiZsT20pBd";

const prettyPrint = (json) => console.log(JSON.stringify(json, null, 2));

const fetchFigmaFile = async (figmaFileId) =>
  fetch(FIGMA_API + figmaFileId, HEADERS).then((result) => result.json());

const fetchFigmaFileStyles = async (figmaFileId) => {
  const result = await fetchFigmaFile(figmaFileId);

  // prettyPrint(result);
  // prettyPrint(styleKeys(result));
};

const styleKeys = ({ styles }) => Object.keys(styles);

const findStyles = (documentTree, styles, acc = []) => {
  let newAcc = acc;
  let children = documentTree.children;

  if (documentTree.document) {
    children = documentTree.document.children;
  }

  if (documentTree.styles) {
    const styleID = documentTree.styles.fill; // So weird they do this

    newAcc = [
      ...newAcc,
      {
        ...styles[styleID],
        color: documentTree.fills[0].color,
      },
    ];
  }

  if (children) {
    newAcc = [
      ...newAcc,
      ...children.map((node) => {
        return findStyles(node, styles, newAcc);
      }),
    ];
  }

  return newAcc.flat();
};

// fetchFigmaFileStyles(FIGMA_FILE_ID);
prettyPrint(findStyles(PAYLOAD_FIXTURE.document, PAYLOAD_FIXTURE.styles));
