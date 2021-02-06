const fetch = require("node-fetch");
const { ACCESS_TOKEN } = require("../secrets.js");

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

  prettyPrint(result);
  //   prettyPrint(styleKeys(result));
};

const styleKeys = ({ styles }) => Object.keys(styles);

fetchFigmaFileStyles(FIGMA_FILE_ID);
