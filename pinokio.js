module.exports = {
  version: "0.1.0",
  title: "Paperclip",
  description: "Pinokio app wrapper for the Paperclip AI project",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const installed =
      info.exists("sandbox/server/.git") &&
      info.exists("sandbox/ui/.git") &&
      info.exists("sandbox/config/settings.json");

    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
    };

    if (running.install) {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Installing",
          href: "install.js",
        },
      ];
    }

    if (running.update) {
      return [
        {
          default: true,
          icon: "fa-solid fa-rotate",
          text: "Updating",
          href: "update.js",
        },
      ];
    }

    if (!installed) {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        },
      ];
    }

    if (running.start) {
      const local = info.local("start.js");
      if (local && local.url) {
        return [
          {
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Paperclip",
            href: local.url + "?ts=" + Date.now(),
          },
          {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          },
        ];
      }

      return [
        {
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Starting",
          href: "start.js",
        },
      ];
    }

    return [
      {
        default: true,
        icon: "fa-solid fa-play",
        text: "Start",
        href: "start.js?ts=" + Date.now(),
      },
      {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.js",
      },
      {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      },
    ];
  },
};
