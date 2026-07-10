import githubIcon from "../assets/github.svg";
import packageInfo from "../../package.json";

function createFooter(repoName) {
  const footer = document.createElement("footer");

  const link = document.createElement("a");
  link.href = `https://github.com/ZachTheMighty/${repoName}`;
  link.target = "_blank";

  const icon = document.createElement("img");
  icon.src = githubIcon;
  icon.alt = "github icon";
  icon.classList.add("github-icon");
  icon.style.width = "50px";

  link.append(icon);

  footer.append(link);

  document.body.append(footer);
}

export default createFooter(packageInfo.name);
