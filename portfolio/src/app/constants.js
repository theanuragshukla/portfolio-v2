import { FaHardHat, FaJava, FaLinux, FaReact } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGit,
  SiGnubash,
  SiGo,
  SiGoogleappsscript,
  SiIpfs,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiLua,
  SiMarkdown,
  SiMicrosoftazure,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNgrok,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSolidity,
  SiSpringboot,
  SiTypescript,
  SiWireshark,
} from "react-icons/si";
import { GiFirewall } from "react-icons/gi";

export const PROJECT_JSON_URL =
  "https://raw.githubusercontent.com/theanuragshukla/extras/main/portfolio-v2/projects.json";
export const ARCHIVE_JSON_URL =
  "https://raw.githubusercontent.com/theanuragshukla/extras/main/portfolio-v2/archive.json";

export const TYPES = {
  PLANG: "Programming language",
  SLANG: "Scripting",
  DBS: "library",
  FRAMEWORK: "framework",
  TOOL: "tool",
  SEC: "Security",
};

export const TypeDict = {
  [TYPES.PLANG]: "Languages",
  [TYPES.SLANG]: "Scripting",
  [TYPES.DBS]: "Databases",
  [TYPES.FRAMEWORK]: "Frameworks",
  [TYPES.TOOL]: "Tools",
  [TYPES.SEC]: "Security",
};
export const LEVEL = {
  0: "Familier",
  1: "Beginnner",
  2: "Intermediate",
  3: "Expert",
};

export const skills = {
  [TYPES.PLANG]: [
    { name: "Java", level: LEVEL[3], Icon: FaJava },
    { name: "TypeScript", level: LEVEL[3], Icon: SiTypescript },
    { name: "JavaScript", level: LEVEL[3], Icon: SiJavascript },
    { name: "Python", level: LEVEL[2], Icon: SiPython },
    { name: "C++", level: LEVEL[2], Icon: SiCplusplus },
    { name: "C", level: LEVEL[2], Icon: SiC },
    { name: "Go", level: LEVEL[3], Icon: SiGo },
    { name: "Solidity", level: LEVEL[3], Icon: SiSolidity },
    { name: "Rust", level: LEVEL[0], Icon: SiRust },
  ],
  [TYPES.SLANG]: [
    { name: "Lua", level: LEVEL[1], Icon: SiLua },
    { name: "MarkDown", level: LEVEL[3], Icon: SiMarkdown },
    { name: "Bash", level: LEVEL[2], Icon: SiGnubash },
    { name: "PHP", level: LEVEL[1], Icon: SiPhp },
    { name: "Google Apps Script", level: LEVEL[2], Icon: SiGoogleappsscript },
  ],
  [TYPES.DBS]: [
    { name: "PostgreSQL", level: LEVEL[3], Icon: SiPostgresql },
    { name: "MongoDB", level: LEVEL[3], Icon: SiMongodb },
    { name: "MySQL", level: LEVEL[3], Icon: SiMysql },
    { name: "Redis", level: LEVEL[3], Icon: SiRedis },
  ],
  [TYPES.FRAMEWORK]: [
    { name: "React", level: LEVEL[3], Icon: SiReact },
    { name: "NextJS", level: LEVEL[3], Icon: SiNextdotjs },
    { name: "NodeJS", level: LEVEL[3], Icon: SiNodedotjs },
    { name: "NestJS", level: LEVEL[2], Icon: SiNestjs },
    { name: "ExpressJS", level: LEVEL[3], Icon: SiExpress },
    { name: "Spring Boot", level: LEVEL[3], Icon: SiSpringboot },
    { name: "Flask", level: LEVEL[2], Icon: SiFlask },
    { name: "Truffle", level: LEVEL[3], Icon: SiIpfs },
    { name: "HardHat", level: LEVEL[3], Icon: FaHardHat },
    { name: "Django", level: LEVEL[2], Icon: SiDjango },
  ],
  [TYPES.TOOL]: [
    { name: "Linux", level: LEVEL[3], Icon: SiLinux },
    { name: "Docker", level: LEVEL[3], Icon: SiDocker },
    { name: "Git & Github", level: LEVEL[3], Icon: SiGit },
    { name: "Nginx", level: LEVEL[2], Icon: SiNginx },
    { name: "Azure", level: LEVEL[2], Icon: SiMicrosoftazure },
  ],
  [TYPES.SEC]: [
    { name: "NMap", level: LEVEL[2] },
    { name: "Metasploit", level: LEVEL[2] },
    { name: "Firewall", level: LEVEL[3], Icon: GiFirewall },
    { name: "Wireshark", level: LEVEL[2], Icon: SiWireshark },
    { name: "Burpsuite", level: LEVEL[2] },
    { name: "Nikto", level: LEVEL[2] },
    { name: "BeeF", level: LEVEL[2] },
    { name: "SQLMap", level: LEVEL[2] },
    { name: "OWASP ZAP", level: LEVEL[2] },
    { name: "Dirb", level: LEVEL[2] },
    { name: "Ngrok", level: LEVEL[3], Icon: SiNgrok },
  ],
};

export const Icons = {
  [TYPES.PLANG]: FaJava,
  [TYPES.SLANG]: SiGnubash,
  [TYPES.DBS]: SiPostgresql,
  [TYPES.FRAMEWORK]: FaReact,
  [TYPES.TOOL]: FaLinux,
  [TYPES.SEC]: SiKalilinux,
};
