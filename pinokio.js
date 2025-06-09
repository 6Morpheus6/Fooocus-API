const path = require('path')
module.exports = {
  version: "3.7",
  title: "Fooocus-API",
  description: "Fooocus powered by FastAPI",
  icon: "icon.jpeg",
  menu: async (kernel, info) => {
    // exception handling for windows amd
    let windowsAmd = (kernel.gpu === "amd" && kernel.platform === "win32")
    let extraFlags = (windowsAmd ? " --directml --disable-in-browser" : " --disable-in-browser")

    // windows AMD => directml
    let windowsAMD = (kernel.platform === "win32" && kernel.gpu === "amd")
    let directml = (windowsAMD ? "--directml " : "")
    console.log({ windowsAMD, directml })

    let accelerated

    if (kernel.platform === "darwin") {
      accelerated = kernel.arch === "arm64" // m1/m2/m3
    } else {
      accelerated = ["nvidia", "amd"].includes(kernel.gpu)  // gpu is amd/nvidia
    }

    let alwaysCPU = (accelerated ? "" : "--always-cpu ")

    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
            params: { flags: `${alwaysCPU}${directml}--preset default${extraFlags}` }
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
            params: { flags: `${alwaysCPU}${directml}--preset default${extraFlags}` }
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else if (running.link) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Deduplicating",
          href: "link.js",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
          params: { flags: `${alwaysCPU}${directml}--preset default${extraFlags}` }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"

        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
