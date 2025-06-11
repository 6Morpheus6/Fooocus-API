module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/mrhan1993/Fooocus-API app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
          // triton: true
          // sageattention: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      "method": "fs.link",
      "params": {
        "drive": {
          "checkpoints": "app/repositories/Fooocus/models/checkpoints",
          "clip": "app/repositories/Fooocus/models/clip",
          "clip_vision": "app/repositories/Fooocus/models/clip_vision",
          "configs": "app/repositories/Fooocus/models/configs",
          "controlnet": "app/repositories/Fooocus/models/controlnet",
          "diffusers": "app/repositories/Fooocus/models/diffusers",
          "embeddings": "app/repositories/Fooocus/models/embeddings",
          "gligen": "app/repositories/Fooocus/models/gligen",
          "hypernetworks": "app/repositories/Fooocus/models/hypernetworks",
          "inpaint": "app/repositories/Fooocus/models/inpaint",
          "loras": "app/repositories/Fooocus/models/loras",
          "prompt_expansion": "app/repositories/Fooocus/models/prompt_expansion",
          "style_models": "app/repositories/Fooocus/models/style_models",
          "unet": "app/repositories/Fooocus/models/unet",
          "upscale_models": "app/repositories/Fooocus/models/upscale_models",
          "vae": "app/repositories/Fooocus/models/vae",
          "vae_approx": "app/repositories/Fooocus/models/vae_approx"
        },
        "peers": [
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/pinokiofactory/comfy.git",
          "https://github.com/pinokiofactory/MagicQuill.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git"
        ]
      }
    }
  ]
}
